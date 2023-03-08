<template>

	<!-- 
		Actions Table Card
		In this card we have a table with actions data.
		It gets the data from the store in:
		"./store/actions.js" .
	 -->

	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<a-table :columns="columns" :data-source="data" :pagination="false">


			<template slot="created_by" slot-scope="created_by">
				<div class="source-info">
					<h6 class="m-0">{{ created_by.created_by_name }}</h6>
					<p class="m-0 font-regular text-muted">{{ created_by.created_by_apt }}</p>
				</div>
			</template>

			<template slot="item" slot-scope="item">
				<div class="source-info">
					<h6 class="m-0">{{ item }}</h6>
				</div>
			</template>

			<template slot="status" slot-scope="status">
				<a-tag class="tag-status" :class="status ? 'ant-tag-primary' : 'ant-tag-muted'">
					{{ status ? "Open" : "Close" }}
				</a-tag>
			</template>
			

			

			<template slot="actionsBtn" slot-scope="row">
				<a-dropdown>
					<a class="ant-dropdown-link" @click="e => e.preventDefault()">
					Actions <a-icon type="down" />
					</a>
					<a-menu slot="overlay">
					<a-menu-item>
						<a href="javascript:;">Edit</a>
					</a-menu-item>
					<a-menu-item>
						<a href="javascript:;">Delete</a>
					</a-menu-item>
					<a-dropdown>
					<a class="ant-dropdown-link" @click="e => e.preventDefault()">
					Change Status: <a-icon type="down" />
					</a>
					<a-menu slot="overlay">
					<a-menu-item>
						<a href="javascript:;">Open</a>
					</a-menu-item>
					<a-menu-item>
						<a href="javascript:;">In Progress</a>
					</a-menu-item>
					<a-menu-item>
						<a href="javascript:;">Close</a>
					</a-menu-item>
					</a-menu>
					
				</a-dropdown>
			</a-menu>
				</a-dropdown>
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