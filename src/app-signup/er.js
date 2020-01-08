import {MDCRipple} from '@material/ripple';
import {MDCTextField} from '@material/textfield';
const Username = new MDCTextField(document.querySelector('.businessname'));
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

