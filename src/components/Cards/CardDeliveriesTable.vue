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

			<template slot="created_by" slot-scope="created_by">
				<div class="source-info">
					<h6 class="m-0">{{ created_by.created_by_name }}</h6>
					<p class="m-0 font-regular text-muted">{{ created_by.created_by_apt }}</p>
				</div>
			</template>

			<template slot="status" slot-scope="status">
				<a-tag class="tag-status" :class="[status=='Ready' ? 'ant-tag-primary' : '', status=='Picked Up' ? 'ant-tag-muted' : ''
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
						<a href="javascript:;" v-on:click="updateStatus(row, newStats='Open')">Ready</a>
					</a-menu-item>
					<a-menu-item>
						<a href="javascript:;" v-on:click="updateStatus(row, newStats='In Progress')">Picked Up</a>
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
      				{ name: 'details', label: 'Details', placeholder:'Enter Details', type:'text', rules: ['required']},
					{ name: 'created_by_name', label: 'Owner (Name)', placeholder: 'Enter Name', type:'text', rules: ['required']},
					{ name: 'created_by_apt', label: 'Owner (Apartment)', placeholder: 'Enter Appratment', type:'text', rules: ['required']},
      	],
				rowDate: '',
				rowStatus: '',
				rowKey: ''
			}
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
				this.MaintenanceInputs.forEach((value, index) => {
					console.log(index)
					if(this.MaintenanceInputs[index].name === 'created_by_name' || this.MaintenanceInputs[index].name === 'created_by_apt'){
						this.MaintenanceInputs[index].value = row['created_by'][this.MaintenanceInputs[index].name]
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
					//this.formState.date = this.formState.date.format('YYYY-MM-DD');
					let res = await this.updateMaintenance({maintenance: {...this.$refs.formFields.formData,
						 ...{date: this.rowDate, status: this.rowStatus, key: this.rowKey}}})
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
