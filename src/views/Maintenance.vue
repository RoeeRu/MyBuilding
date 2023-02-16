<!-- 
	This is the maintenance page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<a-row  :gutter="24" type="flex">
			<a-col  :span="24" class="mb-24">
				<CardMaintenanceActions></CardMaintenanceActions>

			</a-col>

		</a-row>
		<!-- Maintenance Table -->
		<a-row :gutter="24" type="flex">

			<!-- Maintenance Table Column -->
			<a-col :span="24" class="mb-24">

				<!-- Maintenance Table Card -->
				<CardMaintenanceTable
					:data="table1Data"
					:columns="table1Columns"
				></CardMaintenanceTable>
				<!-- / Maintenance Table Card -->

			</a-col>
			<!-- / Maintenance Table Column -->

		</a-row>
		<!-- / Maintenance Table -->

	</div>
</template>

<script>

	// "Maintenance" table component.
	import CardMaintenanceTable from '../components/Cards/CardMaintenanceTable.vue';
	import CardMaintenanceActions from '../components/Cards/CardMaintenanceActions.vue';
	
	// "Maintenance" table list of columns and their properties.
	const table1Columns = [
		{
			title: 'Date Created',
			dataIndex: 'date',
			class: 'text-muted',
		},
		{
			title: 'Created By',
			dataIndex: 'creator',
			scopedSlots: { customRender: 'creator' },
		},
		{
			title: 'Issue',
			dataIndex: 'issue',
			class: 'font-semibold text-muted text-md',
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
			issue: "Broken Door Handle",
			details: "The handle on the entrance door is very loose and about to fall",
		},
		{
			key: '2',
			
			date: '23/12/20',
			
			creator: {
				type: 'David Mos',
				details: 'Apt. 4a',
			},
			issue: "Roof leakage",
			status: 0,
			details: "I see some wetnes on our northen wall",
		},
		
	];
	
	

	

	export default ({
		components: {
    CardMaintenanceTable,
	CardMaintenanceActions
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