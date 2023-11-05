# Backend-Twitter-API-NodeJS-TS

## Author: [Nghia Hieu Le](mailto:lehieunghia2402@gmail.com)

This project is a backend API for a Twitter-like application, built with Node.js and TypeScript.

## Features

- User registration and authentication
- Tweet creation, deletion, and retrieval
- Follow and unfollow users
- Like and unlike tweets

## Getting Started

### Prerequisites

- Node.js
- TypeScript
- MongoDB

### Installation

1. Clone the repository: `git clone https://github.com/yourusername/Backend-Twitter-API-NodeJS-TS.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## API Endpoints

- `POST /users/register`: Register a new user
- `POST /users/login`: Authenticate a user
- `POST /tweets`: Create a new tweet
- `DELETE /tweets/:id`: Delete a tweet
- `GET /tweets`: Retrieve all tweets
- `POST /users/follow/:id`: Follow a user
- `POST /users/unfollow/:id`: Unfollow a user
- `POST /tweets/like/:id`: Like a tweet
- `POST /tweets/unlike/:id`: Unlike a tweet

## License

This project is licensed under the MIT License.
