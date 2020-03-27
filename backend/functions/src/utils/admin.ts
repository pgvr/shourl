import * as admin from "firebase-admin";
// import { firebaseConfig } from "./config";

admin.initializeApp();

const db = admin.firestore();

export {admin, db};
