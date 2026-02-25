import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  databaseURL: "SUA_DATABASE_URL",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function salvarStatusOnline(id, status){
    set(ref(database, "status/" + id), status);
}

function ouvirStatusOnline(id, callback){
    const statusRef = ref(database, "status/" + id);
    onValue(statusRef, (snapshot) => {
        const valor = snapshot.val();
        callback(valor || "indisponivel");
    });
}

window.salvarStatusOnline = salvarStatusOnline;
window.ouvirStatusOnline = ouvirStatusOnline;