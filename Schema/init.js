const mongoose = require("mongoose");
const {
  ProofsSchema,
  WorkerResultSchema,
  CtypeSchema,
  TokenSchema,
  TransferSchema,
  ProgramSchema,
  TokenProgramRulesSchema,
} = require("./zCloakSchemas");

mongoose
  .connect("mongodb://127.0.0.1:2888/zCloak", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

module.exports = {
  ProofModel: mongoose.model("proofs", ProofsSchema),
  WorkerResult: mongoose.model("worker_result", WorkerResultSchema),
  CtypeModel: mongoose.model("ctype", CtypeSchema),
  TokenModel: mongoose.model("token", TokenSchema),
  TransferModel: mongoose.model("transfer", TransferSchema),
  ProgramModel: mongoose.model("program", ProgramSchema),
  TokenProgramRulesModel: mongoose.model(
    "token_program_rules",
    TokenProgramRulesSchema
  ),
};
