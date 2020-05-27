
var firebaseConfig = {
  apiKey: "AIzaSyBXHgID16kO-EwNkfkOsIzYCCxczbnNRrI",
  authDomain: "chatapp-desktop.firebaseapp.com",
  databaseURL: "https://chatapp-desktop.firebaseio.com",
  projectId: "chatapp-desktop",
  storageBucket: "chatapp-desktop.appspot.com",
  messagingSenderId: "1091061105720",
  appId: "1:1091061105720:web:321d30b1d31d6694a012cd",
  measurementId: "G-SFSP133GNS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

 db = firebase.firestore();

// Get the name for the user
if (!localStorage.getItem('name')) {
	name = prompt('What is your name?')
	localStorage.setItem('name', name)
} else {
	name = localStorage.getItem('name')
}
document.querySelector('#name').innerText = name

// Change name
document.querySelector('#change-name').addEventListener('click', () => {
	name = prompt('What is your name?')
	document.querySelector('#name').innerText = name
})

// Send a new chat message
document.querySelector('#message-form').addEventListener('submit', e => {
	e.preventDefault();
	db.collection("messages")
	.add({
		name: name,
		message: document.querySelector('#message-input').value 
	})
	.then(function (docRef) {
		console.log("Document written with ID: ", docRef.id);
		document.querySelector('#message-form').reset()
	})
	.catch(function (error) {
		console.error("Error adding document: ", error);
	});
})

// All the JavaSctipt code from the previous lessons in this course section

document.querySelector('#clear').addEventListener('click', () => {

  db.collection("messages")
    .get()
    // Step 2 (if success)
    .then(function(snapshot) {
      snapshot.forEach(function(doc) {
      // Step 3
      db.collection("messages").doc(doc.id).delete()
        // Step 4 (if success)
        .then(function() {
        console.log("Document successfully deleted!");
      })
      // Step 4 (if error)
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
    });
  })
    // Step 2 (if error)
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
})

// Display chat stream
db.collection("messages")
.onSnapshot(function(snapshot) {
	document.querySelector('#messages').innerHTML = ""
	snapshot.forEach(function(doc) {
		var message = document.createElement('div')
		message.innerHTML = `
		<p class="name">${doc.data().name}</p>
		<p>${doc.data().message}</p>
		`
		document.querySelector('#messages').prepend(message)
	});
});