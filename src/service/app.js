import ImagesApiService from "./api-sevice";
import imageCardsTpl from "../template/image-cards.hbs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    form: document.querySelector('.search-form'),
    container: document.querySelector('.gallery'),
    btnSubmit: document.querySelector('[type="submit"]'),
    loading: document.querySelector('#loading'),
};

const imageApiService = new ImagesApiService();

refs.btnSubmit.addEventListener('click', searchImages);

async function searchImages(e) {
    e.preventDefault();

    imageApiService.searchQuery = refs.form.pixabay.value;

    const getData = await imageApiService.fetchImages();

    if (getData.hits.length === 0) {

        Notify.failure('Sorry, there are no images matching your search query. Please try again.');

    } else {

        Notify.success(`Hooray! We found ${getData.totalHits} images.`);
        
        clearGalleryContainer();
        imageApiService.resetPage();

        const markup = imageCardsTpl(getData.hits);
        galleryMarkUp(markup);

    }

    console.log(getData);
}


function galleryMarkUp(items) {

    refs.container.insertAdjacentHTML('beforeend', items);

}

function clearGalleryContainer() {
  refs.container.innerHTML = '';
}


const options = {
    rootMargin: '300px',
};

const callback = (entries) => {
    entries.forEach((entry) => {
 
        try {
            if (entry.isIntersecting && imageApiService.searchQuery !== '') {

                console.log('Hello');

                imageApiService.incrementPage();
                
                imageApiService.fetchImages().then((data) => {

                    const markup = imageCardsTpl(data.hits);
                    galleryMarkUp(markup);

                });
 
            }
        } catch {
            Notify.warning("We're sorry, but you've reached the end of search results.");
        }
    
  });
}

const imageObserver = new IntersectionObserver(callback, options);

imageObserver.observe(refs.loading);


const lightboxGallery = new SimpleLightbox('.gallery a', { 
    captions: true,
    captionSelector: 'img',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});