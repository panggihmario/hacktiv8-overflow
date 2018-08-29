var firebase = require('firebase')
var config = {
    apiKey: "AIzaSyANSmffR98E_pT1Hwdxg5hSTUozsbcVGEo",
    authDomain: "overflow-47b94.firebaseapp.com",
    databaseURL: "https://overflow-47b94.firebaseio.com",
    projectId: "overflow-47b94",
    storageBucket: "overflow-47b94.appspot.com",
    messagingSenderId: "257823246937"
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.FacebookAuthProvider();
  var auth = firebase.auth()
  module.exports = {provider,auth}
