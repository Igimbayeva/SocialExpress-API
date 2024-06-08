const mongoose = require('mongoose');
const { User, Thought, Reaction } = require('../models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const userData = [
  {
    username: 'user1',
    email: 'user1@example.com'
  },
  {
    username: 'user2',
    email: 'user2@example.com'
  }
];

const thoughtData = [
  {
    thoughtText: 'Thought 1',
    username: 'user1'
  },
  {
    thoughtText: 'Thought 2',
    username: 'user2'
  }
];

const reactionData = [
  {
    reactionBody: 'Reaction 1',
    username: 'user1'
  },
  {
    reactionBody: 'Reaction 2',
    username: 'user2'
  }
];

const seedDatabase = async () => {
  try {
    await User.deleteMany();
    await Thought.deleteMany();
    await Reaction.deleteMany();

    const createdUsers = await User.insertMany(userData);
    const createdThoughts = await Thought.insertMany(thoughtData);
    const createdReactions = await Reaction.insertMany(reactionData);

    for (let i = 0; i < createdThoughts.length; i++) {
      const thought = createdThoughts[i];
      const user = createdUsers.find(user => user.username === thought.username);
      user.thoughts.push(thought);
      await user.save();
    }

    for (let i = 0; i < createdReactions.length; i++) {
      const reaction = createdReactions[i];
      const thought = createdThoughts[i];
      thought.reactions.push(reaction);
      await thought.save();
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
