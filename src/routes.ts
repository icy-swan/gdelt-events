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
  }
]
