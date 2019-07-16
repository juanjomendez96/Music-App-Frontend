import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import ElSearchTablePagination from 'el-table-pagination';

import Highcharts from 'highcharts';

import HighchartsVue from 'highcharts-vue';
import drilldown from 'highcharts/modules/drilldown';

drilldown(Highcharts);

Vue.use(ElSearchTablePagination);
Vue.use(HighchartsVue);
Vue.use(ElementUI);

// This is for the language of el-search-table-pagination
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
