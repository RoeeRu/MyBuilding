<template>

	<!-- 
		Actions Table Card
		In this card we have a table with actions data.
		It gets the data from the store in:
		"./store/actions.js" .
	 -->

	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<a-table :columns="columns" :data-source="data" :pagination="false">


			<template slot="creator" slot-scope="creator">
				<div class="source-info">
					<h6 class="m-0">{{ creator.type }}</h6>
					<p class="m-0 font-regular text-muted">{{ creator.details }}</p>
				</div>
			</template>

			<template slot="item" slot-scope="item">
				<div class="source-info">
					<h6 class="m-0">{{ item.name }}</h6>
				</div>
			</template>

			<template slot="status" slot-scope="status">
				<a-tag class="tag-status" :class="status ? 'ant-tag-primary' : 'ant-tag-muted'">
					{{ status ? "Open" : "Close" }}
				</a-tag>
			</template>
			

			

			<template slot="actionsBtn" slot-scope="row">
				<a-button type="link" :data-id="row.key" class="btn-actions">
					Actions
				</a-button>
			</template>

		</a-table>
	</a-card>
	<!-- / Actions Table Card -->

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