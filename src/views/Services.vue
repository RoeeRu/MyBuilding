<!--
    This is the page for Domos services. It uses the dashboard layout in:
    "./layouts/Dashboard.vue" .
    It show the services that are available to the user.
    It uses the following components:
    CardInfo - This is the card that shows the information about the service.
-->

<template>
    <div>
        <!-- Card Info -->
        <a-row :gutter="24" type="flex" align="stretch">
			<a-col :span="24" :lg="12" class="mb-24">
                <CardInfoServices 
                    :details = "generalCard"
                    :buildingInfo = "buildingInfo"
                    :userInfo = "userInfo"
                >
                </CardInfoServices>
            </a-col>
            <a-col :span="24" :lg="12" class="mb-24" >
                <CardInfoServices 
                    :details = "superCard"
                    :buildingInfo = "buildingInfo"
                    :userInfo = "userInfo"
                >
                </CardInfoServices>
            </a-col>
        </a-row>
        <a-row :gutter="24" type="flex" align="stretch">
			<a-col :span="24" :lg="12" class="mb-24">
                <CardInfoServices 
                    :details = "vendorsCard"
                    :buildingInfo = "buildingInfo"
                    :userInfo = "userInfo"
                >
                </CardInfoServices>
            </a-col>
            <a-col :span="24" :lg="12" class="mb-24" >
                <CardInfoServices 
                    :details = "LegalCard"
                    :buildingInfo = "buildingInfo"
                    :userInfo = "userInfo"
                >
                </CardInfoServices>
            </a-col>
        </a-row>
        <a-row :gutter="24" type="flex" align="stretch">
            <a-col :span="24" :lg="12" class="mb-24" >
                <CardInfoServices 
                    :details = "InsuranceCard"
                    :buildingInfo = "buildingInfo"
                    :userInfo = "userInfo"
                >
                </CardInfoServices>
            </a-col>
            <a-col :span="24" :lg="12" class="mb-24" >
                <CardInfoServices 
                    :details = "FinanceCard"
                    :buildingInfo = "buildingInfo"
                    :userInfo = "userInfo"
                >
                </CardInfoServices>
            </a-col>
        </a-row>
        <!-- / Card Info -->
    </div>
</template>

<script>
    // Information card 1.
    import CardInfoServices from '../components/Cards/CardInfoServices.vue' ;
	import { mapActions } from 'vuex'
	import { mapState } from 'vuex'

    
    export default ({
        components: {
            CardInfoServices
        },
        data() {
            return{
                generalCard: {
                    above_title: "Online",
                    title: "General Inquiry",
                    action: "Send a message",
                    email_body: "Hello Domos team, \n \nPlease advise with the following:\n\n\nThank you, ",
                    image_url: "images/general_inq.jpeg",
                    description: "Have a question about your building but not sure who to ask? Schedule a quick call with a Domos expert."
                },
                superCard: {
                    above_title: "On-site",
                    title: "Super On Demand",
                    email_body: "Hello Domos team, \n \nWe would like to use your on-demand super/handyman services. Here are some details about our needs:\n\nRequired scope of work: \n\nOne time / reccuring\\nnPreferred dates / days:\nPreferred hours of visit: \n\n\nThank you, ",
                    action: "Get a quote",
                    image_url: "images/super.jpeg",
                    description: "Schedule a one time visit from a Super to help you with your building maintenenace tasks."
                },
                vendorsCard: {
                    above_title: "On-site",
                    title: "Vendors Network",
                    action: "Get a quote",
                    email_body: "Hello Domos team, \n \nWe would need to get in touch with the following vendor type: \n\nHere are some details about the project we need help with: \n\nPlease see attached photos (if relevant)\n\n\nThank you, ",
                    image_url: "images/vendors.jpeg",
                    description: "Need a plummber / roofer / other vendor? Tell us what's the issue and we will match you with an expert."
                },
                LegalCard: {
                    above_title: "Online",
                    title: "Legal Experts",
                    email_body: "Hello Domos team, \n \nWe would like to get advise regarding the following legal issue:\n\n\nThank you, ",
                    action: "Share details",
                    image_url: "images/legal.jpeg",
                    description: "Schedule a quick call with a legal expert to help you with your legal questions."
                },
                InsuranceCard: {
                    above_title: "Online",
                    title: "Insurance Experts",
                    email_body: "Hello Domos team, \n \nWe would like to get an offer for building / home / other insurance. Some additional details about what we are looking for:\n\n\nThank you, ",
                    action: "Try for free",
                    image_url: "images/insurance.jpeg",
                    description: "Schedule a quick call with a legal expert to help you with your legal questions."
                },
                FinanceCard: {
                    above_title: "Online",
                    title: "Financial Advice",
                    email_body: "Hello Domos team, \n \nPlease put us in touch with a financial expert regarding the following issue:\n\n\nThank you, ",
                    action: "Get a quote",
                    image_url: "images/tax.jpeg",
                    description: "Speak with an expert regarding taxes and and other financial issues."
                },
                
            }
        },
		computed: {
			...mapState({
				userInfo: state => state.profile.userInfo,
				buildingInfo: state => state.building.buildingInfo,
			})
		},

		async mounted() {
			window.analytics.page('Services');
			await this.getBuildingInformation();
			await this.getUserData();
		},
		methods: {
			...mapActions({
				getBuildingInformation: 'building/getBuildingInformation',
				getUserData: 'profile/getUserData'
			})
		  
		}
    }

    )

</script>

<style lang="scss">
</style>