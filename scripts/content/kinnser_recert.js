(function () {
  function optionsToClickInputs(collectedPopupData) {
    return [
      {
        id: [
          "M0064_SSN_UK",
          "cCu_ispractices_cN",
          "cCu_family",
          "M0150_CPAY_MCARE_FFS",
          "cActual1",
          "cHo_homebound_cY",
          "cHo_homebound_crit1Part1",
          "cHo_homebound_crit1Part2",
          "cHo_homebound_crit2Part1",
          "hs2",
          "pp2",
          "c485IRsk_assist",
          "c485IRsk_developplan",
          "c485GRsk_hospitalized",
          "c485grsk_emergencyplan",
          "CA485_MS_neuroNoProblems",
          "CA485_MS_moodAppropriateWNL",
          "c485IEm_neurostatus",
          "c485IEm_commskills",
          "c485GEm_fconfusion",
          "c485gem_porienttech",
          "ca2",
          "ca4",
          "ca6",
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
          "c485EMan_exgloves",
          "c485EMan_alcoholpads",
          "cES_extgen",
          "b1",
          "cES_bowelsounds",
          "bs3",
          "cES_lastBM",
          "lbm1",
          "cES_bnwnl",
          "M1021_M1023FUe_needs_update_1",
          "cCa_caprefill",
          "cr1",
          "cnu_mdiet",
          "diet1",
          "c485PO_healthyheart",
          "c485INu_instdiet",
          "c485inu_dietcomp",
          "c485inu_keeplog",
          "c485inu_oralint",
          "c485GNu_dietcomp",
          "c485gnu_dietlog",
          "st2",
          "cIS_skinpinkwnl",
          "iY1",
          "n1",
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
          "c485rp_fachgoals",
          "c485DP_medstable",
          "cPStr_sociostatus",
          "cPStr_supsystem",
          "cPStr_interneed",
          "cPStr_instneed",
          "cSInt_respinter",
          "cSInt_vupt",
          "cSInt_vucg",
          "cSInt_rdpt",
          "cSInt_rdcg",
          "cRes_wnl",
          "cRes_cta",
          "cCa_wnl",
          "c485ica_washfeet",
          "c485ica_nitro",
          "c485ica_heartattack",
          "c485GCar_establishparambp",
          "c485GCar_establishparampulse",
          "c485GCar_cardsymptoms",
          "cNHS_nocaregiver",
          "cNHS_otcmeds",
          "cSS_wnl",
          "cSS_earswnl",
          "cSS_nosewnl",
          "cES_wnl",
          "id2",
          "cNu_nuwnl",
        ],
      },
      {
        id: ["a1"],
        condition:
          new URLSearchParams(new URL(window.location.href).search).get("p") ===
          "11",
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
          collectedPopupData["recert-kinnser-precautions-check"] &&
          collectedPopupData["recert-kinnser-precautions-check"].includes(
            "oxygen"
          ),
      },
      {
        id: ["cFA_isuseoxygen"],
        condition: !(
          collectedPopupData["recert-kinnser-precautions-check"] &&
          collectedPopupData["recert-kinnser-precautions-check"].includes(
            "oxygen"
          )
        ),
      },
      // {
      //   id: ["n1"],
      //   condition:
      //     new URLSearchParams(new URL(window.location.href).search).get("p") ===
      //     "18",
      // },
      {
        id: ["c485SM_seizure"],
        condition:
          collectedPopupData["recert-kinnser-precautions-check"] &&
          collectedPopupData["recert-kinnser-precautions-check"].includes(
            "seizure"
          ),
      },
      {
        id: [],
        condition:
          collectedPopupData["recert-kinnser-precautions-check"] &&
          collectedPopupData["recert-kinnser-precautions-check"].includes(
            "aspiration"
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
          collectedPopupData["recert-kinnser-mental-radio"] &&
          collectedPopupData["recert-kinnser-mental-radio"] ===
            "unable to follow command",
      },
      {
        id: [
          "CA485_MS_person_Ori",
          "CA485_MS_time_Ori",
          "CA485_MS_place_Ori",
          "CA485_MS_situation_Ori",
          "CA485_MS_memoryNoProblems",
          "CA485_MS_behavioralAppropriateWNL",
          "a1",
          "m1",
          "s1",
          "n1",
          "CA485_M1033_HOSP_RISK_COMPLIANCE",
          "CA485_M1033_HOSP_RISK_5PLUS_MDCTN",
          "CA485_M1033_HOSP_RISK_EXHAUSTION",
        ],
        condition:
          collectedPopupData["recert-kinnser-mental-radio"] === "A/A/Ox4",
      },
      {
        id: [
          "CA485_MS_person_Ori",
          "CA485_MS_time_Dis",
          "CA485_MS_place_Ori",
          "CA485_MS_situation_Dis",
          "CA485_MS_forgetful_E",
          "CA485_MS_impairedJudgement",
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
          collectedPopupData["recert-kinnser-mental-radio"] ===
          "forgetful/confused",
      },
      {
        id: [
          "c485PO_sodium",
          "c485PO_lowfat",
          "c485PO_lowcholest",
          "c485PO_healthyheart",
          "c485PO_nosweets",
          "c485PO_fluidrestriction",
          "c485ica_allevedema",
          "c485GCar_understandedema",
        ],
        condition:
          collectedPopupData["recert-kinnser-diagnosis-check"] &&
          collectedPopupData["recert-kinnser-diagnosis-check"].includes("CHF"),
      },
      {
        id: ["cES_ostomy"],
        condition:
          collectedPopupData["recert-kinnser-diagnosis-check"] &&
          collectedPopupData["recert-kinnser-diagnosis-check"].includes(
            "G-Tube"
          ),
      },
      {
        id: ["cMai_ivaccess"],
        condition:
          collectedPopupData["recert-kinnser-diagnosis-check"] &&
          collectedPopupData["recert-kinnser-diagnosis-check"].includes(
            "PICC Line"
          ),
      },
      {
        id: ["cEndo_wnl", "d2"],
        condition: !(
          collectedPopupData["recert-kinnser-diagnosis-check"].includes("DM") ||
          collectedPopupData["recert-kinnser-diagnosis-check"].includes(
            "DM1"
          ) ||
          collectedPopupData["recert-kinnser-diagnosis-check"].includes(
            "DM2"
          ) ||
          collectedPopupData["recert-kinnser-diagnosis-check"].includes(
            "diabetes"
          )
        ),
      },
      {
        id: [
          "d1",
          "de2",
          "gu2",
          "ca1",
          "ci1",
          "cis1",
          "c485IEndo_diabman",
          "c485IEndo_feetreport",
          "c485IEndo_socks",
          "c485IEndo_fingerstick",
          "c485IEndo_inspection",
          "c485GEndo_fasting",
          "c485gendo_freesigns",
          "c485gendo_dfootcare",
          "c485PO_nosweets",
          "oa1",
        ],
        condition:
          collectedPopupData["recert-kinnser-diagnosis-check"] &&
          (collectedPopupData["recert-kinnser-diagnosis-check"].includes(
            "DM"
          ) ||
            collectedPopupData["recert-kinnser-diagnosis-check"].includes(
              "DM1"
            ) ||
            collectedPopupData["recert-kinnser-diagnosis-check"].includes(
              "DM2"
            )),
      },
      {
        id: [
          "d1",
          "de1",
          "di2",
          "adi2",
          "gu2",
          "ca1",
          "ci1",
          "cis1",
          "c485IEndo_diabman",
          "c485IEndo_feetreport",
          "c485IEndo_socks",
          "c485IEndo_fingerstick",
          "c485IEndo_assesssugar",
          "c485GEndo_fasting",
          "c485gendo_freesigns",
          "c485gendo_dfootcare",
          "c485gendo_insulinadmin",
          "oa1",
        ],
        condition:
          collectedPopupData["recert-kinnser-diagnosis-check"] &&
          (collectedPopupData["recert-kinnser-diagnosis-check"].includes(
            "DM"
          ) ||
            collectedPopupData["recert-kinnser-diagnosis-check"].includes(
              "DM1"
            ) ||
            collectedPopupData["recert-kinnser-diagnosis-check"].includes(
              "DM2"
            )) &&
          collectedPopupData["recert-kinnser-diagnosis-check"].includes(
            "insulin"
          ),
      },
      {
        id: [
          "c485EMan_stergloves",
          "c485EMan_gauzepads",
          "c485EMan_suppliesdress",
          "c485EMan_alcoholpads",
          "c485EMan_tape",
          "cIS_incision",
          "c485IIS_turn",
          "c485iis_assess",
          "c485iis_float",
          "c485iis_friction",
          "c485iis_wcare",
          "c485iig_infection",
        ],
        condition:
          collectedPopupData["recert-kinnser-diagnosis-check"] &&
          collectedPopupData["recert-kinnser-diagnosis-check"].includes(
            "wound"
          ),
      },
      {
        id: [
          "cIS_warm",
          "c485IIS_turn",
          "c485iis_assess",
          "c485iig_skinintegrity",
        ],
        condition: !(
          collectedPopupData["recert-kinnser-diagnosis-check"] &&
          collectedPopupData["recert-kinnser-diagnosis-check"].includes("wound")
        ),
      },
      {
        id: ["c485EMan_exgloves", "c485EMan_alcoholpads", "c485EMan_foleycath"],
        condition:
          collectedPopupData["recert-kinnser-diagnosis-check"] &&
          collectedPopupData["recert-kinnser-diagnosis-check"].includes(
            "Foley"
          ),
      },
      {
        id: [
          "c485EMan_exgloves",
          "c485EMan_alcoholpads",
          "c485EMan_diasupplies",
        ],
        condition:
          collectedPopupData["recert-kinnser-diagnosis-check"] &&
          collectedPopupData["recert-kinnser-diagnosis-check"].includes(
            "diabetes"
          ),
      },
      {
        id: [
          "c485EMan_exgloves",
          "c485EMan_alcoholpads",
          "c485EMan_shcontainer",
          "c485EMan_syringe",
        ],
        condition:
          collectedPopupData["recert-kinnser-diagnosis-check"] &&
          collectedPopupData["recert-kinnser-diagnosis-check"].includes(
            "injection"
          ),
      },
      {
        id: [
          "c485da_measures",
          "c485da_painlevel",
          "c485da_meddosage",
          "c485da_willingness",
          "c485GP_verbalize",
        ],
        condition:
          collectedPopupData["recert-kinnser-pain-radio"] &&
          collectedPopupData["recert-kinnser-pain-radio"] === "pain",
      },
      {
        id: ["c485da_measures", "c485GP_verbalize"],
        condition:
          collectedPopupData["recert-kinnser-pain-radio"] &&
          collectedPopupData["recert-kinnser-pain-radio"] === "nopain",
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
          "M1850_00",
          "M1860_00",
          "CA485_PUIR_riskPressureUlcerInjury_2",
          "d2",
        ],
        condition:
          collectedPopupData["recert-kinnser-adl-radio"] &&
          collectedPopupData["recert-kinnser-adl-radio"] === "#0",
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
          "M1850_01",
          "M1860_01",
          "c485EMan_cane",
          "c485iadl_actlevels",
          "c485iadl_exprogram",
          "c485iadl_bodyalign",
          "c485GADL_homexphy",
          "c485GADL_romex",
          "CA485_PUIR_riskPressureUlcerInjury_2",
          "d2",
        ],
        condition:
          collectedPopupData["recert-kinnser-adl-radio"] &&
          collectedPopupData["recert-kinnser-adl-radio"] === "#1",
      },
      {
        id: [
          "c485FI_ambulation",
          "c485AP_walker",
          "c485AP_uatolerated",
          "c485AP_expres",
          "cMSk_ambdifficult",
          "cMSk_weakness",
          "cMSk_pbalance",
          "cMSk_gripstr",
          "gse2",
          "M1800_02",
          "M1810_02",
          "M1820_02",
          "M1830_02",
          "M1840_01",
          "M1850_01",
          "M1860_02",
          "c485EMan_walker",
          "c485iadl_actlevels",
          "c485iadl_exprogram",
          "c485iadl_bodyalign",
          "c485GADL_homexphy",
          "c485GADL_romex",
          "CA485_PUIR_riskPressureUlcerInjury_2",
          "d2",
        ],
        condition:
          collectedPopupData["recert-kinnser-adl-radio"] &&
          collectedPopupData["recert-kinnser-adl-radio"] === "#2",
      },
      {
        id: [
          "c485FI_ambulation",
          "c485AP_wheelchair",
          "c485AP_tbedchair",
          "c485AP_expres",
          "cMSk_ambdifficult",
          "cMSk_weakness",
          "cMSk_pbalance",
          "cMSk_gripstr",
          "gse2",
          "M1800_03",
          "M1810_02",
          "M1820_03",
          "M1830_05",
          "M1840_03",
          "M1850_03",
          "M1860_05",
          "c485EMan_wheelchair",
          "c485iadl_actlevels",
          "c485iadl_exprogram",
          "c485iadl_bodyalign",
          "c485GADL_homexphy",
          "c485GADL_romex",
          "CA485_PUIR_riskPressureUlcerInjury_1",
          "d1",
          "cMSk_chairbound",
        ],
        condition:
          collectedPopupData["recert-kinnser-adl-radio"] &&
          collectedPopupData["recert-kinnser-adl-radio"] === "#3",
      },
      {
        id: [
          "c485FI_ambulation",
          "c485AP_tbedchair",
          "c485AP_expres",
          "cMSk_weakness",
          "cMSk_limitmob",
          "cMSk_bedbound",
          "M1800_03",
          "M1810_03",
          "M1820_03",
          "M1830_06",
          "M1840_04",
          "M1850_04",
          "M1860_06",
          "c485EMan_bedcommode",
          "c485EMan_hosbed",
          "c485iadl_actlevels",
          "c485iadl_exprogram",
          "c485iadl_bodyalign",
          "c485GADL_homexphy",
          "c485GADL_romex",
          "CA485_PUIR_riskPressureUlcerInjury_1",
          "d1",
        ],
        condition:
          collectedPopupData["recert-kinnser-adl-radio"] &&
          collectedPopupData["recert-kinnser-adl-radio"] === "#4",
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
      startFormAuto === "recert-kinnser-form-kinnser"
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
