import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailverify/verifyEmail.js";
import { session } from "../models/sessionModel.js";
import { sendOtpMail } from "../emailverify/sendOtpMail.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      res.status(404).json({
        success: false,
        message: "All feilds are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    console.log("User registered:", newUser.email);

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });

    await verifyEmail(token, email); //send verification email here

    newUser.token = token; //save token
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(404).json({
        success: false,
        message: "Authorization token missing or invalid",
      });
    }
    const token = authHeader.split(" ")[1]; //[Bearer,token(vyjgjbhvcfg)]
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The regsitration token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Token verification failed",
      });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    user.token = null;
    user.isVerified = true;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const reVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User is already verified",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email);
    user.token = token;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "verification email sent again successfully",
      token: user.token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All feild are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not exist",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials ",
      });
    }
    if (existingUser.isVerified == false) {
      return res.status(400).json({
        success: false,
        message: "Verify your email",
      });
    }
    //generate token as now user is valid
    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "10d" },
    );
    const refreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" },
    );
    existingUser.isLoggedIn = true;
    await existingUser.save();
    //check for existing session and delete it
    const existingSession = await session.findOne({ userId: existingUser._id });
    if (existingSession) {
      await session.deleteOne({ userId: existingUser._id });
    }
    //create a new session
    await session.create({ userId: existingUser._id });
    return res.status(200).json({
      success: true,
      message: `welcome back ${existingUser.firstName}`,
      //passing inside user
      user: existingUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    const userId = req.id;
    await session.deleteMany({ userId: userId });
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });
    return res.status(200).json({
      success: true,
      message: "user logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); //10 minute
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    await sendOtpMail(otp, email);

    return res.status(200).json({
      success: true,
      message: "otp sent to email successfullyy",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // const email = req.params.email
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "otp is required",
      });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "otp is not generated or already verified",
      });
    }
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "otp has expired please request new one",
      });
    }
    if (otp.trim() !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "otp is invalid",
      });
    }

    // if (otp !== user.otp) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "otp is invalid",
    //   });
    // }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "otp verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const verifyOtp = async (req, res) => {
//   try {
//     const { otp, email } = req.body;

//     if (!otp || !email) {
//       return res.status(400).json({
//         success: false,
//         message: "email and otp are required",
//       });
//     }

//     const normalizedEmail = email.trim().toLowerCase();
//     const otpNumber = Number(otp);

//     const user = await User.findOne({ email: normalizedEmail });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "user not found",
//       });
//     }

//     if (!user.otp || !user.otpExpiry) {
//       return res.status(400).json({
//         success: false,
//         message: "otp not generated or already verified",
//       });
//     }

//     if (user.otpExpiry < new Date()) {
//       return res.status(400).json({
//         success: false,
//         message: "otp has expired, request a new one",
//       });
//     }

//     if (otpNumber !== user.otp) {
//       return res.status(400).json({
//         success: false,
//         message: "otp is invalid",
//       });
//     }

//     user.otp = null;
//     user.otpExpiry = null;
//     user.isVerified = true;

//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: "otp verified successfully",
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const changePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "all feilds are required",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password not matching",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const allUser = async (_, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const { user } = await User.findById(userId).select(
      "-password -otp -otpExpiry -token",
    );
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userIdToUpdate = req.params.id; //the id of user we want to update
    const loggedInUser = req.user; //from isauthenticated middleware
    const { firstName, lastName, address, city, phonenumber, pincode, role } =
      req.body;
    if (
      loggedInUser._id.toString() !== userIdToUpdate &&
      loggedInUser.role != "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "you are not allowed to update this profile",
      });
    }
    let user = await User.findById(userIdToUpdate);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    let profilePicUrl = user.profilePic;
    let profilePicPublicId = user.profilePicPublicId;

    //if a new files is uploaded
    if (req.file) {
      if (profilePicPublicId) {
        await cloudinary.uploader.destroy(profilePicPublicId);
      }
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.end(req.file.buffer);
      });
      profilePicUrl = uploadResult.secure_url;
      profilePicPublicId = uploadResult.public_id;
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.city = city || user.city;
    user.phonenumber = phonenumber || user.phonenumber;
    user.pincode = pincode || user.pincode;
    user.role = role;
    user.profilePic = profilePicUrl;
    user.profilePicPublicId = profilePicPublicId;

    const updatedUser = await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
