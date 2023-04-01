import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('../views/404.vue'),
		meta: {
        requiresAuth: false
      }
	},
	{
		path: '/',
		redirect: '/dashboard',
		meta: {
				requiresAuth: true,
				allowedRoles: ['admin']
		}
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		layout: "dashboard",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
		meta: {
				requiresAuth: true,
				allowedRoles: [],
				permissionName: 'dashboard'
		}
	},
	{
		path: '/projects',
		name: 'Projects',
		layout: "dashboard",
		component: () => import('../views/Actions.vue'),
		meta: {
				requiresAuth: true,
				allowedRoles: [],
				permissionName: 'projects'
		}
	},
	{
		path: '/transactions',
		name: 'Transactions',
		layout: "dashboard",
		component: () => import('../views/Transactions.vue'),
		meta: {
				requiresAuth: true,
				allowedRoles: [],
				permissionName: 'transactions'
		}
	},
	{
		path: '/building',
		name: 'My Building',
		layout: "dashboard",
		component: () => import('../views/Building.vue'),
		meta: {
				requiresAuth: true,
				allowedRoles: [],
				permissionName: 'building'
		}
	},
	{
		path: '/documents',
		name: 'Documents',
		layout: "dashboard",
		component: () => import('../views/Documents.vue'),
		meta: {
				requiresAuth: true,
				allowedRoles: [],
				permissionName: 'documents'
		}
	},
	{
		path: '/work-orders',
		name: 'Work Orders',
		layout: "dashboard",
		component: () => import('../views/Maintenance.vue'),
		meta: {
				requiresAuth: true,
				allowedRoles: [],
				permissionName: 'maintenance'
		}
	},
	{
		path: '/deliveries',
		name: 'Deliveries',
		layout: "dashboard",
		component: () => import('../views/Deliveries.vue'),
		meta: {
				requiresAuth: true,
				allowedRoles: [],
				permissionName: 'deliveries'
		}
	},
	{
		path: '/services',
		name: 'Services',
		layout: "dashboard",
		component: () => import('../views/Services.vue'),
		meta: {
				requiresAuth: true,
				allowedRoles: [],
				permissionName: 'services'
		}
	},
	{
		path: '/billing',
		name: 'Billing',
		layout: "dashboard",
		component: () => import('../views/Billing.vue'),
		meta: {
				requiresAuth: true,
				allowedRoles: [],
				permissionName: 'billing'
		}
	},
	{
		path: '/sign-in',
		name: 'Sign-In',
		layout: "sign",
		component: () => import('../views/Sign-In.vue'),
		meta: {
        requiresAuth: false
      }
	},
	{
		path: '/sign-up',
		name: 'Sign-Up',
		layout: "sign",
		meta: {
			layoutClass: 'layout-sign-up',
		},
		component: () => import('../views/Sign-Up.vue'),
		meta: {
        requiresAuth: false
      }
	},
	{
		path: '/terms',
		name: 'Terms',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-sign-up',
		},
		component: () => import('../views/Terms.vue'),
		meta: {
        requiresAuth: false
      }
	},
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{

	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;

	// const allowedRoles = allowedRolesByRoute[route.name];
  // route.meta.allowedRoles = allowedRoles;

	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}



routes = routes.map(  ( route ) =>  addLayoutToRoute( route, "default" ) ) ;
const router = new VueRouter({
	mode: 'history',
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

async function updateRoutes() {
	if (!store.state.auth.allowedRolesUpdated) {
		let allowedRolesByRoutes = await store.dispatch('getRoutes');
		router.options.routes.forEach(route => {
			if(!route.meta.requiresAuth){
				return;
			}
			Object.entries(allowedRolesByRoutes).forEach(([roleName, allowedRolesByRoute]) => {

				let routerName = route.meta.permissionName;

				if(Object.keys(allowedRolesByRoute).includes(routerName)) {
					route.meta.allowedRoles.push(roleName);
				}
			});
		});
	}
}

router.beforeEach(async (to, from, next) => {
	await updateRoutes();

	let isLogged = await store.dispatch('isLoggedIn');
  const requiresAuth = to.meta.requiresAuth;
  if (!requiresAuth) {
    next();
  } else if (isLogged) {
    const allowedRoles = to.meta.allowedRoles;
    const userRole = store.getters.user.role;

    if (!allowedRoles || allowedRoles.includes(userRole)) {
      next();
    } else {
			next(from.path);
    }
  } else {
    next('/sign-in');
  }
});

export default router;
