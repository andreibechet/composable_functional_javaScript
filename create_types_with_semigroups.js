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


// const res = Sum.empty().concat(Sum(1).concat(Sum(2)))
const res = All.empty().concat(All(true).concat(All(true)))
// const res = First("blah").concat(First("ice cream"))

console.log(res)
