const add = x => (y => x + y)

const inc = add(1)

const res = inc(2)
console.log(res)