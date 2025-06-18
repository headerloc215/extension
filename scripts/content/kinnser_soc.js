(function () {
  function optionsToClickInputs(collectedPopupData) {
    return [
      {
        id: [
          "A1110B_1",
          "cCu_ispractices_cN",
          "cCu_isreligion_cN",
          "M0150_CPAY_MCARE_FFS",
          "M0102_PHYSN_ORDRD_SOCROC_DT_NA",
          "A1250C",
          "cActual1",
          "cHo_homebound_cY",
          "cHo_homebound_crit1Part1",
          "cHo_homebound_crit1Part2",
          "cHo_homebound_crit2Part1",
          "pp2",
          "c485IRsk_assist",
          "c485IRsk_developplan",
          "c485GRsk_hospitalized",
          "c485grsk_emergencyplan",
          "cSS_wnl",
          "cSS_earswnl",
          "cSS_nosewnl",
          "B0200_00",
          "B1000_00",
          "B1300_1",
          "CA485_MS_neuroNoProblems",
          "CA485_MS_moodAppropriateWNL",
          "D0700_1",
          "M1745_00",
          "c485IEm_neurostatus",
          "c485IEm_commskills",
          "c485GEm_fconfusion",
          "M1100_11",
          "M2102_f_01",
          "cToF_adlpaidcare",
          "cToF_iadlpaidcare",
          "cToF_psychpaidcare",
          "cToF_assistpaidcare",
          "cToF_financefamily",
          "ca2",
          "ca4",
          "financialAssist3",
          "c485SM_pathclear",
          "c485SM_standardpos",
          "c485SM_emergplan",
          "c485SM_ambulation",
          "c485SM_fall",
          "c485SM_adls",
          "c485SM_devices",
          "c485SM_slowposition",
          "c485SM_safetymeasures",
          "c485SM_mobsafety",
          "c485SM_dmesafety",
          "c485SM_displan",
          "cSH_nohazards",
          "c485EMan_exgloves",
          "c485EMan_alcoholpads",
          "cES_wnl",
          "cES_extgen",
          "a1",
          "b1",
          "lbm1",
          "cES_bnwnl",
          "M1600_00",
          "M1610_00",
          "M1620_00",
          "cRes_wnl",
          "cRes_cta",
          "M1400_00",
          "cCa_wnl",
          "cCa_caprefill",
          "cr1",
          "c485ica_washfeet",
          "c485ica_nitro",
          "c485ica_heartattack",
          "c485GCar_establishparambp",
          "c485GCar_establishparampulse",
          "c485GCar_cardsymptoms",
          "diet1",
          "cnu_mdiet",
          "cNHS_nocaregiver",
          "cNHS_otcmeds",
          "K0520D1",
          "c485PO_healthyheart",
          "c485inu_dietcomp",
          "c485inu_keeplog",
          "c485inu_oralint",
          "c485GNu_dietcomp",
          "c485gnu_dietlog",
          "st2",
          "cIS_skinpinkwnl",
          "cIS_warm",
          "iY1",
          "M1306_0",
          "M1322_00",
          "M1324_NA",
          "M1330_00",
          "M1340_00",
          "c485IIS_turn",
          "c485iis_assess",
          "c485iig_skinintegrity",
          "nkaRadio",
          "cMai_ivaccess",
          "M2001_0",
          "M2030_NA",
          "c485IMe_pfillmeds",
          "c485ime_cfillmeds",
          "c485ime_iddose",
          "c485ime_vbmeds",
          "c485ime_estremind",
          "c485ime_medindict",
          "c485ime_expmeds",
          "c485ime_medprecaution",
          "c485GMe_fadversere",
          "c485gme_medman",
          "c485gme_umedreg",
          "c485gme_spillboxes",
          "c485gme_unindict",
          "c485gme_iddose",
          "O0110Z1a",
          "c485rp_fachgoals",
          "c485DP_medstable",
          "cPStr_sociostatus",
          "cPStr_interneed",
          "cPStr_instneed",
          "M1630_00",
          "id2",
        ],
      },
      {
        id: [
          "c485SM_o2",
          "fa1",
          "cFA_signpatient",
          "cFA_signcare",
          "fa5",
          "cFA_oxygenpatient",
          "cFA_oxygencare",
          "fa41",
          "cFA_materialspatient",
          "cFA_materialscare",
          "fa41",
          "cFA_areapatient",
          "cFA_areacare",
          "fa9",
          "cFA_detectpatient",
          "cFA_detectcare",
          "fa13",
          "cFA_extpatient",
          "cFA_extcare",
          "fa17",
          "cFA_stpatient",
          "cFA_stcare",
          "fa21",
          "cFA_cordpatient",
          "cFA_cordcare",
          "fa25",
          "cFA_planpatient",
          "cFA_plancare",
          "fa29",
          "cFA_cstoredpatient",
          "cFA_cstoredcare",
          "fa33",
          "cFA_petropatient",
          "cFA_petrocare",
          "fa37",
          "cFA_moistpatient",
          "cFA_moistcare",
        ],
        condition:
          collectedPopupData["soc-precautions-check"] &&
          collectedPopupData["soc-precautions-check"].includes("oxygen"),
      },
      {
        id: ["cFA_isuseoxygen"],
        condition: !(
          collectedPopupData["soc-precautions-check"] &&
          collectedPopupData["soc-precautions-check"].includes("oxygen")
        ),
      },
      {
        id: ["n1"],
        condition:
          new URLSearchParams(new URL(window.location.href).search).get("p") ===
          "18",
      },
      {
        id: ["c485SM_seizure"],
        condition:
          collectedPopupData["soc-precautions-check"] &&
          collectedPopupData["soc-precautions-check"].includes("seizure"),
      },
      {
        id: [
          "cNu_dysphagia",
          "cnu_throatprob",
          "c485PO_mechsoft",
          "K0520D1",
          "K0520C1",
        ],
        condition:
          collectedPopupData["soc-precautions-check"] &&
          collectedPopupData["soc-precautions-check"].includes("aspiration"),
      },
      {
        id: ["cNu_nuwnl"],
        condition: !(
          collectedPopupData["soc-precautions-check"] &&
          collectedPopupData["soc-precautions-check"].includes("aspiration")
        ),
      },
      {
        id: [
          "CA485_MS_person_Dis",
          "CA485_MS_time_Dis",
          "CA485_MS_place_Dis",
          "CA485_MS_situation_Dis",
          "CA485_MS_forgetful_E",
          "CA485_MS_impairedJudgement",
          "CC0100_00",
          "CC1310A_0",
          "CC1310B_1",
          "CC1310C_1",
          "CC1310D_0",
          "M1700_03",
          "M1710_04",
          "M1720_00",
          "M1740_BD_MEM_DEFICIT",
          "M1740_BD_IMP_DECISN",
          "CA485_M1033_HOSP_RISK_COMPLIANCE",
          "CA485_M1033_HOSP_RISK_5PLUS_MDCTN",
          "CA485_M1033_HOSP_RISK_EXHAUSTION",
          "CA485_M1033_HOSP_RISK_RCNT_DCLN",
          "a1",
          "m1",
          "s1",
          "n1",
          "e1",
        ],
        condition:
          collectedPopupData["soc-mental-radio"] &&
          collectedPopupData["soc-mental-radio"] === "unable to follow command",
      },
      {
        id: [
          "CA485_MS_person_Ori",
          "CA485_MS_time_Ori",
          "CA485_MS_place_Ori",
          "CA485_MS_situation_Ori",
          "CA485_MS_memoryNoProblems",
          "CA485_MS_behavioralAppropriateWNL",
          "CC0100_01",
          "CC0200_03",
          "CC0300A_03",
          "CC0300B_02",
          "CC0300C_01",
          "CC0400A_02",
          "CC0400B_02",
          "CC0400C_02",
          "CC1310A_0",
          "CC1310B_0",
          "CC1310C_0",
          "CC1310D_0",
          "M1700_00",
          "M1710_00",
          "M1720_00",
          "M1740_BD_NONE",
          "a1",
          "m1",
          "s1",
          "n1",
          "CA485_M1033_HOSP_RISK_COMPLIANCE",
          "CA485_M1033_HOSP_RISK_5PLUS_MDCTN",
          "CA485_M1033_HOSP_RISK_EXHAUSTION",
        ],
        condition: collectedPopupData["soc-mental-radio"] === "A/A/Ox4",
      },
      {
        id: [
          "CA485_MS_person_Ori",
          "CA485_MS_time_Dis",
          "CA485_MS_place_Ori",
          "CA485_MS_situation_Dis",
          "CA485_MS_forgetful_E",
          "CA485_MS_impairedJudgement",
          "CC0100_01",
          "CC0200_02",
          "CC0300A_02",
          "CC0300B_01",
          "CC0300C_00",
          "CC0400A_01",
          "CC0400B_01",
          "CC0400C_01",
          "CC1310A_0",
          "CC1310B_0",
          "CC1310C_2",
          "CC1310D_0",
          "M1700_01",
          "M1710_02",
          "M1720_00",
          "M1740_BD_MEM_DEFICIT",
          "M1740_BD_IMP_DECISN",
          "a1",
          "m1",
          "s1",
          "n1",
          "e1",
          "CA485_M1033_HOSP_RISK_COMPLIANCE",
          "CA485_M1033_HOSP_RISK_5PLUS_MDCTN",
          "CA485_M1033_HOSP_RISK_EXHAUSTION",
          "CA485_M1033_HOSP_RISK_RCNT_DCLN",
        ],
        condition:
          collectedPopupData["soc-mental-radio"] === "forgetful/confused",
      },
      {
        id: [
          "c485FI_dyspnea",
          "M1400_02",
          "c485ires_smoke",
          "c485ires_pursedlip",
          "c485ires_meals",
          "c485ires_comp",
          "c485GRes_resprate",
          "c485gres_respdistress",
          "c485ica_washfeet",
          "c485ica_nitro",
          "c485ica_heartattack",
          "c485ica_allevedema",
          "c485GCar_establishparambp",
          "c485GCar_establishparampulse",
          "c485GCar_cardsymptoms",
          "c485GCar_understandedema",
          "c485PO_lowfat",
          "c485PO_lowcholest",
          "c485PO_healthyheart",
          "c485PO_nosweets",
          "c485PO_fluidrestriction",
        ],
        condition:
          collectedPopupData["soc-diagnosis-check"] &&
          collectedPopupData["soc-diagnosis-check"].includes("CHF"),
      },
      {
        id: ["cnu_nupeg", "cnu_mdiet", "K0520B1", "K0520D1", "M1870_04"],
        condition:
          collectedPopupData["soc-diagnosis-check"] &&
          collectedPopupData["soc-diagnosis-check"].includes("G-Tube"),
      },
      {
        id: ["cMai_ivaccess"],
        condition:
          collectedPopupData["soc-diagnosis-check"] &&
          collectedPopupData["soc-diagnosis-check"].includes("PICC Line"),
      },
      {
        id: ["cEndo_wnl", "d2", "M1028_ACTV_DIAG_NOA_D"],
        condition: !(
          collectedPopupData["soc-diagnosis-check"].includes("DM") ||
          collectedPopupData["soc-diagnosis-check"].includes("DM1") ||
          collectedPopupData["soc-diagnosis-check"].includes("DM2") ||
          collectedPopupData["soc-diagnosis-check"].includes("diabetes")
        ),
      },
      {
        id: [
          "d1",
          "de2",
          "oa1",
          "gu2",
          "ca1",
          "ci1",
          "cis1",
          "c485IEndo_diabman",
          "c485IEndo_feetreport",
          "c485IEndo_socks",
          "c485IEndo_fingerstick",
          "c485IEndo_inspection",
          "c485PO_nosweets",
          "c485PO_healthyheart",
          "M1028_ACTV_DIAG_DM_D",
          "c485GEndo_fasting",
          "c485gendo_freesigns",
          "c485gendo_dfootcare",
        ],
        condition:
          collectedPopupData["soc-diagnosis-check"] &&
          (collectedPopupData["soc-diagnosis-check"].includes("DM") ||
            collectedPopupData["soc-diagnosis-check"].includes("DM1") ||
            collectedPopupData["soc-diagnosis-check"].includes("DM2") ||
            collectedPopupData["soc-diagnosis-check"].includes("diabetes")),
      },
      {
        id: ["d1", "de1", "di2", "adi2", "oa1", "gu2", "ca1", "ci1", "cis1"],
        condition:
          collectedPopupData["soc-diagnosis-check"] &&
          (collectedPopupData["soc-diagnosis-check"].includes("DM") ||
            collectedPopupData["soc-diagnosis-check"].includes("DM1") ||
            collectedPopupData["soc-diagnosis-check"].includes("DM2") ||
            collectedPopupData["soc-diagnosis-check"].includes("diabetes")) &&
          collectedPopupData["soc-diagnosis-check"].includes("insulin"),
      },
      {
        id: [
          "c485EMan_stergloves",
          "c485EMan_gauzepads",
          "c485EMan_suppliesdress",
          "c485EMan_alcoholpads",
          "c485EMan_tape",
          "cIS_wound",
          "c485IIS_turn",
          "c485iis_float",
          "c485iis_friction",
          "c485iis_assess",
          "c485iis_wcare",
          "c485iig_infection",
        ],
        condition:
          collectedPopupData["soc-diagnosis-check"] &&
          collectedPopupData["soc-diagnosis-check"].includes("wound"),
      },
      {
        id: [
          "c485EMan_exgloves",
          "c485EMan_alcoholpads",
          "c485EMan_foleycath",
          "cES_catheter",
          "M1610_02",
          "c485ies_irrsuptube",
          "c485ies_foleycare",
          "c485ies_reportmd",
          "c485ges_foley",
        ],
        condition:
          collectedPopupData["soc-diagnosis-check"] &&
          collectedPopupData["soc-diagnosis-check"].includes("Foley"),
      },
      {
        id: [
          "c485EMan_exgloves",
          "c485EMan_alcoholpads",
          "c485EMan_diasupplies",
          "M1028_ACTV_DIAG_DM_D",
        ],
        condition:
          collectedPopupData["soc-diagnosis-check"] &&
          collectedPopupData["soc-diagnosis-check"].includes("diabetes"),
      },
      {
        id: [
          "c485EMan_exgloves",
          "c485EMan_alcoholpads",
          "c485EMan_shcontainer",
          "c485EMan_syringe",
          "M2030_03",
        ],
        condition:
          collectedPopupData["soc-diagnosis-check"] &&
          collectedPopupData["soc-diagnosis-check"].includes("injection"),
      },
      {
        id: [
          "J0510_2",
          "J0520_02",
          "J0530_2",
          "c485da_painlevel",
          "c485da_meddosage",
          "c485da_measures",
          "c485da_willingness",
          "c485GP_verbalize",
        ],
        condition:
          collectedPopupData["soc-pain-radio"] &&
          collectedPopupData["soc-pain-radio"] === "pain",
      },
      {
        id: ["J0510_0", "c485da_measures", "c485GP_verbalize"],
        condition:
          collectedPopupData["soc-pain-radio"] &&
          collectedPopupData["soc-pain-radio"] === "nopain",
      },
      {
        id: [
          "c485FI_endurance",
          "c485AP_uatolerated",
          "cMSk_wnl",
          "M1800_00",
          "M1810_00",
          "M1820_00",
          "M1830_00",
          "M1840_00",
          "M1845_00",
          "M1850_00",
          "M1860_00",
          "c485IIADL_secrug",
          "c485IIADL_remclutt",
          "c485IIADL_nsmats",
          "c485IIADL_adeqlight",
          "c485IIADL_contagent",
          "c485giadl_finjury",
          "GG0110_Z",
          "M1870_00",
          "CA485_PUIR_riskPressureUlcerInjury_2",
          "d2",
          "M2020_00",
        ],
        condition:
          collectedPopupData["soc-adl-radio"] &&
          collectedPopupData["soc-adl-radio"] === "#0",
      },
      {
        id: [
          "c485FI_endurance",
          "c485AP_cane",
          "c485AP_uatolerated",
          "c485AP_expres",
          "cMSk_weakness",
          "cMSk_pbalance",
          "cMSk_gripstr",
          "gse2",
          "M1800_01",
          "M1810_01",
          "M1820_01",
          "M1830_01",
          "M1840_01",
          "M1845_01",
          "M1850_01",
          "M1860_01",
          "c485EMan_cane",
          "c485iadl_actlevels",
          "c485iadl_exprogram",
          "c485iadl_bodyalign",
          "c485GADL_patmobility",
          "c485GADL_romex",
          "c485IIADL_secrug",
          "c485IIADL_remclutt",
          "c485IIADL_nsmats",
          "c485IIADL_adeqlight",
          "c485IIADL_contagent",
          "c485giadl_finjury",
          "GG0110_Z",
          "M1870_01",
          "CA485_PUIR_riskPressureUlcerInjury_2",
          "d2",
          "M2020_00",
        ],
        condition:
          collectedPopupData["soc-adl-radio"] &&
          collectedPopupData["soc-adl-radio"] === "#1",
      },
      {
        id: [
          "c485FI_ambulation",
          "c485AP_uatolerated",
          "c485AP_expres",
          "c485AP_walker",
          "cMSk_weakness",
          "cMSk_pbalance",
          "cMSk_gripstr",
          "gse2",
          "cMSk_ambdifficult",
          "M1800_02",
          "M1810_02",
          "M1820_02",
          "M1830_02",
          "M1840_01",
          "M1845_02",
          "M1850_01",
          "M1860_02",
          "c485EMan_walker",
          "c485iadl_actlevels",
          "c485iadl_exprogram",
          "c485iadl_bodyalign",
          "c485GADL_patmobility",
          "c485GADL_romex",
          "c485IIADL_secrug",
          "c485IIADL_remclutt",
          "c485IIADL_nsmats",
          "c485IIADL_adeqlight",
          "c485IIADL_contagent",
          "c485giadl_finjury",
          "GG0110_D",
          "M1870_01",
          "CA485_PUIR_riskPressureUlcerInjury_2",
          "d2",
          "M2020_03",
        ],
        condition:
          collectedPopupData["soc-adl-radio"] &&
          collectedPopupData["soc-adl-radio"] === "#2",
      },
      {
        id: [
          "c485FI_ambulation",
          "c485AP_expres",
          "c485AP_wheelchair",
          "c485AP_tbedchair",
          "cMSk_weakness",
          "cMSk_pbalance",
          "cMSk_gripstr",
          "gse2",
          "cMSk_ambdifficult",
          "M1800_03",
          "M1810_02",
          "M1820_03",
          "M1830_05",
          "M1840_03",
          "M1845_03",
          "M1850_03",
          "M1860_05",
          "c485EMan_wheelchair",
          "c485iadl_actlevels",
          "c485iadl_exprogram",
          "c485iadl_bodyalign",
          "c485GADL_patmobility",
          "c485GADL_romex",
          "c485IIADL_reqTherEval",
          "c485IIADL_repfall",
          "c485giadl_finjury",
          "GG0110_A",
          "M1870_01",
          "CA485_PUIR_riskPressureUlcerInjury_1",
          "d1",
          "M2020_03",
        ],
        condition:
          collectedPopupData["soc-adl-radio"] &&
          collectedPopupData["soc-adl-radio"] === "#3",
      },
      {
        id: [
          "c485FI_ambulation",
          "c485AP_expres",
          "c485AP_tbedchair",
          "cMSk_weakness",
          "cMSk_limitmob",
          "cMSk_bedbound",
          "M1800_03",
          "M1810_03",
          "M1820_03",
          "M1830_06",
          "M1840_04",
          "M1845_03",
          "M1850_04",
          "M1860_06",
          "c485EMan_bedcommode",
          "c485EMan_hosbed",
          "c485iadl_actlevels",
          "c485iadl_exprogram",
          "c485iadl_bodyalign",
          "c485GADL_patmobility",
          "c485GADL_romex",
          "c485IIADL_reqTherEval",
          "c485IIADL_repfall",
          "c485giadl_finjury",
          "GG0110_A",
          "M1870_02",
          "CA485_PUIR_riskPressureUlcerInjury_1",
          "d1",
          "M2020_03",
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

  const startFormAutoInterval = setInterval(async function () {
    const { collectedPopupData, startFormAuto, autoFormWorking } =
      await chrome.storage.local.get([
        "collectedPopupData",
        "startFormAuto",
        "autoFormWorking",
      ]);
    if (
      collectedPopupData &&
      startFormAuto &&
      startFormAuto === "soc-form-kinnser"
    ) {
      injectWorkingModal();
      clearInterval(startFormAutoInterval);
      if (document.querySelectorAll("#OasisForm").length) {
        await startFormFill(optionsToClickInputs(collectedPopupData));
      } else if (
        document.querySelectorAll("tr[onclick]").length &&
        !autoFormWorking
      ) {
        chrome.storage.local.set({ autoFormWorking: true }, function () {
          document.querySelectorAll("tr[onclick]")[0].click();
        });
      } else if (autoFormWorking) {
        chrome.storage.local.remove(
          ["startFormAuto", "autoFormWorking"],
          function () {
            removeWorkingModal();
            alert("Automation Completed Successfully");
          }
        );
      }
    }
  });

  async function startFormFill(options) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log({ options });

    options.forEach((element) => {
      if (element.hasOwnProperty("condition") && element.condition)
        element.id.forEach((i) => safeClick(i));
      else if (!element.hasOwnProperty("condition"))
        element.id.forEach((i) => safeClick(i));
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    document.querySelectorAll("#oasisSaveContinueButton")[0].click();
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
