const axios = require('axios');
const API_KEY = '25409295-3fe7f980d3353c85bb9c47a25'
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;

export default class ImagesApiService{
    constructor() {
        this.query = '';
        this.page = 1;
    }

    async fetchImages() {

        const response = await axios.get(`${BASE_URL}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
        const data = await response.data;

        return data;
    }

    get searchQuery() {
        return this.query;
    }

    set searchQuery(newQuery) {
        this.query = newQuery;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}