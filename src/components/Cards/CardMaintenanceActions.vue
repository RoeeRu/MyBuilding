<template>

	<!-- Maintenance actions Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0,}">
		
		<template #title>
			<a-row type="flex" align="middle">
				
				<a-col :span="24" :md="4" >
					<a-button type="primary"
						@click="showModal"
					>
						Add Request
					</a-button>
				</a-col>
				<a-col :span="24" :md="8">
					<!-- Header Search Input -->
					<a-input-search class="header-search"  placeholder="Search for request..." >
						<svg slot="prefix" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z" fill="#111827"/>
						</svg>
					</a-input-search>
					<!-- / Header Search Input -->
				</a-col>
			</a-row>
			<MainModal
					:visible="visible"
					:title="modelTitle"
				 	@handleOk="modalHandleOk"
					:handle-cancel="modalHandleCancel"
				>
				<MainForm ref="formFields" :formFields="MaintenanceInputs" :formState="formState"></MainForm>
			</MainModal>
		</template>
	
	</a-card>
	<!-- Maintenance actions Card -->

</template>

<script>
import MainModal from '../Modal/MainModal.vue';
import MainForm from '../Forms/MainForm.vue';
import { mapActions } from 'vuex'

	export default ({
		components: {
		  MainModal, MainForm
		},
		data() {
			return {
				visible: false,
				modelTitle: "Add Request",
				MaintenanceInputs: [
					{ name: 'issue', label: 'Issue', placeholder: 'Enter Date', type:'text'},
	        		{ name: 'details', label: 'Details', placeholder:'Enter Details', type:'text'},
					{ name: 'created_by_name', label: 'Owner (Name)', placeholder: 'Enter Name', type:'text'},
					{ name: 'created_by_apt', label: 'Owner (Aparatment)', placeholder: 'Enter Appratment', type:'text'},
      	],
				formState: {'issue': '', 'details': '', 'created_by_name': '', 'created_by_apt': '', 'status': 'open', 'date': this.formattedDate,}
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
		randomID() {
			const r = (Math.random() + 1).toString(36).substring(7);
			return r;
		}, 
		},
		created() {
	     this.formState.date = this.formattedDate;
	  
	  },
		methods: {
		  showModal() {
		    this.visible = true
		  },
			modalHandleCancel() {
				this.visible = false
				this.formState = {'issue': '', 'details': '', 'date': this.formattedDate, 'created_by_apt': '', 'created_by_name': ''}
			},
			async modalHandleOk(handleOnFinish) {
				try {
					//this.formState.date = this.formState.date.format('YYYY-MM-DD');
					let res = await this.addMaintenance({maintenance: this.formState})
					if(res) {
						this.$refs.formFields.onFinish(true);
						this.visible = false;
						this.formState = {'issue': '', 'details': '', 'date': this.formattedDate, 'created_by_apt': '', 'created_by_name': '', }
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
			...mapActions('maintenance', ['addMaintenance'])
		  },
	})

</script>
