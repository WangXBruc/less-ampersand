const iterable = require('./iterable.js');
const compile = require('./compile.js');

/**
 * @main Function
 * walk the source string to change the subString that behind the @pattern to a series of '&&'
 */
const parse = (source)=> {
    const iterableSource = iterable(source);
    compile(iterableSource);
    return iterableSource.source();
}



module.exports = parse;