import admin from 'firebase-admin';
import environmentVars from './environmentVars';

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: environmentVars.FIREBASE.CLIENT_EMAIL,
    privateKey: environmentVars.FIREBASE.PRIVATE_KEY.replace(/\\n/g, '\n'),
    projectId: environmentVars.FIREBASE.PROJECT_ID,
  }),
});

export default firebaseAdmin;
