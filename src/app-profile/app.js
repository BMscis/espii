import _ from 'lodash';

if ('serviceWorker' in navigator === false) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
} else {
  console.log('no service worker detected.')
}
//sidebar drawer
import {MDCDrawer} from "@material/drawer";
import {MDCList} from '@material/list';
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

//topbarapp
import {MDCTopAppBar} from "@material/top-app-bar";
const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

//logo popup
const app = document.getElementById('main_app');
const signup_pop = document.getElementById("signup");
signup_pop.addEventListener("click", e => {
  const pop = document.getElementById('pop');
  
  pop.style.transition = 'visibility 0s ease-in-out, opacity 0.5s ease-in-out';  
  pop.style.visibility = 'visible'
  app.style.opacity = '0.7';
  pop.style.opacity = '0.8';
});

//cancel
//cancel
const main_content = document.getElementById('main-content');
main_content.onclick = function (){
  pop.style.transition = 'visibility 0s ease-in-out, opacity 0.5s ease-in-out';  
    pop.style.visibility = 'hidden';
    app.style.opacity = '1';
    pop.style.opacity = '0';
  };


//Icon/LOGO
window.addEventListener('load', e => {
  if('load'){
    import(/*webpackChunckName: 'icon' */ './icon').then(module => {
      const icon = module.default;
      icon();  
    });
    import(/*webpackChunckName: 'print' */ './logo').then(module => {
      const logo = module.default;
      logo();    
    });
  };
});

//mdc button
import {MDCRipple} from '@material/ripple';
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});

//tab bar
import {MDCTabBar} from '@material/tab-bar';
import { MDCTextFieldHelperText } from "@material/textfield";
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));







