const progressBar = document.querySelector('#p3');

const origOpen = XMLHttpRequest.prototype.open;

XMLHttpRequest.prototype.open = function() {

    console.log('request started!');

    this.addEventListener('load', function() {
        console.log('request completed!');
        console.log(this.readyState); //will always be 4 (ajax is completed successfully)
        // console.log(this.responseText); //whatever the response was
    });

    this.addEventListener('loadstart', function () {
        progressBar.MaterialProgress.setProgress(0);
        progressBar.MaterialProgress.setBuffer(87);
    });

    this.addEventListener('progress', function(e) {
        if (e.lengthComputable)
            console.log(e.loaded / e.total * 100);
        if (e.lengthComputable)
            progressBar.MaterialProgress.setProgress(e.loaded / e.total * 100);
        else
            progressBar.MaterialProgress.setProgress(0);

    });

    this.addEventListener('loadend', function () {
        progressBar.MaterialProgress.setProgress(100);
        progressBar.MaterialProgress.setBuffer(100);
    });

    origOpen.apply(this, arguments);

};