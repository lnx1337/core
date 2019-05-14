(function(b, c, d, f, h, i) {
  /*
   * (internal use)
   * ie8 workaround to convert NodeList to an array
   * a = NodeList
   * b = placeholder for each node
   * c = index
   * d = empty array
   * returns array of dom nodes
   */
  h = function(a, b, c, d) {
      c = -1
      d = []
      while (b = a[++c]) d[c] = b
      return d
    }
    /*
     * (internal use)
     * Cross-browser super-type event handler https://gist.github.com/dciccale/5521816
     * action = 'on' or 'off'
     * event = event type (i.e. 'click')
     * element = the element to add the event
     * callback = function to execute when event is triggered
     * method = placeholder for the native method to call (internal use)
     */
  i = function(action, type, element, callback, method) {
      method = {
        on: 'addEventListener',
        off: 'removeEventListener'
      }[action]
      var types = type.split(' '),
        i = types.length;
      while (i--) {
        try {
          element[method](types[i], callback, false)
        } catch (e) {
          method = {
            on: 'attachEvent',
            off: 'detachEvent'
          }[action]
          element[method](action + types[i], function() {
            callback.apply(element, arguments)
          })
        }
      }
    }
    /*
     * $ main method
     * a = css selector, dom object, or function
     * returns instance
     */
  this.$ = function(a) {
      return new $[d].i(a)
    }
    // ki prototype
  f = {
      // default length
      length: 0,
      /*
       * init method (internal use)
       * a = selector, dom element or function
       */
      i: function(a) {
        c.push.apply(this, a && a.nodeType || a === window ? [a] : "" + a === a ? h(b.querySelectorAll(a)) : /^f/.test(typeof a) ? $(b).r(a) : null)
      },
      /*
       * ready method
       * Smallest DOMReady code, ever
       * http://www.dustindiaz.com/smallest-domready-ever
       * a = function to call when dom is ready
       * return this
       */
      r: function(a) {
        /c/.test(b.readyState) ? a() : $(b).on('DOMContentLoaded', a)
        return this
      },
      /*
       * on method
       * a = string event type i.e 'click'
       * b = function
       * return this
       */
      on: function(a, b) {
        return this.each(function(c) {
          i('on', a, this, b)
        })
      },
      /*
       * off method
       * a = string event type i.e 'click'
       * b = function
       * return this
       */
      off: function(a, b) {
        return this.each(function(c) {
          i('off', a, this, b)
        })
      },
      /*
       * each method
       * use native forEach to iterate collection
       * a = the function to call each loop
       * (b = internal use)
       * return this
       */
      each: function(a, b, c, d) {
        for (b = this, c = 0, d = b.length; c < d; ++c) {
          a.call(b[c], b[c], c, b)
        }
        return b
      },
      // for some reason is needed to get an array-like
      // representation instead of an object
      splice: c.splice
    }
    // set prototypes
  $[d] = f.i[d] = f
})(document, [], 'prototype');


$.prototype.text = function(a) {
  return a === []._ ? this[0].textContent : this.each(function(b) {
    b.textContent = a
  })
};

$.prototype.motion = function(css, speed, action) {
  if (action === 'from') {
    action = TweenMax.from(this[0], speed / 1e3, css);
  } else if (action === 'set') {
    action = TweenMax.set(this[0], speed / 1e3, css);
  } else {
    action = TweenMax.to(this[0], speed / 1e3, css);
  }
  return action;
};

$.prototype.timeline = function(params, time) {
  var tl = new TimelineMax();
  tl.to(this[0], time, params);
  console.log(tl);
  return tl;
};

$.prototype.index = function(){
  var i = 0;
  while (this[0] =  this[0].previousElementSibling) {
    ++i;
  }
  return i;
};

$.prototype.closest = function(selector) {
  var firstChar = selector.charAt(0);
  // Get closest match
  for ( ; this[0] && this[0] !== document; this[0] = this[0].parentNode ) {
    // If selector is a class
    if ( firstChar === '.' ) {
      if ( this[0].classList.contains( selector.substr(1) ) ) {
        return this[0];
      }
    }
    // If selector is an ID
    if ( firstChar === '#' ) {
      if ( this[0].id === selector.substr(1) ) {
        return this[0];
      }
    } 
    // If selector is a data attribute
    if ( firstChar === '[' ) {
      if ( this[0].hasAttribute( selector.substr(1, selector.length - 2) ) ) {
        return this[0];
      }
    }
    // If selector is a tag
    if ( this[0].tagName.toLowerCase() === selector ) {
      return this[0];
    }
  }
  return false;
};

$.prototype.hasClass = function(name) {
  return this[0].className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
};

$.prototype.addClass = function(name) {
  if (!this.hasClass(name)) {
    return this[0].className += (this[0].className ? ' ' : '') + name;
  }
};

