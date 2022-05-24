import Joi from "joi-browser";
import {errorNotification} from "~/components/fundamentals/notification/notification";

const schema = {
  name: Joi.string().required().label("Name"),
  description: Joi.string().required().label("Description"),
  city: Joi.string().required().label("City"),
  fullAddress: Joi.string().required().label("Full Address"),
  category: Joi.string().required().label("Category"),
  condition: Joi.string().required().label("Condition"),
  phoneNo: Joi.string().required().allow(null).allow("").label("Phone Number"),
};

export const validatePropery = (name, value, handleError) => {
  const obj = {
    [name]: value,
  };
  const fieldSchema = {
    [name]: schema[name],
  };
  //return result
  const result = Joi.validate(obj, fieldSchema);
  if (result.error) {
    handleError(`${name}`, result?.error?.details[0].message);
  } else handleError(name, "");
};

export const verifyPayload = (payload) => {
  const result = Joi.validate(payload, schema);
  if (result.error) {
    errorNotification("Failed", result?.error?.details[0].message);
    return true;
  }
  return false;
};
