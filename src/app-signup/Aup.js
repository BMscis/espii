import {MDCTextField} from '@material/textfield';

const email = new MDCTextField(document.querySelector('.Aemail'));
const phonenumber = new MDCTextField(document.querySelector('.Aphonenumber'));
const password = new MDCTextField(document.querySelector('.Apassword'));


import {MDCRipple} from '@material/ripple';

const cancel = new MDCRipple(document.querySelector('.cancel'));
const next = new MDCRipple(document.querySelector('.next'));


//Icon/LOGO
window.addEventListener('load', e => {
  if('load'){
    import(/*webpackChunckName: 'icon' */ '../app-profile/icon').then(module => {
      const icon = module.default;
      icon();  
    });
    import(/*webpackChunckName: 'print' */ '../app-profile/logo').then(module => {
      const logo = module.default;
      logo();    
    });
  };
});
