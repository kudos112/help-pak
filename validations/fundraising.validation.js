import Joi from "joi-browser";
import {errorNotification} from "~/components/fundamentals/notification/notification";

const schema = {
  name: Joi.string().required().label("Fundraising Title"),
  description: Joi.string().required().label("Description"),
  city: Joi.string().required().label("City"),
  fullAddress: Joi.string().required().label("Full Address"),
  reason: Joi.string().required().label("Fundraising Reason"),
  email: Joi.string().email().required().label("Email"),
  phoneNo: Joi.string().required().allow(null).allow("").label("Phone Number"),
  amount: Joi.string().required().label("Fundraising Amount"),
  paymentMethods: Joi.array()
    .required()
    .items(
      Joi.object().keys({
        bankName: Joi.string().required(),
        accountName: Joi.string().required(),
        accountNo: Joi.string().required(),
      })
    ),
};

const updateSchema = {
  // name: Joi.string().required().label("Fundraising Title"),
  description: Joi.string().required().label("Description"),
  city: Joi.string().required().label("City"),
  fullAddress: Joi.string().required().label("Full Address"),
  reason: Joi.string().required().label("Fundraising Reason"),
  email: Joi.string().email().required().label("Email"),
  phoneNo: Joi.string().required().allow(null).allow("").label("Phone Number"),
  amount: Joi.string().required().label("Fundraising Amount"),
  // paymentMethods: Joi.array()
  //   .required()
  //   .items(
  //     Joi.object().keys({
  //       bankName: Joi.string().required(),
  //       accountName: Joi.string().required(),
  //       accountNo: Joi.string().required(),
  //     })
  //   ),
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
    let error = getError(result.error);
    var matches = error.match(/\[(.*?)\]/);

    if (matches) {
      error = matches[1];
    }
    errorNotification("Failed", error);
    return true;
  }
  return false;
};

export const verifyUpdatePayload = (payload) => {
  const result = Joi.validate(payload, updateSchema);
  if (result.error) {
    let error = getError(result.error);
    var matches = error.match(/\[(.*?)\]/);

    if (matches) {
      error = matches[1];
    }
    errorNotification("Failed", error);
    return true;
  }
  return false;
};

const getError = (error) => {
  if (Array.isArray(error.default) && error?.default[0] != undefined)
    return error.default[0];
  else return error.message;
};
