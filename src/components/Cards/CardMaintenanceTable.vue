<template>

	<!-- Maintenance Table Card -->

	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<a-table :columns="columns" :data-source="data" :pagination="false">

			
			<template slot="func" slot-scope="func">
				<div class="transaction-info">
					<h6 class="m-0">{{ func.job }}</h6>
					<p class="m-0 font-regular text-muted">{{ func.department }}</p>
				</div>
			</template>

			<template slot="created_by" slot-scope="created_by">
				<div class="source-info">
					<h6 class="m-0">{{ created_by.created_by_name }}</h6>
					<p class="m-0 font-regular text-muted">{{ created_by.created_by_apt }}</p>
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
	<!-- / Maintenance Table Card -->

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