$.prototype.removeClass = function(name) {
  if (this.hasClass(name)) {
    var reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
    return this[0].className = this[0].className.replace(reg, ' ');
  }
};
$.prototype.attr = function(attributes) {
  if (typeof attributes === 'object') {
    for (i in attributes) {
      if ((typeof(i) === 'string') && (typeof(attributes[i]) === 'string') && i !== '' && attributes[i] !== '') {
        return this[0].setAttribute([i], attributes[i]);
      }
    }
  } else {
    return this[0].getAttribute(attributes);
  }
};
$.prototype.removeAttr = function(attributes) {
  if (typeof attributes === 'object') {
    for (i in attributes) {
      if ((typeof(i) === 'string') && (typeof(attributes[i]) === 'string') && i !== '' && attributes[i] !== '') {
        return this[0].removeAttribute([i], attributes[i]);
      }
    }
  }
};
$.prototype.css = function(c) {
  for (i in c) {
    if (typeof i === 'string' && i !== '' && c[i] !== '') {
      c[i] = (typeof c[i] === 'number' && i !== 'zIndex') ? c[i] + 'px' : c[i];
      this[0].style[i] = c[i];
    }
  }
};
$.prototype.create = function(selector) {
  var classes = selector.match(/(\.[\w-]+[a-z])/g),
    id = selector.match(/(\#[\w-]+[a-z])/g),
    tagname = selector.match(/(?:^|(?:[.!?]\s))(\w+)/g) || 'div',
    item = document.createElement(tagname);
  if (typeof id === 'object' && id !== null) {
    item.id = id[0].toString().replace('#', '');
  }
  if (typeof classes === 'object' && classes !== null) {
    item.className = classes.toString().replace(/[.]/g, '').replace(/[,]/g, ' ');
  }
  this[0].appendChild(item);
};
$.prototype.remove = function(selector) {
  if (typeof selector === 'string') {
    var elem = document.querySelectorAll(selector);
    this[0].removeChild(elem[0]);
  } else {
    while (this[0].firstChild) {
      this[0].removeChild(this[0].firstChild);
    }
  }
};
$.prototype.trigger = function(type, doc, event) {
  doc = document;
  if (doc.createEvent) {
    event = new Event(type);
    this[0].dispatchEvent(event);
  } else {
    event = doc.createEventObject();
    this[0].fireEvent('on' + type, event);
  }
};
$.param = function(obj, prefix) {
  var str = [];
  for (var p in obj) {
    var k = prefix ? prefix + "[" + p + "]" : p,
      v = obj[p];
    str.push(typeof v == "object" ? $.param(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
  }
  return str.join("&");
};
$.ajax = function(a, b, c, d) {
  var xhr = new XMLHttpRequest();
  // 1 == post, 0 == get
  var type = (typeof(b) === 'object') ? 1 : 0;
  var gp = ['GET', 'POST'];
  xhr.open(gp[type], a, true);
  xhr.responseType = (typeof(c) === 'string') ? c : '';
  var cb = (!type) ? b : c;
  xhr.onerror = function() {
    cb(this, true);
  };
  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        cb(JSON.parse(this.response), false);
      } else {
        cb(this, true);
      }
    }
  };
  if (type) {
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send($.param(b));
  } else {
    xhr.send();
  }
  xhr = null;
};
$.prototype.serialize = function() {
  var form = this[0];
  if (!form || form.nodeName !== "FORM") {
    return;
  }
  var i, j,
    obj = {};
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].name === "") {
      continue;
    }
    switch (form.elements[i].nodeName) {
      case 'INPUT':
        switch (form.elements[i].type) {
          case 'text':
          case 'email':
          case 'hidden':
          case 'password':
          case 'button':
          case 'reset':
          case 'submit':
            obj[form.elements[i].name] = form.elements[i].value;
            break;
          case 'checkbox':
          case 'radio':
            if (form.elements[i].checked) {
              obj[form.elements[i].name] = form.elements[i].value;
            }
            break;
          case 'file':
            break;
        }
        break;
      case 'TEXTAREA':
        obj[form.elements[i].name] = form.elements[i].value;
        break;
      case 'SELECT':
        switch (form.elements[i].type) {
          case 'select-one':
            obj[form.elements[i].name] = form.elements[i].value;
            break;
          case 'select-multiple':
            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
              if (form.elements[i].options[j].selected) {
                obj[form.elements[i].name] = form.elements[i].options[j].value;
              }
            }
            break;
        }
        break;
      case 'BUTTON':
        switch (form.elements[i].type) {
          case 'reset':
          case 'submit':
          case 'button':
            obj[form.elements[i].name] = form.elements[i].value;
            break;
        }
        break;
    }
  }
  return obj;
};

module.exports = $;
