const { Reaction, Thought } = require('../models');

const reactionController = {
  // Get all reactions
  getAllReactions(req, res) {
    Reaction.find({})
      .select('-__v')
      .then(dbReactionData => res.json(dbReactionData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get one reaction by id
  getReactionById({ params }, res) {
    Reaction.findOne({ _id: params.reactionId })
      .select('-__v')
      .then(dbReactionData => {
        if (!dbReactionData) {
          res.status(404).json({ message: 'No reaction found with this id!' });
          return;
        }
        res.json(dbReactionData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Create a new reaction
  createReaction({ params, body }, res) {
    Reaction.create(body)
      .then(({ _id }) => {
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // Delete a reaction by id
  deleteReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.reactionId })
      .then(deletedReaction => {
        if (!deletedReaction) {
          return res.status(404).json({ message: 'No reaction found with this id!' });
        }
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: params.reactionId } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = reactionController;
