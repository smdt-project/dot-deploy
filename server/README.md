# DotCode

## Endpoints

1. Projects (UI components or code snippets)
   GET /api/projects – Get all projects (UI components or code snippets).
   GET /api/projects/top-30 – Get top 30 starred projects (UI components or code snippets).
   GET /api/projects/:id – Get a specific project by ID.
   POST /api/projects – Create a new project.
   PUT /api/projects/:id – Update an existing project by ID.
   DELETE /api/projects/:id – Delete a project by ID.
   GET /api/projects/:id/comments – Get all comments for a specific project.
   POST /api/projects/:id/comments – Add a comment to a project.
2. Posts (textual or code content)
   GET /api/posts – Get all posts.
   GET /api/posts/top-30 – Get top 30 starred posts. (aliasing posts)
   GET /api/posts/:id – Get a specific post by ID.
   POST /api/posts – Create a new post.
   PUT /api/posts/:id – Update an existing post by ID.
   DELETE /api/posts/:id – Delete a post by ID.
   GET /api/posts/:id/comments – Get all comments for a specific post.
   POST /api/posts/:id/comments – Add a comment to a post.
3. Users
   GET /api/users – Get all users.
   GET /api/users/top-30?by=likes – Get top 30 liked users.
   GET /api/users/top-30?by=numProjects&posts – Get top 30 posting users.
   GET /api/users/:id – Get a specific user by ID.
   POST /api/users – Register a new user.
   PUT /api/users/:id – Update user details.
   DELETE /api/users/:id – Delete a user.
   POST /api/users/login – User login.
   POST /api/users/logout – User logout.
   GET /api/users/:id/projects – Get all projects created by a specific user.
4. Comments (on projects or posts)
   GET /api/comments – Get all comments.
   GET /api/comments/:id – Get a specific comment by ID.
   POST /api/comments – Create a new comment (could be linked to either a post or a project).
   PUT /api/comments/:id – Update a comment by ID.
   DELETE /api/comments/:id – Delete a comment by ID.
5. Tags (Optional)
   GET /api/tags – Get all tags.
   POST /api/tags – Create a new tag.
   GET /api/projects/tags/:tag – Get projects by tag.
   GET /api/posts/tags/:tag – Get posts by tag.
6. Likes/Dislikes (Optional)
   POST /api/projects/:id/like – Like a project.
   POST /api/projects/:id/dislike – Dislike a project.
   POST /api/posts/:id/like – Like a post.
   POST /api/posts/:id/dislike – Dislike a post.
7. Favorites/Bookmarks (Optional)
   POST /api/users/:id/favorites – Add a project or post to the user’s favorites.
   GET /api/users/:id/favorites – Get a list of user’s favorite projects or posts.
8. Categories (Optional)
   GET /api/categories – Get all categories.
   POST /api/categories – Create a new category.
   GET /api/projects/categories/:id – Get projects in a specific category.
   GET /api/posts/categories/:id – Get posts in a specific category.

### Details

1. Projects (UI Components or Code Snippets)
   Projects represent either a UI component or a code snippet managed in the app.

Properties:

id: Unique identifier for the project
title: Title of the project
description: Description of the project
type: Either "UI component" or "Code snippet"
tags: Array of tag references for categorization
createdBy: User reference (author of the project)
createdAt: Timestamp of when the project was created
updatedAt: Timestamp of the last update
likes: Array of user references who liked the project
dislikes: Array of user references who disliked the project
visibility: Public/Private (whether the project is shared or personal)
comments: Array of comment references
Routes:

GET /api/v1/projects: Get all projects (with optional filters like type, tags, etc.)
GET /api/v1/projects/:id: Get a specific project by ID
POST /api/v1/projects: Create a new project (requires authentication)
PATCH /api/v1/projects/:id: Update a project by ID (requires authentication and ownership)
DELETE /api/v1/projects/:id: Delete a project by ID (requires authentication and ownership) 2. Posts (Textual and Code Content)
Posts are typically textual content, but can also include embedded code (like blog posts, discussions, etc.).

Properties:

