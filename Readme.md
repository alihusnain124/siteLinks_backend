# Smart Link Website - Backend

This is the backend implementation for the XIHawks Smart Link Website, built using Node.js, Express.js, and PostgreSQL. It provides APIs for user authentication, site link management, and AI-generated descriptions using Google Gemini.

## Prerequisites

- Node.js (v14.x or later)
- PostgreSQL (v12.x or later)
- npm (comes with Node.js)

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     DB_HOST=your_host
     DB_PORT=your_port
     DB_NAME=your_database_name
     DB_USER=your_username
     DB_PASSWORD=your_password
     NODE_ENV=development
     JWT_SECRET=your_jwt_secret_key
     JWT_EXPIRES_IN=1h
     GEMINI_API_KEY=your_gemini_api_key
     CORS_ORIGIN=http://localhost:3000
     ```
   - Do not commit the `.env` file to version control. Use a `.gitignore` file to exclude it.

4. **Set up the database**:
   - Ensure PostgreSQL is running locally or on a remote server.
   - For now, the application will auto-sync the database schema using Sequelize. No manual migration is required at this stage. To enable auto-sync, ensure the `sync` option is set to `true` in the database configuration.

## Running the Application

1. **Start the backend server**:

   ```bash
   npm run dev
   ```

   - The server will run on the port specified in the `.env` file (default: 5000). Access it at `http://localhost:5000`.

2. **Development Mode**:
   - Use `npm run dev` to start the server with nodemon for automatic restarts on file changes.

## API Endpoints

- **Authentication**:
  - `POST /api/auth/signup`: Create a new user.
  - `POST /api/auth/login`: Log in a user and receive a JWT token.

- **Site Links Management** (Admin only):
  - `POST /api/sites`: Add a new site link.
  - `GET /api/sites`: Retrieve all site links.
  - `GET /api/sites/:id`: Retrieve a specific site link.
  - `PUT /api/sites/:id`: Update a site link.
  - `DELETE /api/sites/:id`: Delete a site link.

- **AI Description Generation**:
  - `POST /api/ai/generate-description`: Generate a description using Google Gemini based on title and category.

## Usage

- **Admin Role**: Can manage (add, update, delete) site links and use the AI description generator.
- **User Role**: Can only view site links.
- Use the JWT token returned from the login endpoint in the `Authorization` header for protected routes.

## Deployment

1. **Build for Production**:

   ```bash
   npm run build
   npm start
   ```

2. **Environment Setup**:
   - Update the `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `GEMINI_API_KEY`, and `CORS_ORIGIN` in the `.env` file to match your production environment.
   - Ensure the `NODE_ENV` is set to `production` for production mode.

3. **Server Configuration**:
   - Deploy on a server (e.g., Heroku, AWS, or DigitalOcean) with Node.js and PostgreSQL support.
   - Set environment variables on the server using the hosting provider's configuration tools.

## Troubleshooting

- **Database Connection Issues**: Verify the `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` in the `.env` file and ensure PostgreSQL is running.
- **API Errors**: Check the server logs for detailed error messages.
- **Gemini API**: Ensure the `GEMINI_API_KEY` is valid and the API service is accessible.

## Contributing

Feel free to submit issues or pull requests. Ensure to follow the project structure and coding standards.

## License

This project is licensed under the MIT License.
