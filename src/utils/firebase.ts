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

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
