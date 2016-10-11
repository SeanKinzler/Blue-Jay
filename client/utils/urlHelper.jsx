import axios from 'axios';

const slugify = (string) => {
  if (string) {
    return string.split(' ').join('_');
  } else {
    return '';
  }
};

const deslugify = (slug) => {
  if (slug) {
    var string = slug.slice(0).split('_');
    string.forEach(function (word) {
      word = word[0].toUpperCase() + word.slice(1);
    });

    return string.join(' ');
  } else {
    return '';
  }
};

export default {
  slugify: slugify,
  deslugify: deslugify,
};
