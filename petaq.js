(function() {
  var compile = function(template) {
    var STRING          = 1;
    var OPEN_TAG        = 2;
    var OPEN_EVALUATE   = 3;
    var OPEN_NON_ESCAPE = 4;

    var state = STRING;
    var code = [];
    var parser_position     = 0;
    var next_token_position = 0;

    // let's hope nobody declares window._e
    var symbol_escape = "_e";

    var minify_html = function(html) {
      return html.replace(/\s+/g, " ");
    }

    var eval_inline_code = function(code) {
      return "b.push("+code+");";
    }

    var write_html = function(html) {
      return eval_inline_code("'"+minify_html(html)+"'");
    }

    var escape_html = function(code) {
      return "window['"+symbol_escape+"']("+code+")";
    }

    var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      "/": '&#x2F;'
    };

    var export_escape_html = function(string) {
      return String(string).replace(/[&<>"'\/]/g, function(s) {
        return entityMap[s];
      });
    }

    window[symbol_escape] = export_escape_html;

    while(true) {
      // Look for opening tag
      if(state === STRING) {
        next_token_position = template.indexOf("<%", parser_position);

        if(next_token_position === -1) {
          code.push(write_html(template.substr(parser_position)));
          break;
        } else {
          code.push(write_html(template.substr(parser_position, next_token_position - parser_position)));
          parser_position = next_token_position + 2;

          if(template.substr(parser_position, 2) === "!=") {
            state = OPEN_NON_ESCAPE;
            parser_position += 2;
          } else if(template.substr(parser_position, 1) === "=") {
            state = OPEN_EVALUATE;
            parser_position += 1;
          } else {
            state = OPEN_TAG;
          }
        }
      } else if(state === OPEN_TAG || state === OPEN_EVALUATE || state === OPEN_NON_ESCAPE) {
        // Look for closing tag
        next_token_position = template.indexOf("%>", parser_position);

        /*
        if(next_token_position === -1) {
          return function(_) {
            return "Parse Error";
          }
        }
        */

        var inline_code = template.substr(parser_position, next_token_position - parser_position);

        if(state === OPEN_TAG) {
          code.push(inline_code);
        } else if(state == OPEN_EVALUATE) {
          code.push(eval_inline_code(escape_html(inline_code)));
        } else if(state == OPEN_NON_ESCAPE) {
          code.push(eval_inline_code(inline_code));
        }

        parser_position = next_token_position + 2;
        state = STRING;
      }
    }

    return new Function("d","with(d){b=[];"+code.join('')+"};return b.join('')");
  };

  var cache = {};

  var querySelector = document.querySelector.bind(document);

  var get = function(el) {
    return querySelector(el).innerHTML;
  }

  var set = function(el, content) {
    querySelector(el).innerHTML = content;
  }

  var template = function(input_selector, output_selector, data) {
    cache[input_selector] = cache[input_selector] ||
      compile(get(input_selector));
    set(output_selector, cache[input_selector](data));
  }

  window['petaQ'] = template;
})();
