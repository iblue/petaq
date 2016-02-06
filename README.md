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
