<!--
	This is the sign in page, it uses the dashboard layout in:
	"./layouts/Sign.vue" .
 -->

<template>
	<div class="sign-in">

		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 8, offset: 2}" class="col-form">
				<h2 class="mb-15">Sign Up To Domos</h2>
				
				<h5 class="font-regular text-muted">Use your Google account to create an account</h5>
				<div class="sign-in-gateways">
	    			<a-button  @click="handleSignUp('gmail')" >
						 
					<span class="text">Continue with Google</span>
						<img src="images/logos/Google__G__Logo.svg.png" alt="Continue with Google">
					</a-button>
				</div>
				<h5 class="font-regular text-muted">Or enter your email and password to sign up</h5>

				<!-- Sign In Form -->
				<a-form
				id="components-form-demo-normal-login"
				:form="form"
				class="login-form"
				@submit="handleSubmit"
			>
			<a-form-item class="mb-10" label="Full Name" :colon="false">
					<a-input
						ref="name"
						v-decorator="[
						'name',
						{ rules: [{ required: true, message: 'Please input your name!' }] },
						]"
						placeholder="Name"
					>
					</a-input>
				</a-form-item>
				<a-form-item class="mb-10" label="Email" :colon="false">
					<a-input
						ref="email"
						v-decorator="[
						'email',
						{ rules: [{ required: true, message: 'Please input your email!' }] },
						]"
						placeholder="Email"
					>
					</a-input>
				</a-form-item>
				<a-form-item class="mb-10" label="Choose Password" :colon="false">
					<a-input
						ref="password"
						v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Please input your Password!' }] },
						]"
						type="password"
						placeholder="Password"
					>
					</a-input>
				</a-form-item>
				<a-form-item class="mb-10">
					<a-checkbox
						v-decorator="[
						'remember',
						{
							valuePropName: 'checked',
							initialValue: true,
						},
						]"
					>
						I agree the <a href="#" class="font-bold text-dark">Terms and Conditions</a>
					</a-checkbox>
				</a-form-item>
				<a-form-item>
					<a-button type="primary" block html-type="submit" class="login-form-button">
						SIGN UP
					</a-button>
				</a-form-item>
			</a-form>
				<!-- / Sign In Form -->

				<p class="font-semibold text-muted">Already have an account? <router-link to="/sign-in" class="font-bold text-dark">Sign In</router-link></p>
				<p class="font-semibold text-muted">Need Support? <a href="mailto:support@joindomos.com?subject=Sign Up Support" target="_blank">Email Us</a></p>

				
			</a-col>
			<!-- / Sign In Form Column -->


			<!-- Sign In Image Column -->
			<a-col :span="24" :md="12" :lg="12" :xl="6" class="col-img">
				<img src="images/puppies.png" alt="">

			</a-col>
			<!-- Sign In Image Column -->

		</a-row>

	</div>
</template>

<script>

	export default ({
		data() {
			return {
				// Binded model property for "Sign In Form" switch button for "Remember Me" .
				rememberMe: true,
				regFailed: false
			}
		},
		beforeCreate() {
			// Creates the form and adds to it component's "form" property.
			this.form = this.$form.createForm(this, { name: 'normal_login' });
		},
		mounted() {
			
			window.analytics.page('Sign Up')
		},
		methods: {
			// Handles input validation after submission.
			async handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if ( !err ) {

					}
				});
				let isSignedIn = await this.$store.dispatch('loginHandler', {regType: 'selfRegistration', email:this.$refs.email.value, password: this.$refs.password.value})
				if (isSignedIn) {
					this.$router.push({ name: 'Dashboard' });
				} else {
					this.regFailed = true;
				}

			},

			async handleSignUp(type) {
				let isSignedIn = await this.$store.dispatch('loginHandler', {regType: type})
				if (isSignedIn) {
					this.$router.push({ name: 'Dashboard' });
				} else {
					this.regFailed = true;
				}
			}
		},
	})

</script>

<style lang="scss">
	body {
		background-color: #ffffff;
	}
</style>
