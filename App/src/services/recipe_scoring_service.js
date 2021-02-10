export function getRecipeScore(recipe)
{
    const frequencies = recipe.ingredients.map(i=>i.frequency);

    var metricsVeryCommon = getIngredientMetrics(frequencies.filter(f=> f >= 0.1))
    var metricsCommon = getIngredientMetrics(frequencies.filter(f=> f < 0.1 && f >= .01))
    var metricsRare = getIngredientMetrics(frequencies.filter(f=> f < .01))

    let score = metricsRare.count * (-1.8) +
                metricsCommon.count * (-0.01) +
                metricsVeryCommon.count * (-0.05) +
                metricsVeryCommon.average * 2 +
                metricsCommon.average * 1.2 +
                metricsRare.average * 0.9;

    return score;
}

function getIngredientMetrics(frequencies)
{
    if(frequencies.length == 0)
        return { count: 0, average:0, min:0 };

    return {
        count: frequencies.length,
        average: frequencies.reduce((a,b)=>a+b) / frequencies.length,
        min: frequencies.reduce((a,b)=>a+b) / frequencies.length     
    };
}
