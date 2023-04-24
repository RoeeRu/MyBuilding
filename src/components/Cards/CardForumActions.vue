<template>

	<!-- Forum actions Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0,}">

		<template #title>
			<a-row type="flex" align="middle">

				<a-col :span="24" :md="4" >
					<a-button type="primary"
						@click="showModal"
					>
						Post Message
					</a-button>
				</a-col>
				<a-col :span="24" :md="8" class="add-item-col">
					<!-- Header Search Input -->
					<a-input-search class="header-search"  placeholder="Search for message..." v-model="searchValue" @input="tableSearch">

					</a-input-search>
					<!-- / Header Search Input -->
				</a-col>
			</a-row>
			<MainModal
					v-if="visible"
					:title="modalTitle"
				 	@handleOk="modalHandleOk"
					:handle-cancel="modalHandleCancel"
				>
				<MainForm ref="formFields" :formFields="postInputs" :title="modalTitle"></MainForm>
			</MainModal>
		</template>

	</a-card>
	<!-- Forum actions Card -->

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
				modalTitle: "Post New Message",
				postInputs: [
					{ name: 'title', label: 'Title', type:'text', placeholder:'Type title', rules: ['required']},
      				{ name: 'content', label: 'Content', placeholder:'Enter Content', type:'textarea', rules: []},
					{ 	name: 'location', label: 'Upload File', type:'uploadFile', rules: ['']},
				//	{ name: 'name', label: 'Topic Name', type:'text', placeholder:'Type Name', rules: ['required']},
      	],
		  	formState: {'name':''},
				searchValue: ''
			}
		},
		async mounted() {
		await this.getUserData();
		  this.postInputs[0].BuildingID =  this.BuildingID;
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
				fileData: state => state.forum.UploadedFile,
				BuildingID: state => state.auth.user.building_id,
				personalInfo: state => state.profile.userInfo,
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
					let formFields = this.$refs.formFields.formData;
					formFields.created_by_name = this.personalInfo.name;
					formFields.created_by_apartment = this.personalInfo.apartment;
					formFields.created_by_uid = this.personalInfo.uid;

					let res =  await this.addTopic({topic: {...formFields}, BuildingID: this.BuildingID},)
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
				  this.filterTopicsData({searchValue: this.searchValue})
				}, 500)
      	debouncedSearch()
			},
			...mapActions('forum', ['addTopic', 'filterTopicsData']),
			...mapActions('profile', ['getUserData'])
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
