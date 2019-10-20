# hexo-filter-highlight

[![Build Status](https://travis-ci.org/Jamling/hexo-filter-highlight.svg?branch=master)](https://travis-ci.org/Jamling/hexo-filter-highlight)
[![node](https://img.shields.io/node/v/hexo-filter-highlight.svg)](https://www.npmjs.com/package/hexo-filter-highlight)
[![npm downloads](https://img.shields.io/npm/dt/hexo-filter-highlight.svg)](https://www.npmjs.com/package/hexo-filter-highlight)
[![npm version](https://img.shields.io/npm/v/hexo-filter-highlight.svg)](https://www.npmjs.com/package/hexo-filter-highlight)
[![GitHub release](https://img.shields.io/github/release/jamling/hexo-filter-highlight.svg)](https://github.com/Jamling/hexo-filter-highlight/releases/latest)

## Introduction

![screenshot](https://github.com/Jamling/hexo-filter-highlight/blob/master/screenshot.png)

Highlight plugin using [highlight.js] for Hexo. This plugin not highlight when generating, you must highlight your code in front-end.

Optionally, if you using [Backtick Code Block](https://hexo.io/docs/tag-plugins.html#Backtick-Code-Block) style to insert code block, close the default highlight of hexo, your page will display unnormally, you can use this plugin to instead.

You can visit my [blog](http://www.ieclipse.cn/2016/08/10/Web/hexo-filter-highlight/) to see the highlight result.

## Feautre

- Using [highlight.js] freely
- Trim indent of code block
- Code line numbering support
- Code block copy support

## Install 

``` bash
$ npm install hexo-filter-highlight --save
```

Then set `enable: false` to turn off the hexo highlight in `_config.yml` under blog.

## Config

### backend
config `_config.yml` under your blog

``` yaml
# hexo-filter-plugin (https://github.com/Jamling/hexo-filter-highlight) config 
## highlight in frontend, the plugin (backend) just do some prepare work.
## you need to read the docs on https://github.com/Jamling/hexo-filter-highlight to getting start
hljs:
  enable: true #true to enable the plugin
  line_number: frontend # add line_number in frontend or backend (not recommend, have bugs in special hexo version)
  trim_indent: backend # trim the indent of code block to prettify output. backend or front-end (recommend)
  copy_code: true # show copy code in caption.
  label:
    left: Code
    right: ':'
    copy: Copy Code
```

### frontend

Import highlight js and style css  in your `<head></head>`

``` html
<link rel="stylesheet" href="//cdn.bootcss.com/highlight.js/9.6.0/styles/github.min.css">
<script src="//cdn.bootcss.com/highlight.js/9.6.0/highlight.min.js"></script>
```

Then add highlight script after document loaded, such as under document.onready().

- Simply

```js
$(document).ready(function(){
    hljs.initHighlightingOnLoad();
});
```

- Normally, insert following script after the document loaded

```js
  var trim_indent = true;
  var line_number = true;
  // enable highlight
  $('pre code').each(function(i, block) {
    var texts = $(this).text().split('\n');
     // trim indent
     if (trim_indent){
      var tab = texts[0].match(/^\s{0,}/);
      if (tab) {
        var arr = [];
        texts.forEach(function(temp) {
          arr.push(temp.replace(tab, ''));
        });
        $(this).text(arr.join('\n'));
      }
    }
    // add line number
    if (line_number) {
      console.log("show line number in front-end");
      var lines = texts.length - 1;
      var $numbering = $('<ul/>').addClass('pre-numbering');
      $(this).addClass('has-numbering').parent().append($numbering);
      for (i = 1; i <= lines; i++) {
        $numbering.append($('<li/>').text(i));
      }
    }
    // hightlight
    hljs.highlightBlock(block);
```

- Advancely

See [hljs.js] under [Nova] theme.

Last add your css to control the code block and line number.
See [nova.scss] under [Nova] theme.

## Refer
See [My Blog](http://www.ieclipse.cn/tags/Hexo/) for more information.

## License

MIT

[Hexo]: http://hexo.io/
[highlight.js]: https://highlightjs.org/
[Nova]: https://github.com/Jamling/hexo-theme-nova/
[hljs.js]: https://github.com/Jamling/hexo-theme-nova/blob/master/source/js/hljs.js
[nova.scss]: https://github.com/Jamling/hexo-theme-nova/blob/master/source/css/bs/nova.scss
