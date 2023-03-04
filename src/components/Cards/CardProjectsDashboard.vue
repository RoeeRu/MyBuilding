<template>

	<!-- Project Card -->
	<a-card class="card-project">

		<a-row type="flex" :lg="2" :gutter="6" align="top" >
			<h6 >{{ title }}</h6>
			<p>
				{{ content }}
			</p>
		</a-row>
		<a-row type="flex" :gutter="12" class="card-footer" align="middle">
			<a-col :span="12" >
				<div v-if="link === '/actions'" class="team">
					<a-button @click="$router.push('/actions')" size="small"> {{ button }}</a-button>
				</div>
				<div v-else-if="link === '/maintenance'" class="team">
					<a-button @click="$router.push('/maintenance')" size="small"> {{ button }}</a-button>
				</div>
			</a-col>

		</a-row>
	</a-card>
	<!-- / Project Card -->

</template>

<script>

	export default ({
		props: {
			id: {
				type: Number,
				required: true,
			},
			button: {
				type: String,
				default: "",
			},
			title: {
				type: String,
				default: "",
			},
			content: {
				type: String,
				default: "",
			},
			cover: {
				type: String,
				default: "",
			},
			team: {
				type: Array,
				default: () => [],
			},
			link: {
				type: String,
				default: "",
			},
		},
		data() {
			return {
			}
		},
	})

</script>
