## Social Media API 
## Description
   simple social media API.
## Technologies

<div>
    
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  <br>
  <center>
  
  <img src="https://camo.githubusercontent.com/2dbe8dc3b8fa5ac59437c9d8c94323ad3f0052d3ff5ac0e9c258ceb5daba76f8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f31362e332e312d646f74656e762d726564">
  <img src="https://camo.githubusercontent.com/71fe39e1c67b1793f22d11c188a2cdd86438a84e5635b783ed1d1691f8e1c8d2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f312e34312e302d636c6f7564696e6172792d626c7565">
  <img src="https://camo.githubusercontent.com/a3ff2a5d02a913cdf673537dea66873aecaf58cb8c770f9225e2d2959712ed6b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f312e342e352d2d6c74732e312d6d756c7465722d726564">
  <img src="https://camo.githubusercontent.com/e098806c441efac8d7c44cbb0cf5000f113dfc54db28d16bbfcbeddc3ba316ed/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f312e31302e302d6d6f7267616e2d726564">
  <img src="https://camo.githubusercontent.com/b9fe7b2faa1b963c1d1b77ee18a4a7689a0d46d18cf38a48ae464f2a03357eba/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f362e392e342d6e6f64656d61696c65722d726564">
  <img src="https://camo.githubusercontent.com/2aa8d320fc8552d10a9f66e1076360d1f0c9ef2ee5adaea034cd13f68ca1efdc/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f352e312e302d6263727970742d726564">
  <img src="https://camo.githubusercontent.com/f73e41f53709208ed3f07c001ccb103454212e26e6d296fa823e02cde579b205/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f312e322e302d657870726573732d2d6173796e632d2d68616e646c65722d726564">
  <img src="https://camo.githubusercontent.com/bdd58addfeff8b18867ab6606b24bd158319885f8c1918ec13c5786259b6c5ab/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f372e302e312d657870726573732d2d76616c696461746f722d726564">

  </center>
</dev>

## **Key Features:**

- **User Authentication:** Secure user authentication endpoints using JWT tokens.
- **Posting Updates:** Create, retrieve, update, and delete posts or status updates.
- **User Profiles:** Fetch and update user profiles, including profile pictures, bio, and contact information.
- **Friend/Follower Interactions:** Follow, unfollow, and retrieve lists of friends or followers.
- **Search Functionality:** Search for users, posts, or hashtags within the social network.
- **Upload Images:** Upload and manage images to be included in posts or user profiles.
- **Pagination:** Paginate large data sets for efficient retrieval and presentation.
- **Story:** Share temporary updates that disappear after a set period.
- **Like:** Like or favorite posts and updates.
- **Comment:** Interact with posts by leaving comments or replies.
- **Customizable Middleware:** Easily extend and customize functionality using Express.js middleware.

## Installation
1. **Clone the Repository:**
   Use the `git clone` command to clone the GitHub repository to your local machine.
   ```bash
   git clone https://github.com/0xEbrahim/Social_Media_API
2. **Initialize a Package.json File (if not already done):**
   If your project doesn't already have a `package.json` file, you can create one by running:
   ```bash
   npm init
   # or
   yarn init
3. **Setting up env variables**<br>
   - **Please first specifiy your database engine**
    ```properties
    ## PORT
    PORT=YOUR PORT HERE 
    
    ## Prisma URI
    DATABASE_URL= YOUR DATABASE URI    
    
    ## JWT access token
    JWT_ACC_TOKEN=YOUR JWT ACCESS TOKEN SECRET
    
    ## JWT refresh token
    JWT_REF_TOKEN=YOUR JWT REFRESH TOKEN SECRET
    
    ## CLOUD CONFIG
    CLOUD_NAME=GET IT FROM CLOUNDINARY WEBSITE
    CLOUD_SECRETS=GET IT FROM CLOUNDINARY WEBSITE
    CLOUD_KEY=GET IT FROM CLOUNDINARY WEBSITE
    
    ## GMAIL
    MAILER_APP_EMAIL=SENDER EMAIL
    MAILER_APP_PASSWORD=SENDER PASSWORD
4. **Setting your prisma file**
   ```prisma
    generator client {
      provider = "CHOOSE THE CLIENT"
    }
   datasource db {
      provider = "YOUR DATABASE"
      url      = env("YOUR ENV DATABASE URI")
   }
