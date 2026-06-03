function helloWorld() {
  console.log("Running helloWorld")
  firebase.database().ref('/').set(
    {
      message: 'Kia ora te ao'
    }
  )
}