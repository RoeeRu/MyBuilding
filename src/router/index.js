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
		path: '/calendar',
		name: 'Calendar',
		layout: "dashboard",
		component: () => import('../views/Calendar.vue'),
		meta: {
				requiresAuth: true,
				allowedRoles: [],
				permissionName: 'calendar'
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
		path: '/forum',
		name: 'Community Forum',
		layout: "dashboard",
		component: () => import('../views/Forum.vue'),
		meta: {
				requiresAuth: true,
				allowedRoles: [],
				permissionName: 'forum'
		}
	},
	{
		path: '/thread/:id', // The dynamic route parameter is represented by ':id'
		name: 'ThreadDetails',
		layout: "dashboard",
		component: () => import('../views/ThreadDetails.vue'),
		props: (route) => ({ thread: route.params.thread }),
		meta: {
				requiresAuth: true,
				allowedRoles: [],
				permissionName: 'forum'
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

// Add error handling to the Vue Router
// router.onError(error => {
//   console.error(error)
//   Vue.prototype.$log.error('Failure Reason: ', error.message, error)
//   if (/ChunkLoadError:.*failed./i.test(error.message)) {
//     Vue.prototype.$log.error('Reloading Window 1')
//     window.location.reload()
//   } else if (/Loading.*chunk.*failed./i.test(error.message)) {
//     Vue.prototype.$log.error('Reloading Window 2')
//     window.location.reload()
//   }
// })

async function checkForUpdatedRoutes() {
	let allowedRoutesByRole = store.state.auth.routesByRole;
	if (!store.state.auth.allowedRolesUpdated && Array.isArray(allowedRoutesByRole) && allowedRoutesByRole.length > 0) {
		return;
	}

  await store.dispatch('getRoutes');
}

function reloadPageIfExpired(inactivityTimeout) {
	const currentExpireTime = localStorage.getItem("cacheExpireTime");

  const currentTime = new Date().getTime();
	const timeExpired = currentTime > currentExpireTime;
  if (!currentExpireTime || timeExpired) {
	if (process.env.NODE_ENV === 'development') {
        console.log('Cache has expired, clearing it')}
    // Cache has expired, clear it
    localStorage.clear();

		// Set localStorage session reload time to inactivityTimeout hours from idle
		let expTimeInHours = (60 * 60 * 1000) * inactivityTimeout;
		let cacheExpirationTime = new Date().getTime() + expTimeInHours;
		localStorage.setItem("cacheExpireTime", cacheExpirationTime);
		if(currentExpireTime && timeExpired) {
			if (process.env.NODE_ENV === 'development') {
				console.log('currentExpireTime - reloading page')}
			window.location.reload();
		}
  }
}


router.beforeEach(async (to, from, next) => {
	if (process.env.NODE_ENV === 'development') {
        console.log('beforeEach', to.fullPath, from.fullPath)}
	let isLogged = await store.dispatch('isLoggedIn');
	if(isLogged ) {
		let inactivityTimeout = 4;
		if (from.fullPath === '/sign-in' || from.fullPath === '/sign-up') {
			let expTimeInHours = (60 * 60 * 1000) * inactivityTimeout;
			let cacheExpirationTime = new Date().getTime() + expTimeInHours;
			localStorage.setItem("cacheExpireTime", cacheExpirationTime);
		}
		else {
		reloadPageIfExpired(inactivityTimeout)
		}
	}
  const requiresAuth = to.meta.requiresAuth;
	if(to.name=="Sign-In" && isLogged) {
		const initialRoute = localStorage.getItem("initialRoute");
		next(initialRoute || store.state.auth.initialRoute)
	}
  else if (!requiresAuth) {
    next();
  } else if (isLogged) {
    const allowedRoles = to.meta.allowedRoles;
    const userRole = store.getters.user.role;
		// alert(to.name)
		await checkForUpdatedRoutes();
    if (allowedRoles.length > 0 && allowedRoles.includes(userRole)) {
      next();
    } else {
			console.log('role not allowed')
			await store.dispatch('signOut');
			router.currentRoute.meta.navigationCancelled = true;
			router.go(from.path);
    }
  } else {
    next('/sign-in');
  }
});

export default router;
