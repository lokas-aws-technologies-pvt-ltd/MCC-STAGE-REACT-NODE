/* eslint-disable */
import { lazy } from 'react';
import { USER_ROLE } from 'constants.js';
import { DEFAULT_PATHS } from 'config.js';

const home = {
  index: lazy(() => import('views/publicsite/Home')), 
};
const chamberbook = {
  index: lazy(() => import('views/publicsite/Chamberbook')), 
};
const loginadminmember = {
  index: lazy(() => import('views/default/Loginadminmember')), 
};
const aboutus = {
  index: lazy(() => import('views/publicsite/Aboutus')), 
};
const Affiliated = {
  index: lazy(() => import('views/publicsite/Affiliated')), 
};
const Badminton = {
  index: lazy(() => import('views/publicsite/Badminton')), 
};
const Banquets = {
  index: lazy(() => import('views/publicsite/Banquets')), 
};
const Billiards = {
  index: lazy(() => import('views/publicsite/Billiards')), 
};
const Cards = {
  index: lazy(() => import('views/publicsite/Cards')), 
};
const Clubfacilities = {
  index: lazy(() => import('views/publicsite/Clubfacilities')), 
};
const Committemembers = {
  index: lazy(() => import('views/publicsite/Committemembers')), 
};
const Contactus = {
  index: lazy(() => import('views/publicsite/Contactus')), 
};
const Cricket = {
  index: lazy(() => import('views/publicsite/Cricket')), 
};
const Events = {
  index: lazy(() => import('views/publicsite/Events')), 
};
const Gym = {
  index: lazy(() => import('views/publicsite/Gym')), 
};
const Hockey = {
  index: lazy(() => import('views/publicsite/Hockey')), 
};
const Library = {
  index: lazy(() => import('views/publicsite/Library')), 
};
const Otherwellness = {
  index: lazy(() => import('views/publicsite/Otherwellness')), 
};
const Restaurants = {
  index: lazy(() => import('views/publicsite/Restaurants')), 
};
const Squash = {
  index: lazy(() => import('views/publicsite/Squash')), 
};
const Swimming = {
  index: lazy(() => import('views/publicsite/Swimming')), 
};
const Tennis = {
  index: lazy(() => import('views/publicsite/Tennis')), 
};
const Thechambers = {
  index: lazy(() => import('views/publicsite/Thechambers')), 
};
const Yoga = {
  index: lazy(() => import('views/publicsite/Yoga')), 
};
const Yorkerbar = {
  index: lazy(() => import('views/publicsite/Yorkerbar')), 
};
const member = {
  viewStatement: lazy(() => import('views/member/ViewStatement')),
  changePassword: lazy(() => import('views/member/ChangePassword')),
  MyFeedBacks: lazy(() => import('views/member/feedbacks/list/FeedBacksList')),
  FeedBackDetail : lazy(() => import('views/member/feedbacks/detail/FeedBackDetail')),
  foodordering: { 
    home: lazy(() => import('views/member/foodordering/home/Home')),
    cart: lazy(() => import('views/member/foodordering/cart/Cart')),
    checkout: lazy(() => import('views/member/foodordering/checkout/Checkout')),
    orders:{
      list:lazy(() => import('views/member/foodordering/orders/list/OrdersList')),
      detail: lazy(() => import('views/member/foodordering/orders/detail/OrdersDetail')),
    },
    barHome : lazy(()=>import('views/member/foodordering/barHome/BarHome')),
    barCart: lazy(() => import('views/member/foodordering/barCart/BarCart')),
    barOrders:{
      list:lazy(() => import('views/member/foodordering/barOrders/list/OrdersList')),
      detail: lazy(() => import('views/member/foodordering/barOrders/detail/OrdersDetail')),
    },
  },
  events:{
    eventsList: lazy(()=>import('views/member/events/EventsList')),
    orders:{
      list: lazy(()=>import('views/member/events/orders/list/OrdersList.js')),
      detail: lazy(() => import('views/member/events/orders/detail/OrdersDetail')),
    }
  },
  clubman:{
    currentIssue: lazy(()=>import('views/member/clubman/CurrentIssue')),
    Archive: lazy(() => import('views/member/clubman/Archive')),  
  },
  chamber:{
    Booking: lazy(()=>import('views/member/chamber/Booking')),
    List: lazy(() => import('views/member/chamber/List')),  
  },
  banquet:{
    Booking: lazy(()=>import('views/member/banquet/Booking')),
    List: lazy(() => import('views/member/banquet/List')),  
  }
}

