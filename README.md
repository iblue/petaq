# petaQ!

A small javascript templating engine (for klingon coders).

## Example usage

Include one of the javascript files. Then use as follows:

```html
<div id="target"></div>
<script type="text/ejs" id="template">
  <ul>
    <% for(var i=0;i<items.length;i++) { %>
    <li><%= items[i].name %></li>
    <% } %>
  </ul>
  <p>Escape: <%= "<b>hi</b>" %></p>
  <p>Non-Escape: <%!= "<b>hi</b>" %></p>
</script>
```

Invoke the rendering as follows:
```javascript
window['petaQ']("#template", "#target", {items: [{name: "foo"}, {name: "bar"}]});
```

And you get the following result in your DOM
```html
<div id="target">
  <ul>
    <li>foo</li>
    <li>bar</li>
  </ul>
  <p>Escape: &lt;b&gt;hi&lt;/b&gt;</p>
  <p>Non-Escape: <b>hi</b></p>
</div>
```

## Documentation

* `<% javascriptExpression() %>` evaluates the expression without
outputting anything.

* `<%= javascriptExpression() %>` outputs the result of the expression,
escaping any html tags.

* `<%!= javascriptExpression() %>` outputs the result of the expression,
without escapting anything.

## Contribution

* **I will close any pull request that adds more bytes to the minified
  uncompressed code.**
* I will probably accept bug fixes.
* Commit messages have to be in Klingon.

## FAQ

### Why are there no tests?

Specs are for the weak and timid!

### Why are there no releases tagged?

Klingons do not make software 'releases'. Our software 'escapes'.
Typically leaving a bloody trail of designers and quality assurance
people in its wake.

### You do not handle user-caused parse errors.

Defensive programming? Never! Klingon programs are always on the
offense. Yes, Offensive programming is what we do best.

### Your function invocations are missing parameters.

Klingon function calls do not have 'parameters' - they have
'arguments' - and they ALWAYS WIN THEM.

### Your code does not work in IE.

Nobody uses that Ferengi crap anyway.
