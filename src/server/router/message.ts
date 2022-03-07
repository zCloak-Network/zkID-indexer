// TODO add more code and message
const succees = [200];
const failed = [500];

function message(code: number, message: string, data?: any) {
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

export default message;
