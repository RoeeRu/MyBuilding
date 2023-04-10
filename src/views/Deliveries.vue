<!-- 
	This is the delivery page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<a-row  :gutter="24" type="flex">
			<a-col  :span="24" class="mb-24">
				<CardDeliveriesActions
					:data="deliveriesData"
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
					:data="deliveriesData"
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
	
	
	
	const table1Columns = [
		{
			title: 'Date Added',
			dataIndex: 'date',
			class: 'text-muted',
		},
		{
			title: 'Recipient',
			dataIndex: 'owner',
			scopedSlots: { customRender: 'owner' },
		},
		{
			title: 'Delivery From',
			dataIndex: 'from',
			class: 'font-semibold text-muted text-sm',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			scopedSlots: { customRender: 'status' },
		},
		{
			title: 'Received By',
			dataIndex: 'received_by',
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

				
			}
		},
		computed: {
			...mapState({
				deliveriesData: state => state.deliveries.deliveries,
			})
		},
		methods: {
			...mapActions({
				getDeliveries: 'deliveries/getDeliveries',
				
			}),
		},
		async mounted() {
			window.analytics.page('Deliveries');
			await this.getDeliveries();
		},
	})

</script>

<style lang="scss">
</style>