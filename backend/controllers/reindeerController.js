const Reindeer = require('../models/Reindeer');
const Herd = require('../models/Herd');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all reindeers
// @route   GET /api/v1/reindeers
// @access  Public
exports.getReindeers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single reindeer
// @route   GET /api/v1/reindeers/:id
// @access  Public
exports.getReindeer = asyncHandler(async (req, res, next) => {
  const reindeer = await Reindeer.findById(req.params.id).populate({
    path: 'flokk',
    select: 'name owner'
  });

  if (!reindeer) {
    return next(
      new ErrorResponse(`Reindeer not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: reindeer
  });
});

// @desc    Create new reindeer
// @route   POST /api/v1/reindeers
// @access  Private
exports.createReindeer = asyncHandler(async (req, res, next) => {
  // Check if herd belongs to owner
  const herd = await Herd.findById(req.body.flokk);

  if (!herd) {
    return next(
      new ErrorResponse(`Herd not found with id of ${req.body.flokk}`, 404)
    );
  }

  // Make sure owner owns herd
  if (herd.owner.toString() !== req.owner.id) {
    return next(
      new ErrorResponse(`Owner ${req.owner.id} is not authorized to add a reindeer to this herd`, 401)
    );
  }

  const reindeer = await Reindeer.create(req.body);

  res.status(201).json({
    success: true,
    data: reindeer
  });
});

// @desc    Search for reindeers
// @route   GET /api/v1/reindeers/search
// @access  Public
exports.searchReindeers = asyncHandler(async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return next(new ErrorResponse('Please provide a search query', 400));
  }

  const reindeers = await Reindeer.find({
    $or: [
      { serialNumber: { $regex: query, $options: 'i' } },
      { name: { $regex: query, $options: 'i' } }
    ]
  }).populate({
    path: 'flokk',
    select: 'name owner',
    populate: {
      path: 'owner',
      select: 'name contactLanguage'
    }
  });

  res.status(200).json({
    success: true,
    count: reindeers.length,
    data: reindeers
  });
});