id: Unique identifier for the post
title: Title of the post
content: Main content of the post (could include text and code snippets)
createdBy: User reference (author of the post)
createdAt: Timestamp of when the post was created
updatedAt: Timestamp of the last update
tags: Array of tag references for categorization
likes: Array of user references who liked the post
dislikes: Array of user references who disliked the post
comments: Array of comment references
Routes:

GET /api/v1/posts: Get all posts (with optional filters like tags)
GET /api/v1/posts/:id: Get a specific post by ID
POST /api/v1/posts: Create a new post (requires authentication)
PATCH /api/v1/posts/:id: Update a post by ID (requires authentication and ownership)
DELETE /api/v1/posts/:id: Delete a post by ID (requires authentication and ownership) 3. Users
Users are those who can create projects, posts, comments, and interact with content (like, dislike).

Properties:

id: Unique identifier for the user
username: The display name or username of the user
email: User's email (for authentication)
password: Encrypted password (for authentication)
role: Role of the user (admin, user, moderator)
createdAt: Timestamp of when the account was created
profile: Profile info (bio, avatar, social links, etc.)
likedProjects: Array of project references the user liked
likedPosts: Array of post references the user liked
dislikedProjects: Array of project references the user disliked
dislikedPosts: Array of post references the user disliked
followers: Array of user references who follow this user
following: Array of user references this user follows
Routes:

GET /api/v1/users: Get all users (admin only)
GET /api/v1/users/:id: Get a specific user by ID
POST /api/v1/users: Register a new user
PATCH /api/v1/users/:id: Update user profile information
DELETE /api/v1/users/:id: Delete a user (admin only)
POST /api/v1/users/login: User login
POST /api/v1/users/logout: User logout 4. Comments
Comments can be made on both Projects and Posts.

Properties:

id: Unique identifier for the comment
content: The actual text of the comment
createdBy: User reference (author of the comment)
project: Reference to the project the comment is on (if applicable)
post: Reference to the post the comment is on (if applicable)
createdAt: Timestamp of when the comment was created
likes: Array of user references who liked the comment
Routes:

GET /api/v1/comments/project/:projectId: Get all comments on a project
GET /api/v1/comments/post/:postId: Get all comments on a post
POST /api/v1/comments/project/:projectId: Add a comment to a project (requires authentication)
POST /api/v1/comments/post/:postId: Add a comment to a post (requires authentication)
PATCH /api/v1/comments/:id: Update a comment (requires authentication and ownership)
DELETE /api/v1/comments/:id: Delete a comment (requires authentication and ownership) 5. Tags
Tags help categorize Projects and Posts.

Properties:

id: Unique identifier for the tag
name: The name of the tag (e.g., "JavaScript", "React", "CSS")
Routes:

GET /api/v1/tags: Get all tags
POST /api/v1/tags: Create a new tag (requires admin privileges)
DELETE /api/v1/tags/:id: Delete a tag (requires admin privileges) 6. Likes
Likes represent user interactions (for projects, posts, and comments).

Properties:

id: Unique identifier for the like
user: Reference to the user who liked the item
project: Reference to the liked project (if applicable)
post: Reference to the liked post (if applicable)
comment: Reference to the liked comment (if applicable)
Routes:

POST /api/v1/likes/project/:projectId: Like a project (requires authentication)
POST /api/v1/likes/post/:postId: Like a post (requires authentication)
POST /api/v1/likes/comment/:commentId: Like a comment (requires authentication) 7. Dislikes
Dislikes represent user interactions (for projects, posts, and comments).

Properties:

id: Unique identifier for the dislike
user: Reference to the user who disliked the item
project: Reference to the disliked project (if applicable)
post: Reference to the disliked post (if applicable)
comment: Reference to the disliked comment (if applicable)
Routes:

POST /api/v1/dislikes/project/:projectId: Dislike a project (requires authentication)
POST /api/v1/dislikes/post/:postId: Dislike a post (requires authentication)
POST /api/v1/dislikes/comment/:commentId: Dislike a comment (requires authentication)

These routes cover basic CRUD operations, user interactions, and more. Depending on your app's specific needs, you may add more detailed error handling, middleware for authentication/authorization, and query filtering/sorting functionalities.
