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

//login popup
const app = document.getElementById('main_app');
const pop = document.getElementById('pop');
const signup_pop = document.getElementById("signup");
signup_pop.onclick = function () {
  pop.style.transition = 'visibility 0s ease-in-out, opacity 0.5s ease-in-out';  
  pop.style.visibility = 'visible'
  app.style.opacity = '0.4';
  pop.style.opacity = '0.8';
};

//cancel
//cancel
cancel.onclick = function (){
  pop.style.transition = 'visibility 0s ease-in-out, opacity 0.5s ease-in-out';  
    pop.style.visibility = 'hidden';
    app.style.opacity = '1';
    pop.style.opacity = '0';
    
  };

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







