import api from './book';

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


var origOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function() {
    console.log('request started!');
    this.addEventListener('load', function() {
        console.log('request completed!');
        console.log(this.readyState); //will always be 4 (ajax is completed successfully)
        // console.log(this.responseText); //whatever the response was
    });
    origOpen.apply(this, arguments);
};