import Joi from "joi-browser";
import {errorNotification} from "~/components/fundamentals/notification/notification";

const schema = {
  serviceType: Joi.string().required().label("Service Type"),
  name: Joi.string().required().label("Name"),
  email: Joi.string().required().email({minDomainAtoms: 2}).label("Email"),
  description: Joi.string().required().label("Description"),
  phoneNo: Joi.number().required().label("Phone Number"),
  city: Joi.string().required().label("City"),
  fullAddress: Joi.string().required().label("Full Address"),
  images: Joi.string().required().error(new Error("Attach at least one image")),
  workingDays: Joi.array()
    .min(1)
    .required()
    .error(new Error("Add at least one working day")),
  fullDay: Joi.boolean().required().label("24 hours Service"),
  endTime: Joi.string().optional().label("endTime").allow(null).allow(""),
  startTime: Joi.string().optional().label("startTime").allow(null).allow(""),
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
    if (name === "workingDays") handleError(name, result.error.message);
    else handleError(name, result?.error?.details[0].message);
  } else handleError(name, "");
};

export const verifyPayload = (payload) => {
  const result = Joi.validate(payload, schema);
  if (result.error) {
    let error = getError(result.error);
    errorNotification("Failed", error || "Error occured");
    return false;
  }
  return true;
};

const getError = (error) => {
  if (Array.isArray(error.default) && error?.default[0] != undefined)
    return error.default[0];
  else return error.message;
};
