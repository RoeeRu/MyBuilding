<template>

	<!-- Main Sidebar -->
	<a-layout-sider
		collapsible
		class="sider-primary"
		breakpoint="lg"
		collapsed-width="0"
		width="250px"
		:collapsed="sidebarCollapsed"
		@collapse="$emit('toggleSidebar', ! sidebarCollapsed)"
		:trigger="null"
		:class="['ant-layout-sider-' + sidebarColor, 'ant-layout-sider-' + sidebarTheme]"
		theme="light"
		:style="{ backgroundColor: 'transparent',}">
			<a href="/" >
				<div class="brand"><img src="images/logo-domos.png" alt=""></div>
			</a>
			<hr>

			<!-- Sidebar Navigation Menu -->
			<a-menu theme="light" mode="inline" @click="handleMenuClick">
				<a-menu-item v-if="permissions.dashboard">
					<router-link to="/dashboard">
						<span class="icon">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z" fill="#111827"/>
								<path d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z" fill="#111827"/>
								<path d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z" fill="#111827"/>
							</svg>
						</span>
						<span class="label">Dashboard</span>
					</router-link>
				</a-menu-item>
				<a-menu-item v-if="permissions.maintenance">
					<router-link to="/work-orders">
						<span class="icon">
							<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>maintenance-documents</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="add" fill="#000000" transform="translate(42.666667, 42.666667)"> <path d="M320,64 L405.333333,149.333333 L405.333333,426.666667 L64,426.666667 L64,64 L320,64 Z M302.326888,106.666667 L106.666667,106.666667 L106.666667,384 L362.666667,384 L362.666667,167.006445 L302.326888,106.666667 Z M256,7.10542736e-15 L298.666667,42.6666667 L42.6666667,42.6666667 L42.6666667,362.666667 L7.10542736e-15,362.666667 L7.10542736e-15,7.10542736e-15 L256,7.10542736e-15 Z M244.302904,167.174593 C260.439702,188.157298 265.883899,213.970305 260.713161,232.815619 C260.06747,235.91652 282.811168,260.09809 328.944255,305.360329 C344.0292,320.445274 344.0292,335.530218 328.944255,350.615163 C314.74666,364.812758 300.549065,365.64791 286.35147,353.120621 L211.482391,282.046388 C192.635434,287.217603 166.823081,281.773415 145.841366,265.636132 C130.452444,245.401095 125.144195,218.951922 129.431109,199.995106 L162.251622,232.815619 L195.072135,216.405362 L211.482391,183.58485 L178.661879,150.764337 C197.618105,146.477784 224.068368,151.785327 244.302904,167.174593 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>
						</span>
						<span class="label">Work Orders</span>
					</router-link>
				</a-menu-item>
				<a-menu-item v-if="permissions.projects">
					<router-link to="/projects">
						<span class="icon">
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 7C6.25 7.69036 5.69036 8.25 5 8.25C4.30964 8.25 3.75 7.69036 3.75 7C3.75 6.30964 4.30964 5.75 5 5.75C5.69036 5.75 6.25 6.30964 6.25 7ZM9 6C8.44771 6 8 6.44772 8 7C8 7.55228 8.44771 8 9 8H19C19.5523 8 20 7.55228 20 7C20 6.44772 19.5523 6 19 6H9ZM9 11C8.44771 11 8 11.4477 8 12C8 12.5523 8.44771 13 9 13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H9ZM9 16C8.44771 16 8 16.4477 8 17C8 17.5523 8.44771 18 9 18H19C19.5523 18 20 17.5523 20 17C20 16.4477 19.5523 16 19 16H9ZM5 13.25C5.69036 13.25 6.25 12.6904 6.25 12C6.25 11.3096 5.69036 10.75 5 10.75C4.30964 10.75 3.75 11.3096 3.75 12C3.75 12.6904 4.30964 13.25 5 13.25ZM5 18.25C5.69036 18.25 6.25 17.6904 6.25 17C6.25 16.3096 5.69036 15.75 5 15.75C4.30964 15.75 3.75 16.3096 3.75 17C3.75 17.6904 4.30964 18.25 5 18.25Z" fill="#000000"></path> </g></svg>
						</span>
						<span class="label">Projects</span>
					</router-link>
				</a-menu-item>
				<a-menu-item v-if="permissions.transactions">
					<router-link to="/transactions">
						<span class="icon">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z" fill="#111827"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z" fill="#111827"/>
							</svg>
						</span>
						<span class="label">Transactions</span>
					</router-link>
				</a-menu-item>
				<a-menu-item v-if="permissions.building">
					<router-link to="/building">
						<span class="icon">
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
								<path d="M10.5 6H9.5C9.22386 6 9 6.22386 9 6.5V7.5C9 7.77614 9.22386 8 9.5 8H10.5C10.7761 8 11 7.77614 11 7.5V6.5C11 6.22386 10.7761 6 10.5 6Z" fill="#000000"></path> <path d="M14.5 6H13.5C13.2239 6 13 6.22386 13 6.5V7.5C13 7.77614 13.2239 8 13.5 8H14.5C14.7761 8 15 7.77614 15 7.5V6.5C15 6.22386 14.7761 6 14.5 6Z" fill="#000000"></path> <path d="M10.5 9.5H9.5C9.22386 9.5 9 9.72386 9 10V11C9 11.2761 9.22386 11.5 9.5 11.5H10.5C10.7761 11.5 11 11.2761 11 11V10C11 9.72386 10.7761 9.5 10.5 9.5Z" fill="#000000"></path> <path d="M14.5 9.5H13.5C13.2239 9.5 13 9.72386 13 10V11C13 11.2761 13.2239 11.5 13.5 11.5H14.5C14.7761 11.5 15 11.2761 15 11V10C15 9.72386 14.7761 9.5 14.5 9.5Z" fill="#000000"></path> <path d="M10.5 13H9.5C9.22386 13 9 13.2239 9 13.5V14.5C9 14.7761 9.22386 15 9.5 15H10.5C10.7761 15 11 14.7761 11 14.5V13.5C11 13.2239 10.7761 13 10.5 13Z" fill="#000000"></path> <path d="M14.5 13H13.5C13.2239 13 13 13.2239 13 13.5V14.5C13 14.7761 13.2239 15 13.5 15H14.5C14.7761 15 15 14.7761 15 14.5V13.5C15 13.2239 14.7761 13 14.5 13Z" fill="#000000"></path>
								<path d="M18.25 19.25H17.75V4C17.7474 3.80189 17.6676 3.61263 17.5275 3.47253C17.3874 3.33244 17.1981 3.25259 17 3.25H7C6.80189 3.25259 6.61263 3.33244 6.47253 3.47253C6.33244 3.61263 6.25259 3.80189 6.25 4V19.25H5.75C5.55109 19.25 5.36032 19.329 5.21967 19.4697C5.07902 19.6103 5 19.8011 5 20C5 20.1989 5.07902 20.3897 5.21967 20.5303C5.36032 20.671 5.55109 20.75 5.75 20.75H18.25C18.4489 20.75 18.6397 20.671 18.7803 20.5303C18.921 20.3897 19 20.1989 19 20C19 19.8011 18.921 19.6103 18.7803 19.4697C18.6397 19.329 18.4489 19.25 18.25 19.25ZM16.25 19.25H11V17C11 16.8674 10.9473 16.7402 10.8536 16.6464C10.7598 16.5527 10.6326 16.5 10.5 16.5H9.5C9.36739 16.5 9.24021 16.5527 9.14645 16.6464C9.05268 16.7402 9 16.8674 9 17V19.25H7.75V4.75H16.25V19.25Z" fill="#000000"></path> </g></svg>
						</span>
						<span class="label">My Building</span>
					</router-link>
				</a-menu-item>
				<a-menu-item v-if="permissions.documents">
					<router-link to="/documents">
						<span class="icon">
							<svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>files</title> <path d="M16.984 16.047h-8v0.906h8v-0.906zM16.984 19.047h-8v0.969h8v-0.969zM12.016 4.016v3.016h-3.032v3.016h-2.953v18.938h13.969v-3.031h2.953v-2.938h3.016v-19h-13.953zM19.031 28.016h-12.031v-17.063h12.031v17.063zM21.984 25.047h-1.984v-15h-10.047v-2.047h12.031v17.047zM25 22.047h-2.047v-15.016h-9.969v-2.047h12.016v17.063zM16.984 25.031h-8v0.969h8v-0.969zM16.984 22.016h-8v0.969h8v-0.969zM16.999 13.016h-8v1h8v-1z"></path> </g></svg>
						</span>
						<span class="label">Documents</span>
					</router-link>
				</a-menu-item>
				<a-menu-item v-if="permissions.services">
					<router-link to="/services">
						<span class="icon">
							<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M864 409.6a192 192 0 0 1-37.888 349.44A256.064 256.064 0 0 1 576 960h-96a32 32 0 1 1 0-64h96a192.064 192.064 0 0 0 181.12-128H736a32 32 0 0 1-32-32V416a32 32 0 0 1 32-32h32c10.368 0 20.544.832 30.528 2.432a288 288 0 0 0-573.056 0A193.235 193.235 0 0 1 256 384h32a32 32 0 0 1 32 32v320a32 32 0 0 1-32 32h-32a192 192 0 0 1-96-358.4 352 352 0 0 1 704 0zM256 448a128 128 0 1 0 0 256V448zm640 128a128 128 0 0 0-128-128v256a128 128 0 0 0 128-128z"></path></g></svg>
						</span>
						<span class="label">Services</span>
					</router-link>
				</a-menu-item>
				<a-menu-item v-if="permissions.deliveries">
					<router-link to="/deliveries">
						<span class="icon">
							<svg height="25px" width="25px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path class="st0" d="M447.77,33.653c-36.385-5.566-70.629,15.824-82.588,49.228h-44.038v37.899h40.902 c5.212,31.372,29.694,57.355,62.855,62.436c41.278,6.316,79.882-22.042,86.222-63.341C517.428,78.575,489.07,39.969,447.77,33.653z "></path> <path class="st0" d="M162.615,338.222c0-6.88-5.577-12.468-12.468-12.468H96.16c-6.891,0-12.467,5.588-12.467,12.468 c0,6.868,5.576,12.467,12.467,12.467h53.988C157.038,350.689,162.615,345.091,162.615,338.222z"></path> <path class="st0" d="M392.999,237.965L284.273,340.452l-37.966,9.398v-86.619H0v215.996h246.307v-59.454l35.547-5.732 c16.95-2.418,29.396-6.692,44.336-15.018l46.302-24.228v104.432h132.435V270.828C504.927,202.618,428.016,202.43,392.999,237.965z M215.996,448.913H30.313v-155.37h185.683v63.805l-36.419,9.01c-15.968,4.395-25.708,20.518-22.174,36.696l0.298,1.247 c3.478,15.912,18.651,26.436,34.785,24.14l23.51-3.788V448.913z"></path> </g> </g></svg>

						</span>
						<span class="label">Deliveries</span>
					</router-link>
				</a-menu-item>


			</a-menu>
			<!-- / Sidebar Navigation Menu -->

			<!-- Sidebar Footer -->
			<div class="aside-footer">
				<div class="footer-box">
					<span class="icon">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z" fill="#111827"/>
							<path d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z" fill="#111827"/>
							<path d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z" fill="#111827"/>
						</svg>
					</span>
					<h6>Got Feedback?</h6>
					<p></p>
					<a-button type="primary" href="mailto:support@joindomos.com" block target="_blank">
						Email Us Now
					</a-button>
				</div>
			</div>
			<!-- / Sidebar Footer -->



	</a-layout-sider>
	<!-- / Main Sidebar -->

