import User from "../models/User.js";
import generateToken from "../utils/generarToken.js";

export const register = async (req, res,next) => {
  try {
    const {
      username,
      email,
      password,
      role,
    } = req.body;
    
    const existingUser =
    await User.findOne({
      $or: [
        { email },
        { username },
      ],
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
        "El usuario o correo ya existe",
      });
    }
    const userSave = {
      username:username,
      email:email,
      password:password,
      role:role
    };
    
    const user = new User(userSave);
    const response = await user.save();
    console.log(req.body)
    
    const token = generateToken(
      user._id,
      user.role
    );

    res.status(201).json({
      success: true,
      message:
        "Usuario registrado correctamente",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Credenciales inválidas",
      });
    }

    const isMatch =
      await user.comparePassword(
        password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Credenciales inválidas",
      });
    }

    const token = generateToken(
      user._id,
      user.role
    );
console.log(token)
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username:
          user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const updateProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "Usuario no encontrado",
        });
      }

      user.username =
        req.body.username ||
        user.username;

      user.email =
        req.body.email ||
        user.email;

      user.phone =
        req.body.phone ||
        user.phone;

      user.city =
        req.body.city ||
        user.city;

      user.profileImage =
        req.body.profileImage ||
        user.profileImage;

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Perfil actualizado",
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
export const changePassword =
  async (req, res) => {
    try {
      const {
        currentPassword,
        newPassword,
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      const isMatch =
        await user.comparePassword(
          currentPassword
        );

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message:
            "Contraseña actual incorrecta",
        });
      }

      user.password =
        newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Contraseña actualizada",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const deactivateAccount =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        );

      user.isActive = false;

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Cuenta desactivada",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };