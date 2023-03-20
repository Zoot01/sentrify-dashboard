![App Screenshot](https://i.imgur.com/l292FRH.png)

# Sentrify Free React MUI5 Template Built With Authentication 🔐

<p align="center">
  <a href="https://github.com/Zoot01/sentrify-dashboard"><img alt="Stars" src="https://img.shields.io/github/stars/Zoot01/sentrify-dashboard?style=plastic" /></a>
  <a href="https://github.com/Zoot01/sentrify-dashboard"><img alt="License" src="https://img.shields.io/bower/l/mi?style=plastic" /></a>
  <a href="https://github.com/Zoot01/sentrify-dashboard"><img alt="Contributors" src="https://img.shields.io/github/contributors/Zoot01/sentrify-dashboard" /></a>
</p>

## Please ⭐ to support and share with others

Sentrify is a free to use project template for web applications that include a user dashboard. Sentrify provides a clean UX on the frontend with a very basic Express server used for user authentication on the backend. The project is built using modern techniques and utilizes turborepo for a seamless mono-repo environment. Sentrify is the perfect starting point for most small projects.

| Features 🌟                   |
| ----------------------------- |
| ✅ TypeScript                 |
| ✅ Express API                |
| ✅ Frontend Authentication    |
| ✅ Password reset             |
| ✅ Automated emails           |
| ✅ Account verification       |
| ✅ Protected routes           |
| ✅ Queue system               |
| ✅ Fullscreen Functionality   |
| ✅ Automatic Idle Logout      |
| ✅ shareable Component Libary |

## Before Getting Started

You will either need a remote or local instance of Postgresql and Redis.

## To Run Locally

Clone the project

```bash
  git clone https://github.com/Zoot01/sentrify-dashboard
  cd sentrify-dashboard
```

Install dependencies

```bash
  npm install
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file located in the root directory

Please keep the PORT & ALLOWED_ORGIN the same as below otherwise it will create CORS and frontend request issues.

`PORT=3988`

`ALLOWED_ORGIN=http://localhost:3987`

`SEED_DATABASE=false`

`DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost:5432/DB_NAME?schema=public`

`REDIS_URL=redis://localhost:6379`

`SESSION_SECRET=32 character string`

`EMAIL_PASSWORD=password`

`EMAIL_SERVICE=hotmail/gmail/ect`

`ALLOW_BULL_DASHBOARD=true`

`JWT_SECRET=32 character string`

Generate prisma types

```bash
  cd apps/api
  npx prisma generate
  cd ../..
```

Start the application

```bash
  npm run dev
```

View the application at [http://localhost:3987](http://localhost:3987) and create an account. 💪

Make sure you are on [http://localhost:3987](http://localhost:3987) and not http://127.0.0.1:3987. ⚠

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Feedback

If you have any feedback, please reach out to me on discord Zoot#7045 📭

## Support And Future Plans

I hope to continue to update and maintain this repo, any help is appreciated.
