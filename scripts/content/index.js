(function () {
  function optionsToClickInputs(collectedPopupData) {
    return [
      {
        id: ["PatientIdentificationVerifiedCaregiver_Family"],
      },
      {
        id: ["PatientIdentificationVerifiedAddress"],
      },
      {
        id: ["M0150_CPAY_MCARE_FFS"],
      },
      {
        id: ["M0080_ASSESSOR_DISCIPLINE_01"],
      },
      {
        id: ["M0102_PHYSN_ORDRD_SOCROC_DT_NA"],
      },
      {
        id: ["A1250B", "M1100_PTNT_LVG_STUTN_01"],
        condition:
          collectedPopupData["soc-home-check"] &&
          collectedPopupData["soc-home-check"].includes("alone"),
      },
      {
        id: ["M1100_PTNT_LVG_STUTN_06", "A1250C"],
        condition:
          collectedPopupData["soc-home-check"] &&
          collectedPopupData["soc-home-check"].includes("family"),
      },
      {
        id: ["M1100_PTNT_LVG_STUTN_11", "A1250C"],
        condition:
          collectedPopupData["soc-home-radio"] &&
          collectedPopupData["soc-home-radio"] === "Assisted Living",
      },
      {
        id: [
          "B0200_0",
          "K0520C1_0",
          "M2010_HIGH_RISK_DRUG_EDCTN_01",
          "O0110A1a_1",
          "POCSafetyMeasuresSafetyADLs",
          "POCSafetyMeasuresSafeEnvironment",
          "POCSafetyMeasuresEmergencyPlan",
          "POCSafetyMeasuresAssistiveDevices",
          "POCSafetyMeasuresUniversalInfection",
          "POCSafetyMeasuresAmbulateEndurance",
          "POCSafetyMeasuresFall",
          "POCSafetyMeasuresKeepPathwaysClear",
          "PatientCategoryRiskDisaster_Medium Risk or Medium Priority",
          "DischargeWhenAllGoalsHaveBeenMet",
          "Prognosis_Fair",
          "RehabPotential_Fair",
        ],
      },
      {
        id: ["B1000_0"],
      },
      {
        id: ["B1300_2"],
      },
      {
        id: ["MouthConditionWNL"],
      },
      {
        id: ["POCLearningLacksKnowledgeHealthNeeds"],
      },
      {
        id: ["NasalConditionNoProblemsIdentified"],
      },
      {
        id: ["PharyngealConditionNoProblemsIdentified"],
      },
      {
        id: ["C0100_1"],
        condition:
          collectedPopupData["soc-mental-radio"] &&
          (collectedPopupData["soc-mental-radio"] === "A/A/Ox4" ||
            collectedPopupData["soc-mental-radio"] === "forgetful/confused"),
      },
      {
        id: [
          "C0100_0",
          "GG0100D_1",
          "C1310C_-",
          "C1310B_-",
          "C1310D_-",
          "M1700_COG_FUNCTION_02",
          "M1710_WHEN_CONFUSED_04",
          "M1720_WHEN_ANXIOUS_NA",
          "RequiredCoreElementsAge65",
          "Diagnosis",
          "functional mobility",
          "Poly Pharmacy",
          "Cognitive",
        ],
        condition:
          collectedPopupData["soc-mental-radio"] &&
          collectedPopupData["soc-mental-radio"] === "unable to follow command",
      },
      {
        id: ["C0200_3"],
        condition: collectedPopupData["soc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: ["C0300A_3"],
        condition: collectedPopupData["soc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: ["C0300B_2"],
        condition: collectedPopupData["soc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: ["C0300C_1"],
        condition: collectedPopupData["soc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: ["C0400A_2"],
        condition: collectedPopupData["soc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: ["C0400B_2"],
        condition: collectedPopupData["soc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: ["C0400C_2"],
        condition: collectedPopupData["soc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: ["M1700_COG_FUNCTION_00"],
        condition: collectedPopupData["soc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: ["M1710_WHEN_CONFUSED_00"],
        condition: collectedPopupData["soc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: ["M1740_BD_NONE"],
        condition: collectedPopupData["soc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: ["GG0100D_3", "C1310D_0"],
        condition: collectedPopupData["soc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: ["RequiredCoreElementsAge65"],
        condition:
          collectedPopupData["soc-mental-radio"] &&
          (collectedPopupData["soc-mental-radio"] === "A/A/Ox4" ||
            collectedPopupData["soc-mental-radio"] === "forgetful/confused"),
      },
      {
        id: ["Diagnosis"],
        condition:
          collectedPopupData["soc-mental-radio"] &&
          (collectedPopupData["soc-mental-radio"] === "A/A/Ox4" ||
            collectedPopupData["soc-mental-radio"] === "forgetful/confused"),
      },
      {
        id: ["functional mobility", "C1310C_0", "C1310B_0"],
        condition:
          collectedPopupData["soc-mental-radio"] &&
          (collectedPopupData["soc-mental-radio"] === "A/A/Ox4" ||
            collectedPopupData["soc-mental-radio"] === "forgetful/confused"),
      },
      {
        id: ["Poly Pharmacy", "M1720_WHEN_ANXIOUS_00"],
        condition:
          collectedPopupData["soc-mental-radio"] &&
          (collectedPopupData["soc-mental-radio"] === "A/A/Ox4" ||
            collectedPopupData["soc-mental-radio"] === "forgetful/confused"),
      },
      {
        id: ["C0200_2", "C1310D_2"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["C0300A_2"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["C0300B_1"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["GG0100D_2"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["C0300C_0"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["C0400A_1"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["C0400B_1"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["C0400C_1"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["C1310C_2"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["M1700_COG_FUNCTION_01"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["M1710_WHEN_CONFUSED_02"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["M1740_BD_IMP_DECISN"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["M1740_BD_MEM_DEFICIT"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["Cognitive"],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: ["M1400_WHEN_DYSPNEIC_02"],
        condition:
          collectedPopupData["soc-diagnosis-check"] &&
          collectedPopupData["soc-diagnosis-check"].includes("CHF"),
      },
      {
        id: ["M1870_CRNT_FEEDING_04"],
        condition:
          collectedPopupData["soc-diagnosis-check"] &&
          collectedPopupData["soc-diagnosis-check"].includes("G-Tube"),
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
          collectedPopupData["soc-pain-radio"] &&
          collectedPopupData["soc-pain-radio"] === "pain",
      },
      {
        id: ["J0510_0"],
        condition:
          collectedPopupData["soc-pain-radio"] &&
          collectedPopupData["soc-pain-radio"] === "nopain",
      },
      {
        id: [
          "C1310A_0",
          "M1600_UTI_00",
          "M1610_UR_INCONT_00",
          "M1620_BWL_INCONT_00",
          "M1033_HOSP_RISK_COMPLIANCE",
          "M1033_HOSP_RISK_5PLUS_MDCTN",
          "M1033_HOSP_RISK_CRNT_EXHSTN",
          "K0520A1_0",
          "K0520B1_0",
          "K0520D1_1",
          "K0520Z1_0",
          "M2001_DRUG_RGMN_RVW_0",
        ],
      },
      {
        id: [
          "M1630_OSTOMY_00",
          "SACardiovascularNoProblemsIdentified",
          "SACardiovascularHeartSounds_Regular",
          "M2030_CRNT_MGMT_INJCTN_MDCTN_NA",
        ],
      },
      {
        id: [
          "SACardiovascularCapRefill",
          "SACardiovascularSeconds_< 3 seconds",
          "SACardiovascularPeripheralPulses",
        ],
      },
      {
        id: [
          "SACardiovascularPeripheralPulsesStrongWeak_Strong",
          "SACardiovascularPedalpulsesStrongWeak_Strong",
          "SARespiratoryLungsoundsclear",
          "SARespiratoryO2SatSource_Room Air",
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
        ],
      },
      {
        id: ["D0150A1_1", "M1400_WHEN_DYSPNEIC_00"],
      },
      {
        id: ["D0150A2_0"],
      },
      {
        id: ["D0150B1_1"],
      },
      {
        id: ["D0150B2_0"],
      },
      {
        id: ["D0700_1"],
      },
      {
        id: ["M1745_BEH_PROB_FREQ_00"],
      },
      {
        id: ["PsychosocialSleepCheckbox"],
      },
      {
        id: ["PsychsocialSleep"],
      },
      {
        id: ["M2102_CARE_TYPE_SRC_SPRVSN_02"],
      },
      {
        id: ["SafetyHazardsNone"],
      },
      {
        id: ["SanitationHazardsNone"],
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
        ],
        condition:
          collectedPopupData["soc-adl-radio"] &&
          collectedPopupData["soc-adl-radio"] === "#0",
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
          "GG0110A_0",
          "GG0110B_0",
          "GG0110C_0",
          "GG0110D_0",
          "GG0110E_0",
          "GG0110Z_1",
          "GG0100C_2",
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
          "GG0170D1_03",
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
        ],
        condition:
          collectedPopupData["soc-adl-radio"] &&
          collectedPopupData["soc-adl-radio"] === "#1",
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
          "GG0110A_0",
          "GG0110B_0",
          "GG0110C_0",
          "GG0110D_1",
          "GG0110E_0",
          "GG0110Z_0",
          "GG0100C_2",
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
        ],
        condition:
          collectedPopupData["soc-adl-radio"] &&
          collectedPopupData["soc-adl-radio"] === "#2",
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
          "GG0100A_1",
          "GG0100B_1",
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
          "GG0100C_1",
          "M1870_CRNT_FEEDING_01",
          "M2020_CRNT_MGMT_ORAL_MDCTN_01",
        ],
        condition:
          collectedPopupData["soc-adl-radio"] &&
          collectedPopupData["soc-adl-radio"] === "#3",
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
          "SAMusculoskeletalDeviceUsed",
          "SAMusculoskeletalInstructedHomeSafety",
          "SAMusculoskeletalLimitedROM",
          "GG0100A_1",
          "GG0100B_1",
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
          "GG0100C_1",
          "M1870_CRNT_FEEDING_02",
          "M2020_CRNT_MGMT_ORAL_MDCTN_03",
        ],
        condition:
          collectedPopupData["soc-adl-radio"] &&
          collectedPopupData["soc-adl-radio"] === "#4",
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
