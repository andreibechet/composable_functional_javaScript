const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
});

const moneyToFloat = str => 
    Box(str)
    .map(s => s.replace(/\$/g, ''))
    .map(r => parseFloat(r))

const percentToFloat = str => 
    Box(str)
    .map(s => s.replace(/\%/g, ''))
    .map(r => parseFloat(r))
    .map(n => n * 0.01)

const applyDiscount = (price, discount) => 
    moneyToFloat(price)
    .fold(cost => 
        percentToFloat(discount)
        .fold(savings => 
            cost - cost * savings))


const result = applyDiscount('$5.00', '20%');
console.log(result);