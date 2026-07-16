To Do List:

Clean up CSS

Frontend
Be able to go to profile when clicking on profile picture or name on post author
Be able to go to profile when clicking on profile picture or name on comment author
Right now, adding or editing comments will take you back to your user posts page, need to find out how to add a comment and return to the peer page you were on if going that route

# Social Media App
The goal of this project was to create a full stack social media app. I decided to use REST APIs in Node.js using Express, PostgreSQL, and Prisma for the backend and React for the frontend.

## Features
1. Single page app that starts on the homepage with a login form if no current user is logged in and register button to create a new user in the database.
2. Once successfully logged in and a passport session has been made in the backend, goes to the user homepage.
3. Header and footer on every page that displays the app name, and a nav bar that either has a home button if the user isn't signed in, or a full nav bar with user home, user network, user edit, user delete and user log out buttons.
4. User home page with the current logged in user's full name, their profile picture, an edit profile picture button and their date that they created their account, as well as a list of all posts created by the current user and any posts by peers the current user is following sorted from newest to oldest.
5. User network page with the current logged in user's full name, their profile picture, an edit profile picture button, their date that they created their account, their hometown, and their birthdate, as well as a list of all users in the database that shows if the user is currently following or followed by them and has buttons to send/cancel follow requests or accept/decline follow requests from other users
6. A peer profile page for every user that is not the current logged in user, it will show a private page if the user is not currently following the selected user, or will show the peer's full name, their profile picture, their date that they created their account, their hometown and their birthdate, as well as any posts that they have made and any users that the peer is following that are not the currently logged in user (with all follow features that are present in the network page)
7. Users can create posts on their home page, and can create comments and add/remove likes on any post that is on their home page or on any selected peer profile page that has posts available
8. Users can edit/delete any post or comment that has a matching author ID to the current user.

## Installation

Before installing, ensure you have the following software installed:
**Git**: [Download Git](https://git-scm.com)
**Node.js**: [Download Node.js](https://nodejs.org)
**postSQL**: [Download postSQL](https://www.postgresql.org/)

1. **Clone the repository**
```git clone https://github.com/thall34/social-media-app```
2. **Navigate to the project directory**
```cd clone-location/social-media-app```
3. **Install dependencies**
```cd ./frontend -> npm install -> cd ../backend -> npm install```
4. **Configure .env file in backend folder and add a DATABASE_URL variable**
```DATABASE_URL=postgresql://<your-role-name>:<your-role-password>@localhost:5432/socialpage?schema=public```
5. **Add a SESSION_SECRET variable to your .env file**
```SESSION_SECRET=<your_secret>```
6. **Add cloudinary variables to your .env file**
```CLOUDINARY_CLOUD_NAME=<your-cloud-name> CLOUDINARY_API_KEY=<your-api-key> CLOUDINARY_API_SECRET=<your-api-secret>```
7. **Start the local server**
```cd backend -> node app.js```
8. **Start the React server**
```cd frontend -> npm run dev```
8. **Navigate to the localhost in your browser**
```http://localhost:5173```

## Future improvements

1. Clean up CSS
2. Be able to go to profile when clicking on profile picture or name on post author
3. Be able to go to profile when clicking on profile picture or name on comment author
4. Deploy to render or a similar service
5. Add unit testing and API tests
6. Add API Documentation
7. Add pagination for posts and users