const Token = require("../model/token");

async function getAllTokens() {
  return await Token.getAllTokens();
}

async function getTokenRule(tokenAddress: any) {
  const tokenRule = await Token.getTokenRule(tokenAddress);

  if (tokenRule.length) {
    tokenRule[0].programDetails = tokenRule[0].programDetails[0];
    return tokenRule[0];
  }
  return tokenRule;
}

const TokenController = {
  getAllTokens: getAllTokens,
  getTokenRule: getTokenRule,
};

export default TokenController;
