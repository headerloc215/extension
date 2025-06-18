let websiteURL = window.location.href;

(function () {
  function optionsToClickInputs(collectedPopupData) {
    return [
      {
        id: [
          "M0150_CPAY_MCARE_HMO_key",
          "pti_InsCard_Chk_key",
          "pti_PtAddressConf_Chk_key",
          "SafetyHazardsNone_key",
          "Yes1p_1",
          "Yes2p_1",
          "Yes3p_1",
          "Yes4p_1",
          "Yes5p_1",
          "Yes6p_1",
          "emp_NaturalDisaster_Rdo_1",
          "cf_PulseRhythm_Rdo_1",
          "cf_PulseLoc_Rdo_1",
          "cf_BPLoc_Rdo_1",
          "cf_RespRhythm_Rdo_1",
          "cf_WeightActRpt_Rdo_1",
          "neu_Pupillary_Chk_key",
          "neu_Equal_Chk_key",
          "bsd_Allbreath_Chk_key",
          "cah_Hypertension_Chk_key",
          "crd_NorHeartSnd_Chk_key",
          "crd_CapillaryRef_Chk_key",
          "crd_CapillaryRef_Rdo_1",
          "genh_History_Chk_key",
          "gesh_History_Chk_key",
          "lbd_Formed_Chk_key",
          "lbd_Normal_Chk_key",
          "EatingAssessment8_key",
          "EatingAssessment10_key",
          "app_Appetite_Rdo_2",
          "mrf_Mostrecntfall_Rdo_5",
          "nvn1_Color_Chk_key",
          "nvn1_Color_Rdo_0_1",
          "nvn1_SkinTurgor_Chk_key",
          "nvn1_SkinTurgor_Rdo_2",
          "nvn1_Temperature_Chk_key",
          "nvn1_TemperaWarm_Chk_key",
          "nvn1_WoundIdenti_Rdo_0",
          "M1306_UNHLD_STG2_PRSR_ULCR_0",
          "ris_RiskAssessment5_Chk_key",
          "ris_RiskAssessment9_Chk_key",
          "ris_RiskAssessment7_Chk_key",
          "M1033_HOSP_RISK_COMPLIANCE_key",
          "M1033_HOSP_RISK_5PLUS_MDCTN_key",
          "M1033_HOSP_RISK_CRNT_EXHSTN_key",
          "ins_InstructMaterial1_Chk_key",
          "ins_InstructMaterial9_Chk_key",
          "ins_InstructMaterial13_Chk_key",
          "ins_InstructMaterial2_Chk_key",
          "ins_InstructMaterial8_Chk_key",
          "ins_InstructMaterial10_Chk_key",
          "ins_InstructMaterial3_Chk_key",
          "ins_InstructMaterial5_Chk_key",
          "ins_InstructMaterial11_Chk_key",
          "ins_InstructMaterial15_Chk_key",
          "ins_InstructMaterial4_Chk_key",
          "ins_InstructMaterial6_Chk_key",
        ],
      },
      {
        id: ["Yes7p_1", "emp_BackupOxygen_Rdo_1"],
        condition:
          collectedPopupData["netsmartcloud-recert-precautions-check"] &&
          collectedPopupData["netsmartcloud-recert-precautions-check"].includes(
            "oxygen"
          ),
      },
      {
        id: ["Yes7p_2", "emp_BackupOxygen_Rdo_2"],
        condition: !(
          collectedPopupData["netsmartcloud-recert-precautions-check"] &&
          collectedPopupData["netsmartcloud-recert-precautions-check"].includes(
            "oxygen"
          )
        ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-recert-precautions-check"] &&
          collectedPopupData["netsmartcloud-recert-precautions-check"].includes(
            "seizure"
          ),
      },
      {
        id: ["app_Difficulty_Chk_key"],
        condition:
          collectedPopupData["netsmartcloud-recert-precautions-check"] &&
          collectedPopupData["netsmartcloud-recert-precautions-check"].includes(
            "aspiration"
          ),
      },
      {
        id: [
          "neu_Forgetful_Chk_key",
          "emh_Confused_Chk_key",
          "emh_Disoriented_Chk_key",
          "FallRiskAssessment1_key",
          "FallRiskAssessment2_key",
          "FallRiskAssessment6_key",
          "FallRiskAssessment8_key",
          "FallRiskAssessment10_key",
          "ris_RiskAssessment5_Chk_key",
          "ris_RiskAssessment9_Chk_key",
          "ris_RiskAssessment7_Chk_key",
          "ris_RiskAssessment2_Chk_key",
          "ris_RiskAssessment4_Chk_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-recert-mental-radio"] &&
          collectedPopupData["netsmartcloud-recert-mental-radio"] ===
            "unable to follow command",
      },
      {
        id: [
          "emh_Oriented_Chk_key",
          "emh_Alert_Chk_key",
          "bhe_NeuPlce_Chk_key",
          "bhe_NeuTime_Chk_key",
          "bhe_NeuSituation_Chk_key",
          "FallRiskAssessment1_key",
          "FallRiskAssessment2_key",
          "FallRiskAssessment6_key",
          "FallRiskAssessment8_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-recert-mental-radio"] &&
          collectedPopupData["netsmartcloud-recert-mental-radio"] === "A/A/Ox4",
      },
      {
        id: [
          "neu_Forgetful_Chk_key",
          "emh_Oriented_Chk_key",
          "bhe_NeuPerson_Chk_key",
          "bhe_NeuPlce_Chk_key",
          "FallRiskAssessment1_key",
          "FallRiskAssessment2_key",
          "FallRiskAssessment6_key",
          "FallRiskAssessment8_key",
          "FallRiskAssessment10_key",
          "ris_RiskAssessment5_Chk_key",
          "ris_RiskAssessment9_Chk_key",
          "ris_RiskAssessment7_Chk_key",
          "ris_RiskAssessment2_Chk_key",
          "ris_RiskAssessment4_Chk_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-recert-mental-radio"] ===
          "forgetful/confused",
      },
      {
        id: ["cah_HeartFailure_Chk_key"],
        condition:
          collectedPopupData["netsmartcloud-recert-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-recert-diagnosis-check"].includes(
            "CHF"
          ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-recert-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-recert-diagnosis-check"].includes(
            "G-Tube"
          ),
      },
      {
        id: ["infu_Central_Chk_key", "infu_Picc_Chk_key"],
        condition:
          collectedPopupData["netsmartcloud-recert-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-recert-diagnosis-check"].includes(
            "PICC Line"
          ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-recert-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-recert-diagnosis-check"].includes(
            "wound"
          ),
      },
      {
        id: ["ctr_Catheter_Chk_key", "ctr_Catheter_Rdo_1"],
        condition:
          collectedPopupData["netsmartcloud-recert-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-recert-diagnosis-check"].includes(
            "Foley"
          ),
      },
      {
        id: ["genh_Renal_Chk_key"],
        condition:
          collectedPopupData["netsmartcloud-recert-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-recert-diagnosis-check"].includes(
            "ESRD"
          ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-recert-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-recert-diagnosis-check"].includes(
            "diabetes"
          ),
      },
      {
        id: ["end_Diabetes_Chk_key", "end_DiabetesType_Rdo_2"],
        condition:
          collectedPopupData["netsmartcloud-recert-diagnosis-check"] &&
          (collectedPopupData["netsmartcloud-recert-diagnosis-check"].includes(
            "DM"
          ) ||
            collectedPopupData["netsmartcloud-recert-diagnosis-check"].includes(
              "DM1"
            ) ||
            collectedPopupData["netsmartcloud-recert-diagnosis-check"].includes(
              "DM2"
            ) ||
            collectedPopupData["netsmartcloud-recert-diagnosis-check"].includes(
              "diabetes"
            )),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-recert-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-recert-diagnosis-check"].includes(
            "injection"
          ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-recert-home-radio"] &&
          collectedPopupData["netsmartcloud-recert-home-radio"] ===
            "Assisted Living",
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-recert-home-radio"] &&
          collectedPopupData["netsmartcloud-recert-home-radio"] === "home",
      },
      {
        id: [],
        condition:
          collectedPopupData["recert-home-check"] &&
          collectedPopupData["recert-home-check"].includes("alone"),
      },
      {
        id: [],
        condition:
          collectedPopupData["recert-home-check"] &&
          collectedPopupData["recert-home-check"].includes("family"),
      },
      {
        id: [
          "pan_IntensityScale_Chk_key",
          "Dull_key",
          "Movement_key",
          "Medication_key",
          "pan_Relaxation_Chk_key",
          "ppt18_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-recert-pain-radio"] &&
          collectedPopupData["netsmartcloud-recert-pain-radio"] === "pain",
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-recert-pain-radio"] &&
          collectedPopupData["netsmartcloud-recert-pain-radio"] === "nopain",
      },
      {
        id: [
          "M1800_CRNT_GROOMING_0",
          "M1810_CRNT_DRESS_UPPER_0",
          "M1820_CRNT_DRESS_LOWER_0",
          "M1830_CRNT_BATHG_0",
          "M1840_CRNT_TOILTG_0",
          "M1850_CRNT_TRNSFRNG_0",
          "M1860_CRNT_AMBLTN_0",
        ],
        condition:
          collectedPopupData["netsmartcloud-recert-adl-radio"] &&
          collectedPopupData["netsmartcloud-recert-adl-radio"] === "#0",
      },
      {
        id: [
          "M1800_CRNT_GROOMING_1",
          "M1810_CRNT_DRESS_UPPER_1",
          "M1820_CRNT_DRESS_LOWER_1",
          "M1830_CRNT_BATHG_1",
          "M1840_CRNT_TOILTG_1",
          "M1850_CRNT_TRNSFRNG_1",
          "M1860_CRNT_AMBLTN_1",
        ],
        condition:
          collectedPopupData["netsmartcloud-recert-adl-radio"] &&
          collectedPopupData["netsmartcloud-recert-adl-radio"] === "#1",
      },
      {
        id: [
          "M1800_CRNT_GROOMING_2",
          "M1810_CRNT_DRESS_UPPER_2",
          "M1820_CRNT_DRESS_LOWER_2",
          "M1830_CRNT_BATHG_2",
          "M1840_CRNT_TOILTG_1",
          "M1850_CRNT_TRNSFRNG_1",
          "M1860_CRNT_AMBLTN_2",
        ],
        condition:
          collectedPopupData["netsmartcloud-recert-adl-radio"] &&
          collectedPopupData["netsmartcloud-recert-adl-radio"] === "#2",
      },
      {
        id: [
          "M1800_CRNT_GROOMING_3",
          "M1810_CRNT_DRESS_UPPER_2",
          "M1820_CRNT_DRESS_LOWER_3",
          "M1830_CRNT_BATHG_5",
          "M1840_CRNT_TOILTG_3",
          "M1850_CRNT_TRNSFRNG_3",
          "M1860_CRNT_AMBLTN_5",
        ],
        condition:
          collectedPopupData["netsmartcloud-recert-adl-radio"] &&
          collectedPopupData["netsmartcloud-recert-adl-radio"] === "#3",
      },
      {
        id: [
          "M1800_CRNT_GROOMING_3",
          "M1810_CRNT_DRESS_UPPER_3",
          "M1820_CRNT_DRESS_LOWER_3",
          "M1830_CRNT_BATHG_6",
          "M1840_CRNT_TOILTG_4",
          "M1850_CRNT_TRNSFRNG_4",
          "M1860_CRNT_AMBLTN_6",
        ],
        condition:
          collectedPopupData["netsmartcloud-recert-adl-radio"] &&
          collectedPopupData["netsmartcloud-recert-adl-radio"] === "#4",
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
    try {
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
    } catch (error) {}

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
