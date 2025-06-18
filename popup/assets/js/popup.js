import {
  openCheckOutPage,
  updateDataDoc,
  isAutomationLimitAvailable,
  showToast,
} from "./utilities.js";

$(document).ready(function () {
  (async function () {
    const activeForm = window.location.href.split("#")[1];

    if (activeForm) {
      $(`.website-select option[data-container="#${activeForm}"]`).prop(
        "selected",
        true
      );
      $(".website-form-container").addClass("d-none"); // Hide all forms
      $("#" + activeForm).removeClass("d-none");
    }

    const { userDataDoc } = await chrome.storage.local.get(["userDataDoc"]);

    if (userDataDoc.profilePic)
      $(".profile-icon-image").attr("src", userDataDoc.profilePic);

    $(".profile-icon-options").append(
      `
      <li><a class="dropdown-item">${userDataDoc.fullName}</a></li>
      <li><a class="dropdown-item">${userDataDoc.email}</a></li>
      <li><a class="dropdown-item manage-sub-btn-click" href="#">Manage Subscription</a></li>
      <li><a class="dropdown-item logout-ext-btn" href="#">Logout</a></li>
      `
    );
  })();

  $(document).on("click", ".manage-sub-btn-click", function () {
    openCheckOutPage();
    window.close();
  });

  $(document).on("click", ".logout-ext-btn", function () {
    chrome.storage.local.remove(["userLoggedInResponse", "userDataDoc"]);
    window.close();
  });

  $(".website-select").on("change", function () {
    let selectedValue = $(this).val(); // Get selected value
    let selectedContainer = $(this).find(":selected").data("container"); // Get data-container value

    if (
      selectedContainer === "#hospicemd_website_form" ||
      selectedContainer === "#COM_website_form"
    ) {
      window.location.href =
        "../../../extension-other/popup.html" + selectedContainer;
    }

    $(".website-form-container").addClass("d-none"); // Hide all forms
    $(selectedContainer).removeClass("d-none"); // Show the selected one
  });

  document
    .querySelectorAll(
      "#soc-form, #roc-form, #recert-form, #soc-form-kinnser, #recert-kinnser-form-kinnser, #followup-kinnser-form-kinnser"
    )
    .forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent page refresh

        $("button[type='submit']").parent().addClass("d-none");
        $(".start-fill-loader").removeClass("d-none");

        const { allow, data } = await isAutomationLimitAvailable();

        if (!allow) {
          openCheckOutPage();
          window.close();
          return;
        }

        const form = event.target; // The form element
        const collectedData = {};

        Array.from(form.elements).forEach((element) => {
          if (
            element.name &&
            (element.type === "radio" || element.type === "checkbox")
          ) {
            if (element.type === "checkbox") {
              // Handle checkboxes
              if (element.checked) {
                collectedData[element.name] = collectedData[element.name] || [];
                collectedData[element.name].push(element.value);
              }
            } else if (element.type === "radio") {
              // Handle radio buttons
              if (element.checked) {
                collectedData[element.name] = element.value;
              }
            }
          }
        });

        console.log({ collectedData });

        chrome.storage.local
          .set({ collectedPopupData: collectedData })
          .then(() => {
            chrome.tabs.query(
              { active: true, currentWindow: true },
              async (tabs) => {
                const activeTabId = tabs[0]?.id;

                const websiteSelect = $(".website-select").val();
                console.log({ tabs, collectedData, websiteSelect });

                if (activeTabId && tabs[0].url.includes(websiteSelect)) {
                  const files = [];
                  let injectScriptFlag = true;
                  if (event.target.id === "soc-form")
                    files.push("scripts/content/index.js");
                  else if (event.target.id === "roc-form")
                    files.push("scripts/content/tarlani_mobile_roc.js");
                  else if (event.target.id === "recert-form")
                    files.push("scripts/content/tarlani_mobile_recert.js");
                  else if (event.target.id === "followup-kinnser-form-kinnser")
                    files.push("scripts/content/kinnser_followup.js");
                  else if (event.target.id === "soc-form-kinnser") {
                    injectScriptFlag = false;
                    chrome.storage.local.set({
                      startFormAuto: "soc-form-kinnser",
                    });
                  } else if (
                    event.target.id === "recert-kinnser-form-kinnser"
                  ) {
                    injectScriptFlag = false;
                    chrome.storage.local.set({
                      startFormAuto: "recert-kinnser-form-kinnser",
                    });
                  }

                  await updateDataDoc("users", data.uid, {
                    automationRequests: data.automationRequests + 1,
                  });

                  if (injectScriptFlag) {
                    // Inject and execute the content script
                    chrome.scripting.executeScript({
                      target: { tabId: activeTabId },
                      files: files, // Ensure this file exists
                    });
                  }

                  window.close();
                } else {
                  showToast(
                    "toast-error",
                    "alert-danger",
                    "Please choose correct website."
                  );

                  $("button[type='submit']").parent().removeClass("d-none");
                  $(".start-fill-loader").addClass("d-none");
                }
              }
            );
          });
      });
    });
});
