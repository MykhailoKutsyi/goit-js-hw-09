// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryItems);

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const imagesGallery = document.querySelector('.gallery');

function createImagesGalleryMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <div>
            <a class="gallery__item" href="${original}">
                <img 
                    class="gallery__image" 
                    src="${preview}" 
                    alt="${description}" 
                />
            </a>
        </div>`
    }).join('');
};

const galleryMarkup = createImagesGalleryMarkup(galleryItems);

imagesGallery.insertAdjacentHTML('beforeend', galleryMarkup);

let gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});  