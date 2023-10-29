import { Types } from "mongoose";
const validateMongoDbId = (id) => {
  const isValid = Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("This id is not valid or not Found");
};
export default validateMongoDbId;
