const Token = require("../model/token");

async function getAllTokens() {
  return await Token.getAllTokens();
}

async function getTokenRule(tokenAddress) {
  const tokenRule = await Token.getTokenRule(tokenAddress);

  if (tokenRule.length) {
    tokenRule[0].programDetails = tokenRule[0].programDetails[0];
    return tokenRule[0];
  }
  return tokenRule;
}

module.exports = {
  getAllTokens: getAllTokens,
  getTokenRule: getTokenRule,
};
