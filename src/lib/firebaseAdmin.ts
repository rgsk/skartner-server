import admin from 'firebase-admin';

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(
    'skartner-af3bf-firebase-adminsdk-xhdrg-db963b5e94.json'
  ),
});

export default firebaseAdmin;
