<template>

	<!-- Maintenance actions Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0,}">

		<template #title>
			<a-row type="flex" align="middle">

				<a-col :span="24" :md="3" :xs="12">
					<a-button type="primary"
						@click="showModal"
					>
						Add Request
					</a-button>
				</a-col>
				<a-col :span="24" :md="2" :xs="12">

					<a-button type="primary" icon="download"
						@click="download"/>
				</a-col>
				<a-col :span="24" :md="8" class="add-item-col">
					<!-- Header Search Input -->
					<a-input-search class="header-search"  placeholder="Search for request..." v-model="searchValue" @input="tableSearch">

					</a-input-search>
					<!-- / Header Search Input -->
				</a-col>
			</a-row>
			<MainModal
					v-if="visible"
					:title="modalTitle"
				 	@handleOk="modalHandleOk"
					:handle-cancel="modalHandleCancel"
				>
				<MainForm ref="formFields" :formFields="MaintenanceInputs" :title="modalTitle"></MainForm>
			</MainModal>
		</template>

	</a-card>
	<!-- Maintenance actions Card -->

</template>

<script>
import MainModal from '../Modal/MainModal.vue';
import MainForm from '../Forms/MainForm.vue';
import { mapActions } from 'vuex'
import { jsontoexcel } from "vue-table-to-excel";
import debounce from 'lodash/debounce'

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
				modalTitle: "Add Work Order",
				MaintenanceInputs: [
					{ name: 'issue', label: 'Issue', placeholder: 'Enter Title', type:'text', rules: ['required']},
					{ name: 'area', label: 'Area', type:'selectBox', 'options': [{value: 'Common Area', text: 'Common Area'}, {value: 'In-Unit', text: 'In-Unit'}], rules: ['required']},
      		{ name: 'details', label: 'Details', placeholder:'Enter Details', type:'text', rules: []},
					{ name: 'created_by_name', label: 'Owner (Name)', placeholder: 'Enter Name', type:'text', rules: ['required']},
					{ name: 'created_by_apt', label: 'Owner (Apartment)', placeholder: 'Enter Appratment', type:'text', rules: ['required']},
      	],
				searchValue: ''
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
		methods: {
			download() {
				// create array from data object, add created_by_name and created_by_apt and remove created_by
				const dataDownload = this.data.map((item) => {
					return {
						date: item.date,
						created_by : item.created_by.created_by_name + " - " + item.created_by.created_by_apt,
						issue : item.issue,
						area : item.area,
						status: item.status,
						details: item.details,
					};
				});
				//get title from columns object into new array
				const head = this.columns.map((item) => item.title);
				const fileName = "Work Orders -" + this.formattedDate + '.csv';
				console.log("download", dataDownload, head, fileName);
				jsontoexcel.getXlsx(dataDownload, head, fileName);
				},

		  showModal() {
		    this.visible = true
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
					let res = await this.addMaintenance({maintenance: {...this.$refs.formFields.formData, ...{status: "Open", date: this.formattedDate}}})
					if(res) {
						this.$refs.formFields.onFinish(true);
						this.visible = false;
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
			tableSearch() {
				let debouncedSearch = debounce(() => {
				  this.filterMaintenanceData({searchValue: this.searchValue})
				}, 500)
      	debouncedSearch()
			},
			...mapActions('maintenance', ['addMaintenance', 'filterMaintenanceData'])
		  },
	})

</script>

<style media="screen">
	@media screen and (max-width: 767px) {
		.add-item-col {
			padding-top: 20px; /* add desired padding value */
		}
	}
</style>
