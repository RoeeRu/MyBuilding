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
	import { mapActions } from 'vuex'
	import { mapState } from 'vuex'
	
	// "Maintenance" table list of columns and their properties.
	const table1Columns = [
		{
			title: 'Date Created',
			dataIndex: 'date',
			class: 'text-muted',
		},
		{
			title: 'Created By',
			dataIndex: 'created_by',
			scopedSlots: { customRender: 'created_by' },
		},
		{
			title: 'Issue',
			dataIndex: 'issue',
			class: 'font-semibold text-muted text-sm',
		},
		{
			title: 'Status',
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

	

	export default ({
		components: {
    CardMaintenanceTable,
	CardMaintenanceActions
},
		data() {
			return {

				// Associating "Maintenance" table columns with its corresponding property.
				table1Columns: table1Columns,

				
			}
		},
		computed: {
			...mapState({
				table1Data: state => state.maintenance.maintenance,
			})
		},
		methods: {
			...mapActions({
				getMaintenance: 'maintenance/getMaintenance',
				
			}),
		},
		async mounted() {
			console.log('Maintenance mounted'),
			await this.getMaintenance();
		},
	})

</script>

<style lang="scss">
</style>