document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = '17038614-f96000dc79081ca876dadcf64';
  const form = document.getElementById('search-form');
  const loader = document.getElementById('loader');
  const list = document.getElementById('list');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    list.innerHTML = '<li style="display: none"></li>';

    getImages(value);
    addInfinityScroll(value);
  });

  async function getImages(value) {
    loader.classList.remove('hide');

    const API = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(value)}&image_type=photo`;

    const response = await fetch(API);
    const result = await response.json();

    const images = result.hits.map((el) => {
      return {
        smallImageURL: el.webformatURL,
        largeImageURL: el.largeImageURL,
        alt: el.tags.split(', ')[0]
      }
    });

    const imagesList = images.map((img) => {
      return `
        <li style="list-style: none; text-align: center">
  
            <img
            src="${img.smallImageURL}"
            data-source="${img.largeImageURL}"
            alt="${img.alt}"
            onclick="showLargeImage('${img.largeImageURL}')"
            />
      
        </li>
      `;
    });
    loader.classList.add('hide');
    for (let i = 0; i < imagesList.length; i++) {
      list.insertAdjacentHTML('beforeend', imagesList[i]);
    }
  }

  function addInfinityScroll(value) {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          getImages(value)
        }
        observer.unobserve(entry.target)
        observer.observe(document.querySelector('li:last-child'))
      })
    }, {
      threshold: 1
    })
    observer.observe(document.querySelector('li'))
  }
});

function showLargeImage(link) {
  basicLightbox.create(`
		<img width="1400" height="900" src="${link}">
	`).show()
}
