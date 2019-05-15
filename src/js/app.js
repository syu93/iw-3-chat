import firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp({
  apiKey: "AIzaSyAH0oncQi3cXnqxpwI4pHtqsTDCooqroRc",
  authDomain: "my-project-bf769.firebaseapp.com",
  databaseURL: "https://my-project-bf769.firebaseio.com",
  projectId: "my-project-bf769",
  storageBucket: "my-project-bf769.appspot.com",
  messagingSenderId: "975375538780",
  appId: "1:975375538780:web:ca0f8aefd0fbc653"
});

const database = firebase.database();

const form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const input = e.target.querySelector('input[type=email]');

  database.ref().child('users').push({
    email: input.value
  });
});

database.ref('users/').on('child_added', (data) => {
  console.log(data.val())
});

function getRef(path) { return database. }

function sendMessage() {

}


