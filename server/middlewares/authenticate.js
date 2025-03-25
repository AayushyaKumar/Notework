const { promisify } = require("util");
const jwt = require('jsonwebtoken')
exports.protectedRoute = async (req, res, next) => {
    try {
      
       const token = req.cookies.JWT
     
      if (!token) {
        return res.status(401).json({ message: 'No jwt provided' });
      }
      
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      
      console.log(decoded)
     userId = decoded.id
     console.log(userId)

      next();
    } catch ({ name, message }) {
      res.status(401).json({
        status: name,
        message,
      });
    }
  };
  