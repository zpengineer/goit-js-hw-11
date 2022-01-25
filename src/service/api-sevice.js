const API_KEY = '25409295-3fe7f980d3353c85bb9c47a25'
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;

export default class ImagesApiService{
    constructor() {
        this.query = '';
        this.page = 1;
    }

    fetchImages() {
        return fetch(`${BASE_URL}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=20`)
            .then(response => {
                if (response.ok) {
                return response.json();
                }
            })
            .then(data => {
                this.page += 1;

                return data.hits;
            });
    }

    get searchQuery() {
        return this.query;
    }

    set searchQuery(newQuery) {
        this.query = newQuery;
    }

    resetPage() {
        this.page = 1;
    }
}