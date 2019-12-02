import logo from '../img/espii_logo.png';

export default () => {
    const espii = document.getElementsByClassName('espii-logo');
    espii[0].setAttribute('src',logo);
}

