# Niramaya AI Frontend 🌈

*Delivering a seamless and interactive healthcare experience.* 🌟💻

## Overview ✨

The Niramaya AI frontend is a modern, responsive web application built to provide users with an intuitive interface for accessing AI-powered healthcare insights. Built with the Vite variant for lightning-fast development and optimized performance, the frontend is designed to be visually appealing, accessible, and multilingual, ensuring users from diverse backgrounds can interact with our platform effortlessly. The Home page serves as the central hub, while dedicated pages for Dashboard, Medicine Analyzer, Lab Report, and AI Health Chatbot provide specialized functionalities, with a Header component unifying the experience. 🚀😊

## Pages and Features 📋

The frontend is structured around six key pages/components, each serving a distinct purpose to enhance the user experience:

| **Page/Component**     | **Description**                                                                 |
|------------------------|---------------------------------------------------------------------------------|
| **Home Page** 🏠       | The central hub showcasing all features.|
| **Dashboard Page** 📊  | A personalized user dashboard displaying health insights, recent reports, medication summaries, and quick access to the chatbot, tailored to the user's profile and history for efficient health management. |
| **Medicine Analyzer Page** 💊 | Enables users to input medication names or details to receive AI-powered insights on dosage, side effects, and interactions, with multilingual responses for accessibility. |
| **Lab Report Page** 📄 | Allows users to upload medical reports (images or PDFs) for AI-generated summaries, using OCR Technology and Meta Llama to provide concise, user-friendly explanations. |
| **Chatbot Page** 🤖    | Offers an interactive AI health chatbot powered by Meta Llama, providing real-time, context-aware answers to health queries in multiple languages, with accessible design. |
| **Header Page** 🧭    | A consistent navigation component across all pages, featuring the Niramaya AI logo, menu links (Home, Dashboard, Lab Report, Medicine, Chatbot), language selector, and user profile options for seamless navigation. |

## Installation and Library Setup ⚙️

To set up the Niramaya AI frontend locally, follow these steps to clone the repository, install dependencies, and configure the environment. The frontend is built with the Vite variant for a fast and efficient development experience. 🚀

### Libraries Used 📚

The frontend relies on the following libraries, each contributing to a robust and user-friendly application:

| **Library**                 | **Version** | **Purpose**                                                                 |
|-----------------------------|-------------|-----------------------------------------------------------------------------|
| **react**                   | ^19.0.0     | Core framework for building dynamic, component-based UI.                    |
| **react-dom**               | ^19.0.0     | Handles rendering of React components to the DOM.                           |
| **react-router-dom**        | ^7.5.0      | Manages client-side routing for seamless navigation between pages.          |
| **axios**                   | ^1.8.4      | Handles HTTP requests to the backend API (e.g., wakeup request).            |
| **framer-motion**           | ^12.6.5     | Provides smooth animations and transitions (e.g., card hovers, popups).     |
| **tailwindcss**             | ^3.4.17     | Utility-first CSS framework for responsive and rapid styling.               |
| **react-icons**             | ^5.5.0      | Supplies customizable icons (e.g., FaFileMedical, FaPills) for UI elements. |
| **@lottiefiles/dotlottie-react** | ^0.13.3 | Enables interactive Lottie animations for engaging UI elements.             |
| **@vercel/analytics**       | ^1.5.0      | Tracks user interactions for performance and usage analytics.               |

**Note**: Dependencies like `postcss` and `autoprefixer` for Tailwind CSS are included in `package.json` and installed automatically.

### Installation Steps 🛠️

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/niramaya-ai/niramaya-ai.git
   ```

2. **Navigate to the Frontend Directory**:
   ```bash
   cd niramaya-ai/frontend
   ```

3. **Install Core Dependencies**: Install all required libraries using npm or yarn:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
   This installs all dependencies listed in `package.json`.

4. **Set Up Environment Variables**: Create a `.env` file in the `frontend` directory and add:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   Replace `http://localhost:5000` with your backend API URL if different.

5. **Run the Development Server**: Start the Vite development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

### Build for Production 🏭

To create a production build:
```bash
npm run build
```
The output will be in the `dist` directory, ready for deployment to Vercel or another hosting platform.

## Deployment 🚀

The frontend is deployed on **Vercel** for fast and reliable hosting. To deploy:
1. Push your code to a GitHub repository. 📤
2. Connect the repository to Vercel via the Vercel dashboard. 🔗
3. Configure environment variables in Vercel (e.g., `VITE_API_URL`). ⚙️
4. Deploy the application, and Vercel will handle the rest. 🌐

## License 📜

This project is licensed under the MIT License. See the LICENSE file for details.

*Niramaya AI Frontend - Where Health Meets Innovation.* 🌈🚀
