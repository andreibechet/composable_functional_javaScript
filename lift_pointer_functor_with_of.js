const Task = require('data.task')

const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
})
Box.of = (x) => Box(x)

const Right = x => 
({
    chain: f => f(x), // expects you to run a function and return another function
    map: f => Right(f(x)),
    fold: (f, g) => g(x), // this allows us to branch our, taking it out of the box (removing the value out of its context)
    inspect: () => `Right(${x})`
})
Right.of = (x) => Right(x)

const Left = x =>
({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x), // this allows us to branch our code 
    inspect: () => `Left(${x})`
})
Left.of = (x) => Left(x)

// placing a value into a type is also called lifting a value into a type
Task.of('hello')
console.log(Right('hello').map(x => x + '!'))
console.log(Box.of(100))


// Monad rules
// 1: join(m.map(join)) == join(join(m))

const m = Box(Box(Box(3)))
const res11 = join(Box.of(m))
const res12 = join(m.map(Box.of))
console.log(res11, res12)

// 2: join(Box.of(m)) == join(m.map(Box.of))
const mm = Box('wonder')
const res21 = join(Box.of(mm))
const res22 = join(mm.map(Box.of))
console.log(res21, res22)
