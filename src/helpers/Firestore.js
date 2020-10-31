import firebase from 'firebase';
const config = {
   apiKey: "AIzaSyB55SeJfU6eFWNcVgO6gZRK14CciblljaQ",
   authDomain: "price-my-conveyance.firebaseapp.com",
   databaseURL: "https://price-my-conveyance.firebaseio.com",
   projectId: "price-my-conveyance",
   storageBucket: "price-my-conveyance.appspot.com",
   messagingSenderId: "728858018463",
   appId: "1:728858018463:web:cc37365373f4e0af7798aa",
   measurementId: "G-VH52KL85SV"
};
firebase.initializeApp(config);
export default firebase;