const { Thought, Application } = require('../models');

module.exports = {

  getThoughts(req, res) {
    Thought.find()
      .then((Thought) => res.json(Thought))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((Thought) => res.json(Thought))
      .catch((err) => res.status(500).json(err));
  },
  
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { responses: req.body } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Application.deleteMany({ _id: { $in: Thought.applications } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
      !Thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },

};