const submitButton = document.querySelector('form > button');
const resultEl = document.getElementById('result');

function shortenURL (e) {
	e.preventDefault();

	const url = document.querySelector('form > input').value;

	fetch('/shorten-url', {
		method: 'POST',
		body: JSON.stringify({
			url,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(async (res) => {
		if (res.status === 200) {
			const { result } = await res.json();

			resultEl.innerHTML = `
				Your shortened URL: 
				<a href="${result}" target="_blank" class="text-teal-500 underline">${result}</a>
			`;	
		} else {
			resultEl.innerHTML = `Invalid url, try adding "https://"`;
		}
	});
}

submitButton.addEventListener('click', shortenURL);
