<!-- 
	This is the user building page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

		
			
		<!-- User Profile Card -->

		<a-row type="flex" :gutter="24">


			<!-- Profile Information Column -->
			<a-col :span="24" :md="8" class="mb-24">

				<!-- Profile Information Card -->
				<CardBuildingInformation
					:buildingInfo="buildingInfo"
				></CardBuildingInformation>
				<!-- / Profile Information Card -->

			</a-col>
			<!-- / Profile Information Column -->
			
			<!-- Members Column -->
			<a-col :span="24" :md="12" class="mb-24">
			
				<!-- Members Card -->
				<CardMembers
					:data="membersData"
				></CardMembers>
				<!-- / Members Card -->

			</a-col>
			<!-- / Members Column -->

		</a-row>
		
		<!-- Documents Card -->
		
		<!-- / Documents Card -->

	</div>
</template>

<script>

	import CardBuildingInformation from "../components/Cards/CardBuildingInformation"
	import CardMembers from "../components/Cards/CardMembers"
	import { mapActions } from 'vuex'
	import { mapState } from 'vuex'

	// Conversation's list data.
	const membersData = [
		{
			id: "1",
			title: "Sophie B.",
			apartment: "Apartment 3a",
			avatar: "images/face-3.jpg",
		},
		{
			id: "2",
			title: "Anne Marie",
			apartment: "Apartment 3b",
			avatar: "images/face-4.jpg",
		},
		{
			id: "3",
			title: "Ivan",
			apartment: "Apartment 2a",
			avatar: "images/face-5.jpeg",
		},
		{
			id: "4",
			title: "Peterson",
			apartment: "Apartment 4a",
			avatar: "images/face-6.jpeg",
		},
		{
			id: "5",
			title: "Nick Daniel",
			apartment: "Apartment 3b",
			avatar: "images/face-2.jpg",
		},
		{
			id: "6",
			title: "Nick Nack",
			apartment: "Apartment 5b",
			avatar: "images/face-1.jpg",
		},
	] ;


	export default ({
		components: {
			CardBuildingInformation,
			CardMembers,
		},
		data() {
			return {
				

				// Associating Conversation's list data with its corresponding property.
				membersData,
			}
		},
		computed: {
			...mapState({
				buildingInfo: state => state.building.buildingInfo,
				membersInfo: state => state.building.membersInfo
			})
		},

		async mounted() {
			await this.getBuildingInformation();
			await this.getMembersInformation();
		},
		methods: {
		  ...mapActions('building', ['getBuildingInformation', 'getMembersInformation'])
		}
	})

</script>

<style lang="scss">
</style>