# Umbra Assert
Umbra assertion is an assertion framework built to be expressive and simple. It's focus is on making writing tests easier and less error prone. Let's take a look at some simple examples.

## Features
* Automatic deep equals checks
* Expect and Assert style expectations

## Examples

String comparison
```
const actual = "hello " + "world";
Assert.equals(actual, "hello world");
expect(actual).toBe("hello world");
```

Object comparison
```
const actual = {
    
};
Assert.equals(actual, "hello world");
expect(actual).toBe("hello world");
```