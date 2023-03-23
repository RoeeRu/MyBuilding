import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		redirect: '/dashboard',
	},
	{
		path: '/#',
		redirect: '/dashboard',
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		layout: "dashboard",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
	},
	{
		path: '/actions',
		name: 'Actions',
		layout: "dashboard",
		component: () => import('../views/Actions.vue'),
	},
	{
		path: '/transactions',
		name: 'Transactions',
		layout: "dashboard",
		component: () => import('../views/Transactions.vue'),
	},
	{
		path: '/building',
		name: 'My Building',
		layout: "dashboard",
		component: () => import('../views/Building.vue'),
	},
	{
		path: '/documents',
		name: 'Documents',
		layout: "dashboard",
		component: () => import('../views/Documents.vue'),
	},
	{
		path: '/maintenance',
		name: 'Maintenance',
		layout: "dashboard",
		component: () => import('../views/Maintenance.vue'),
	},
	{
		path: '/deliveries',
		name: 'Deliveries',
		layout: "dashboard",
		component: () => import('../views/Deliveries.vue'),
	},
	{
		path: '/services',
		name: 'Services',
		layout: "dashboard",
		component: () => import('../views/Services.vue'),
	},
	{
		path: '/billing',
		name: 'Billing',
		layout: "dashboard",
		component: () => import('../views/Billing.vue'),
	},
	{
		path: '/sign-in',
		name: 'Sign-In',
		layout: "sign",
		component: () => import('../views/Sign-In.vue'),
	},
	{
		path: '/sign-up',
		name: 'Sign-Up',
		layout: "sign",
		meta: {
			layoutClass: 'layout-sign-up',
		},
		component: () => import('../views/Sign-Up.vue'),
	},
	{
		path: '/terms',
		name: 'Terms',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-sign-up',
		},
		component: () => import('../views/Terms.vue'),
	},
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;

	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
	store,
	scrollBehavior (to, from, savedPosition) {
		if ( to.hash ) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
})

router.beforeEach(async (to, from, next) => {
		let isLogged = await store.dispatch('isLoggedIn');

		if (isLogged && (to.name === 'Sign-In' || to.name === 'Sign-Up')) {
	    return next('/dashboard');
	  }

	  if (!isLogged && (to.name !== 'Sign-In' && to.name !== 'Sign-Up')) {
	    return next('/sign-in');
	  }
	  next();
	})

export default router
