(function () {
  function optionsToClickInputs(collectedPopupData) {
    return [
      {
        id: [
          "PatientIdentificationVerifiedCaregiver_Family",
          "PatientIdentificationVerifiedAddress",
          "M0150_CPAY_MCARE_FFS",
          "M0080_ASSESSOR_DISCIPLINE_01",
          "M0100_ASSMT_REASON_04",
          "VitalsBloodPressureOrientation_Sitting",
          "VitalsBloodPressureLocation1_Left",
          "VitalsPulseLocation_Apical",
          "VitalsMeasurementScale_Lbs",
          "VitalsTemperatureScale_F",
          "VitalsTemperatureLocation_Temporal",
          "VisionPupilsPerrla",
          "NasalConditionNoProblemsIdentified",
          "PharyngealConditionNoProblemsIdentified",
          "NeurologicalStatusNoProblem",
          "NeurologicalStatusDominantSide",
          "NeurologicalStatusDominantSideRange_R",
          "NeurologicalHandGrips",
          "NeurologicalHandgripsEqualRange_Equal",
          "NeurologicalStatusPERRLA",
          "PsychosocialLanguageLearningBarrier",
          "PsychosocialLanguageFunctional",
          "PsychosocialSleepCheckbox",
          "PsychsocialSleep",
          "SafetyHazardsNone",
          "SanitationHazardsNone",
          "SAGenitourinaryNoProblems",
          "SAGastrointestinalExternalGenitalia_Physical Assessment",
          "SAGastrointestinalExternalGenitaliaStatus_Normal",
          "SAGastrointestinalBowelSounds",
          "SACardiovascularNoProblemsIdentified",
          "SACardiovascularCapRefill",
          "SACardiovascularHeartSounds_Regular",
          "SACardiovascularPeripheralPulses",
          "SACardiovascularPeripheralPulsesStrongWeak_Strong",
          "SACardiovascularPedalpulses",
          "SACardiovascularPedalpulsesStrongWeak_Strong",
          "SARespiratoryNoIdentifiedProblems",
          "SARespiratoryLungsoundsclear",
          "SAIntegumentarySkinColor_Pink_WNL",
          "SAIntegumentarySkinColorNormalForEthnicity",
          "SAIntegumentarySkinTurgor_Good",
          "SAIntegumentarySkinFeelWarm",
          "SAIntegumentaryNailsProblemsNormal",
          "SAIntegumentaryInfectionControlSoap",
          "SAIntegumentaryInfectionControlPaperTowels",
          "SAIntegumentaryInfectionControlInstructedControl",
          "M1306_UNHLD_STG2_PRSR_ULCR_0",
          "M1033_HOSP_RISK_COMPLIANCE",
          "M1033_HOSP_RISK_5PLUS_MDCTN",
          "M1033_HOSP_RISK_CRNT_EXHSTN",
          "DescribeRisksMedicalComplianceCheckBox",
          "DescribeRisksMultipleMedicationsCheckBox",
          "PainScale_0",
          "POCPoorNutritionPhyicallyAble",
          "POCPoorNutritionOTCDrugs",
          "VitalsBloodSugarNA",
          "MedicationReviewEffectsNoIssues",
          "SAInterventionEmergencyPlan",
          "SAInterventionHotline",
          "SAInterventionMedicationSchedule",
          "SAInterventionRigths",
          "SAInterventionSafety",
          "SAInterventionDCPlans",
          "POCSafetyMeasuresSafetyADLs",
          "POCSafetyMeasuresSafeEnvironment",
          "POCSafetyMeasuresAssistiveDevices",
          "POCSafetyMeasuresEmergencyPlan",
          "POCSafetyMeasuresUniversalInfection",
          "POCSafetyMeasuresAmbulateEndurance",
          "POCSafetyMeasuresFall",
          "POCSafetyMeasuresKeepPathwaysClear",
          "POCAllergies_NKDA",
          "SNInterventionTeachEmergencyCarePlan",
          "PatientCategoryRiskDisaster_Medium Risk or Medium Priority",
          "DischargeWhenAllGoalsHaveBeenMet",
          "Prognosis_Fair",
          "RehabPotential_Fair",
          "MouthConditionWNL",
        ],
      },
      {
        id: [
          "MouthConditionDifficultySwallowing",
          "POCPoorNutritionPhyicallyAble",
          "POCPoorNutritionOTCDrugs",
          "POCPoorNutritionIllness",
        ],
        condition:
          collectedPopupData["recert-precautions-check"] &&
          collectedPopupData["recert-precautions-check"].includes("aspiration"),
      },
      {
        id: ["POCSafetyMeasuresO2"],
        condition:
          collectedPopupData["recert-precautions-check"] &&
          collectedPopupData["recert-precautions-check"].includes("oxygen"),
      },
      {
        id: ["POCSafetyMeasuresSeizure"],
        condition:
          collectedPopupData["recert-precautions-check"] &&
          collectedPopupData["recert-precautions-check"].includes("seizure"),
      },
      {
        id: [
          "RequiredCoreElementsAge65",
          "Diagnosis",
          "functional mobility",
          "Poly Pharmacy",
          "Cognitive",
          "POCMentalStatusForgetful",
        ],
        condition:
          collectedPopupData["recert-mental-radio"] &&
          collectedPopupData["recert-mental-radio"] === "forgetful/confused",
      },
      {
        id: [
          "RequiredCoreElementsAge65",
          "Diagnosis",
          "functional mobility",
          "Poly Pharmacy",
          "Cognitive",
        ],
        condition:
          collectedPopupData["recert-mental-radio"] &&
          collectedPopupData["recert-mental-radio"] ===
            "unable to follow command",
      },
      {
        id: [
          "RequiredCoreElementsAge65",
          "Diagnosis",
          "functional mobility",
          "Poly Pharmacy",
          "POCMentalStatusOriented",
        ],
        condition:
          collectedPopupData["recert-mental-radio"] &&
          collectedPopupData["recert-mental-radio"] === "A/A/Ox4",
      },
      {
        id: ["SAGenitourinaryCatheter", "SAGenitourinaryCatheterType_Foley"],
        condition:
          collectedPopupData["recert-diagnosis-check"] &&
          collectedPopupData["recert-diagnosis-check"].includes("Foley"),
      },
      {
        id: [
          "M1028_ACTV_DIAG_DM_0",
          "DiabetesManagement",
          "DiabetesManagementTypeITypeII_Type II",
          "DiabetesManagementIDDMInsulin",
          "DiabetesManagementIDDMDietControlled",
        ],
        condition:
          collectedPopupData["recert-diagnosis-check"] &&
          collectedPopupData["recert-diagnosis-check"].includes("DM2"),
      },
      {
        id: [
          "PainScale_5",
          "PainInterferesWithAmbulation",
          "PainInterferesWithADLs",
          "PainInstructionInstructedonPainMedication",
          "PainInstructionPainReducingMethods",
        ],
        condition:
          collectedPopupData["recert-pain-radio"] &&
          collectedPopupData["recert-pain-radio"] === "pain",
      },
      {
        id: [
          "M1800_CRNT_GROOMING_00",
          "M1810_CRNT_DRESS_UPPER_00",
          "M1820_CRNT_DRESS_LOWER_00",
          "M1830_CRNT_BATHG_00",
          "M1840_CRNT_TOILTG_00",
          "M1845_CRNT_TOILTG_HYGN_00",
          "M1850_CRNT_TRNSFRNG_00",
          "M1860_CRNT_AMBLTN_00",
          "SAMusculoskelatelNoIdentifiedProblems",
          "GG0110A_0",
          "GG0110B_0",
          "GG0110C_0",
          "GG0110D_0",
          "GG0110E_0",
          "GG0130A4_06",
          "GG0130B4_06",
          "GG0130C4_06",
          "GG0170A4_06",
          "GG0170B4_06",
          "GG0170C4_06",
          "GG0170D4_06",
          "GG0170E4_06",
          "GG0170F4_06",
          "GG0170I4_06",
          "GG0170J4_06",
          "GG0170L4_06",
          "GG0170M4_06",
          "GG0170N4_06",
          "GG0170Q4_0",
          "POCActivitiesPermittedUpasTolerated",
          "POCFunctionalLimitationsEndurance",
          "GG0110Z_1",
        ],
        condition:
          collectedPopupData["recert-adl-radio"] &&
          collectedPopupData["recert-adl-radio"] === "#0",
      },
      {
        id: [
          "M1800_CRNT_GROOMING_01",
          "M1810_CRNT_DRESS_UPPER_01",
          "M1820_CRNT_DRESS_LOWER_01",
          "M1830_CRNT_BATHG_01",
          "M1840_CRNT_TOILTG_01",
          "M1845_CRNT_TOILTG_HYGN_01",
          "M1850_CRNT_TRNSFRNG_01",
          "M1860_CRNT_AMBLTN_01",
          "SAMusculoskeletalBalanceUnsteady",
          "SAMusculoskeletalPainWeaknessInjury",
          "SAMusculoskeletalDeviceUsed",
          "SAMusculoskeletalInstructedHomeSafety",
          "SAMusculoskeletalGait",
          "SAMusculoskeletalSteadyUnsteady_Unsteady",
          "GG0110A_0",
          "GG0110B_0",
          "GG0110C_0",
          "GG0110D_0",
          "GG0110E_0",
          "GG0130A4_05",
          "GG0130B4_05",
          "GG0130C4_05",
          "GG0170A4_05",
          "GG0170B4_05",
          "GG0170C4_05",
          "GG0170D4_05",
          "GG0170E4_05",
          "GG0170F4_05",
          "GG0170I4_05",
          "GG0170J4_05",
          "GG0170L4_05",
          "GG0170M4_05",
          "GG0170N4_05",
          "GG0170Q4_0",
          "POCActivitiesPermittedCane",
          "POCActivitiesPermittedUpasTolerated",
          "POCActivitiesPermittedExcercise",
          "POCFunctionalLimitationsEndurance",
          "POCFunctionalLimitationsAmputation",
          "POCDMECane",
          "GG0110Z_1",
        ],
        condition:
          collectedPopupData["recert-adl-radio"] &&
          collectedPopupData["recert-adl-radio"] === "#1",
      },
      {
        id: [
          "M1800_CRNT_GROOMING_02",
          "M1810_CRNT_DRESS_UPPER_02",
          "M1820_CRNT_DRESS_LOWER_02",
          "M1830_CRNT_BATHG_02",
          "M1840_CRNT_TOILTG_01",
          "M1845_CRNT_TOILTG_HYGN_02",
          "M1850_CRNT_TRNSFRNG_01",
          "M1860_CRNT_AMBLTN_02",
          "SAMusculoskeletalBalanceUnsteady",
          "SAMusculoskeletalPainWeaknessInjury",
          "SAMusculoskeletalDeviceUsed",
          "SAMusculoskeletalInstructedHomeSafety",
          "SAMusculoskeletalGait",
          "SAMusculoskeletalSteadyUnsteady_Unsteady",
          "GG0110A_0",
          "GG0110B_0",
          "GG0110C_0",
          "GG0110D_1",
          "GG0110E_0",
          "GG0130A4_05",
          "GG0130B4_05",
          "GG0130C4_03",
          "GG0170A4_03",
          "GG0170B4_03",
          "GG0170C4_03",
          "GG0170D4_03",
          "GG0170E4_03",
          "GG0170F4_03",
          "GG0170I4_03",
          "GG0170J4_03",
          "GG0170L4_88",
          "GG0170M4_88",
          "GG0170N4_88",
          "GG0170Q4_0",
          "POCActivitiesPermittedWalker",
          "POCActivitiesPermittedUpasTolerated",
          "POCActivitiesPermittedExcercise",
          "POCFunctionalLimitationsEndurance",
          "POCFunctionalLimitationsAmputation",
          "POCDMEWalker",
          "GG0110Z_0",
        ],
        condition:
          collectedPopupData["recert-adl-radio"] &&
          collectedPopupData["recert-adl-radio"] === "#2",
      },
      {
        id: [
          "M1800_CRNT_GROOMING_03",
          "M1810_CRNT_DRESS_UPPER_02",
          "M1820_CRNT_DRESS_LOWER_03",
          "M1830_CRNT_BATHG_05",
          "M1840_CRNT_TOILTG_03",
          "M1845_CRNT_TOILTG_HYGN_03",
          "M1850_CRNT_TRNSFRNG_03",
          "M1860_CRNT_AMBLTN_05",
          "SAMusculoskeletalBalanceUnsteady",
          "SAMusculoskeletalPainWeaknessInjury",
          "SAMusculoskeletalDeviceUsed",
          "SAMusculoskeletalInstructedHomeSafety",
          "SAMusculoskeletalEndurance",
          "GG0110A_1",
          "GG0110B_0",
          "GG0110C_0",
          "GG0110D_0",
          "GG0110E_0",
          "GG0130A4_04",
          "GG0130B4_04",
          "GG0130C4_01",
          "GG0170A4_01",
          "GG0170B4_02",
          "GG0170C4_02",
          "GG0170D4_01",
          "GG0170E4_01",
          "GG0170F4_01",
          "GG0170I4_88",
          "GG0170J4_88",
          "GG0170L4_88",
          "GG0170M4_88",
          "GG0170Q4_1",
          "GG0170R4_01",
          "POCActivitiesPermittedWheelchair",
          "POCActivitiesPermittedTransfer",
          "POCActivitiesPermittedExcercise",
          "POCFunctionalLimitationsEndurance",
          "POCFunctionalLimitationsAmputation",
          "POCDMEWheelchair",
          "GG0110Z_0",
        ],
        condition:
          collectedPopupData["recert-adl-radio"] &&
          collectedPopupData["recert-adl-radio"] === "#3",
      },
      {
        id: [
          "M1800_CRNT_GROOMING_03",
          "M1810_CRNT_DRESS_UPPER_03",
          "M1820_CRNT_DRESS_LOWER_03",
          "M1830_CRNT_BATHG_06",
          "M1840_CRNT_TOILTG_04",
          "M1845_CRNT_TOILTG_HYGN_03",
          "M1850_CRNT_TRNSFRNG_04",
          "M1860_CRNT_AMBLTN_06",
          "SAMusculoskeletalBalanceUnsteady",
          "SAMusculoskeletalPainWeaknessInjury",
          "SAMusculoskeletalInstructedHomeSafety",
          "SAMusculoskeletalLimitedROM",
          "GG0110A_1",
          "GG0110B_0",
          "GG0110C_1",
          "GG0110D_0",
          "GG0110E_0",
          "GG0130A4_01",
          "GG0130B4_01",
          "GG0130C4_01",
          "GG0170A4_01",
          "GG0170B4_04",
          "GG0170C4_01",
          "GG0170D4_88",
          "GG0170E4_88",
          "GG0170F4_88",
          "GG0170I4_88",
          "GG0170J4_88",
          "GG0170L4_88",
          "GG0170M4_88",
          "GG0170Q4_0",
          "POCActivitiesPermittedTransfer",
          "POCActivitiesPermittedExcercise",
          "POCFunctionalLimitationsContracture",
          "POCFunctionalLimitationsIncontinence",
          "POCDMEBedsideCommode",
          "POCDMEHospitalBed",
          "GG0110Z_0",
          "GG0170B4_01",
        ],
        condition:
          collectedPopupData["recert-adl-radio"] &&
          collectedPopupData["recert-adl-radio"] === "#4",
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

    const container = document.getElementById("div-doc-container");

    let containerScrollFromTop = container.scrollTop;
    let currentScrollHeight = container.scrollHeight;

    const scrollStep = Math.min(
      1000,
      currentScrollHeight - containerScrollFromTop
    );

    if (currentScrollHeight === containerScrollFromTop || scrollStep < 1000)
      return;

    container.scrollBy(0, scrollStep);

    options.forEach((element) => {
      if (element.hasOwnProperty("condition") && element.condition)
        element.id.forEach((i) => safeClick(i));
      else if (!element.hasOwnProperty("condition"))
        element.id.forEach((i) => safeClick(i));
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    await startFormFill(options);
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
