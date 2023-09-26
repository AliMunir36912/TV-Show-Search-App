const form = document.querySelector('form');

const searchButton = document.querySelector("#search")
const searchName = document.querySelector('#searchName')

const movieList = document.querySelector('#movieList');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const getMoviesData = async () => {
        const config = { headers: { Accept: 'application/json' } }
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchName.value}`, config);
        const imgLinks = []

        for (let showData of res.data) {
            imgLinks.push(showData.show.image.medium)
        }
        return imgLinks;
    }
    const getMoviesImages = async () => {
        await removeMoviesList();
        imageArray = await getMoviesData();
        for (let img of imageArray) {
            const image = document.createElement('img');
            image.src = img
            console.log(image.src)
            const newLi = document.createElement('li');
            newLi.appendChild(image);
            newLi.classList.add("list-group-item");
            movieList.appendChild(newLi);
        }
    }

    const removeMoviesList = async () => {
        while (movieList.firstChild) {
            movieList.removeChild(movieList.firstChild);
        }
    }
    getMoviesImages();

})