import Program from "../model/Program";

async function getAllPrograms() {
  return await Program.getAllPrograms();
}

const ProgramController = {
  getAllPrograms: getAllPrograms,
};

export default ProgramController;
