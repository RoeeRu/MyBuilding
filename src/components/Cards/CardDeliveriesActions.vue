<template>

	<!-- Deliveries deliveries Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0,}">

		<template #title>
			<a-row type="flex" align="middle">

				<a-col :span="24" :md="4" :xs="12">
					<a-button type="primary"
						@click="showModal"
					>
						Add Item
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
				<MainForm ref="formFields" :formFields="deliveryInputs" :title="modalTitle" ></MainForm>
			</MainModal>
		</template>

	</a-card>
	<!-- Deliveries deliveries Card -->

</template>

<script>
import MainModal from '../Modal/MainModal.vue';
import MainForm from '../Forms/MainForm.vue';
import { mapActions } from 'vuex'
	import { mapState } from 'vuex'
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
				modalTitle: "Add New Delivery",
				deliveryInputs: [
      		{ name: 'owner', label: 'Delivery For', type:'searchSelect', rules: ['required']},
      		{ name: 'from', label: 'Delivery From', placeholder:'', type:'selectBox', 'options': [
						{value: 'Amazon', text: 'Amazon'},
						{value: 'UPS', text: 'UPS'},
						{value: 'Fedex', text: 'Fedex'},
						{value: 'Other', text: 'Other'}],
						rules: ['required']},
      		{ name: 'details', label: 'Details', placeholder:'Enter Details', type:'text', rules: ['']},
      	],
				searchValue: ''
			}
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
			await this.getMembersInformation();
			const inputIndex = this.deliveryInputs.indexOf(this.deliveryInputs.find(el => el.name === 'owner'));

			this.deliveryInputs[inputIndex].membersInfo =  this.membersInfo;
		},
		methods: {
			download() {
				// create array from data object, add created_by_name and created_by_apt and remove created_by
				const dataDownload = this.data.map((item) => {
					return {
						from : item.from,
						status: item.status,
						details: item.details,
						date: item.due_date,
						owner: item.owner.name + " - " + item.owner.apt
					};
				});
				//get title from columns object into new array
				const head = this.columns.map((item) => item.title);
				const fileName = "Deliveries -" + this.formattedDate + '.csv';
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
					let formFields = this.$refs.formFields.formData;
					let user_id = this.membersInfo[formFields.owner].user_id;
					formFields.owner = {
						apartment:this.membersInfo[formFields.owner].apartment,
						name: this.membersInfo[formFields.owner].name,
						email: this.membersInfo[formFields.owner].email,
					}
					let res = await this.addDelivery({delivery: {...formFields, ...{status: "Ready", date: this.formattedDate, user_id: user_id}}})
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
				  this.filterDeliveryData({searchValue: this.searchValue})
				}, 500)
      	debouncedSearch()
			},
			...mapActions(
				'deliveries', ['addDelivery', 'filterDeliveryData']),
				
			...mapActions({
				getMembersInformation: 'building/getMembersInformation'
			})
		}
	})

</script>


<style media="screen">
	@media screen and (max-width: 767px) {
		.add-item-col {
			padding-top: 20px; /* add desired padding value */
		}
	}
</style>
