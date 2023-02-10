<!--
	This is the sign in page, it uses the dashboard layout in:
	"./layouts/Default.vue" .
 -->

<template>
	<div class="sign-in">

		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form">
				<h1 class="mb-15">Sign In</h1>
				<h5 class="font-regular text-muted">Enter your email and password to sign in</h5>

				<!-- Sign In Form -->
				<a-form
					id="components-form-demo-normal-login"
					:form="form"
					class="login-form"
					@submit="handleSubmit"
					:hideRequiredMark="true"
				>
					<a-form-item class="mb-10" label="Email" :colon="false">
						<a-input
						ref="email"
						v-decorator="[
						'email',
						{ rules: [{ required: true, message: 'Please input your email!' }] },
						]" placeholder="Email" />
					</a-form-item>
					<a-form-item class="mb-5" label="Password" :colon="false">
						<a-input
						ref="password"
						v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Please input your password!' }] },
						]" type="password" placeholder="Password" />
					</a-form-item>
					<a-form-item class="mb-10">
    					<a-switch v-model="rememberMe" /> Remember Me
					</a-form-item>
					<a-form-item class="mb-10">
							<h7 v-if="regFailed" style="color:red;">Wrong Credentials</h7>
					</a-form-item>
					<a-form-item>
						<a-button type="primary" block html-type="submit" class="login-form-button">
							SIGN IN
						</a-button>
					</a-form-item>
				</a-form>
				<!-- / Sign In Form -->

				<p class="font-semibold text-muted">Don't have an account? <router-link to="/sign-in" class="font-bold text-dark">Sign Up</router-link></p>
				<p class="">Or</p>

				<div class="sign-in-gateways">
	    			<a-button @click="handleSignUp('facebook')">
						<img src="images/logos/logos-facebook.svg" alt="">
					</a-button>
	    			<a-button @click="handleSignUp('gmail')">
						<img src="images/logos/Google__G__Logo.svg.png" alt="">
					</a-button>
				</div>
			</a-col>
			<!-- / Sign In Form Column -->


			<!-- Sign In Image Column -->
			<a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
				<img src="images/img-signin.jpg" alt="">

			</a-col>
			<!-- Sign In Image Column -->

		</a-row>

	</div>
</template>

<script>
import { onAuthStateChanged, getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword   } from "firebase/auth";
import { FirebaseConfig } from '../firebaseConfig';
import { isUserLoggedIn } from '@/Api/user.js';

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
		methods: {
			// Handles input validation after submission.
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if ( !err ) {

					}
					this.handleSignUp('selfRegistration')
				});
			},

			handleSignUp(type) {
				FirebaseConfig.setup();
				const auth = getAuth();

				if(type === 'selfRegistration') {
					signInWithEmailAndPassword(auth, this.$refs.email.value, this.$refs.password.value)
						.then((userCredential) => {
							// Signed in
							const user = userCredential.user;
							console.log('Uemail', user);
							this.$router.push({ name: 'Dashboard' });
						})
						.catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							this.regFailed = true;
						});
						return;
				}

				let provider = type==='facebook' ? new FacebookAuthProvider() :  new GoogleAuthProvider();

				signInWithPopup(auth, provider)
					.then((result) => {
						// This gives you a Google Access Token. You can use it to access the Google API.
						const credential = GoogleAuthProvider.credentialFromResult(result);
						const token = credential.accessToken;
						// The signed-in user info.
						const user = result.user;
						console.log('email', user);
						this.$router.push({ name: 'Dashboard' });

					}).catch((error) => {
						// Handle Errors here.
						const errorCode = error.code;
						const errorMessage = error.message;
						// The email of the user's account used.
						const email = error.customData.email;
						// The AuthCredential type that was used.
						const credential = GoogleAuthProvider.credentialFromError(error);
						this.regFailed = true;
					});

			}
		},
	})

</script>

<style lang="scss">
	body {
		background-color: #ffffff;
	}
</style>
