/**
 * @param {string} source string that comes from webpack
 */
const iterable = (source) => {
    let current = 0;
    return {
        next: () => source[current++],
        hasNext: () => current < source.length,
        current: () => current,
        source: () => source,
        setSource: (newSource) => {
            source = newSource;
        },
        /**
         * get the char at specific position
         */
        charAt: (pos) => source[pos],
        /**
         * replace a part of source string, @start is replaced, @end is not;
         * @current will be also changed.
         * */ 
        replace: (start, end, replacement) => {
            source = source.slice(0, start) + replacement + source.slice(end, source.length);
            current = current + replacement.length - (end - start);
        },
    }
}

module.exports = iterable;