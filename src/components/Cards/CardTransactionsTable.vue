<template>

	<!-- Transactions Table Card -->

	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<a-table :columns="columns" :data-source="data" :pagination="true">

			<template slot="transaction" slot-scope="transaction">
				<div class="table-avatar-info">
					<a-avatar shape="square" :src="transaction.avatar" />
					<div class="avatar-info">
						<h6>{{ transaction.name }}</h6>
						<p>{{ transaction.email }}</p>
					</div>
				</div>
			</template>

			<template slot="func" slot-scope="func">
				<div class="transaction-info">
					<h6 class="m-0">{{ func.job }}</h6>
					<p class="m-0 font-regular text-muted">{{ func.department }}</p>
				</div>
			</template>

			<template slot="source" slot-scope="source">
				<div class="source-info">
					<h6 class="m-0">{{ source.type }}</h6>
					<p class="m-0 font-regular text-muted">{{ source.details }}</p>
				</div>
			</template>

			<template slot="transaction_amount" slot-scope="transaction_amount">
				<div class="transaction_amount-info">
							<span v-if="transaction_amount.type == 1" class="text-success">
								+ ${{ transaction_amount.amount }}
							</span>
							<span v-if="transaction_amount.type == 0" class="text-warning">
								Pending
							</span>
							<span v-if="transaction_amount.type == -1" class="text-danger">
								- ${{ transaction_amount.amount }}
							</span>
				</div>
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
					</a-menu>
				</a-dropdown>
			<MainModal
					:visible="visible"
					:title="modelTitle"
				 	@handleOk="modalHandleOk"
					:handle-cancel="modalHandleCancel"
				>
				<MainForm ref="formFields" :formFields="transactionInputs" :formState="formState"></MainForm>
			</MainModal>
			</template>

		</a-table>
	</a-card>
	<!-- / Transactions Table Card -->

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
				modelTitle: "Add Request",
				transactionInputs: [
					{ name: 'date', label: 'Transaction Date', type:'date'},
					{ name: 'type', label: 'Transaction Type', type:'selectBox', 'options': [{value: '-1', text: 'Cost'}, {value: '1', text: 'Income'}]},
	        		{ name: 'amount', label: 'Amount', placeholder:'Enter Amount', type:'currency'},
	        		{ name: 'details', label: 'Details', placeholder:'Enter Details', type:'text'},
					{ name: 'manual_name', label: 'Paid By (Name)', placeholder: 'Enter Name', type:'text'},
					{ name: 'manual_apt', label: 'Paid By (Appratment)', placeholder: 'Enter Appratment', type:'text'},
      	],
				formState: {'type': '', 'amount': '', 'manual_name': '', 'manual_apt': '', 'details': '', 'date': this.formattedDate,}
			
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
					let res = await this.deleteTransaction({transaction: row})					
					} catch (e) {
						console.log('modalHandleOk error', e)
					} 
			}
			},
			showModal(row) {
				this.visible = true
				this.formState.type = row.transaction_amount.type
				this.formState.amount = row.transaction_amount.amount
				this.formState.manual_name = row.source.manual_name
				this.formState.manual_apt = row.source.manual_apt
				this.formState.date = row.date
				this.formState.details = row.details
				this.formState.key = row.key
		  },
			modalHandleCancel() {
				this.visible = false
				this.formState = {'type': '', 'amount': '', 'manual_name': '', 'manual_apt': '',  'details': '', 'date': this.formattedDate,}
			},
			async modalHandleOk(handleOnFinish) {
				try {
					//this.formState.date = this.formState.date.format('YYYY-MM-DD');
					let res = await this.updateTransaction({transaction: this.formState})
					console.log('modalHandleOk', res)
					if(res) {
						this.$refs.formFields.onFinish(true);
						this.visible = false;
						this.formState = {'type': '', 'amount': '','manual_name': '', 'manual_apt': '',  'details': '', 'date': this.formattedDate,}
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
		  ...mapActions('transactions', ['updateTransaction', 'deleteTransaction'])
		},
	})

</script>