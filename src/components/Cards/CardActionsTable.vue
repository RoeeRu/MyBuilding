<template>

	<!--
		Actions Table Card
		In this card we have a table with actions data.
		It gets the data from the store in:
		"./store/actions.js" .
	 -->

	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<a-table :columns="columns" :data-source="data" :pagination="false">


			<template slot="created_by" slot-scope="created_by">
				<div class="source-info">
					<h6 class="m-0">{{ created_by.created_by_name }}</h6>
					<p class="m-0 font-regular text-muted">{{ created_by.created_by_apt }}</p>
				</div>
			</template>

			<template slot="owner" slot-scope="owner">
				<div class="source-info">
					<h6 class="m-0">{{ owner.name }}</h6>
					<p class="m-0 font-regular text-muted">Apartment {{ owner.apartment }}</p>
				</div>
			</template>

			<template slot="item" slot-scope="item">
				<div class="source-info">
					<h6 class="m-0">{{ item }}</h6>
				</div>
			</template>

			<template slot="status" slot-scope="status">
				<a-tag class="tag-status" :class="[status=='Open' ? 'ant-tag-primary' : '', status=='Closed' ? 'ant-tag-muted' : ''
					, status=='In Progress' ? 'ant-tag-success' : '']">
					{{ status }}
				</a-tag>
			</template>




			<template slot="actionsBtn" slot-scope="row">
				<a-dropdown>
					<a class="ant-dropdown-link" @click="e => e.preventDefault()">
					Actions <a-icon type="down" />
					</a>
					<a-menu slot="overlay">
					<a-menu-item>
						<a href="javascript:;" v-on:click="showModal(row)">Edit</a>
					</a-menu-item>
					<a-menu-item>
						<a href="javascript:;" v-on:click="DeleteRow(row)">Delete</a>
					</a-menu-item>
					<a-dropdown>
					<a class="ant-dropdown-link" @click="e => e.preventDefault()">
					Change Status: <a-icon type="down" />
					</a>
					<a-menu slot="overlay">
					<a-menu-item>
						<a href="javascript:;" v-on:click="updateStatus(row, newStats='Open')">Open</a>
					</a-menu-item>
					<a-menu-item>
						<a href="javascript:;" v-on:click="updateStatus(row, newStats='In Progress')">In Progress</a>
					</a-menu-item>
					<a-menu-item>
						<a href="javascript:;" v-on:click="updateStatus(row, newStats='Closed')">Closed</a>
					</a-menu-item>
					</a-menu>

				</a-dropdown>
			</a-menu>
				</a-dropdown>
			<MainModal
					 v-if="visible"
					:title="modalTitle"
				 	@handleOk="modalHandleOk"
					:handle-cancel="modalHandleCancel"
					ref="mainModal"
				>
				<MainForm ref="formFields" :formFields="actionInputs"  :title="modalTitle"></MainForm>
			</MainModal>
			</template>

		</a-table>
	</a-card>
	<!-- / Actions Table Card -->

</template>


<script>
import MainModal from '../Modal/MainModal.vue';
import MainForm from '../Forms/MainForm.vue';
import { mapActions } from 'vuex'
	import { mapState } from 'vuex'
import moment from 'moment';

	export default ({
		components: {
		  MainModal, MainForm
		},
		props: {
			data: {
				type: Array,
				default: () => [],
			},
			columns: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				visible: false,
				modalTitle: "Edit Project",
				actionInputs: [
	        { name: 'item', label: 'Project', placeholder:'Enter Title', type:'text', rules: ['required']},
	        { name: 'details', label: 'Details', placeholder:'Enter Details', type:'text', rules: ['required']},
					{ name: 'due_date', label: 'Due Date', type:'date', rules: ['required']},
					{ name: 'owner', label: 'Owner', type:'searchSelect', rules: ['required']},
      	],
				rowStatus: '',
				rowKey: ''			}
		},
		computed: {
			...mapState({
				membersInfo: state => state.building.membersInfo,
			}),
			formattedDate() {
			const today = new Date();
			const year = today.getFullYear();
			const month = String(today.getMonth() + 1).padStart(2, '0');
			const day = String(today.getDate()).padStart(2, '0');
			return `${month}/${day}/${year}`;
			},
		},
		async mounted() {
		},
		methods: {
			async DeleteRow(row) {
			if(confirm("Do you really want to delete?")){
				console.log("Deleting", row.key);

				try {
					let res = await this.deleteAction({action: row})
					} catch (e) {
						console.log('modalHandleOk error', e)
					}
			}
			},
			showModal(row) {
				this.actionInputs.forEach((inputRow, index) => {
						try {

								if (inputRow.name === 'created_by_name' || inputRow.name === 'created_by_apt'){
										inputRow.value = row['created_by'][inputRow.name]
								} else if (inputRow.name === 'due_date') {
									const rowDate = row[this.actionInputs[index].name];
									const momentRowDate = moment(rowDate, 'MM/DD/YYYY');
									const date = momentRowDate.isValid() ? momentRowDate : null;
									this.actionInputs[index].value = date
								} else if (inputRow.name === 'owner') {
									const index = this.membersInfo.indexOf(this.membersInfo.find(el => el.user_id === row.user_id));
									const inputIndex = this.actionInputs.indexOf(this.actionInputs.find(el => el.name === inputRow.name));
									this.actionInputs[inputIndex].value = index
									this.actionInputs[inputIndex].membersInfo =  this.membersInfo;
								} else {
									this.actionInputs[index].value = row[this.actionInputs[index].name]
								}
							} catch(e) {
								console.log('modalHandleOk error', e)
								this.actionInputs[index].value = null
							}

						}

					);
					this.visible = true
					this.rowStatus = row.status
					this.rowKey = row.key
			  	this.rowDueDate = row.due_date
		  },
			modalHandleCancel() {
				this.visible = false
			},
			async modalHandleOk(handleOnFinish) {
				try {
					let isValid = this.$refs.formFields.validate()
					console.log('isValid', isValid)
					if(!isValid){
						return;
					}

					let formFields = this.$refs.formFields.formData;
					let user_id = this.membersInfo[formFields.owner].user_id;

					formFields.owner = {
						apartment:this.membersInfo[formFields.owner].apartment,
						name: this.membersInfo[formFields.owner].name,
						email: this.membersInfo[formFields.owner].email
					}
					let res = await this.updateAction({action: {...formFields,
						 ...{status: this.rowStatus, key: this.rowKey, user_id}}})

					if(res) {
						this.$refs.formFields.onFinish(true);
						this.visible = false;
					} else {
						this.$refs.formFields.onFinish(false);
					}
				} catch (e) {
					this.$refs.formFields.onFinish(false);
				} finally {
					handleOnFinish()
				}
		  },
			async updateStatus(row, newStats) {
				try {
					let res = await this.updateAction({action: {status: newStats, key: row.key}})
				} catch (e) {
					console.log('updateStatus error', e)
				}
			},
		  ...mapActions('actions', ['updateAction', 'deleteAction']),
		},
	})

</script>
