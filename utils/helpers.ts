import jwt from "jsonwebtoken";

export const signToken = (id: string) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_STR || "", {
    expiresIn: process.env.TOKEN_EXP || "",
  });
};

export const filterBody = (body: any, ...allowedFields: string[]) => {
  const finalObj: any = {};

  Object.keys(body).forEach((key: string) => {
    if (allowedFields.includes(key)) finalObj[key] = body[key];
  });

  return finalObj;
};
