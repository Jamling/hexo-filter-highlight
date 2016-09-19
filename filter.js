'use strict';
var Entities = require('html-entities').XmlEntities;
var entities = new Entities();

module.exports = function(data) {
  var hljs = this.config.hljs || {};
  if (!hljs.enable) return;
  
  var keys = hljs.label || {};
  var key_left = keys.left || '';
  var key_right = keys.right || '';
  var key_copy = keys.copy || '';
  var position = keys.label_position || 'outer';
  var className = keys.class_name || 'code-caption';

  var source = data.source;
  var ext = source.substring(source.lastIndexOf('.')).toLowerCase();

  if (ext !== '.md') {
    return;
  }

  var fences = /\n *(`{3,}|~{3,}) *(\S+)? *(.*)\n([\s\S]*?)\s*(\1) *(\n+|$)/g;
  data.content = data.content.replace(fences, function() {
    var tag = arguments[1];
    var lang = arguments[2] || '';
    var args = arguments[3] || '';
    var code = arguments[4];
    var endtag = arguments[5];
    var end = arguments[6];
    
    lang = lang.toLowerCase();
    
    var hide_label = false;
    var caption = '';
    var data_set = 'data-lang="' + lang + '" data-line_number="' + hljs.line_number
      + '" data-trim_indent="' + hljs.trim_indent + '" data-label_position="' + position 
      + '" data-labels_left="' + key_left + '" data-labels_right="' + key_right + '" data-labels_copy="' + key_copy + '"';
    var label = '';
    if (args) {
      hide_label = / *(show\:off|show\:false) */.test(args);
      data_set += ' data-hide="' +hide_label + '"'; 
      var args = args.trim().split(/ {1,}/);
      var title = args[0];
      var url = '';
      if (args.length > 1) {
        url = args[1];
      }
      if (url) {
        label += `[${title}](${url})`;
        data_set += ' data-href="' + url + '"';
      }
      else {
        label +=`\`${title}\``;
        data_set += ' data-title="' + title + '"';
      }
      label = `(${label})`;
    }
    
    // label = `${label}`;

    caption += '<span class="' + className + '-label">' + label + '</span>';
    if (hljs.copy_code) {
      caption += '<a class="' + className + '-copy">' + key_copy + '</a>';
    }

    if (hljs.trim_indent === 'backend') {
       code = trim_indent(code);
    }
    
    if (position === 'outer') {
      caption = `\n<p class="${className}" ${data_set}>${caption}</p>`;
      return caption + '\n' + tag + ' ' + lang + ' \n' + code + '\n' + tag + end;
    } else if (position === 'inner'){
      // TODO has issue.
      // code = entities.encode(code);
      // return `${caption}<pre><code class="${lang}"
      // ${data_set}>${code}</code></pre>${end}`;
    }
  });
  
  function trim_indent(code){
    var texts = code.split('\n');
    var tab = texts[0].match(/^\s{0,}/);
    if (tab) {
      var arr = [];
      texts.forEach(function(temp){
        arr.push(temp.replace(tab, ''));
      });
      return (arr.join('\n'));
    }
    return code;
  }
};