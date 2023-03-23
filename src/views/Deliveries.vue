<!-- 
	This is the maintenance page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<a-row  :gutter="24" type="flex">
			<a-col  :span="24" class="mb-24">
				<CardDeliveriesActions
					:data="table1Data"
					:columns="table1Columns">
				</CardDeliveriesActions>

			</a-col>

		</a-row>
		<!-- Deliveries Table -->
		<a-row :gutter="24" type="flex">

			<!-- Deliveries Table Column -->
			<a-col :span="24" class="mb-24">

				<!-- Deliveries Table Card -->
				<CardDeliveriesTable
					:data="demoDeliveryData"
					:columns="table1Columns"
				></CardDeliveriesTable>
				<!-- / Deliveries Table Card -->

			</a-col>
			<!-- / Deliveries Table Column -->

		</a-row>
		<!-- / Deliveries Table -->

	</div>
</template>

<script>

	// "Deliveries" table component.
	import CardDeliveriesTable from '../components/Cards/CardDeliveriesTable.vue';
	import CardDeliveriesActions from '../components/Cards/CardDeliveriesActions.vue';
	import { mapActions } from 'vuex'
	import { mapState } from 'vuex'
	
	// "Deliveries" table list of columns and their properties.
	const  demoDeliveryData = [
		{
			key: '1',
			date: '10/01/2022',
			created_by: {created_by_name:'John Milk', created_by_apt: 'Apt 11'},
			issue: 'Fedex',
			status: 'Ready',
			details: 'Waiting in the package room',
			actions: '',
		},
		{
			key: '2',
			date: '11/11/2022',
			created_by: {created_by_name:'Sam Brown', created_by_apt: 'Apt 21'},
			issue: 'Amazon',
			status: 'Picked Up',
			details: '',
			actions: '',
		},
	
	]
	
	
	const table1Columns = [
		{
			title: 'Date Added',
			dataIndex: 'date',
			class: 'text-muted',
		},
		{
			title: 'Delivery For',
			dataIndex: 'created_by',
			scopedSlots: { customRender: 'created_by' },
		},
		{
			title: 'Delivery From',
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
		},
	];

	

	export default ({
		components: {
    CardDeliveriesTable,
	CardDeliveriesActions
},
		data() {
			return {

				// Associating "Deliveries" table columns with its corresponding property.
				table1Columns: table1Columns,
				demoDeliveryData: demoDeliveryData,

				
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
			window.analytics.page('Deliveries');
			await this.getMaintenance();
		},
	})

</script>

<style lang="scss">
</style>