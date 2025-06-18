let websiteURL = window.location.href;

(function () {
  function optionsToClickInputs(collectedPopupData) {
    return [
      {
        id: [
          "M0150_CPAY_MCARE_HMO_key",
          "pti_InsCard_Chk_key",
          "pti_PtAddressConf_Chk_key",
          "M2102_CARE_TYPE_SRC_SPRVSN2_0_02",
          "prc_PrimaryFinancial_Chk_key",
          "prc_PrimaryADLs_Chk_key",
          "prc_PrimaryMedica_Chk_key",
          "prc_PrimaryHome_Chk_key",
          "psy_PatientReady_Chk_key",
          "psy_CaregiverReady_Chk_key",
          "sah_NoHazardsIdentified_Chk_key",
          "Yes1p_1",
          "Yes2p_1",
          "Yes3p_1",
          "Yes4p_1",
          "Yes5p_1",
          "Yes6p_1",
          "emp_NaturalDisaster_Rdo_1",
          "vtsig_TempSelfMonit_Chk_key",
          "vtsig_PulseSelfMonit_Chk_key",
          "vtsig_BpSelfMonit_Chk_key",
          "LearningBarrierFunc_key",
          "D0700_1",
          "M1745_BEH_PROB_FREQ_0",
          "rif_Noneabove_Chk_key",
          "eane_Noneobserved_Chk_key",
          "M1400_WHEN_DYSPNEIC_0",
          "cah_Hypertension_Chk_key",
          "crd_NorHeartSnd_Chk_key",
          "crd_CapillaryRef_Chk_key",
          "crd_CapillaryRef_Rdo_1",
          "M1600_UTI_0",
          "M1610_UR_INCONT_0",
          "lbd_Formed_Chk_key",
          "lbd_Normal_Chk_key",
          "M1620_BWL_INCONT_0",
          "M1630_OSTOMY_0",
          "K0520B1_key",
          "K0520D1_key",
          "EatingAssessment10_key",
          "EatingAssessment8_key",
          "app_Appetite_Rdo_2",
          "nvn1_Color_Chk_key",
          "nvn1_Color_Rdo_0_1",
          "nvn1_SkinTurgor_Chk_key",
          "nvn1_SkinTurgor_Rdo_2",
          "nvn1_Temperature_Chk_key",
          "nvn1_TemperaWarm_Chk_key",
          "nvn1_WoundIdenti_Rdo_0",
          "M1306_UNHLD_STG2_PRSR_ULCR_0",
          "M1322_NBR_PRSULC_STG1_0",
          "M1324_STG_PRBLM_ULCER_NA",
          "M1330_STAS_ULCR_PRSNT_0",
          "M1340_SRGCL_WND_PRSNT_0",
          "M2001_DRUG_RGMN_RVW_0",
          "M2010_HIGH_RISK_DRUG_EDCTN_1",
          "M2030_CRNT_MGMT_INJCTN_MDCTN_NA",
          "mem_PrescribedMedications_Rdo_0_1",
          "mem_ManageMedications_Rdo_1",
          "mem_CurrentPrescribed_Rdo_0_0",
          "mem_Storage_Chk_key",
          "mem_Disposal_Chk_key",
          "mem_Expirationdates_Chk_key",
          "mrf_Mostrecntfall_Rdo_5",
          "ris_RiskAssessment3_Chk_key",
          "ris_RiskAssessment5_Chk_key",
          "ris_RiskAssessment7_Chk_key",
          "ris_RiskAssessment9_Chk_key",
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
          "care_PatientRepCare_Chk_key",
          "care_CaseMgr_Chk_key",
          "care_ClinicalSn_Chk_key",
          "care_Physician_Chk_key",
        ],
      },
      {
        id: ["Yes7p_1", "emp_BackupOxygen_Rdo_1"],
        condition:
          collectedPopupData["netsmartcloud-roc-precautions-check"] &&
          collectedPopupData["netsmartcloud-roc-precautions-check"].includes(
            "oxygen"
          ),
      },
      {
        id: ["Yes7p_2", "emp_BackupOxygen_Rdo_2"],
        condition: !(
          collectedPopupData["netsmartcloud-roc-precautions-check"] &&
          collectedPopupData["netsmartcloud-roc-precautions-check"].includes(
            "oxygen"
          )
        ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-roc-precautions-check"] &&
          collectedPopupData["netsmartcloud-roc-precautions-check"].includes(
            "seizure"
          ),
      },
      {
        id: [
          "EatingAssessment10_key",
          "EatingAssessment8_key",
          "EatingAssessment1_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-roc-precautions-check"] &&
          collectedPopupData["netsmartcloud-roc-precautions-check"].includes(
            "aspiration"
          ),
      },
      {
        id: [
          "B1300_8",
          "C0100_0",
          "C1310A_0",
          "C1310B_1",
          "C1310C_1",
          "C1310D_0",
          "M1740_BD_MEM_DEFICIT_key",
          "M1740_BD_IMP_DECISN_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-roc-mental-radio"] &&
          collectedPopupData["netsmartcloud-roc-mental-radio"] ===
            "unable to follow command",
      },
      {
        id: [
          "B1300_2",
          "C0100_1",
          "C0200_3",
          "C0300A_3",
          "C0300B_2",
          "C0300C_1",
          "C0400A_2",
          "C0400B_2",
          "C0400C_2",
          "neh_NoHistory_Chk_key",
          "M1700_COG_FUNCTION_0",
          "M1710_WHEN_CONFUSED_0",
          "M1720_WHEN_ANXIOUS_0",
          "C1310A_0",
          "C1310B_0",
          "C1310C_0",
          "C1310D_0",
          "M1740_BD_NONE_key",
          "FallRiskAssessment1_key",
          "FallRiskAssessment2_key",
          "FallRiskAssessment6_key",
          "FallRiskAssessment8_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-roc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: [
          "B1300_2",
          "C0100_1",
          "C0200_2",
          "C0300A_2",
          "C0300B_1",
          "C0300C_0",
          "C0400A_1",
          "C0400B_1",
          "C0400C_1",
          "neh_Dementia_Chk_key",
          "neh_MemoryLoss_Chk_key",
          "M1700_COG_FUNCTION_1",
          "M1710_WHEN_CONFUSED_2",
          "M1720_WHEN_ANXIOUS_0",
          "C1310A_0",
          "C1310B_0",
          "C1310C_2",
          "C1310D_0",
          "M1740_BD_MEM_DEFICIT_key",
          "M1740_BD_IMP_DECISN_key",
          "FallRiskAssessment1_key",
          "FallRiskAssessment2_key",
          "FallRiskAssessment6_key",
          "FallRiskAssessment8_key",
          "FallRiskAssessment10_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-roc-mental-radio"] ===
          "forgetful/confused",
      },
      {
        id: ["M1400_WHEN_DYSPNEIC_2"],
        condition:
          collectedPopupData["netsmartcloud-roc-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-roc-diagnosis-check"].includes(
            "CHF"
          ),
      },
      {
        id: ["M1870_CRNT_FEEDING_4"],
        condition:
          collectedPopupData["netsmartcloud-roc-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-roc-diagnosis-check"].includes(
            "G-Tube"
          ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-roc-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-roc-diagnosis-check"].includes(
            "PICC Line"
          ),
      },
      {
        id: ["nvn1_WoundIdenti_Rdo_1"],
        condition:
          collectedPopupData["netsmartcloud-roc-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-roc-diagnosis-check"].includes(
            "wound"
          ),
      },
      {
        id: ["M1610_UR_INCONT_2"],
        condition:
          collectedPopupData["netsmartcloud-roc-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-roc-diagnosis-check"].includes(
            "Foley"
          ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-roc-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-roc-diagnosis-check"].includes(
            "diabetes"
          ),
      },
      {
        id: ["end_Diabetes_Chk_key", "end_DiabetesType_Rdo_2"],
        condition:
          collectedPopupData["netsmartcloud-roc-diagnosis-check"] &&
          (collectedPopupData["netsmartcloud-roc-diagnosis-check"].includes(
            "DM"
          ) ||
            collectedPopupData["netsmartcloud-roc-diagnosis-check"].includes(
              "DM1"
            ) ||
            collectedPopupData["netsmartcloud-roc-diagnosis-check"].includes(
              "DM2"
            ) ||
            collectedPopupData["netsmartcloud-roc-diagnosis-check"].includes(
              "diabetes"
            )),
      },
      {
        id: ["M2030_CRNT_MGMT_INJCTN_MDCTN_3"],
        condition:
          collectedPopupData["netsmartcloud-roc-diagnosis-check"] &&
          collectedPopupData["netsmartcloud-roc-diagnosis-check"].includes(
            "injection"
          ),
      },
      {
        id: ["A1250C_key", "M1100_PTNT_LVG_STUTN_11"],
        condition:
          collectedPopupData["netsmartcloud-roc-home-radio"] &&
          collectedPopupData["netsmartcloud-roc-home-radio"] ===
            "Assisted Living",
      },
      {
        id: ["M1100_PTNT_LVG_STUTN_6"],
        condition:
          collectedPopupData["netsmartcloud-roc-home-radio"] &&
          collectedPopupData["netsmartcloud-roc-home-radio"] === "home",
      },
      {
        id: ["A1250B_key", "M1100_PTNT_LVG_STUTN_1"],
        condition:
          collectedPopupData["roc-home-check"] &&
          collectedPopupData["roc-home-check"].includes("alone"),
      },
      {
        id: ["A1250C_key"],
        condition:
          collectedPopupData["roc-home-check"] &&
          collectedPopupData["roc-home-check"].includes("family"),
      },
      {
        id: [
          "Dull_key",
          "Movement_key",
          "Medication_key",
          "pan_Relaxation_Chk_key",
          "ppt18_key",
          "J0510_2",
          "J0520_2",
          "J0530_2",
        ],
        condition:
          collectedPopupData["netsmartcloud-roc-pain-radio"] &&
          collectedPopupData["netsmartcloud-roc-pain-radio"] === "pain",
      },
      {
        id: ["J0510_0"],
        condition:
          collectedPopupData["netsmartcloud-roc-pain-radio"] &&
          collectedPopupData["netsmartcloud-roc-pain-radio"] === "nopain",
      },
      {
        id: [
          "eqc_None_Chk_key",
          "M1870_CRNT_FEEDING_0",
          "M1800_CRNT_GROOMING_0",
          "M1810_CRNT_DRESS_UPPER_0",
          "M1820_CRNT_DRESS_LOWER_0",
          "M1830_CRNT_BATHG_0",
          "M1840_CRNT_TOILTG_0",
          "M1845_CRNT_TOILTG_HYGN_0",
          "M1850_CRNT_TRNSFRNG_0",
          "M1860_CRNT_AMBLTN_0",
          "mus_NoDeficits_Chk_key",
          "M2020_CRNT_MGMT_ORAL_MDCTN_0",
        ],
        condition:
          collectedPopupData["netsmartcloud-roc-adl-radio"] &&
          collectedPopupData["netsmartcloud-roc-adl-radio"] === "#0",
      },
      {
        id: [
          "eqc_Cane_Chk_key",
          "M1870_CRNT_FEEDING_1",
          "M1800_CRNT_GROOMING_1",
          "M1810_CRNT_DRESS_UPPER_1",
          "M1820_CRNT_DRESS_LOWER_1",
          "M1830_CRNT_BATHG_1",
          "M1840_CRNT_TOILTG_1",
          "M1845_CRNT_TOILTG_HYGN_1",
          "M1850_CRNT_TRNSFRNG_1",
          "M1860_CRNT_AMBLTN_1",
          "mus_Shuffling_Chk_key",
          "mus_Weakness_Chk_key",
          "M2020_CRNT_MGMT_ORAL_MDCTN_0",
        ],
        condition:
          collectedPopupData["netsmartcloud-roc-adl-radio"] &&
          collectedPopupData["netsmartcloud-roc-adl-radio"] === "#1",
      },
      {
        id: [
          "eqc_Walker_Chk_key",
          "M1870_CRNT_FEEDING_1",
          "M1800_CRNT_GROOMING_2",
          "M1810_CRNT_DRESS_UPPER_2",
          "M1820_CRNT_DRESS_LOWER_2",
          "M1830_CRNT_BATHG_2",
          "M1840_CRNT_TOILTG_1",
          "M1845_CRNT_TOILTG_HYGN_2",
          "M1850_CRNT_TRNSFRNG_1",
          "M1860_CRNT_AMBLTN_2",
          "mus_Shuffling_Chk_key",
          "mus_Weakness_Chk_key",
          "M2020_CRNT_MGMT_ORAL_MDCTN_1",
        ],
        condition:
          collectedPopupData["netsmartcloud-roc-adl-radio"] &&
          collectedPopupData["netsmartcloud-roc-adl-radio"] === "#2",
      },
      {
        id: [
          "eqc_Wheelchair_Chk_key",
          "M1870_CRNT_FEEDING_1",
          "M1800_CRNT_GROOMING_3",
          "M1810_CRNT_DRESS_UPPER_2",
          "M1820_CRNT_DRESS_LOWER_3",
          "M1830_CRNT_BATHG_5",
          "M1840_CRNT_TOILTG_3",
          "M1845_CRNT_TOILTG_HYGN_3",
          "M1850_CRNT_TRNSFRNG_3",
          "M1860_CRNT_AMBLTN_5",
          "mus_Weakness_Chk_key",
          "mus_Weight_Chk_key",
          "M2020_CRNT_MGMT_ORAL_MDCTN_1",
        ],
        condition:
          collectedPopupData["netsmartcloud-roc-adl-radio"] &&
          collectedPopupData["netsmartcloud-roc-adl-radio"] === "#3",
      },
      {
        id: [
          "eqc_BedsideCommode_Chk_key",
          "eqc_Wheelchair_Chk_key",
          "M1870_CRNT_FEEDING_2",
          "M1800_CRNT_GROOMING_3",
          "M1810_CRNT_DRESS_UPPER_3",
          "M1820_CRNT_DRESS_LOWER_3",
          "M1830_CRNT_BATHG_6",
          "M1840_CRNT_TOILTG_4",
          "M1845_CRNT_TOILTG_HYGN_3",
          "M1850_CRNT_TRNSFRNG_4",
          "M1860_CRNT_AMBLTN_6",
          "mus_Weakness_Chk_key",
          "mus_DecreasedRom_Chk_key",
          "M2020_CRNT_MGMT_ORAL_MDCTN_3",
        ],
        condition:
          collectedPopupData["netsmartcloud-roc-adl-radio"] &&
          collectedPopupData["netsmartcloud-roc-adl-radio"] === "#4",
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
