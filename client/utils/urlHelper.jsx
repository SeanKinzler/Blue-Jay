import axios from 'axios';

const slugify = (string) => {
  return string.split(' ').join('_');
};

const deslugify = (slug) => {
  var string = slug.slice(0).split('_');
  string.forEach(function (word) {
    word = word[0].toUpperCase() + word.slice(1);
  });

  return string.join(' ');
};

export default {
  slugify: slugify,
  deslugify: deslugify,
};
