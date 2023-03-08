<!-- 
	This is the actions page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
	It uses the CardActionsTable component in:
	"./components/Cards/CardActionsTable.vue" .
	It gets the data from the store in:
	"./store/actions.js" .
 -->

<template>
	<div>
		<a-row  :gutter="24" type="flex">
			<a-col  :span="24" class="mb-24">
				<CardActionsActions></CardActionsActions>

			</a-col>

		</a-row>
		<!-- Actions Table -->
		<a-row :gutter="24" type="flex">

			<!-- Actions Table Column -->
			<a-col :span="24" class="mb-24">

				<!-- Actions Table Card -->
				<CardActionsTable
					:data="table1Data"
					:columns="table1Columns"
				></CardActionsTable>
				<!-- / Actions Table Card -->

			</a-col>
			<!-- / Actions Table Column -->

		</a-row>
		<!-- / Actions Table -->

	</div>
</template>

<script>

	// "Actions" table component.
	import CardActionsTable from '../components/Cards/CardActionsTable.vue';
	import CardActionsActions from '../components/Cards/CardActionsActions.vue';
	import { mapActions } from 'vuex'
	import { mapState } from 'vuex'
	
	// "Actions" table list of columns and their properties.
	const table1Columns = [
		{
			title: 'Item',
			dataIndex: 'item',
			scopedSlots: { customRender: 'item' },
		},
		
		{
			title: 'Submitted By',
			dataIndex: 'created_by', 
			scopedSlots: { customRender: 'created_by' },
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
			title: 'Due Date',
			dataIndex: 'due_date',
			class: 'font-semibold text-muted text-sm',
			width: 120,
		},
		
		
		{
			title: '',
			scopedSlots: { customRender: 'actionsBtn' },
		},
	];

	
	

	

	export default ({
		components: {
    CardActionsTable,
	CardActionsActions
},
		data() {
			return {

				// Associating "Actions" table columns with its corresponding property.
				table1Columns: table1Columns,

			}
		},
		computed: {
			...mapState({
				table1Data: state => state.actions.actions,
			})
		},
		methods: {
			...mapActions({
				getActions: 'actions/getActions',
			}),
		},
		mounted() {
			this.getActions();
		},
	})

</script>

<style lang="scss">
</style>