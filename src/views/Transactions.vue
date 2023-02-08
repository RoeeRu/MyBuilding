<!-- 
	This is the transactions page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

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

		<!-- Projects Table -->
		<a-row :gutter="24" type="flex">

			<!-- Projects Table Column -->
			<a-col :span="24" class="mb-24">

				<!-- Projects Table Column -->
				<CardProjectTable2
					:data="table2Data"
					:columns="table2Columns"
				></CardProjectTable2>
				<!-- / Projects Table Column -->

			</a-col>
			<!-- / Projects Table Column -->

		</a-row>
		<!-- / Projects Table -->

	</div>
</template>

<script>

	// "Transactions" table component.
	import CardTransactionTable from '../components/Cards/CardTransactionsTable' ;

	// "Projects" table component.
	import CardProjectTable2 from '../components/Cards/CardProjectTable2' ;
import CardTransactionsTable from '../components/Cards/CardTransactionsTable.vue';
	
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
			title: 'Transaction',
			dataIndex: 'transaction',
			scopedSlots: { customRender: 'transaction' },
		},
		
		{
			title: 'STATUS',
			dataIndex: 'status',
			scopedSlots: { customRender: 'status' },
		},
		{
			title: 'Transaction Date',
			dataIndex: 'date',
			class: 'text-muted',
		},
		{
			title: '',
			scopedSlots: { customRender: 'editBtn' },
			width: 50,
		},
	];

	// "Transactions" table list of rows and their properties.
	const table1Data = [
		{
			key: '1',
			
			date: '23/04/18',
			transaction: {
				avatar: 'images/face-2.jpg',
				name: 'Michael John',
				email: 'michael@mail.com',
			},
			source: {
				type: 'Bank',
				details: '(... 2341)',
			},
			status: 1,
		},
		{
			key: '2',
			
			date: '23/12/20',
			transaction: {
				avatar: 'images/face-3.jpg',
				name: 'Alexa Liras',
				email: 'alexa@mail.com',
			},
			source: {
				type: 'Manual',
				details: 'Daniel, apt. 3a',
			},
			status: 0,
		},
		
	];
	
	// "Projects" table list of columns and their properties.
	const table2Columns = [
		{
			title: 'COMPANIES',
			dataIndex: 'company',
			scopedSlots: { customRender: 'company' },
			width: 300,
		},
		{
			title: 'BUDGET',
			dataIndex: 'budget',
			class: 'font-semibold text-muted',
		},
		{
			title: 'STATUS',
			dataIndex: 'status',
			class: 'font-semibold text-muted text-sm',
		},
		{
			title: 'COMPLETION',
			scopedSlots: { customRender: 'completion' },
			dataIndex: 'completion',
		},
		{
			title: '',
			scopedSlots: { customRender: 'editBtn' },
			width: 50,
		},
	];

	// "Projects" table list of rows and their properties.
	const table2Data = [
		{
			key: '1',
			company: {
				name: 'Spotify Version',
				logo: 'images/logos/logo-spotify.svg',
			},
			status: "working",
			budget: '$14,000',
			completion: 60,
		},
		{
			key: '2',
			company: {
				name: 'Progress Track',
				logo: 'images/logos/logo-atlassian.svg',
			},
			status: "working",
			budget: '$3,000',
			completion: 10,
		},
		{
			key: '3',
			company: {
				name: 'Jira Platform Errors',
				logo: 'images/logos/logo-slack.svg',
			},
			status: "done",
			budget: 'Not Set',
			completion: {
				status: 'success',
				value: 100,
			},
		},
		{
			key: '4',
			company: {
				name: 'Launch new Mobile App',
				logo: 'images/logos/logo-spotify.svg',
			},
			status: "canceled",
			budget: '$20,600',
			completion: {
				status: 'exception',
				value: 50,
			},
		},
		{
			key: '5',
			company: {
				name: 'Web Dev',
				logo: 'images/logos/logo-webdev.svg',
			},
			status: "working",
			budget: '$4,000',
			completion: 80,
		},
		{
			key: '6',
			company: {
				name: 'Redesign Online Store',
				logo: 'images/logos/logo-invision.svg',
			},
			status: "canceled",
			budget: '$2,000',
			completion: {
				status: 'exception',
				value: 0,
			},
		},
	];

	export default ({
		components: {
    CardTransactionTable,
    CardProjectTable2,
    CardTransactionsTable
},
		data() {
			return {
				// Associating "Transactions" table data with its corresponding property.
				table1Data: table1Data,

				// Associating "Transactions" table columns with its corresponding property.
				table1Columns: table1Columns,

				// Associating "Projects" table data with its corresponding property.
				table2Data: table2Data,

				// Associating "Projects" table columns with its corresponding property.
				table2Columns: table2Columns,
			}
		},
	})

</script>

<style lang="scss">
</style>