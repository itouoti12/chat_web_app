# AI Chat Web App

A lightweight AI-powered chat application built with React, TypeScript, and OpenAI API. This app provides a clean, modern interface for conversing with AI assistants.

## Tech Stack

- **Frontend Framework**: React.js
- **Language**: TypeScript
- **Build Tool**: Vite
- **AI API**: OpenAI API
- **Styling**: Tailwind CSS v4
- **Icons**: React Icons

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- OpenAI API key

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory by copying the example file:

```bash
cp .env.example .env
```

Edit the `.env` file and add your OpenAI API key:

```env
VITE_OPENAI_API_KEY=your_actual_openai_api_key_here
```

**Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

### 4. Run the Development Server

```bash
npm run dev
```

## Usage

1. **Start a conversation**: Type your message in the input field at the bottom
2. **Send message**: Click the "Send" button or press Enter
3. **View responses**: AI responses appear
4. **Clear history**: Click the "Clear" button in the header to reset the conversation

## Project Structure

```
chat_web_app/
├── src/
│   ├── components/
│   │   ├── Chat.tsx          # Main chat component
│   │   ├── ChatMessage.tsx   # Individual message bubble component
│   │   ├── LoadingMessage.tsx # Loading indicator component
│   │   └── ConfirmModal.tsx  # Reusable confirmation modal
│   ├── openai.ts             # OpenAI API service
│   ├── types.ts              # TypeScript type definitions
│   ├── App.tsx               # Root component
│   ├── index.css             # Global styles & Tailwind imports
│   └── main.tsx              # Application entry point
├── .env                      # Environment variables (create this)
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── package.json              # Project dependencies
└── README.md                 # This file
```

## Security Notes

⚠️ **Important Security Considerations**:

- This app uses `dangerouslyAllowBrowser: true` to call OpenAI directly from the browser, which exposes your API key in the client-side code
- **For production use**, implement a backend proxy server to securely handle API calls
- Never commit your `.env` file or expose your API keys publicly
- Consider implementing rate limiting and usage monitoring
