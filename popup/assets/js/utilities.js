import { initializeApp } from "../../../scripts/imports/js/firebase-app.js";
import {
  getFirestore,
  getDoc,
  updateDoc,
  doc,
} from "../../../scripts/imports/js/firebase-firestore.js";

export async function isAutomationLimitAvailable() {
  const { userLoggedInResponse, firebaseConfig } =
    await chrome.storage.local.get(["userLoggedInResponse", "firebaseConfig"]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const docRef = doc(db, "users", userLoggedInResponse.user.uid);
  const docSnap = await getDoc(docRef);

  let flag = { allow: false };

  if (docSnap.exists()) {
    const data = { uid: docSnap.id, ...docSnap.data() };

    if (data.automationRequests < 10) flag = { allow: true, data };
    else if (
      data.planExpiry &&
      new Date(data.planExpiry.seconds * 1000) > new Date()
    )
      flag = { allow: true, data };
  }

  return flag;
}

export const updateDataDoc = async (
  collectionName,
  collectionID,
  dataToBeUpdated
) => {
  const { firebaseConfig } = await chrome.storage.local.get(["firebaseConfig"]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const docRef = doc(db, collectionName, collectionID);
  try {
    await updateDoc(docRef, dataToBeUpdated);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export function openCheckOutPage() {
  chrome.tabs.create({
    url: chrome.runtime.getURL("view/pages/checkout.html"),
  });
}

export function showToast(toastID, alertType, msg) {
  try {
    const toastEl = document.getElementById(toastID);
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEl);
    toastEl.querySelector(`.${alertType}`).innerText = msg;
    toastBootstrap.show();
  } catch (error) {
    alert(msg);
  }
}
