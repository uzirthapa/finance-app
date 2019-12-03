
const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        meta: { requiresAuth: true },
        component: () => import('@/Base/pages/DashboardPage.vue'),
    },
    {
        path: '/dashboard/total-spending',
        name: 'Total Spending',
        meta: { requiresAuth: true, transitionName: 'slide' },
        component: () => import('@/modules/Transactions/pages/TotalSpendingPage.vue')
    },
    {
        path: '/dashboard/transactions',
        name: 'Transactions',
        meta: { requiresAuth: true, transitionName: 'slide' },
        component: () => import('@/modules/Transactions/pages/SpendingCategoryPage.vue'),
        props: (route) => ({ query: route.query.category })
    },
    {
        path: '/auth',
        name: 'Welcome',
        component: () => import('@/modules/Auth/pages/AuthPage.vue')
    },
    // {
    //     path: '/auth-bank',
    //     name: 'auth-bank',
    //     component: () => import('@/modules/Transactions/pages/AuthBankPage.vue')
    // },
    {
        path: '/account',
        name: 'Account',
        meta: { requiresAuth: true },
        component: () => import('@/modules/Account/pages/AccountPage.vue')
    },
    {
        path: '/shared',
        name: 'Profiles',
        meta: { requiresAuth: true },
        component: () => import('@/modules/Shared/pages/SharedPage.vue')
    },
    {
        path: '/notifications',
        name: 'Notifications',
        meta: { requiresAuth: true },
        component: () => import('@/modules/Notifications/pages/NotificationsPage.vue')
    },

]

export default routes