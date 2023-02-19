<!-- 
	This is the maintenance page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<a-row  :gutter="24" type="flex">
			<a-col  :span="24" class="mb-24">
				<CardActionsActions></CardActionsActions>

			</a-col>

		</a-row>
		<!-- Maintenance Table -->
		<a-row :gutter="24" type="flex">

			<!-- Maintenance Table Column -->
			<a-col :span="24" class="mb-24">

				<!-- Maintenance Table Card -->
				<CardActionsTable
					:data="table1Data"
					:columns="table1Columns"
				></CardActionsTable>
				<!-- / Maintenance Table Card -->

			</a-col>
			<!-- / Maintenance Table Column -->

		</a-row>
		<!-- / Maintenance Table -->

	</div>
</template>

<script>

	// "Maintenance" table component.
	import CardActionsTable from '../components/Cards/CardActionsTable.vue';
	import CardActionsActions from '../components/Cards/CardActionsActions.vue';
	
	// "Maintenance" table list of columns and their properties.
	const table1Columns = [
		{
			title: 'Item',
			dataIndex: 'item',
			scopedSlots: { customRender: 'item' },
		},
		
		{
			title: 'Added By',
			dataIndex: 'creator',
			scopedSlots: { customRender: 'creator' },
		},
		{
			title: 'STATUS',
			dataIndex: 'status',
			scopedSlots: { customRender: 'status' },
		},
		{
			title: 'Details',
			dataIndex: 'details',
			class: 'font-semibold text-muted text-sm',
		},
		{
			title: 'Due Date',
			dataIndex: 'date',
			class: 'text-muted',
		},
		
		
		{
			title: '',
			scopedSlots: { customRender: 'actionsBtn' },
			width: 50,
		},
	];

	// "Maintenance" table list of rows and their properties.
	const table1Data = [
		{
			key: '1',
			
			date: '23/04/18',
			
			creator: {
				type: 'Omri Gold',
				details: 'Apt. 3a',
			},
			status: 1,
			item: {name: "Prepare agenda for board meeting"},
			details: "The handle on the entrance door is very loose and about to fall",
		},
		{
			key: '2',
			
			date: '23/12/20',
			
			creator: {
				type: 'System',
			},
			item: {name: "Upload insurance doc"},
			status: 0,
			details: "I see some wetnes on our northen wall",
		},
		
	];
	
	

	

	export default ({
		components: {
    CardActionsTable,
	CardActionsActions
},
		data() {
			return {
				// Associating "Maintenance" table data with its corresponding property.
				table1Data: table1Data,

				// Associating "Maintenance" table columns with its corresponding property.
				table1Columns: table1Columns,

				
			}
		},
	})

</script>

<style lang="scss">
</style>