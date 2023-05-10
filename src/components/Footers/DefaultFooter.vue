<template>

	<!-- Layout Footer -->
	<a-layout-footer>

		<!-- Footer Navigation Menu -->
		<a-menu mode="horizontal">
			<a-menu-item>
				<a href="https://joindomos.com/company" target="_blank">Company</a>
			</a-menu-item>
			<a-menu-item>
				<a href="https://joindomos.com/resources" target="_blank">Blog</a>
			</a-menu-item>
			<a-menu-item>
				<a href="https://joindomos.com/contact" target="_blank">Contact Us</a>
			</a-menu-item>
			<a-menu-item>
				<a href="https://joindomos.com/partners" target="_blank">Partners</a>
			</a-menu-item>
		</a-menu>
		<!-- / Footer Navigation Menu -->

		
		
		<!-- Copyright Notice -->
		<p class="copyright">
			Copyright © 2023 Domos
			by <a href="https://joindomos.com">Domos</a>.
		</p>
		<!-- / Copyright Notice -->

	</a-layout-footer>
	<!-- / Layout Footer -->

</template>

<script>

	export default ({
		data() {
			return {
			}
		},
	})

</script>

<style lang="scss" scoped>

	.nav-link svg {
		margin-right: 5px;
		vertical-align: middle;
	}
	.nav-link span {
		vertical-align: middle;
	}
	.ant-menu-submenu-popup {
		width: 100%;
	}

</style>