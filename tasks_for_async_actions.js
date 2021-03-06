const Task = require('data.task')
const fs = require('fs')

const readFile = (fileName, encoding) =>
    new Task((rej, res) => 
        fs.readFile(fileName, encoding, (err, contents) => 
            err ? rej(err) : res(contents)))

const writeFile = (fileName, contents) =>
    new Task((rej, res) => 
        fs.writeFile(fileName, contents, (err, success) => 
            err ? rej(err) : res(success)))

const app = () =>
    readFile('config.json', 'utf-8')
    .map(contents => contents.replace(/8/g, '6'))
    .chain(contents => writeFile('config1.json', contents))

app().fork(e => console.log(e),
           x => console.log('success'))