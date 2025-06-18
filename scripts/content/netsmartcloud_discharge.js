let websiteURL = window.location.href;

(function () {
  function optionsToClickInputs(collectedPopupData) {
    return [
      {
        id: [
          "M2410_INPAT_FACILITY_NA",
          "M0100_ASSMT_REASON_9",
          "M0150_CPAY_MCARE_HMO_key",
          "M2420_DSCHRG_DISP_01",
          "A2121_1",
          "A2122A_key",
          "A2122B_key",
          "A2122C_key",
          "A2122D_key",
          "M1041_IN_INFLNZ_SEASON_0",
          "M1046_INFLNZ_RECD_CRNT_SEASON_4",
          "D0700_1",
          "M1745_BEH_PROB_FREQ_0",
          "M1400_WHEN_DYSPNEIC_0",
          "M1600_UTI_0",
          "M1620_BWL_INCONT_0",
          "K0520D4_key",
          "K0520D5_key",
          "M1306_UNHLD_STG2_PRSR_ULCR_0",
          "M1324_STG_PRBLM_ULCER_NA",
          "M1330_STAS_ULCR_PRSNT_0",
          "M1340_SRGCL_WND_PRSNT_0",
          "M2005_MDCTN_INTRVTN_9",
          "M2102_CARE_TYPE_SRC_ADL_1",
          "M2102_CARE_TYPE_SRC_MDCTN_1",
          "M2102_CARE_TYPE_SRC_PRCDR_1",
          "M2102_CARE_TYPE_SRC_SPRVSN_1",
          "J1800_0",
          "M2301_EMER_USE_AFTR_LAST_ASMT_0",
          "M2401_INTRVTN_SMRY_FALL_PRVNT_1",
          "M2401_INTRVTN_SMRY_DPRSN_NA",
          "M2401_INTRVTN_SMRY_PAIN_MNTR_1",
          "M2401_INTRVTN_SMRY_PRSULC_PRVN_1",
          "M2401_INTRVTN_SMRY_PRSULC_WET_NA",
          "dis_Patient_Chk_key",
          "dis_Family_Chk_key",
          "care_Physician_Chk_key",
          "care_CaseMgr_Chk_key",
        ],
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-discharge-precautions-check"] &&
          collectedPopupData[
            "netsmartcloud-discharge-precautions-check"
          ].includes("oxygen"),
      },
      {
        id: [],
        condition: !(
          collectedPopupData["netsmartcloud-discharge-precautions-check"] &&
          collectedPopupData[
            "netsmartcloud-discharge-precautions-check"
          ].includes("oxygen")
        ),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-discharge-precautions-check"] &&
          collectedPopupData[
            "netsmartcloud-discharge-precautions-check"
          ].includes("seizure"),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-discharge-precautions-check"] &&
          collectedPopupData[
            "netsmartcloud-discharge-precautions-check"
          ].includes("aspiration"),
      },
      {
        id: [
          "B1300_8",
          "C0100_0",
          "C1310A_0",
          "C1310B_1",
          "C1310C_1",
          "C1310D_0",
          "M1700_COG_FUNCTION_3",
          "M1710_WHEN_CONFUSED_4",
          "M1720_WHEN_ANXIOUS_0",
        ],
        condition:
          collectedPopupData["netsmartcloud-discharge-mental-radio"] &&
          collectedPopupData["netsmartcloud-discharge-mental-radio"] ===
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
          "C1310A_0",
          "C1310B_0",
          "C1310C_0",
          "C1310D_0",
          "M1700_COG_FUNCTION_0",
          "M1710_WHEN_CONFUSED_0",
          "M1720_WHEN_ANXIOUS_0",
          "M1740_BD_NONE_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-discharge-mental-radio"] &&
          collectedPopupData["netsmartcloud-discharge-mental-radio"] ===
            "A/A/Ox4",
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
          "C1310A_0",
          "C1310B_0",
          "C1310C_2",
          "C1310D_0",
          "M1700_COG_FUNCTION_1",
          "M1710_WHEN_CONFUSED_2",
          "M1720_WHEN_ANXIOUS_0",
          "M1740_BD_MEM_DEFICIT_key",
          "M1740_BD_IMP_DECISN_key",
        ],
        condition:
          collectedPopupData["netsmartcloud-discharge-mental-radio"] ===
          "forgetful/confused",
      },
      {
        id: ["M1400_WHEN_DYSPNEIC_2"],
        condition:
          collectedPopupData["netsmartcloud-discharge-diagnosis-check"] &&
          collectedPopupData[
            "netsmartcloud-discharge-diagnosis-check"
          ].includes("CHF"),
      },
      {
        id: ["K0520B4_key", "K0520B5_key", "M1870_CRNT_FEEDING_4"],
        condition:
          collectedPopupData["netsmartcloud-discharge-diagnosis-check"] &&
          collectedPopupData[
            "netsmartcloud-discharge-diagnosis-check"
          ].includes("G-Tube"),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-discharge-diagnosis-check"] &&
          collectedPopupData[
            "netsmartcloud-discharge-diagnosis-check"
          ].includes("PICC Line"),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-discharge-diagnosis-check"] &&
          collectedPopupData[
            "netsmartcloud-discharge-diagnosis-check"
          ].includes("wound"),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-discharge-diagnosis-check"] &&
          collectedPopupData[
            "netsmartcloud-discharge-diagnosis-check"
          ].includes("Foley"),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-discharge-diagnosis-check"] &&
          collectedPopupData[
            "netsmartcloud-discharge-diagnosis-check"
          ].includes("ESRD"),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-discharge-diagnosis-check"] &&
          collectedPopupData[
            "netsmartcloud-discharge-diagnosis-check"
          ].includes("diabetes"),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-discharge-diagnosis-check"] &&
          (collectedPopupData[
            "netsmartcloud-discharge-diagnosis-check"
          ].includes("DM") ||
            collectedPopupData[
              "netsmartcloud-discharge-diagnosis-check"
            ].includes("DM1") ||
            collectedPopupData[
              "netsmartcloud-discharge-diagnosis-check"
            ].includes("DM2") ||
            collectedPopupData[
              "netsmartcloud-discharge-diagnosis-check"
            ].includes("diabetes")),
      },
      {
        id: [],
        condition:
          collectedPopupData["netsmartcloud-discharge-diagnosis-check"] &&
          collectedPopupData[
            "netsmartcloud-discharge-diagnosis-check"
          ].includes("injection"),
      },
      {
        id: ["A1250C_key"],
        condition:
          collectedPopupData["netsmartcloud-discharge-home-radio"] &&
          collectedPopupData["netsmartcloud-discharge-home-radio"] ===
            "Assisted Living",
      },
      {
        id: ["A1250A_key"],
        condition:
          collectedPopupData["netsmartcloud-discharge-home-radio"] &&
          collectedPopupData["netsmartcloud-discharge-home-radio"] === "home",
      },
      {
        id: ["A1250C_key"],
        condition:
          collectedPopupData["discharge-home-check"] &&
          collectedPopupData["discharge-home-check"].includes("alone"),
      },
      {
        id: ["A1250A_key"],
        condition:
          collectedPopupData["discharge-home-check"] &&
          collectedPopupData["discharge-home-check"].includes("family"),
      },
      {
        id: ["J0510_2", "J0520_2", "J0530_2"],
        condition:
          collectedPopupData["netsmartcloud-discharge-pain-radio"] &&
          collectedPopupData["netsmartcloud-discharge-pain-radio"] === "pain",
      },
      {
        id: ["J0510_0"],
        condition:
          collectedPopupData["netsmartcloud-discharge-pain-radio"] &&
          collectedPopupData["netsmartcloud-discharge-pain-radio"] === "nopain",
      },
      {
        id: [
          "M1870_CRNT_FEEDING_0",
          "M1800_CRNT_GROOMING_0",
          "M1810_CRNT_DRESS_UPPER_0",
          "M1820_CRNT_DRESS_LOWER_0",
          "M1830_CRNT_BATHG_0",
          "M1840_CRNT_TOILTG_0",
          "M1845_CRNT_TOILTG_HYGN_0",
          "M1850_CRNT_TRNSFRNG_0",
          "M1860_CRNT_AMBLTN_0",
          "M2020_CRNT_MGMT_ORAL_MDCTN_0",
        ],
        condition:
          collectedPopupData["netsmartcloud-discharge-adl-radio"] &&
          collectedPopupData["netsmartcloud-discharge-adl-radio"] === "#0",
      },
      {
        id: [
          "M1870_CRNT_FEEDING_1",
          "M1800_CRNT_GROOMING_1",
          "M1810_CRNT_DRESS_UPPER_1",
          "M1820_CRNT_DRESS_LOWER_1",
          "M1830_CRNT_BATHG_1",
          "M1840_CRNT_TOILTG_1",
          "M1845_CRNT_TOILTG_HYGN_1",
          "M1850_CRNT_TRNSFRNG_1",
          "M1860_CRNT_AMBLTN_1",
          "M2020_CRNT_MGMT_ORAL_MDCTN_0",
        ],
        condition:
          collectedPopupData["netsmartcloud-discharge-adl-radio"] &&
          collectedPopupData["netsmartcloud-discharge-adl-radio"] === "#1",
      },
      {
        id: [
          "M1870_CRNT_FEEDING_1",
          "M1800_CRNT_GROOMING_2",
          "M1810_CRNT_DRESS_UPPER_2",
          "M1820_CRNT_DRESS_LOWER_2",
          "M1830_CRNT_BATHG_2",
          "M1840_CRNT_TOILTG_1",
          "M1845_CRNT_TOILTG_HYGN_2",
          "M1850_CRNT_TRNSFRNG_1",
          "M1860_CRNT_AMBLTN_2",
          "M2020_CRNT_MGMT_ORAL_MDCTN_1",
        ],
        condition:
          collectedPopupData["netsmartcloud-discharge-adl-radio"] &&
          collectedPopupData["netsmartcloud-discharge-adl-radio"] === "#2",
      },
      {
        id: [
          "M1870_CRNT_FEEDING_1",
          "M1800_CRNT_GROOMING_3",
          "M1810_CRNT_DRESS_UPPER_2",
          "M1820_CRNT_DRESS_LOWER_3",
          "M1830_CRNT_BATHG_5",
          "M1840_CRNT_TOILTG_3",
          "M1845_CRNT_TOILTG_HYGN_3",
          "M1850_CRNT_TRNSFRNG_3",
          "M1860_CRNT_AMBLTN_5",
          "M2020_CRNT_MGMT_ORAL_MDCTN_1",
        ],
        condition:
          collectedPopupData["netsmartcloud-discharge-adl-radio"] &&
          collectedPopupData["netsmartcloud-discharge-adl-radio"] === "#3",
      },
      {
        id: [
          "M1870_CRNT_FEEDING_2",
          "M1800_CRNT_GROOMING_3",
          "M1810_CRNT_DRESS_UPPER_3",
          "M1820_CRNT_DRESS_LOWER_3",
          "M1830_CRNT_BATHG_6",
          "M1840_CRNT_TOILTG_4",
          "M1845_CRNT_TOILTG_HYGN_3",
          "M1850_CRNT_TRNSFRNG_4",
          "M1860_CRNT_AMBLTN_6",
          "M2020_CRNT_MGMT_ORAL_MDCTN_3",
        ],
        condition:
          collectedPopupData["netsmartcloud-discharge-adl-radio"] &&
          collectedPopupData["netsmartcloud-discharge-adl-radio"] === "#4",
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
