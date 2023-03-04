<template>

	<!-- Orders History Timeline Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: '12px',}">
		<template #title>
			<h6>Latest Transactions</h6>			
		</template>
		<a-timeline  >
			<div v-for="(transaction, index) in data.slice(0, 6)" :key="index">	
				<span v-if="transaction.transaction_amount.type == 1" >
				<a-timeline-item color="green">
					
									${{ transaction.transaction_amount.amount }},
									{{ transaction.details }}
					<p>{{ transaction.date }}</p>
				</a-timeline-item>
			</span>
			<span v-else >
				<a-timeline-item color="red">
					-${{ transaction.transaction_amount.amount }},		
					{{ transaction.details }}
					<p>{{ transaction.date }}</p>
				</a-timeline-item>
			</span>
			</div>
		</a-timeline>
		
	</a-card>
	<!-- / Orders History Timeline Card -->

</template>

<script>

	export default ({
		props: {
			data: {
				type: [],
				default: () => [{details:"test", date:"test date", transaction_amount:{"amount": 0, "type": 1}}],
			},
		},
		data() {
			return {

				// Whether or not the timeline in "Orders History" card is reversed.
				timelineReverse: false,
			}
		},
	})

</script>
