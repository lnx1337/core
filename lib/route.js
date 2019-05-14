function route(a, f) {
  var g = [];
  var b = window.location.hash.replace(/^.*#/,""); 
  var e = a.split("/").length-1;
  var d = b.split("/").length-1;
  var c = new RegExp(a.replace(/:[name]+/g, "([\\a-z-]+)").replace(/:[id]+/g, "([\\d]+)"));
  if (b.match(c)) {
    if (e === d) {
      g = b.match(c);
      return f(g);
    }
  }
}

module.exports = route;