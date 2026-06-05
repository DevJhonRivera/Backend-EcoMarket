const authorize = (...roles) => {
  return (req, res, next ) => {
    try {
      // Verificar que exista usuario autenticado
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
      }

      // Verificar rol permitido
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `El rol '${req.user.role}' no tiene permisos para acceder a este recurso`,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default authorize;