</template>

<script>
import { mapState } from 'vuex'

	export default ({
		props: {
			// Sidebar collapsed status.
			sidebarCollapsed: {
				type: Boolean,
				default: false,
			},

			// Main sidebar color.
			sidebarColor: {
				type: String,
				default: "primary",
			},

			// Main sidebar theme : light, white, dark.
			sidebarTheme: {
				type: String,
				default: "light",
			},
		},
		mounted() {
			const allowedRoleForRole = this.routesByRole[this.user.role];
			console.log("allowedRoleForRole", allowedRoleForRole);
			if(!allowedRoleForRole) {
				return;
			}

			Object.entries(allowedRoleForRole).forEach(([allowedRouteName]) => {
				this.permissions[allowedRouteName] = true;
			});
		},
		data() {
			return {
				permissions: {
					dashboard: false,
					projects: false,
					transactions: false,
					building: false,
					documents: false,
					maintenance: false,
					deliveries: false,
					services: false,
					billing: false,
				}
			}
		},
		computed: {
			...mapState({
				user: state => state.auth.user,
				routesByRole: state => state.auth.routesByRole,
			})
		},
		methods: {
		  handleMenuClick() {
				if (window.matchMedia('(max-width: 567px)').matches) {
        	this.$emit('toggleSidebar', true);
      	}

		  }
		}
	})

</script>
