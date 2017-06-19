# ideas 

## concurrent actions with applicative functors

``` javascript
const Db = ({
    find: id => 
        new Task((rej, res) => 
            setTimeout( () => 
                res({id: id, title: `Project ${id}`}), 100))
}) // object which gets something from the BD

const reportHeader = (p1, p2) => `Report: ${p1.title} vs ${p2.title}`

//  one way of writing it: get p1, then p2, and report it
Db.find(20).chain(p1 =>
    Db.find(8).map(p2 =>
        reportHeader(p1, p2)))

// p1 and p2 can be done in parallel
// => use function currying without modifying the reportHeader function
Task.of(p1 => p2 => reportHeader(p1, p2))
.ap(Db.find(20)) // will get both (or more) in parallel
.ap(Db.find(8))
.fork(console.error, console.log) // to observe the effects (takes a callback for rejection and 1 for success)
```