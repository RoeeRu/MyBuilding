<template>

	<!-- Transactions actions Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0,}">

		<template #title>
			<a-row type="flex" align="middle">

				<a-col :span="24" :md="4" :xs="12">
					<a-button type="primary"
						@click="showModal"
					>
						Add Transaction
					</a-button>
				</a-col>
				<a-col :span="24" :md="2" :xs="12">

					<a-button type="primary" icon="download"
						@click="download"/>
				</a-col>
				<a-col :span="24" :md="7"  class="add-item-col">
					<!-- Header Search Input -->
					<a-input-search class="header-search"  placeholder="Search for transaction…" v-model="searchValue" @input="tableSearch" >
						
					</a-input-search>
					<!-- / Header Search Input -->
				</a-col>
			</a-row>
			<MainModal
					:visible="visible"
					:title="modalTitle"
				 	@handleOk="modalHandleOk"
					:handle-cancel="modalHandleCancel"
				>
				<MainForm ref="formFields" :formFields="transactionInputs" :title="modalTitle"></MainForm>
			</MainModal>
		</template>

	</a-card>
	<!-- Transactions actions Card -->

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
				modalTitle: "Add Transaction",
				transactionInputs: [
					{ name: 'date', label: 'Transaction Date', type:'date', rules: ['required']},
					{ name: 'type', label: 'Transaction Type', type:'selectBox', 'options': [{value: '-1', text: 'Cost'}, {value: '1', text: 'Income'}], rules: ['required']},
					{ name: 'amount', label: 'Amount', placeholder:'Enter Amount', type:'currency', rules: ['required', 'numeric']},
					{ name: 'details', label: 'Details', placeholder:'Enter Details', type:'text', rules: ['required']},
					{ name: 'manual_name', label: 'Paid By (Name)', placeholder: 'Enter Name', type:'text', rules: ['required']},
					{ name: 'manual_apt', label: 'Paid By (Appratment)', placeholder: 'Enter Appratment', type:'text', rules: ['required']},
					// { name: 'age', label: 'Select Age', type:'selectBox', 'options': [{value: 'minor', text: '11-22'}, {value: 'addult', text: '22-44'}]},
					// { name: 'file', label: 'Upload File', type:'uploadFile'},
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
						source : item.source.type + " - " + item.source.details,
						// transaction_amount is an object with amount and type. We need to convert them to numbers and multiply them to get the final amount
						amount: item.transaction_amount.amount * item.transaction_amount.type,
						details: item.details,
					};
				});
				//get title from columns object into new array
				const head = this.columns.map((item) => item.title);
				const fileName = "Transactions-" + this.formattedDate + '.csv';
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
					let res = await this.addTransaction({transaction: this.$refs.formFields.formData})
					if(res) {
						this.$refs.formFields.onFinish(true);
						this.visible = false;
					} else {
						console.log('modalHandleOk',res )
						this.$refs.formFields.onFinish(false);
					}
				} catch (e) {
					console.log('modalHandleOk',e )
					this.$refs.formFields.onFinish(false);
				} finally {
					handleOnFinish()
				}
		  },
			tableSearch() {
				let debouncedSearch = debounce(() => {
					this.filterTransactionData({searchValue: this.searchValue})
				}, 500)
				debouncedSearch()
			},
			...mapActions('transactions', ['addTransaction', 'filterTransactionData'])
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
