var el = document.querySelectorAll('.icon-bar a');


el.onmouseover = function () {
    if (el.className === ''){
    el.className = 'active';
    } else {
    el.className = ''; }
    }

el.onmouseout = function () {
    if (el.className === 'active'){
        el.className = '';
        } else {
        el.className = ''; }
}

var ims = document.getElementsByClassName('figure')[0];
ims.addEventListener('fullscreenchange', function () {
    ims.clientWidth = 400;
})
    
    
/*
el[1].onmouseover = function () {
    if (el.className === 'active'){
    el.className = 'inactive';
    } else {
    el.className = 'active'; }
    }

el[2].onmousemove = function () {
    if (el.className === 'active'){
    el.className = 'inactive';
    } else {
    el.className = 'active'; }
    }

el[3].onmouseover = function () {
    if (el.className === 'active'){
    el.className = 'inactive';
    } else {
    el.className = 'active'; }
    } */