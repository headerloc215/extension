(function () {
  function optionsToClickInputs(collectedPopupData) {
    return [
      {
        id: [
          "PatientIdentity",
          "vitalSignPulseRegularR",
          "vitalSignStandard",
          "cardioWnl",
          "cardioCapRefill3N",
          "respWnl",
          "neuroVisionWNL",
          "medicalMedicataionChangeN",
          "medicalMedicataionCompliancey",
          "homeboundV2Yes",
          "homeboundV2Criteria1A",
          "homeboundV2Criteria1B",
          "homeboundV2Criteria2A",
          "guWNL",
          "psycWNL",
          "skinWNL",
          "painManagement",
          "digestWNL",
          "digestLastBmWNL",
          "digestMealsPrepared",
          "skilledInterventionVerbalizedPt",
          "skilledInterventionVerbalizedCg",
          "skilledInterventionDemonstrationPt",
          "skilledInterventionDemonstrationCg",
          "neuroPERRL",
        ],
      },
      {
        id: ["neuroDisoriented", "psycImpairedDecisionMaking"],
        condition:
          collectedPopupData["followup-kinnser-mental-radio"] &&
          collectedPopupData["followup-kinnser-mental-radio"] ===
            "unable to follow command",
      },
      {
        id: ["neuroPerson", "neuroPlace", "neuroTime"],
        condition: !(
          collectedPopupData["followup-kinnser-mental-radio"] ===
            "unable to follow command" ||
          collectedPopupData["followup-kinnser-mental-radio"] ===
            "forgetful/confused"
        ),
      },
      {
        id: [],
        condition:
          collectedPopupData["followup-kinnser-mental-radio"] === "A/A/Ox4",
      },
      {
        id: [
          "neuroDisoriented",
          "neuroForgetful",
          "neuroPERRL",
          "psycImpairedDecisionMaking",
        ],
        condition:
          collectedPopupData["followup-kinnser-mental-radio"] ===
          "forgetful/confused",
      },
      {
        id: ["muscWNL", "muscGripStrengthEqN"],
        condition:
          collectedPopupData["followup-kinnser-adl-radio"] &&
          collectedPopupData["followup-kinnser-adl-radio"] === "#0",
      },
      {
        id: [
          "muscWeakness",
          "muscAmbulation",
          "muscPoorBalance",
          "muscGripStrengthEqN",
          "muscAssistiveDevice",
        ],
        condition:
          collectedPopupData["followup-kinnser-adl-radio"] &&
          collectedPopupData["followup-kinnser-adl-radio"] === "#1",
      },
      {
        id: [
          "muscWeakness",
          "muscAmbulation",
          "muscPoorBalance",
          "muscGripStrengthEqN",
          "muscAssistiveDevice",
        ],
        condition:
          collectedPopupData["followup-kinnser-adl-radio"] &&
          collectedPopupData["followup-kinnser-adl-radio"] === "#2",
      },
      {
        id: [
          "muscWeakness",
          "muscAmbulation",
          "muscPoorBalance",
          "muscGripStrengthEqN",
          "muscAssistiveDevice",
          "muscLimitedMobility",
          "muscChairBound",
        ],
        condition:
          collectedPopupData["followup-kinnser-adl-radio"] &&
          collectedPopupData["followup-kinnser-adl-radio"] === "#3",
      },
      {
        id: [
          "muscWeakness",
          "muscAssistiveDevice",
          "muscLimitedMobility",
          "muscBedBound",
        ],
        condition:
          collectedPopupData["followup-kinnser-adl-radio"] &&
          collectedPopupData["followup-kinnser-adl-radio"] === "#4",
      },
    ];
  }

  const safeClick = (selector) => {
    const input = document.getElementById(selector);
    if (!input) return; // Skip if the label is not found

    // Only click if the input is not checked/selected
    if (input && !input.checked) {
      input.click();
    }
  };

  (async function () {
    const { collectedPopupData } = await chrome.storage.local.get([
      "collectedPopupData",
    ]);
    injectWorkingModal();
    console.log({ collectedPopupData });

    await startFormFill(optionsToClickInputs(collectedPopupData));
    removeWorkingModal();
    alert("Automation Completed Successfully");
  })();

  async function startFormFill(options) {
    console.log({ options });

    await new Promise((resolve) => setTimeout(resolve, 500));

    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

    await new Promise((resolve) => setTimeout(resolve, 500));

    options.forEach((element) => {
      if (element.hasOwnProperty("condition") && element.condition)
        element.id.forEach((i) => safeClick(i));
      else if (!element.hasOwnProperty("condition"))
        element.id.forEach((i) => safeClick(i));
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    return;
  }

  function injectWorkingModal() {
    // Create the modal container
    const modal = document.createElement("div");
    modal.id = "working-modal-main-ext";

    // Create the modal content
    const modalContent = document.createElement("div");
    modalContent.className = "working-modal-content-ext";
    modalContent.innerHTML = `<p>Filling the form, Please Wait...</p>`;

    // Append the modal content to the modal container
    modal.appendChild(modalContent);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Add the CSS styles dynamically
    const style = document.createElement("style");
    style.textContent = `/* The Modal (background) */
    #working-modal-main-ext {
      position: fixed; /* Stay in place */
      z-index: 1000000; /* Sit on top */
      padding-top: 100px; /* Location of the box */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content */
    .working-modal-content-ext {
      background-color: #fefefe;
      margin: auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      font-size:20px;
    }`;

    // Append the style to the head
    document.head.appendChild(style);

    // Optionally, display the modal (hidden by default)
    // modal.style.display = "block"; // To show the modal
  }

  function removeWorkingModal() {
    // Remove the modal element
    const modal = document.getElementById("working-modal-main-ext");
    if (modal) {
      modal.remove();
    }

    // Remove the injected styles
    const styles = document.head.querySelectorAll("style");
    styles.forEach((style) => {
      if (
        style.textContent.includes(".working-modal-content-ext") ||
        style.textContent.includes("#working-modal-main-ext")
      ) {
        style.remove();
      }
    });
  }
})();
