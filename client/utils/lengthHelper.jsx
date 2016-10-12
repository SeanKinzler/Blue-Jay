
const checkLength = (string, length) => {
  if (string === null || string === undefined) {string = ''}
  if (string.length >= length) {
    return string.slice(0, length) + '...';
  } else {
    return string;
  }
};

export default checkLength;