# Niramaya AI Backend 🌈

*Powering healthcare insights with a robust and secure API.* 🌟🖥️

## Overview ✨

The Niramaya AI backend is a scalable, Node.js-based server that powers the platform’s AI-driven healthcare insights. Built with Express.js, it handles user authentication, file uploads (lab reports and medicine images), OCR and PDF parsing, AI-powered text analysis via Meta Llama, and real-time chatbot interactions. Integrated with PostgreSQL for data storage and secured with JWT authentication, the backend ensures reliable, multilingual, and accessible health solutions for users worldwide. 🚀😊

## Files 📋

The backend logic is organized conceptually into several key modules, though currently all code resides in `server.js`. Below are the primary components and their roles:

| **File**              | **Description**                                                                 |
|-----------------------|---------------------------------------------------------------------------------|
| **dbSetup.js** 🗄️     | Initializes the PostgreSQL database, setting up tables for users (email, name, DOB, health records, counts) and activities (user actions, dates). Currently implemented as the `initDatabase` function in `server.js`. |
| **promptManager.js** ✍️ | Generates tailored prompts for Meta Llama, including medical summary prompts for lab reports and medicine insights, factoring in user age, language, and health records. Currently implemented as `generateMedicalSummaryPrompt` and `generateMedicineSummary` functions in `server.js`. |
| **llmHandler.js** 🤖   | Manages communication with the Meta Llama model via Together AI, sending prompts and chat history to generate AI-driven responses for lab reports, medicine scans, and chatbot queries. Currently implemented as the `sendToLLM` function in `server.js`. |
| **server.js** 🚀       | The core server file containing all backend logic, including Express.js setup, API routes (login, register, lab report, medicine, chatbot), JWT authentication, file uploads with Multer, OCR with `llama-ocr`, PDF parsing, and PostgreSQL integration. Houses the full implementation of database setup, prompt generation, and LLM handling. |

**Note**: While described as separate modules for clarity, `dbSetup.js`, `promptManager.js`, and `llmHandler.js` are currently part of `server.js`. Future refactors may split them into dedicated files.

## API Link 🔗

To enable the backend’s AI-powered features, including OCR for lab reports and medicine scans and AI-driven responses via Meta Llama, you need a Together AI API key and the Render deployment URL. Below are the steps to obtain them:

