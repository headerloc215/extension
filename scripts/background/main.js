chrome.runtime.onInstalled.addListener((reason) => {
  setExtensionKeys();
  // chrome.storage.local.remove(["startFormAuto", "autoFormWorking"]);
});

function setExtensionKeys() {
  chrome.storage.local.clear(function () {
    chrome.storage.local
      .set({
        CLIENT_ID:
          "569381160514-k3l7hu1f2aqks7aaj0goutgplh9vjlh2.apps.googleusercontent.com",
        CLIENT_SECRET: "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",
        firebaseConfig: {
          apiKey: "AIzaSyC7tmUecTqX4NL6suQXHS26oI5U4ycxEyM",
          authDomain: "clickdoc-cd813.firebaseapp.com",
          projectId: "clickdoc-cd813",
          storageBucket: "clickdoc-cd813.firebasestorage.app",
          messagingSenderId: "569381160514",
          appId: "1:569381160514:web:2a0f3517ffd472e3820fdb",
          measurementId: "G-EWK0M8PFHD",
        },
        firebaseFunctionsBaseURL:
          "https://us-central1-clickdoc-cd813.cloudfunctions.net",
      })
      .then(() => {
        console.log("Key are set!");
      });
  });
}

// chrome.action.onClicked.addListener(() => {
//   chrome.tabs.create({ url: chrome.runtime.getURL("view/pages/index.html") });
// });
