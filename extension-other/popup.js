import {
  openCheckOutPage,
  updateDataDoc,
  isAutomationLimitAvailable,
  showToast,
} from "../popup/assets/js/utilities.js";

let socSectionIsActive = true;
let fuSectionIsActive = false;

document.addEventListener("DOMContentLoaded", function () {
  // const socButton = document.getElementById("soc");
  const socButton = document.getElementById("soc-tab");
  const rocButton = document.getElementById("roc");
  const recertButton = document.getElementById("recert");
  const dcButton = document.getElementById("dc");
  // const fuButton = document.getElementById("fu");
  const fuButton = document.getElementById("fu-tab");

  const socSection = document.getElementById("socSection");
  const fuSection = document.getElementById("fuSection");

  function showSection(activeSection) {
    socSection.classList.remove("active");
    fuSection.classList.remove("active");

    activeSection.classList.add("active");
  }

  socButton.addEventListener("click", function () {
    // showSection(socSection);
    // setActiveButton(socButton);

    socSectionIsActive = true;
    fuSectionIsActive = false;
  });

  fuButton.addEventListener("click", function () {
    // showSection(fuSection);
    // setActiveButton(fuButton);

    socSectionIsActive = false;
    fuSectionIsActive = true;
  });

  // Highlight the active button
  function setActiveButton(activeButton) {
    // Remove active class from all buttons
    socButton.classList.remove("active");
    rocButton.classList.remove("active");
    recertButton.classList.remove("active");
    dcButton.classList.remove("active");
    fuButton.classList.remove("active");

    // Add active class to the clicked button
    activeButton.classList.add("active");
  }
});

$(".startButton").click(async () => {
  const { allow, data } = await isAutomationLimitAvailable();

  if (!allow) {
    openCheckOutPage();
    window.close();
    return;
  }

  const adls = document.querySelector('input[name="adls"]:checked')?.value;
  const dme = document.querySelector('input[name="dme"]:checked')?.value;
  const mental = document.querySelector('input[name="mental"]:checked')?.value;
  const home = document.querySelector('input[name="home"]:checked')?.value;
  const selectedDiagnoses = Array.from(
    document.querySelectorAll('input[name="diagnosis"]:checked')
  ).map((checkbox) => checkbox.value);
  const precautions = Array.from(
    document.querySelectorAll('input[name="precautions"]:checked')
  ).map((checkbox) => checkbox.value);

  //f/u
  const fu_adls = document.querySelector('input[name="f-adls"]:checked')?.value;
  const fu_dme = document.querySelector('input[name="f-dme"]:checked')?.value;
  const fu_mental = document.querySelector(
    'input[name="f-mental"]:checked'
  )?.value;
  const fu_diagnosis = Array.from(
    document.querySelectorAll('input[name="f-diagnosis"]:checked')
  ).map((checkbox) => checkbox.value);

  // const project = document.getElementById("project");

  const websiteSelect = $(".website-select").val();

  let options = {
    adls: adls,
    dme: dme,
    mental: mental,
    home: home,
    diagnosis: selectedDiagnoses,
    precautions: precautions,
    fu_adls: fu_adls,
    fu_dme: fu_dme,
    fu_mental: fu_mental,
    fu_diagnosis: fu_diagnosis,
    // project: project.value,
    project:
      websiteSelect === "hospicemd"
        ? "project1"
        : websiteSelect === "devero"
        ? "project3"
        : "",

    followUpIsActive: fuSectionIsActive,
    SocIsActive: socSectionIsActive,
  };

  console.log({ options });

  await updateDataDoc("users", data.uid, {
    automationRequests: data.automationRequests + 1,
  });

  const tabId = await getCurrentTabId();
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: startProcess,
    args: [options],
  });

  // chrome.scripting.executeScript(
  //   {
  //     target: { tabId: tabId, allFrames: true },
  //     files: ['injected.js'] // Path to your external script
  //   },
  //   () => {
  //     console.log("Script injected into the page!");
  //   }
  // );
});

function getCurrentTabId() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        reject("No active tab found");
      } else {
        resolve(tabs[0].id);
      }
    });
  });
}
function startProcess(options) {
  FillForm(options);
}

$(".website-select").on("change", function () {
  let selectedValue = $(this).val(); // Get selected value
  let selectedContainer = $(this).find(":selected").data("container"); // Get data-container value

  if (
    selectedContainer === "#hospicemd_website_form" ||
    selectedContainer === "#COM_website_form"
  ) {
    window.location.href = "./popup.html" + selectedContainer;
    window.location.reload();
  } else {
    window.location.href = "../popup/pages/index.html" + selectedContainer;
  }
});

function hideUniqueWebsiteForms() {
  $(".netsmartcloud-roc-state").hide();
  $(".netsmartcloud-followup-state").hide();
  $(".netsmartcloud-recert-state").hide();
  $(".netsmartcloud-discharge-state").hide();
}

(async function () {
  const activeForm = window.location.href.split("#")[1];

  hideUniqueWebsiteForms();

  if (activeForm) {
    $(`.website-select option[data-container="#${activeForm}"]`).prop(
      "selected",
      true
    );
  }

  if (activeForm === "COM_website_form") {
    $(".netsmartcloud-roc-state").show();
    $(".netsmartcloud-followup-state").show();
    $(".netsmartcloud-recert-state").show();
    $(".netsmartcloud-discharge-state").show();
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

document
  .querySelectorAll(
    "#netsmartcloud-roc-form, #netsmartcloud-followup-form, #netsmartcloud-recert-form, #netsmartcloud-discharge-form"
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
                if (event.target.id === "netsmartcloud-roc-form")
                  files.push("scripts/content/netsmartcloud_roc.js");
                else if (event.target.id === "netsmartcloud-followup-form")
                  files.push("scripts/content/netsmartcloud_followup.js");
                else if (event.target.id === "netsmartcloud-recert-form")
                  files.push("scripts/content/netsmartcloud_recert.js");
                else if (event.target.id === "netsmartcloud-discharge-form")
                  files.push("scripts/content/netsmartcloud_discharge.js");

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
