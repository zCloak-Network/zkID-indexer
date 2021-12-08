const { TokenModel, TokenProgramRulesModel } = require("../Schema/init");

/**
 *
 * Get all tokens
 * @return {*}
 */
async function getAllTokens() {
  return new Promise((resolve, reject) => {
    TokenModel.find((err, result) => {
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
async function getTokenRule(tokenAddress) {
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
      (err, result) => {
        if (err) {
          // TODO err
        }
        resolve(result);
      }
    );
  });
}

module.exports = {
  getAllTokens: getAllTokens,
  getTokenRule: getTokenRule,
};
