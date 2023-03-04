<template>

	<!-- Orders History Timeline Card -->
	<a-card v-if="data" :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: '12px',}">
		<template #title>
			<h6>Latest Transactions</h6>			
		</template>
		<a-timeline  v-if="data " :data-source="data">
			<span v-if="data[0] && data[0].transaction_amount.type == 1" >
				<a-timeline-item color="green">
					
									${{ data[0].transaction_amount.amount }},
									{{ data[0].details }}
					<p>{{ data[1].date }}</p>
				</a-timeline-item>
			</span><span v-else >
				<a-timeline-item color="red">
					-${{ data[0].transaction_amount.amount }},		
					{{ data[0].details }}
					<p>{{ data[0].date }}</p>
				</a-timeline-item>
			</span>
			<span v-if="data[1] && data[1].transaction_amount.type == 1" >
				<a-timeline-item color="green">
					
									${{ data[1].transaction_amount.amount }},
									{{ data[1].details }}
					<p>{{ data[1].date }}</p>
				</a-timeline-item>
			</span><span v-else >
				<a-timeline-item color="red">
					-${{ data[1].transaction_amount.amount }},		
					{{ data[1].details }}
					<p>{{ data[1].date }}</p>
				</a-timeline-item>
			</span>
			<span v-if="data[2] && data[2].transaction_amount.type == 1" >
				<a-timeline-item color="green">
					
									${{ data[2].transaction_amount.amount }},
									{{ data[2].details }}
					<p>{{ data[1].date }}</p>
				</a-timeline-item>
			</span><span v-else >
				<a-timeline-item color="red">
					-${{ data[2].transaction_amount.amount }},		
					{{ data[2].details }}
					<p>{{ data[2].date }}</p>
				</a-timeline-item>
			</span>
			<a-timeline-item color="red">
				New card added for order #4826321
				<p>02 JUN 2:45 PM</p>
			</a-timeline-item>
			<a-timeline-item color="red">
				Unlock folders for development
				<p>18 MAY 1:30 PM</p>
			</a-timeline-item>
			<a-timeline-item color="red">
				New order #46282344
				<p>14 MAY 3:30 PM</p>
			</a-timeline-item>
			<template #pendingDot> </template>
		</a-timeline>
		
	</a-card>
	<!-- / Orders History Timeline Card -->

</template>

<script>

	export default ({
		props: {
			data: {
				type: [],
				default: () => [{details:"test", date:"test date"}],
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
