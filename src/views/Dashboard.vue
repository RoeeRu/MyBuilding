<!--
	This is the dashboard page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<!-- Counter Widgets -->
		<a-row :gutter="24">
			<CardDashboardWidgets
			:stats="widgetsData">
		</CardDashboardWidgets>
		</a-row>
		<!-- / Counter Widgets -->

		<!-- First row -->
		<a-row :gutter="24" type="flex" align="stretch">
			<a-col :span="24" :lg="16" class="mb-24">

				<!-- Sales Overview Card -->
				<CardFinanceChart></CardFinanceChart>
				<!-- / Sales Overview Card -->
			</a-col>
			<!-- Timeline -->
			<a-col :span="24" :lg="8" class="mb-24">

				<!-- Orders History Timeline Card -->
				<CardTransactionHistory 
					:data="transactionsData"></CardTransactionHistory>
				<!-- / Orders History Timeline Card -->

			</a-col>
		<!-- / Timeline -->
		</a-row>
		<!-- / First row -->

		<!-- Table & Timeline -->
		<!-- Projects Card -->
		<a-row  type="flex" align="stretch">
			<a-col :span="24" :lg="24" class="mb-24">
			<CardProjectsDashboard
				:projects="projectsData">
			</CardProjectsDashboard>
		<!-- / Projects Card -->
			</a-col>
		</a-row>

	</div>
</template>

<script>


	// Line chart for "Sales Overview" card.
	import CardFinanceChart from '../components/Cards/CardFinanceChart' ;

	// Orders History Timeline Card
	import CardTransactionHistory from '../components/Cards/CardTransactionHistory.vue';

	// ProjectsDashboard card
	import CardProjectsDashboard from '../components/Cards/CardProjectsDashboard.vue';
	
	import CardDashboardWidgets from '../components/Cards/CardDashboardWidgets.vue';

	import { mapActions } from 'vuex'
	import { mapState } from 'vuex'

	


	export default ({
		components: {
    CardFinanceChart,
    CardTransactionHistory,
	CardProjectsDashboard,
	CardDashboardWidgets,
},
		data() {
			return {
			}
		},
		async mounted() {
			await this.getTransactions();
			await this.getWidgets();
			await this.getProjects();
		},
		computed: {
			...mapState({
				transactionsData: state => state.transactions.transactions,
				widgetsData: state => state.dashboard.widgetsInfo,
				projectsData: state => state.dashboard.projectsInfo,
			})
		},
		methods: {
			...mapActions({
				getTransactions: 'transactions/getTransactions',
				getWidgets: 'dashboard/getWidgets',
				getProjects: 'dashboard/getProjects',

			}),
		},
	})

</script>

<style lang="scss">
</style>
