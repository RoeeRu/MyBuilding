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
                >
                </CardInfoServices>
            </a-col>
            <a-col :span="24" :lg="12" class="mb-24" >
                <CardInfoServices 
                    :details = "superCard"
                >
                </CardInfoServices>
            </a-col>
        </a-row>
        <a-row :gutter="24" type="flex" align="stretch">
			<a-col :span="24" :lg="12" class="mb-24">
                <CardInfoServices 
                    :details = "vendorsCard"
                >
                </CardInfoServices>
            </a-col>
            <a-col :span="24" :lg="12" class="mb-24" >
                <CardInfoServices 
                    :details = "LegalCard"
                >
                </CardInfoServices>
            </a-col>
        </a-row>
        <a-row :gutter="24" type="flex" align="stretch">
            <a-col :span="24" :lg="12" class="mb-24" >
                <CardInfoServices 
                    :details = "InsuranceCard"
                >
                </CardInfoServices>
            </a-col>
            <a-col :span="24" :lg="12" class="mb-24" >
                <CardInfoServices 
                    :details = "FinanceCard"
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
                    image_url: "images/general_inq.jpeg",
                    description: "Have a question about your building but not sure who to ask? Schedule a quick call with a Domos expert."
                },
                superCard: {
                    above_title: "On-site",
                    title: "Super On Demand",
                    action: "Get a quote",
                    image_url: "images/super.jpeg",
                    description: "Schedule a one time visit from a Super to help you with your building maintenenace tasks."
                },
                vendorsCard: {
                    above_title: "On-site",
                    title: "Vendors Network",
                    action: "Get a quote",
                    image_url: "images/vendors.jpeg",
                    description: "Need a plummber / roofer / other vendor? Tell us what's the issue and we will match you with an expert."
                },
                LegalCard: {
                    above_title: "Online",
                    title: "Legal Experts",
                    action: "Get a quote",
                    image_url: "images/legal.jpeg",
                    description: "Schedule a quick call with a legal expert to help you with your legal questions."
                },
                InsuranceCard: {
                    above_title: "Online",
                    title: "Insurance Experts",
                    action: "Try for free",
                    image_url: "images/insurance.jpeg",
                    description: "Schedule a quick call with a legal expert to help you with your legal questions."
                },
                FinanceCard: {
                    above_title: "Online",
                    title: "Financial Advice",
                    action: "Get a quote",
                    image_url: "images/tax.jpeg",
                    description: "Speak with an expert regarding taxes and and other financial issues."
                },
                
            }
        }
    }

    )

</script>

<style lang="scss">
</style>