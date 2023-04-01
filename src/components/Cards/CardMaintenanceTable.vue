<template>

	<!-- Maintenance Table Card -->

	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<a-table :columns="columns" :data-source="data" :pagination="false">


			<template slot="func" slot-scope="func">
				<div class="transaction-info">
					<h6 class="m-0">{{ func.job }}</h6>
					<p class="m-0 font-regular text-muted">{{ func.department }}</p>
				</div>
			</template>

			<template slot="owner" slot-scope="owner">
				<div class="source-info">
					<h6 class="m-0">{{ owner.name }}</h6>
					<p class="m-0 font-regular text-muted">{{ owner.apartment }}</p>
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
				>
				<MainForm ref="formFields" :formFields="MaintenanceInputs" :title="modalTitle"></MainForm>
			</MainModal>
			</template>

		</a-table>
	</a-card>
	<!-- / Maintenance Table Card -->

</template>

<script>
import MainModal from '../Modal/MainModal.vue';
import MainForm from '../Forms/MainForm.vue';
import { mapActions } from 'vuex'
	import { mapState } from 'vuex'

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
				modalTitle: "Edit Request",
				MaintenanceInputs: [
					{ name: 'issue', label: 'Issue', placeholder: 'Enter Date', type:'text', rules: ['required']},
					{ name: 'area', label: 'Area', type:'selectBox', 'options': [{value: 'Common Area', text: 'Common Area'}, {value: 'In-Unit', text: 'In-Unit'}], rules: ['required']},
					{ name: 'details', label: 'Details', placeholder:'Enter Details', type:'text', rules: ['required']},
      				{ name: 'owner', label: 'Reported By', type:'searchSelect', rules: ['required']},
      	],
				rowDate: '',
				rowStatus: '',
				rowKey: ''
			}
		},
		computed: {
			...mapState({
				membersInfo: state => state.building.membersInfo,
			}),
		},
		methods: {
			async DeleteRow(row) {
			if(confirm("Do you really want to delete?")){
				console.log("deleting", row.key);

				try {
					let res = await this.deleteMaintenance({maintenance: row})
					} catch (e) {
						console.log('modalHandleOk error', e)
					}
			}
			},
			showModal(row) {
				this.MaintenanceInputs.forEach((inputRow, index) => {
					if(this.MaintenanceInputs[index].name === 'created_by_name' || this.MaintenanceInputs[index].name === 'created_by_apt'){
						this.MaintenanceInputs[index].value = row['created_by'][this.MaintenanceInputs[index].name]
				}  else if (inputRow.name === 'owner') {
							const index = this.membersInfo.indexOf(this.membersInfo.find(el => el.user_id === row.user_id));
							const inputIndex = this.MaintenanceInputs.indexOf(this.MaintenanceInputs.find(el => el.name === inputRow.name));
							this.MaintenanceInputs[inputIndex].value = index
							this.MaintenanceInputs[inputIndex].membersInfo =  this.membersInfo;
					} else {
						try {
							this.MaintenanceInputs[index].value = row[this.MaintenanceInputs[index].name]
						} catch (e) {
							console.log('modalHandleOk error', e)
							this.MaintenanceInputs[index].value = null
						}
					}
				});
				this.visible = true
			  this.rowDate = row.date
				this.rowStatus = row.status
				this.rowKey = row.key
		  	},
			modalHandleCancel() {
				this.visible = false
			},
			async modalHandleOk(handleOnFinish) {
				try {
					let isValid = this.$refs.formFields.validate()
					if(!isValid){
						return;
					}

					let formFields = this.$refs.formFields.formData;
					let user_id = this.membersInfo[formFields.owner].user_id;

					formFields.owner = {
						apartment:this.membersInfo[formFields.owner].apartment,
						name: this.membersInfo[formFields.owner].name,
						email: this.membersInfo[formFields.owner].email,
					}

					let res = await this.updateMaintenance({maintenance: {...formFields,
						 ...{date: this.rowDate, status: this.rowStatus, key: this.rowKey, user_id}}})
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
					let res = await this.updateMaintenance({maintenance: {status: newStats, key: row.key}})
				} catch (e) {
					console.log('updateStatus error', e)
				}
			},
		  ...mapActions('maintenance', ['updateMaintenance', 'deleteMaintenance'])
		},
	})

</script>
