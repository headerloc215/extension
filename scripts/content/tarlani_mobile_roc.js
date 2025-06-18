(function () {
  function optionsToClickInputs(collectedPopupData) {
    return [
      {
        id: [
          "PatientIdentificationVerifiedCaregiver_Family",
          "M0150_CPAY_MCARE_FFS",
          "M0080_ASSESSOR_DISCIPLINE_01",
          "M0100_ASSMT_REASON_03",
          "VitalsBloodPressureOrientation_Sitting",
          "VitalsBloodPressureLocation_Left",
          "VitalsPulseLocation_Apical",
          "VitalsTemperatureLocation_Temporal",
          "MouthConditionWNL",
          "NasalConditionNoProblemsIdentified",
          "PharyngealConditionNoProblemsIdentified",
          "B1300_2",
          "POCLearningLacksKnowledgeHealthNeeds",
          "D0150A1_1",
          "D0150A2_0",
          "D0150B1_1",
          "D0150B2_0",
          "D0700_1",
          "M1745_BEH_PROB_FREQ_00",
          "PsychosocialSleepCheckbox",
          "PsychsocialSleep",
          "M2102_CARE_TYPE_SRC_SPRVSN_02",
          "SafetyHazardsNone",
          "SanitationHazardsNone",
          "M1600_UTI_00",
          "M1610_UR_INCONT_00",
          "SAGenitourinaryNoProblems",
          "M1620_BWL_INCONT_00",
          "M1630_OSTOMY_00",
          "SAGastrointestinalExternalGenitalia_Pt_Cg Reported",
          "SAGastrointestinalExternalGenitaliaStatus_Normal",
          "SACardiovascularNoProblemsIdentified",
          "SACardiovascularCapRefill",
          "SACardiovascularSeconds_< 3 seconds",
          "SACardiovascularHeartSounds_Regular",
          "SACardiovascularPeripheralPulses",
          "SACardiovascularPeripheralPulsesStrongWeak_Strong",
          "SACardiovascularPedalpulses",
          "SACardiovascularPedalpulsesStrongWeak_Strong",
          "SARespiratoryLungsoundsclear",
          "SARespiratoryO2Sat",
          "SARespiratoryO2SatSource_Room Air",
          "M1400_WHEN_DYSPNEIC_00",
          "SAIntegumentarySkinTurgor_Fair",
          "SAIntegumentarySkinColor_Pink_WNL",
          "SAIntegumentarySkinFeelWarm",
          "SAIntegumentaryNailsProblemsNormal",
          "SAIntegumentaryInfectionControlSoap",
          "SAIntegumentaryInfectionControlPaperTowels",
          "SAIntegumentaryInfectionControlInstructedControl",
          "M1306_UNHLD_STG2_PRSR_ULCR_0",
          "M1322_NBR_PRSULC_STG1_00",
          "M1324_STG_PRBLM_ULCER_NA",
          "M1330_STAS_ULCR_PRSNT_00",
          "M1340_SRGCL_WND_PRSNT_00",
          "M1028_ACTV_DIAG_NOA_0",
          "M1033_HOSP_RISK_COMPLIANCE",
          "M1033_HOSP_RISK_5PLUS_MDCTN",
          "M1033_HOSP_RISK_CRNT_EXHSTN",
          "DescribeRisksMedicalComplianceCheckBox",
          "DescribeRisksMultipleMedicationsCheckBox",
          "K0520A1_0",
          "K0520B1_0",
          "K0520C1_0",
          "K0520D1_1",
          "K0520Z1_0",
          "POCPoorNutritionPhyicallyAble",
          "POCPoorNutritionOTCDrugs",
          "M2001_DRUG_RGMN_RVW_0",
          "M2010_HIGH_RISK_DRUG_EDCTN_01",
          "O0110Z1a_1",
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
        ],
      },
      {
        id: ["A1250A", "M1100_PTNT_LVG_STUTN_01"],
        condition:
          collectedPopupData["roc-home-check"] &&
          collectedPopupData["roc-home-check"].includes("alone"),
      },
      {
        id: ["MouthConditionDifficultySwallowing"],
        condition:
          collectedPopupData["roc-precautions-check"] &&
          collectedPopupData["roc-precautions-check"].includes("aspiration"),
      },
      {
        id: ["A1250C", "M1100_PTNT_LVG_STUTN_06"],
        condition:
          collectedPopupData["roc-home-check"] &&
          collectedPopupData["roc-home-check"].includes("family"),
      },
      {
        id: [
          "M1610_UR_INCONT_02",
          "SAGenitourinaryCatheter",
          "SAGenitourinaryCatheterType_Foley",
        ],
        condition:
          collectedPopupData["roc-diagnosis-check"] &&
          collectedPopupData["roc-diagnosis-check"].includes("Foley"),
      },
      {
        id: ["M1400_WHEN_DYSPNEIC_02"],
        condition:
          collectedPopupData["roc-diagnosis-check"] &&
          collectedPopupData["roc-diagnosis-check"].includes("CHF"),
      },
      {
        id: ["M1028_ACTV_DIAG_DM_0"],
        condition:
          collectedPopupData["roc-diagnosis-check"] &&
          collectedPopupData["roc-diagnosis-check"].includes("DM2"),
      },
      {
        id: [
          "SARespiratoryO2SatSource_Using O2",
          "POCSafetyMeasuresSafetyADLs",
          "POCSafetyMeasuresSafeEnvironment",
          "POCSafetyMeasuresAssistiveDevices",
          "POCSafetyMeasuresEmergencyPlan",
          "POCSafetyMeasuresUniversalInfection",
          "POCSafetyMeasuresAmbulateEndurance",
          "POCSafetyMeasuresFall",
          "POCSafetyMeasuresKeepPathwaysClear",
          "POCSafetyMeasuresO2",
        ],
        condition:
          collectedPopupData["roc-precautions-check"] &&
          collectedPopupData["roc-precautions-check"].includes("oxygen"),
      },
      {
        id: [
          "POCSafetyMeasuresSafetyADLs",
          "POCSafetyMeasuresSafeEnvironment",
          "POCSafetyMeasuresAssistiveDevices",
          "POCSafetyMeasuresEmergencyPlan",
          "POCSafetyMeasuresUniversalInfection",
          "POCSafetyMeasuresAmbulateEndurance",
          "POCSafetyMeasuresFall",
          "POCSafetyMeasuresKeepPathwaysClear",
          "POCSafetyMeasuresSeizure",
        ],
        condition:
          collectedPopupData["roc-precautions-check"] &&
          collectedPopupData["roc-precautions-check"].includes("seizure"),
      },
      {
        id: [
          "POCPoorNutritionPhyicallyAble",
          "POCPoorNutritionOTCDrugs",
          "POCPoorNutritionIllness",
        ],
        condition:
          collectedPopupData["roc-precautions-check"] &&
          collectedPopupData["roc-precautions-check"].includes("aspiration"),
      },
      {
        id: ["A1250C", "M1100_PTNT_LVG_STUTN_11"],
        condition:
          collectedPopupData["roc-home-radio"] &&
          collectedPopupData["roc-home-radio"] === "Assisted Living",
      },
      {
        id: ["K0520B1_1", "M1870_CRNT_FEEDING_04"],
        condition:
          collectedPopupData["roc-diagnosis-radio"] &&
          collectedPopupData["roc-diagnosis-radio"].includes("G-Tube"),
      },
      {
        id: [
          "J0510_2",
          "J0520_2",
          "J0530_2",
          "PainScale_5",
          "PainInterferesWithAmbulation",
          "PainInterferesWithADLs",
          "PainInstructionInstructedonPainMedication",
          "PainInstructionPainReducingMethods",
        ],
        condition:
          collectedPopupData["roc-pain-radio"] &&
          collectedPopupData["roc-pain-radio"] === "pain",
      },
      {
        id: ["J0510_0"],
        condition:
          collectedPopupData["roc-pain-radio"] &&
          collectedPopupData["roc-pain-radio"] === "nopain",
      },
      {
        id: [
          "C1310A_0",
          "C1310B_0",
          "C1310C_0",
          "C1310D_0",
          "M1700_COG_FUNCTION_00",
          "M1710_WHEN_CONFUSED_00",
          "M1720_WHEN_ANXIOUS_00",
          "M1740_BD_NONE",
          "RequiredCoreElementsAge65",
          "Diagnosis",
          "functional mobility",
          "Poly Pharmacy",
          "GG0100D_3",
        ],
        condition:
          collectedPopupData["roc-mental-radio"] &&
          collectedPopupData["roc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: [
          "C0100_0",
          "C1310A_-",
          "C1310B_-",
          "C1310C_-",
          "C1310D_-",
          "M1700_COG_FUNCTION_02",
          "M1710_WHEN_CONFUSED_04",
          "M1720_WHEN_ANXIOUS_NA",
          "RequiredCoreElementsAge65",
          "Diagnosis",
          "functional mobility",
          "Poly Pharmacy",
          "Cognitive",
          "GG0100D_1",
        ],
        condition:
          collectedPopupData["roc-mental-radio"] &&
          collectedPopupData["roc-mental-radio"] === "unable to follow command",
      },
      {
        id: [
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
          "C1310C_0",
          "C1310D_2",
          "M1700_COG_FUNCTION_01",
          "M1710_WHEN_CONFUSED_02",
          "M1720_WHEN_ANXIOUS_00",
          "M1740_BD_MEM_DEFICIT",
          "M1740_BD_IMP_DECISN",
          "RequiredCoreElementsAge65",
          "Diagnosis",
          "functional mobility",
          "Poly Pharmacy",
          "Cognitive",
          "GG0100D_2",
        ],
        condition:
          collectedPopupData["roc-mental-radio"] &&
          collectedPopupData["roc-mental-radio"] === "forgetful/confused",
      },
      {
        id: [
          "C0100_1",
          "C0200_3",
          "C0300A_3",
          "C0300B_2",
          "C0300C_1",
          "C0400A_2",
          "C0400B_2",
          "C0400C_2",
        ],
        condition:
          collectedPopupData["roc-mental-radio"] &&
          collectedPopupData["roc-mental-radio"] === "able to follow command",
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
          "GG0100A_3",
          "GG0100B_3",
          "GG0100C_3",
          "GG0110A_0",
          "GG0110B_0",
          "GG0110C_0",
          "GG0110D_0",
          "GG0110E_0",
          "GG0110Z_1",
          "GG0130A1_06",
          "GG0130B1_06",
          "GG0130C1_06",
          "GG0130E1_06",
          "GG0130F1_06",
          "GG0130G1_06",
          "GG0130H1_06",
          "GG0170A1_06",
          "GG0170B1_06",
          "GG0170C_MOBILITY_SOCROC_PERF_06",
          "GG0170D1_06",
          "GG0170E1_06",
          "GG0170F1_06",
          "GG0170G1_06",
          "GG0170I1_06",
          "GG0170J1_06",
          "GG0170K1_06",
          "GG0170L1_06",
          "GG0170M1_06",
          "GG0170N1_06",
          "GG0170O1_06",
          "GG0170P1_06",
          "GG0170Q1_0",
          "M1870_CRNT_FEEDING_00",
          "M2020_CRNT_MGMT_ORAL_MDCTN_00",
          "POCActivitiesPermittedUpasTolerated",
          "POCFunctionalLimitationsEndurance",
        ],
        condition:
          collectedPopupData["roc-adl-radio"] &&
          collectedPopupData["roc-adl-radio"] === "#0",
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
          "GG0100A_2",
          "GG0100B_2",
          "GG0100C_2",
          "GG0110A_0",
          "GG0110B_0",
          "GG0110C_0",
          "GG0110D_0",
          "GG0110E_0",
          "GG0110Z_1",
          "GG0130A1_05",
          "GG0130B1_05",
          "GG0130C1_05",
          "GG0130E1_05",
          "GG0130F1_05",
          "GG0130G1_05",
          "GG0130H1_05",
          "GG0170A1_05",
          "GG0170B1_05",
          "GG0170C_MOBILITY_SOCROC_PERF_05",
          "GG0170D1_05",
          "GG0170E1_05",
          "GG0170F1_05",
          "GG0170G1_05",
          "GG0170I1_05",
          "GG0170J1_05",
          "GG0170K1_05",
          "GG0170L1_05",
          "GG0170M1_05",
          "GG0170N1_05",
          "GG0170O1_05",
          "GG0170P1_05",
          "GG0170Q1_0",
          "M1870_CRNT_FEEDING_01",
          "M2020_CRNT_MGMT_ORAL_MDCTN_00",
          "POCActivitiesPermittedUpasTolerated",
          "POCActivitiesPermittedCane",
          "POCActivitiesPermittedExcercise",
          "POCFunctionalLimitationsEndurance",
          "POCFunctionalLimitationsAmputation",
          "POCDMECane",
        ],
        condition:
          collectedPopupData["roc-adl-radio"] &&
          collectedPopupData["roc-adl-radio"] === "#1",
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
          "GG0100A_2",
          "GG0100B_2",
          "GG0100C_2",
          "GG0110A_0",
          "GG0110B_0",
          "GG0110C_0",
          "GG0110D_1",
          "GG0110E_0",
          "GG0110Z_0",
          "GG0130A1_05",
          "GG0130B1_05",
          "GG0130C1_03",
          "GG0130E1_03",
          "GG0130F1_03",
          "GG0130G1_03",
          "GG0130H1_03",
          "GG0170A1_03",
          "GG0170B1_03",
          "GG0170C_MOBILITY_SOCROC_PERF_03",
          "GG0170D1_03",
          "GG0170E1_03",
          "GG0170F1_03",
          "GG0170G1_03",
          "GG0170I1_03",
          "GG0170J1_03",
          "GG0170K1_03",
          "GG0170L1_88",
          "GG0170M1_88",
          "GG0170N1_88",
          "GG0170P1_03",
          "GG0170Q1_0",
          "M1870_CRNT_FEEDING_01",
          "M2020_CRNT_MGMT_ORAL_MDCTN_01",
          "POCActivitiesPermittedUpasTolerated",
          "POCActivitiesPermittedWalker",
          "POCActivitiesPermittedExcercise",
          "POCFunctionalLimitationsEndurance",
          "POCFunctionalLimitationsAmputation",
          "POCDMEWalker",
        ],
        condition:
          collectedPopupData["roc-adl-radio"] &&
          collectedPopupData["roc-adl-radio"] === "#2",
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
          "SAMusculoskeletalGait",
          "SAMusculoskeletalEndurance",
          "GG0100A_1",
          "GG0100B_1",
          "GG0100C_1",
          "GG0110A_1",
          "GG0110B_0",
          "GG0110C_0",
          "GG0110D_0",
          "GG0110E_0",
          "GG0110Z_0",
          "GG0130A1_04",
          "GG0130B1_04",
          "GG0130C1_01",
          "GG0130E1_01",
          "GG0130F1_02",
          "GG0130G1_01",
          "GG0130H1_01",
          "GG0170A1_01",
          "GG0170B1_02",
          "GG0170C_MOBILITY_SOCROC_PERF_02",
          "GG0170D1_01",
          "GG0170E1_01",
          "GG0170F1_01",
          "GG0170G1_01",
          "GG0170I1_88",
          "GG0170J1_88",
          "GG0170K1_88",
          "GG0170L1_88",
          "GG0170M1_88",
          "GG0170P1_88",
          "GG0170Q1_1",
          "GG0170R1_01",
          "GG0170RR1_1",
          "GG0170S1_01",
          "M1870_CRNT_FEEDING_01",
          "M2020_CRNT_MGMT_ORAL_MDCTN_01",
          "POCActivitiesPermittedExcercise",
          "POCActivitiesPermittedWheelchair",
          "POCActivitiesPermittedTransfer",
          "POCFunctionalLimitationsEndurance",
          "POCFunctionalLimitationsAmputation",
          "POCDMEWheelchair",
        ],
        condition:
          collectedPopupData["roc-adl-radio"] &&
          collectedPopupData["roc-adl-radio"] === "#3",
      },
      {
        id: [
          "M1800_CRNT_GROOMING_03",
          "M1810_CRNT_DRESS_UPPER_03",
          "M1820_CRNT_DRESS_LOWER_03",
          "M1830_CRNT_BATHG_06",
          "M1840_CRNT_TOILTG_03",
          "M1845_CRNT_TOILTG_HYGN_03",
          "M1850_CRNT_TRNSFRNG_04",
          "M1860_CRNT_AMBLTN_06",
          "SAMusculoskeletalBalanceUnsteady",
          "SAMusculoskeletalPainWeaknessInjury",
          "SAMusculoskeletalInstructedHomeSafety",
          "SAMusculoskeletalLimitedROM",
          "GG0100A_1",
          "GG0100B_1",
          "GG0100C_1",
          "GG0110A_1",
          "GG0110B_0",
          "GG0110C_1",
          "GG0110D_0",
          "GG0110E_0",
          "GG0110Z_0",
          "GG0130A1_01",
          "GG0130B1_01",
          "GG0130C1_01",
          "GG0130E1_01",
          "GG0130F1_01",
          "GG0130G1_01",
          "GG0130H1_01",
          "GG0170A1_01",
          "GG0170B1_01",
          "GG0170C_MOBILITY_SOCROC_PERF_01",
          "GG0170D1_88",
          "GG0170E1_88",
          "GG0170F1_88",
          "GG0170G1_88",
          "GG0170I1_88",
          "GG0170J1_88",
          "GG0170K1_88",
          "GG0170L1_88",
          "GG0170M1_88",
          "GG0170P1_88",
          "GG0170Q1_0",
          "M1870_CRNT_FEEDING_02",
          "M2020_CRNT_MGMT_ORAL_MDCTN_03",
          "POCActivitiesPermittedExcercise",
          "POCActivitiesPermittedTransfer",
          "POCFunctionalLimitationsContracture",
          "POCFunctionalLimitationsIncontinence",
          "POCDMEHospitalBed",
          "POCDMEBedsideCommode",
        ],
        condition:
          collectedPopupData["roc-adl-radio"] &&
          collectedPopupData["roc-adl-radio"] === "#4",
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
