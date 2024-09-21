// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const LoginData = require("./../Model/adminLoginSchema");

// module.exports.register = async (req, res) => {
//   const { Name, Email, Phone, Password, Role, SuperAdmin } = req.body;

//   try {
//     // Check if the user already exists
//     let user = await LoginData.findOne({ Email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(Password, salt);

//     // Create new user
//     user = new LoginData({
//       Name,
//       Email,
//       Phone,
//       Password,
//       HashPassword: hashedPassword,
//       Role,
//       SuperAdmin,
//     });

//     await user.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error registering user:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports.login = async (req, res) => {
//   const { Email, Password } = req.body;

//   try {
//     // Check if user exists
//     const user = await LoginData.findOne({ Email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(Password, user.HashPassword);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT
//     const payload = {
//       user: {
//         Email: user.Email,
//         id: user.id,
//         SuperAdmin: user.SuperAdmin,
//       },
//     };

//     console.log(user.id);

//     jwt.sign(payload, "vvcm", { expiresIn: "12h" }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (error) {
//     console.error("Error logging in:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Delete User Controller
// module.exports.deleteUser = async (req, res) => {
//   const { Email } = req.params;
//   try {
//     const deletedUser = await LoginData.findOneAndDelete({ Email });
//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Update Password Controller
// module.exports.updatePassword = async (req, res) => {
//   const { Email, newPassword } = req.body;
//   try {
//     const user = await LoginData.findOne({ Email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.Password = newPassword;

//     const updatedUser = await user.save();
//     res
//       .status(200)
//       .json({ message: "Password updated successfully", user: updatedUser });
//   } catch (error) {
//     console.error("Error updating password:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports.user = async (req, res) => {
//   try {
//     console.log(req.user);
//     const userData = req.user;
//     console.log(userData);
//     return res.status(200).json({ userData });
//   } catch (error) {
//     console.error("Error while getting data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.getAdmins = async (req, res) => {
//   try {
//     const data = await LoginData.find();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const LoginData = require("./../Model/adminLoginSchema");

// Register User Controller
module.exports.register = async (req, res) => {
  const { Name, Email, Phone, Password, Role, Ward, SuperAdmin } = req.body;

  try {
    // Check if the user already exists
    let user = await LoginData.findOne({ Email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create new user
    user = new LoginData({
      Name,
      Email,
      Phone,
      Password, // Storing hashed password instead of plain text
      HashPassword: hashedPassword,
      Role,
      Ward,
      SuperAdmin,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User Controller
module.exports.login = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Check if user exists
    const user = await LoginData.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(Password, user.HashPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const payload = {
      user: {
        Email: user.Email,
        id: user.id,
        SuperAdmin: user.SuperAdmin,
      },
    };

    jwt.sign(payload, "vvcm", { expiresIn: "12h" }, (err, token) => {
      if (err) throw err;
      res.json({ token, data: user });
    });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete User Controller
module.exports.deleteUser = async (req, res) => {
  const { Email } = req.params;
  try {
    const deletedUser = await LoginData.findOneAndDelete({ Email });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Password Controller
module.exports.updatePassword = async (req, res) => {
  const { Email, newPassword } = req.body;
  try {
    const user = await LoginData.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.Password = hashedPassword;
    user.HashPassword = hashedPassword;

    const updatedUser = await user.save();
    res
      .status(200)
      .json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get User Data Controller
module.exports.user = async (req, res) => {
  try {
    const userData = req.user;
    res.status(200).json({ userData });
  } catch (error) {
    console.error("Error while getting data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Admins Controller
exports.getAdmins = async (req, res) => {
  try {
    const data = await LoginData.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
