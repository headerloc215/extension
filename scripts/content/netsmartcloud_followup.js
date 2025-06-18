let websiteURL = window.location.href;

(function () {
  function optionsToClickInputs(collectedPopupData) {
    return [
      {
        id: [
          "snv_Temp_Rdo_5",
          "snv_Pulse_Rdo_1",
          "snv_PulseReg_Rdo_4",
          "snv_Respir_Rdo_1",
          "snv_BloodPreRt_Rdo_2",
          "snv_BloodPreLt_Rdo_2",
          "svn_CarNoNegFind_Chk_key",
          "svn_GentoNoNegFind_Chk_key",
          "svn_NonNegFind_Chk_key",
          "svn_ResO2Satra_Chk_key",
          "svn_ResO2Sat_Chk_key",
          "svn_ClearRt_Chk_key",
          "svn_ClearLt_Chk_key",
          "svn_GasNoNegFind_Chk_key",
          "svn_GasNormoactive_Chk_key",
          "svn_NutHyNegativeFind_Chk_key",
          "svn_InteNoNegFind_Chk_key",
          "svn_InteIntact_Chk_key",
          "svn_MedReconciled_Chk_key",
          "svn_DicusPatient_Chk_key",
          "svn_DicusPcg_Chk_key",
          "svn_EndNoNegFind_Chk_key",
          "svn_FalPatLaVis_Rdo_0",
          "svn_InfPatNewInf_Rdo_0",
          "svn_InstruAdminOser_Rdo_2",
          "svn_PtVerbaUnder_Rdo_1",
          "svn_PtWillPerform_Rdo_1",
          "svn_IntrPatDoesWoun_Chk_key",
        ],
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-followup-precautions-check"] &&
          collectedPopupData[
            "netsmartcloud-followup-precautions-check"
          ].includes("oxygen"),
      },
      {
        id: [],
        condition: !(
          collectedPopupData["netsmartcloud-followup-precautions-check"] &&
          collectedPopupData[
            "netsmartcloud-followup-precautions-check"
          ].includes("oxygen")
        ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-followup-precautions-check"] &&
          collectedPopupData[
            "netsmartcloud-followup-precautions-check"
          ].includes("seizure"),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-followup-precautions-check"] &&
          collectedPopupData[
            "netsmartcloud-followup-precautions-check"
          ].includes("aspiration"),
      },
      {
        id: ["svn_NeuDisoriented_Chk_key", "svn_NeuDependentMgm_Chk_key"],
        condition:
          collectedPopupData["netsmartcloud-followup-mental-radio"] &&
          collectedPopupData["netsmartcloud-followup-mental-radio"] ===
            "unable to follow command",
      },
      {
        id: ["svn_NeuNoNegFind_Chk_key", "svn_NeuAlertOrien_Chk_key"],
        condition:
          collectedPopupData["netsmartcloud-followup-mental-radio"] ===
          "A/A/Ox4",
      },
      {
        id: ["svn_NeuConfused_Chk_key", "svn_NeuForgetful_Chk_key"],
        condition:
          collectedPopupData["netsmartcloud-followup-mental-radio"] ===
          "forgetful/confused",
      },
      {
        id: ["svn_ResSobDyspnea_Chk_key"],
        condition:
          collectedPopupData["netsmartcloud-followup-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-followup-diagnosis-check"].includes(
            "CHF"
          ),
      },
      {
        id: ["svn_GasGtube_Chk_key", "svn_NutHyFeedingNGt_Chk_key"],
        condition:
          collectedPopupData["netsmartcloud-followup-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-followup-diagnosis-check"].includes(
            "G-Tube"
          ),
      },
      {
        id: ["svn_IntrPicc_Chk_key"],
        condition:
          collectedPopupData["netsmartcloud-followup-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-followup-diagnosis-check"].includes(
            "PICC Line"
          ),
      },
      {
        id: ["svn_InteWound_Chk_key", "svn_InteIncision_Chk_key"],
        condition:
          collectedPopupData["netsmartcloud-followup-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-followup-diagnosis-check"].includes(
            "wound"
          ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-followup-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-followup-diagnosis-check"].includes(
            "Foley"
          ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-followup-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-followup-diagnosis-check"].includes(
            "diabetes"
          ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-followup-diagnosis-check"] &&
          (collectedPopupData[
            "netsmartcloud-followup-diagnosis-check"
          ].includes("DM") ||
            collectedPopupData[
              "netsmartcloud-followup-diagnosis-check"
            ].includes("DM1") ||
            collectedPopupData[
              "netsmartcloud-followup-diagnosis-check"
            ].includes("DM2") ||
            collectedPopupData[
              "netsmartcloud-followup-diagnosis-check"
            ].includes("diabetes")),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-followup-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-followup-diagnosis-check"].includes(
            "injection"
          ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-followup-home-radio"] &&
          collectedPopupData["netsmartcloud-followup-home-radio"] ===
            "Assisted Living",
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-followup-home-radio"] &&
          collectedPopupData["netsmartcloud-followup-home-radio"] === "home",
      },
      {
        id: [],
        condition:
          collectedPopupData["followup-home-check"] &&
          collectedPopupData["followup-home-check"].includes("alone"),
      },
      {
        id: [],
        condition:
          collectedPopupData["followup-home-check"] &&
          collectedPopupData["followup-home-check"].includes("family"),
      },
      {
        id: [
          "svn_PainDoPatPain_Rdo_1",
          "svn_PainInten1_Rdo_5",
          "svn_PainInten1Dull_Chk_key",
          "svn_PainContron1_Rdo_1",
          "svn_PainScale1_Rdo_4",
          "svn_PainNonGuard_Chk_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-followup-pain-radio"] &&
          collectedPopupData["netsmartcloud-followup-pain-radio"] === "pain",
      },
      {
        id: ["svn_PainDoPatPain_Rdo_0"],
        condition:
          collectedPopupData["netsmartcloud-followup-pain-radio"] &&
          collectedPopupData["netsmartcloud-followup-pain-radio"] === "nopain",
      },
      {
        id: ["svn_HomeSupervis_Chk_key", "svn_MusculoNoNegFind_Chk_key"],
        condition:
          collectedPopupData["netsmartcloud-followup-adl-radio"] &&
          collectedPopupData["netsmartcloud-followup-adl-radio"] === "#0",
      },
      {
        id: [
          "svn_HomeSupervis_Chk_key",
          "svn_HomeDevtoAmbul_Chk_key",
          "svn_HomePoorbala_Chk_key",
          "svn_HomeLeavingHome_Chk_key",
          "svn_MusculoAssisDev_Chk_key",
          "svn_MusculoCane_Chk_key",
          "svn_MusculoUnGait_Chk_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-followup-adl-radio"] &&
          collectedPopupData["netsmartcloud-followup-adl-radio"] === "#1",
      },
      {
        id: [
          "svn_HomeSupervis_Chk_key",
          "svn_HomeDevtoAmbul_Chk_key",
          "svn_HomePoorbala_Chk_key",
          "svn_HomeLeavingHome_Chk_key",
          "svn_MusculoAssisDev_Chk_key",
          "svn_MusculoWalker_Chk_key",
          "svn_MusculoWeakne_Chk_key",
          "svn_MusculoUnGait_Chk_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-followup-adl-radio"] &&
          collectedPopupData["netsmartcloud-followup-adl-radio"] === "#2",
      },
      {
        id: [
          "svn_HomeSupervis_Chk_key",
          "svn_HomeDevtoAmbul_Chk_key",
          "svn_HomePoorbala_Chk_key",
          "svn_HomeLeavingHome_Chk_key",
          "svn_MusculoAssisDev_Chk_key",
          "svn_MusculoWheelc_Chk_key",
          "svn_MusculoWeakne_Chk_key",
          "svn_MusculoWheelBou_Chk_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-followup-adl-radio"] &&
          collectedPopupData["netsmartcloud-followup-adl-radio"] === "#3",
      },
      {
        id: [
          "svn_HomeSupervis_Chk_key",
          "svn_HomeBedbound_Chk_key",
          "svn_HomeLeavingHome_Chk_key",
          "svn_MusculoBedbo_Chk_key",
          "svn_MusculoLimitedRom_Chk_key",
          "svn_MusculoStiffness_Chk_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-followup-adl-radio"] &&
          collectedPopupData["netsmartcloud-followup-adl-radio"] === "#4",
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
    if (collectedPopupData) {
      injectWorkingModal();

      function formWorkingActionInit() {
        const formSectionInterval = setInterval(async () => {
          const saveButton = document.querySelectorAll("[value='Save']")[0];
          if (saveButton && !saveButton.disabled) {
            clearInterval(formSectionInterval);
            await startFormFill(optionsToClickInputs(collectedPopupData));
            formWorkingActionInit();
          }

          if (websiteURL !== window.location.href) {
            clearInterval(formSectionInterval);
            removeWorkingModal();
            alert("Automation Completed Successfully");
            window.location.reload();
          }
        });
      }

      formWorkingActionInit();
    }
  })();

  async function startFormFill(options) {
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

    document.querySelectorAll("[value='Save']")[0].click();

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
