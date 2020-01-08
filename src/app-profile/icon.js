import icon from '../img/logo_icon.png';

export default () => {
    const logo_icon = document.getElementsByName('icon');
    logo_icon[0].setAttribute('href',icon);
}

