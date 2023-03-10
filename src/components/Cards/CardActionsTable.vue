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
						<a href="javascript:;" v-on:click="showModal(row)">Edit</a>
					</a-menu-item>
					<a-menu-item>
						<a href="javascript:;" v-on:click="DeleteRow(row)">Delete</a>
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
			<MainModal
					:visible="visible"
					:title="modelTitle"
				 	@handleOk="modalHandleOk"
					:handle-cancel="modalHandleCancel"
				>
				<MainForm ref="formFields" :formFields="actionInputs" :formState="formState"></MainForm>
			</MainModal>
			</template>

		</a-table>
	</a-card>
	<!-- / Actions Table Card -->

</template>


<script>
import MainModal from '../Modal/MainModal.vue';
import MainForm from '../Forms/MainForm.vue';
import { mapActions } from 'vuex'

	export default ({
		components: {
		  MainModal, MainForm
		},
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
				visible: false,
				modelTitle: "Add New Action Item",
				actionInputs: [
	        		{ name: 'item', label: 'Item', placeholder:'Enter Details', type:'text'},
	        		{ name: 'details', label: 'Details', placeholder:'Enter Details', type:'text'},
					{ name: 'due_date', label: 'Due Date', type:'date'},
					{ name: 'created_by_name', label: 'Owner (Name)', placeholder: 'Enter Name', type:'text'},
					{ name: 'created_by_apt', label: 'Owner (Aparatment)', placeholder: 'Enter Appratment', type:'text'},
      	],
				formState: {'item': '', 'details': '', 'due_date': null, 'created_by_apt': '', 'created_by_name': '', 'status': 'open',}
			}
		},
		computed: {
			formattedDate() {
			const today = new Date();
			const year = today.getFullYear();
			const month = String(today.getMonth() + 1).padStart(2, '0');
			const day = String(today.getDate()).padStart(2, '0');
			return `${month}/${day}/${year}`;
			},
		},
		created() {
	     this.formState.date = this.formattedDate;
	  
	  },
		methods: {
			async DeleteRow(row) {
			if(confirm("Do you really want to delete?")){
				console.log("Deleting", row.key);
			}
			try {
				let res = await this.deleteAction({action: row})					
				} catch (e) {
					console.log('modalHandleOk error', e)
				} 
			},
			showModal(row) {
				this.visible = true
				this.formState.item = row.item
				this.formState.details = row.details
				this.formState.created_by_name = row.created_by.created_by_name
				this.formState.created_by_apt = row.created_by.created_by_apt
				this.formState.due_date = row.due_date
				this.formState.status = row.status
				this.formState.key = row.key
		  },
			modalHandleCancel() {
				this.visible = false
				this.formState = {'item': '', 'details': '', 'due_date': this.formattedDate, 'created_by_apt': '', 'created_by_name': ''}
			},
			async modalHandleOk(handleOnFinish) {
				try {
					//this.formState.date = this.formState.date.format('YYYY-MM-DD');
					let res = await this.updateAction({action: this.formState})
					console.log('modalHandleOk', res)
					if(res) {
						this.$refs.formFields.onFinish(true);
						this.visible = false;
						this.formState = {'item': '', 'details': '', 'due_date': this.formattedDate, 'created_by_apt': '', 'created_by_name': '', }
					} else {
						console.log('modalHandleOk false', res)
						this.$refs.formFields.onFinish(false);
					}
				} catch (e) {
					console.log('modalHandleOk error', e)
					this.$refs.formFields.onFinish(false);
				} finally {
					handleOnFinish()
				}
		  },
		  ...mapActions('actions', ['updateAction', 'deleteAction'])
		},
	})

</script>