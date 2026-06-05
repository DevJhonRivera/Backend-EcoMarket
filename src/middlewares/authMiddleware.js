import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // Verificar si viene el token en Authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Si no existe token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No autorizado, token no proporcionado",
      });
    }

    // Verificar token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Buscar usuario
    const user = await User.findById(
      decoded.id
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    // Verificar si está activo
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Cuenta desactivada",
      });
    }

    // Guardar usuario en request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
};

export default protect;