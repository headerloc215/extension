import { initializeApp } from "../../../scripts/imports/js/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../../../scripts/imports/js/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  getDoc,
} from "../../../scripts/imports/js/firebase-firestore.js";

(async function () {
  const { firebaseConfig, CLIENT_ID, CLIENT_SECRET } =
    await chrome.storage.local.get([
      "firebaseConfig",
      "CLIENT_ID",
      "CLIENT_SECRET",
    ]);
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const db = getFirestore(app);

  $(document).ready(function () {
    $(".form-toggle").click(function () {
      const el = $(this);
      $(el.attr("data-form-active")).removeClass("d-none");
      $(el.attr("data-form-hide")).addClass("d-none");
    });

    $("#sign-in-form").submit(async function (ev) {
      ev.preventDefault();
      const el = $(this);
      const email = el.find('input[type="email"]').val();
      const password = el.find('input[type="password"]').val();
      el.find('button[type="submit"]').addClass("d-none");
      el.find(".spinner-login").removeClass("d-none");

      try {
        const userLoggedIn = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const docRef = doc(db, "users", userLoggedIn.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { uid: docSnap.id, ...docSnap.data() };

          chrome.storage.local.set(
            {
              userLoggedInResponse: userLoggedIn,
              userDataDoc: data,
            },
            function () {
              window.location = "./index.html";
            }
          );
        } else throw "error";
      } catch (error) {
        const errMsg = error.message || "Please try again";

        showToast(
          "toast-error",
          "alert-danger",
          errMsg.replace(/firebase:?/gi, "")
        );
        el.find('button[type="submit"]').removeClass("d-none");
        el.find(".spinner-login").addClass("d-none");
      }
    });

    $("#sign-up-form").submit(async function (ev) {
      ev.preventDefault();
      const el = $(this);
      try {
        const email = el.find('input[type="email"]').val();
        if (!isValidEmail(email)) {
          showToast(
            "toast-error",
            "alert-danger",
            "Please enter a valid email"
          );
          return;
        }
        const name = el.find('input[type="name"]').val();
        const password = el.find('input[type="password"]').val();
        el.find('button[type="submit"]').addClass("d-none");
        el.find(".spinner-login").removeClass("d-none");

        const userLoggedIn = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const firebaseStoreUser = {
          email: email,
          fullName: name,
          loginMethod: "email",
          automationRequests: 0,
          planStatus: "trial",
          planExpiry: null,
          planName: null,
          profilePic: null,
          stripeCustomerID: null,
          stripePriceID: null,
        };

        await setDoc(
          doc(db, "users", userLoggedIn.user.uid),
          firebaseStoreUser
        );

        chrome.storage.local.set(
          {
            userLoggedInResponse: userLoggedIn,
            userDataDoc: firebaseStoreUser,
          },
          function () {
            window.location = "./index.html";
          }
        );
      } catch (error) {
        const errMsg = error.message || "Please try again";

        showToast(
          "toast-error",
          "alert-danger",
          errMsg.replace(/firebase:?/gi, "")
        );
        el.find('button[type="submit"]').removeClass("d-none");
        el.find(".spinner-login").addClass("d-none");
      }
    });

    $(".google-login-btn").click(function () {
      const el = $(this);
      el.addClass("d-none");
      el.parent().find(".spinner-social-login").removeClass("d-none");
      logInWithGoogle(CLIENT_ID, CLIENT_SECRET)
        .then(async (info) => {
          const idToken = info.id_token;
          const credential = GoogleAuthProvider.credential(idToken);

          console.log({ info });

          const response = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + info.access_token,
              },
            }
          );

          const dataGoogleUser = await response.json();

          // Sign in with credential from the Google user.
          signInWithCredential(auth, credential)
            .then(async (res) => {
              const q = query(
                collection(db, "users"),
                where("email", "==", info.user_info.email)
              );

              const querySnapshot = await getDocs(q);

              let firebaseStoreUser = null;
              querySnapshot.forEach((doc) => {
                firebaseStoreUser = doc.data();
              });

              if (!firebaseStoreUser) {
                firebaseStoreUser = {
                  email: info.user_info.email,
                  fullName:
                    dataGoogleUser.given_name +
                    " " +
                    dataGoogleUser.family_name,
                  loginMethod: "google",
                  automationRequests: 0,
                  planStatus: "trial",
                  planExpiry: null,
                  planName: null,
                  profilePic: dataGoogleUser.picture,
                  stripeCustomerID: null,
                  stripePriceID: null,
                };
                await setDoc(doc(db, "users", res.user.uid), firebaseStoreUser);
              }

              chrome.storage.local.set(
                {
                  userLoggedInResponse: res,
                  userDataDoc: firebaseStoreUser,
                },
                function () {
                  window.location = "./index.html";
                }
              );
            })
            .catch((error) => {
              const errMsg = error.message || "Please try again";

              showToast(
                "toast-error",
                "alert-danger",
                errMsg.replace(/firebase:?/gi, "")
              );
              el.removeClass("d-none");
              el.parent().find(".spinner-social-login").addClass("d-none");
            });
        })
        .catch((error) => {
          const errMsg = error.message || "Please try again";

          showToast(
            "toast-error",
            "alert-danger",
            errMsg.replace(/firebase:?/gi, "")
          );
          el.removeClass("d-none");
          el.parent().find(".spinner-social-login").addClass("d-none");
        });
    });
  });
})();

function showToast(toastID, alertType, msg) {
  try {
    const toastEl = document.getElementById(toastID);
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEl);
    toastEl.querySelector(`.${alertType}`).innerText = msg;
    toastBootstrap.show();
  } catch (error) {
    alert(msg);
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function logInWithGoogle(CLIENT_ID, CLIENT_SECRET) {
  return new Promise((resolve, reject) => {
    const RESPONSE_TYPE = encodeURIComponent("code");
    const REDIRECT_URI = encodeURIComponent(
      chrome.identity.getRedirectURL("google-login-pro")
    );
    const SCOPE = encodeURIComponent("openid profile email");
    const STATE = encodeURIComponent(
      "meet" + Math.random().toString(36).substring(2, 15)
    );
    const PROMPT = encodeURIComponent("consent");
    const access_type = encodeURIComponent("offline");

    function create_auth_endpoint() {
      let nonce = encodeURIComponent(
        Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
      );

      let openId_endpoint_url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${STATE}&nonce=${nonce}&access_type=${access_type}&prompt=${PROMPT}`;
      return openId_endpoint_url;
    }

    chrome.identity.launchWebAuthFlow(
      {
        url: create_auth_endpoint(),
        interactive: true,
      },
      function (redirect_url) {
        if (chrome.runtime.lastError) {
          reject("Some Problem Occured");
        } else {
          let code = redirect_url.substring(redirect_url.indexOf("code=") + 5);
          code = code.substring(0, code.indexOf("&"));

          if (!code || code === "") reject("Some Problem Occured");

          function parseJwt(token) {
            var base64Url = token.split(".")[1];
            var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            var jsonPayload = decodeURIComponent(
              atob(base64)
                .split("")
                .map(function (c) {
                  return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
            );

            return JSON.parse(jsonPayload);
          }

          fetch("https://accounts.google.com/o/oauth2/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code: decodeURIComponent(code),
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              redirect_uri: decodeURIComponent(REDIRECT_URI),
              grant_type: "authorization_code",
            }),
          })
            .then((res) => res.json())
            .then((tokens) => {
              tokens.user_info = parseJwt(tokens.id_token);
              resolve(tokens);
            })
            .catch((err) => {
              reject(err);
            });
        }
      }
    );
  });
}
