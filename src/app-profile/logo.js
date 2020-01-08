import logo from '../img/espii_logo.png';

export default () => {
    const espii_logo = document.getElementsByClassName('espii-logo');
    espii_logo[0].setAttribute('src',logo);
}

