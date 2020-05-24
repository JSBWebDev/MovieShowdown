const createAutoComplete = ({ root, onOptionSelect }) => {
	root.innerHTML = `
		<label for="input">Search</label>
		<input name="input" class="input" type="text">
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
		</div>
    `;
	const input = root.querySelector('input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

	input.focus();
	const onInput = async (e) => {
		const movies = await fetchData(e.target.value);
		if (!movies.length) {
			resultsWrapper.innerHTML = '';
			dropdown.classList.remove('is-active');
			return;
		}
		document.querySelector('.tutorial').classList.add('is-hidden');
		dropdown.classList.add('is-active');
		resultsWrapper.innerHTML = '';
		for (let movie of movies) {
			const imgSrc = movie.Poster !== 'N/A' ? movie.Poster : '';
			const option = document.createElement('a');
			option.classList.add('dropdown-item');
			option.innerHTML = `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
            `;
			option.addEventListener('click', () => {
				input.value = movie.Title;
				dropdown.classList.remove('is-active');
				onOptionSelect(movie);
			});
			resultsWrapper.appendChild(option);
		}
	};

	input.addEventListener('input', debounce(onInput, 500));
	document.addEventListener('click', (e) => {
		if (!root.contains(e.target)) {
			dropdown.classList.remove('is-active');
		}
	});
};
