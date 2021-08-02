"use strict";

import images from "./gallery-items.js";

// console.log(gallery);
console.log(createGalleryMarkup(images));

function createGalleryMarkup(images) {
    return images.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
  
   <div class="gallery__link"
    href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"/></div>
  
</li>`
    }
    ).join("");    
}; 

const gallery = document.querySelector('.js-gallery');
gallery.insertAdjacentHTML("afterbegin", createGalleryMarkup(images));

gallery.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
    if (!event.target.classList.contains('gallery__image')) {
        return;
    };
    // console.log(event.target);
    openModal(event);
    }

const modal = document.querySelector('.js-lightbox');
console.log(modal);

const imageEl = document.querySelector('.lightbox__image');

function openModal(event) {
    window.addEventListener('keydown', escButtonClick);
    modal.classList.add('is-open');
    imageEl.src = event.target.dataset.source;
    imageEl.alt = event.target.alt;
};

function closeModal() {
    window.removeEventListener('keydown', escButtonClick);
    modal.classList.remove('is-open');
    imageEl.src = '';
    imageEl.alt = '';
}

const closeModalButton = document.querySelector('.lightbox button[data-action="close-lightbox"]');
closeModalButton.addEventListener('click', closeModal);

// const closeModalByOverlayClick = document.querySelector('.lightbox__overlay')
// closeModalByOverlayClick.addEventListener('click', closeModal)

const overlayArea = document.querySelector('.lightbox__overlay');
overlayArea.addEventListener('click', closeModal);

function escButtonClick(event) {
    if (event.code === 'Escape') {
        closeModal();
    } 
}

