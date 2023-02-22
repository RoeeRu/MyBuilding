<template>
	

	<!-- Members Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }">
		<template #title>
			<h6 class="font-semibold m-0">Members</h6>
		</template>
		<a-list
			class="members-list"
			item-layout="horizontal"
			:split="false"
			:data-source="membersInfo"
		>
			<a-list-item slot="renderItem" slot-scope="item">
				<a-button slot="actions" type="link">
					Email
				</a-button>
				<a-button slot="actions" type="link">
					Invite
				</a-button>
				<a-list-item-meta
					:title="membersInfo.title"
					:description="item.apartment"
				>
					<a-avatar
					slot="avatar"
					:size="48"
					shape="square"
					icon="user"
					/>
				</a-list-item-meta>
			</a-list-item>
		</a-list>
	</a-card>
	<!-- / Members Card -->

</template>

<script>


	export default ({
		props: {
			membersInfo: {
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