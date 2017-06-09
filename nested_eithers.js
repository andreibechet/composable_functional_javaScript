const Right = x => 
({
    chain: f => f(x), // expects you to run a function and return another function
    map: f => Right(f(x)),
    fold: (f, g) => g(x), // this allows us to branch our, taking it out of the box (removing the value out of its context)
    inspect: () => `Right(${x})`
})

const Left = x =>
({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x), // this allows us to branch our code 
    inspect: () => `Left(${x})`
})

const fromNullable = x =>
    x != null ? Right(x) : Left(null);

const fs = require('fs');

const tryCatch = f => {
    try {
        return Right(f())
    } catch(e) {
        return Left(e)
    }
}

// const getPort = () => {
//     try {
//         const str = fs.readFileSync('config.json');
//         const config = JSON.parse(str);
//         return config.port;
//     } catch(e) {
//         return 3000;
//     }
// }

const getPort = () => 
    tryCatch(() => fs.readFileSync('config.json'))
    // .map(c => tryCatch(() => JSON.parse(c))) // we get either Right(Right(..)) or Right(Left(error)) therefore we need to nest 
    .chain(c => tryCatch(() => JSON.parse(c))) // therefore we need another fundtion called `chain` (less confusing this way)
    .fold(e => 3000,
          c => c.port)

const result = getPort();
console.log(result)