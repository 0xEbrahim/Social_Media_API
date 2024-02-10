import jwt from "jsonwebtoken";

const createAccessToken = async (userId) => {
  return await jwt.sign({ id: userId }, process.env.JWT_ACC_TOKEN, {
    expiresIn: "1d",
  });
};

const createRefreshToken = async (userId) => {
  return await jwt.sign({ id: userId }, process.env.JWT_REF_TOKEN, {
    expiresIn: "90d",
  });
};

const verifyAccessToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_ACC_TOKEN);
};

const verifyRefreshToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_REF_TOKEN);
};

export {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
