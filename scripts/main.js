import { changeResults, createOptions } from "./dropdown.js";

const results = document.querySelector('.results-container');
export const filter = document.getElementById('filter');
export let uniqueArray = [];

document.querySelector('button').addEventListener('click', () => {
    getFetch();
    document.querySelector('button').classList.add('hidden');
})
filter.addEventListener('change', function() {
    changeResults(filter.value);
});

function getFetch(){
  // const choice = document.querySelector('input').value
  // console.log(choice)
  const url = `https://www.reddit.com/r/FreeGameFindings/.json`;
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        data.data.children.forEach((child, index) => {
            if(child.data.stickied !== true && child.data.link_flair_css_class !== "Expired"){
                setTimeout(() => {
                    buildCard(child.data.title, "https://www.reddit.com/" + child.data.permalink, child.data.url);
                    uniqueArray.push(child.data.title.substring(0, child.data.title.indexOf(']') + 1))
                }, 100 * index)
            }
        });
        uniqueArray = [...new Set(uniqueArray)];
        createOptions(uniqueArray);
        document.querySelector('main').classList.add('background-gradient')
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


function buildCard(title, permalink, salelink) {
  const card = document.createElement('div');
  card.classList.add('mini-card');

  const cardDetails = document.createElement('div');
  cardDetails.classList.add('mini-card-text');
  card.appendChild(cardDetails);

  const links = document.createElement('div');
  links.classList.add('links');

  const saleTitle = document.createElement('p');
  saleTitle.classList.add('card-title');
  saleTitle.textContent = title;
  
  if (title.includes('[Steam]')) {
    card.classList.add('steam')
  }
  else if (title.includes('[Epic]')) {
    card.classList.add('epic');
  }
  else {
    console.log('failed');
  }
  
  cardDetails.appendChild(saleTitle);

  const permaLink = document.createElement('a');
  permaLink.classList.add('card-link');
  permaLink.setAttribute('href', permalink)
  permaLink.textContent = "Comments";
  const saleLink = document.createElement('a');
  saleLink.classList.add('card-link');
  saleLink.setAttribute('href', salelink)
  saleLink.textContent = "Direct Link";
  
  links.appendChild(permaLink);
  links.appendChild(saleLink);
  cardDetails.appendChild(links);
  
  results.appendChild(card).animate(slideIn, slideTiming);
}

const slideIn = [
    { transform: 'translateX(-100vw)' },
    { transform: 'translateX(0)'}
]

const slideTiming = {
    duration: 700,
    easing: 'ease-in-out',
}

// function slideIn() {
//     document.querySelectorAll('mini-card').forEach(card => {
//         card.classList.remove('mini-card-slide')
//     })
// }