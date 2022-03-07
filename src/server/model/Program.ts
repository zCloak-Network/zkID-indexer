import { ProgramModel } from "../../database/init";

/**
 *
 * Get all programs
 * @return {*}
 */
async function getAllPrograms() {
  return new Promise((resolve, reject) => {
    ProgramModel.find((err: any, res: any) => {
      if (err) {
        // TODO Err
      }
      resolve(res);
    });
  });
}

const Program = {
  getAllPrograms: getAllPrograms,
};

export default Program;
