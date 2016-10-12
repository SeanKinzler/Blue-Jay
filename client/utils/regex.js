var regex = new RegExp(/[^a-z0-9 '!?.,&-]+/gi);


var screen = function (text) {
  return regex.test(text);
};

var scrub = function (text) {
  return text.replace(regex, '');
};


console.log(scrub('hello'));
console.log(scrub('What\'s going on, guys? <script>killme</script>'));

module.exports = screen;


