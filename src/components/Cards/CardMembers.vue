<template>
	

	<!-- Members Card - use data from members--> 
	
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }">
		<a-row type="flex" justify="space-between" align="middle" class="mb-4">
			<a-col>
				<h6 class="font-semibold m-0">Residents</h6>
			</a-col>
			<a-col>
				<a-button type="link" @click="sendEmail(email='support@joindomos.com', subject='Please add resident', body='Please add the following residents:')">Add Resident</a-button>
				<a-button type="link" @click="sendEmailAll()">Email All</a-button>
			</a-col>
		</a-row>
		<a-list
			class="members-list"
			item-layout="horizontal"
			:split="false"
      		:data-source="pagedData"
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
		<a-pagination
      :current="currentPage"
      :total="data.length"
      :show-total="total => `Total ${total} items`"
      :page-size="pageSize"
      @change="handlePageChange"
    />
	</a-card>
	<!-- / Members Card -->

</template>

<script>
import { Pagination } from 'ant-design-vue';


	export default ({
		components: {
			'a-pagination': Pagination,
		},
		props: {
			data: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
			currentPage: 1,
			pageSize:7,
			}
		},computed: {
			pagedData() {
			const startIndex = (this.currentPage - 1) * this.pageSize;
			const endIndex = startIndex + this.pageSize;
			return this.data.slice(startIndex, endIndex);
			},
		},
		methods: {
			sendEmail(email, bcc, subject = '', body = '') {
				console.log('send email to', email, bcc, subject, body)
				window.open("mailto:"+ email +"?bcc:"+bcc+"&subject="+encodeURIComponent(subject) +"&body="+encodeURIComponent(body), '_blank').focus();
			},
			sendEmailAll() {
				console.log('send bcc emails to all')
				var emails = this.data.map(item => item.email).join(', ');
				window.open("mailto:?bcc="+emails+"&subject="+encodeURIComponent('') +"&body="+encodeURIComponent(''), '_blank').focus();
			},
			handlePageChange(page) {
			this.currentPage = page;
			},
		}
		
	})

</script>