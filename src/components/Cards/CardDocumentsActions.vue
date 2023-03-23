<template>

	<!-- Documents actions Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0,}">

		<template #title>
			<a-row type="flex" align="middle">

				<a-col :span="24" :md="4" >
					<a-button type="primary"
						@click="showModal"
					>
						Add Document
					</a-button>
				</a-col>
				<a-col :span="24" :md="8" class="add-item-col">
					<!-- Header Search Input -->
					<a-input-search class="header-search"  placeholder="Search for document…" v-model="searchValue" @input="tableSearch">
						
					</a-input-search>
					<!-- / Header Search Input -->
				</a-col>
			</a-row>
			<MainModal
					:visible="visible"
					:title="modalTitle"
				 	@handleOk="modalHandleOk"
					:handle-cancel="modalHandleCancel"
				>
				<MainForm ref="formFields" :formFields="documentsInputs" :title="modalTitle"></MainForm>
			</MainModal>
		</template>

	</a-card>
	<!-- Documents actions Card -->

</template>

<script>
import MainModal from '../Modal/MainModal.vue';
import MainForm from '../Forms/MainForm.vue';
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import debounce from 'lodash/debounce'



	export default ({
		components: {
		  MainModal, MainForm
		},
		data() {
			return {
				visible: false,
				modalTitle: "Add Documents",
				documentsInputs: [
					{ 	name: 'location', label: 'Choose File', type:'uploadFile', rules: ['required'],
					},
				//	{ name: 'name', label: 'Document Name', type:'text', placeholder:'Type Name', rules: ['required']},
      				{ name: 'type', label: 'Type', placeholder:'Enter type', type:'selectBox', 'options': [
						{value: 'insurance', text: 'Insurance'},
						{value: 'work_order', text: 'Work Order'},
						{value: 'tax', text: 'Taxes'},
						{value: 'other', text: 'Other'}],
						rules: ['required']},
      				{ name: 'details', label: 'Details', placeholder:'Enter Details', type:'text', rules: []},
      	],
		  	formState: {'name':''},
				searchValue: ''
			}
		},
		mounted() {
		  this.documentsInputs[0].userToken = this.accessToken;
		  this.documentsInputs[0].BuildingID =  this.BuildingID;
		},
		computed: {
	    formattedDate() {
	      const today = new Date();
	      const year = today.getFullYear();
	      const month = String(today.getMonth() + 1).padStart(2, '0');
	      const day = String(today.getDate()).padStart(2, '0');
	      return `${month}/${day}/${year}`;
	    },
			...mapState({
				fileData: state => state.documents.UploadedFile,
				accessToken: state => state.auth.user.accessToken,
				BuildingID: state => state.auth.user.building_id
			})

	  },

		methods: {
		  showModal() {
		    this.visible = true
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

					let res =  await this.addDocument({document: this.$refs.formFields.formData, BuildingID: this.BuildingID},)
					if(res) {
						this.$refs.formFields.onFinish(true);
						this.visible = false;
					} else {
						console.log('modalHandleOk',res )
						this.$refs.formFields.onFinish(false);
					}
				} catch (e) {
					console.log('modalHandleOk',e )
					this.$refs.formFields.onFinish(false);
				} finally {
					handleOnFinish()
				}
		  },
			tableSearch() {
				let debouncedSearch = debounce(() => {
				  this.filterDocumentsData({searchValue: this.searchValue})
				}, 500)
      	debouncedSearch()
			},
			...mapActions('documents', ['addDocument', 'filterDocumentsData'])
		},
	})

</script>

<style media="screen">
	@media screen and (max-width: 767px) {
		.add-item-col {
			padding-top: 20px; /* add desired padding value */
		}
	}
</style>
