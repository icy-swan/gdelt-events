export default [
  {
    path: '/bubbleView',
    name: 'demoPage1',
    exact: true,
    component: () => import('./pages/BubbleView')
  },
  {
    path: '/treeMapView',
    name: 'demoPage1',
    exact: true,
    component: () => import('./pages/TreeMapView')
  },
  {
    path: '/stackLineView',
    name: 'demoPage1',
    exact: true,
    component: () => import('./pages/StackLineView')
  },
  {
    path: '/stackBarView',
    name: 'demoPage1',
    exact: true,
    component: () => import('./pages/StackBarView')
  },
  {
    path: '/stackLineBarView',
    name: 'demoPage1',
    exact: true,
    component: () => import('./pages/StackLineBarView')
  },
  {
    path: '/roseView',
    name: 'demoPage1',
    exact: true,
    component: () => import('./pages/RoseView')
  },
  {
    path: '/barView',
    name: 'demoPage1',
    exact: true,
    component: () => import('./pages/BarView')
  },
  {
    path: '/lineView',
    name: 'demoPage1',
    exact: true,
    component: () => import('./pages/LineView')
  },
]
