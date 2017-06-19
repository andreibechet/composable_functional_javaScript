const { List } = require('immutable-ext')

// replace this with applicative functors 
// for(x in xs) {
//     for(y in ys) {
//         for(z in zs) {
//         }
//     }
// }

const merch = () =>
    List.of(x => y => z => `${x}-${y}-${z}`)
    .ap(List(['tshirt', 'sweater']))
    .ap(List(['s', 'm', 'l', 'xl']))
    .ap(List(['black', 'white']))
const res = merch()

console.log(res)