const admin ={
  dashboard: lazy(() => import('views/admin/Dashboard')),
  ManageMembers: lazy(() => import('views/admin/members/ManageMembers')),
  ManageCategory: lazy(() => import('views/admin/restaurant/ManageCategory')),
  ManageSubCategory: lazy(() => import('views/admin/restaurant/ManageSubCategory')),
  ManageMenu: lazy(() => import('views/admin/restaurant/ManageMenu')),
  ManageOrder: lazy(() => import('views/admin/restaurant/orders/list/OrdersList')),
  OrderDetail: lazy(() => import('views/admin/restaurant/orders/detail/OrdersDetail')),
  BarManageCategory: lazy(() => import('views/admin/restaurant/BarManageCategory')),
  ManageBarSubCategory: lazy(() => import('views/admin/restaurant/ManageBarSubCategory')),
  BarManageMenu: lazy(() => import('views/admin/restaurant/BarManageMenu')),
  BarManageOrder: lazy(() => import('views/admin/restaurant/barOrders/list/OrdersList')),
  BarOrderDetail: lazy(() => import('views/admin/restaurant/barOrders/detail/OrdersDetail')),

  ManageChamberOrder: lazy(() => import('views/admin/chamber/orders/list/OrdersList')),
  ChamberOrderDetail: lazy(() => import('views/admin/chamber/orders/detail/OrdersDetail')),

  ManageBanquets: lazy(() => import('views/admin/banquet/ManageBanquets')),
  ManageBanquetMenu: lazy(() => import('views/admin/banquet/ManageBanquetMenu')),
  ManageBanquetMenuItem: lazy(() => import('views/admin/banquet/ManageBanquetMenuItem')),
  ManageBanquetOrder: lazy(() => import('views/admin/banquet/orders/list/OrdersList')),
  BanquetOrderDetail: lazy(() => import('views/admin/banquet/orders/detail/OrdersDetail')),
  
  ManageEvents: lazy(() => import('views/admin/events/ManageEvents')),
  ManageEventsCategory: lazy(() => import('views/admin/events/ManageCategory')),
  ManageEventsOrder: lazy(() => import('views/admin/events/orders/list/OrdersList')),
  EventsOrderDetail: lazy(() => import('views/admin/events/orders/detail/OrdersDetail')),
  ManageFeedBacks: lazy(() => import('views/admin/feedbacks/list/FeedBacksList')),
  FeedBackDetail : lazy(() => import('views/admin/feedbacks/detail/FeedBackDetail')),
  ManageClubmans: lazy(() => import('views/admin/clubman/ManageClubmans')),
  Report: lazy(() => import('views/admin/reports/PaymentList')),
  EventReport: lazy(() => import('views/admin/reports/EventList')),
 ManageBroadcast: lazy(() => import('views/admin/messagebroadcast/managebroadcast')),

 Managegeneral: lazy(() => import('views/admin/setting/general')),
 ManageCommitteeMember: lazy(() => import('views/admin/setting/committeemember/ManageCommitteeMembers')),
 ManageAffiliateClub: lazy(() => import('views/admin/setting/affiliateclub/ManageAffiliateClub')),
 ManageImageUpload: lazy(() => import('views/admin/setting/imageupload/ManageImageupload')),
}