## Project Structure
 ```powershell
.
├── prisma/
│   ├── migrations
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── Auth/
│   │   │   ├── Auth.index.js
│   │   │   ├── changePassword.js
│   │   │   ├── forgotPassword.js
│   │   │   ├── login.js
│   │   │   ├── logout.js
│   │   │   ├── refreshToken.js
│   │   │   ├── register.js
│   │   │   ├── resetPassword.js
│   │   │   ├── verfiyResetPassword.js
│   │   │   └── verifyEmail.js
│   │   ├── Comment/
│   │   │   ├── comment.index.js
│   │   │   ├── createComment.js
│   │   │   ├── deleteComment.js
│   │   │   ├── getASingleComment.js
│   │   │   ├── getAllCommentsOnAPost.js
│   │   │   └── updateComment.js
│   │   ├── Follow/
│   │   │   ├── follow.index.js
│   │   │   ├── followOrUnfollow.js
│   │   │   ├── getAllFollowers.js
│   │   │   └── getAllFollowings.js
│   │   ├── Like/
│   │   │   ├── getAllLikesOnAPost.js
│   │   │   ├── like.index.js
│   │   │   └── likeOrUnlike.js
│   │   ├── Post/
│   │   │   ├── adminDeletePost.js
│   │   │   ├── createPost.js
│   │   │   ├── currentUserDeletePost.js
│   │   │   ├── getAllPosts.js
│   │   │   ├── getSinglePost.js
│   │   │   ├── post.index.js
│   │   │   ├── searchAboutPost.js
│   │   │   ├── updatePost.js
│   │   │   └── userGetAllPosts.js
│   │   ├── Story/
│   │   │   ├── createStory.js
│   │   │   ├── currentUserGetStories.js
│   │   │   ├── deleteStory.js
│   │   │   ├── getMyStories.js
│   │   │   ├── getSingleStory.js
│   │   │   ├── story.index.js
│   │   │   └── updateStoryPriv.js
│   │   └── User/
│   │       ├── deactiveAccount.js
│   │       ├── deleteUser.js
│   │       ├── getAllUsers.js
│   │       ├── getSingleUser.js
│   │       ├── searchForUsers.js
│   │       ├── updateCurrentUser.js
│   │       ├── updateSingleUserData.js
│   │       └── user.index.js
│   ├── functions/
│   │   ├── Cloudinary/
│   │   │   └── cloudinary.js
│   │   ├── Mail/
│   │   │   └── email.config.js
│   │   └── multer/
│   │       └── multer.js
│   ├── hooks/
│   │   └── index.hooks.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.js
│   │   └── validation.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── comment.routes.js
│   │   ├── follow.routes.js
│   │   ├── like.routes.js
│   │   ├── post.routes.js
│   │   ├── story.routes.js
│   │   └── user.routes.js
│   ├── utils/
│   │   ├── validation/
│   │   │   ├── auth.validator.js
│   │   │   ├── comment.validator.js
│   │   │   ├── follow.validator.js
│   │   │   ├── like.validator.js
│   │   │   ├── post.validator.js
│   │   │   ├── story.validator.js
│   │   │   └── user.validator.js
│   │   ├── APIError.js
│   │   ├── ValidForActions.js
│   │   ├── app.setup.js
│   │   ├── createToken.js
│   │   └── hashingPassword.js
│   └── app.js
├── .gitignore
├── README.md
├── package-lock.json
└── package.json
```
## Schemas Explaination
  1 - **USER SCHEMA** <br>
  This schema defines a model called "User" with various fields and their associated attributes:

- `id`: An integer field that serves as the primary key for identifying users. It auto-increments its value.
- `name`: A string field for the user's name.
- `email`: A string field for the user's email address, marked as unique.
- `password`: A string field for the user's password.
- `role`: A field representing the user's role, with a default value of "USER".
- `isActive`: A boolean field indicating whether the user account is active, with a default value of true.
- `createdAt`: A datetime field representing the timestamp when the user account was created, with a default value of the current timestamp.
- `updatedAt`: A datetime field representing the timestamp when the user account was last updated, automatically updated whenever the user data changes.
- `passwordResetToken`: A string field for storing a token used for password reset.
- `passwordResetTokenVerfied`: A boolean field indicating whether the password reset token has been verified.
- `passwordResetTokenExpire`: A string field representing the expiry date of the password reset token.
- `passwordChangedAt`: A string field representing the timestamp when the user's password was last changed.
- `emailVerificationToken`: A string field for storing a token used for email verification, marked as unique.
- `emailVerified`: A boolean field indicating whether the user's email address has been verified, with a default value of false.
- `comments`: A relation to the "Comment" model, representing the comments made by the user.
- `likes`: A relation to the "Like" model, representing the likes made by the user.
- `posts`: A relation to the "Post" model, representing the posts created by the user.
- `profile`: A relation to the "Profile" model, representing the user's profile information.
- `stories`: A relation to the "Story" model, representing the stories created by the user.
- `followers`: A relation to the "FollowRelation" model, representing the users who are following this user.
- `following`: A relation to the "FollowRelation" model, representing the users whom this user is following.
  
This schema outlines the structure and relationships of a user entity within a database, including various attributes and associations commonly found in user management systems.

---

  2 - **PROFILE SCHEMA** <br>
  This schema defines a model called "Profile" with various fields and their associated attributes:

- `id`: An integer field that serves as the primary key for identifying profiles. It auto-increments its value.
- `userId`: An integer field representing the user ID associated with the profile, marked as unique.
- `bio`: A string field for the user's biography, with a default value of "Not bio yet."
- `image`: A string field representing the URL of the profile image, optional.
- `city`: A string field representing the user's city.
- `website`: A string field representing the URL of the user's website, optional.
- `user`: A relation to the "User" model, representing the user associated with this profile. It references the `id` field of the "User" model using the `userId` field.

