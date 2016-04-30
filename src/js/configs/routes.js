export default {
  index : {
    path    : '/',
    method  : 'get',
    page    : 'index',
    title   : 'Index',
    handler : require('../pages/IndexPage')
  },
  about : {
    path    : '/about',
    method  : 'get',
    page    : 'about',
    title   : 'About',
    handler : require('../components/About')
  }
};
