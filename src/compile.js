const iterable = require('./iterable.js');

const pattern = /\/\*{2,}\s*@{2}\s*\*\//;
const endChar = /\s|\r|\n|;|\+|-|\*|\/|%|&|\?|<|>|=|\||,|\}/;
const pairCharMap = {
    '[': ']',
    '(': ')'
}
const leftPairs = ['(', '['];
const rightPairs = [')', ']'];


/**
 * walk the iterable source string to change the subString that behind the @pattern to a series of '&&'
 */
const compile = (iterableSource) => {
    let match = '';
    while(iterableSource.hasNext()) {
        const currentChar = iterableSource.next();
        if(currentChar === '/' ) {
            const start = iterableSource.current() - 1;
            let leftChar = iterableSource.charAt(start - 1);
            if(!leftPairs.includes(leftChar)) {
                leftChar = null;
            }
            match =  '/' + findNextChar('/', leftChar, iterableSource) + '/';
            if(match.match(pattern)) {
                // endChar is not in the match and current is at position of endChar + 1.
                match = findNextChar(endChar, leftChar, iterableSource);
                const iterableMatch = iterable(match);
                compile(iterableMatch);
                // recursion to transform the inner string
                const replacement = transform(iterableMatch.source());
                iterableSource.replace(start, iterableSource.current() - 1, replacement);
            }
            match = '';
        }
    }
}


/**
 * find the sub string between current position and right char that matches the left char
 * or find the sub string utill the ending char.
 * when finish the search, @current is at position of @endChar + 1
 * endChar is not included in @return match.
 * @param {RegExp} char the end char
 * @param {char} leftChar null or '[' or '(‘
 * @param {string} iterableSource iterableSource
 * @return {string} the sub string: [position start to search, current - 1)
 */
const findNextChar = (char, leftChar, iterableSource) => {
    let match = '';
    let currentChar = '';
    let leftCharCount = 1;
    let rightCharCount = 0;
    if(leftChar) {
        while(iterableSource.hasNext() && !(currentChar = iterableSource.next()).match(char)) {
            if(currentChar === leftChar) {
                leftCharCount++;
            }
            if(currentChar === pairCharMap[leftChar]) {
                rightCharCount++;
            }
            if(leftCharCount > rightCharCount) {
                if(leftPairs.includes(currentChar)) {
                    const innerMatch = findPair(currentChar, iterableSource);
                    // When executing findPair, it will miss to increase rightCharCount
                    leftCharCount--;
                    currentChar += innerMatch;
                }
                match += currentChar;
            } else {
                break;
            }
        }
    } else {
        while(iterableSource.hasNext() && !(currentChar = iterableSource.next()).match(char)) {
            if(leftPairs.includes(currentChar)) {
                currentChar += findPair(currentChar, iterableSource);
            }
            match += currentChar;
        }
    }
    return match;
}

/**
 * transform the match string to target string
 * @match is the string that just behind the @pattern
 */
const transform = (match) => {
    let part = '';
    let parts = [];
    const iterableMatch = iterable(match);
    while(iterableMatch.hasNext()) {
        let currentChar = iterableMatch.next();
        if(['.', ']', '['].includes(currentChar)) {
            parts.push(part);
        }
        if(leftPairs.includes(currentChar)) {
            let match = findPair(currentChar, iterableMatch);
            currentChar += match;
            if(currentChar === '[') {
                parts.push(part + currentChar);
            }
        }
        part += currentChar;
    }
    parts.push(part);
    return parts.join(' && ');
}
/**
 * Find a pair of closed brackets, the return value includes the bracket on the right
 * @param {string} leftPair Left bracket to find
 * @param {*} iterableMatch Traversed object
 */
const findPair = (leftPair, iterableMatch) => {
    let match = '';
    const rightPair = pairCharMap[leftPair];
    let countObj = {
        [leftPair]: 1,
        [rightPair]: 0
    }
    while(iterableMatch.hasNext()) {
        const currentChar = iterableMatch.next();
        if(currentChar === rightPair) {
            countObj[rightPair] ++;
        }
        if(currentChar === leftPair) {
            countObj[leftPair] ++;
        }
        match += currentChar;
        if(countObj[leftPair] === countObj[rightPair]) {
            break;
        } 
    }
    return match;
}

module.exports = compile;