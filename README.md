###  Background

When we write JavaScript, especially using React (in render function), we have to write a lot of judgment. For example:

```javascript
const name = clazz ? clazz.student ? clazz.student.name : null : null;
```

Or, we can write like this:

```javascript
const name = clazz && clazz.student && clazz.student.name;
```

But, as we can see, this is a little complex. If we have a more complex sentence, thing goes worse.

### Think

Then we start to think, is there any way can help us to transform 

```javascript
const name = clazz.student.name;
```

to 

```javascript
const name = clazz && clazz.student && clazz.student.name;
```

automatically?

### My solution

We all know Webpack, if you don't, emmmmm...

Webpack loader is a good entrance to transform our code.

So, my solution is a webpack loader. I call it **less-ampersand**.

```
npm install less-ampersand
```

Add it to webapck, **this loader should be at the first of JS loaders**.

```javascript
module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'less-ampersand'
                }]
            }
        ]
    },
```

Then write the code like this:

```javascript
const value = /**@@ */list[0].apple.name;
```

The code will be transform to:

```javascript
const value = list && list[0] && list[0].apple && list[0].apple.name;
```

That's quite easy, right?



More scenes, see it in demo.



### 背景

当我们写JavaScript代码，尤其是在React的render方法中，经常要做很多判断，就像这样:

```js
const name = clazz ? clazz.student ? clazz.student.name : null : null;
```

或者是这样：

```js
const name = clazz && clazz.student && clazz.student.name;
```

前者可读性较差，后者也很冗长，尤其是一个语句中有几个这样的变量的时候，就越来越麻烦。

### 思考

如果有什么办法能够自动把

```js
const name = clazz.student.name;
```

转成

```js
const name = clazz && clazz.student && clazz.student.name;
```

吗？

### 我的解决办法

利用Webpack loader的编译机制，实现一个叫做**less-ampersand**的loader，来帮助我们自动实现上述转换。

第一步

```
npm install less-ampersand
```

然后添加到webpack配置中

```js
module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'less-ampersand'
                }]
            }
        ]
    },
```

之后，当我们写下面的代码的时候，就会被自动编译成后面的。

```js
const value = /**@@ */list[0].apple.name;
```

```js
const value = list && list[0] && list[0].apple && list[0].apple.name;
```

demo里面列了更多的用法，请查阅。