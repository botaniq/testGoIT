class StringBuilder {
  constructor(baseString = '') {
    this.value = baseString;
  }

  append(str) {
    validateString(str);
    this.value += str;
    return this;
  }

  prepend(str) {
    validateString(str);
    this.value = str + this.value;
    return this;
  }

  pad(str) {
    validateString(str);
    this.value = str + this.value + str;
    return this;
  }
}

const builder = new StringBuilder('.');

builder
  .append('^')
  .prepend('^')
  .pad('=');

console.log(builder);

function validateString(str) {
  if (typeof str !== 'string') {
    throw new Error('Param must be a string!');
  }
}
