<template>

	<!-- Documents Table Card -->

	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<a-table :columns="columns" :data-source="data" :pagination="false">

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
					</a-menu>
				</a-dropdown>
				
			<MainModal
					:visible="visible"
					:title="modelTitle"
				 	@handleOk="modalHandleOk"
					:handle-cancel="modalHandleCancel"
				>
				<MainForm ref="formFields" :formFields="DocumentInputs" :formState="formState"></MainForm>
			</MainModal>
			</template>

		</a-table>
	</a-card>
	<!-- / Documents Table Card -->

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
				modelTitle: "Add Document",
				DocumentInputs: [
					{ name: 'name', label: 'Upload File', type:'text'},
	        		{ name: 'type', label: 'Type', placeholder:'Enter type', type:'selectBox', 'options': [{value: 'insurance', text: 'Insurance'}, {value: 'work_order', text: 'Work Order'}, {value: 'tax', text: 'Taxes'}, {value: 'other', text: 'Other'}]},
	        		{ name: 'details', label: 'Details', placeholder:'Enter Details', type:'text'},
      	],
				formState: {'type': '', 'details': '', 'name': '', 'upload_date': this.formattedDate, 'location': 'to_be_updated'}
			
			}
		},
		computed: {
			formattedDate() {
			const today = new Date();
			const year = today.getFullYear();
			const month = String(today.getMonth() + 1).padStart(2, '0');
			const day = String(today.getDate()).padStart(2, '0');
			return `${month}/${day}/${year}`;
			},
		},
		created() {
	     this.formState.date = this.formattedDate;
	  
	  },
		methods: {
			async DeleteRow(row) {
			if(confirm("Do you really want to delete?")){
				console.log("deleting", row.key);
			
			try {
				let res = await this.deleteDocument({document: row})					
				} catch (e) {
					console.log('modalHandleOk error', e)
				} 
			}
			},
			showModal(row) {
				this.visible = true
				this.formState.type = row.type
				this.formState.details = row.details
				this.formState.name = row.name
				this.formState.key = row.key
				this.formState.upload_date = row.upload_date
				this.formState.location = row.location
		  },
			modalHandleCancel() {
				this.visible = false
				this.formState = {'type': '', 'details': '', 'name': '', 'upload_date': this.formattedDate, 'location': 'to_be_updated'}
			},
			async modalHandleOk(handleOnFinish) {
				try {
					//this.formState.date = this.formState.date.format('YYYY-MM-DD');
					let res = await this.updateDocument({document: this.formState})
					console.log('modalHandleOk', res)
					if(res) {
						this.$refs.formFields.onFinish(true);
						this.visible = false;
						this.formState = {'type': '', 'details': '', 'name': '', 'upload_date': this.formattedDate, 'location': 'to_be_updated'}
					} else {
						console.log('modalHandleOk false', res)
						this.$refs.formFields.onFinish(false);
					}
				} catch (e) {
					console.log('modalHandleOk error', e)
					this.$refs.formFields.onFinish(false);
				} finally {
					handleOnFinish()
				}
		  },
		  ...mapActions('documents', ['updateDocument', 'deleteDocument'])
		},
	})

</script>