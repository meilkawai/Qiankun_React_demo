import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/login/login' },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      'target': 'http://localhost:8080',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' }
    }
  }
});
