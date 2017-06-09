const {Map, List} = require('immutable-ext')

// const res = "a".concat("b").concat("c") // doesn't change types ... semigroups 
// const res = [1,2].concat([3,4].concat([5,6]))
// semigroups from maths => associativity 

const Sum = x => 
({
    x,
    concat: ({x: y}) => 
        Sum(x + y),
    inspect: () => `Sum(${x})`
})

Sum.empty = () => Sum(0)

const All = x => 
({
    x,
    concat: ({x: y}) => 
        All(x && y),
    inspect: () => `Sum(${x})`
})

All.empty = () => All(true)

const First = x => 
({
    x,
    concat: _ => 
        First(x),
    inspect: () => `Sum(${x})`
})
// cannot be promoted to a monoid 

const sum = xs => 
    xs.reduce((acc, x) => acc + x, 0)

const all = xs =>
    xs.reduce((acc, x) => acc && x, true)


// const res = Sum.empty().concat(Sum(1).concat(Sum(2)))
// const res = All.empty().concat(All(true).concat(All(true)))
// const res = First("blah").concat(First("ice cream"))
const res = Map({brian: 1, sara: 2, george: 3})
            // .map(Sum)
            // .fold(Sum.empty()) // removal from a type: collection relying on a monoid / single type
            .foldMap(Sum, Sum.empty()) // map + fold 

console.log(res)
