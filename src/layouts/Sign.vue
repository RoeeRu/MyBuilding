<!-- 
	This is the dashboard layout, used in dashboard, tables, billing and profile pages.
 -->

<template>
	<div>

		<!-- Dashboard Layout -->
		<a-layout class="layout-sign" id="layout-sign" :class="[layoutClass]">
			

			<!-- Layout Content -->

				<!-- Layout Header's Conditionally Fixed Wrapper -->
				<!-- / Layout Header's Conditionally Fixed Wrapper -->

				<!-- Page Content -->
				<a-layout-content>
					<router-view />
				</a-layout-content>
				<!-- / Page Content -->

				<!-- Layout Footer -->
			<DefaultFooter></DefaultFooter>
				<!-- / Layout Footer -->

				
			<!-- / Layout Content -->
			
			<!-- Settings Drawer -->
			<!-- / Settings Drawer -->

		</a-layout>
		<!-- / Dashboard Layout -->

	</div>
</template>

<script>

	import DefaultHeader from '../components/Headers/DefaultHeader' ;
	import DefaultFooter from '../components/Footers/DefaultFooter' ;

	export default ({
		components: {
			DefaultHeader,
			DefaultFooter,
		},
		data() {
			return {
				// Sidebar collapsed status.
				sidebarCollapsed: false,
				
				// Main sidebar color.
				sidebarColor: "primary",
				
				// Main sidebar theme : light, white, dark.
				sidebarTheme: "light",

				// Header fixed status.
				navbarFixed: false,

				// Settings drawer visiblility status.
				showSettingsDrawer: false,
			}
		},
		methods: {
			toggleSidebar( value ) {
				this.sidebarCollapsed = value ;
			},
			toggleSettingsDrawer( value ) {
				this.showSettingsDrawer = value ;
			},
			toggleNavbarPosition( value ) {
				this.navbarFixed = value ;
			},
			updateSidebarTheme( value ) {
				this.sidebarTheme = value ;
			},
			updateSidebarColor( value ) {
				this.sidebarColor = value ;
			},
		},
		computed: {
			// Sets layout's element's class based on route's meta data.
			layoutClass() {
				return this.$route.meta.layoutClass ;
			}
		},
	})

</script>
