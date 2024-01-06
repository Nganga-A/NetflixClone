import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBnFKRIbG_4mUSiitjKAQA8fXK8j2XbS20",
  authDomain: "netflix-49883.firebaseapp.com",
  projectId: "netflix-49883",
  storageBucket: "netflix-49883.appspot.com",
  messagingSenderId: "408716010139",
  appId: "1:408716010139:web:07397d3d6f4c0c17b9dc3e",
  measurementId: "G-5MB9034PM4"
};

//initialize firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth  = getAuth(app);
