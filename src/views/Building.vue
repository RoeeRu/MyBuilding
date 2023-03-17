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
					:data="membersInfo"
				></CardMembers>
				<!-- / Members Card -->

			</a-col>
			<!-- / Members Column -->

		</a-row>
		
		<!-- Bank Card -->
		<a-col :span="12" :md="8" :lg="8" :xl="12" class="mb-24">

			<!-- Payment Methods Card -->
			<CardPaymentMethods
				v-on:accountData="handleAccountData">
			</CardPaymentMethods>
			<!-- Payment Methods Card -->

</a-col>
		
		<!-- / Bank Card -->

	</div>
</template>

<script>

	import CardBuildingInformation from "../components/Cards/CardBuildingInformation"
	import CardMembers from "../components/Cards/CardMembers"
	import CardPaymentMethods from "../components/Cards/CardPaymentMethods"
	import { mapActions } from 'vuex'
	import { mapState } from 'vuex'

	let accountInfo = {};

	export default ({
		components: {
			CardBuildingInformation,
			CardMembers,
			CardPaymentMethods,
		},
		data() {
			return {
				accountInfo,
			}
		},
		computed: {
			...mapState({
				membersInfo: state => state.building.membersInfo,
				buildingInfo: state => state.building.buildingInfo,
			})
		},

		async mounted() {
			await this.getBuildingInformation();
			await this.getMembersInformation();
			window.analytics.page('Building')
		},
		methods: {
		  handleAccountData(accountData) {
		    this.accountInfo = accountData;
		  },
			...mapActions({
				getBuildingInformation: 'building/getBuildingInformation',
				getMembersInformation: 'building/getMembersInformation'
			})
		  
		}
	})

</script>

<style lang="scss">
</style>