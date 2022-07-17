/* eslint-disable no-throw-literal */
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const auth = async (req, res, next) => {
  try { 
    const token = req.headers["authorization"];
    const decoded  = jwt.verify(token, config.jwt.SECRET_KEY);
    req.body.EMAIL = decoded.EMAIL;
    next()
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

module.exports = auth;