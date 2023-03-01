<template>

	<!-- Orders History Timeline Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: '12px',}">
		<template #title>
			<h6>Latest Transactions</h6>			
		</template>
		<a-timeline  >
			<a-timeline-item color="green">
				$2,400 - Redesign store
				<p>09 JUN 7:20 PM</p>
			</a-timeline-item>
			<a-timeline-item color="green">
				New order #3654323
				<p>08 JUN 12:20 PM</p>
			</a-timeline-item>
			<a-timeline-item color="red">
				Company server payments 
				<p>04 JUN 3:10 PM</p>
			</a-timeline-item>
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
		data() {
			return {

				// Whether or not the timeline in "Orders History" card is reversed.
				timelineReverse: false,
			}
		},
	})

</script>