const router = require('express').Router();
const {
  getAllReactions,
  getReactionById,
  createReaction,
  deleteReaction
} = require('../../controllers/reactionController');

// Set up GET all and POST at /api/reactions
router
  .route('/')
  .get(getAllReactions)
  .post(createReaction);

// Set up GET one and DELETE at /api/reactions/:reactionId
router
  .route('/:reactionId')
  .get(getReactionById)
  .delete(deleteReaction);

module.exports = router;
