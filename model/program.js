const { ProgramModel } = require("../Schema/init");

/**
 *
 * Get all programs
 * @return {*}
 */
async function getAllPrograms() {
  return new Promise((resolve, reject) => {
    ProgramModel.find((err, res) => {
      if (err) {
        // TODO Err
      }
      resolve(res);
    });
  });
}

module.exports = {
  getAllPrograms: getAllPrograms,
};
