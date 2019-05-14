var Handlebars = require('handlebars');

function ns(ns) {
  var n = ns.split('/');
  var o = "['"+[n[0]]+"']";
  for(var i = 1; i < n.length; i++) {
    o += "['"+[n[i]]+"']";
  }
  return o;
}
function handlebars(data) {
  // Partials
  var partials = data.dataHBS.match(/{{>\s?([^}]*)\s?}}/);
  if (partials && data.partials) {
    for (i in partials) {
      if (i > 0) {
        var view = eval('data.partials' + ns(partials[i]));
        Handlebars.registerPartial(partials[i], view);
      }
    }
  }
  // Helpers
  Handlebars.registerHelper('is', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  Handlebars.registerHelper("cdn", function (v) {
    var cdn = 'https://4a1e70ba250472b18020-710c152fdea160d64661dc05136089d3.ssl.cf1.rackcdn.com/';
    var re = new RegExp("^(http|https)://", "i");
    if (re.test(v)) {
      console.log(v);
      return v;
    } else {
      return cdn + v;
    }
  });
  // Compile
  return Handlebars.compile( data.dataHBS )( data.model );
}

module.exports = handlebars;