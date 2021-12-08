// TODO add more code and message
const succees = [200];
const failed = [500];

function message(code, message, data) {
  if (succees.indexOf(code) !== -1) {
    return {
      code: code,
      message: message,
      data: data,
    };
  } else {
    return {
      code: code,
      message: message,
    };
  }
}

module.exports = message;
