# CSS
Creating a pretty good fallback for relative easy flexbox alignments isn't verry difficult.
I've looked at two elements of the flexbox series.
1. The flex alignment
2. Centering content

In the [demo](martijnnieuwenhuizen.github.io/projects/browser-technologies/feature_detection/css.html) you can click to see the differance between the two possibilities

## Flexbox and/or inline-block
To align something with flexbox is verry easy, but to create a good fallback ins't a hard job.
If you want to align something like in the example you can do the following:
```
.containter {
	// default
	display: block;
	width: 100%;
	text-align: center;

	// flexbox
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
}
.containter-inner {
	// default
	display: inline-block;
	max-width: 10em;
	max-height: 30em;
	margin: .3em .7em;
	text-align: left;

	// flexbox	
	nothing in this case
}	

```
So, what happens here?
The idea is that every block in the container has a width and is an inline-block element, so everything is sitting next to eachother. And that's good. The only thing we do with flexbox is a prittier alingment. So if your browser supports *display: inline-block;* (and every browser does that! [Can I Use -> inline-block](http://caniuse.com/#search=inline-block)) the layout will be fine. And if your browser supports flexbox, it will look even nicer. 
**TIP:** The text-align: center; on the .container takes care of the center alignment.

## Center the inner content
After creating a nice overview of all the items, I want to aling the content off every item. This is also verry simple! You can use the *text-align* property, which accepts the following settings: *left, right and center*. 
If you want to use flexbox for this, you can use the *justify-content* property on the container. This property accepts the following settings: *flex-start, center, flex-end*.

### Conclusion
So the story here is simple. If you use flexbox for a fancy layout, please think about the possibilities with the *display* property. This gives you the power to create a acceptable layout for non-flexbox users.

# JavaSript (ES6)
## array.prototype.forEach.call
In my own code i use the following code a lot:
```
Array.prototype.forEach.call(items, function(item) {
	
	item.something();

});
```
This is my new For Loop! :), And it workes great! But what does it? and what is the right fallback for this method?
### How it works
You can loop thrue the items in a array using a *forEach* loop. And that's the fastest way to do it. But in this case I don't use it for an array, I use it to loop thrue a nodeList. This is created by a *document.querySelectorAll()*. So it replaces the *for* loop.

But it's not possible to loop thrue a nodelist with a forEach loop, so we have to borrow the method from the array object. This is done with *.call()*. 
But do we borrow it? or does it create a new array?
The answer: We borrow it to tempareraly create a new array where we can look thrue.

[See it work](martijnnieuwenhuizen.github.io/projects/browser-technologies/feature_detection/es6.html)

### The Fallback
The fallback is the for loop, which is from je JS core (so it works in every browser).
```
for ( i = 0; i < items.length; i++ ) {
	
	items[i].something();

}
```

## Arrow functions (arrow function expression)
### What is a arrow function
Syntax from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
```
() => { 
	statements 
}

(param1, param2) => { 
	statements 
}

```

### What does it replace
```
//es5 (with a promise)
getData(url)
	.then(function(resolve) {
		var data = JSON.parse(resolve);
		return data; // You have to write the return yourself
	});

//es6
getData(url)
	.then( resolve => 
		JSON.parse(resolve); // returns the parsed data automaticly
	);

```


### Why is it better
* For one, it's shorter
* It's focus is on OOP
```
// code from MDN
function car() {
	this.doors = 4;

	setInterval( () => {
		
		this.age++; //this refers to the person object

	},1000 );
};
```

* Automatic returns
```
var func = e => e * s; // automaticly returns e * s
var func = (e, s) => { return e * s }; // returns e * s after you declare it
```
* It's alway's a anonymous function.

But I have one problem with it, is it so hard to write *function* and *return*? Well if you are a diehard JS Developer, the lexically binds the *this* value seems to be a good thing. But with my current skill, it's not yet nessesary.


# HTML(5)
## input type = color
The input type color is used to select a color without having to write the hex code. 
If your browser doesn't supports this, you could add a # as value to the input. If your browser doesn't support the color value you will see a input field with a # already added.
```
// Code:
<input type="color" value="#">
```
[Use it](martijnnieuwenhuizen.github.io/projects/browser-technologies/feature_detection/es6.html)

## Loop Audio
The Audio tag can have multiple attributes. One of those is loop. 
The loop attribure automaticly loops the audiofile.

### Browsers
If your browser doesn't support the loop attribute, the auto tag is also not supported. The fallback for this issue is to create a download link to the auto file.
```
<audio loop>
	<source> // your multiple sources
</audio>
```









