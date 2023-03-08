<template>

	<!-- Transactions Table Card -->

	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<a-table :columns="columns" :data-source="data" :pagination="false">

			<template slot="transaction" slot-scope="transaction">
				<div class="table-avatar-info">
					<a-avatar shape="square" :src="transaction.avatar" />
					<div class="avatar-info">
						<h6>{{ transaction.name }}</h6>
						<p>{{ transaction.email }}</p>
					</div>
				</div>
			</template>

			<template slot="func" slot-scope="func">
				<div class="transaction-info">
					<h6 class="m-0">{{ func.job }}</h6>
					<p class="m-0 font-regular text-muted">{{ func.department }}</p>
				</div>
			</template>

			<template slot="source" slot-scope="source">
				<div class="source-info">
					<h6 class="m-0">{{ source.type }}</h6>
					<p class="m-0 font-regular text-muted">{{ source.details }}</p>
				</div>
			</template>

			<template slot="transaction_amount" slot-scope="transaction_amount">
				<div class="transaction_amount-info">
							<span v-if="transaction_amount.type == 1" class="text-success">
								+ ${{ transaction_amount.amount }}
							</span>
							<span v-if="transaction_amount.type == 0" class="text-warning">
								Pending
							</span>
							<span v-if="transaction_amount.type == -1" class="text-danger">
								- ${{ transaction_amount.amount }}
							</span>
				</div>
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
					</a-menu>
				</a-dropdown>
			</template>

		</a-table>
	</a-card>
	<!-- / Transactions Table Card -->

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
				// Active button for the "Transactions" table's card header radio button group.
				transactionsHeaderBtns: 'all',
			}
		},
	})

</script>