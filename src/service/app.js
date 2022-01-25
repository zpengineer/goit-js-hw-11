import ImagesApiService from "./api-sevice";
import imageCardsTpl from "../template/image-cards.hbs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    form: document.querySelector('.search-form'),
    container: document.querySelector('.gallery'),
    btnSubmit: document.querySelector('[type="submit"]'),
    btnLoadMore: document.querySelector('[data-action="load-more"]'),
};

const imageApiService = new ImagesApiService();

refs.btnSubmit.addEventListener('click', searchImages);
refs.btnLoadMore.addEventListener('click', loadMoreImages);


function searchImages(e) {
    e.preventDefault();

    imageApiService.searchQuery = refs.form.pixabay.value;
    imageApiService.resetPage();
    imageApiService.fetchImages()
        .then(hits => {
            const markup = imageCardsTpl(hits);
            galleryMarkUp(markup);
        })
        .catch(Notify.failure('Sorry, there are no images matching your search query. Please try again.'));

}

function loadMoreImages() {

    imageApiService.fetchImages()
        .then(hits => {
            const markup = imageCardsTpl(hits);
            galleryMarkUp(markup);
        });

}

function galleryMarkUp(items) {

    refs.container.insertAdjacentHTML('beforeend', items);

}


