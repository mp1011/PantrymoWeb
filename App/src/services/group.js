const arrayGroupByFunction = function distinct(callback)
{
    //adapted from https://www.robinwieruch.de/javascript-groupby
    return this.reduce((acc,value)=>{

        const key = callback(value);
        acc.add(key, value);

        return acc;

    }, new ArrayGrouping());
}

Array.prototype.groupBy = arrayGroupByFunction;

function ArrayGrouping()
{
    this.items = {};

    this.add = (key, item)=>{

        if(!this.items[key])
            this.items[key] = [];

        this.items[key].push(item);
    };

    this.getValues = function()
    {
        return Object.values(this.items);
    }

}