const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  // const token = req.cookies.token;
  console.log("🚀 ~ authUser ~ token:", token)

  if (!token) {
    return res.status(401).json({ msg: "No token provided, authorization denied" });
  }

  try {
    const secretKey = "society_management";
    const userData = jwt.verify(token, secretKey);
    console.log("🚀 ~ authUser ~ userData:", userData)

    req.user = userData;
    next();
  } catch (err) {
    console.log("🚀 ~ authUser ~ err:", err)
    return res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = {
  authUser
};
