# Social_Media_API

# Data Model for Prisma Client

This document outlines the data model for a Prisma Client application. It defines various models representing entities in the application's database schema, along with their attributes, relationships, and enumerations.

## Models

### User

- `id`: Integer, primary key, auto-incremented
- `first_name`: String
- `last_name`: String (optional)
- `email`: String, unique
- `password`: String
- `role`: Role enum, default: USER
- `isActive`: Boolean, default: true
- `createdAt`: DateTime, default: current timestamp
- `updatedAt`: DateTime, updated timestamp
- `passwordResetToken`: String (optional)
- `passwordResetTokenExpire`: String (optional)
- `emailVerificationToken`: String (optional), unique
- `emailVerified`: Boolean, default: false
- `comments`: Array of Comment
- `likes`: Array of Like
- `posts`: Array of Post
- `profile`: Profile (optional)
- `stories`: Array of Story
- `followers`: Array of FollowRelation (related as "followed")
- `following`: Array of FollowRelation (related as "follower")

### FollowRelation

- `followedId`: Integer
- `followerId`: Integer
- `followed`: User (related as "followed")
- `follower`: User (related as "follower")

### Profile

- `id`: Integer, primary key, auto-incremented
- `userId`: Integer, unique
- `bio`: String
- `image`: String (optional)
- `city`: String
- `website`: String (optional)
- `user`: User (related by userId)

### Post

- `id`: Integer, primary key, unique, auto-incremented
- `userId`: Integer
- `title`: String (optional)
- `content`: String (optional)
- `image`: String
- `likesCount`: Integer (optional)
- `commentsCount`: Integer (optional)
- `privacy`: Privacy enum, default: FOLLOWERS
- `comments`: Array of Comment
- `likes`: Array of Like
- `author`: User (related by userId)

### Story

- `id`: Integer, primary key, unique, auto-incremented
- `userId`: Integer
- `image`: String
- `privacy`: Privacy enum, default: FOLLOWERS
- `user`: User (related by userId)

### Like

- `postId`: Integer
- `userId`: Integer
- `Post`: Post (related by postId)
- `User`: User (related by userId)

### Comment

- `postId`: Integer
- `userId`: Integer
- `Post`: Post (related by postId)
- `User`: User (related by userId)

## Enums

### Role

- USER
- ADMIN

### Privacy

- PUBLIC
- PRIVATE
- FOLLOWERS

## Data Sources

### Database

- **Provider:** PostgreSQL
- **URL:** Retrieved from environment variable `DATABASE_URL`

## Generators

### Client

- **Provider:** prisma-client-js

