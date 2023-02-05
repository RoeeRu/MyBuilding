<!--
	This is the sign up page, it uses the dashboard layout in:
	"./layouts/Default.vue" .
 -->

<template>
	<div>

		<!-- Sign Up Image And Headings -->
		<div class="sign-up-header" style="background-image: url('images/bg-signup.jpg')">
			<div class="content">
				<h1 class="mb-5">Sign Up</h1>
				<p class="text-lg">Use these awesome forms to login or create new account in your project for free.</p>
			</div>
		</div>
		<!-- / Sign Up Image And Headings -->

		<!-- Sign Up Form -->
		<a-card :bordered="false" class="card-signup header-solid h-full" :bodyStyle="{paddingTop: 0}">
			<template #title>
				<h5 class="font-semibold text-center">Register With</h5>
			</template>
			<div class="sign-up-gateways">
    			<a-button @click="handleSignUp('facebook')">
					<img src="images/logos/logos-facebook.svg" alt="">
				</a-button>
    			<a-button @click="handleSignUp('gmail')">
					<img src="images/logos/Google__G__Logo.svg.png" alt="">
				</a-button>
			</div>
			<p class="text-center my-25 font-semibold text-muted">Or</p>
			<a-form
				id="components-form-demo-normal-login"
				:form="form"
				class="login-form"
				@submit="handleSubmit"
			>
				<a-form-item class="mb-10">
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
				<a-form-item class="mb-10">
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
				<a-form-item class="mb-5">
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
			<p class="font-semibold text-muted text-center">Already have an account? <router-link to="/sign-in" class="font-bold text-dark">Sign In</router-link></p>
		</a-card>
		<!-- / Sign Up Form -->

	</div>
</template>

<script>
	import { FirebaseConfig } from '../firebaseConfig';
	import * as firebase from "firebase/app";
	import { onAuthStateChanged, getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword  } from "firebase/auth";
	import axios from 'axios';

	export default ({
		data() {
			return {
				auth: 1
			}
		},
		beforeCreate() {
			this.form = this.$form.createForm(this, { name: 'normal_login' });
		},
		async created() {
			  await FirebaseConfig.setup();

				const auth = getAuth();
				onAuthStateChanged(auth, (user) => {
				  if (user) {
						console.log("user", user);
				    const uid = user.uid;
						user.getIdToken().then(async (idToken) => {
							let res = await this.isUserLoggedIn(idToken);
							console.log('user logged? ' + res);
			        }).catch((error) => {
									console.log('user not logged: ' + error.message);
			        });
			  } else {
					//  user sighout
						console.log('user not logged');
				  }
				});


		},
		methods: {
			// Handles input validation after submission.
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if ( !err ) {
						console.log('Received values of form: ', values) ;
					}
				});
				this.handleSignUp('selfRegistration')
			},

			handleSignUp(type) {
				FirebaseConfig.setup();
				const auth = getAuth();

				if(type === 'selfRegistration') {
					createUserWithEmailAndPassword(auth, this.$refs.email.value, this.$refs.password.value)
						.then((userCredential) => {
							// Signed in
							console.log("userCredential", userCredential);
							const user = userCredential.user;
							this.resgiterNewApi(user);
							console.log('Uemail', user);
						})
						.catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							console.log('errorUemail', error);
						});
				} else {
					let provider = type==='facebook' ? new FacebookAuthProvider() :  new GoogleAuthProvider();
					signInWithPopup(auth, provider)
						.then((result) => {
							// This gives you a Google Access Token. You can use it to access the Google API.
							const credential = GoogleAuthProvider.credentialFromResult(result);
							const token = credential.accessToken;
							// The signed-in user info.
							const user = result.user;
							this.resgiterNewApi(user);
							console.log('email', user);
						}).catch((error) => {
							// Handle Errors here.
							const errorCode = error.code;
							const errorMessage = error.message;
							// The email of the user's account used.
							const email = error.customData.email;
							// The AuthCredential type that was used.
							const credential = GoogleAuthProvider.credentialFromError(error);
							console.log('failed email', credential);
						});
				}

			},

			resgiterNewApi(user) {
						this.refreshToken = user.refreshToken
						axios.post('http://127.0.0.1:5000/registration/new', {accessToken: user.accessToken})
				      .then(response => {
				        console.log(response.data.data);
				     });
			},

			isUserLoggedIn(token) {
				return axios.post('./registration/isSignedIn', {accessToken: token})
					.then(response => {
						console.log(response.data.status);
						return response.data.status;
				 });
			}
		},
	})

</script>

<style lang="scss">
</style>
