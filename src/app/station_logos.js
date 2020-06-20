import capital from '../img/capital_fm_logo_2.png';
import classic from '../img/classic_105_logo.png';
import hbr from '../img/hbr_logo.png';
import hope from '../img/hope_fm_logo.jpg';
import kiss from '../img/KISS_fm_logo.png';

export default () => {
    const capital_logo = document.getElementsByClassName('capital-logo');
    capital_logo[0].setAttribute('src',capital);
    const classic_logo = document.getElementsByClassName('classic-logo');
    classic_logo[0].setAttribute('src',classic);
    const hbr_logo = document.getElementsByClassName('hbr-logo');
    hbr_logo[0].setAttribute('src',hbr);
    const hope_logo = document.getElementsByClassName('hope-logo');
    hope_logo[0].setAttribute('src',hope);
    const kiss_logo = document.getElementsByClassName('kiss-logo');
    kiss_logo[0].setAttribute('src',kiss);

}