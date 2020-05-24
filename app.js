const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'daf5b6e1',
			s: searchTerm
		}
	});
	if (response.data.Error) {
		return [];
	}
	return response.data.Search;
};

createAutoComplete({
	root: document.querySelector('#autocomplete-left'),
	onOptionSelect(movie) {
		onMovieSelect(movie, document.querySelector('#summary-left'));
	}
});

createAutoComplete({
	root: document.querySelector('#autocomplete-right'),
	onOptionSelect(movie) {
		onMovieSelect(movie, document.querySelector('#summary-right'));
	}
});

const onMovieSelect = async (movie, summaryElement) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'daf5b6e1',
			i: movie.imdbID
		}
	});
	const summary = summaryElement;
	summary.innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
	return `
		<article class="media">
			<figure class="media-left">
				<img src="${movieDetail.Poster}" alt="">
			</figure>
			<div class="media-content">
				<div class="content">
					<h1 class="title">${movieDetail.Title}</h1>
					<p class="subtitle">${movieDetail.Year}</p>
					<p class="subtitle plot">${movieDetail.Plot}</p>
				</div>
			</div>
		</article>
		<div class="notification is-primary">
			<h1 class="title">${movieDetail.Awards}</h1>
			<p class="subtitle">Awards</p>
		</div>
		<div class="notification is-primary">
			<h1 class="title">${movieDetail.Metascore}</h1>
			<p class="subtitle">Metascore</p>
		</div>
		<div class="notification is-primary">
			<h1 class="title">${movieDetail.imdbRating}</h1>
			<p class="subtitle">IMDB Rating</p>
		</div>
		<div class="notification is-primary">
			<h1 class="title">${movieDetail.imdbVotes}</h1>
			<p class="subtitle">IMDB Votes</p>
		</div>
	`;
};
