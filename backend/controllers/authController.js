const Owner = require('../models/Owner');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Register owner
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, uuid, email, password, contactLanguage, phoneNumber } = req.body;

  const owner = await Owner.create({
    name,
    uuid,
    email,
    password,
    contactLanguage,
    phoneNumber
  });

  sendTokenResponse(owner, 200, res);
});

// @desc    Login owner
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  const owner = await Owner.findOne({ email }).select('+password');

  if (!owner) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = await owner.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(owner, 200, res);
});

// @desc    Log owner out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get current logged in owner
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const owner = await Owner.findById(req.owner.id);

  res.status(200).json({
    success: true,
    data: owner
  });
});

const sendTokenResponse = (owner, statusCode, res) => {
  const token = owner.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};