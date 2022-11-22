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
  const url = `https://www.reddit.com/r/FreeGameFindings/.json`;
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        data.data.children.forEach((child, index) => {
            if(child.data.stickied !== true && child.data.link_flair_css_class !== "Expired"){
                setTimeout(() => {
                    buildCard(child.data.title, child.data.created, "https://www.reddit.com/" + child.data.permalink, child.data.url);
                }, 100 * index)
                uniqueArray.push(child.data.title.substring(0, child.data.title.indexOf(']') + 1));
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


function buildCard(title, time, permalink, salelink) {
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
    card.classList.add('other');
  }
  
  cardDetails.appendChild(saleTitle);

  const saleTime = document.createElement('p');
  saleTime.classList.add('card-time');
//   const dateTime = new Date(time * 1000)
  let dateTime = new Date() - new Date(time * 1000);
  dateTime = Math.round((dateTime/1000)/(60*60))
  saleTime.textContent = "Created " + dateTime + " hours ago";
  cardDetails.appendChild(saleTime);

  const permaLink = document.createElement('a');
  permaLink.classList.add('card-link');
  permaLink.setAttribute('href', permalink)
  permaLink.setAttribute('target', "_blank")
  permaLink.textContent = "Comments";
  const saleLink = document.createElement('a');
  saleLink.classList.add('card-link');
  saleLink.setAttribute('href', salelink)
  saleLink.setAttribute('target', "_blank")
  saleLink.textContent = "Direct Link";
  
  links.appendChild(permaLink);
  links.appendChild(saleLink);
  cardDetails.appendChild(links);
  
  results.appendChild(card).animate(slideIn, slideTiming);
}

export const slideIn = [
    { transform: 'translateX(-100vw)' },
    { transform: 'translateX(0)'}
]

export const slideTiming = {
    duration: 700,
    easing: 'ease-in-out',
}