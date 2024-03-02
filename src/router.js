import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams',
    },
    {
      name: 'teams',
      path: '/teams', // our-domain.com/teams
      meta: { needsAuth: true },
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      }, // if there are multiple routerviews in same page (we can name them and use different components for different names)
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        }, // teams/someid
      ],
    },
    {
      path: '/users', // our-domain.com/users
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      beforeEnter: (to, from, next) => {
        console.log('users beforeEnter');
        console.log(to, from);
        next();
      },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior(to, from, savedPosition) {
    // ...
    // console.log(to)
    // console.log(from)
    // console.log(savedPosition)

    if (savedPosition) {
      /* saved position is when we go back using browser back, it saves left and top position */
      return savedPosition;
    }
    /* if there are no saved position, go top, otherwise go where u left before */
    return {
      left: 0,
      top: 0,
    };
  },
});

router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);

  if (to.meta.needsAuth) {
    /* if user is authenticated, global navigation guard based on metadata */
    console.log('needs auth');
    next();
  }

  // if (to.name === 'team-members') {
  //   next();
  // } else {
  //   next({
  //     name: 'team-members',
  //     params: {
  //       teamId: 't2',
  //     },
  //   });
  // }

  next();
});

router.afterEach((to, from) => {
  // to and from are both route objects.
  // sending analytics to log when user changes pages for example, we cant control what user sees
  // becouse its too late now
  console.log('Global afterEach');
  console.log(to, from);
});

export default router;