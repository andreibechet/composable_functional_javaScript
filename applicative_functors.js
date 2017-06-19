const Box = require('./box')

const add = x => y => x + y

// const res = Box(x => x + 1).ap(Box(2))
const res = Box(add)
            .ap(Box(2)) // Box(y => 2 + y)
            .ap(Box(3)) // applying each box at a time 
console.log(res)

// Box(x).map(f) // applies one function at a time 

// F(x).map(f) == F(f).app(F(x))

const liftA2 = (f, fx, fy) => 
    fx.map(f).ap(fy) // Box(f).ap(fx).ap(fy)

const res2 = liftA2(add, Box(2), Box(4))
console.log(res2)

console.log(Box(2).map(add))