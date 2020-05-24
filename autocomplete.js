const createAutoComplete = ({ root, onOptionSelect, renderOption, inputValue }) => {
	root.innerHTML = `
		<label for="input"><b>Search</b></label>
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

	const onInput = async (e) => {
		const items = await fetchData(e.target.value);

		if (!items.length) {
			resultsWrapper.innerHTML = '';
			dropdown.classList.remove('is-active');
			return;
		}

		document.querySelector('.tutorial').classList.add('is-hidden');
		dropdown.classList.add('is-active');
		resultsWrapper.innerHTML = '';

		for (let item of items) {
			const option = document.createElement('a');
			option.classList.add('dropdown-item');
			option.innerHTML = renderOption(item);
			option.addEventListener('click', () => {
				input.value = inputValue(item);
				dropdown.classList.remove('is-active');
				onOptionSelect(item);
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
