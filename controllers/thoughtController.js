const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThought(req, res) {
    try {
      const thought = await Thought.find({})
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {

      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        {_id: req.body.userId},
        {$push: {thoughts: _id}},
        {new: true}
      );
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$set: req.body},
        {runValidators: true, new: true}
      )
      res.json(thought)
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      await User.findOneAndUpdate(
        {thoughts: req.params.thoughId},
        {$pull: {thoughts: req.params.thoughId}},
        {new: true}
      );
    
      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create reaction
  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: {reactions: req.body}},
        {runValidators: true, new: true}
      )
      res.json(reaction)
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        {_id: req.params.thoughId},
        {$pull: {reactions: {reactionId: req.params.reactionId}}},
        {runValidators: true, new: true}
      )
      res.json(reaction)
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
