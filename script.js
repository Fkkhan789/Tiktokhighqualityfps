
// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD5Uks1nfMBHzst3gLngvPzUBX-0Jo2yy8",
  authDomain: "tiktok60fps-3560f.firebaseapp.com",
  databaseURL: "https://tiktok60fps-3560f-default-rtdb.firebaseio.com",
  projectId: "tiktok60fps-3560f",
  storageBucket: "tiktok60fps-3560f.firebasestorage.app",
  messagingSenderId: "251064722858",
  appId: "1:251064722858:web:eb7328ab9107c5e423b7d3",
  measurementId: "G-SSDM6S561P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function submitPayment() {
  const phone = document.getElementById("userPhone").value.trim();
  const trx = document.getElementById("trxId").value.trim();
  const statusMsg = document.getElementById("statusMsg");

  if (!phone || !trx) {
    alert("Meharbani karke dono fields fill karein!");
    return;
  }

  // Safe Key for Firebase Database
  const userKey = phone.replace(/[^0-9]/g, "");

  // Save data to Firebase
  database.ref('users/' + userKey).set({
    phone: phone,
    trxId: trx,
    status: "pending"
  }).then(() => {
    statusMsg.style.display = "block";
    listenForApproval(userKey);
  }).catch((error) => {
    alert("Error: " + error.message);
  });
}

function listenForApproval(userKey) {
  // Realtime Live Approval Listener
  database.ref('users/' + userKey + '/status').on('value', (snapshot) => {
    const status = snapshot.val();
    if (status === "approved") {
      document.getElementById("lockCard").style.display = "none";
      document.getElementById("trickCard").style.display = "block";
    }
  });
}
