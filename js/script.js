const body = document.querySelector('body');
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
const caption = document.createElement('p');
caption.classList.add('lightbox__caption');
const lightboxNav = document.createElement('div');
lightboxNav.classList.add('lightbox__nav');
const prev = document.createElement('button');
const next = document.createElement('button');
prev.classList.add('lightbox__prev-btn');
next.classList.add('lightbox__next-btn');
const closeBtn = document.createElement('a');
closeBtn.classList.add('lightbox__close-btn')
const lightboxLoader = document.createElement('div');
lightboxLoader.classList.add('lightbox__loader');
const lightboxContainer = document.createElement('div');
lightboxContainer.classList.add('lightbox__container');
const counter = document.createElement('div');
counter.classList.add('lightbox__counter');

const images = document.querySelectorAll('.gallery .gallery__image');
const imagesLink = document.querySelectorAll('.gallery .gallery__link');
let lightboxImage;
let imageUrl;
let current;
let closedState = true;

document.body.appendChild(lightbox);
lightbox.appendChild(caption);
lightbox.appendChild(lightboxNav);
lightboxNav.appendChild(prev);
lightboxNav.appendChild(next);
// closeBtn.textContent = 'x'
// prev.textContent = '<'
// next.textContent = '>'
lightbox.appendChild(closeBtn);
lightbox.appendChild(lightboxLoader);
lightbox.appendChild(lightboxContainer);
lightbox.appendChild(counter);


imagesLink.forEach( (image,index) => {
  image.addEventListener('click', event => {
    event.preventDefault();

    closedState = false;

    lightbox.classList.add('open');


    showImage(index);
    showCaption(index);

    lightboxImage.addEventListener('click', event => {
      event.stopPropagation();
    });
    caption.addEventListener('click', event => {
      event.stopPropagation();
    });
  });
});

events();

function showImage(index){
  current = index;
  imageUrl = imagesLink[index].getAttribute('href');
  lightboxContainer.innerHTML = `<img src="${imageUrl}" class="lightbox__image" alt="">`;

  lightboxImage = document.querySelector('.lightbox__image');
  loader();
  body.classList.add('noscroll');

  disabledArrow();
  counter.innerText = `${current + 1} / ${images.length}`;
}
function loader() {
  lightboxLoader.style.visibility = "visible";

  lightboxImage.addEventListener('load', () => {
    lightboxLoader.style.visibility = "hidden";
  });
}
function closeLightbox(){
  closedState = true;
  body.classList.remove('noscroll');
  lightbox.classList.remove('open');
}
function nextImage(event){
  event.stopPropagation();
  if( current < imagesLink.length - 1 ){
    showImage(current + 1);
    showCaption(current);
  }
}
function prevImage(event){
  event.stopPropagation();
  if( current > 0 ){
    showImage(current - 1);
    showCaption(current);
  }
}
function disabledArrow(){
  if( current === 0 ){
    prev.classList.add('disabled');
  } else if ( current === imagesLink.length - 1 ){
    next.classList.add('disabled');
  } else {
    prev.classList.remove('disabled');
    next.classList.remove('disabled');
  }

}
function showCaption(index){
  let textCaption = images[index].getAttribute('alt');
  if( textCaption ){
    caption.innerText = textCaption;
  }

}
function events(){
  closeBtn.addEventListener('click',closeLightbox(event),false);
  lightbox.addEventListener('click',closeLightbox,false);
  next.addEventListener('click',nextImage,false);
  prev.addEventListener('click',prevImage,false);

  document.addEventListener('keyup', event => {
    if ( event.keyCode === 27 ) closeLightbox();
  });
  document.addEventListener('keyup', event => {
    if ( event.keyCode === 37 ) prevImage(event);
  });
  document.addEventListener('keyup', event => {
    if ( event.keyCode === 39 ) nextImage(event);
  });
}
