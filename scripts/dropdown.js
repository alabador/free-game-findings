import { filter, slideIn, slideTiming } from "./main.js";


export function createOptions(array) { 
    for(let i = 0; i < array.length; i++) {
        let opt = document.createElement('option');
        opt.textContent = array[i];
        opt.value = array[i];
        filter.appendChild(opt);
    }
}

export function changeResults(option) {
    document.querySelectorAll('.card-title').forEach((title, index) => {
        title.parentNode.parentNode.classList.add('hidden');
        if (title.textContent.includes(option)){
            title.parentNode.parentNode.classList.toggle('hidden');

            title.parentElement.parentElement.animate(slideIn, slideTiming);
        }
    })
}