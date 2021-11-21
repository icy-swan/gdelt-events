export default [
  {
    path: '/home',
    name: '主页',
    exact: true,
    component: () => import('./pages/Home')
  },
  {
    path: '/bubbleView',
    name: 'demoPage1',
    exact: true,
    component: () => import('./pages/BubbleView')
  }
]
