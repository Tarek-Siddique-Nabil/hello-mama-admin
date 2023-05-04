import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAo-3E5puyN_r_bq_4r-QWtJ4VzI1yg2-8",
  authDomain: "e-commece-portal.firebaseapp.com",
  projectId: "e-commece-portal",
  storageBucket: "e-commece-portal.appspot.com",
  messagingSenderId: "874345292032",
  appId: "1:874345292032:web:9ef21cccc41998aa0293e5",
  // apiKey: import.meta.env.VITE_APP_SECRET_API_KEY,
  // authDomain: import.meta.env.VITE_APP_SECRET_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_APP_SECRET_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_APP_SECRET_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_APP_SECRET_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_APP_SECRET_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
