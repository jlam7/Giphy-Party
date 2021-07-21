console.log("Let's get this party started!");

const form = document.querySelector('form');
const input = document.querySelector('#input');
const results = document.querySelector('#results');
const removeBtn = document.querySelector('#removeBtn');
const searchTermCount = {};

form.addEventListener('submit', function(e) {
	e.preventDefault();
	if (searchTermCount[input.value]) {
		searchTermCount[input.value]++;
	} else {
		searchTermCount[input.value] = 1;
	}

	getGif();
});

removeBtn.addEventListener('click', function() {
	results.innerHTML = '';
	input.value = '';
});

async function getGif() {
	const res = await axios.get(
		`http://api.giphy.com/v1/gifs/search?q=${input.value}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`
	);
	const num = searchTermCount[input.value];
	const { data } = res.data;
	const { images } = data[num];

	const img = document.createElement('img');
	img.setAttribute('src', `${images.original.url}`);
	img.classList.add('img');

	results.append(img);
}
