const ProgramModel = require("../model/program");

async function getAllPrograms() {
  return await ProgramModel.getAllPrograms();
}

module.exports = {
  getAllPrograms: getAllPrograms,
};
