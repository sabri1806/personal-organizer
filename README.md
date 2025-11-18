  # Personal Task Manager App (Frontend)

A simple and fast task manager built with **React + Vite + Redux**.  
The app provides a basic CRUD for tasks, a search bar, task filtering by status, and an AI-powered task suggestion feature.

## 🚀 Features

- **Add, edit, and delete tasks** (basic CRUD).
- **Search** tasks by text.
- **Filter tasks**:
  - All tasks  
  - Completed  
  - Pending
- **AI Suggestion Button**:  
  Calls a separate backend service that interacts with the Gemini API to generate example tasks for React practice.

## 🛠️ Tech Stack

- **React**
- **Vite**
- **Redux Toolkit**
- **TailwindCSS**

## 📦 Installation & Setup

1. Clone this repository:
   ```bash
   git clone <repo-url>

2.	Install dependencies:

  ```npm install```
3. 	Run the development server:

```npm run dev``` 

The app will start at:

> 👉 http://localhost:5173/

📁 Project Structure
```text
src/
 ├── components/        # UI components
 ├── features/          # Redux slices
 ├── store/             # Redux store configuration
 ├── App.jsx
 └── main.jsx

 🤖 AI Suggestion Feature

The “Suggest Task” button sends a request to a backend project created separately.
>  be-personal-organizer-app

That backend communicates with Gemini API to return a suggested task description.

This feature is optional and works as an simple example of integrating AI into a React app.

📄 License

This project is for learning and personal use.
