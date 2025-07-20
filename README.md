# Comm-Sync Workspace

A modern Slack-like chat application built with **React**, **TypeScript**, **Vite**, **Firebase**, and **Tailwind CSS**.

---

## Features

- **Real-time chat** with channels and threads
- **User authentication** (Firebase Auth)
- **Channel management** (create, join, private/public)
- **Threaded replies** for focused conversations
- **AI chat suggestions** (planned, via Firebase Functions)
- **Responsive UI** with atomic design (atoms, molecules, organisms)
- **Modern styling** using Tailwind CSS
- **Error boundaries** and toast notifications

---

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Firebase (Auth, Firestore, Functions)](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

---

## Project Structure

```
src/
├── api/            # API calls and hooks
├── components/
│   ├── atoms/      # Smallest UI elements
│   ├── molecules/  # Combinations of atoms
│   ├── organisms/  # Large UI sections
│   └── pages/      # Page-level components
├── context/        # React context providers
├── firebase/       # Firebase config and client
├── hooks/          # Custom hooks
├── styles/         # Global styles
├── App.tsx
├── main.tsx
└── index.css
```

---

## Getting Started

1. **Install dependencies**

   ```sh
   npm install
   ```

2. **Configure Firebase**
   - Update `src/firebase/FirebaseConfig.ts` with your Firebase project credentials.

3. **Run locally**

   ```sh
   npm run dev
   ```

4. **Build for production**
   ```sh
   npm run build
   ```

---

## Firebase Functions (AI Suggestions)

To enable AI chat suggestions:

1. Install Node.js and Firebase CLI.
2. Run `firebase init functions` and set up your function in `functions/src/index.ts`.
3. Deploy with `firebase deploy --only functions`.
4. Call your function from the frontend using `httpsCallable`.

---

## ESLint & Code Quality

- Uses recommended ESLint configs for React and TypeScript.
- See the included examples for expanding ESLint configuration.

---

## Contributing

Pull requests and issues are welcome!  
Please follow atomic design principles and keep logic separated from UI.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
