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
								+ {{ transaction_amount.amount | currency('$', 0)}}
							</span>
							<span v-if="transaction_amount.type == 0" class="text-warning">
								Pending
							</span>
							<span v-if="transaction_amount.type == -1" class="text-danger">
								- {{ transaction_amount.amount | currency('$', 0)}}
							</span>
				</div>
			</template>




			<template v-if="row.source.type === 'Manual'" slot="actionsBtn" slot-scope="row">
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
					v-if="visible"
					:title="modalTitle"
				 	@handleOk="modalHandleOk"
					:handle-cancel="modalHandleCancel"
				>
				<MainForm ref="formFields" :formFields="transactionInputs" :isEdit="isEdit" :title="modalTitle"></MainForm>
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
				modalTitle: "Edit Request",
				transactionInputs: [
					{ name: 'date', label: 'Transaction Date', type:'date', rules: ['required']},
					{ name: 'type', label: 'Transaction Type', type:'selectBox', 'options': [{value: '-1', text: 'Expense'}, {value: '1', text: 'Income'}], rules: ['required']},
      		{ name: 'amount', label: 'Amount', placeholder:'Enter Amount', type:'currency', rules: ['required']},
      		{ name: 'details', label: 'Details', placeholder:'Enter Details', type:'text', rules: ['required']},
					{ name: 'manual_name', label: 'Paid By (Name)', placeholder: 'Enter Name', type:'text', rules: ['required']},
					{ name: 'manual_apt', label: 'Paid By (Appratment)', placeholder: 'Enter Appratment', type:'text', rules: ['']},
      	],
				rowDate: '',
				rowDet: '',
				rowKey: '',
				isEdit: false
			}
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
				this.transactionInputs.forEach((value, index) => {
					if(this.transactionInputs[index].name === 'manual_name' || this.transactionInputs[index].name === 'manual_apt'){
						this.transactionInputs[index].value = row['source'][this.transactionInputs[index].name]
					}  else if (this.transactionInputs[index].name === 'date') {
						const rowDate = row[this.transactionInputs[index].name];
						const momentRowDate = moment(rowDate, 'MM/DD/YYYY');
						const date = momentRowDate.isValid() ? momentRowDate : null;
						this.transactionInputs[index].value = date;
					} else if (this.transactionInputs[index].name === 'amount' || this.transactionInputs[index].name === 'type') {
						this.transactionInputs[index].value = row['transaction_amount'][this.transactionInputs[index].name]
					} else {
						this.transactionInputs[index].value = row[this.transactionInputs[index].name]
					}
				});
				this.isEdit = true
				this.visible = true
				this.rowDate = row.date
				this.rowDet = row.details
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
					console.log();
					let res = await this.updateTransaction({transaction: {...this.$refs.formFields.formData,
						 ...{key: this.rowKey}}})

					console.log('modalHandleOk', res)
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
		  ...mapActions('transactions', ['updateTransaction', 'deleteTransaction'])
		},
	})

</script>
