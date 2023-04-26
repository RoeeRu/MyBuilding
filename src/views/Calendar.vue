<!-- 
	This is the calendar page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

				<!-- Calendar  Card -->
					<CardCalendarLarge></CardCalendarLarge>

				
				<!-- / Calendar  Card -->

		<!-- / Calendar  -->

	</div>
</template>

<script>

	// "Deliveries" table component.
	import CardDeliveriesActions from '../components/Cards/CardDeliveriesActions.vue';
	import { mapActions } from 'vuex'
	import { mapState } from 'vuex'
	import CardCalendarLarge from '../components/Cards/CardCalendarLarge.vue';
	
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
	CardDeliveriesActions,
	CardCalendarLarge,
		},
		props: {
			data: {
				type: Array,
				default: () => [],
			},
			columns: {
				type: Array,
				default: () => [],
			},
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