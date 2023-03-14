<template>

	<!-- Payment Methods Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Bank Info</h5>

					<h6 class="font-semibold m-0">{{ bankName }}</h6>
					<p class="text-dark">{{ bankAccountNumber }}</p>

				</a-col>
				<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
					<a-button @click="handlePlaidLinkClick" type="primary">
						{{ addBankText }}
					</a-button>
				</a-col>
			</a-row>
		</template>
		<!-- credit cards
		<a-row :gutter="[24, 24]">
			<a-col :span="24" :md="12">
				<a-card class="payment-method-card">
					<img src="images/logos/mastercard-logo.png" alt="">
					<h6 class="card-number">**** **** **** 7362</h6>
					<a-button type="link">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path class="fill-gray-7" d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"/>
							<path class="fill-gray-7" d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"/>
						</svg>
					</a-button>
				</a-card>
			</a-col>
			<a-col :span="24" :md="12">
				<a-card class="payment-method-card">
					<img src="images/logos/visa-logo.png" alt="">
					<h6 class="card-number">**** **** **** 3288</h6>
					<a-button type="link">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path class="fill-gray-7" d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"/>
							<path class="fill-gray-7" d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"/>
						</svg>
					</a-button>
				</a-card>
			</a-col>
		</a-row>
		-->
	</a-card>
	<!-- Payment Methods Card -->

</template>

<script>
import axios from 'axios';
import {create} from 'plaid';
import { mapActions } from 'vuex'
import { mapState } from 'vuex'

	export default ({
		data() {
			return {
				plaidLink: null,
		 		linkToken: null,
		 		plaidConfig: {
					 clientName: 'DOMOS',
					 env: 'sandbox',
					 product: ['auth', 'transactions'],
					 onSuccess: this.handlePlaidSuccess,
		 	 	},
				plaidHanler: null,
				addBankText:'Add Bank Account',
				bankName: 'Bank Name',
				bankAccountNumber: 'Account Number',
			}
		},
		async mounted() {
			await this.hasBankAccout();
			if(this.validBankAccout) {
				this.addBankText = 'Change Bank Account';
				let accountData = await this.getAccountData();
				this.addBankText = 'Change Bank Account';
				this.bankName = accountData.name;
				this.bankAccountNumber = accountData.account_id;
				this.$emit('accountData', accountData);
			}

			this.initializePlaid();
		},
		methods: {
			handlePlaidLinkClick() {
	      this.plaidHanler.open();
	    },
			initializePlaid(){
					const script = document.createElement('script');
					script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
					script.onload = async () => {
						this.plaidHanler = window.Plaid.create({
							token: await this.getPlaidLinkToken(),
							onSuccess: async function(public_token, metadata) {
								const accountData = await this.exchangePublicToken({public_token})
								if(this.validBankAccout) {
									this.$emit('accountData', accountData);
									this.addBankText = 'Change Bank Account';
								}
							}.bind(this),
							onExit: function(err, metadata) {
								// The user exited the Link flow.
								if (err != null) {
									console.log("The user encountered a Plaid API error prior to exiting");
									// The user encountered a Plaid API error prior to exiting.
								}
							}
						});
					};
					document.body.appendChild(script);
			},
			...mapActions('building', ['getPlaidLinkToken', 'exchangePublicToken', 'hasBankAccout', 'getAccountData'])
	  },
		computed: {
			...mapState({
				validBankAccout: state => state.building.hasBankAccout
			})
		},


	})

</script>
