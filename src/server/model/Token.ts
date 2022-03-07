import { TokenModel, TokenProgramRulesModel } from "../../database/init";

/**
 *
 * Get all tokens
 * @return {*}
 */
async function getAllTokens() {
  return new Promise((resolve, reject) => {
    TokenModel.find((err: any, result: string) => {
      if (err) {
        // TODO err
      }
      resolve(result);
    });
  });
}

/**
 *
 * Obtain the corresponding program and ctype according to the token address
 * @param {*} tokenAddress
 * @return {*}
 */
async function getTokenRule(tokenAddress: any) {
  return new Promise((resolve, reject) => {
    TokenProgramRulesModel.aggregate(
      [
        {
          $match: { tokenAddress: tokenAddress },
        },
        {
          $lookup: {
            from: "programs",
            localField: "programHash",
            foreignField: "programHash",
            as: "programDetails",
          },
        },
      ],
      (err: any, result: any) => {
        if (err) {
          // TODO err
        }
        resolve(result);
      }
    );
  });
}

const Token = {
  getAllTokens: getAllTokens,
  getTokenRule: getTokenRule,
};

export default Token;
