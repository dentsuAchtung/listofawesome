const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.newUserSignup = functions.auth.user().onCreate((user) => {
  admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    profileImageUrl: user.photoURL,
    displayName: user.displayName,
    lists: [],
    isAdmin: false,
  });
  admin.firestore().collection("users").doc(user.uid)
      .collection("lists").doc().set({
        title: "My first list",
        people: [],
      });
});

exports.userDeleted = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});


// // http request
// exports.randomNumber = functions.https.onRequest((request, response) => {
//   const number = Math.round(Math.random()*100);
//   console.log(number);
//   response.send(number.toString());
// });

// // callable function
// exports.sayHello = functions.https.onCall((data, context) => {
//   if (data.name) {
//     return `hello ${data.name}`;
//   }
//   return "hello, ninjas";
// });


exports.getAllUsers = functions.https.onRequest((req, res) => {
  const allUsers = [];
  return admin.auth().listUsers()
      .then(function(listUsersResult) {
        listUsersResult.users.forEach(function(userRecord) {
          // For each user
          const userData = userRecord.toJSON();
          allUsers.push(userData);
        });
        res.status(200).send(JSON.stringify(allUsers));
      })
      .catch(function(error) {
        console.log("Error listing users:", error);
        res.status(500).send(error);
      });
});
