<template>
	

	<!-- Members Card - use data from members-->
	
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }">
		<a-row type="flex" justify="space-between" align="middle" class="mb-4">
			<a-col>
				<h6 class="font-semibold m-0">Members</h6>
			</a-col>
			<a-col>
				<a-button type="link">Add Member</a-button>
				<a-button type="link" @click="sendEmail('')">Email All</a-button>
			</a-col>
		</a-row>
		<a-list
			class="members-list"
			item-layout="horizontal"
			:split="false"
			:data-source="data"
		>
			<a-list-item slot="renderItem" slot-scope="item">
				<a-button slot="actions" type="link" @click="sendEmail(item.email)">
					Email
				</a-button>
				<!-- <a-button slot="actions" type="link" @click="sendInvite(item.email, item.name)">
					Invite
				</a-button>-->
				<a-list-item-meta
					:title="item.name"
					:description="'Apartment: ' + item.apartment"
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
			data: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
			}
		},
		methods: {
			sendEmail(email) {
				console.log('send email')
				window.open("mailto:"+ email, '_blank').focus();
			},
			sendInvite(email, name) {
				console.log('send invite')
				var formattedBody = ", \n \nPlease Use the following link to login into your account at Domos to get access to your personal portal. \nhttps://my-building-vue.vercel.app/#/sign-in \n \nThank you, \nYour Board and the Domos Team";
				var formattedSubject = "Join Your Building Page @ Domos";
				window.open("mailto:"+ email+"?subject="+encodeURIComponent(formattedSubject)+"&body=Dear "+name+encodeURIComponent(formattedBody), '_blank').focus();
			}
		}
		
	})

</script>