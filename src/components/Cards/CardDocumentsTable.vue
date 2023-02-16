<template>

	<!-- Documents Table Card -->

	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<a-table :columns="columns" :data-source="data" :pagination="false">

			<template slot="actionsBtn" slot-scope="row">
				<a-button type="link" :data-id="row.key" class="btn-actions">
					Actions
				</a-button>
			</template>

		</a-table>
	</a-card>
	<!-- / Documents Table Card -->

</template>

<script>

	export default ({
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
			}
		},
	})

</script>