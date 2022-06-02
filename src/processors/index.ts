import AddProofProcessors from "./AddProofProcessors";
import VerifyingProcessors from "./VerifyingProcessors";
import MintPoapProcessors from "./MintPoapProcessors";
import CanonicalProcessors from "./CanonicalProcessors";
import { IProcessor } from "./processorsInterface";

function getProcessors(): Array<IProcessor<any>> {
  const processors: Array<IProcessor<any>> = [];

  processors.push(new AddProofProcessors());
  processors.push(new VerifyingProcessors());
  processors.push(new MintPoapProcessors());
  processors.push(new CanonicalProcessors());

  return processors;
}

export default getProcessors();