const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/home`, 
    },
    {
      path: `${appRoot}/home`,
      component: home.index,
      label: 'menu.home',
      icon: 'home',
    }, 
    {
      path: `${appRoot}/loginadminmember`,
      component: loginadminmember.index,
      label: 'menu.home',
      icon: 'home',
    },
    {
      path: `${appRoot}/chamberbooking`,
      component: chamberbook.index,
      label: 'menu.chamberbook',
      icon: 'home',
    },{
      path: `${appRoot}/aboutus`,
      component: aboutus.index,
      label: 'menu.aboutus',
      icon: 'home',
    }, {
      path: `${appRoot}/affiliated`,
      component: Affiliated.index,
      label: 'menu.Affiliated',
      icon: 'home',
    }, {
      path: `${appRoot}/badminton`,
      component: Badminton.index,
      label: 'menu.Badminton',
      icon: 'home',
    }, {
      path: `${appRoot}/Banquets`,
      component: Banquets.index,
      label: 'menu.Banquets',
      icon: 'home',
    }, {
      path: `${appRoot}/billiards`,
      component: Billiards.index,
      label: 'menu.Billiards',
      icon: 'home',
    }, {
      path: `${appRoot}/Cards`,
      component: Cards.index,
      label: 'menu.Cards',
      icon: 'home',
    }, {
      path: `${appRoot}/Clubfacilities`,
      component: Clubfacilities.index,
      label: 'menu.Clubfacilities',
      icon: 'home',
    }, {
      path: `${appRoot}/Committemembers`,
      component: Committemembers.index,
      label: 'menu.Committemembers',
      icon: 'home',
    }, {
      path: `${appRoot}/Contactus`,
      component: Contactus.index,
      label: 'menu.Contactus',
      icon: 'home',
    }, {
      path: `${appRoot}/Cricket`,
      component: Cricket.index,
      label: 'menu.Cricket',
      icon: 'home',
    }, {
      path: `${appRoot}/Events`,
      component: Events.index,
      label: 'menu.Events',
      icon: 'home',
    }, {
      path: `${appRoot}/Gym`,
      component: Gym.index,
      label: 'menu.Gym',
      icon: 'home',
    }, {
      path: `${appRoot}/Hockey`,
      component: Hockey.index,
      label: 'menu.Hockey',
      icon: 'home',
    }, {
      path: `${appRoot}/Library`,
      component: Library.index,
      label: 'menu.Library',
      icon: 'home',
    }, {
      path: `${appRoot}/Otherwellness`,
      component: Otherwellness.index,
      label: 'menu.Otherwellness',
      icon: 'home',
    }, {
      path: `${appRoot}/Restaurants`,
      component: Restaurants.index,
      label: 'menu.Restaurants',
      icon: 'home',
    }, {
      path: `${appRoot}/Squash`,
      component: Squash.index,
      label: 'menu.Squash',
      icon: 'home',
    }, {
      path: `${appRoot}/Swimming`,
      component: Swimming.index,
      label: 'menu.Swimming',
      icon: 'home',
    }, {
      path: `${appRoot}/Tennis`,
      component: Tennis.index,
      label: 'menu.Tennis',
      icon: 'home',
    }, {
      path: `${appRoot}/Thechambers`,
      component: Thechambers.index,
      label: 'menu.Thechambers',
      icon: 'home',
    }, {
      path: `${appRoot}/Yoga`,
      component: Yoga.index,
      label: 'menu.Yoga',
      icon: 'home',
    }, {
      path: `${appRoot}/Yorkerbar`,
      component: Yorkerbar.index,
      label: 'menu.Yorkerbar',
      icon: 'home',
    },
	 {
      path: `${appRoot}/member`,
      // component: dashboards.index,
      label: 'menu.member',
      icon: 'home',
       subs: [
        { 
          path: '/viewStatement', label: 'menu.viewStatement', component: member.viewStatement, noLayout: true },
          {
            path: '/foodordering',
            label: 'menu.member',
           //  component: pages.authentication.index,
            subs: [
              { path: '/home', label: 'menu.login', component:member.foodordering.home, noLayout: true },
              { path: '/filters', label: 'menu.home', component: member.foodordering.filters, noLayout: true },
              { path: '/categories', label: 'menu.register', component: member.foodordering.categories, noLayout: true },
              { path: '/orders/detail/:id', label: 'menu.reset-password', component: member.foodordering.orders.detail, noLayout: true },
              { path: '/cart', label: 'menu.forgot-password', component: member.foodordering.cart, noLayout: true },
              { path: '/checkout', label: 'menu.reset-password', component: member.foodordering.checkout, noLayout: true },
              { path: '/invoice', label: 'menu.forgot-password', component: member.foodordering.invoice, noLayout: true },
              { path: '/orders/list', label: 'menu.forgot-password', component: member.foodordering.orders.list, noLayout: true },
              { path: '/barHome', label: 'menu.forgot-password', component: member.foodordering.barHome, noLayout: true },
              { path: '/barCart', label: 'menu.forgot-password', component: member.foodordering.barCart, noLayout: true },
              { path: '/barOrders/list', label: 'menu.forgot-password', component: member.foodordering.barOrders.list, noLayout: true },
	      { path: '/barOrders/detail/:id', label: 'menu.reset-password', component: member.foodordering.barOrders.detail, noLayout: true },
            ],
          },
          {
            path: '/banquet',
            label: 'menu.member',
            subs:[
              { path: '/booking', component: member.banquet.Booking, label: 'Book Banquet Hall', noLayout: true},
              { path: '/myBooking', label: 'My Banquet Bookings', component: member.banquet.List, noLayout: true },
            ]
          },
          {
          path: '/events',
          label: 'menu.member',
          subs:[
            { path: '/eventsList', component: member.events.eventsList, label: 'menu.Events', noLayout: true},
            { path: '/orders/list', component: member.events.orders.list, label: 'menu.Events', noLayout: true},
            { path: '/orders/detail/:id', label: 'menu.Events', component: member.events.orders.detail, noLayout: true },
          ]
          },
          {
            path: '/chamber',
            label: 'menu.member',
            subs:[
              { path: '/booking', component: member.chamber.Booking, label: 'Book Chambers', noLayout: true},
              { path: '/myBooking', label: 'My Chamber Bookings', component: member.chamber.List, noLayout: true },
            ]
          },
          {
            path: '/clubman',
            label: 'menu.member',
            subs:[
              { path: '/currentIssue', component: member.clubman.currentIssue, label: 'menu.currentIssue', noLayout: true},
              { path: '/archive', label: 'menu.dashboard', component: member.clubman.Archive, noLayout: true },
            ]
          },
          { path: '/feedbacks/FeedBacksList', label: 'menu.dashboard', component: member.MyFeedBacks, noLayout: true },
          { path: '/feedbacks/FeedBackDetail/:id', label: 'menu.dashboard', component: member.FeedBackDetail, noLayout: true },
        
          {
            path:'/settings',
                  label:'menu.settings',
            subs:[
             { path:'/changePassword', label: 'menu.viewStatement', component: member.changePassword, noLayout: true }, 
           ]
           },
       
      ],
    },
    {
      path: `${appRoot}/admin`,
      // component: dashboards.index,
      label: 'menu.admin',
      icon: 'home',
       subs: [
        { path: '/dashboard', label: 'menu.dashboard', component: admin.dashboard, noLayout: true },
        { path: '/member/manageMembers', label: 'menu.dashboard', component: admin.ManageMembers, noLayout: true },
        { path: '/restaurant/ManageCategory', label: 'menu.dashboard', component: admin.ManageCategory, noLayout: true },
        { path: '/restaurant/ManageSubCategory/:id', label: 'menu.dashboard', component: admin.ManageSubCategory, noLayout: true },
        { path: '/restaurant/ManageMenu', label: 'menu.dashboard', component: admin.ManageMenu, noLayout: true },
        { path: '/restaurant/ManageOrder', label: 'menu.dashboard', component: admin.ManageOrder, noLayout: true },
        { path: '/restaurant/OrderDetail/:id', label: 'menu.dashboard', component: admin.OrderDetail, noLayout: true },
        { path: '/restaurant/BarManageCategory', label: 'menu.dashboard', component: admin.BarManageCategory, noLayout: true },
        { path: '/restaurant/ManageBarSubCategory/:id', label: 'menu.dashboard', component: admin.ManageBarSubCategory, noLayout: true },
        { path: '/restaurant/BarManageMenu', label: 'menu.dashboard', component: admin.BarManageMenu, noLayout: true },
        { path: '/restaurant/BarManageOrder', label: 'menu.dashboard', component: admin.BarManageOrder, noLayout: true },
        { path: '/restaurant/BarOrderDetail/:id', label: 'menu.dashboard', component: admin.BarOrderDetail, noLayout: true },
        
        { path: '/chamber/ManageChamberOrder', label: 'menu.dashboard', component: admin.ManageChamberOrder, noLayout: true },
        { path: '/chamber/OrderDetail/:id', label: 'menu.dashboard', component: admin.ChamberOrderDetail, noLayout: true },

        { path: '/banquet/ManageBanquets', label: 'menu.dashboard', component: admin.ManageBanquets, noLayout: true },
        { path: '/banquet/ManageBanquetMenu', label: 'menu.dashboard', component: admin.ManageBanquetMenu, noLayout: true },
        { path: '/banquet/ManageBanquetMenuItem', label: 'menu.dashboard', component: admin.ManageBanquetMenuItem, noLayout: true },
        { path: '/banquet/ManageBanquetOrder', label: 'menu.dashboard', component: admin.ManageBanquetOrder, noLayout: true },
        { path: '/banquet/OrderDetail/:id', label: 'menu.dashboard', component: admin.BanquetOrderDetail, noLayout: true },
        
        { path: '/events/manageEvents', label: 'menu.dashboard', component: admin.ManageEvents, noLayout: true },
        { path: '/events/ManageCategory', label: 'menu.dashboard', component: admin.ManageEventsCategory, noLayout: true },
        { path: '/events/ManageOrder', label: 'menu.dashboard', component: admin.ManageEventsOrder, noLayout: true },
        { path: '/events/OrderDetail/:id', label: 'menu.dashboard', component: admin.EventsOrderDetail, noLayout: true },
        { path: '/feedbacks/FeedBacksList', label: 'menu.dashboard', component: admin.ManageFeedBacks, noLayout: true },
        { path: '/feedbacks/FeedBackDetail/:id', label: 'menu.dashboard', component: admin.FeedBackDetail, noLayout: true },
        { path: '/clubman/manageClubmans', label: 'menu.dashboard', component: admin.ManageClubmans, noLayout: true },
        { path: '/report/payment', label: 'menu.dashboard', component: admin.Report, noLayout: true },
        { path: '/report/event', label: 'menu.dashboard', component: admin.EventReport, noLayout: true },
        { path: '/message/managebroadcast', label: 'menu.dashboard', component: admin.ManageBroadcast, noLayout: true },
        { path: '/setting/general', label: 'menu.dashboard', component: admin.Managegeneral, noLayout: true },
        { path: '/setting/committeemember', label: 'menu.dashboard', component: admin.ManageCommitteeMember, noLayout: true },
        { path: '/setting/affiliateclub', label: 'menu.dashboard', component: admin.ManageAffiliateClub, noLayout: true },
        { path: '/setting/imageupload', label: 'menu.dashboard', component: admin.ManageImageUpload, noLayout: true },
      ],
    },
    

  ],
  adminMenuItems: [
    {
      path: `${appRoot}/admin/dashboard`,
      component: admin.dashboard,
      label: 'menu.dashboard',
      icon: 'home',
      
    },
    {
      path: `${appRoot}/admin/member`,
      // component: admin.dashboard,
      label: 'menu.member',
      icon: 'user',
      subs: [
        { path: '/manageMembers', label: 'menu.ManageMember', component: admin.ManageMembers, noLayout: true },

      ],
    },
    {
      path: `${appRoot}/admin/restaurant`,
      // component: admin.dashboard,
      label: 'menu.restaurantMaster',
      icon: 'main-course',
      subs: [
        { path: '/ManageCategory', label: 'menu.ManageCategory', component: admin.ManageCategory, noLayout: true },
        { path: '/ManageMenu', label: 'menu.ManageFoodItem', component: admin.ManageMenu, noLayout: true },
        { path: '/ManageOrder', label: 'menu.ManageFoodOrder', component: admin.ManageOrder, noLayout: true },
        { path: '/BarManageCategory', label: 'menu.BarManageCategory', component: admin.BarManageCategory, noLayout: true },
        { path: '/BarManageMenu', label: 'menu.BarManageFoodItem', component: admin.BarManageMenu, noLayout: true },
        { path: '/BarManageOrder', label: 'menu.BarManageFoodOrder', component: admin.BarManageOrder, noLayout: true },
        
        
       

      ],
    },
    {
      path: `${appRoot}/admin/banquet`,
      component: admin.dashboard,
      label: 'menu.Banquet',
      icon: 'tea',
      subs: [
        { path: '/ManageBanquets', label: 'menu.ManageBanquets', component: admin.ManageBanquets, noLayout: true },
        { path: '/ManageBanquetMenu', label: 'menu.ManageBanquetMenu', component: admin.ManageBanquetMenu, noLayout: true },
        { path: '/ManageBanquetMenuItem', label: 'menu.ManageBanquetMenuItem', component: admin.ManageBanquetMenuItem, noLayout: true },
        { path: '/ManageBanquetOrder', label: 'menu.ManageBanquetOrder', component: admin.ManageBanquetOrder, noLayout: true },
        /* { path: '/BarManageCategory', label: 'menu.BarManageCategory', component: admin.BarManageCategory, noLayout: true },
        { path: '/BarManageMenu', label: 'menu.BarManageFoodItem', component: admin.BarManageMenu, noLayout: true },
        { path: '/BarManageOrder', label: 'menu.BarManageFoodOrder', component: admin.BarManageOrder, noLayout: true },
      */
      ],
    },
    {
      path: `${appRoot}/admin/chamber`,
      component: admin.dashboard,
      label: 'menu.Chamber',
      icon: 'building-large',
      subs: [
        { path: '/ManageChamberOrder', label: 'menu.ManageOrders', component: admin.ManageChamberOrder, noLayout: true },
        // { path: '/login', label: 'menu.reservationRequest', component: admin.ManageCategory, noLayout: true },
      ],
    },
    {
      path: `${appRoot}/admin/events`,
      component: admin.dashboard,
      label: 'menu.events',
      icon: 'board-3',
      subs: [
        { path: '/manageEvents', label: 'menu.ManageEvents', component: admin.ManageEvents, noLayout: true },
        { path: '/ManageCategory', label: 'menu.ManageCategory', component: admin.ManageEventsCategory, noLayout: true },
        { path: '/ManageOrder', label: 'menu.ManageEventsOrder', component: admin.ManageEventsOrder, noLayout: true },
        
      ],
    },
    {
      path: `${appRoot}/admin/clubman`,
      component:admin.dashboard,
      label: `menu.clubman`,
      icon:'board-3',
      subs:[
        { path:'/manageClubmans', label:'menu.ManageClubmans', component:admin.ManageClubmans, noLayout:true},
      ]
    },
    {
      path: `${appRoot}/admin/feedbacks`,
      component: admin.dashboard,
      label: 'menu.feedbacks',
      icon: 'message',
      subs: [
        { path: '/FeedBacksList', label: 'menu.ManageFeedBacks', component: admin.ManageFeedBacks, noLayout: true },
       
        
      ],
    },
    {
      path: `${appRoot}/admin/report`,
      component: admin.dashboard,
      label: 'menu.report',
      icon: 'notebook-1',
      subs: [
        { path: '/payment', label: 'menu.paymentreport', component: admin.Report, noLayout: true },
        { path: '/event', label: 'menu.eventreport', component: admin.EventReport, noLayout: true },

      ],
    },
    {
      path: `${appRoot}/admin/message`,
      // component: admin.dashboard,
      label: 'menu.broadcast',
      icon: 'antenna',
      subs: [
        { path: '/managebroadcast', label: 'menu.ManageBroadcast', component: admin.ManageBroadcast, noLayout: true },

      ],
    },
    {
      path: `${appRoot}/admin/setting`,
      // component: admin.dashboard,
      label: 'menu.setting',
      icon: 'settings-1',
      subs: [
        { path: '/general', label: 'menu.general', component: admin.Managegeneral, noLayout: true },
        { path: '/CommitteeMember', label: 'menu.committeemember', component: admin.ManageCommitteeMember, noLayout: true },
        { path: '/AffiliateClub', label: 'menu.affiliateclub', component: admin.ManageAffiliateClub, noLayout: true },
        { path: '/imageupload', label: 'menu.imageupload', component: admin.ManageImageUpload, noLayout: true },

      ],
    }
  ],
  
  memberMainMenuItems: [
    { path: '/member/viewStatement', label: 'Member Dashboard', icon: 'diagram-1', hideInRoute: true },
    { path: '/member/foodordering', label: 'F&B', icon: 'diagram-2', hideInRoute: true,
  
    subs: [
      { path: '/home', label: 'F&B Food Items', icon: 'cupcake', hideInRoute: true,},
      {path: '/orders/list', label: 'F&B Orders', icon: 'note', hideInRoute: true,},
      { path: '/barHome', label: 'F&B Bar Menu', icon: 'flask', hideInRoute: true,},
      {path: '/barOrders/list', label: 'F&B Bar Orders', icon: 'note', hideInRoute: true,},
    ]
    },
    { path: '/member/chamber', label: 'The Chambers', icon: 'layout-1', hideInRoute: true, 
      subs:[
        { path: '/booking' , label: 'Book Chambers', icon: 'layout-1', hideInRoute: true },
        { path: '/myBooking' , label: 'My Chamber Bookings', icon: 'layout-1', hideInRoute: true },
      ],
  
    },
    // { path: '#', label: 'Banquets - Coming soon', icon: 'crown', hideInRoute: true },
    { path: '/member/banquet', label: 'Banquets', icon: 'crown', hideInRoute: true,
    subs:[
      { path: '/booking' , label: 'Book Banquet Hall', icon: 'layout-1', hideInRoute: true },
      { path: '/myBooking' , label: 'My Banquet Bookings', icon: 'layout-1', hideInRoute: true },
    ],
  },
    {
      path: '/member/events',
      label: 'Events',
      icon: 'birthday',
      hideInRoute: true,
       subs: [
        { path: '/eventsList', label: 'Events List',  icon: 'crown', hideInRoute: true },
        {  path: '/orders/list', label: 'My Events Booking', icon: 'birthday', hideInRoute: true   },
        
      ], 
    },
    {
      path: '#',
      label: 'Notice Board - Coming soon',
      icon: 'notification',
      hideInRoute: true,
      
    },
    {
      path: `${appRoot}/member/clubman`,
      label: 'Clubman',
      component: admin.dashboard,
      icon: 'book-open',
      subs: [
        { path: '/currentIssue', label: 'menu.currentIssue', noLayout: true },
        { path: '/archive', label: 'menu.archive',  noLayout: true },
       
        
      ],
     
    },
    {
      path: `${appRoot}/member/feedbacks`,
      component: admin.dashboard,
      label: 'menu.feedbacks',
      icon: 'message',
      subs: [
        { path: '/FeedBacksList', label: 'menu.myFeedBacks', component: member.MyFeedBacks, noLayout: true },
       
        
      ],
    },
    {
      path: '/member/settings',
       label: 'menu.settings',
       icon: 'gear',
       hideInRoute: true,
        subs: [
         { path: '/changePassword', label: 'Change Password',  icon: 'settings-2', hideInRoute: true }, 
         
         
       ], 
 
      
     }, 
     
   
  ],
};
export default routesAndMenuItems;
