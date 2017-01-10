# API-Book

[![npm](https://img.shields.io/npm/v/api-book.svg)](https://www.npmjs.com/package/api-book)
[![Build Status](https://travis-ci.org/yingray/api-book.svg?branch=master)](https://travis-ci.org/yingray/api-book)
[![npm](https://img.shields.io/npm/dm/api-book.svg)](https://www.npmjs.com/package/api-book)
[![Coverage Status](https://coveralls.io/repos/github/yingray/api-book/badge.svg?branch=master)](https://coveralls.io/github/yingray/api-book?branch=master)

For Front-End Development, this library is easy to generate API fetch automatically by json ONLY!

This library provide the useful featues to generate API fetch objects automatically by **json files(book)**, which back-end developer updated and maintained. Not only reduce communication costs of front-end and back-end, that need to synchronize information of RESTful API frequently, but increase program accuracy.

```js
// Easy to sync the APIs document from back-end using book!

const book = {
    getUserPicture: {
        url: '/api/user/{{userId}}/profile',
        method: 'GET',
        request: {
            path: {
                	userId: 536251
            },
            query: {
            		picId: 12345
            },
            body: {}
        },
        response: {
            type: 'json'
        }
    }
};
```

## Installation

```
npm install api-book
```

## Features

* Support all method to fetch API (GET, POST, OPTION etc)


## Quick Start

The quickest way to get started with Api-book as shown below:

Install the executable:

```
npm install --save-dev api-book
```

Create the desired API document(book):

```js
// book.js

const book = {
    getUserPicture: {
        url: '/api/user/{{userId}}/profile',
        method: 'GET',
        request: {
            path: {
                	userId: 536251
            },
            query: {
            		picId: 12345
            },
            body: {}
        },
        response: {
            type: 'json'
        }
    }
};
```

Provide the appropriate host address:

```js
const host = "http://localhost:9000";
```

Provide optional API parameters:

```js
const init = {
    "headers": {
        "Accept": "application/json",
        "Content-type": "application/json;charset=UTF-8",
    },
    "credentials": "include"
};
```

Generate Api-book fetch and give appropriate parameters:

```js
import api from 'api-book';
export default api(host, book, init);
```

In order to send the API, import the above output modules and call each other the desired API in the module:	

```js
import api from './book.js';

const path = {
    userId: 536251
};
	
const query = {
	 picId: 12345
};
	
const body = '';
	
api.intro(path, query, body)
    .then(response => {
        /*
			We build Reactions for calling APIs that works successfully
        */
    })
    .catch(error => {
        /*
            We build Reactions for calling APIs that works fails
        */
    })
	
```

Finally, that will generate the fetch object automatically to call API which link likes:

```
http://localhost:9000/api/user/536251/profile?picId=12345 (method: GET)
```

## Example

If you want to try this library easily, please follow the instructions below:

Install the executable:

```
git clone https://github.com/yingray/api-book.git
cd api-book
```

Start the server:

```
npm start
```

Enter to `http://localhost:9000`, click the click button to inspect whether web page works successfully to request and catches the response. You can also refer to the files in the example folder of the package.

```
-- example              
	- index.html         (web page)
	- index.js           (main script to call API)
	- book.js            (access the api document)
	- bundle.js          (webpack bundle all scripts)
```


## License

[MIT License](https://raw.githubusercontent.com/yingray/api-book/master/LICENSE)

Copyright (c) 2017 Ying-Ray Lu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
