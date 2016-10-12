var regex = new RegExp(/[^a-z0-9 '!?/_:.,&-]+/gi);


var screen = function (text) {
  return regex.test(text);
};

var scrub = function (text) {
  return text.replace(regex, '');
};


module.exports = {
  screen: screen,
  scrub: scrub,
};


