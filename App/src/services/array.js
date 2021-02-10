const arrayDistinctFunction = function distinct()
{
    var set = new Set(this);
    var result = Array.from(set);
    return result;
}

Array.prototype.distinct = arrayDistinctFunction;