<!--
	This is the transactions page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<a-row  :gutter="24" type="flex">
			<a-col  :span="24" class="mb-24">
				<CardTransactionsActions
					:data="transactionsData"
					:columns="tableColumns">
				</CardTransactionsActions>

			</a-col>

		</a-row>
		<!-- Transactions Table -->
		<a-row :gutter="24" type="flex">

			<!-- Transactions Table Column -->
			<a-col :span="24" class="mb-24">

				<!-- Transactions Table Card -->
				<CardTransactionsTable
					:data="transactionsData"
					:columns="tableColumns"
				></CardTransactionsTable>
				<!-- / Transactions Table Card -->

			</a-col>
			<!-- / Transactions Table Column -->

		</a-row>
		<!-- / Transactions Table -->

	</div>
</template>

<script>

	// "Transactions" table component.
	import CardTransactionsTable from '../components/Cards/CardTransactionsTable.vue';
	import CardTransactionsActions from '../components/Cards/CardTransactionsActions.vue';
	import { mapActions } from 'vuex'
	import { mapState } from 'vuex'

	// "Transactions" table list of columns and their properties.
	const tableColumns = [
		{
			title: 'Transaction Date',
			dataIndex: 'date',
			class: 'text-muted',
		},
		{
			title: 'Source',
			dataIndex: 'source',
			scopedSlots: { customRender: 'source' },
		},
		{
			title: 'Transaction Amount',
			dataIndex: 'transaction_amount',
			scopedSlots: { customRender: 'transaction_amount' },
		},
		{
			title: 'Details',
			dataIndex: 'details',
			class: 'font-semibold text-muted text-sm',
		},


		{
			title: '',
			scopedSlots: { customRender: 'actionsBtn' },
		},
	];


	export default ({
		components: {
	    CardTransactionsTable,
			CardTransactionsActions
		},
		data() {
			return {
				// Associating "Transactions" table columns with its corresponding property.
				tableColumns: tableColumns,
			}
		},
		async mounted() {
			await this.getTransactions();
		},
		computed: {
			...mapState({
				transactionsData: state => state.transactions.transactions,
			})
		},
		methods: {
			...mapActions({
				getTransactions: 'transactions/getTransactions',

			}),
		},
	})

</script>

<style lang="scss">
</style>
