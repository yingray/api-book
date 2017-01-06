import api from './api/hello';

const text = document.querySelector('.mdl-card__supporting-text');

window.testApi = function() {
    api.intro('', '', '')
        .then(response => {
            console.log(response);
            text.innerHTML = JSON.stringify(response);
        })
        .catch(error => {
            console.log(error);
            text.innerHTML = 'Oh, no!';
        })
}
