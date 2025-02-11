import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'home',
    component: () => import('../page/index'),
    // component: () => import('../home/home'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/home/coupon',
    component: () => import('../page/home/coupon/list'),
    meta: {
      title: '领取优惠券'
    }
  },
  {
    path: '/home/second',
    component: () => import('../page/home/second/list'),
    meta: {
      title: '秒杀活动'
    }
  },
  {
		path: '/login',
    component: () => import('../page/account/login'),
    meta: {
      title: '登录'
    }
  },
  {
		path: '/login/password',
    component: () => import('../page/account/password'),
    meta: {
      title: '登录'
    }
  },
  {
		path: '/login/phone',
    component: () => import('../page/account/phonelogin'),
    meta: {
      title: '手机号登录'
    }
  },
  {
		path: '/login/passowrdRegister',
    component: () => import('../page/account/passowrdRegister'),
    meta: {
      title: '密码注册'
    }
  },
  {
		path: '/login/register',
    component: () => import('../page/account/register'),
    meta: {
      title: '注册'
    }
  },
  {
		path: '/user/index',
    component: () => import('../page/user/index'),
    name: 'user',
    meta: {
      title: '会员中心'
    }
  },
  {
		path: '/user/info',
    component: () => import('../page/user/info/detail'),
    name: 'user',
    meta: {
      title: '账号管理'
    }
  },
  {
		path: '/user/info/changepassword',
    component: () => import('../page/user/info/component/updatePassword'),
    name: 'user',
    meta: {
      title: '修改密码'
    }
  },
  {
    path: '/user/address',
    name:"address",
    component: () => import('../page/user/address/list'),
    meta: {
      title: '我的地址'
    }
  },
  {
    path: '/user/address/edit',
    component: () => import('../page/user/address/edit'),
    meta: {
      title: '修改地址'
    }
  },
  {
    path: '/user/favorite',
    component: () => import('../page/user/favorite/list'),
    meta: {
      title: '我的收藏'
    }
  },
  {
    path: '/user/coupon',
    component: () => import('../page/user/coupon/list'),
    meta: {
      title: '我的优惠券'
    }
  },
  {
    path: '/user/order',
    component: () => import('../page/user/order/list'),
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/user/order/:id',
    component: () => import('../page/user/order/list'),
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/user/order/info/:id',
    component: () => import('../page/user/order/info'),
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/user/order1/returnapply',
    component: () => import('../page/user/order/returnapply'),
    meta: {
      title: '订单退款'
    }
  },
  {
    path: '/user/order/logistics/:id',
    component: () => import('../page/user/order/logistics'),
    meta: {
      title: '订单追踪'
    }
  },
  {
    path: '/user/aftersale',
    component: () => import('../page/user/aftersale/list'),
    meta: {
      title: '售后'
    }
  },
  {
    path: '/user/aftersale/apply',
    component: () => import('../page/user/aftersale/apply'),
    meta: {
      title: '申请售后'
    }
  },
  {
    path: '/user/aftersale/detail',
    component: () => import('../page/user/aftersale/detail'),
    meta: {
      title: '服务单详情'
    }
  },
  {
    path: '/user/aftersale/track/:id',
    component: () => import('../page/user/aftersale/track'),
    meta: {
      title: '进度详情'
    }
  },
  {
    path: '/product/:id',
    component: () => import('../page/product/detail'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/search',
    component: () => import('../page/product/list'),
    meta: {
      title: '商品列表'
    }
  },
  {
    name: 'cart',
    component: () => import('../page/cart/index'),
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/order',
    component: () => import('../page/shipping/order'),
    meta: {
      keepAlive : true,
      title: '确认订单',
      isBack: false
    }
  },
  {
    name: 'category',
    component: () => import('../page/category/index'),
    meta: {
      title: '分类'
    }
  },
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
