# Niramaya AI - Health Meets AI 🌟

![Niramaya AI Logo](Frontend/public/github-banner-logo.png)  
*Health is Wealth. Empowering lives through AI-driven healthcare insights.* 💪

## Project Overview 📖

Niramaya AI is a revolutionary healthcare platform designed to democratize access to medical insights using advanced artificial intelligence. Our mission is to bridge the gap between complex medical data and user-friendly health solutions, empowering patients, caregivers, and healthcare providers with instant, accurate, and multilingual health insights. Powered by **Meta Llama 3.3 70B**, we simplify lab report analysis, provide personalized medication insights, and offer real-time health guidance through an AI chatbot. 🌍✨

### Why Niramaya AI? 🤔

- **Accessibility** 🌐: Deliver health insights in multiple languages (English, Hindi, Telugu, Tamil) to reach diverse communities.
- **Efficiency** ⚡: Reduce lab report analysis time by 80% with AI-driven summaries.
- **Empowerment** 💡: Improve medication adherence and health literacy with personalized insights.
- **Innovation** 🚀: Combine state-of-the-art AI, OCR, and multilingual capabilities to transform healthcare delivery.

We are building Niramaya AI to make healthcare inclusive, scalable, and impactful, addressing global health literacy gaps and enabling users to take control of their well-being. 😊

## Tech Stack 🛠️

Niramaya AI is built with a robust and modern tech stack to ensure scalability, performance, and seamless user experiences:

| **Component**         | **Technology**          | **Purpose**                                                                 |
|-----------------------|-------------------------|-----------------------------------------------------------------------------|
| **Frontend**          | React, JavaScript, Tailwind CSS | Dynamic, responsive UI with intuitive design.                              |
| **Backend**           | Node.js, Express.js     | Scalable API for handling requests, authentication, and AI integrations.    |
| **Database**          | PostgreSQL              | Reliable storage for user data, reports, and analytics.                    |
| **AI Model**          | Meta Llama 3.3 70B      | Powers intelligent medical insights and multilingual responses.            |
| **Image OCR**         | Llama-OCR               | State-of-the-art open-source library for extracting text from medical images. |
| **PDF OCR**           | pdf-parse               | Pre-built JavaScript library for extracting text from PDF medical reports. |
| **Deployment**        | Vercel (Frontend), Render (Backend) | Seamless deployment and scalable hosting for high availability.           |

### Multimodal Capabilities 🎨

Niramaya AI is a multimodal platform that processes both text and images:

- **Text Analysis** 📝: Users input health queries or medication details, processed by Meta Llama for accurate responses.
- **Image Processing** 🖼️: Medicines are uploaded as images, and llama-ocr extracts text for AI analysis.
- **PDF Report Parsing** 📄: Users upload digital lab reports (PDFs), and our parser scans and analyzes the text for AI-driven health summaries.
- **Multilingual Support** 🌍: Responses are delivered in the user’s preferred language, ensuring accessibility for all.

## Powered by Meta Llama 🦙

Niramaya AI leverages **Meta Llama 3.3 70B**, a state-of-the-art large language model, to deliver precise and context-aware medical insights. Here’s how we use it:

- **Prompt Engineering** ✍️: Carefully crafted prompts enable Llama to interpret complex medical terminology and generate user-friendly summaries.
- **Real-Time Insights** ⏱️: Llama processes extracted text from reports and user queries to provide instant feedback.
- **Multilingual Responses** 🗣️: Supports translations and responses in multiple languages for global accessibility.
- **Scalability** 📈: Llama’s efficiency ensures low-latency responses, even with high user traffic.

Our integration combines Llama-ocr to extract text from medical images, enabling Niramaya AI to handle diverse healthcare data with unparalleled accuracy. 🚀

## Llama-OCR and Together.ai 📸🔗

Niramaya AI harnesses advanced tools to power its AI-driven healthcare insights. Below, we highlight the roles of **Llama-OCR** and **Together.ai** in our project:

- **Llama-OCR** 📸: An open-source npm library powered by Together.ai’s Llama 3.2 Vision model, Llama-OCR extracts text from medical images, such as lab reports and medicine labels, with high precision. In Niramaya AI, it processes user-uploaded images via the `/labreport` and `/medicine` endpoints, enabling Meta Llama to analyze extracted text for personalized health summaries and medication insights. This ensures seamless handling of handwritten or printed medical documents, making healthcare data accessible to all. Learn more at [LlamaOCR.com](https://llamaocr.com/).
- **Together.ai** 🔗: Together.ai is the backbone of Niramaya AI’s AI capabilities, hosting both Llama-OCR for image processing and Meta Llama 3.3 70B for generating medical insights and chatbot responses. By providing scalable AI infrastructure, Together.ai enables low-latency OCR and LLM calls through a single API key, powering endpoints like `/labreport`, `/medicine`, and `/chatbot`. This integration ensures efficient, accurate, and multilingual healthcare solutions. Explore their platform at [Together.ai](https://www.together.ai/).

These tools empower Niramaya AI to transform complex medical data into user-friendly insights, driving accessibility and innovation in healthcare. 🌐

## Installation ⚙️

To set up Niramaya AI locally, follow the instructions for the frontend and backend:

### Prerequisites

- **Node.js** (v16 or higher) 🟢
- **npm** or **yarn** 📦
- **PostgreSQL** (for backend) 🗄️
- **Git** (for cloning the repository) 🗃️

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/niramaya-ai/niramaya-ai.git
   ```
2. Navigate to the project directory:
   ```bash
   cd niramaya-ai
   ```
3. Follow the setup instructions for:
   - [Frontend Installation](./Frontend/README.md) 📱
   - [Backend Installation](./Backend/README.md) 🖥️

## License 📜

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact 📬

For inquiries, reach out at [Niramaya AI](mailto:omanjuvallabha@gmail.com) or connect with us on [LinkedIn](https://www.linkedin.com/in/manju-vallabha-pavalla/). 🌐

*Niramaya AI - Revolutionizing Healthcare, One Insight at a Time.* 🌈
