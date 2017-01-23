import api from './book';

import './progressBar';

const text = document.querySelector('.mdl-card__supporting-text');

window.testApi = function() {

    const request = {
        path: {
            testId: ''
        },
        header: {
            clientId: 'qwejfeqWEFGOWGKdlkasdjfasd'
        }
    };

    api.intro(request)
        .then(response => {
            text.innerHTML = JSON.stringify(response);
        })
        .catch(error => {
            console.log(error);
            text.innerHTML = 'Oh, no!';
        })
}