### Obtaining the Together AI API Key 🔑
The backend uses `llama-ocr` for OCR processing (e.g., extracting text from lab reports and medicine images) and `Meta Llama for LLM calls` (e.g., generating summaries and chatbot responses), both powered by Together AI.
1. **Sign Up/Log In**: Visit [Together AI](https://www.together.ai/) and create an account or log in.
2. **Access API Keys**: Navigate to your account settings or dashboard, and find the API key section (typically under "API Keys" or "Developer Settings").
3. **Generate Key**: Create a new API key. Copy it immediately, as it may only be displayed once.
4. **Secure the Key**: Store the key securely (e.g., in your `.env` file as `TOGETHER_API_KEY`). Do not commit it to version control or share it publicly.
5. **Add to Environment**: Update your backend’s `.env` file with:
   ```env
   TOGETHER_API_KEY=your_together_api_key
   ```
   This key enables both OCR processing via `llama-ocr` and LLM interactions for lab report summaries, medicine insights, and chatbot responses.

### Accessing the Render Deployment URL 🌐
The backend is deployed on Render, and the deployment URL serves as the base for API requests.
1. **Log In to Render**: Access your Render account at [dashboard.render.com](https://dashboard.render.com).
2. **Select Service**: In the Render dashboard, locate your backend service (e.g., `niramaya-ai-backend`).
3. **Copy URL**: Find the public URL provided by Render (e.g., `https://niramaya-ai-backend.onrender.com`). This is typically displayed in the service’s overview or settings.
4. **Use in Frontend**: Configure your frontend’s `.env` file with the Render URL (e.g., `VITE_API_URL=https://niramaya-ai-backend.onrender.com`) for API requests.
5. **Test the API**: Verify the URL by sending a request to the wakeup endpoint:

**Note**: Replace `https://niramaya-ai-backend.onrender.com` with your actual Render URL. Keep API keys and URLs secure to prevent unauthorized access.

## Database Setup on Render 🗄️

To host the Niramaya AI backend’s PostgreSQL database on Render, follow these steps to create a database instance and configure the connection. This ensures your backend can store user data and activities securely in the cloud.

1. **Log In to Render**: Access your Render account at [dashboard.render.com](https://dashboard.render.com). Sign up if you don’t have an account.
2. **Create a PostgreSQL Instance**:
   - Click **New** > **PostgreSQL** in the Render dashboard.
   - **Name**: Enter a name (e.g., `niramaya-ai-db`).
   - **Database**: Specify a database name (e.g., `niramaya`).
   - **User**: Optionally set a username (defaults to a random one if blank).
   - **Region**: Choose a region matching your backend service (e.g., Oregon for consistency).
   - **PostgreSQL Version**: Select version 15 (recommended for `server.js` compatibility).
   - **Plan**: Choose the **Free** tier for development (note: free databases expire after 90 days and are limited to one per account) or a paid plan for production.
   - **Storage**: Set initial storage to 1 GB (adjustable later).
   - Click **Create Database**. Wait for the status to update to **Available** (takes a few minutes).
3. **Obtain the Database URL**:
   - Navigate to your database’s page in the Render dashboard (e.g., `niramaya-ai-db`).
   - Scroll to the **Connections** section.
   - Copy the **Internal Database URL** (e.g., `postgres://user:password@dpg-xxx.oregon-postgres.render.com/niramaya`), as it’s optimized for Render services in the same region.
4. **Configure Environment Variables**:
   - For local testing, update your backend’s `.env` file with:
     ```env
     DATABASE_URL=your_render_internal_database_url
     ```
   - For production, go to your backend service in the Render dashboard (e.g., `niramaya-ai-backend`):
     - Navigate to the **Environment** tab.
     - Add a new environment variable: `DATABASE_URL` = `your_render_internal_database_url`.

**Note**: The free tier expires after 90 days, and Render deletes the database unless upgraded. Use the internal URL for backend connections to minimize latency. Secure the `DATABASE_URL` and avoid sharing it publicly.

## Installation and Library Setup ⚙️

To set up the Niramaya AI backend locally, follow these steps to clone the repository, install dependencies, and configure the environment. The backend is built with Node.js for a robust and efficient API. 🚀

### Libraries Used 📚

The backend relies on the following libraries, each contributing to a secure and scalable server:

| **Library**          | **Version**    | **Purpose**                                                                 |
|----------------------|----------------|-----------------------------------------------------------------------------|
| **connect-pg-simple**| ^10.0.0        | Integrates PostgreSQL with express-session for session storage.             |
| **cors**             | ^2.8.5         | Enables Cross-Origin Resource Sharing for frontend-backend communication.   |
| **dotenv**           | ^16.5.0        | Loads environment variables from a `.env` file for configuration.           |
| **express**          | ^5.1.0         | Core framework for building the API and handling HTTP requests.             |
| **express-session**  | ^1.18.1        | Manages user sessions for authentication and state persistence.             |
| **jsonwebtoken**     | ^9.0.2         | Generates and verifies JWT tokens for secure user authentication.           |
| **llama-ocr**        | ^0.0.6         | Performs OCR on images (e.g., lab reports, medicine labels) for text extraction via Together AI. |
| **multer**           | ^1.4.5-lts.2   | Handles file uploads (PDFs and images) for lab reports and medicine scans.  |
| **pdf-parse**        | ^1.1.1         | Parses PDF files to extract text from lab reports.                          |
| **pg**               | ^8.14.1        | Connects to PostgreSQL for user data and activity storage.                  |
| **rimraf**           | ^6.0.1         | Removes files and directories, used for cleanup tasks.                      |
| **uuid**             | ^11.1.0        | Generates unique identifiers for sessions or records.                       |

**Note**: The devDependency `@types/axios` is excluded, as it’s not used at runtime.

### Installation Steps 🛠️

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/niramaya-ai/niramaya-ai.git
   ```

2. **Navigate to the Backend Directory**:
   ```bash
   cd niramaya-ai/backend
   ```

3. **Install Core Dependencies**: Install all required libraries using npm or yarn:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
   This installs all dependencies listed in `package.json`, including `express`, `pg`, `jsonwebtoken`, `llama-ocr`, `pdf-parse`, and others.

4. **Set Up Environment Variables**: Create a `.env` file in the `backend` directory and add:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret_key
   TOGETHER_API_KEY=your_together_api_key
   PORT=4000
   ```
   - Replace `your_postgresql_connection_string` with your PostgreSQL database URL (e.g., from **Database Setup on Render** section).
   - Replace `your_jwt_secret_key` with a secure key for JWT signing.
   - Replace `your_together_api_key` with your Together AI API key (see **API Link** section).
   - Adjust `PORT` if needed (defaults to 4000).

5. **Run the Server**: Start the backend server:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:4000` (or the specified `PORT`).

## Deployment 🚀

The backend is deployed on **Render** for scalable and reliable hosting. To deploy:
1. Push your code to a GitHub repository. 📤
2. Connect the repository to Render via the Render dashboard. 🔗
3. Configure environment variables in Render (e.g., `DATABASE_URL`, `JWT_SECRET`, `TOGETHER_API_KEY`). ⚙️
4. Deploy the application, and Render will handle the rest. 🌐

*Niramaya AI Backend - Empowering Health with AI.* 🌈🚀
