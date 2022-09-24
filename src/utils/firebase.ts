// TODO: Firebase SDK can't resolve types
import {
  initializeApp,
  FirebaseApp,
} from "firebase/app"; /* eslint import/named: 0 */
import { getAuth, Auth } from "firebase/auth"; /* eslint import/named: 0 */
import {
  getAnalytics,
  Analytics,
  isSupported,
} from "firebase/analytics"; /* eslint import/named: 0 */
import {
  getFirestore,
  Firestore,
} from "firebase/firestore/lite"; /* eslint import/named: 0 */

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: separate this section to env files
const firebaseConfig = {
  apiKey: "AIzaSyA2u4B6zMMpxZ8jJcqQd8EDvClhTEAD_Ro",
  authDomain: "seioclub.firebaseapp.com",
  projectId: "seioclub",
  storageBucket: "seioclub.appspot.com",
  messagingSenderId: "227779203460",
  appId: "1:227779203460:web:b3fbd9eca76ccdb71c8dd1",
  measurementId: "G-FS7M9WRV2B",
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);

// analystics fallback
// sa: https://stackoverflow.com/a/72167004
export const analytics: Promise<Analytics> = isSupported().then((yes) =>
  yes ? getAnalytics(app) : null
);

export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
