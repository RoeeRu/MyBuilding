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
				<CardBuildingInformation></CardBuildingInformation>
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

	// Conversation's list data.
	const membersData = [
		{
			id: "1",
			title: "Sophie B.",
			code: "Apartment 3a",
			avatar: "images/face-3.jpg",
		},
		{
			id: "2",
			title: "Anne Marie",
			code: "Apartment 3b",
			avatar: "images/face-4.jpg",
		},
		{
			id: "3",
			title: "Ivan",
			code: "Apartment 2a",
			avatar: "images/face-5.jpeg",
		},
		{
			id: "4",
			title: "Peterson",
			code: "Apartment 4a",
			avatar: "images/face-6.jpeg",
		},
		{
			id: "5",
			title: "Nick Daniel",
			code: "Apartment 3b",
			avatar: "images/face-2.jpg",
		},
		{
			id: "6",
			title: "Nick Nack",
			code: "Apartment 5b",
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
	})

</script>

<style lang="scss">
</style>