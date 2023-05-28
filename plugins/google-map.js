import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps"; // Import package
Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyDbAH7XhZHNRbh-hKFxob9RFkeDxAAgisE",
        libraries: "places",
    },
});