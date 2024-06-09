const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).send('Access denied. No token provided.');
  }

  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access denied. Invalid token.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 

    
    if (req.params.id && req.method === 'PUT' && req.user.userId !== parseInt(req.params.id, 10)) {
      return res.status(403).send("You are not authorized to update this user.");
    }

    next(); 
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = authMiddleware;
