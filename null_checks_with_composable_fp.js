
// Either

const Right = x => 
({
    map: f => Right(f(x)),
    fold: (f, g) => g(x), // this allows us to branch our 
    inspect: () => `Right(${x})`
})

const Left = x =>
({
    map: f => Left(x),
    fold: (f, g) => f(x), // this allows us to branch our code 
    inspect: () => `Left(${x})`
})

const fromNullable = x =>
    x != null ? Right(x) : Left(null)

const findColor = name => 
    fromNullable(({red: `#ff4444`, blue: `#3b5998`, yellow: `#fff68f`})[name]);

const result0 = findColor('green') 
                    .map(c => c.slice(1)) // here I get either a Right or a Left (definitely not a null)
                    .fold(error => 'no color', 
                          c => c.toUpperCase())
console.log(result0)
const result1 = findColor('red')
                    .map(c => c.slice(1))
                    .fold(e => 'no color', c => c.toUpperCase())
console.log(result1)

// this allows us to do 
// - pure fp error handling
// - code branching
// - null checks 
// .. in general all sorts of concepts that capture dijunction 
// i.e. the concept of OR
const result = Right(2).map(x => x + 1).map(x => x / 2).fold(x => 'Error', x => x)
console.log(result)

const result2 = Left(2).map(x => x + 1).map(x => x / 2).fold(x => 'Error', x => x)
console.log(result2)