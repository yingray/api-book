import api from './book';

const text = document.querySelector('.mdl-card__supporting-text');

window.testApi = function() {
    api.intro('', '', '')
        .then(response => {
            text.innerHTML = JSON.stringify(response);
        })
        .catch(error => {
            console.log(error);
            text.innerHTML = 'Oh, no!';
        })
}
