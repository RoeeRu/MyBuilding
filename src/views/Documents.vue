<!-- 
	This is the documents page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<a-row  :gutter="24" type="flex">
			<a-col  :span="24" class="mb-24">
				<!-- Documents actions Card -->
				<CardCardDocumentsActions></CardCardDocumentsActions>
				<!-- Documents actions Card -->

			</a-col>

		</a-row>
		<!-- Documents Table -->
		<a-row :gutter="24" type="flex">

			<!-- Documents Table Column -->
			<a-col :span="24" class="mb-24">

				<!-- Documents Table Card -->
				<CardDocumentsTable
					:data="table1Data"
					:columns="table1Columns"
				></CardDocumentsTable>
				<!-- / Documents Table Card -->

			</a-col>
			<!-- / Documents Table Column -->

		</a-row>
		<!-- / Documents Table -->

	</div>
</template>

<script>

	// "Documents" table component.
	import CardDocumentsTable from '../components/Cards/CardDocumentsTable.vue';
	import CardCardDocumentsActions from '../components/Cards/CardDocumentsActions.vue';

	// "Documents" table list of columns and their properties.
	const table1Columns = [
		{
			title: 'Document Name',
			dataIndex: 'document',
			class: 'font-bold',
			
		},
		{
			title: 'Type',
			dataIndex: 'type',
			class: 'font-semibold text-muted text-sm',
		},
		
		
		{
			title: 'Details',
			dataIndex: 'details',
			class: 'font-semibold text-muted text-sm',
		},
		{
			title: 'Date Uploaded',
			dataIndex: 'date',
			class: 'font-semibold text-muted text-sm',
		},
		
		
		{
			title: '',
			scopedSlots: { customRender: 'actionsBtn' },
		},
	];

	// "Documents" table list of rows and their properties.
	const table1Data = [
		{
			key: '1',
			document: 'insurance-2022-main.pdf',
			type: "Insurance",
			date: '23/04/18',
			
			details: "Final version of our insurance doc from 2022",
		},
		{
			key: '2',
			document: 'insurance-2021-main.pdf',
			type: "Other",
			date: '23/12/20',
			
			details: "Final version of our insurance doc from 2022",
		},
		
	];
	
	

	

	export default ({
		components: {
	CardDocumentsTable,
	CardCardDocumentsActions,
},
		data() {
			return {
				// Associating "Documents" table data with its corresponding property.
				table1Data: table1Data,

				// Associating "Documents" table columns with its corresponding property.
				table1Columns: table1Columns,

				
			}
		},
	})

</script>

<style lang="scss">
</style>