import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCByk_S_bWS8Zsq_RVE9sYu4xehnJpDjhM",
    authDomain: "taskl2.firebaseapp.com",
    projectId: "taskl2",
    storageBucket: "taskl2.appspot.com",
    messagingSenderId: "387015844037",
    appId: "1:387015844037:web:20597d7f587dd050be50ac",
    measurementId: "G-2GJXL2M1CJ"
  };

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)