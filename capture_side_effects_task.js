const Task = require('data.task')

const launchMissiles = () =>
    new Task((rej, res) => {
        console.log("launch missiles!")
        res("missiles")
    })


const app = launchMissiles().map(x => x + "!")


app
.map(x => x + "!!") // keep composing the app (good for libraries)
.fork(e => console.log("err", e),
      x => console.log("success", x))


Task.of(1) 
.map(x => x + 1)
.chain(x => Task.of(x + 1))
.fork(e => console.log('error', e),
      x => console.log('success', x))

Task.rejected(1) 
.map(x => x + 1)
.chain(x => Task.of(x + 1))
.fork(e => console.log('error', e),
      x => console.log('success', x))