This schema outlines the structure and relationships of a profile entity within a database, including various attributes commonly found in user profile systems.

---
 3 - **FOLLOW SCHEMA** <br>
 This schema defines a model called "FollowRelation" with various fields and their associated attributes:

- `id`: An integer field that serves as the primary key for identifying follow relations. It auto-increments its value.
- `followedId`: An integer field representing the ID of the user being followed.
- `followerId`: An integer field representing the ID of the user who is following.
- `followed`: A relation to the "User" model, representing the user who is being followed. It references the `id` field of the "User" model using the `followedId` field. This relation is named "followed".
- `follower`: A relation to the "User" model, representing the user who is following. It references the `id` field of the "User" model using the `followerId` field. This relation is named "follower".

This schema outlines the structure and relationships of a follow relation entity within a database, typically used to establish connections between users for follow/follower functionality.

---

4 - **POST SCHEMA** <br>
This schema defines a model called "Post" with various fields and their associated attributes:

- `id`: An integer field that serves as the primary key for identifying posts. It auto-increments its value and is marked as unique.
- `userId`: An integer field representing the ID of the user who authored the post.
- `title`: A string field for the title of the post.
- `content`: A string field for the content of the post.
- `image`: An array of strings representing URLs of images associated with the post.
- `likesCount`: An integer field representing the number of likes received by the post, with a default value of 0.
- `commentsCount`: An integer field representing the number of comments made on the post, with a default value of 0.
- `postedAt`: A datetime field representing the timestamp when the post was created, with a default value of the current timestamp.
- `updatedAt`: A datetime field representing the timestamp when the post was last updated, automatically updated whenever the post data changes.
- `privacy`: A field representing the privacy settings of the post, with a default value of "FOLLOWERS".
- `comments`: A relation to the "Comment" model, representing the comments made on the post.
- `likes`: A relation to the "Like" model, representing the likes received by the post.
- `author`: A relation to the "User" model, representing the user who authored the post. It references the `id` field of the "User" model using the `userId` field.

This schema outlines the structure and relationships of a post entity within a database, including various attributes commonly found in social media or blogging platforms.

---

5 - **STORY SCHEMA** <br>
This schema defines a model called "Story" with various fields and their associated attributes:

- `id`: An integer field that serves as the primary key for identifying stories. It auto-increments its value and is marked as unique.
- `userId`: An integer field representing the ID of the user who created the story.
- `image`: A string field representing the URL of the image associated with the story.
- `privacy`: A field representing the privacy settings of the story, with a default value of "FOLLOWERS".
- `user`: A relation to the "User" model, representing the user who created the story. It references the `id` field of the "User" model using the `userId` field.

This schema outlines the structure and relationships of a story entity within a database, typically used in social media platforms or similar applications.

---

6 - **LIKE SCHEMA** <br>
This schema defines a model called "Like" with various fields and their associated attributes:

- `postId`: An integer field representing the ID of the post that is being liked.
- `userId`: An integer field representing the ID of the user who liked the post.
- `Post`: A relation to the "Post" model, representing the post that is being liked. It references the `id` field of the "Post" model using the `postId` field.
- `User`: A relation to the "User" model, representing the user who liked the post. It references the `id` field of the "User" model using the `userId` field.

This schema outlines the structure and relationships of a like entity within a database, typically used to establish connections between users and posts for the like functionality. Additionally, the combination of `postId` and `userId` is used as a composite primary key for the "Like" model.

---

7 - **Comment SCHEMA** <br>
This schema defines a model called "Comment" with various fields and their associated attributes:

- `id`: An integer field that serves as the primary key for identifying comments. It auto-increments its value and is marked as unique.
- `postId`: An integer field representing the ID of the post on which the comment is made.
- `userId`: An integer field representing the ID of the user who made the comment.
- `content`: A string field representing the content of the comment.
- `Post`: A relation to the "Post" model, representing the post on which the comment is made. It references the `id` field of the "Post" model using the `postId` field.
- `User`: A relation to the "User" model, representing the user who made the comment. It references the `id` field of the "User" model using the `userId` field.

This schema outlines the structure and relationships of a comment entity within a database, typically used in social media platforms or similar applications.

---

8 - **ENUMS** <br>
This schema defines two enums:

1. `Role`: Represents the role of a user with two possible values:
   - `USER`: Indicates a regular user.
   - `ADMIN`: Indicates an administrator user.

2. `Privacy`: Represents the privacy settings with three possible values:
   - `PUBLIC`: Indicates that the content is visible to everyone.
   - `PRIVATE`: Indicates that the content is visible only to the owner.
   - `FOLLOWERS`: Indicates that the content is visible only to the followers of the owner.

These enums define a set of predefined values that can be used as attributes in the schema for better organization and clarity.

 




