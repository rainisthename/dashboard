const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Make the user information available in the request object
    req.user = decodedToken.UserInfo;
    next();
  } catch (error) {
    console.error(error);

    // Use 401 for both missing and invalid tokens
    return res.status(401).json({ message: 'Unauthorized: Access token is missing or invalid' });
  }
};

module.exports = verifyJWT;
