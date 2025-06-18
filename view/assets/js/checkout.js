import { initializeApp } from "../../../scripts/imports/js/firebase-app.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "../../../scripts/imports/js/firebase-firestore.js";

const url = new URL(window.location);
const clientSecretByURL = url.searchParams.get("payment_intent_client_secret");

if (clientSecretByURL) window.close();

$(document).ready(async function () {
  const { userLoggedInResponse, userDataDoc, firebaseFunctionsBaseURL } =
    await chrome.storage.local.get([
      "userLoggedInResponse",
      "userDataDoc",
      "firebaseFunctionsBaseURL",
    ]);

  if (!(userLoggedInResponse && userDataDoc)) window.close();

  const stripePlansData = await getStripePlansData(firebaseFunctionsBaseURL);

  const stripeKeys = await getStripeKey(firebaseFunctionsBaseURL);

  let stripeElementHTML;

  const stripe = Stripe(stripeKeys.keys.public_key);

  stripePlansData.plans.sort(
    (a, b) => a.price.unit_amount - b.price.unit_amount
  );

  const userDataDocData = await getUserDataDoc();

  const activePlan = stripePlansData.plans.filter(
    (a) => a.price.id === userDataDocData.stripePriceID
  )[0];

  stripePlansData.plans.forEach((plan) => {
    let featureListHTML = "";
    plan.product.marketing_features.forEach(
      (item) => (featureListHTML = featureListHTML + `<li>${item.name}</li>`)
    );
    $(".planItem__container").append(
      `
        <div class="planItem planItem--pro">
            <div class="card__">
                <div class="card__header">
                    
                    <h2>${plan.product.name}</h2>
                </div>
                <div class="card__desc">
                    ${plan.product.description}
                </div>
            </div>
    
            <div class="price">$${
              plan.price.unit_amount / 100
            }<span>/ month</span></div>
    
            <ul class="featureList">
            ${featureListHTML}
            </ul>
    
            <button data-price-id="${
              plan.price.id
            }" class="choose-plan-btn button button--pink">${
        activePlan && activePlan.price.unit_amount > plan.price.unit_amount
          ? "Downgrade Plan"
          : activePlan && activePlan.price.unit_amount < plan.price.unit_amount
          ? "Upgrade Plan"
          : activePlan && activePlan.price.id === plan.price.id
          ? "Cancel Plan"
          : "Choose Plan"
      }</button>
            <div class="plan-button-clicked-loader button--pink d-none button">
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        `
    );
  });
  $(".plan-data-loader").addClass("d-none");

  console.log({ stripePlansData });

  $(document).on("click", ".choose-plan-btn", async function () {
    const btn = $(this);
    const btnText = btn.text();
    const stripePriceID = btn.attr("data-price-id");
    console.log({ btnText });
    $(".choose-plan-btn").addClass("d-none");
    $(".plan-button-clicked-loader").removeClass("d-none");

    if (btnText === "Downgrade Plan" || btnText === "Upgrade Plan") {
      const { success } = await fetch(
        firebaseFunctionsBaseURL + "/updateStripeSubscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userDataDocID: userDataDocData.uid,
            newPriceID: stripePriceID,
          }),
        }
      ).then((r) => r.json());
      location.reload();
      return;
    }

    if (btnText === "Cancel Plan") {
      const { success } = await fetch(
        firebaseFunctionsBaseURL + "/cancelStripeSubscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userDataDocID: userDataDocData.uid,
          }),
        }
      ).then((r) => r.json());
      location.reload();
      return;
    }

    const { customerID } = await fetch(
      firebaseFunctionsBaseURL + "/createStripeCustomer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userDataDoc.email,
          fullName: userDataDoc.fullName,
          userDataDocID: userLoggedInResponse.user.uid,
        }),
      }
    ).then((r) => r.json());

    const { clientSecret } = await fetch(
      firebaseFunctionsBaseURL + "/createStripeSubscription",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceID: stripePriceID,
          customerID: customerID,
        }),
      }
    ).then((r) => r.json());

    stripeElementHTML = stripe.elements({ clientSecret });
    const paymentElement = stripeElementHTML.create("payment");
    paymentElement.mount("#payment-element");

    $("#stripe-payment-modal-container").modal("show");

    $(".choose-plan-btn").removeClass("d-none");
    $(".plan-button-clicked-loader").addClass("d-none");
  });

  $("#payment-form").submit(async function (e) {
    e.preventDefault();

    const submitBtn = $(this).find("[type='submit']");

    submitBtn.attr("disabled", true);

    // Confirm the payment given the clientSecret
    // from the payment intent that was just created on
    // the server.
    const { error: stripeError } = await stripe.confirmPayment({
      elements: stripeElementHTML,
      confirmParams: {
        return_url: `${window.location.href}`,
      },
    });

    if (stripeError) {
      alert(stripeError.message);
      submitBtn.attr("disabled", false);
      return;
    }
  });
});

async function getStripePlansData(firebaseFunctionsBaseURL) {
  const planData = await fetch(firebaseFunctionsBaseURL + "/getPlansData");

  return await planData.json();
}

async function getStripeKey(firebaseFunctionsBaseURL) {
  const result = await fetch(firebaseFunctionsBaseURL + "/getStripePublicKeys");

  return await result.json();
}

async function getUserDataDoc() {
  const { userLoggedInResponse, firebaseConfig } =
    await chrome.storage.local.get(["userLoggedInResponse", "firebaseConfig"]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const docRef = doc(db, "users", userLoggedInResponse.user.uid);
  const docSnap = await getDoc(docRef);

  let data;

  if (docSnap.exists()) {
    data = { uid: docSnap.id, ...docSnap.data() };
  }

  return data;
}
