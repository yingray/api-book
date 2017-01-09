# API-Book

For Front-End Development, this library is easy to generate API fetch automatically by json ONLY!

為了降低前後端在操作RESTful API上的溝通成本，只要三步驟，本套件能由後端所開發出的API文件中，輕易建立出合適的API fetch，提供前端用。

## Installation

1. 首先，在專案上安裝本開發套件：

	`npm install --save-dev api-book`

2. 按照本套件規範，建立由欲求的API文本，下列三項為必要之參數：

    * 提供適當的host位址(host)
    * 提供API共用參數(init)
    * 提供每隻API的詳細文本及應代參數(book)

	```js
	// book.js
	
	import api from 'api-book'
	
	const host = "http://localhost:9000";
	
	const book = {
	    intro: {
	        url: '/api/intro/{{testId}}',
	        method: 'GET',
	        request: {
	            path: {
	                testId: 536251
	            },
	            query: {},
	            body: {}
	        },
	        response: {
	            type: 'json'
	        }
	    }
	};
	
	const init = {
	    "headers": {
	        "Accept": "application/json",
	        "Content-type": "application/json;charset=UTF-8",
	    },
	    "credentials": "include"
	};
	
	export default api(host, book, init);
	```

3. 在欲發送API處，import上列輸出模組，並互叫該模組中欲求的API：

	```
	const path = {
	    testId: 12345
	};
	
	const query = '';
	
	const body = '';
	
	api.intro(path, query, body)
	    .then(response => {
	        /*
	            這裡做API正常的反應
	        */
	    })
	    .catch(error => {
	        /*
	            這裡做API錯誤的反應
	        */
	    })
	
	```

## Example

想簡單測試本套件，操作步驟如下：

1. 首先，安裝本開發套件：

	`npm install api-book`

2. 於套件根目錄執行node server：(啟動後，server提供幾個簡單的RESTful API給予測試)

	`npm start`

3. 進入`http://localhost:9000`，並點選click按鈕，檢查本網頁是否正常提出請求及接收回應。

4. 參考本套件example資料夾內的範例檔案。

	```
		-- example              (範例資料夾)
			- index.html         (網頁參考)
			- index.js           (點擊後，如何呼叫API的方法)
			- book.js            (API文本存放)
			- bundle.js          (Webpack打包)
	```


## License

MIT License

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
