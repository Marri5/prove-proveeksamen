const Reindeer = require('../models/Reindeer');
const Herd = require('../models/Herd');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getReindeers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

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


exports.createReindeer = asyncHandler(async (req, res, next) => {
  const herd = await Herd.findById(req.body.flokk);

  if (!herd) {
    return next(
      new ErrorResponse(`Herd not found with id of ${req.body.flokk}`, 404)
    );
  }

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