<!-- 
	This is the transactions page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<a-row  :gutter="24" type="flex">
			<a-col  :span="24" class="mb-24">
				<CardTransactionsActions></CardTransactionsActions>

			</a-col>

		</a-row>
		<!-- Transactions Table -->
		<a-row :gutter="24" type="flex">

			<!-- Transactions Table Column -->
			<a-col :span="24" class="mb-24">

				<!-- Transactions Table Card -->
				<CardTransactionsTable
					:data="table1Data"
					:columns="table1Columns"
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
	
	// "Transactions" table list of columns and their properties.
	const table1Columns = [
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
			width: 50,
		},
	];

	// "Transactions" table list of rows and their properties.
	const table1Data = [
		{
			key: '1',
			
			date: '23/04/18',
			
			source: {
				type: 'Bank',
				details: '(... 2341)',
			},
			transaction_amount: {
				amount: '14,000',
				type: -1,// 0 is for pending, 1 is for deposit, -1 is for withdrawal.
			},
			details: "Payment for boiler intallation",
		},
		{
			key: '2',
			
			date: '23/12/20',
			
			source: {
				type: 'Manual',
				details: 'Daniel, apt. 3a',
			},
			transaction_amount: {
				amount: '1,000',
				type: 1,// 0 is for pending, 1 is for deposit, -1 is for withdrawal.
			},
			details: "Monthly payment",
		},
		
	];
	
	

	

	export default ({
		components: {
    CardTransactionsTable,
	CardTransactionsActions
},
		data() {
			return {
				// Associating "Transactions" table data with its corresponding property.
				table1Data: table1Data,

				// Associating "Transactions" table columns with its corresponding property.
				table1Columns: table1Columns,

				
			}
		},
	})

</script>

<style lang="scss">
</style>