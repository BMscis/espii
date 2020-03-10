import {MDCTextField} from '@material/textfield';

const username = new MDCTextField(document.querySelector('.username'));
const password = new MDCTextField(document.querySelector('.password'));

import {MDCRipple} from '@material/ripple';

const cancel = new MDCRipple(document.querySelector('.cancel'));
const next = new MDCRipple(document.querySelector('.next'));

cancel.onclick = function () {console.log('gettit');};
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
}
);





