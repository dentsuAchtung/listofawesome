
const loginForm = document.querySelector('.form-login');
const googleBtn = document.querySelector('#googleBtn');

// Login form
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

      const email = loginForm.email.value;
      const password = loginForm.password.value;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log('logged in', user);
          loginForm.reset();
        })
        .catch((error) => {
          console.log(error.message);
          loginForm.querySelector('#error-message').textContent = error.message;
        });
});

googleBtn.addEventListener('click', (e) => {

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...

    // Handle Errors here.
      var errorCode = error.code;
      console.log(errorCode);
      // alert(errorCode);

      var errorMessage = error.message;
      console.log(errorMessage);
      // alert(errorMessage);
      });

});



document.addEventListener('DOMContentLoaded', function() {

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        window.location.href = '../';
      }
    });

});

// registerForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//
//       const email = loginForm.email.value;
//       const password = loginForm.password.value;
//
//       firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((user) => {
//           console.log('registered', user);
//           loginForm.reset();
//         })
//         .catch((error) => {
//           console.log(error.message);
//         });
// });
