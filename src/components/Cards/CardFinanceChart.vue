<template>

	<a-card :bordered="false" class="dashboard-bar-line header-solid">
		<template #title>
			<h6>Income vs. Expenses</h6>				
		</template>
		<template #extra>
			<a-badge color="primary" class="badge-dot-primary" text="Income" />
			<a-badge color="primary" class="badge-dot-secondary" text="Costs" />
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
		data() {
			return {

				// Data for line chart.
				lineChartData: {
					labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					datasets: [{
						label: "Budget",
						tension: 0.4,
						borderWidth: 0,
						pointRadius: 0,
						borderColor: "#1890FF",
						borderWidth: 3,
						data: [500, 500, 500, 500, 500, 500, 600, 600, 600, 600, 600, 600],
						maxBarThickness: 6

					},
					{
						label: "Expenses",
						tension: 0.4,
						borderWidth: 0,
						pointRadius: 0,
						borderColor: "#B37FEB",
						borderWidth: 3,
						data: [450, 330,700, 1300, 400, 500, 330, 700, 1300, 400, 500, 330],
						maxBarThickness: 6

					}],
				},
			}
		},
	})

</script>