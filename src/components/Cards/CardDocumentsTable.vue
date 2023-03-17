<template>

	<!-- Documents Table Card -->

	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<a-table :columns="columns" :data-source="data" :pagination="true">

			<template slot="name"  slot-scope="row">
				<a
					:href="row.location"
					v-text="row.name"
					@click.prevent="downloadItem(row)" />
			</template>
 
			<template slot="actionsBtn" slot-scope="row">
				<a-dropdown>
					<a class="ant-dropdown-link" @click="e => e.preventDefault()">
					Actions <a-icon type="down" />
					</a>
					<a-menu slot="overlay">
					<a-menu-item>
						<a href="javascript:;" v-on:click="showFileModal(row)">Show File</a>
					</a-menu-item>
					<!--
					<a-menu-item>
						<a href="javascript:;" v-on:click="showModal(row)">Edit</a>
					</a-menu-item>
					-->
					<a-menu-item>
						<a href="javascript:;" v-on:click="DeleteRow(row)">Delete</a>
					</a-menu-item>
					</a-menu>
				</a-dropdown>

			<MainModal
					:visible="visible"
					:title="modalTitle"
				 	@handleOk="modalHandleOk"
					:handle-cancel="modalHandleCancel"
				>
				<MainForm ref="formFields" :formFields="DocumentInputs" :title="modelTitle"></MainForm>
			</MainModal>

			<MainModal
					:visible="visibleFileModal"
					:title="fileModalTitle"
					@handleOk="fileModalHandleOk"
					:handle-cancel="fileModalHandleCancel"
					:hasSubmit= "false"
				>
				<iframe :src="pdfUrl" width="100%" height="600px"></iframe>
			</MainModal>
			</template>

		</a-table>
	</a-card>
	<!-- / Documents Table Card -->

</template>

<script>
import MainModal from '../Modal/MainModal.vue';
import MainForm from '../Forms/MainForm.vue';
import { mapActions } from 'vuex'
import Axios from 'axios';
Axios.defaults.withCredentials = false;

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
				visibleFileModal: false,
				fileModalTitle: "Document",
				modalTitle: "Add Document",
				pdfUrl: '',
				DocumentInputs: [
					{ name: 'type', label: 'Type', placeholder:'Enter type', type:'selectBox', 'options': [
						{value: 'insurance', text: 'Insurance'},
						{value: 'work_order', text: 'Work Order'},
						{value: 'tax', text: 'Taxes'},
						{value: 'other', text: 'Other'}],
						rules: ['required']
					},
					{ name: 'details', label: 'Details', placeholder:'Enter Details', type:'text', rules: ['required']}
      			]
			}
		},
		methods: {
			downloadItem(row) {
				console.log("downloading", row);
				Axios.get(row.location, { responseType: 'blob' })
				.then(response => {
					const blob = new Blob([response.data])
					const link = document.createElement('a')
					link.href = URL.createObjectURL(blob)
					link.download = row.name
					link.click()
					URL.revokeObjectURL(link.href)
				}).catch(console.error)
			},
			async DeleteRow(row) {
			if(confirm("Do you really want to delete?")){
				console.log("deleting", row.key);

			try {
				let res = await this.deleteDocument({document: row})
				} catch (e) {
					console.log('modalHandleOk error', e)
				}
			}
			},
			showModal(row) {
				this.DocumentInputs.forEach((value, index) => {
					this.DocumentInputs[index].value = row[this.DocumentInputs[index].name]
				});
				this.visible = true
		  },
			showFileModal(row) {
				console.log("showing", row);
				this.pdfUrl = row.location
				this.visibleFileModal = true
			},
			fileModalHandleCancel() {
				this.visibleFileModal = false
			},
			fileModalHandleOk() {
				this.visibleFileModal = false
			},
			modalHandleCancel() {
				this.visible = false
			},
			async modalHandleOk(handleOnFinish) {
				try {
					let isValid = this.$refs.formFields.validate()
					if(!isValid){
						return;
					}
					let res = await this.updateDocument({document: this.$refs.formFields.formData})
					console.log('modalHandleOk', res)
					if(res) {
						this.$refs.formFields.onFinish(true);
						this.visible = false;
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
		  ...mapActions('documents', ['updateDocument', 'deleteDocument'])
		},
	})

</script>
