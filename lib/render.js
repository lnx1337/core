var Handlebars = require('./hbs');

var Render = {

  cache : null,

  page: function(req, callback){
    var route = req.route;
    var path = (req.params.id || req.params.title);
    // TODO :
    // - add 'default' route case
    if (route === "/") route = '/home';
    // - replace :id in route by the current section's id to get the template
    // not sure if it's the best way to do it tho...
    if(path) {
      route = route.substring(0, route.length - 7); // needs to be ':id' in routes.js
      route += path;
    }
    // create page
    var page = document.createElement('div');
    if (req.params.query === 'detail') {
      page.style.overflow = 'hidden';
      page.style.width = '100%';
      page.style.height = '100%';
      page.style.position = 'fixed';
    }
    page.className = 'loading ' + path;
    return document.body.appendChild(page);
  },
  options : function(req, view, model, callback) {
    var self  = this;
    var path  = (req.params.id || req.params.title);
    var query = req.params.query || path;
    var page  = document.createElement('div');
    page.id = 'grid-options';
    if (self.cache) {
      var html = Handlebars({ dataHBS: view, model: self.cache });
      page.innerHTML = html;
    } else {
      page.innerHTML = view;
    } 
    setTimeout(callback, 0);
    return document.body.appendChild(page);
  },
  block : function(req, view, model, selector, pckry, callback) {
    var path  = (req.params.id || req.params.title);
    var query = req.params.query || path;
    model[query](req, function(err, r) {
      var html = Handlebars({ dataHBS: view, model: r });
      console.log(html);
      selector.insertAdjacentHTML('beforeend', html);
      self.divs = selector.querySelectorAll('.block.loading');
      pckry.appended(self.divs);
      callback();
    });
  },
  html: function(req, views, view, model, callback) {
    var self  = this;
    var page  = null;
    var path  = (req.params.id || req.params.title);
    var query = req.params.query || path;
    page = self.page(req, callback);
    if (html) {
      page.innerHTML = html;
    }
    callback();
    return page;
  },  
  model: function(req, views, view, model, callback) {
    var self  = this;
    var page  = null;
    var path  = (req.params.id || req.params.title);
    var query = req.params.query || path;
    page = self.page(req, callback);
    if (model && view) {
      model[query](req, function(err, r) {
        var html = Handlebars({ dataHBS: view, model: r, partials: views });
        self.cache = r;
        page.innerHTML = html;
        setTimeout(callback, 0);
      });
    } else if (view) {
      page.innerHTML = view;
      setTimeout(callback, 0);
    }
    return page;
  }
};
module.exports = Render;
