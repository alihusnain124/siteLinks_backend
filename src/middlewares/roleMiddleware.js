export const checkRole = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return errorResponse(res,401,'Authentication required')
      }

      const allowedRoles = Array.isArray(roles) ? roles : [roles];

      if (!allowedRoles.includes(req.user.role)) {
         return errorResponse(res,403,'Access denied. Insufficient permissions.')
      }

      next();
    } catch (error) {
      return errorResponse(res,500,'Authorization error',error.message);
    }
  };
};

export const isAdmin = checkRole('admin');

export const isAuthenticated = (req, res, next) => {
  if (!req.user) {
  return errorResponse(res,401,'Authentication required')
  }
  next();
};
