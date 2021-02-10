import * as Constants from '/src/constants.mjs'
export class HttpUtility 
{
    constructor() 
    {
    }

    get(url)
    {
        return this.httpRequest(url, Constants.HttpGet);
    }

    getJson(url)
    {
        return this.get(url)
                .then(this.parseJson);
    }

    parseJson(text)
    {
        return JSON.parse(text);
    }

    httpRequest(url, method, data)
    {
        console.log("fetching " + url);
        let promise = new Promise((resolve,reject) => 
        {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.send(data);
            xhr.onreadystatechange = function () 
            {
                if (xhr.readyState === Constants.ReadyStateDone) 
                {
                    if (xhr.status === Constants.HttpOK) 
                    {
                        resolve(xhr.responseText); 
                    } 
                    else 
                    {
                        reject('Error: ' + xhr.status); 
                    }
                }
            };
        });

        return promise;        
    }
}