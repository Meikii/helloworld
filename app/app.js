import Vue from 'nativescript-vue';
import localStorage from 'nativescript-localstorage';
import MainMenu from './components/MainMenu';
import test from './components/test';
import { Fontawesome } from 'nativescript-fontawesome';
import RadListView from 'nativescript-ui-listview/vue'
// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

Vue.registerElement(
    'CardView',
    () => require('@nstudio/nativescript-cardview').CardView
);
// Vue.registerElement(
//     'RadListView',
//     () => require('nativescript-ui-listview').RadListView
// );
Vue.registerElement(
    'CheckBox',
    () => require('@nstudio/nativescript-checkbox').CheckBox, {
        model: {
            prop: 'checked',
            event: 'checkedChange'
        }
    }
);

Vue.use(RadListView);

localStorage.setItemObject('questionnaire', { test: '123' })
Fontawesome.init();
new Vue({

    template: `
        <Frame>
            <MainMenu />
        </Frame>`,

    components: {
        test,
        MainMenu
    }
}).$start();