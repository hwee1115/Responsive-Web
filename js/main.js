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


let touchstartX;
let currentClassList;
let currentImg;
let currentActiveLi;
let nowActiveLi;
let mouseStart;


function processTouchStart(event){
    mouseStart=true;
    event.preventDefault();
    touchstartX = event.clientX || event.touches[0].screenX;    //event.touches[0].screenX(모바일)
    currentImg= event.target;

    currentImg.addEventListener('mousemove', processTouchMove);
    currentImg.addEventListener('mouseup', processTouchEnd)

    //모바일
    currentImg.addEventListener('touchmove', processTouchMove);
    currentImg.addEventListener('touchend', processTouchEnd);

    currentClassList = currentImg.parentElement.parentElement;
    currentActiveLi = currentClassList.getAttribute('data-position')
    console.log(currentActiveLi)
}

function processTouchMove(event){
    event.preventDefault()

    let currentX = event.clientX || event.touches[0].screenX;
    nowActiveLi = Number(currentActiveLi) + (Number(currentX)-Number(touchstartX))
    currentClassList.style.transition = 'transform 0s linear'
    currentClassList.style.transform = 'translateX(' + String(nowActiveLi) + 'px)';
}

function processTouchEnd(event){
    event.preventDefault();

    if(mouseStart===true){
        currentImg.removeEventListener('mousemove', processTouchMove);        
        currentImg.removeEventListener('mouseup', processTouchEnd);  

        currentImg.removeEventListener('touchmove', processTouchMove);        
        currentImg.removeEventListener('touchend', processTouchEnd);

         // 맨 처음 카드가 맨 앞에 배치된 상태로 화살표 버튼도 초기 상태로 변경
        currentClassList.style.transition = 'transform 1s ease';
        currentClassList.style.transform = 'translateX(0px)';
        currentClassList.setAttribute('data-position', 0);

        //화살표 변경
        let eachSlidePrev = currentClassList.previousElementSibling.children[1].children[0];
        let eachSlideNext = currentClassList.previousElementSibling.children[1].children[1];
        let eachLiList = currentClassList.getElementsByTagName('li')
        
        if(currentClassList.clientWidth < (eachLiList.length*260)){
            eachSlidePrev.style.color = '#2f3059';
            eachSlidePrev.classList.add('slide-prev-hover');
            eachSlidePrev.addEventListener('click', transforPrev)

            eachSlideNext.style.color = '#cfd8dc';
            eachSlideNext.classList.remove('slide-next-hover')
            eachSlideNext.removeEventListener('click',transforNext);
        }
    }
}



window.addEventListener('dragend', processTouchEnd);
window.addEventListener('mouseup', processTouchEnd);

const classImgLists = document.querySelectorAll('ul li img');
for(let i =0; i<classImgLists.length; i++){
    classImgLists[i].addEventListener('mousedown', processTouchStart);
    classImgLists[i].addEventListener('touchStart',processTouchStart); // 모바일설정
}
