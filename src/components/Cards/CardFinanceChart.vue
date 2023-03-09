<template>

	<a-card :bordered="false" class="dashboard-bar-line header-solid">
		<template #title>
			<h6>Income vs. Expenses</h6>				
		</template>
		<template #extra>
			<a-badge color="primary" class="badge-dot-primary" text="Income" />
			<a-badge color="primary" class="badge-dot-danger" borderColor="FF0000" text="Costs" />
		</template>
		<chart-line :height="310" :data="lineChartData"></chart-line>
	</a-card>

</template>

<script>

	// Bar chart for "Active Users" card.
	import ChartLine from '../Charts/ChartLine' ;

	export default ({
		components: {
			ChartLine,
		},
		props: {
			chart_data: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

				// Data for line chart.
				lineChartData: {
					labels: this.chart_data.chart_labels,
					datasets: [{
						label: "Expenses",
						tension: 0.4,
						borderWidth: 0,
						pointRadius: 2,
						borderColor: "#1890FF",
						borderWidth: 3,
						data: this.chart_data.income_data,
						maxBarThickness: 6

					},
					{
						label: "Expenses",
						tension: 0.4,
						borderWidth: 0,
						pointRadius: 2,
						borderColor: "#FF0000",
						borderWidth: 3,
						data: this.chart_data.expenses_data,
						maxBarThickness: 6

					}],
				},
			}
		},
	})

</script>