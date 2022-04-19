import {
  AddProofModel,
  VerifyingModel,
  CanonicalModel,
  MintPoapModel,
} from "../../database/init";
import { TModel } from "../../database/types";

/**
 * Used to set the database entity corresponding to each event.
 * return a map and it will use in Contract class.
 * @export
 * @return {*}  {Map<string, TModel>}
 */
export function EventAndModel(): Map<string, TModel> {
  const EventAndModels: Map<string, TModel> = new Map<string, TModel>();

  EventAndModels.set("AddProof", AddProofModel);
  EventAndModels.set("Verifying", VerifyingModel);
  EventAndModels.set("Canonical", CanonicalModel);
  EventAndModels.set("MintPoap", MintPoapModel);

  return EventAndModels;
}
// delete this array and use EventAndModels.get(), because it is same as map key.
// if one contract need to listen more the
export const EventFilter = ["AddProof", "Verifying", "Canonical", "MintPoap"];
