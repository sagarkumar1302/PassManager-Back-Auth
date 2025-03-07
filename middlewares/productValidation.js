const jwt = require("jsonwebtoken");
const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  //   const auth = req.headers;
  console.log(auth);
  
  if (!auth ) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is require" });
  }
//   const aauth = auth.split(" ")[1];
//   console.log(aauth);
  try {
    console.log(process.env.JWT_SECRET + "process");
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    console.log(decoded);

    req.user = decoded;
    next();
  } catch {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token was wrong." });
  }
};
module.exports = ensureAuthenticated;
