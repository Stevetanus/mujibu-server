const httpStatus = require('http-status');
const admin = require('firebase-admin');

const serviceAccount = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key.replace(/\\n/g, '\n'),
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: process.env.universe_domain,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://node-test-1fabc-default-rtdb.firebaseio.com',
});

const firebaseGoogleValidate = async (req, res, next) => {
  const header = req.headers.authorization;
  console.log('🚀 ~ file: firebaseGoogleValidate.js:12 ~ firebaseGoogleValidate ~ header:', header);
  if (!header || !header.startsWith('Bearer ')) {
    res.status(httpStatus[401]).send(httpStatus['401_MESSAGE']);
    return;
  }

  const idToken = header.split('Bearer ')[1];
  console.log('🚀 ~ file: firebaseGoogleValidate.js:32 ~ firebaseGoogleValidate ~ idToken:', idToken);

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log('🚀 ~ file: firebaseGoogleValidate.js:36 ~ firebaseGoogleValidate ~ decodedToken:', decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(httpStatus[401]).send(httpStatus['401_MESSAGE']);
  }
};

module.exports = firebaseGoogleValidate;
