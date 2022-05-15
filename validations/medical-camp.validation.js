import Joi from "joi-browser";
import {errorNotification} from "~/components/fundamentals/notification/notification";

const schema = {
  campType: Joi.string().required().label("Service Type"),
  name: Joi.string().required().label("Name"),
  email: Joi.string().required().email({minDomainAtoms: 2}).label("Email"),
  description: Joi.string().required().label("Description"),
  phoneNo: Joi.number().required().label("Phone Number"),
  city: Joi.string().required().label("City"),
  fullAddress: Joi.string().required().label("Full Address"),
  images: Joi.array()
    .min(1)
    .required()
    .error(new Error("Attach at least one image")),

  startDate: Joi.string().required().label("Start Date"),
  endDate: Joi.string().optional().label("End Date").allow("").allow(null),
  startTime: Joi.string().required().label("Start Time"),
  endTime: Joi.string().required().label("End Time"),
  doctors: Joi.array().min(0).optional().allow(null),
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
    handleError(name, result?.error?.details[0].message);
  } else handleError(name, "");
};

export const verifyPayload = (payload) => {
  const result = Joi.validate(payload, schema);
  if (result.error) {
    errorNotification("Failed", result?.error?.details[0].message);
    return false;
  }
  return true;
};
