const parse = require('../src/index.js');
const fs = require('fs');

const source = fs.readFileSync('./demo.js');

const result = parse(source.toString());

fs.writeFile('./production.js', result, function(err){
    if(err) {
        console.error(err);
    } else {
        console.log('compile successfully! watch result in production.js')
    }
})
