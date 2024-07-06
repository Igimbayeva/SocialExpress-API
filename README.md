# SocialExpress-API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Welcome to SocialExpress-API! <br>
This project is a powerful backend application designed to serve as the backbone of a dynamic social network platform. Users can create and share their thoughts, react to their friends' thoughts, and manage their friend lists with ease. <br>
Built with the robust combination of Node.js, Express.js, MongoDB, and Mongoose, SocialExpress-API provides fast and flexible RESTful API endpoints essential for modern social networking applications.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Video Tutorial](#video-tutorial)
- [GitHub Repository](#github-repository)

## Features
- User registration and profile management
- Create, read, update, and delete thoughts
- React to thoughts with reactions
- Manage friends list by adding and removing friends

## Installation
To get started with SocialExpress-API, follow these steps:

1. **Clone the repository**
    ```bash
    git clone https://github.com/Igimbayeva/SocialExpress-API.git
    cd SocialExpress-API
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up environment variables**
    Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_uri
    ```

4. **Run the server**
    ```bash
    node server.js 
    ```

## Usage
Once the server is running, you can use a tool like Insomnia or Postman to interact with the API endpoints. The base URL for the API is `http://localhost:3000`.

## API Endpoints

### Users
- **GET** `/api/users` - Get all users
- **GET** `/api/users/:id` - Get a single user by ID
- **POST** `/api/users` - Create a new user
- **PUT** `/api/users/:id` - Update a user by ID
- **DELETE** `/api/users/:id` - Delete a user by ID
- **POST** `/api/users/:userId/friends/:friendId` - Add a friend
- **DELETE** `/api/users/:userId/friends/:friendId` - Remove a friend

### Thoughts
- **GET** `/api/thoughts` - Get all thoughts
- **GET** `/api/thoughts/:id` - Get a single thought by ID
- **POST** `/api/thoughts` - Create a new thought
- **PUT** `/api/thoughts/:id` - Update a thought by ID
- **DELETE** `/api/thoughts/:id` - Delete a thought by ID

### Reactions
- **GET** `/api/thoughts/:thoughtId/reactions` - Get all reactions for a thought
- **POST** `/api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
- **PUT** `/api/thoughts/:thoughtId/reactions/:reactionId` - Update a reaction by ID
- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction by ID

## Models

### User
- **username**: String, unique, required, trimmed
- **email**: String, required, unique, must match a valid email address
- **thoughts**: Array of `_id` values referencing the `Thought` model
- **friends**: Array of `_id` values referencing the `User` model 

### Thought
- **thoughtText**: String, required, must be between 1 and 280 characters
- **createdAt**: Date, set default value to the current timestamp, uses a getter method to format the timestamp on query
- **username**: String, required (the user that created this thought)
- **reactions**: Array of nested documents created with the `reactionSchema`

**Schema Settings**:
- Virtual `reactionCount` to retrieve the length of the thought's `reactions` array on query.

### Reaction (Schema Only)
- **reactionId**: Mongoose's ObjectId data type, default value is set to a new ObjectId
- **reactionBody**: String, required, 280 character maximum
- **username**: String, required
- **createdAt**: Date, set default value to the current timestamp, uses a getter method to format the timestamp on query

**Schema Settings**:
- This is a schema only, used as the `reaction` field's subdocument schema in the `Thought` model.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature-branch`)
3. **Commit your changes** (`git commit -m 'Add some feature'`)
4. **Push to the branch** (`git push origin feature-branch`)
5. **Open a pull request**

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Video Tutorial
For a detailed walkthrough of the project setup and features, check out the [video tutorial](https://drive.google.com/file/d/1njLpgNWG3Q0zP6UoBkTVh2Fjt3a_pqXD/view).

## GitHub Repository
You can find the repository for this project at [SocialExpress-API GitHub Repository](https://github.com/Igimbayeva/SocialExpress-API).
