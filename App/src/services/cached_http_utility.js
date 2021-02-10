export class CachedHttpUtility 
{
    constructor() 
    {
        this.cacheName = "learn_react_0_0";
        this.maxDuration = 60000; 
    }

    async get(url)
    {
         return this.getData(url, false);
    }

    async getJson(url, resultValidator)
    {
         return this.getData(url, true, resultValidator);
    }

    getTimingInfo(url)
    {
        var requestTime = Date.parse(localStorage.getItem("TIMEOF_" + url));
        if(isNaN(requestTime))
            requestTime = new Date();
        return { cacheDuration:(new Date()) - requestTime, requestTime: new Date()};   
    }

    async getData(url, isJson, resultValidator)
    {
        const storage = await caches.open(this.cacheName);        
        let response = await storage.match(url);

        const timingInfo = this.getTimingInfo(url);

        if(!response || !response.ok || timingInfo.cacheDuration > this.maxDuration)
        {
            console.log("Fetching " + url);
            let problem = null;

            await storage
                    .add(url)
                    .catch(e=> {
                        problem = e.message;
                    });

            if(problem)
            {
                throw `Failed to get response from ${url}: ${problem}`;
            }

            response = await storage.match(url);      
            localStorage.setItem("TIMEOF_" + url, new Date());
        }
        else 
            console.log(`Found ${url} in cache`);
       
        let data = isJson ? await response.json() : await response.text();

        if(resultValidator && !resultValidator(data))
        {
              //result was not good, do not cache it
              await storage.delete(url);  
        }

        return data;
    }
}