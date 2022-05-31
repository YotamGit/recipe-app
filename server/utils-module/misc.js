import mongoose from "mongoose";

export function isValidObjectId(id) {
  let ObjectId = mongoose.Types.ObjectId;

  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}
