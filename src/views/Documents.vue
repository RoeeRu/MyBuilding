<!-- 
	This is the documents page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<a-row  :gutter="24" type="flex">
			<a-col  :span="24" class="mb-24">
				<!-- Documents actions Card -->
				<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0,}">
					
					<template #title>
						<a-row type="flex" align="middle">
							
							<a-col :span="24" :md="4" >
								<a-button type="primary">
									Add Document
								</a-button>
							</a-col>
							<a-col :span="24" :md="8">
								<!-- Header Search Input -->
								<a-input-search class="header-search"  placeholder="Search for document…" >
									<svg slot="prefix" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z" fill="#111827"/>
									</svg>
								</a-input-search>
								<!-- / Header Search Input -->
							</a-col>
						</a-row>
					</template>
				
				</a-card>
				<!-- Documents actions Card -->

			</a-col>

		</a-row>
		<!-- Transactions Table -->
		<a-row :gutter="24" type="flex">

			<!-- Transactions Table Column -->
			<a-col :span="24" class="mb-24">

				<!-- Transactions Table Card -->
				<CardDocumentsTable
					:data="table1Data"
					:columns="table1Columns"
				></CardDocumentsTable>
				<!-- / Transactions Table Card -->

			</a-col>
			<!-- / Transactions Table Column -->

		</a-row>
		<!-- / Transactions Table -->

	</div>
</template>

<script>

	// "Transactions" table component.
	import CardDocumentsTable from '../components/Cards/CardDocumentsTable.vue';
	
	// "Transactions" table list of columns and their properties.
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
			title: 'Date Uploaded',
			dataIndex: 'date',
			class: 'font-semibold text-muted text-sm',
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