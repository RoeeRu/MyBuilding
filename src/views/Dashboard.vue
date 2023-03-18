<!--
	This is the dashboard page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>
	<loading
				 v-if="loading"
				 :active="loading"
				 :can-cancel="true"
				 :on-cancel="onCancel"
				 :is-full-page="fullPage"/>

	<div v-else>
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
				<CardFinanceChart
				v-if="Object.keys(chartData).length !== 0"
				:chart_data="chartData"></CardFinanceChart>
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

		import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';



		export default ({
			components: {
	    CardFinanceChart,
	    CardTransactionHistory,
			CardProjectsDashboard,
			CardDashboardWidgets,
			Loading
		},

		data() {
			return {
				loading: true,
        fullPage: true
			}
		},

		mounted() {
			Promise.all([this.getWidgets(), this.getChart()])
			.then(() => {
				this.loading = false
			})

			this.getTransactions().catch(error => {
          console.log('getTransactions failed');
      });

			this.getProjects().catch(error => {
          console.log('getProjects failed');
      });

		},
		computed: {
			...mapState({
				transactionsData: state => state.transactions.transactions,
				widgetsData: state => state.dashboard.widgetsInfo,
				projectsData: state => state.dashboard.projectsInfo,
				chartData: state => state.dashboard.chartInfo,
			})
		},
		methods: {
			...mapActions({
				getTransactions: 'transactions/getTransactions',
				getWidgets: 'dashboard/getWidgets',
				getProjects: 'dashboard/getProjects',
				getChart: 'dashboard/getChart',
				onCancel() {
						console.log('User cancelled the loader.')
				}
			}),
		},
	})

</script>

<style lang="scss">
</style>
