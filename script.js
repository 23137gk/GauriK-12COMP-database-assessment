
// Get the form data
async function writeForm(){

  if (!GLOBAL_user) {
    alert("You must log in first!");
    return;
  }

  console.log("Welcome!")

  const name = document.getElementById("name").value; 
  const Age = document.getElementById("Age").value;
  const EmailAddress = document.getElementById('EmailAddress').value;

  await firebase.database().ref('userInfo/' + GLOBAL_user.uid).set({
  name: name,
  age: Age,
  email: EmailAddress
});

console.log("Data saved!");
alert("Data saved!");

// Go to another page AFTER saving
    window.location.href = "Gamepage.html";

}
/*
async function blockingRead() {
  console.log("Saving data");
  var snapshot = await firebase.database().ref('/message').once('value');
  displayRead(snapshot);
  console.log("Leaving blockingRead")
}
*/




var GLOBAL_user; // Google's user object

// set up a listener for the login state of the user.
function fb_login() {
  firebase.auth().onAuthStateChanged(fb_handleLogin);
  fb_popupLogin();
}


// run the google login popup
function fb_popupLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  
  firebase.auth().signInWithPopup(provider).then((result) => {
      GLOBAL_user = result.user; // save the user details object to a global variable
      console.log("User has logged in:", GLOBAL_user.email);
    })
    .catch((error) => {
      console.log("Login error:", error);
    });
}

// run when the login state of the user changes
function fb_handleLogin(_user) {
  if (_user) {
    console.log("User is logged in");
    GLOBAL_user = _user; //save the user details object to a global variable
  } else {
    console.log("User is Not logged in - Starting the Popup Process");
  }
}