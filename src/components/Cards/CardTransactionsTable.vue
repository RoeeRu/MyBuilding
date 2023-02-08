<template>

	<!-- Transactions Table Card -->

	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Transactions Table</h5>
				</a-col>
				<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
					<a-radio-group v-model="transactionsHeaderBtns" size="small">
						<a-radio-button value="all">ALL</a-radio-button>
						<a-radio-button value="bank">Bank</a-radio-button>
						<a-radio-button value="manual">Manual</a-radio-button>
					</a-radio-group>
				</a-col>
			</a-row>
		</template>
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
				<a-button type="link" :data-id="row.key" class="btn-actions">
					Actions
				</a-button>
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