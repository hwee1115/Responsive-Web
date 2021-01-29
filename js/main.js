const backToTop = document.getElementById('backtotop');

function checkScroll(){
    let pageOffset = window.pageYOffset;

    if(pageOffset !== 0){
        backToTop.classList.add('show')
    }else{
        backToTop.classList.remove('show')
    }
}

function moveBackToTop(){
    if(window.pageYOffset>0){
        window.scrollTo({top:0,behavior:'smooth'})
    }
}

window.addEventListener('scroll',checkScroll)
backToTop.addEventListener('click',moveBackToTop)

function transforNext(event){
    console.log('hi')
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;

    // ul 태그선택
    const classList = slideNext.parentElement.parentElement.nextElementSibling
    let activeLi = classList.getAttribute('data-position')
    const liList = classList.getElementsByTagName('li');

    if(Number(activeLi)<0){
        activeLi = Number(activeLi) + 260;
        slidePrev.style.color ='#2f3059';
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click', transforPrev);

        if(Number(activeLi)===0){
            slideNext.style.color='#cfd8dc';
            slideNext.classList.remove('slide-next-hover')
            slideNext.removeEventListener('click',transforNext)
        }

    }
    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);
}

function transforPrev(event){
    const slidePrev = event.target;
    const slideNext = slidePrev.nextElementSibling;

    // ul 태그선택
    const classList = slidePrev.parentElement.parentElement.nextElementSibling
    let activeLi = classList.getAttribute('data-position')
    const liList = classList.getElementsByTagName('li');

    if(classList.clientWidth <(liList.length*260 + Number(activeLi))){
        activeLi = Number(activeLi) -260;

        if(classList.clientWidth>(liList.length*260 + Number(activeLi))){
            slidePrev.style.color='#cfd8dc';
            slidePrev.classList.remove('slide-prev-hover')
            slidePrev.removeEventListener('click',transforPrev)
        }
        slideNext.style.color ='#2f3059';
        slideNext.classList.add('slide-next-hover');
        slideNext.addEventListener('click', transforNext);
    }
    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);
}


const slidePrevList = document.getElementsByClassName('slide-prev');

for(let i=0; i<slidePrevList.length; i++){
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
    let liList = classList.getElementsByTagName('li');

    if(classList.clientWidth < (liList.length*260)){
        slidePrevList[i].classList.add('slide-prev-hover')
        slidePrevList[i].addEventListener('click', transforPrev)
    }else{
        const arrowContainer = slidePrevList[i].parentElement;
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);
        arrowContainer.removeChild(slidePrevList[i])
    }
}
