// //  setTimeout(()=>{window.location.reload()},30*1000);

// function FillForm(options) {
//   console.log(options);
//   if (options.project == "project1") {
//     if (options.SocIsActive) {
//       let ids = [
//         "ctl00_ContentPlaceHolder1_LnkOPA",
//         "ctl00_ContentPlaceHolder1_lnkSafetAssessment",
//         "ctl00_ContentPlaceHolder1_lnkFALLRISK",
//       ];
//       let elements = [];
//       for (let i = 0; i < ids.length; i++) {
//         elements.push(document.getElementById(ids[i]));
//       }

//       // let element = document.getElementById("ctl00_ContentPlaceHolder1_LnkOPA");
//       elements.forEach((element) => {
//         if (element != null) {
//           let onClickAttr = element.getAttribute("onclick");

//           // Use a regular expression to extract the URL inside the OpenpopupWithSize function
//           let regex = /OpenpopupWithSize\('(.*?)'/;
//           let match = onClickAttr.match(regex);

//           if (match && match[1]) {
//             let extractedUrl = match[1];
//             console.log(
//               "Extracted URL:",
//               "https://www.hospicemd.com/" + extractedUrl
//             );
//             window.open(
//               "https://www.hospicemd.com/" +
//                 extractedUrl +
//                 (extractedUrl.includes("?") ? "&" : "?") +
//                 "openedByScript=true" +
//                 "&options=" +
//                 JSON.stringify(options),
//               "_blank"
//             );
//           } else {
//             console.log("URL not found");
//           }
//         }
//       });
//       // Extract the 'onclick' attribute

//       let ff = document.getElementById("ctl00_ContentPlaceHolder1_RD_PN_UN_1");
//       if (ff != null) ff.click();

//       if (options != null && options.mental == "forgetful") {
//         let CRPPrefText = document.getElementById(
//           "ctl00_ContentPlaceHolder1_CPRPreftxt"
//         );
//         if (CRPPrefText != null) {
//           CRPPrefText.value = "yes";
//         }

//         let OwnCare = document.getElementById(
//           "ctl00_ContentPlaceHolder1_DRP_CE_OCare"
//         );
//         if (OwnCare != null) OwnCare.value = "No";

//         let administermeds = document.getElementById(
//           "ctl00_ContentPlaceHolder1_PSSD"
//         );
//         if (administermeds != null) administermeds.value = "No";

//         let familyMeds = document.getElementById(
//           "ctl00_ContentPlaceHolder1_PCCSD"
//         );
//         if (familyMeds != null) familyMeds.value = "Family";
//       }
//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_Vital_temp") != null
//       ) {
//         document.getElementById("ctl00_ContentPlaceHolder1_Vital_temp").value =
//           Math.floor(Math.random() * 200) + 50;
//         document.getElementById("ctl00_ContentPlaceHolder1_Vital_Pulse").value =
//           Math.floor(Math.random() * 200) + 50;
//         document.getElementById("ctl00_ContentPlaceHolder1_Vital_Resp").value =
//           Math.floor(Math.random() * 200) + 50;
//         document.getElementById("ctl00_ContentPlaceHolder1_Vital_BP").value =
//           Math.floor(Math.random() * 200) + 50;
//       }

//       // let admitForm = document.getElementById("ctl00_ContentPlaceHolder1_AdmitFrom");

//       // if(admitForm!=null)
//       // admitForm.value = "Hospice in patient`s home/residence (B&C, RCFE)";

//       // let admitForm1 = document.getElementById("ctl00$ContentPlaceHolder1$AdmitFrom1");
//       // if(admitForm1!=null)
//       // admitForm1.value = "Residential Setting (Home, B&C, AL)";

//       // let cprPrefReg = document.getElementById("ctl00_ContentPlaceHolder1_CPRPrefReg");
//       // if(cprPrefReg!=null)
//       // cprPrefReg.value ='Patient/responsible party refused to discuss';

//       // let ptFmAvoidHosp = document.getElementById('ctl00_ContentPlaceHolder1_DRP_NA_AH');
//       // if(ptFmAvoidHosp!=null)
//       // ptFmAvoidHosp.value = 'Yes';

//       let desireForPatient = document.getElementById(
//         "ctl00_ContentPlaceHolder1_DRP_NA_EV"
//       );
//       if (desireForPatient != null) desireForPatient.value = "Not Sure";

//       //PCG

//       let pcgAnxiety = document.getElementById(
//         "ctl00_ContentPlaceHolder1_DRP_CEPF_AN"
//       );
//       if (pcgAnxiety != null) {
//         pcgAnxiety.value = "None";
//       }

//       let pcgHardHearing = document.getElementById(
//         "ctl00_ContentPlaceHolder1_DRP_CEPF_HD"
//       );
//       if (pcgHardHearing != null) {
//         pcgHardHearing.value = "No";
//       }

//       let pcgHS = document.getElementById(
//         "ctl00_ContentPlaceHolder1_DRP_CEPF_HS"
//       );
//       if (pcgHS != null) {
//         pcgHS.value = "Good";
//       }

//       let pcgPC = document.getElementById(
//         "ctl00_ContentPlaceHolder1_DRP_CEPF_PC"
//       );
//       if (pcgPC != null) {
//         pcgPC.value = "Yes";
//       }

//       let pcgYC = document.getElementById(
//         "ctl00_ContentPlaceHolder1_DRP_CEPF_YC"
//       );
//       if (pcgYC != null) {
//         pcgYC.value = "No";
//       }

//       let pcgPets = document.getElementById(
//         "ctl00_ContentPlaceHolder1_DRP_CEPF_AP"
//       );
//       if (pcgPets != null) {
//         pcgPets.value = "No";
//       }

//       let pcgMeds = document.getElementById("ctl00_ContentPlaceHolder1_PCGSSD");
//       if (pcgMeds != null) {
//         pcgMeds.value = "Yes";
//       }

//       let pcgC1 = document.getElementById(
//         "ctl00_ContentPlaceHolder1_CHK_CEPF_HO"
//       );
//       if (pcgC1 != null) {
//         pcgC1.checked = true;
//       }

//       let pcgC2 = document.getElementById(
//         "ctl00_ContentPlaceHolder1_CHK_CEPF_DP"
//       );
//       if (pcgC2 != null) {
//         pcgC2.checked = true;
//       }

//       let pcgC3 = document.getElementById(
//         "ctl00_ContentPlaceHolder1_CHK_CEPF_ME"
//       );
//       if (pcgC3 != null) {
//         pcgC3.checked = true;
//       }

//       let pcgC4 = document.getElementById(
//         "ctl00_ContentPlaceHolder1_CHK_CEPF_AD"
//       );
//       if (pcgC4 != null) {
//         pcgC4.checked = true;
//       }

//       //mobility
//       let cane = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Chk_CEMO_C"
//       );
//       let walker = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Chk_CEMO_W"
//       );
//       let wheeelChair = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Chk_CEMO_WC"
//       );
//       let standAssist = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Chk_CEMO_S"
//       );
//       let moderateAssist = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Chk_CEMO_M"
//       );
//       let maxAssist = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Chk_CEMO_MX"
//       );
//       let bedBound = document.getElementById(
//         "ctl00_ContentPlaceHolder1_ChK_CEMO_BB"
//       );
//       let bedRest = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Chk_CEMO_BR"
//       );
//       let uptolerated = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Chk_CEMO_TO"
//       );
//       let maxAssistNon = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Chk_CEMO_MXA"
//       );
//       let transferCheck = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Chk_CEMO_TC"
//       );
//       let exercisePres = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Chk_CEMO_Ex"
//       );
//       let rangeMotion = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Chk_CEMO_RM"
//       );

//       if (cane != null) {
//         cane.checked = false;
//         standAssist.checked = false;
//         walker.checked = false;
//         wheeelChair.checked = false;
//         moderateAssist.checked = false;
//         maxAssist.checked = false;
//         bedBound.checked = false;
//         bedRest.checked = false;
//         uptolerated.checked = false;
//         maxAssistNon.checked = false;
//         transferCheck.checked = false;
//         exercisePres.checked = false;
//         rangeMotion.checked = false;

//         if (options != null && options.adls != null) {
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_RAD_CEMO_AN"
//           ).checked = true;
//           if (options.adls == "1") {
//             cane.checked = true;
//             standAssist.checked = true;
//             walker.checked = false;
//             wheeelChair.checked = false;
//             moderateAssist.checked = false;
//             maxAssist.checked = false;
//             bedBound.checked = false;
//             bedRest.checked = false;
//             uptolerated.checked = false;
//             maxAssistNon.checked = false;
//             transferCheck.checked = false;
//             exercisePres.checked = false;
//             rangeMotion.checked = false;
//           } else if (options.adls == "2") {
//             cane.checked = false;
//             standAssist.checked = true;
//             walker.checked = true;
//             wheeelChair.checked = false;
//             moderateAssist.checked = false;
//             maxAssist.checked = false;
//             bedBound.checked = false;
//             bedRest.checked = false;
//             uptolerated.checked = false;
//             maxAssistNon.checked = false;
//             transferCheck.checked = false;
//             exercisePres.checked = false;
//             rangeMotion.checked = false;
//           } else if (options.adls == "3") {
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_RAD_CEMO_AN1"
//             ).checked = true;
//             cane.checked = false;
//             standAssist.checked = false;
//             walker.checked = false;
//             wheeelChair.checked = false;
//             moderateAssist.checked = false;
//             maxAssist.checked = false;
//             bedBound.checked = false;
//             bedRest.checked = true;
//             uptolerated.checked = false;
//             maxAssistNon.checked = true;
//             transferCheck.checked = true;
//             exercisePres.checked = false;
//             rangeMotion.checked = false;
//           } else if (options.adls == "4") {
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_RAD_CEMO_AN1"
//             ).checked = true;
//             cane.checked = false;
//             standAssist.checked = false;
//             walker.checked = false;
//             wheeelChair.checked = false;
//             moderateAssist.checked = false;
//             maxAssist.checked = false;
//             bedBound.checked = true;
//             bedRest.checked = false;
//             uptolerated.checked = false;
//             maxAssistNon.checked = true;
//             transferCheck.checked = false;
//             exercisePres.checked = true;
//             rangeMotion.checked = true;
//           }
//         }
//       }

//       //IV Assesement

//       let chkCEIVNO = document.getElementById(
//         "ctl00_ContentPlaceHolder1_CHK_CEIV_NO"
//       );
//       if (chkCEIVNO != null) {
//         chkCEIVNO.checked = true;
//       }

//       // let  = document.getElementById('');
//       // if( != null){
//       //     .value = '';
//       // }

//       // let  = document.getElementById('');
//       // if( != null){
//       //     .value = '';
//       // }

//       // let  = document.getElementById('');
//       // if( != null){
//       //     .value = '';
//       // }

//       // let  = document.getElementById('');
//       // if( != null){
//       //     .value = '';
//       // }

//       // let  = document.getElementById('');
//       // if( != null){
//       //     .value = '';
//       // }

//       // let  = document.getElementById('');
//       // if( != null){
//       //     .value = '';
//       // }

//       // let needInterpreter = document.getElementById('ctl00_ContentPlaceHolder1_NeedInt');
//       // if(needInterpreter!=null)
//       // needInterpreter.value = 'No';

//       // let servedInMilitry = document.getElementById('ctl00_ContentPlaceHolder1_P_MIL');
//       // if(servedInMilitry!=null)
//       // servedInMilitry.value = 'No';

//       let kps = document.getElementById("ctl00_ContentPlaceHolder1_KPSList");
//       if (kps != null) kps.value = "70";

//       let pps = document.getElementById("ctl00_ContentPlaceHolder1_PPSList");
//       if (pps != null) pps.value = "70";

//       let fast = document.getElementById("ctl00_ContentPlaceHolder1_FASTList");
//       if (fast != null) fast.value = "1";
//       //Nature and COndition

//       let medicalhistory = document.getElementById(
//         "ctl00_ContentPlaceHolder1_NC_Chk1"
//       );
//       let PCGfamily = document.getElementById(
//         "ctl00_ContentPlaceHolder1_NC_Chk3"
//       );

//       if (medicalhistory != null) medicalhistory.checked = true;
//       if (PCGfamily != null) PCGfamily.checked = true;

//       //Body System Head to toe

//       //Symtoms
//       let peaceful = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Nue_DEMpe"
//       );
//       let deamCon = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Nue_DEMco"
//       );
//       let otherSy = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Nue_OTHot"
//       );
//       let otherText = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Nue_OTHotText"
//       );

//       let levelCo = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Nue_LOCaw"
//       );
//       let alertCo = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Nue_LOCal"
//       );

//       if (levelCo != null) {
//         levelCo.checked = true;
//         alertCo.checked = true;
//       }

//       let timeOR = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Nue_ORTtm"
//       );
//       let placeOR = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Nue_ORTpl"
//       );
//       let personOR = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Nue_ORTpr"
//       );
//       let disOR = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Nue_ORTds"
//       );

//       let psyNone = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Nue_PHXno"
//       );
//       let commNormal = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Nue_CVPno"
//       );
//       let speechLimited = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Nue_SS"
//       );

//       if (psyNone != null) {
//         psyNone.checked = true;
//       }
//       if (commNormal != null) {
//         commNormal.checked = true;
//       }
//       if (speechLimited != null) {
//         speechLimited.value = "No";
//       }
//       if (peaceful != null) {
//         if (options != null && options.mental != null) {
//           if (options.mental == "forgetful") {
//             peaceful.checked = false;
//             deamCon.checked = true;
//             otherSy.checked = true;
//             otherText.value = "forgetful";
//             s;
//             personOR.checked = true;
//             disOR.checked = true;
//             timeOR.checked = false;
//             placeOR.checked = false;
//           }
//           if (options.mental == "aaox4") {
//             peaceful.checked = true;
//             deamCon.checked = false;
//             otherSy.checked = false;
//             disOR.checked = false;
//             personOR.checked = true;
//             timeOR.checked = true;
//             placeOR.checked = true;
//           }
//         }
//       }
//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_Nue_Balni_0") != null
//       ) {
//         if (options != null && options.adls != null) {
//           if (options.adls == "1" || options.adls == "2") {
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Nue_Balni_0"
//             ).checked = true;
//           }
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_Mus_ISScw"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_Mus_ISSno"
//           ).checked = false;
//         }
//       }

//       //cardio
//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_BPLevel_0") != null
//       ) {
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_BPLevel_0"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_PULar"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_PULrr"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_PULpr"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_Carsp_0"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_SKNco_0"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_PULrt"
//         ).checked = false;
//       }

//       //Respiratory
//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_Car_DYS_0") != null
//       ) {
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_DYS_0"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_LUScl"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_RESnm"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_CGHno"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_PO2_1"
//         ).checked = true;
//         document.getElementById("ctl00_ContentPlaceHolder1_Car_CO2Text").value =
//           "2";
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_CO2nc"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_O2Fpn"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Car_O2Fco"
//         ).checked = false;
//       }

//       //Infections
//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_Imm_FAL_0") != null
//       ) {
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Imm_FAL_0"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Imm_OAL_0"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Imm_CASno"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Imm_HXAno"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Imm_CAIno"
//         ).checked = true;
//       }

//       //Gastro
//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_Gas_NAU_0") != null
//       ) {
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gas_NAU_0"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gas_VOM_0"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gas_ABDso"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gas_ABDnt"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gas_SND_0"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gas_STLnm"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gas_STS_0"
//         ).checked = true;
//         document.getElementById("ctl00_ContentPlaceHolder1_Gas_FRQ").value =
//           "7";
//       }

//       //Nutrition

//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_GAS_RWL") != null
//       ) {
//         document.getElementById("ctl00_ContentPlaceHolder1_GAS_RWL").value =
//           "No";
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gas_APPfr"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gas_APPpr"
//         ).checked = false;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gas_AFF_0"
//         ).checked = true;
//         document.getElementById("ctl00_ContentPlaceHolder1_DrpDietType").value =
//           "Other";
//         document.getElementById("ctl00_ContentPlaceHolder1_Gas_DTPText").value =
//           "Low sodium";
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gas_ORCnm"
//         ).checked = true;
//       }

//       //Genitourinary
//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_Gen_URCco") != null
//       ) {
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gen_URCco"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gen_URNcl"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Gen_CATno"
//         ).checked = true;
//       }

//       //sleep rest

//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_Slp_PAT_5") != null
//       ) {
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Slp_PAT_5"
//         ).checked = true;
//         document.getElementById("ctl00_ContentPlaceHolder1_Slp_DURhr").value =
//           "8";
//       }

//       //Integumnetory Skin

//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_Int_SKSnm") != null
//       ) {
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Int_SKSnm"
//         ).checked = false;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Int_SKSwm"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Int_SKT_0"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Int_SKI_0"
//         ).checked = true;

//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Int_SNP4"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Int_MOS4"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Int_ACT4"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Int_MOB4"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Int_NUT4"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Int_FRI3"
//         ).checked = true;

//         if (options != null && options.adls != null) {
//           if (options.adls == "1") {
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_SNP4"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_MOS4"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_ACT3"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_MOB3"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_NUT4"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_FRI3"
//             ).checked = true;
//           } else if (options.adls == "2") {
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_SNP4"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_MOS4"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_ACT3"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_MOB3"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_NUT3"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_FRI3"
//             ).checked = true;
//           } else if (options.adls == "3") {
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_SNP3"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_MOS3"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_ACT2"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_MOB2"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_NUT3"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_FRI2"
//             ).checked = true;
//           } else if (options.adls == "4") {
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_SNP3"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_MOS3"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_ACT1"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_MOB1"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_NUT2"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Int_FRI1"
//             ).checked = true;
//           }
//         }
//       }

//       let = document.getElementById("");

//       //Environmental Saftey
//       let safteyAssesmentCompleted = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Env_SAC_0"
//       );
//       if (safteyAssesmentCompleted != null) {
//         safteyAssesmentCompleted.checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Env_FRA_0"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Env_DST_1"
//         ).checked = true;
//       }
//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_Env_DSTl1_1") != null
//       ) {
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Env_DSTl1_1"
//         ).checked = false;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Env_DSTl2dw"
//         ).checked = false;
//         if (options != null && options.adls != null) {
//           if (options.adls == "1" || options.adls == "2") {
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Env_DSTl2dw"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Env_DSTl3cb"
//             ).checked = false;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Env_DSTl3re"
//             ).checked = false;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Env_DSTl1_1"
//             ).checked = false;
//           }
//           if (options.adls == "3" || options.adls == "4") {
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Env_DSTl3cb"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Env_DSTl3re"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Env_DSTl2dw"
//             ).checked = false;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Env_DSTl1_1"
//             ).checked = false;
//           }
//           if (
//             document.getElementById("ctl00_ContentPlaceHolder1_Env_DST_1")
//               .checked == true
//           ) {
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Env_DSTl1_1"
//             ).checked = false;
//           }
//         }
//       }

//       let electref = document.getElementById("As1");
//       if (electref != null) {
//         electref.value = "Yes";
//       }
//       let telephone = document.getElementById("As2");
//       if (telephone != null) {
//         telephone.value = "Yes";
//       }

//       let emer = document.getElementById("As3");
//       if (emer != null) {
//         emer.value = "Yes";
//       }

//       let verhos = document.getElementById("As4");
//       if (verhos != null) {
//         verhos.value = "Yes";
//       }

//       let call911 = document.getElementById("As5");
//       if (call911 != null) {
//         call911.value = "Yes";
//       }
//       let adeplum = document.getElementById("As6");
//       if (adeplum != null) {
//         adeplum.value = "Yes";
//       }
//       let smokedet = document.getElementById("As7");
//       if (smokedet != null) {
//         smokedet.value = "Yes";
//       }

//       let fireextin = document.getElementById("As8");
//       if (fireextin != null) {
//         fireextin.value = "Yes";
//       }

//       let fireexit = document.getElementById("As9");
//       if (fireexit != null) {
//         fireexit.value = "Yes";
//       }

//       let weatherreleated = document.getElementById("As10");
//       if (weatherreleated != null) {
//         weatherreleated.value = "Yes";
//         document.getElementById("As10c1").click();
//         document.getElementById("As10c2").click();
//         document.getElementById("As10c3").click();
//         document.getElementById("As10c4").click();
//       }
//       let anyconcern = document.getElementById("As11");
//       if (anyconcern != null) {
//         anyconcern.value = "No";
//       }

//       let emergencyPer = document.getElementById("EP");
//       if (emergencyPer != null) {
//         emergencyPer.value = "Yes";
//       }

//       for (let i = 14; i <= 52; i++) {
//         if (i == 29 || i == 30 || i == 34 || i == 35 || i == 37 || i == 41)
//           continue;
//         let As = document.getElementById("As" + i);
//         if (As != null) {
//           if (i == 36) {
//             As.value = "No";
//           } else As.value = "Yes";
//         }
//       }
//       // let sucideAttempt = document.getElementById('As36');
//       // if( sucideAttempt!= null){
//       //     sucideAttempt.value = 'No';
//       // }

//       // let  = document.getElementById('');
//       // if( != null){
//       //     .value = 'Yes';
//       // }

//       // let  = document.getElementById('');
//       // if( != null){
//       //     .value = 'Yes';
//       // }

//       //Personal Care and Support

//       // let hospiceAid = document.getElementById('ctl00_ContentPlaceHolder1_Pcs_NHAgr');
//       // if(hospiceAid != null)
//       //     hospiceAid.checked=true;

//       // let needVoulnteer = document.getElementById('ctl00_ContentPlaceHolder1_Pcs_NFVno');
//       // if(needVoulnteer!=null)
//       //     needVoulnteer.checked=true;

//       // let needSupport = document.getElementById('ctl00_ContentPlaceHolder1_Pcs_NCSno');
//       //     if(needSupport!=null)
//       //         needSupport.checked=true;

//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_Pcs_NHAno") != null
//       ) {
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Pcs_NHAno"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Pcs_NHAgr"
//         ).checked = false;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Pcs_NHAlm"
//         ).checked = false;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Pcs_NHAlc"
//         ).checked = false;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Pcs_NHAsa"
//         ).checked = false;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Pcs_NFVno"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Pcs_NFV"
//         ).checked = false;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Pcs_NFVlm"
//         ).checked = false;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Pcs_NFVer"
//         ).checked = false;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Pcs_NFVcr"
//         ).checked = false;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Pcs_NCSno"
//         ).checked = true;

//         if (options != null && options.adls != null) {
//           if (
//             options.adls == "2" ||
//             options.adls == "3" ||
//             options.adls == "4"
//           ) {
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Pcs_NHAno"
//             ).checked = false;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Pcs_NHAgr"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Pcs_NHAlm"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Pcs_NHAlc"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Pcs_NHAsa"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Pcs_NFVno"
//             ).checked = false;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Pcs_NFV"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Pcs_NFVlm"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Pcs_NFVer"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_Pcs_NFVcr"
//             ).checked = true;
//           }
//         }
//       }

//       //Teaching Needs
//       let diag = document.getElementById("ctl00_ContentPlaceHolder1_Tea_PFPda");
//       if (diag != null) diag.checked = true;

//       let medi = document.getElementById("ctl00_ContentPlaceHolder1_Tea_PFPme");
//       if (medi != null) medi.checked = true;

//       let oxygen = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Tea_PFPox"
//       );
//       if (oxygen != null) oxygen.checked = true;

//       let dme = document.getElementById("ctl00_ContentPlaceHolder1_Tea_PFPdm");
//       if (dme != null) dme.checked = true;

//       let infControl = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Tea_PFPin"
//       );
//       if (infControl != null) infControl.checked = true;

//       if (document.getElementById("ctl00_ContentPlaceHolder1_Tea_MSU") != null)
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Tea_MSU"
//         ).checked = true;

//       //psychosocial Screening
//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_RAD_PS_SS_0") != null
//       ) {
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_RAD_PS_SS_0"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_CHK_PS_NO"
//         ).checked = true;
//       }

//       //spirtual screening
//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_RAD_SS_FA_1") != null
//       ) {
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_RAD_SS_FA_1"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_RAD_SS_PGFA_1"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_CHK_SS_DS"
//         ).checked = true;
//         document.getElementById("ctl00_ContentPlaceHolder1_DRP_SS_SD").value =
//           "None";
//         document.getElementById("ctl00_ContentPlaceHolder1_DRP_SS_ISC").value =
//           "Yes";
//       }

//       //Bereavement Screening
//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_CHK_BA_PTNO") != null
//       ) {
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_CHK_BA_PTNO"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_CHK_BA_PGNO"
//         ).checked = true;
//         document.getElementById("ctl00_ContentPlaceHolder1_DRP_BV_ISC").value =
//           "No";
//       }

//       //Refferals
//       // let ref= document.getElementById('ctl00_ContentPlaceHolder1_Tea_REFno');
//       // if(ref!=null)
//       //     ref.checked=true;
//       if (
//         document.getElementById("ctl00_ContentPlaceHolder1_Tea_REFno") != null
//       ) {
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Tea_REFno"
//         ).checked = false;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Tea_REFsw"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Tea_REFsc"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Tea_REFvo"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_Tea_REFho"
//         ).checked = true;
//       }

//       //Narrative and Disease Trajectory

//       let trajectory = document.getElementById(
//         "ctl00_ContentPlaceHolder1_DiseaseTraj_2"
//       );
//       if (trajectory != null) trajectory.checked = true;

//       // if(document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP4')!=null){
//       // document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP4').checked=true;
//       // document.getElementById('ctl00_ContentPlaceHolder1_Int_MOS4').checked=true;
//       // document.getElementById('ctl00_ContentPlaceHolder1_Int_ACT4').checked=true;
//       // document.getElementById('ctl00_ContentPlaceHolder1_Int_MOB4').checked=true;
//       // document.getElementById('ctl00_ContentPlaceHolder1_Int_NUT4').checked=true;
//       // document.getElementById('ctl00_ContentPlaceHolder1_Int_FRI3').checked=true;
//       // }

//       if (options) {
//         let adl = 0;
//         let O2Conc = document.getElementById(
//           "ctl00_ContentPlaceHolder1_DRP_CEDM_O2"
//         );
//         if (O2Conc != null) O2Conc.value = "Need";

//         if (options.adls) {
//           if (options.adls == "4") {
//             adl = "3";
//           } else {
//             adl = options.adls;
//           }

//           let ambulations = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEAD_A"
//           );
//           if (ambulations != null) ambulations.value = adl;

//           let toileting = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEAD_C"
//           );
//           if (toileting != null) toileting.value = adl;

//           let transfer = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEAD_T"
//           );
//           if (transfer != null) transfer.value = adl;

//           let dressing = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEAD_D"
//           );
//           if (dressing != null) dressing.value = adl;

//           let feeding = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEAD_F"
//           );
//           if (feeding != null) feeding.value = adl;

//           let bathing = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEAD_B"
//           );
//           if (bathing != null) bathing.value = adl;

//           let cane = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_CA"
//           );
//           let walker = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_WA"
//           );
//           let wheelchair = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_WC"
//           );
//           let showerChair = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_SC"
//           );
//           let urinal = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_UL"
//           );
//           let commode = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_CO"
//           );
//           let hoyeLift = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_HL"
//           );
//           let bed = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_BD"
//           );
//           let airMetress = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_AM"
//           );
//           let bedPan = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_BP"
//           );
//           let overbedTable = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_OT"
//           );
//           let nebulizer = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_NUB"
//           );
//           let suctionMachine = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_SM"
//           );
//           let eTank = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_ET"
//           );
//           // let = document.getElementById('');
//           // let = document.getElementById('');
//           // let = document.getElementById('');
//           // let = document.getElementById('');
//           let others = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEDM_OTH"
//           );
//           let otherstext = document.getElementById(
//             "ctl00_ContentPlaceHolder1_TXT_CEDM_OTH"
//           );

//           if (options.adls == 1) {
//             if (cane != null) cane.value = "Has";
//             if (walker != null) walker.value = "";

//             if (wheelchair != null) wheelchair.value = "";

//             if (showerChair != null) showerChair.value = "";

//             if (urinal != null) urinal.value = "Need";
//             if (commode != null) commode.value = "";

//             if (hoyeLift != null) hoyeLift.value = "";

//             if (airMetress != null) airMetress.value = "";

//             if (bed != null) bed.value = "";

//             if (bedPan != null) bedPan.value = "";

//             if (overbedTable != null) overbedTable.value = "";

//             if (nebulizer != null) nebulizer.value = "";

//             if (suctionMachine != null) suctionMachine.value = "";

//             if (eTank != null) eTank.value = "";
//             if (others != null) {
//               others.value = "";
//               if (otherstext != null) otherstext.value = "";
//             }
//             if (kps != null) kps.value = "60";
//             if (pps != null) pps.value = "60";
//             if (fast != null) fast.value = "2";
//           } else if (options.adls == 2) {
//             if (cane != null) cane.value = "";
//             if (walker != null) walker.value = "Has";

//             if (wheelchair != null) wheelchair.value = "Need";

//             if (showerChair != null) showerChair.value = "Need";

//             if (urinal != null) urinal.value = "Need";
//             if (commode != null) commode.value = "";

//             if (hoyeLift != null) hoyeLift.value = "";

//             if (airMetress != null) airMetress.value = "";

//             if (bed != null) bed.value = "";

//             if (bedPan != null) bedPan.value = "";

//             if (overbedTable != null) overbedTable.value = "";

//             if (nebulizer != null) nebulizer.value = "";

//             if (suctionMachine != null) suctionMachine.value = "";

//             if (eTank != null) eTank.value = "";

//             if (others != null) {
//               others.value = "";
//               if (otherstext != null) otherstext.value = "";
//             }
//             if (kps != null) kps.value = "60";
//             if (pps != null) pps.value = "60";
//             if (fast != null) fast.value = "4";
//             // if(document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP3') != null){
//             //  document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP3').click();
//             // }
//           } else if (options.adls == 3) {
//             if (cane != null) cane.value = "";
//             if (walker != null) walker.value = "";

//             if (wheelchair != null) wheelchair.value = "Need";

//             if (showerChair != null) showerChair.value = "Need";

//             if (urinal != null) urinal.value = "Need";
//             if (commode != null) commode.value = "Need";

//             if (hoyeLift != null) hoyeLift.value = "";

//             if (airMetress != null) airMetress.value = "Need";

//             if (bed != null) bed.value = "Need";

//             if (bedPan != null) bedPan.value = "Need";

//             if (overbedTable != null) overbedTable.value = "Need";

//             if (nebulizer != null) nebulizer.value = "Need";

//             if (suctionMachine != null) suctionMachine.value = "Need";

//             if (eTank != null) eTank.value = "Need";

//             if (others != null) {
//               others.value = "";
//               if (otherstext != null) otherstext.value = "";
//             }

//             if (kps != null) kps.value = "50";
//             if (pps != null) pps.value = "50";
//             if (fast != null) fast.value = "5";
//             // if(document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP3') != null){
//             // document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP3').click();
//             // document.getElementById('ctl00_ContentPlaceHolder1_Int_MOS3').click();
//             // document.getElementById('ctl00_ContentPlaceHolder1_Int_ACT3').click();
//             // document.getElementById('ctl00_ContentPlaceHolder1_Int_MOB2').click();
//             // document.getElementById('ctl00_ContentPlaceHolder1_Int_NUT3').click();
//             // }
//           } else if (options.adls == 4) {
//             if (cane != null) cane.value = "";
//             if (walker != null) walker.value = "";

//             if (wheelchair != null) wheelchair.value = "Need";

//             if (showerChair != null) showerChair.value = "Need";

//             if (urinal != null) urinal.value = "Need";
//             if (commode != null) commode.value = "Need";

//             if (hoyeLift != null) hoyeLift.value = "Need";

//             if (airMetress != null) airMetress.value = "Need";

//             if (bed != null) bed.value = "Need";

//             if (bedPan != null) bedPan.value = "Need";

//             if (overbedTable != null) overbedTable.value = "Need";

//             if (nebulizer != null) nebulizer.value = "Need";

//             if (suctionMachine != null) suctionMachine.value = "Need";

//             if (eTank != null) eTank.value = "Need";

//             if (others != null) {
//               others.value = "";
//               if (otherstext != null) otherstext.value = "";
//             }

//             if (kps != null) kps.value = "40";
//             if (pps != null) pps.value = "40";
//             if (fast != null) fast.value = "7A";
//             // if(document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP3') != null){
//             // document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP3').click();
//             // document.getElementById('ctl00_ContentPlaceHolder1_Int_MOS3').click();
//             // document.getElementById('ctl00_ContentPlaceHolder1_Int_ACT3').click();
//             // document.getElementById('ctl00_ContentPlaceHolder1_Int_MOB2').click();
//             // document.getElementById('ctl00_ContentPlaceHolder1_Int_NUT3').click();
//             // }
//           }
//         }
//       }

//       let kpsppsless70 = document.getElementById(
//         "ctl00_ContentPlaceHolder1_DRP_IF"
//       );
//       if (kpsppsless70 != null) kpsppsless70.value = "2";

//       let DA = document.getElementById("ctl00_ContentPlaceHolder1_DRP_DA");
//       if (DA != null) DA.value = "2";

//       // let  = document.getElementById('');
//       // if( != null)
//       //     .value = '';

//       // let  = document.getElementById('');
//       // if( != null)
//       //     .value = '';
//       //HA Assignment
//       let caneHA = document.getElementById("ctl00_ContentPlaceHolder1_Cane");
//       let walkerHA = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Walker"
//       );
//       let wheelChairHA = document.getElementById(
//         "ctl00_ContentPlaceHolder1_WheelChair"
//       );
//       let bedboundHA = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Bedbound"
//       );
//       let bedRailsHA = document.getElementById(
//         "ctl00_ContentPlaceHolder1_BedRails"
//       );
//       let bedRails2HA = document.getElementById(
//         "ctl00_ContentPlaceHolder1_BedRails2"
//       );
//       let objectsHA = document.getElementById(
//         "ctl00_ContentPlaceHolder1_Objects"
//       );
//       let bedinLowHA = document.getElementById(
//         "ctl00_ContentPlaceHolder1_BedinLow"
//       );
//       let turnHA = document.getElementById("ctl00_ContentPlaceHolder1_Turn");
//       let chairtoBedHA = document.getElementById(
//         "ctl00_ContentPlaceHolder1_ChairtoBed"
//       );

//       if (caneHA != null) {
//         caneHA.checked = false;
//         walkerHA.checked = false;
//         wheelChairHA.checked = false;
//         bedboundHA.checked = false;
//         bedRailsHA.checked = false;
//         bedRails2HA.checked = false;
//         objectsHA.checked = false;
//         bedinLowHA.checked = false;
//         turnHA.checked = false;
//         chairtoBedHA.checked = false;

//         if (options.adls == "1") {
//           caneHA.checked = true;
//         } else if (options.adls == "2") {
//           walkerHA.checked = true;
//         } else if (options.adls == "3") {
//           wheelChairHA.checked = true;
//         } else if (options.adls == "4") {
//           bedboundHA.checked = true;
//           bedRailsHA.checked = true;
//           objectsHA.checked = true;
//           bedinLowHA.checked = true;
//           turnHA.checked = true;
//         }

//         //Continence/Toileting
//         let dependScale = document.getElementById(
//           "ctl00_ContentPlaceHolder1_ConDdpSca"
//         );
//         let bathroom = document.getElementById(
//           "ctl00_ContentPlaceHolder1_Bathroom"
//         );
//         let comode = document.getElementById(
//           "ctl00_ContentPlaceHolder1_Commode"
//         );
//         let bedpan = document.getElementById(
//           "ctl00_ContentPlaceHolder1_BedPan"
//         );
//         let adultDiapers = document.getElementById(
//           "ctl00_ContentPlaceHolder1_AdultDiapers"
//         );

//         //urinary

//         let cont = document.getElementById(
//           "ctl00_ContentPlaceHolder1_Continent1"
//         );
//         let incont = document.getElementById(
//           "ctl00_ContentPlaceHolder1_Incontinent1"
//         );
//         let incont1 = document.getElementById(
//           "ctl00_ContentPlaceHolder1_IncontinentcarePRN"
//         );
//         let foley = document.getElementById(
//           "ctl00_ContentPlaceHolder1_FoleyCatheter"
//         );
//         let emptycollbag = document.getElementById(
//           "ctl00_ContentPlaceHolder1_EmptyCollectionBagPRN"
//         );

//         //bowel

//         let contB = document.getElementById(
//           "ctl00_ContentPlaceHolder1_Continent2"
//         );
//         let incontB = document.getElementById(
//           "ctl00_ContentPlaceHolder1_Incontinent2"
//         );
//         let incont1B = document.getElementById(
//           "ctl00_ContentPlaceHolder1_IncontinentCarePRN1"
//         );
//         let recordBowel = document.getElementById(
//           "ctl00_ContentPlaceHolder1_RecordBowelMovements"
//         );

//         //transfer
//         let dependScaleTransfer = document.getElementById(
//           "ctl00_ContentPlaceHolder1_TranDDpSca"
//         );
//         let person1 = document.getElementById(
//           "ctl00_ContentPlaceHolder1_AssisstanceRequired"
//         );
//         let person2 = document.getElementById("ctl00_ContentPlaceHolder1_NBHA");
//         let mechLift = document.getElementById(
//           "ctl00_ContentPlaceHolder1_HoyerLift"
//         );
//         let fallpre = document.getElementById(
//           "ctl00_ContentPlaceHolder1_OtherS"
//         );

//         //Dressing
//         let dependScaleDressing = document.getElementById(
//           "ctl00_ContentPlaceHolder1_DressDDpSca"
//         );
//         let pajamas = document.getElementById(
//           "ctl00_ContentPlaceHolder1_Pajamas"
//         );
//         let dress = document.getElementById(
//           "ctl00_ContentPlaceHolder1_OthAsSpec"
//         );

//         //Feeding
//         let dependScaleFeeding = document.getElementById(
//           "ctl00_ContentPlaceHolder1_FeeDdpSca"
//         );
//         let aspPre = document.getElementById(
//           "ctl00_ContentPlaceHolder1_SupplementsAsSpecified"
//         );
//         let feedAss = document.getElementById(
//           "ctl00_ContentPlaceHolder1_TrayPrep"
//         );
//         let assOralMed = document.getElementById(
//           "ctl00_ContentPlaceHolder1_FeedingAssisstance"
//         );
//         let encourageFluids = document.getElementById(
//           "ctl00_ContentPlaceHolder1_EncourageFluidsAsTolerated"
//         );

//         //  Bathing/Hygiene
//         let dependScaleBath = document.getElementById(
//           "ctl00_ContentPlaceHolder1_BATDdpSca"
//         );
//         let shower = document.getElementById(
//           "ctl00_ContentPlaceHolder1_Shower"
//         );
//         let tubBath = document.getElementById(
//           "ctl00_ContentPlaceHolder1_TubBath"
//         );
//         let bedBath = document.getElementById(
//           "ctl00_ContentPlaceHolder1_BedBath"
//         );
//         let showerChair = document.getElementById(
//           "ctl00_ContentPlaceHolder1_ShowerChair"
//         );

//         //Patient Status
//         let alertPS = document.getElementById(
//           "ctl00_ContentPlaceHolder1_PatientAc"
//         );
//         let confusedPS = document.getElementById(
//           "ctl00_ContentPlaceHolder1_PCGAc"
//         );

//         if (dependScale != null) {
//           dependScale.value = "None";
//           dependScaleTransfer.value = "None";
//           dependScaleDressing.value = "None";
//           dependScaleFeeding.value = "None";
//           dependScaleBath.value = "None";

//           adultDiapers.checked = false;
//           bathroom.checked = true;
//           comode.checked = false;
//           bedpan.checked = false;

//           cont.checked = true;
//           incont.checked = false;
//           incont1.checked = false;
//           foley.checked = false;
//           emptycollbag.checked = false;

//           contB.checked = true;
//           incontB.checked = false;
//           incont1B.checked = false;
//           recordBowel.checked = true;

//           person1.checked = false;
//           person2.checked = false;
//           mechLift.checked = false;
//           fallpre.checked = true;

//           pajamas.checked = false;
//           dress.checked = false;

//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_AsTolerated"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_Breakfast"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_Lunch"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_Dinner"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_Snack"
//           ).checked = true;
//           assOralMed.checked = true;
//           encourageFluids.checked = true;
//           aspPre.checked = false;
//           feedAss.checked = false;

//           tubBath.checked = false;
//           shower.checked = false;
//           bedBath.checked = false;
//           showerChair.checked = false;

//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_Shampoo"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_Combo"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_Brush"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_BrushTeeth"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_Nails"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_Clean"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_DeodrantApplyEveryVisit"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_VisulaizeCondition"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_CreamandMassagetoBack"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_SpecialCareAs"
//           ).checked = false;

//           alertPS.checked = false;
//           confusedPS.checked = false;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_SCASPCHA"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_RomAsSpecified"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_ChangeLinensAsSpecified"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_TidyPatientsRoom"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_MakePatientsBed"
//           ).checked = false;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_DoPatientsLaundry"
//           ).checked = false;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_Vitals"
//           ).checked = true;

//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_AskPatientPain"
//           ).checked = true;

//           if (options.adls == "1") {
//             dependScale.value = "Minimal";
//             dependScaleTransfer.value = "Minimal";
//             dependScaleDressing.value = "Minimal";
//             dependScaleFeeding.value = "Minimal";
//             dependScaleBath.value = "Minimal";

//             bathroom.checked = true;
//             adultDiapers.checked = false;
//             comode.checked = false;
//             bedpan.checked = false;

//             cont.checked = true;
//             incont.checked = false;
//             incont1.checked = false;
//             foley.checked = false;
//             emptycollbag.checked = false;

//             contB.checked = true;
//             incontB.checked = false;
//             incont1B.checked = false;
//             recordBowel.checked = true;

//             person1.checked = false;
//             person2.checked = false;
//             mechLift.checked = false;
//             fallpre.checked = true;

//             assOralMed.checked = true;
//             encourageFluids.checked = true;
//             aspPre.checked = false;
//             feedAss.checked = true;

//             tubBath.checked = false;
//             shower.checked = true;
//             bedBath.checked = false;
//             showerChair.checked = false;
//           } else if (options.adls == "2") {
//             dependScale.value = "Moderate";
//             dependScaleTransfer.value = "Moderate";
//             dependScaleDressing.value = "Moderate";
//             dependScaleFeeding.value = "Moderate";
//             dependScaleBath.value = "Moderate";

//             bathroom.checked = true;
//             adultDiapers.checked = false;
//             comode.checked = false;
//             bedpan.checked = false;

//             cont.checked = true;
//             incont.checked = false;
//             incont1.checked = false;
//             foley.checked = false;
//             emptycollbag.checked = false;

//             contB.checked = true;
//             incontB.checked = false;
//             incont1B.checked = false;
//             recordBowel.checked = true;

//             person1.checked = false;
//             person2.checked = false;
//             mechLift.checked = false;
//             fallpre.checked = true;

//             pajamas.checked = true;
//             dress.checked = true;

//             assOralMed.checked = true;
//             encourageFluids.checked = true;
//             aspPre.checked = false;
//             feedAss.checked = true;

//             tubBath.checked = false;
//             shower.checked = true;
//             bedBath.checked = false;
//             showerChair.checked = false;
//           } else if (options.adls == "3") {
//             dependScale.value = "Complete";
//             dependScaleTransfer.value = "Complete";
//             dependScaleDressing.value = "Complete";
//             dependScaleFeeding.value = "Complete";
//             dependScaleBath.value = "Complete";

//             comode.checked = true;
//             bathroom.checked = false;
//             adultDiapers.checked = false;
//             bedpan.checked = false;

//             cont.checked = false;
//             incont.checked = true;
//             incont1.checked = true;
//             foley.checked = false;
//             emptycollbag.checked = false;

//             contB.checked = false;
//             incontB.checked = true;
//             incont1B.checked = true;
//             recordBowel.checked = true;

//             person1.checked = true;
//             person2.checked = false;
//             mechLift.checked = false;
//             fallpre.checked = true;

//             pajamas.checked = true;
//             dress.checked = true;

//             assOralMed.checked = true;
//             encourageFluids.checked = true;
//             aspPre.checked = false;
//             feedAss.checked = true;

//             tubBath.checked = false;
//             shower.checked = false;
//             bedBath.checked = false;
//             showerChair.checked = true;
//           } else if (options.adls == "4") {
//             dependScale.value = "Complete";
//             dependScaleTransfer.value = "Complete";
//             dependScaleDressing.value = "Complete";
//             dependScaleFeeding.value = "Complete";
//             dependScaleBath.value = "Complete";

//             bedpan.checked = true;
//             comode.checked = false;
//             bathroom.checked = false;
//             adultDiapers.checked = false;

//             cont.checked = false;
//             incont.checked = true;
//             incont1.checked = true;
//             foley.checked = false;
//             emptycollbag.checked = false;

//             contB.checked = false;
//             incontB.checked = true;
//             incont1B.checked = true;
//             recordBowel.checked = true;

//             person1.checked = false;
//             person2.checked = true;
//             mechLift.checked = true;
//             fallpre.checked = true;

//             pajamas.checked = true;
//             dress.checked = true;

//             assOralMed.checked = true;
//             encourageFluids.checked = true;
//             aspPre.checked = true;
//             feedAss.checked = true;

//             tubBath.checked = false;
//             shower.checked = false;
//             bedBath.checked = true;
//             showerChair.checked = false;
//           }

//           if (options.mental == "aaox4") {
//             alertPS.checked = true;
//             confusedPS.checked = false;
//           } else if (options.mental == "forgetful") {
//             confusedPS.checked = true;
//             alertPS.checked = false;
//           } else if (options.mental == "unable") {
//             confusedPS.checked = true;
//             alertPS.checked = false;
//           }
//         }
//       }
//     }
//     //Follow Up
//     else if (options.followUpIsActive) {
//       let IsPainControllable = document.getElementById(
//         "ctl00_ContentPlaceHolder1_RbControlled_0"
//       );
//       let ids = ["ctl00_ContentPlaceHolder1_lnkPainAssessment"];
//       let elements = [];
//       for (let i = 0; i < ids.length; i++) {
//         elements.push(document.getElementById(ids[i]));
//       }
//       if (IsPainControllable != null) {
//         IsPainControllable.checked = false;
//         if (options != null) {
//           if (options.fu_diagnosis.includes("Pain")) {
//             IsPainControllable.checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_DropPainLevel"
//             ).value = "5";

//             elements.forEach((element) => {
//               if (element != null) {
//                 let onClickAttr = element.getAttribute("onclick");

//                 // Use a regular expression to extract the URL inside the OpenpopupWithSize function
//                 let regex = /OpenpopupWithSize\('(.*?)'/;
//                 let match = onClickAttr.match(regex);

//                 if (match && match[1]) {
//                   let extractedUrl = match[1];
//                   console.log(
//                     "Extracted URL:",
//                     "https://www.hospicemd.com/" + extractedUrl
//                   );
//                   window.open(
//                     "https://www.hospicemd.com/" +
//                       extractedUrl +
//                       (extractedUrl.includes("?") ? "&" : "?") +
//                       "openedByScript_FU=true" +
//                       "&options=" +
//                       JSON.stringify(options),
//                     "_blank"
//                   );
//                 } else {
//                   console.log("URL not found");
//                 }
//               }
//             });
//           }

//           let sitting = document.getElementById(
//             "ctl00_ContentPlaceHolder1_RBbpPosition_0"
//           );
//           let lying = document.getElementById(
//             "ctl00_ContentPlaceHolder1_RBbpPosition_1"
//           );

//           //mobility
//           let amb = document.getElementById(
//             "ctl00_ContentPlaceHolder1_RAD_CEMO_AN"
//           );
//           let ambCane = document.getElementById(
//             "ctl00_ContentPlaceHolder1_Chk_CEMO_C"
//           );
//           let ambStand = document.getElementById(
//             "ctl00_ContentPlaceHolder1_Chk_CEMO_S"
//           );

//           let nonAmb = document.getElementById(
//             "ctl00_ContentPlaceHolder1_RAD_CEMO_AN1"
//           );
//           let bedBound = document.getElementById(
//             "ctl00_ContentPlaceHolder1_ChK_CEMO_BB"
//           );
//           let bedRest = document.getElementById(
//             "ctl00_ContentPlaceHolder1_Chk_CEMO_BR"
//           );
//           let maxAssist = document.getElementById(
//             "ctl00_ContentPlaceHolder1_Chk_CEMO_MXA"
//           );
//           let transferbedChair = document.getElementById(
//             "ctl00_ContentPlaceHolder1_Chk_CEMO_TC"
//           );
//           let exercisePrescribed = document.getElementById(
//             "ctl00_ContentPlaceHolder1_Chk_CEMO_Ex"
//           );
//           let rangeMotion = document.getElementById(
//             "ctl00_ContentPlaceHolder1_Chk_CEMO_RM"
//           );
//           let moderateAssist = document.getElementById(
//             "ctl00_ContentPlaceHolder1_Chk_CEMO_M"
//           );
//           let ambMaxAssist = document.getElementById(
//             "ctl00_ContentPlaceHolder1_Chk_CEMO_MX"
//           );

//           //adl assessment

//           let ambAss = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEAD_A"
//           );
//           let toiletAss = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEAD_C"
//           );
//           let transferAss = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEAD_T"
//           );
//           let dressingAss = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEAD_D"
//           );
//           let feedAss = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEAD_F"
//           );
//           let bathAss = document.getElementById(
//             "ctl00_ContentPlaceHolder1_DRP_CEAD_B"
//           );

//           //imminent dying

//           let imminentDyingNoIssueReported = document.getElementById(
//             "ctl00_ContentPlaceHolder1_ChkImminently"
//           );
//           imminentDyingNoIssueReported.checked = true;

//           let isPatientDying = document.getElementById(
//             "ctl00_ContentPlaceHolder1_RBImminentlyDying_1"
//           );
//           isPatientDying.checked = true;

//           let isFallIncidence = document.getElementById(
//             "ctl00_ContentPlaceHolder1_Env_FRA_1"
//           );
//           isFallIncidence.checked = true;

//           let isSafetyIssue = document.getElementById(
//             "ctl00_ContentPlaceHolder1_Env_SAFA_1"
//           );
//           isSafetyIssue.checked = true;

//           let physicalSupport = document.getElementById(
//             "ctl00_ContentPlaceHolder1_CHK_CAP_PHY"
//           );
//           let emotionalSupport = document.getElementById(
//             "ctl00_ContentPlaceHolder1_CHK_CAP_Emo"
//           );
//           let safety = document.getElementById(
//             "ctl00_ContentPlaceHolder1_CHK_CAP_Saf"
//           );
//           let environmentalNeeds = document.getElementById(
//             "ctl00_ContentPlaceHolder1_CHK_CAP_Env"
//           );
//           let knowledgeRelated = document.getElementById(
//             "ctl00_ContentPlaceHolder1_CHK_CAP_Kno"
//           );

//           physicalSupport.checked = true;
//           emotionalSupport.checked = true;
//           safety.checked = true;
//           environmentalNeeds.checked = true;
//           knowledgeRelated.checked = true;

//           //Visit Check List
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_RbVC1_0"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_RbVC2_0"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_RbVC3_0"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_RbVC4_0"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_RBVC6_2"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_RBVC7_2"
//           ).checked = true;
//           document.getElementById(
//             "ctl00_ContentPlaceHolder1_RbVC5_0"
//           ).checked = true;

//           amb.checked = false;
//           ambCane.checked = false;
//           ambStand.checked = false;
//           nonAmb.checked = false;
//           bedBound.checked = false;
//           bedRest.checked = false;
//           maxAssist.checked = false;
//           transferbedChair.checked = false;
//           exercisePrescribed.checked = false;
//           rangeMotion.checked = false;
//           moderateAssist.checked = false;
//           ambMaxAssist.checked = false;

//           ambAss.value = "0";
//           toiletAss.value = "0";
//           transferAss.value = "0";
//           dressingAss.value = "0";
//           feedAss.value = "0";
//           bathAss.value = "0";

//           sitting.checked = true;
//           if (options.fu_adls == 1) {
//             sitting.checked = true;

//             amb.checked = true;
//             ambCane.checked = true;
//             ambStand.checked = true;
//             nonAmb.checked = false;
//             bedBound.checked = false;
//             bedRest.checked = false;
//             maxAssist.checked = false;
//             transferbedChair.checked = false;
//             exercisePrescribed.checked = false;
//             rangeMotion = false;
//             moderateAssist.checked = false;
//             ambMaxAssist.checked = false;
//             ambAss.value = "1";
//             toiletAss.value = "1";
//             transferAss.value = "1";
//             dressingAss.value = "1";
//             feedAss.value = "1";
//             bathAss.value = "1";
//           }
//           if (options.fu_adls == 2) {
//             sitting.checked = true;

//             amb.checked = true;
//             ambCane.checked = true;
//             ambStand.checked = true;
//             nonAmb.checked = false;
//             bedBound.checked = false;
//             bedRest.checked = false;
//             maxAssist.checked = false;
//             transferbedChair.checked = false;
//             exercisePrescribed.checked = false;
//             rangeMotion.checked = false;
//             moderateAssist.checked = false;
//             ambMaxAssist.checked = false;

//             ambAss.value = "2";
//             toiletAss.value = "2";
//             transferAss.value = "2";
//             dressingAss.value = "2";
//             feedAss.value = "2";
//             bathAss.value = "2";
//           }
//           if (options.fu_adls == 3) {
//             sitting.checked = true;

//             amb.checked = false;
//             ambCane.checked = false;
//             ambStand.checked = false;
//             nonAmb.checked = true;
//             bedBound.checked = false;
//             bedRest.checked = true;
//             maxAssist.checked = true;
//             transferbedChair.checked = true;
//             exercisePrescribed.checked = false;
//             rangeMotion.checked = false;
//             moderateAssist.checked = false;
//             ambMaxAssist.checked = false;

//             ambAss.value = "3";
//             toiletAss.value = "3";
//             transferAss.value = "3";
//             dressingAss.value = "2";
//             feedAss.value = "2";
//             bathAss.value = "3";
//           }
//           if (options.fu_adls == 4) {
//             lying.checked = true;

//             amb.checked = false;
//             ambCane.checked = false;
//             ambStand.checked = false;
//             nonAmb.checked = true;
//             bedBound.checked = true;
//             bedRest.checked = false;
//             maxAssist.checked = true;
//             transferbedChair.checked = false;
//             exercisePrescribed.checked = true;
//             rangeMotion.checked = true;
//             moderateAssist.checked = false;
//             ambMaxAssist.checked = false;

//             ambAss.value = "3";
//             toiletAss.value = "3";
//             transferAss.value = "3";
//             dressingAss.value = "3";
//             feedAss.value = "3";
//             bathAss.value = "3";
//           }

//           if (options.fu_diagnosis.includes("CHF")) {
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_RB_CAR_EDM2"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_RB_A2"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_RB_C2"
//             ).checked = true;
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_RB_CAR_DYS2"
//             ).checked = true;
//           }
//           if (options.fu_diagnosis.includes("Foley")) {
//             document.getElementById(
//               "ctl00_ContentPlaceHolder1_RB_GEN_URP2"
//             ).checked = true;
//           }

//           let noIssueReported = document.getElementById(
//             "ctl00_ContentPlaceHolder1_ChkMusculoSkeletal"
//           );
//           let weaknessNone = document.getElementById(
//             "ctl00_ContentPlaceHolder1_RB_MUS_WKN1"
//           );
//           let weaknessMild = document.getElementById(
//             "ctl00_ContentPlaceHolder1_RB_MUS_WKN2"
//           );
//           let weaknessModerate = document.getElementById(
//             "ctl00_ContentPlaceHolder1_RB_MUS_WKN3"
//           );
//           let weaknessSevere = document.getElementById(
//             "ctl00_ContentPlaceHolder1_RB_MUS_WKN4"
//           );

//           let contractureNone = document.getElementById(
//             "ctl00_ContentPlaceHolder1_RB_MUS_CON1"
//           );
//           let contractureMild = document.getElementById(
//             "ctl00_ContentPlaceHolder1_RB_MUS_CON2"
//           );
//           let contractureModerate = document.getElementById(
//             "ctl00_ContentPlaceHolder1_RB_MUS_CON3"
//           );
//           let contractureSevere = document.getElementById(
//             "ctl00_ContentPlaceHolder1_RB_MUS_CON4"
//           );

//           let gastroNoIssueReported = document.getElementById(
//             "ctl00_ContentPlaceHolder1_ChkGastro"
//           );
//           let immunNoIssueReported = document.getElementById(
//             "ctl00_ContentPlaceHolder1_ChkImmunological"
//           );
//           let nutritionNoIssueReported = document.getElementById(
//             "ctl00_ContentPlaceHolder1_ChkNut"
//           );
//           let endoNoIssueReported = document.getElementById(
//             "ctl00_ContentPlaceHolder1_ChkIndocrine"
//           );
//           let integuNoIssueReported = document.getElementById(
//             "ctl00_ContentPlaceHolder1_ChkIntegumentary"
//           );

//           gastroNoIssueReported.checked = true;
//           immunNoIssueReported.checked = true;
//           nutritionNoIssueReported.checked = true;
//           endoNoIssueReported.checked = true;
//           integuNoIssueReported.checked = true;

//           noIssueReported.checked = true;
//           weaknessNone.checked = true;
//           contractureNone.checked = true;
//           if (options.fu_adls == 1) {
//             noIssueReported.checked = false;
//             weaknessMild.checked = true;
//             contractureMild.checked = true;
//           } else if (options.fu_adls == 2) {
//             noIssueReported.checked = false;
//             weaknessMild.checked = true;
//             contractureMild.checked = true;
//           } else if (options.fu_adls == 3) {
//             noIssueReported.checked = false;
//             weaknessModerate.checked = true;
//             contractureModerate.checked = true;
//           } else if (options.fu_adls == 4) {
//             noIssueReported.checked = false;
//             weaknessSevere.checked = true;
//             contractureSevere.checked = true;
//           } else {
//             noIssueReported.checked = true;
//             weaknessNone.checked = true;
//             contractureNone.checked = true;
//           }
//         }
//         document.getElementById("ctl00_ContentPlaceHolder1_txtTemp").value =
//           getRandomNumber(96.5, 99.2);
//         document.getElementById("ctl00_ContentPlaceHolder1_TxtPulse").value =
//           getRandomNumber(60, 100, false);
//         document.getElementById("ctl00_ContentPlaceHolder1_TxtResp").value =
//           getRandomNumber(12, 22, false);
//         document.getElementById("ctl00_ContentPlaceHolder1_TxtBp").value =
//           getRandomNumber(90, 149, false) +
//           "/" +
//           getRandomNumber(60, 90, false);

//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_RBLM_0"
//         ).checked = true;
//         document.getElementById("ctl00_ContentPlaceHolder1_TxtO2SAT").value =
//           getRandomNumber(90, 99, false);

//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemA"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemB"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemC"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemD"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemE"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemF"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemG"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemH"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemI"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemJ"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemK"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemL"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemM"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemN"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemO"
//         ).checked = true;
//         document.getElementById(
//           "ctl00_ContentPlaceHolder1_chkBodySystemP"
//         ).checked = true;

//         // document.getElementById('ctl00_ContentPlaceHolder1_btnBodySystemContinue').click();
//       }
//     }
//   } else if (options.project == "project2") {
//     const iframe = document.getElementById("form-frame-container");
//     if (iframe != null) {
//       let currentPaymentSource = iframe.contentDocument.querySelector(
//         'input[name="value(M0150_CPAY_MCARE_HMO)"]'
//       );
//       currentPaymentSource.checked = true;

//       iframe.contentDocument.getElementById("pageNum2").click();

//       let intervalId = setInterval(() => {
//         let m0102 = iframe.contentDocument.getElementById(
//           "M0102_PHYSN_ORDRD_SOCROC_DT_NA"
//         );
//         if (m0102 != null) {
//           m0102.checked = true;
//           iframe.contentDocument.getElementById(
//             "M0110_EPISODE_TIMING1"
//           ).checked = true;

//           iframe.contentDocument.getElementById("pageNum4").click();
//           let intervalIdM1028 = setInterval(() => {
//             let m1028DM =
//               iframe.contentDocument.getElementById("M1028_ACTV_DIAG_DM");
//             if (m1028DM != null) {
//               if (options.diagnosis.includes("dm2")) {
//                 m1028DM.checked = true;
//               }
//               iframe.contentDocument.getElementById("pageNum5").click();

//               let envSafetyInterval = setInterval(() => {
//                 let envSafety =
//                   iframe.contentDocument.getElementById("SafetyHazardsNone");

//                 if (envSafety != null) {
//                   envSafety.checked = true;

//                   let fireExt = iframe.contentDocument.getElementById(
//                     "emp_ExtinguishersYes_Rdo"
//                   );
//                   if (fireExt != null) {
//                     fireExt.checked = true;
//                   }

//                   let detExt = iframe.contentDocument.getElementById(
//                     "emp_DetectorsHomeYes_Rdo"
//                   );
//                   if (detExt != null) {
//                     detExt.checked = true;
//                   }

//                   let moreExit = iframe.contentDocument.getElementById(
//                     "emp_MoreExitYes_Rdo"
//                   );
//                   if (moreExit != null) {
//                     moreExit.checked = true;
//                   }

//                   let exitplan = iframe.contentDocument.getElementById(
//                     "emp_ExitPlanYes_Rdo"
//                   );
//                   if (exitplan != null) {
//                     exitplan.checked = true;
//                   }

//                   let pwrFailure = iframe.contentDocument.getElementById(
//                     "emp_PowerFailureYes_Rdo"
//                   );
//                   if (pwrFailure != null) {
//                     pwrFailure.checked = true;
//                   }

//                   let natDis = iframe.contentDocument.getElementById(
//                     "emp_NaturalDisasterYes_Rdo"
//                   );
//                   if (natDis != null) {
//                     natDis.checked = true;
//                   }

//                   if (options.precautions == "oxygen") {
//                     let oxygen = iframe.contentDocument.getElementById(
//                       "emp_OxygenSignsYes_Rdo"
//                     );
//                     if (oxygen != null) {
//                       oxygen.checked = true;
//                     }

//                     let backupOxygen = iframe.contentDocument.getElementById(
//                       "emp_BackupOxygenYes_Rdo"
//                     );
//                     if (backupOxygen != null) {
//                       backupOxygen.checked = true;
//                     }
//                   } else {
//                     let oxygen = iframe.contentDocument.getElementById(
//                       "emp_OxygenSignsNa_Rdo"
//                     );
//                     if (oxygen != null) {
//                       oxygen.checked = true;
//                     }

//                     let backupOxygen = iframe.contentDocument.getElementById(
//                       "emp_BackupOxygenNa_Rdo"
//                     );
//                     if (backupOxygen != null) {
//                       backupOxygen.checked = true;
//                     }
//                   }
//                   let equipNone =
//                     iframe.contentDocument.getElementById("eqc_None_Chk");
//                   let wheelChair =
//                     iframe.contentDocument.getElementById("eqc_Wheelchair_Chk");
//                   let walker =
//                     iframe.contentDocument.getElementById("eqc_Walker_Chk");
//                   let cane =
//                     iframe.contentDocument.getElementById("eqc_Cane_Chk");
//                   let besideComode = iframe.contentDocument.getElementById(
//                     "eqc_BedsideCommode_Chk"
//                   );

//                   equipNone.checked = true;
//                   wheelChair.checked = false;
//                   walker.checked = false;
//                   cane.checked = false;
//                   besideComode.checked = false;

//                   if (options.adls) {
//                     equipNone.checked = false;

//                     let wheelChair =
//                       iframe.contentDocument.getElementById(
//                         "eqc_Wheelchair_Chk"
//                       );
//                     let walker =
//                       iframe.contentDocument.getElementById("eqc_Walker_Chk");
//                     let cane =
//                       iframe.contentDocument.getElementById("eqc_Cane_Chk");
//                     let besideComode = iframe.contentDocument.getElementById(
//                       "eqc_BedsideCommode_Chk"
//                     );

//                     if (options.adls == 1) {
//                       wheelChair.checked = false;
//                       walker.checked = false;
//                       cane.checked = true;
//                       besideComode.checked = false;
//                     } else if (options.adls == 2) {
//                       wheelChair.checked = false;
//                       walker.checked = true;
//                       cane.checked = false;
//                       besideComode.checked = false;
//                     } else if (options.adls == 3) {
//                       wheelChair.checked = true;
//                       walker.checked = false;
//                       cane.checked = false;
//                       besideComode.checked = false;
//                     } else if (options.adls == 4) {
//                       wheelChair.checked = true;
//                       walker.checked = false;
//                       cane.checked = false;
//                       besideComode.checked = true;
//                     }
//                   }

//                   iframe.contentDocument.getElementById("pageNum9").click();

//                   let cognitiveIntId = setInterval(() => {
//                     let dementia =
//                       iframe.contentDocument.getElementById("neh_Dementia_Chk");
//                     if (dementia != null) {
//                       let memoryLoss =
//                         iframe.contentDocument.getElementById(
//                           "neh_MemoryLoss_Chk"
//                         );
//                       let noHistory =
//                         iframe.contentDocument.getElementById(
//                           "neh_NoHistory_Chk"
//                         );
//                       let m1700RequirePrompting =
//                         iframe.contentDocument.getElementById(
//                           "M1700_COG1_FUNCTION"
//                         );
//                       let m1700Alert = iframe.contentDocument.getElementById(
//                         "M1700_COG0_FUNCTION"
//                       );
//                       let m1700reqConsiderable =
//                         iframe.contentDocument.getElementById(
//                           "M1700_COG3_FUNCTION"
//                         );
//                       let m1710Never = iframe.contentDocument.getElementById(
//                         "M1710_WHEN0_CONFUSED"
//                       );
//                       let m1710Awakening =
//                         iframe.contentDocument.getElementById(
//                           "M1710_WHEN2_CONFUSED"
//                         );
//                       let m1710Constantly =
//                         iframe.contentDocument.getElementById(
//                           "M1710_WHEN4_CONFUSED"
//                         );
//                       let m1720NoneTime = iframe.contentDocument.getElementById(
//                         "M1720_WHEN0_ANXIOUS"
//                       );
//                       let m1740MemDeficit =
//                         iframe.contentDocument.getElementById(
//                           "M1740_BD_MEM1_DEFICIT"
//                         );
//                       let m1740Imapaired =
//                         iframe.contentDocument.getElementById(
//                           "M1740_BD_MEM2_DEFICIT"
//                         );
//                       let m1740NoneDemo = iframe.contentDocument.getElementById(
//                         "M1740_BD_MEM7_DEFICIT"
//                       );
//                       let m1745Never = iframe.contentDocument.getElementById(
//                         "M1745_BEH_PROB0_FREQ"
//                       );
//                       let riskFactor =
//                         iframe.contentDocument.getElementById(
//                           "rif_Noneabove_Chk"
//                         );
//                       let g0100SelfCare = iframe.contentDocument.querySelector(
//                         'select[name="value(GG0100A)"]'
//                       );
//                       let g0100Indoor = iframe.contentDocument.querySelector(
//                         'select[name="value(GG0100B)"]'
//                       );
//                       let g0100Stairs = iframe.contentDocument.querySelector(
//                         'select[name="value(GG0100C)"]'
//                       );
//                       let g0100FuncCognition =
//                         iframe.contentDocument.querySelector(
//                           'select[name="value(GG0100D)"]'
//                         );

//                       let GG0110A =
//                         iframe.contentDocument.getElementById("GG0110A");
//                       let GG0110B =
//                         iframe.contentDocument.getElementById("GG0110B");
//                       let GG0110C =
//                         iframe.contentDocument.getElementById("GG0110C");
//                       let GG0110D =
//                         iframe.contentDocument.getElementById("GG0110D");
//                       let GG0110E =
//                         iframe.contentDocument.getElementById("GG0110E");
//                       let GG0110Z =
//                         iframe.contentDocument.getElementById("GG0110Z");

//                       let gg0130SA1 = iframe.contentDocument.querySelector(
//                         'select[name="value(GG0130A1)"]'
//                       );
//                       let gg0130SB1 = iframe.contentDocument.querySelector(
//                         'select[name="value(GG0130B1)"]'
//                       );
//                       let gg0130SC1 = iframe.contentDocument.querySelector(
//                         'select[name="value(GG0130C1)"]'
//                       );
//                       let gg0130SE1 = iframe.contentDocument.querySelector(
//                         'select[name="value(GG0130E1)"]'
//                       );
//                       let gg0130SF1 = iframe.contentDocument.querySelector(
//                         'select[name="value(GG0130F1)"]'
//                       );
//                       let gg0130SG1 = iframe.contentDocument.querySelector(
//                         'select[name="value(GG0130G1)"]'
//                       );
//                       let gg0130SH1 = iframe.contentDocument.querySelector(
//                         'select[name="value(GG0130H1)"]'
//                       );

//                       dementia.checked = false;
//                       memoryLoss.checked = false;
//                       noHistory.checked = false;
//                       m1700Alert.checked = false;
//                       m1700RequirePrompting.checked = false;
//                       m1710Never.checked = false;
//                       m1710Awakening.checked = false;
//                       m1720NoneTime.checked = false;
//                       m1700reqConsiderable.checked = false;
//                       m1710Constantly.checked = false;
//                       m1740MemDeficit.checked = false;
//                       m1740Imapaired.checked = false;
//                       m1740NoneDemo.checked = false;
//                       m1745Never.checked = true;
//                       riskFactor.checked = true;
//                       g0100SelfCare.value = "3";
//                       g0100Indoor.value = "3";
//                       g0100Stairs.value = "3";
//                       g0100FuncCognition.value = "";
//                       GG0110A.checked = false;
//                       GG0110B.checked = false;
//                       GG0110C.checked = false;
//                       GG0110D.checked = false;
//                       GG0110E.checked = false;
//                       GG0110Z.checked = true;

//                       gg0130SA1.value = "06";
//                       gg0130SB1.value = "06";
//                       gg0130SC1.value = "06";
//                       gg0130SE1.value = "06";
//                       gg0130SF1.value = "06";
//                       gg0130SG1.value = "06";
//                       gg0130SH1.value = "06";

//                       if (options.mental == "forgetful") {
//                         dementia.checked = true;
//                         memoryLoss.checked = true;
//                         noHistory.checked = false;
//                         m1700Alert.checked = false;
//                         m1700RequirePrompting.checked = true;
//                         m1710Never.checked = false;
//                         m1710Awakening.checked = true;
//                         m1720NoneTime.checked = true;
//                         m1740MemDeficit.checked = true;
//                         m1740Imapaired.checked = true;
//                         m1740NoneDemo.checked = false;
//                         g0100FuncCognition.value = "2";
//                       } else if (options.mental == "aaox4") {
//                         dementia.checked = false;
//                         memoryLoss.checked = false;
//                         noHistory.checked = true;
//                         m1700Alert.checked = true;
//                         m1700RequirePrompting.checked = false;
//                         m1710Never.checked = true;
//                         m1710Awakening.checked = false;
//                         m1720NoneTime.checked = true;
//                         m1740MemDeficit.checked = false;
//                         m1740Imapaired.checked = false;
//                         m1740NoneDemo.checked = true;
//                         g0100FuncCognition.value = "3";
//                       } else if (options.mental == "unable") {
//                         dementia.checked = false;
//                         memoryLoss.checked = false;
//                         noHistory.checked = false;
//                         m1700Alert.checked = false;
//                         m1700RequirePrompting.checked = false;
//                         m1710Never.checked = false;
//                         m1710Awakening.checked = false;
//                         m1720NoneTime.checked = true;
//                         m1700reqConsiderable.checked = true;
//                         m1710Constantly.checked = true;
//                         m1740MemDeficit.checked = true;
//                         m1740Imapaired.checked = true;
//                         m1740NoneDemo.checked = false;
//                         g0100FuncCognition.value = "1";
//                       }

//                       if (options.adls) {
//                         if (options.adls == "1") {
//                           g0100SelfCare.value = "2";
//                           g0100Indoor.value = "2";
//                           g0100Stairs.value = "2";

//                           GG0110A.checked = false;
//                           GG0110B.checked = false;
//                           GG0110C.checked = false;
//                           GG0110D.checked = false;
//                           GG0110E.checked = false;
//                           GG0110Z.checked = true;

//                           gg0130SA1.value = "05";
//                           gg0130SB1.value = "05";
//                           gg0130SC1.value = "05";
//                           gg0130SE1.value = "05";
//                           gg0130SF1.value = "05";
//                           gg0130SG1.value = "05";
//                           gg0130SH1.value = "05";
//                         } else if (options.adls == "2") {
//                           g0100SelfCare.value = "2";
//                           g0100Indoor.value = "2";
//                           g0100Stairs.value = "2";

//                           GG0110A.checked = false;
//                           GG0110B.checked = false;
//                           GG0110C.checked = false;
//                           GG0110D.checked = true;
//                           GG0110E.checked = false;
//                           GG0110Z.checked = false;

//                           gg0130SA1.value = "05";
//                           gg0130SB1.value = "05";
//                           gg0130SC1.value = "03";
//                           gg0130SE1.value = "03";
//                           gg0130SF1.value = "03";
//                           gg0130SG1.value = "03";
//                           gg0130SH1.value = "03";
//                         } else if (options.adls == "3") {
//                           g0100SelfCare.value = "1";
//                           g0100Indoor.value = "1";
//                           g0100Stairs.value = "1";

//                           GG0110A.checked = true;
//                           GG0110B.checked = false;
//                           GG0110C.checked = false;
//                           GG0110D.checked = false;
//                           GG0110E.checked = false;
//                           GG0110Z.checked = false;

//                           gg0130SA1.value = "04";
//                           gg0130SB1.value = "04";
//                           gg0130SC1.value = "01";
//                           gg0130SE1.value = "01";
//                           gg0130SF1.value = "02";
//                           gg0130SG1.value = "01";
//                           gg0130SH1.value = "01";
//                         } else if (options.adls == "4") {
//                           g0100SelfCare.value = "1";
//                           g0100Indoor.value = "1";
//                           g0100Stairs.value = "1";

//                           GG0110A.checked = true;
//                           GG0110B.checked = false;
//                           GG0110C.checked = true;
//                           GG0110D.checked = false;
//                           GG0110E.checked = false;
//                           GG0110Z.checked = false;

//                           gg0130SA1.value = "01";
//                           gg0130SB1.value = "01";
//                           gg0130SC1.value = "01";
//                           gg0130SE1.value = "01";
//                           gg0130SF1.value = "01";
//                           gg0130SG1.value = "01";
//                           gg0130SH1.value = "01";
//                         }
//                       }
//                       iframe.contentDocument
//                         .getElementById("pageNum10")
//                         .click();

//                       var page10Interval = setInterval(() => {
//                         let m1800 = iframe.contentDocument.getElementById(
//                           "M1800_CRNT0_GROOMING"
//                         );

//                         if (m1800 != null) {
//                           let gg0170A1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170A1)"]'
//                           );
//                           let gg0170B1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170B1)"]'
//                           );
//                           let gg0170C1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170C_MOBILITY_SOCROC_PERF)"]'
//                           );
//                           let gg0170D1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170D1)"]'
//                           );
//                           let gg0170E1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170E1)"]'
//                           );
//                           let gg0170F1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170F1)"]'
//                           );
//                           let gg0170G1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170G1)"]'
//                           );
//                           let gg0170I1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170I1)"]'
//                           );
//                           let gg0170J1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170J1)"]'
//                           );
//                           let gg0170K1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170K1)"]'
//                           );
//                           let gg0170L1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170L1)"]'
//                           );
//                           let gg0170M1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170M1)"]'
//                           );
//                           let gg0170N1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170N1)"]'
//                           );
//                           let gg0170O1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170O1)"]'
//                           );
//                           let gg0170P1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170P1)"]'
//                           );
//                           let gg0170Q1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170Q1)"]'
//                           );
//                           let gg0170R1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170R1)"]'
//                           );
//                           let gg0170RR1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170RR1)"]'
//                           );
//                           let gg0170S1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170S1)"]'
//                           );
//                           let gg0170SS1 = iframe.contentDocument.querySelector(
//                             'select[name="value(GG0170SS1)"]'
//                           );

//                           let m1800C0 = iframe.contentDocument.getElementById(
//                             "M1800_CRNT0_GROOMING"
//                           );
//                           let m1800C1 = iframe.contentDocument.getElementById(
//                             "M1800_CRNT1_GROOMING"
//                           );
//                           let m1800C2 = iframe.contentDocument.getElementById(
//                             "M1800_CRNT2_GROOMING"
//                           );
//                           let m1800C3 = iframe.contentDocument.getElementById(
//                             "M1800_CRNT3_GROOMING"
//                           );

//                           let m1810D0 = iframe.contentDocument.getElementById(
//                             "M1810_CRNT_DRESS0_UPPER"
//                           );
//                           let m1810D1 = iframe.contentDocument.getElementById(
//                             "M1810_CRNT_DRESS1_UPPER"
//                           );
//                           let m1810D2 = iframe.contentDocument.getElementById(
//                             "M1810_CRNT_DRESS2_UPPER"
//                           );
//                           let m1810D3 = iframe.contentDocument.getElementById(
//                             "M1810_CRNT_DRESS3_UPPER"
//                           );

//                           let m1820D0 = iframe.contentDocument.getElementById(
//                             "M1820_CRNT_DRESS0_LOWER"
//                           );
//                           let m1820D1 = iframe.contentDocument.getElementById(
//                             "M1820_CRNT_DRESS1_LOWER"
//                           );
//                           let m1820D2 = iframe.contentDocument.getElementById(
//                             "M1820_CRNT_DRESS2_LOWER"
//                           );
//                           let m1820D3 = iframe.contentDocument.getElementById(
//                             "M1820_CRNT_DRESS3_LOWER"
//                           );

//                           let m1830B0 =
//                             iframe.contentDocument.getElementById(
//                               "M1830_CRNT0_BATHG"
//                             );
//                           let m1830B1 =
//                             iframe.contentDocument.getElementById(
//                               "M1830_CRNT1_BATHG"
//                             );
//                           let m1830B2 =
//                             iframe.contentDocument.getElementById(
//                               "M1830_CRNT2_BATHG"
//                             );
//                           let m1830B5 =
//                             iframe.contentDocument.getElementById(
//                               "M1830_CRNT5_BATHG"
//                             );
//                           let m1830B6 =
//                             iframe.contentDocument.getElementById(
//                               "M1830_CRNT6_BATHG"
//                             );

//                           let m1840T0 =
//                             iframe.contentDocument.getElementById(
//                               "M1840_CRNT0_TOILTG"
//                             );
//                           let m1840T1 =
//                             iframe.contentDocument.getElementById(
//                               "M1840_CRNT1_TOILTG"
//                             );
//                           let m1840T4 =
//                             iframe.contentDocument.getElementById(
//                               "M1840_CRNT4_TOILTG"
//                             );
//                           let m1840T3 =
//                             iframe.contentDocument.getElementById(
//                               "M1840_CRNT3_TOILTG"
//                             );

//                           let m1845T0 = iframe.contentDocument.getElementById(
//                             "M1845_CRNT_TOILTG0_HYGN"
//                           );
//                           let m1845T1 = iframe.contentDocument.getElementById(
//                             "M1845_CRNT_TOILTG1_HYGN"
//                           );
//                           let m1845T2 = iframe.contentDocument.getElementById(
//                             "M1845_CRNT_TOILTG2_HYGN"
//                           );
//                           let m1845T3 = iframe.contentDocument.getElementById(
//                             "M1845_CRNT_TOILTG3_HYGN"
//                           );

//                           let m1850T0 = iframe.contentDocument.getElementById(
//                             "M1850_CRNT0_TRNSFRNG"
//                           );
//                           let m1850T1 = iframe.contentDocument.getElementById(
//                             "M1850_CRNT1_TRNSFRNG"
//                           );
//                           let m1850T3 = iframe.contentDocument.getElementById(
//                             "M1850_CRNT3_TRNSFRNG"
//                           );
//                           let m1850T4 = iframe.contentDocument.getElementById(
//                             "M1850_CRNT4_TRNSFRNG"
//                           );

//                           let m1860A0 =
//                             iframe.contentDocument.getElementById(
//                               "M1860_CRNT0_AMBLTN"
//                             );
//                           let m1860A1 =
//                             iframe.contentDocument.getElementById(
//                               "M1860_CRNT1_AMBLTN"
//                             );
//                           let m1860A2 =
//                             iframe.contentDocument.getElementById(
//                               "M1860_CRNT2_AMBLTN"
//                             );
//                           let m1860A5 =
//                             iframe.contentDocument.getElementById(
//                               "M1860_CRNT5_AMBLTN"
//                             );
//                           let m1860A6 =
//                             iframe.contentDocument.getElementById(
//                               "M1860_CRNT6_AMBLTN"
//                             );

//                           let weightBearing =
//                             iframe.contentDocument.getElementById(
//                               "mus_Weight_Chk"
//                             );
//                           let decreasedRom =
//                             iframe.contentDocument.getElementById(
//                               "mus_DecreasedRom_Chk"
//                             );
//                           let shuffling =
//                             iframe.contentDocument.getElementById(
//                               "mus_Shuffling_Chk"
//                             );
//                           let weakness =
//                             iframe.contentDocument.getElementById(
//                               "mus_Weakness_Chk"
//                             );
//                           let noDeficits =
//                             iframe.contentDocument.getElementById(
//                               "mus_NoDeficits_Chk"
//                             );

//                           gg0170A1.value = "06";
//                           gg0170B1.value = "06";
//                           gg0170C1.value = "06";
//                           gg0170D1.value = "06";
//                           gg0170E1.value = "06";
//                           gg0170F1.value = "06";
//                           gg0170G1.value = "06";
//                           gg0170I1.value = "06";
//                           gg0170J1.value = "06";
//                           gg0170K1.value = "06";
//                           gg0170L1.value = "06";
//                           gg0170M1.value = "06";
//                           gg0170N1.value = "06";
//                           gg0170O1.value = "06";
//                           gg0170P1.value = "06";
//                           gg0170Q1.value = "0";
//                           gg0170R1.value = "";
//                           gg0170RR1.value = "";
//                           gg0170S1.value = "";
//                           gg0170SS1.value = "";

//                           m1800C0.checked = true;
//                           m1810D0.checked = true;
//                           m1820D0.checked = true;
//                           m1830B0.checked = true;
//                           m1840T0.checked = true;
//                           m1845T0.checked = true;
//                           m1850T0.checked = true;
//                           m1860A0.checked = true;

//                           weightBearing.checked = false;
//                           decreasedRom.checked = false;
//                           shuffling.checked = false;
//                           weakness.checked = false;
//                           noDeficits.checked = true;

//                           if (options.adls) {
//                             if (options.adls == "1") {
//                               gg0170A1.value = "05";
//                               gg0170B1.value = "05";
//                               gg0170C1.value = "05";
//                               gg0170D1.value = "05";
//                               gg0170E1.value = "05";
//                               gg0170F1.value = "05";
//                               gg0170G1.value = "05";
//                               gg0170I1.value = "05";
//                               gg0170J1.value = "05";
//                               gg0170K1.value = "05";
//                               gg0170L1.value = "05";
//                               gg0170M1.value = "05";
//                               gg0170N1.value = "05";
//                               gg0170O1.value = "05";
//                               gg0170P1.value = "05";
//                               gg0170Q1.value = "0";

//                               m1800C1.checked = true;
//                               m1810D1.checked = true;
//                               m1820D1.checked = true;
//                               m1830B1.checked = true;
//                               m1840T1.checked = true;
//                               m1845T1.checked = true;
//                               m1850T1.checked = true;
//                               m1860A1.checked = true;

//                               weightBearing.checked = false;
//                               decreasedRom.checked = false;
//                               shuffling.checked = true;
//                               weakness.checked = true;
//                               noDeficits.checked = false;
//                             } else if (options.adls == "2") {
//                               gg0170A1.value = "03";
//                               gg0170B1.value = "03";
//                               gg0170C1.value = "03";
//                               gg0170D1.value = "03";
//                               gg0170E1.value = "03";
//                               gg0170F1.value = "03";
//                               gg0170G1.value = "03";
//                               gg0170I1.value = "03";
//                               gg0170J1.value = "03";
//                               gg0170K1.value = "03";
//                               gg0170L1.value = "88";
//                               gg0170M1.value = "88";
//                               gg0170N1.value = "88";
//                               gg0170O1.value = "05";
//                               gg0170P1.value = "88";
//                               gg0170Q1.value = "0";

//                               m1800C2.checked = true;
//                               m1810D2.checked = true;
//                               m1820D2.checked = true;
//                               m1830B2.checked = true;
//                               m1840T1.checked = true;
//                               m1845T2.checked = true;
//                               m1850T1.checked = true;
//                               m1860A2.checked = true;

//                               weightBearing.checked = false;
//                               decreasedRom.checked = false;
//                               shuffling.checked = true;
//                               weakness.checked = true;
//                               noDeficits.checked = false;
//                             } else if (options.adls == "3") {
//                               gg0170A1.value = "01";
//                               gg0170B1.value = "02";
//                               gg0170C1.value = "02";
//                               gg0170D1.value = "01";
//                               gg0170E1.value = "01";
//                               gg0170F1.value = "01";
//                               gg0170G1.value = "01";
//                               gg0170I1.value = "88";
//                               gg0170J1.value = "88";
//                               gg0170K1.value = "88";
//                               gg0170L1.value = "88";
//                               gg0170M1.value = "88";
//                               gg0170N1.value = "";
//                               gg0170O1.value = "";
//                               gg0170P1.value = "88";
//                               gg0170Q1.value = "1";
//                               gg0170R1.value = "01";
//                               gg0170RR1.value = "1";
//                               gg0170S1.value = "01";
//                               gg0170SS1.value = "1";

//                               m1800C3.checked = true;
//                               m1810D2.checked = true;
//                               m1820D3.checked = true;
//                               m1830B5.checked = true;
//                               m1840T3.checked = true;
//                               m1845T3.checked = true;
//                               m1850T3.checked = true;
//                               m1860A5.checked = true;

//                               weightBearing.checked = true;
//                               decreasedRom.checked = false;
//                               shuffling.checked = false;
//                               weakness.checked = true;
//                               noDeficits.checked = false;
//                             } else if (options.adls == "4") {
//                               gg0170A1.value = "01";
//                               gg0170B1.value = "01";
//                               gg0170C1.value = "01";
//                               gg0170D1.value = "88";
//                               gg0170E1.value = "88";
//                               gg0170F1.value = "88";
//                               gg0170G1.value = "88";
//                               gg0170I1.value = "88";
//                               gg0170J1.value = "88";
//                               gg0170K1.value = "88";
//                               gg0170L1.value = "88";
//                               gg0170M1.value = "88";
//                               gg0170N1.value = "06";
//                               gg0170O1.value = "06";
//                               gg0170P1.value = "88";
//                               gg0170Q1.value = "0";
//                               gg0170R1.value = "";
//                               gg0170RR1.value = "";
//                               gg0170S1.value = "";
//                               gg0170SS1.value = "";

//                               m1800C3.checked = true;
//                               m1810D3.checked = true;
//                               m1820D3.checked = true;
//                               m1830B6.checked = true;
//                               m1840T4.checked = true;
//                               m1845T3.checked = true;
//                               m1850T4.checked = true;
//                               m1860A6.checked = true;

//                               weightBearing.checked = false;
//                               decreasedRom.checked = true;
//                               shuffling.checked = false;
//                               weakness.checked = true;
//                               noDeficits.checked = false;
//                             }
//                           }

//                           iframe.contentDocument
//                             .getElementById("pageNum11")
//                             .click();
//                           var page11Interval = setInterval(() => {
//                             let m1870 = iframe.contentDocument.getElementById(
//                               "M1870_CRNT0_FEEDING"
//                             );

//                             if (m1870 != null) {
//                               let m1870F0 =
//                                 iframe.contentDocument.getElementById(
//                                   "M1870_CRNT0_FEEDING"
//                                 );
//                               let m1870F1 =
//                                 iframe.contentDocument.getElementById(
//                                   "M1870_CRNT1_FEEDING"
//                                 );
//                               let m1870F2 =
//                                 iframe.contentDocument.getElementById(
//                                   "M1870_CRNT2_FEEDING"
//                                 );
//                               let m1870F4 =
//                                 iframe.contentDocument.getElementById(
//                                   "M1870_CRNT4_FEEDING"
//                                 );

//                               let m2001Drug =
//                                 iframe.contentDocument.getElementById(
//                                   "M2001_DRUG_RGMN0_RVW"
//                                 );

//                               let m2020M0 =
//                                 iframe.contentDocument.getElementById(
//                                   "M2020_CRNT_MGMT_ORAL0_MDCTN"
//                                 );
//                               let m2020M1 =
//                                 iframe.contentDocument.getElementById(
//                                   "M2020_CRNT_MGMT_ORAL1_MDCTN"
//                                 );
//                               let m2020M3 =
//                                 iframe.contentDocument.getElementById(
//                                   "M2020_CRNT_MGMT_ORAL3_MDCTN"
//                                 );

//                               let noInjection =
//                                 iframe.contentDocument.getElementById(
//                                   "M2030_CRNT_MGMT_INJCTN4_MDCTN"
//                                 );
//                               let patPreMedYes =
//                                 iframe.contentDocument.getElementById(
//                                   "mem_PrescribedMedicationsyes_Rdo"
//                                 );
//                               let manageMedYes =
//                                 iframe.contentDocument.getElementById(
//                                   "mem_ManageMedicationsyes_Rdo"
//                                 );
//                               let currentPreNo =
//                                 iframe.contentDocument.getElementById(
//                                   "mem_CurrentPrescribedNo_Rdo"
//                                 );

//                               let medStorage =
//                                 iframe.contentDocument.getElementById(
//                                   "mem_Storage_Chk"
//                                 );
//                               let medDisp =
//                                 iframe.contentDocument.getElementById(
//                                   "mem_Disposal_Chk"
//                                 );
//                               let medExpir =
//                                 iframe.contentDocument.getElementById(
//                                   "mem_Expirationdates_Chk"
//                                 );

//                               m2001Drug.checked = true;
//                               m1870F0.checked = true;
//                               m2020M0.checked = true;
//                               noInjection.checked = true;
//                               patPreMedYes.checked = true;
//                               manageMedYes.checked = true;
//                               currentPreNo.checked = true;
//                               medStorage.checked = true;
//                               medDisp.checked = true;
//                               medExpir.checked = true;

//                               if (options.adls) {
//                                 if (options.adls == "1") {
//                                   m1870F1.checked = true;
//                                   m2020M0.checked = true;
//                                 } else if (options.adls == "2") {
//                                   m1870F1.checked = true;
//                                   m2020M1.checked = true;
//                                 } else if (options.adls == "3") {
//                                   m1870F1.checked = true;
//                                   m2020M1.checked = true;
//                                 } else if (options.adls == "4") {
//                                   m1870F2.checked = true;
//                                   m2020M3.checked = true;
//                                 }
//                               }

//                               if (options.diagnosis) {
//                                 if (options.diagnosis == "ogtube") {
//                                   m1870F4.checked = true;
//                                 }
//                               }

//                               iframe.contentDocument
//                                 .getElementById("pageNum12")
//                                 .click();

//                               var page12Interval = setInterval(() => {
//                                 let fSuperVisionNonAgency =
//                                   iframe.contentDocument.getElementById(
//                                     "M2102_CARE_TYPE_SRC_SPRVSN2"
//                                   );

//                                 if (fSuperVisionNonAgency != null) {
//                                   fSuperVisionNonAgency.checked = true;

//                                   iframe.contentDocument.getElementById(
//                                     "prc_PrimaryFinancial_Chk"
//                                   ).checked = true;
//                                   iframe.contentDocument.getElementById(
//                                     "prc_PrimaryADLs_Chk"
//                                   ).checked = true;
//                                   iframe.contentDocument.getElementById(
//                                     "prc_PrimaryMedica_Chk"
//                                   ).checked = true;
//                                   iframe.contentDocument.getElementById(
//                                     "prc_PrimaryHome_Chk"
//                                   ).checked = true;
//                                   iframe.contentDocument.getElementById(
//                                     "M2200_THER_NEED_NA_NO"
//                                   ).checked = true;

//                                   iframe.contentDocument.getElementById(
//                                     "ris_RiskAssessment3_Chk"
//                                   ).checked = true;
//                                   iframe.contentDocument.getElementById(
//                                     "ris_RiskAssessment5_Chk"
//                                   ).checked = true;
//                                   iframe.contentDocument.getElementById(
//                                     "ris_RiskAssessment7_Chk"
//                                   ).checked = true;
//                                   iframe.contentDocument.getElementById(
//                                     "ris_RiskAssessment9_Chk"
//                                   ).checked = true;
//                                   iframe.contentDocument.getElementById(
//                                     "M2200_THER_NEED_NA_NO"
//                                   ).checked = true;

//                                   iframe.contentDocument
//                                     .getElementById("pageNum13")
//                                     .click();

//                                   var page13Interval = setInterval(() => {
//                                     let page13 =
//                                       iframe.contentDocument.getElementById(
//                                         "ins_InstructMaterial1_Chk"
//                                       );

//                                     if (page13 != null) {
//                                       iframe.contentDocument.getElementById(
//                                         "ins_InstructMaterial1_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "ins_InstructMaterial9_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "ins_InstructMaterial13_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "ins_InstructMaterial2_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "ins_InstructMaterial8_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "ins_InstructMaterial10_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "ins_InstructMaterial3_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "ins_InstructMaterial5_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "ins_InstructMaterial11_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "ins_InstructMaterial15_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "ins_InstructMaterial4_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "ins_InstructMaterial6_Chk"
//                                       ).checked = true;

//                                       iframe.contentDocument.getElementById(
//                                         "care_PatientRepCare_Chk"
//                                       ).checked = true;

//                                       iframe.contentDocument.getElementById(
//                                         "care_Physician_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "care_CaseMgr_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "care_ClinicalSn_Chk"
//                                       ).checked = true;
//                                       iframe.contentDocument.getElementById(
//                                         "care_ChangesMade_Chk"
//                                       ).checked = true;

//                                       iframe.contentDocument
//                                         .getElementById("pageNum7")
//                                         .click();

//                                       var page7Interval = setInterval(() => {
//                                         let m1306 =
//                                           iframe.contentDocument.getElementById(
//                                             "M1306_UNHLD_STG2_PRSR_ULCR_0"
//                                           );
//                                         if (m1306 != null) {
//                                           m1306.checked = true;
//                                           iframe.contentDocument.getElementById(
//                                             "M1322_NBR_PRSULC_STG10"
//                                           ).checked = true;
//                                           iframe.contentDocument.getElementById(
//                                             "M1324_STG_PRBLM_ULCER5"
//                                           ).checked = true;
//                                           iframe.contentDocument.getElementById(
//                                             "M1330_STAS_ULCR_PRSNT0"
//                                           ).checked = true;
//                                           iframe.contentDocument.getElementById(
//                                             "M1340_SRGCL_WND_PRSNT0"
//                                           ).checked = true;

//                                           iframe.contentDocument
//                                             .getElementById("pageNum8")
//                                             .click();

//                                           var page8Interval = setInterval(
//                                             () => {
//                                               let resp =
//                                                 iframe.contentDocument.getElementById(
//                                                   "reh_Asthma_Chk"
//                                                 );
//                                               if (resp != null) {
//                                                 iframe.contentDocument.getElementById(
//                                                   "M1400_WHEN_DYSPNEIC1"
//                                                 ).checked = true;

//                                                 if (options.diagnosis) {
//                                                   if (
//                                                     options.diagnosis == "chf"
//                                                   ) {
//                                                     iframe.contentDocument.getElementById(
//                                                       "M1400_WHEN_DYSPNEIC3"
//                                                     ).checked = true;
//                                                   }
//                                                 }

//                                                 iframe.contentDocument.getElementById(
//                                                   "cah_Hypertension_Chk"
//                                                 ).checked = true;
//                                                 iframe.contentDocument.getElementById(
//                                                   "crd_NorHeartSnd_Chk"
//                                                 ).checked = true;
//                                                 iframe.contentDocument.getElementById(
//                                                   "crd_CapillaryRef_Chk"
//                                                 ).checked = true;
//                                                 iframe.contentDocument.getElementById(
//                                                   "crd_RefLess3_Rdo"
//                                                 ).checked = true;

//                                                 iframe.contentDocument.getElementById(
//                                                   "M1600_UTI0"
//                                                 ).checked = true;
//                                                 iframe.contentDocument.getElementById(
//                                                   "M1610_UR_INCONT0"
//                                                 ).checked = true;
//                                                 iframe.contentDocument.getElementById(
//                                                   "M1610_UR_INCONT2"
//                                                 ).checked = true;

//                                                 iframe.contentDocument.getElementById(
//                                                   "lbd_Formed_Chk"
//                                                 ).checked = true;
//                                                 iframe.contentDocument.getElementById(
//                                                   "lbd_Normal_Chk"
//                                                 ).checked = true;
//                                                 iframe.contentDocument.getElementById(
//                                                   "M1620_BWL0_INCONT"
//                                                 ).checked = true;
//                                                 iframe.contentDocument.getElementById(
//                                                   "M1630_OSTOMY0"
//                                                 ).checked = true;
//                                                 iframe.contentDocument.getElementById(
//                                                   "lbd_Formed_Chk"
//                                                 ).checked = true;

//                                                 clearInterval(page8Interval);
//                                                 clearInterval(page7Interval);
//                                                 clearInterval(page13Interval);
//                                                 clearInterval(page12Interval);
//                                                 clearInterval(page11Interval);
//                                                 clearInterval(page10Interval);
//                                                 clearInterval(cognitiveIntId);
//                                                 clearInterval(
//                                                   envSafetyInterval
//                                                 );

//                                                 clearInterval(intervalIdM1028);
//                                                 clearInterval(intervalId);
//                                                 location.reload();
//                                               }
//                                             },
//                                             500
//                                           );
//                                         }
//                                       }, 500);
//                                     }
//                                   }, 500);
//                                 }
//                               }, 500);
//                             }
//                           }, 500);
//                         }
//                       }, 500);
//                     }
//                   }, 500);
//                 }
//               }, 500);
//             }
//           }, 500);
//         }
//       }, 500);

//       // }
//     } else {
//       let currentPaymentSource = document.querySelector(
//         'input[name="value(M0150_CPAY_MCARE_HMO)"]'
//       );
//       currentPaymentSource.checked = true;
//       //callSubmitPage();
//     }
//   } else if (options.project == "project3") {
//     let currentPaymentSource = document.getElementById(
//       "M0150_CPAY_MCARE_HMO_key"
//     );
//     if (currentPaymentSource !== null) {
//       currentPaymentSource.checked = true;
//       const anchorTags = [...document.querySelectorAll(".pages a")].filter(
//         (a) => /\d/.test(a.textContent)
//       );
//       anchorTags[1].click();
//       let page2Interval = setInterval(() => {
//         let insuranceCard = document.getElementById("pti_InsCard_Chk_key");
//         if (insuranceCard != null) {
//           let pti_PtAddressConf_Chk_key = document.getElementById(
//             "pti_PtAddressConf_Chk_key"
//           );
//           insuranceCard.checked = true;

//           if (pti_PtAddressConf_Chk_key != null) {
//             pti_PtAddressConf_Chk_key.checked = true;
//           }

//           let A1110B_0 = document.getElementById("A1110B_0");
//           if (A1110B_0 != null) {
//             A1110B_0.checked = true;
//           }

//           let M0102_PHYSN_ORDRD_SOCROC_DT_NA_key = document.getElementById(
//             "M0102_PHYSN_ORDRD_SOCROC_DT_NA_key"
//           );
//           if (M0102_PHYSN_ORDRD_SOCROC_DT_NA_key != null) {
//             M0102_PHYSN_ORDRD_SOCROC_DT_NA_key.checked = true;
//           }

//           if (options.home == "assisted") {
//             let A1250C_key = document.getElementById("A1250C_key");
//             if (A1250C_key != null) {
//               A1250C_key.checked = true;
//             }
//           }
//           const anchorTags = [...document.querySelectorAll(".pages a")].filter(
//             (a) => /\d/.test(a.textContent)
//           );
//           anchorTags[3].click();
//           let page4Interval = setInterval(() => {
//             let M1100_PTNT_LVG_STUTN_11 = document.getElementById(
//               "M1100_PTNT_LVG_STUTN_11"
//             );
//             if (M1100_PTNT_LVG_STUTN_11 != null) {
//               if (options.home == "assisted") {
//                 M1100_PTNT_LVG_STUTN_11.checked = true;
//               }
//               let M2102_CARE_TYPE_SRC_SPRVSN2_0_02 = document.getElementById(
//                 "M2102_CARE_TYPE_SRC_SPRVSN2_0_02"
//               );
//               if (M2102_CARE_TYPE_SRC_SPRVSN2_0_02 != null) {
//                 M2102_CARE_TYPE_SRC_SPRVSN2_0_02.checked = true;
//               }

//               let prc_PrimaryADLs_Chk_key = document.getElementById(
//                 "prc_PrimaryADLs_Chk_key"
//               );
//               if (prc_PrimaryADLs_Chk_key != null) {
//                 prc_PrimaryADLs_Chk_key.checked = true;
//               }

//               let psy_PatientReady_Chk_key = document.getElementById(
//                 "psy_PatientReady_Chk_key"
//               );
//               if (psy_PatientReady_Chk_key != null) {
//                 psy_PatientReady_Chk_key.checked = true;
//               }

//               let psy_CaregiverReady_Chk_key = document.getElementById(
//                 "psy_CaregiverReady_Chk_key"
//               );
//               if (psy_CaregiverReady_Chk_key != null) {
//                 psy_CaregiverReady_Chk_key.checked = true;
//               }

//               let sah_NoHazardsIdentified_Chk_key = document.getElementById(
//                 "sah_NoHazardsIdentified_Chk_key"
//               );
//               if (sah_NoHazardsIdentified_Chk_key != null) {
//                 sah_NoHazardsIdentified_Chk_key.checked = true;
//               }

//               let Yes1p_1 = document.getElementById("Yes1p_1");
//               if (Yes1p_1 != null) {
//                 Yes1p_1.checked = true;
//               }

//               let Yes2p_1 = document.getElementById("Yes2p_1");
//               if (Yes2p_1 != null) {
//                 Yes2p_1.checked = true;
//               }

//               let Yes3p_1 = document.getElementById("Yes3p_1");
//               if (Yes3p_1 != null) {
//                 Yes3p_1.checked = true;
//               }

//               let Yes4p_1 = document.getElementById("Yes4p_1");
//               if (Yes4p_1 != null) {
//                 Yes4p_1.checked = true;
//               }

//               let Yes5p_1 = document.getElementById("Yes5p_1");
//               if (Yes5p_1 != null) {
//                 Yes5p_1.checked = true;
//               }

//               let Yes6p_1 = document.getElementById("Yes6p_1");
//               if (Yes6p_1 != null) {
//                 Yes6p_1.checked = true;
//               }

//               let emp_NaturalDisaster_Rdo_1 = document.getElementById(
//                 "emp_NaturalDisaster_Rdo_1"
//               );
//               if (emp_NaturalDisaster_Rdo_1 != null) {
//                 emp_NaturalDisaster_Rdo_1.checked = true;
//               }

//               if (options.precautions.includes("oxygen")) {
//                 let Yes7p_1 = document.getElementById("Yes7p_1");
//                 let emp_BackupOxygen_Rdo_1 = document.getElementById(
//                   "emp_BackupOxygen_Rdo_1"
//                 );
//                 if (Yes7p_1 != null) {
//                   Yes7p_1.checked = true;
//                 }
//                 if (emp_BackupOxygen_Rdo_1 != null) {
//                   emp_BackupOxygen_Rdo_1.checked = true;
//                 }
//               } else {
//                 let Yes7p_2 = document.getElementById("Yes7p_2");
//                 if (Yes7p_2 != null) {
//                   Yes7p_2.checked = true;
//                 }
//                 let emp_BackupOxygen_Rdo_2 = document.getElementById(
//                   "emp_BackupOxygen_Rdo_2"
//                 );
//                 if (emp_BackupOxygen_Rdo_2 != null) {
//                   emp_BackupOxygen_Rdo_2.checked = true;
//                 }
//               }

//               //Priority/Disaster Code:
//               // const item = document.querySelector(
//               //   '.choices__item[data-value="2"]'
//               // );
//               // if(item){

//               //   item.setAttribute("aria-selected", "true"); // Ensures the item is selected
//               //   item.setAttribute("data-value", "2"); // Ensures the value remains set
//               // }

//               //Safety Measures

//               if (options.adls == "1") {
//                 let eqc_Cane_Chk_key =
//                   document.getElementById("eqc_Cane_Chk_key");
//                 if (eqc_Cane_Chk_key != null) {
//                   eqc_Cane_Chk_key.checked = true;
//                 }
//               }
//               else if (options.adls == "2") {
//                 let eqc_Wheelchair_Chk_key = document.getElementById(
//                   "eqc_Wheelchair_Chk_key"
//                 );
//                 if (eqc_Wheelchair_Chk_key != null) {
//                   eqc_Wheelchair_Chk_key.checked = true;
//                 }
//               }
//               else if (options.adls == "3") {
//                 let eqc_Wheelchair_Chk_key = document.getElementById(
//                   "eqc_Wheelchair_Chk_key"
//                 );
//                 if (eqc_Wheelchair_Chk_key != null) {
//                   eqc_Wheelchair_Chk_key.checked = true;
//                 }
//               }
//               else if (options.adls == "4") {
//                 let eqc_Wheelchair_Chk_key = document.getElementById(
//                   "eqc_Wheelchair_Chk_key"
//                 );
//                 if (eqc_Wheelchair_Chk_key != null) {
//                   eqc_Wheelchair_Chk_key.checked = true;
//                 }
//               }
//               const anchorTags = [
//                 ...document.querySelectorAll(".pages a"),
//               ].filter((a) => /\d/.test(a.textContent));
//               anchorTags[4].click();
//               let page5Interval = setInterval(() => {
//                 let B0200_0 = document.getElementById("B0200_0");
//                 if (B0200_0 != null) {
//                   B0200_0.checked = true;

//                   let B1000_0 = document.getElementById("B1000_0");
//                   if (B1000_0 != null) {
//                     B1000_0.checked = true;
//                   }

//                   if (options.mental == "aaox4") {
//                     let B1300_2 = document.getElementById("B1300_2");
//                     if (B1300_2 != null) {
//                       B1300_2.checked = true;
//                     }
//                   }
//                   else if (options.mental == "forgetful") {
//                     let B1300_2 = document.getElementById("B1300_2");
//                     if (B1300_2 != null) {
//                       B1300_2.checked = true;
//                     }
//                   }
//                   else if (options.mental == "unable") {
//                     let B1300_8 = document.getElementById("B1300_8");
//                     if (B1300_8 != null) {
//                       B1300_8.checked = true;
//                     }
//                   }
//                   const anchorTags = [
//                     ...document.querySelectorAll(".pages a"),
//                   ].filter((a) => /\d/.test(a.textContent));
//                   anchorTags[5].click();
//                   let page6Interval = setInterval(() => {
//                     let C0100_0 = document.getElementById("C0100_0");
//                     if (C0100_0 != null) {
//                       if (options.mental == "unable") {
//                         C0100_0.checked = true;
//                       }
//                       else if (options.mental == "aaox4") {
//                         let C0200_3 = document.getElementById("C0200_3");
//                         if (C0200_3 != null) {
//                           C0200_3.checked = true;
//                         }

//                         let C0100_1 = document.getElementById("C0100_1");
//                         if (C0100_1 != null) {
//                           C0100_1.checked = true;
//                         }

//                         let C0300A_3 = document.getElementById("C0300A_3");
//                         if (C0300A_3 != null) {
//                           C0300A_3.checked = true;
//                         }

//                         let C0300B_2 = document.getElementById("C0300B_2");
//                         if (C0300B_2 != null) {
//                           C0300B_2.checked = true;
//                         }

//                         let C0300C_1 = document.getElementById("C0300C_1");
//                         if (C0300C_1 != null) {
//                           C0300C_1.checked = true;
//                         }

//                         let C0400A_2 = document.getElementById("C0400A_2");
//                         if (C0400A_2 != null) {
//                           C0400A_2.checked = true;
//                         }

//                         let C0400B_2 = document.getElementById("C0400B_2");
//                         if (C0400B_2 != null) {
//                           C0400B_2.checked = true;
//                         }

//                         let C0400C_2 = document.getElementById("C0400C_2");
//                         if (C0400C_2 != null) {
//                           C0400C_2.checked = true;
//                         }
//                       }
//                       else if (options.mental == "forgetful") {
//                         let C0100_1 = document.getElementById("C0100_1");
//                         if (C0100_1 != null) {
//                           C0100_1.checked = true;
//                         }

//                         let C0200_2 = document.getElementById("C0200_2");
//                         if (C0200_2 != null) {
//                           C0200_2.checked = true;
//                         }

//                         let C0300A_2 = document.getElementById("C0300A_2");
//                         if (C0300A_2 != null) {
//                           C0300A_2.checked = true;
//                         }

//                         let C0300B_1 = document.getElementById("C0300B_1");
//                         if (C0300B_1 != null) {
//                           C0300B_1.checked = true;
//                         }

//                         let C0300C_0 = document.getElementById("C0300C_0");
//                         if (C0300C_0 != null) {
//                           C0300C_0.checked = true;
//                         }

//                         let C0400A_1 = document.getElementById("C0400A_1");
//                         if (C0400A_1 != null) {
//                           C0400A_1.checked = true;
//                         }

//                         let C0400B_1 = document.getElementById("C0400B_1");
//                         if (C0400B_1 != null) {
//                           C0400B_1.checked = true;
//                         }

//                         let C0400C_1 = document.getElementById("C0400C_1");
//                         if (C0400C_1 != null) {
//                           C0400C_1.checked = true;
//                         }
//                       }

//                       const anchorTags = [
//                         ...document.querySelectorAll(".pages a"),
//                       ].filter((a) => /\d/.test(a.textContent));
//                       anchorTags[6].click();
//                       let page7Interval = setInterval(() => {
//                         //History of

//                         let neh_MemoryLoss_Chk_key = document.getElementById(
//                           "neh_MemoryLoss_Chk_key"
//                         );
//                         let neh_Dementia_Chk_key = document.getElementById(
//                           "neh_Dementia_Chk_key"
//                         );
//                         let neh_Parkinson_Chk_key = document.getElementById(
//                           "neh_Parkinson_Chk_key"
//                         );
//                         let neh_HistoryMs_Chk_key = document.getElementById(
//                           "neh_HistoryMs_Chk_key"
//                         );
//                         let neh_Seizures_Chk_key = document.getElementById(
//                           "neh_Seizures_Chk_key"
//                         );
//                         let neh_HistoryTia_Chk_key = document.getElementById(
//                           "neh_HistoryTia_Chk_key"
//                         );
//                         let neh_Traumatic_Chk_key = document.getElementById(
//                           "neh_Traumatic_Chk_key"
//                         );
//                         let neh_Psychiatric_Chk_key = document.getElementById(
//                           "neh_Psychiatric_Chk_key"
//                         );
//                         let neh_Stroke_Chk_key =
//                           document.getElementById("neh_Stroke_Chk_key");
//                         let neh_HisOther_Chk_key = document.getElementById(
//                           "neh_HisOther_Chk_key"
//                         );
//                         let neh_NoHistory_Chk_key = document.getElementById(
//                           "neh_NoHistory_Chk_key"
//                         );
//                         let neu_Pupillary_Chk_key=document.getElementById("neu_Pupillary_Chk_key")
//                         let neu_Loss_Chk_key=document.getElementById("neu_Loss_Chk_key")
//                         let neu_Dizzy_Chk_key=document.getElementById("neu_Dizzy_Chk_key")
//                         let neu_Spasms_Chk_key=document.getElementById("neu_Spasms_Chk_key")
//                         let neu_Forgetful_Chk_key=document.getElementById("neu_Forgetful_Chk_key")
//                         let neu_Tremors_Chk_key=document.getElementById("neu_Tremors_Chk_key")
//                         let neu_Slurred_Chk_key=document.getElementById("neu_Slurred_Chk_key")
//                         let neu_Cognition_Chk_key=document.getElementById("neu_Cognition_Chk_key")
//                         let neu_Numbness_Chk_key=document.getElementById("neu_Numbness_Chk_key")
//                         let neu_Facial_Chk_key=document.getElementById("neu_Facial_Chk_key")
//                         let neu_Speech_Chk_key=document.getElementById("neu_Speech_Chk_key")
//                         let neu_Mood_Chk_key=document.getElementById("neu_Mood_Chk_key")
//                         let neu_Headache_Chk_key=document.getElementById("neu_Headache_Chk_key")
//                         let neu_Weakness_Chk_key=document.getElementById("neu_Weakness_Chk_key")
//                         let neu_WeaknessR_Chk_key=document.getElementById("neu_WeaknessR_Chk_key")
//                         let neu_WeaknessL_Chk_key=document.getElementById("neu_WeaknessL_Chk_key")
//                         let neu_HandR_Chk_key=document.getElementById("neu_HandR_Chk_key")
//                         let neu_HandL_Chk_key=document.getElementById("neu_HandL_Chk_key")
//                         let neu_Strong_Chk_key=document.getElementById("neu_Strong_Chk_key")
//                         let neu_Weak_Chk_key=document.getElementById("neu_Weak_Chk_key")
//                         let neu_Equal_Chk_key=document.getElementById("neu_Equal_Chk_key")
//                         let neu_Unequal_Chk_key=document.getElementById("neu_Unequal_Chk_key")
//                         let neu_Other_Chk_key=document.getElementById("neu_Other_Chk_key")
//                         let neu_Deficit_Chk_key=document.getElementById("neu_Deficit_Chk_key")
//                         let emh_Oriented_Chk_key=document.getElementById("emh_Oriented_Chk_key")
//                         let bhe_NeuPerson_Chk_key=document.getElementById("bhe_NeuPerson_Chk_key")
//                         let bhe_NeuPlce_Chk_key=document.getElementById("bhe_NeuPlce_Chk_key")
//                         let bhe_NeuTime_Chk_key=document.getElementById("bhe_NeuTime_Chk_key")
//                         let bhe_NeuSituation_Chk_key=document.getElementById("bhe_NeuSituation_Chk_key")
//                         let emh_Alert_Chk_key=document.getElementById("emh_Alert_Chk_key")
//                         let emh_Disoriented_Chk_key=document.getElementById("emh_Disoriented_Chk_key")
//                         let emh_Confused_Chk_key=document.getElementById("emh_Confused_Chk_key")
//                         let emh_Agitated_Chk_key=document.getElementById("emh_Agitated_Chk_key")
//                         let emh_Depressed_Chk_key=document.getElementById("emh_Depressed_Chk_key")
//                         let emh_Other_Chk_key=document.getElementById("emh_Other_Chk_key")

//                         if (neh_MemoryLoss_Chk_key != null) {
//                           if (options.mental == "forgetful") {
//                             neh_MemoryLoss_Chk_key.checked = true;

//                             neh_Dementia_Chk_key.checked=false
//                             neh_Parkinson_Chk_key.checked=false
//                             neh_NoHistory_Chk_key.checked=false
//                             neh_HisOther_Chk_key.checked=false
//                             neh_Stroke_Chk_key.checked=false
//                             neh_Psychiatric_Chk_key.checked=false
//                             neh_Traumatic_Chk_key.checked=false
//                             neh_HistoryTia_Chk_key.checked=false
//                             neh_Seizures_Chk_key.checked=false
//                             neh_HistoryMs_Chk_key.checked=false
//                             neu_Pupillary_Chk_key.checked=false
//                             neu_Loss_Chk_key.checked=false
//                             neu_Dizzy_Chk_key.checked=false
//                             neu_Spasms_Chk_key.checked=false
//                             neu_Forgetful_Chk_key.checked=false
//                             neu_Tremors_Chk_key.checked=false
//                             neu_Slurred_Chk_key.checked=false
//                             neu_Cognition_Chk_key.checked=false
//                             neu_Numbness_Chk_key.checked=false
//                             neu_Facial_Chk_key.checked=false
//                             neu_Speech_Chk_key.checked=false
//                             neu_Mood_Chk_key.checked=false
//                             neu_Headache_Chk_key.checked=false
//                             neu_Weakness_Chk_key.checked=false
//                             neu_WeaknessR_Chk_key.checked=false
//                             neu_WeaknessL_Chk_key.checked=false
//                             neu_HandR_Chk_key.checked=false
//                             neu_HandL_Chk_key.checked=false
//                             neu_Strong_Chk_key.checked=false
//                             neu_Weak_Chk_key.checked=false
//                             neu_Equal_Chk_key.checked=false
//                             neu_Unequal_Chk_key.checked=false
//                             neu_Other_Chk_key.checked=false
//                             neu_Deficit_Chk_key.checked=false
//                             emh_Oriented_Chk_key.checked=false
//                             bhe_NeuPerson_Chk_key.checked=false
//                             bhe_NeuPlce_Chk_key.checked=false
//                             bhe_NeuTime_Chk_key.checked=false
//                             bhe_NeuSituation_Chk_key.checked=false
//                             emh_Alert_Chk_key.checked=false
//                             emh_Disoriented_Chk_key.checked=false
//                             emh_Confused_Chk_key.checked=false
//                             emh_Agitated_Chk_key.checked=false
//                             emh_Depressed_Chk_key.checked=false
//                             emh_Other_Chk_key.checked=false

//                             var M1700_COG_FUNCTION_1 = document.getElementById(
//                               "M1700_COG_FUNCTION_1"
//                             );
//                             if (M1700_COG_FUNCTION_1 != null) {
//                               M1700_COG_FUNCTION_1.checked = true;
//                             }

//                             var M1710_WHEN_CONFUSED_2 = document.getElementById(
//                               "M1710_WHEN_CONFUSED_2"
//                             );
//                             if (M1710_WHEN_CONFUSED_2 != null) {
//                               M1710_WHEN_CONFUSED_2.checked = true;
//                             }

//                             let C1310A_0 = document.getElementById("C1310A_0");
//                             if (C1310A_0 != null) {
//                               C1310A_0.checked = true;
//                             }

//                             let C1310B_0 = document.getElementById("C1310B_0");
//                             if (C1310B_0 != null) {
//                               C1310B_0.checked = true;
//                             }

//                             let C1310C_2 = document.getElementById("C1310C_2");
//                             if (C1310C_2 != null) {
//                               C1310C_2.checked = true;
//                             }

//                             let C1310D_0 = document.getElementById("C1310D_0");
//                             if (C1310D_0 != null) {
//                               C1310D_0.checked = true;
//                             }

//                              if (M1700_COG_FUNCTION_1 != null) {
//                               M1700_COG_FUNCTION_1.checked = true;
//                             }

//                             if (M1710_WHEN_CONFUSED_2 != null) {
//                               M1710_WHEN_CONFUSED_2.checked = true;
//                             }
//                             let M1720_WHEN_ANXIOUS_0 = document.getElementById(
//                               "M1720_WHEN_ANXIOUS_0"
//                             );
//                             if (M1720_WHEN_ANXIOUS_0 != null) {
//                               M1720_WHEN_ANXIOUS_0.checked = true;
//                             }
//                           }
//                           if (options.mental == "aaox4") {
//                             neh_NoHistory_Chk_key.checked = false;

//                             var M1700_COG_FUNCTION_0 = document.getElementById(
//                               "M1700_COG_FUNCTION_0"
//                             );
//                             if (M1700_COG_FUNCTION_0 != null) {
//                               M1700_COG_FUNCTION_0.checked = true;
//                             }

//                             var M1710_WHEN_CONFUSED_0 = document.getElementById(
//                               "M1710_WHEN_CONFUSED_0"
//                             );
//                             if (M1710_WHEN_CONFUSED_0 != null) {
//                               M1710_WHEN_CONFUSED_0.checked = true;
//                             }

//                             let M1720_WHEN_ANXIOUS_0 = document.getElementById(
//                               "M1720_WHEN_ANXIOUS_0"
//                             );
//                             if (M1720_WHEN_ANXIOUS_0 != null) {
//                               M1720_WHEN_ANXIOUS_0.checked = true;
//                             }

//                             let C1310A_0 = document.getElementById("C1310A_0");
//                             if (C1310A_0 != null) {
//                               C1310A_0.checked = true;
//                             }

//                             let C1310B_0 = document.getElementById("C1310B_0");
//                             if (C1310B_0 != null) {
//                               C1310B_0.checked = true;
//                             }

//                             let C1310C_0 = document.getElementById("C1310C_0");
//                             if (C1310C_0 != null) {
//                               C1310C_0.checked = true;
//                             }

//                             let C1310D_0 = document.getElementById("C1310D_0");
//                             if (C1310D_0 != null) {
//                               C1310D_0.checked = true;
//                             }

//                             if (M1700_COG_FUNCTION_0 != null) {
//                               M1700_COG_FUNCTION_0.checked = true;
//                             }

//                             if (M1710_WHEN_CONFUSED_0 != null) {
//                               M1710_WHEN_CONFUSED_0.checked = true;
//                             }

//                             if (M1720_WHEN_ANXIOUS_0 != null) {
//                               M1720_WHEN_ANXIOUS_0.checked = true;
//                             }
//                           }
//                           if (options.mental == "unable") {
//                             let C1310A_0 = document.getElementById("C1310A_0");
//                             if (C1310A_0 != null) {
//                               C1310A_0.checked = true;
//                             }

//                             let C1310B_1 = document.getElementById("C1310B_1");
//                             if (C1310B_1 != null) {
//                               C1310B_1.checked = true;
//                             }

//                             let C1310C_1 = document.getElementById("C1310C_1");
//                             if (C1310C_1 != null) {
//                               C1310C_1.checked = true;
//                             }

//                             let C1310D_0 = document.getElementById("C1310D_0");
//                             if (C1310D_0 != null) {
//                               C1310D_0.checked = true;
//                             }

//                             let M1700_COG_FUNCTION_3 = document.getElementById(
//                               "M1700_COG_FUNCTION_3"
//                             );
//                             if (M1700_COG_FUNCTION_3 != null) {
//                               M1700_COG_FUNCTION_3.checked = true;
//                             }
//                           }

//                           //MOOD

//                           let M1740_BD_MEM_DEFICIT_key =
//                             document.getElementById("M1740_BD_MEM_DEFICIT_key");
//                           let M1740_BD_IMP_DECISN_key = document.getElementById(
//                             "M1740_BD_IMP_DECISN_key"
//                           );
//                           let M1740_BD_VERBAL_key = document.getElementById(
//                             "M1740_BD_VERBAL_key"
//                           );
//                           let M1740_BD_PHYSICAL_key = document.getElementById(
//                             "M1740_BD_PHYSICAL_key"
//                           );
//                           let M1740_BD_SOC_INAPPRO_key =
//                             document.getElementById("M1740_BD_SOC_INAPPRO_key");
//                           let M1740_BD_DELUSIONS_key = document.getElementById(
//                             "M1740_BD_DELUSIONS_key"
//                           );
//                           let M1740_BD_NONE_key =
//                             document.getElementById("M1740_BD_NONE_key");

//                           if (options.mental == "unable") {
//                             if (M1740_BD_MEM_DEFICIT_key != null) {
//                               M1740_BD_MEM_DEFICIT_key.checked = true;
//                               M1740_BD_IMP_DECISN_key.checked = true;
//                               M1740_BD_VERBAL_key.checked = false;
//                               M1740_BD_PHYSICAL_key.checked = false;
//                               M1740_BD_SOC_INAPPRO_key.checked = false;
//                               M1740_BD_DELUSIONS_key.checked = false;
//                               M1740_BD_NONE_key.checked = false;
//                             }
//                           }

//                           if (options.mental == "forgetful") {
//                             M1740_BD_MEM_DEFICIT_key.checked = true;
//                             M1740_BD_IMP_DECISN_key.checked = true;
//                             M1740_BD_VERBAL_key.checked = false;
//                             M1740_BD_PHYSICAL_key.checked = false;
//                             M1740_BD_SOC_INAPPRO_key.checked = false;
//                             M1740_BD_DELUSIONS_key.checked = false;
//                             M1740_BD_NONE_key.checked = false;
//                           }

//                           if (options.mental == "aaoo4") {
//                             M1740_BD_MEM_DEFICIT_key.checked = false;
//                             M1740_BD_IMP_DECISN_key.checked = false;
//                             M1740_BD_VERBAL_key.checked = false;
//                             M1740_BD_PHYSICAL_key.checked = false;
//                             M1740_BD_SOC_INAPPRO_key.checked = false;
//                             M1740_BD_DELUSIONS_key.checked = false;
//                             M1740_BD_NONE_key.checked = true;
//                           }

//                           let M1745_BEH_PROB_FREQ_0 = document.getElementById(
//                             "M1745_BEH_PROB_FREQ_0"
//                           );
//                           if (M1745_BEH_PROB_FREQ_0 != null) {
//                             M1745_BEH_PROB_FREQ_0.checked = true;
//                           }

//                           let rif_Smoking_Chk_key = document.getElementById(
//                             "rif_Smoking_Chk_key"
//                           );
//                           let rif_Obesity_Chk_key = document.getElementById(
//                             "rif_Obesity_Chk_key"
//                           );
//                           let rif_Alcohol_Chk_key = document.getElementById(
//                             "rif_Alcohol_Chk_key"
//                           );
//                           let rif_Drug_Chk_key =
//                             document.getElementById("rif_Drug_Chk_key");
//                           let rif_Unknown_Chk_key = document.getElementById(
//                             "rif_Unknown_Chk_key"
//                           );
//                           let rif_Noneabove_Chk_key = document.getElementById(
//                             "rif_Noneabove_Chk_key"
//                           );

//                           if (rif_Smoking_Chk_key != null) {
//                             rif_Noneabove_Chk_key.checked = true;
//                             rif_Unknown_Chk_key.checked = false;
//                             rif_Drug_Chk_key.checked = false;
//                             rif_Alcohol_Chk_key.checked = false;
//                             rif_Obesity_Chk_key.checked = false;
//                           }

//                           let eane_Noneobserved_Chk_key =
//                             document.getElementById(
//                               "eane_Noneobserved_Chk_key"
//                             );
//                           let eane_Actual_Chk_key = document.getElementById(
//                             "eane_Actual_Chk_key"
//                           );
//                           let eane_Potential_Chk_key = document.getElementById(
//                             "eane_Potential_Chk_key"
//                           );
//                           let eane_Verbal_Chk_key = document.getElementById(
//                             "eane_Verbal_Chk_key"
//                           );
//                           let eane_Physical_Chk_key = document.getElementById(
//                             "eane_Physical_Chk_key"
//                           );
//                           let eane_Financial_Chk_key = document.getElementById(
//                             "eane_Financial_Chk_key"
//                           );

//                           if (eane_Noneobserved_Chk_key != null) {
//                             eane_Noneobserved_Chk_key.checked = true;
//                             eane_Actual_Chk_key.checked = false;
//                             eane_Potential_Chk_key.checked = false;
//                             eane_Verbal_Chk_key.checked = false;
//                             eane_Physical_Chk_key.checked = false;
//                             eane_Financial_Chk_key.checked = false;
//                           }

//                           //MentalPsychosocialCognitiveStatus

//                           const anchorTags = [
//                             ...document.querySelectorAll(".pages a"),
//                           ].filter((a) => /\d/.test(a.textContent));
//                           anchorTags[7].click();

//                           let page8Interval = setInterval(() => {
//                             let M1400_WHEN_DYSPNEIC_0 = document.getElementById(
//                               "M1400_WHEN_DYSPNEIC_0"
//                             );
//                             if (M1400_WHEN_DYSPNEIC_0 != null) {
//                               M1400_WHEN_DYSPNEIC_0.checked = true;

//                               if (options.diagnosis == "chf") {
//                                 let M1400_WHEN_DYSPNEIC_2 =
//                                   document.getElementById(
//                                     "M1400_WHEN_DYSPNEIC_2"
//                                   );
//                                 if (M1400_WHEN_DYSPNEIC_2 != null) {
//                                   M1400_WHEN_DYSPNEIC_2.checked = true;
//                                 }
//                               }

//                               let cah_HeartFailure_Chk_key =
//                                 document.getElementById(
//                                   "cah_HeartFailure_Chk_key"
//                                 );
//                               let cah_Angina_Chk_key =
//                                 document.getElementById("cah_Angina_Chk_key");
//                               let cah_Bradycardia_Chk_key =
//                                 document.getElementById(
//                                   "cah_Bradycardia_Chk_key"
//                                 );
//                               let cah_Hypotension_Chk_key =
//                                 document.getElementById(
//                                   "cah_Hypotension_Chk_key"
//                                 );
//                               let cah_Hypertension_Chk_key =
//                                 document.getElementById(
//                                   "cah_Hypertension_Chk_key"
//                                 );
//                               let cah_AtrialFib_Chk_key =
//                                 document.getElementById(
//                                   "cah_AtrialFib_Chk_key"
//                                 );
//                               let cah_Pacemaker_Chk_key =
//                                 document.getElementById(
//                                   "cah_Pacemaker_Chk_key"
//                                 );
//                               let cah_Tachycardia_Chk_key =
//                                 document.getElementById(
//                                   "cah_Tachycardia_Chk_key"
//                                 );
//                               let cah_Implanted_Chk_key =
//                                 document.getElementById(
//                                   "cah_Implanted_Chk_key"
//                                 );
//                               let cah_Stent_Chk_key =
//                                 document.getElementById("cah_Stent_Chk_key");
//                               let cah_Pad_Chk_key =
//                                 document.getElementById("cah_Pad_Chk_key");
//                               let cah_Palpitations_Chk_key =
//                                 document.getElementById(
//                                   "cah_Palpitations_Chk_key"
//                                 );
//                               let cah_NoHistory_Chk_key =
//                                 document.getElementById(
//                                   "cah_NoHistory_Chk_key"
//                                 );
//                               let crd_NorHeartSnd_Chk_key =
//                                 document.getElementById(
//                                   "crd_NorHeartSnd_Chk_key"
//                                 );
//                               let crd_AbnorHeartSnd_Chk_key =
//                                 document.getElementById(
//                                   "crd_AbnorHeartSnd_Chk_key"
//                                 );
//                               let crd_ChestPain_Chk_key =
//                                 document.getElementById(
//                                   "crd_ChestPain_Chk_key"
//                                 );
//                               let crd_Vertigo_Chk_key = document.getElementById(
//                                 "crd_Vertigo_Chk_key"
//                               );
//                               let crd_NeckVeinDisten_Chk_key =
//                                 document.getElementById(
//                                   "crd_NeckVeinDisten_Chk_key"
//                                 );
//                               let crd_Diaphoresis_Chk_key =
//                                 document.getElementById(
//                                   "crd_Diaphoresis_Chk_key"
//                                 );
//                               let crd_Fatigues_Chk_key =
//                                 document.getElementById("crd_Fatigues_Chk_key");
//                               let crd_Arrhythmia_Chk_key =
//                                 document.getElementById(
//                                   "crd_Arrhythmia_Chk_key"
//                                 );
//                               let crd_CapillaryRef_Chk_key =
//                                 document.getElementById(
//                                   "crd_CapillaryRef_Chk_key"
//                                 );
//                               let crd_CompresStock_Chk_key =
//                                 document.getElementById(
//                                   "crd_CompresStock_Chk_key"
//                                 );
//                               let crd_PedalPulse_Chk_key =
//                                 document.getElementById(
//                                   "crd_PedalPulse_Chk_key"
//                                 );
//                               let crd_Edema_Chk_key =
//                                 document.getElementById("crd_Edema_Chk_key");
//                               let crd_EdemaPedal_Chk_key =
//                                 document.getElementById(
//                                   "crd_EdemaPedal_Chk_key"
//                                 );
//                               let crd_EdemaR_Chk_key =
//                                 document.getElementById("crd_EdemaR_Chk_key");
//                               let crd_EdemaL_Chk_key =
//                                 document.getElementById("crd_EdemaL_Chk_key");
//                               let crd_EdemaDepend_Chk_key =
//                                 document.getElementById(
//                                   "crd_EdemaDepend_Chk_key"
//                                 );
//                               let crd_NonPit_Chk_key =
//                                 document.getElementById("crd_NonPit_Chk_key");
//                               let crd_RightAnkle_Chk_key =
//                                 document.getElementById(
//                                   "crd_RightAnkle_Chk_key"
//                                 );
//                               let crd_RightCalf_Chk_key =
//                                 document.getElementById(
//                                   "crd_RightCalf_Chk_key"
//                                 );
//                               let crd_LeftAnkle_Chk_key =
//                                 document.getElementById(
//                                   "crd_LeftAnkle_Chk_key"
//                                 );
//                               let crd_LeftCalf_Chk_key =
//                                 document.getElementById("crd_LeftCalf_Chk_key");
//                               let crd_Other_Chk_key =
//                                 document.getElementById("crd_Other_Chk_key");

//                               let crd_CapillaryRef_Rdo_1 =
//                                 document.getElementById(
//                                   "crd_CapillaryRef_Rdo_1"
//                                 );
//                               if (cah_HeartFailure_Chk_key != null) {
//                                 cah_Hypertension_Chk_key.checked = true;
//                                 crd_NorHeartSnd_Chk_key.checked = true;
//                                 crd_CapillaryRef_Chk_key.checked = true;
//                                 crd_CapillaryRef_Rdo_1.checked = true;
//                                 crd_Other_Chk_key.checked = false;
//                                 crd_LeftCalf_Chk_key.checked = false;
//                                 crd_LeftAnkle_Chk_key.checked = false;
//                                 crd_RightCalf_Chk_key.checked = false;
//                                 crd_RightAnkle_Chk_key.checked = false;
//                                 crd_NonPit_Chk_key.checked = false;
//                                 crd_EdemaDepend_Chk_key.checked = false;
//                                 crd_EdemaL_Chk_key.checked = false;
//                                 crd_EdemaR_Chk_key.checked = false;
//                                 crd_EdemaPedal_Chk_key.checked = false;
//                                 crd_Edema_Chk_key.checked = false;
//                                 crd_PedalPulse_Chk_key.checked = false;
//                                 crd_CompresStock_Chk_key.checked = false;
//                                 crd_Arrhythmia_Chk_key.checked = false;
//                                 crd_Fatigues_Chk_key.checked = false;
//                                 crd_Diaphoresis_Chk_key.checked = false;
//                                 crd_NeckVeinDisten_Chk_key.checked = false;
//                                 crd_Vertigo_Chk_key.checked = false;
//                                 crd_ChestPain_Chk_key.checked = false;
//                                 crd_AbnorHeartSnd_Chk_key.checked = false;
//                                 cah_NoHistory_Chk_key.checked = false;
//                                 cah_Palpitations_Chk_key.checked = false;
//                                 cah_Pad_Chk_key.checked = false;
//                                 cah_Tachycardia_Chk_key.checked = false;
//                                 cah_Implanted_Chk_key.checked = false;
//                                 cah_Stent_Chk_key.checked = false;
//                                 cah_Pacemaker_Chk_key.checked = false;
//                                 cah_AtrialFib_Chk_key.checked = false;
//                                 cah_Hypotension_Chk_key.checked = false;
//                                 cah_Angina_Chk_key.checked = false;
//                                 cah_Bradycardia_Chk_key.checked = false;
//                               }

//                               let M1600_UTI_0 =
//                                 document.getElementById("M1600_UTI_0");
//                               if (M1600_UTI_0 != null) {
//                                 M1600_UTI_0.checked = true;
//                               }

//                               let M1610_UR_INCONT_0 =
//                                 document.getElementById("M1610_UR_INCONT_0");
//                               if (M1610_UR_INCONT_0 != null) {
//                                 M1610_UR_INCONT_0.checked = true;
//                               }

//                               let lbd_Soft_Chk_key =
//                                 document.getElementById("lbd_Soft_Chk_key");
//                               let lbd_Formed_Chk_key =
//                                 document.getElementById("lbd_Formed_Chk_key");
//                               let lbd_Hard_Chk_key =
//                                 document.getElementById("lbd_Hard_Chk_key");
//                               let lbd_Mucous_Chk_key =
//                                 document.getElementById("lbd_Mucous_Chk_key");
//                               let lbd_Other_Chk_key =
//                                 document.getElementById("lbd_Other_Chk_key");
//                               let lbd_Incontinence_Chk_key =
//                                 document.getElementById(
//                                   "lbd_Incontinence_Chk_key"
//                                 );
//                               let lbd_Vomiting_Chk_key =
//                                 document.getElementById("lbd_Vomiting_Chk_key");
//                               let lbd_Placement_Chk_key =
//                                 document.getElementById(
//                                   "lbd_Placement_Chk_key"
//                                 );
//                               let lbd_Abdominal_Chk_key =
//                                 document.getElementById(
//                                   "lbd_Abdominal_Chk_key"
//                                 );
//                               let lbd_Residual_Chk_key =
//                                 document.getElementById("lbd_Residual_Chk_key");
//                               let lbd_Stoma_Chk_key =
//                                 document.getElementById("lbd_Stoma_Chk_key");
//                               let lbd_Pink_Chk_key =
//                                 document.getElementById("lbd_Pink_Chk_key");
//                               let lbd_Red_Chk_key =
//                                 document.getElementById("lbd_Red_Chk_key");
//                               let lbd_Moist_Chk_key =
//                                 document.getElementById("lbd_Red_Chk_key");
//                               let lbd_SelfCare_Chk_key =
//                                 document.getElementById("lbd_SelfCare_Chk_key");
//                               let lbd_NeedsAssis_Chk_key =
//                                 document.getElementById(
//                                   "lbd_NeedsAssis_Chk_key"
//                                 );
//                               let lbd_Constipation_Chk_key =
//                                 document.getElementById(
//                                   "lbd_Constipation_Chk_key"
//                                 );
//                               let lbd_Diarrhea_Chk_key =
//                                 document.getElementById("lbd_Diarrhea_Chk_key");
//                               let lbd_Indigestion_Chk_key =
//                                 document.getElementById(
//                                   "lbd_Indigestion_Chk_key"
//                                 );
//                               let lbd_Nausea_Chk_key =
//                                 document.getElementById("lbd_Nausea_Chk_key");
//                               let lbd_Enternal_Chk_key =
//                                 document.getElementById("lbd_Enternal_Chk_key");
//                               let lbd_Ostomy_Chk_key =
//                                 document.getElementById("lbd_Ostomy_Chk_key");
//                               let lbd_Colostomy_Chk_key =
//                                 document.getElementById(
//                                   "lbd_Colostomy_Chk_key"
//                                 );
//                               let lbd_Ileostomy_Chk_key =
//                                 document.getElementById(
//                                   "lbd_Ileostomy_Chk_key"
//                                 );
//                               let lbd_Urostomy_Chk_key =
//                                 document.getElementById("lbd_Urostomy_Chk_key");
//                               let lbd_OstomyOther_Chk_key =
//                                 document.getElementById(
//                                   "lbd_OstomyOther_Chk_key"
//                                 );
//                               if (lbd_Formed_Chk_key != null) {
//                                 lbd_Formed_Chk_key.checked = true;
//                                 lbd_Soft_Chk_key.checked = false;
//                                 lbd_Hard_Chk_key.checked = false;
//                                 lbd_Mucous_Chk_key.checked = false;
//                                 lbd_Other_Chk_key.checked = false;
//                                 lbd_Incontinence_Chk_key.checked = false;
//                                 lbd_Vomiting_Chk_key.checked = false;
//                                 lbd_Abdominal_Chk_key.checked = false;
//                                 lbd_Placement_Chk_key.checked = false;
//                                 lbd_Residual_Chk_key.checked = false;
//                                 lbd_Stoma_Chk_key.checked = false;
//                                 lbd_Pink_Chk_key.checked = false;
//                                 lbd_Red_Chk_key.checked = false;
//                                 lbd_Moist_Chk_key.checked = false;
//                                 lbd_SelfCare_Chk_key.checked = false;
//                                 lbd_NeedsAssis_Chk_key.checked = false;
//                                 lbd_Constipation_Chk_key.checked = false;
//                                 lbd_Diarrhea_Chk_key.checked = false;
//                                 lbd_Indigestion_Chk_key.checked = false;
//                                 lbd_Nausea_Chk_key.checked = false;
//                                 lbd_Enternal_Chk_key.checked = false;
//                                 lbd_Ostomy_Chk_key.checked = false;
//                                 lbd_Colostomy_Chk_key.checked = false;
//                                 lbd_Ileostomy_Chk_key.checked = false;
//                                 lbd_Urostomy_Chk_key.checked = false;
//                                 lbd_OstomyOther_Chk_key.checked = false;
//                               }

//                               let lbd_Normal_Chk_key =
//                                 document.getElementById("lbd_Normal_Chk_key");
//                               let lbd_Hyperactive_Chk_key =
//                                 document.getElementById(
//                                   "lbd_Hyperactive_Chk_key"
//                                 );
//                               let lbd_Diminished_Chk_key =
//                                 document.getElementById(
//                                   "lbd_Diminished_Chk_key"
//                                 );
//                               let lbd_Absent_Chk_key =
//                                 document.getElementById("lbd_Absent_Chk_key");

//                               if (lbd_Normal_Chk_key != null) {
//                                 lbd_Normal_Chk_key.checked = true;
//                                 lbd_Hyperactive_Chk_key.checked = false;
//                                 lbd_Diminished_Chk_key.checked = false;
//                                 lbd_Absent_Chk_key.checked = false;
//                               }

//                               let M1620_BWL_INCONT_0 =
//                                 document.getElementById("M1620_BWL_INCONT_0");
//                               if (M1620_BWL_INCONT_0 != null) {
//                                 M1620_BWL_INCONT_0.checked = true;
//                               }

//                               let M1630_OSTOMY_0 =
//                                 document.getElementById("M1630_OSTOMY_0");
//                               if (M1630_OSTOMY_0 != null) {
//                                 M1630_OSTOMY_0.checked = true;
//                               }

//                               const anchorTags = [
//                                 ...document.querySelectorAll(".pages a"),
//                               ].filter((a) => /\d/.test(a.textContent));
//                               anchorTags[8].click();
//                               let page9Interval = setInterval(() => {
//                                 let K0520B1_key =
//                                   document.getElementById("K0520B1_key");
//                                 let K0520A1_key =
//                                   document.getElementById("K0520A1_key");
//                                 let K0520C1_key =
//                                   document.getElementById("K0520C1_key");
//                                 let K0520D1_key =
//                                   document.getElementById("K0520C1_key");
//                                 let K0520Z1_key =
//                                   document.getElementById("K0520Z1_key");
//                                 if (K0520B1_key != null) {
//                                   K0520B1_key.checked = true;
//                                   K0520A1_key.checked = false;
//                                   K0520C1_key.checked = false;
//                                   K0520D1_key.checked = true;
//                                   K0520Z1_key.checked = false;

//                                   if (
//                                     options.adls == "1" ||
//                                     options.adls == "2" ||
//                                     options.adls == "3"
//                                   ) {
//                                     let M1870_CRNT_FEEDING_1 =
//                                       document.getElementById(
//                                         "M1870_CRNT_FEEDING_1"
//                                       );
//                                     if (M1870_CRNT_FEEDING_1 != null) {
//                                       M1870_CRNT_FEEDING_1.checked = true;
//                                     }
//                                   }
//                                   else if (options.adls == "4") {
//                                     let M1870_CRNT_FEEDING_2 =
//                                       document.getElementById(
//                                         "M1870_CRNT_FEEDING_2"
//                                       );
//                                     if (M1870_CRNT_FEEDING_2 != null) {
//                                       M1870_CRNT_FEEDING_2.checked = true;
//                                     }
//                                   }

//                                   if (options.diagnosis.includes("ogtube")) {
//                                     let M1870_CRNT_FEEDING_4 =
//                                       document.getElementById(
//                                         "M1870_CRNT_FEEDING_4"
//                                       );
//                                     if (M1870_CRNT_FEEDING_4 != null) {
//                                       M1870_CRNT_FEEDING_4.checked = true;
//                                     }
//                                   }

//                                   let EatingAssessment1_key =
//                                     document.getElementById(
//                                       "EatingAssessment1_key"
//                                     );
//                                   let EatingAssessment2_key =
//                                     document.getElementById(
//                                       "EatingAssessment2_key"
//                                     );
//                                   let EatingAssessment3_key =
//                                     document.getElementById(
//                                       "EatingAssessment3_key"
//                                     );
//                                   let EatingAssessment4_key =
//                                     document.getElementById(
//                                       "EatingAssessment4_key"
//                                     );
//                                   let EatingAssessment5_key =
//                                     document.getElementById(
//                                       "EatingAssessment5_key"
//                                     );
//                                   let EatingAssessment6_key =
//                                     document.getElementById(
//                                       "EatingAssessment6_key"
//                                     );
//                                   let EatingAssessment7_key =
//                                     document.getElementById(
//                                       "EatingAssessment7_key"
//                                     );
//                                   let EatingAssessment8_key =
//                                     document.getElementById(
//                                       "EatingAssessment8_key"
//                                     );
//                                   let EatingAssessment9_key =
//                                     document.getElementById(
//                                       "EatingAssessment9_key"
//                                     );
//                                   let EatingAssessment10_key =
//                                     document.getElementById(
//                                       "EatingAssessment10_key"
//                                     );

//                                   if (EatingAssessment1_key != null) {
//                                     EatingAssessment10_key.checked = true;
//                                     EatingAssessment9_key.checked = false;
//                                     EatingAssessment8_key.checked = true;
//                                     EatingAssessment7_key.checked = false;
//                                     EatingAssessment6_key.checked = false;
//                                     EatingAssessment5_key.checked = false;
//                                     EatingAssessment4_key.checked = false;
//                                     EatingAssessment3_key.checked = false;
//                                     EatingAssessment2_key.checked = false;
//                                     EatingAssessment1_key.checked = false;
//                                   }

//                                   if (
//                                     options.precautions.includes("aspiration")
//                                   ) {
//                                     EatingAssessment10_key.checked = true;
//                                     EatingAssessment1_key.checked = true;
//                                     EatingAssessment8_key.checked = true;
//                                     EatingAssessment9_key.checked = false;
//                                     EatingAssessment7_key.checked = false;
//                                     EatingAssessment6_key.checked = false;
//                                     EatingAssessment5_key.checked = false;
//                                     EatingAssessment4_key.checked = false;
//                                     EatingAssessment3_key.checked = false;
//                                     EatingAssessment2_key.checked = false;
//                                   }

//                                   let app_Appetite_Rdo_2 =
//                                     document.getElementById(
//                                       "app_Appetite_Rdo_2"
//                                     );
//                                   if (app_Appetite_Rdo_2 != null) {
//                                     app_Appetite_Rdo_2.checked = true;
//                                   }

//                                   if (options.diagnosis.includes("dm2")) {
//                                     let end_DiabetesType_Rdo_2 =
//                                       document.getElementById(
//                                         "end_DiabetesType_Rdo_2"
//                                       );
//                                     end_DiabetesType_Rdo_2.checked = true;
//                                   }

//                                   const anchorTags = [
//                                     ...document.querySelectorAll(".pages a"),
//                                   ].filter((a) => /\d/.test(a.textContent));
//                                   anchorTags[9].click();

//                                   let page10Interval = setInterval(() => {
//                                     let M1800_CRNT_GROOMING_0 =
//                                       document.getElementById(
//                                         "M1800_CRNT_GROOMING_0"
//                                       );
//                                     if (M1800_CRNT_GROOMING_0 != null) {
//                                       if (options.adls == "1") {
//                                         let M1800_CRNT_GROOMING_1 =
//                                           document.getElementById(
//                                             "M1800_CRNT_GROOMING_1"
//                                           );
//                                         if (M1800_CRNT_GROOMING_1 != null) {
//                                           M1800_CRNT_GROOMING_1.checked = true;
//                                         }

//                                         let M1810_CRNT_DRESS_UPPER_1 =
//                                           document.getElementById(
//                                             "M1810_CRNT_DRESS_UPPER_1"
//                                           );
//                                         if (M1810_CRNT_DRESS_UPPER_1 != null) {
//                                           M1810_CRNT_DRESS_UPPER_1.checked = true;
//                                         }

//                                         let M1820_CRNT_DRESS_LOWER_1 =
//                                           document.getElementById(
//                                             "M1820_CRNT_DRESS_LOWER_1"
//                                           );
//                                         if (M1820_CRNT_DRESS_LOWER_1 != null) {
//                                           M1820_CRNT_DRESS_LOWER_1.checked = true;
//                                         }

//                                         let M1830_CRNT_BATHG_1 =
//                                           document.getElementById(
//                                             "M1830_CRNT_BATHG_1"
//                                           );
//                                         if (M1830_CRNT_BATHG_1 != null) {
//                                           M1830_CRNT_BATHG_1.checked = true;
//                                         }

//                                         let M1840_CRNT_TOILTG_1 =
//                                           document.getElementById(
//                                             "M1840_CRNT_TOILTG_1"
//                                           );
//                                         if (M1840_CRNT_TOILTG_1 != null) {
//                                           M1840_CRNT_TOILTG_1.checked = true;
//                                         }

//                                         let M1845_CRNT_TOILTG_HYGN_0 =
//                                           document.getElementById(
//                                             "M1845_CRNT_TOILTG_HYGN_0"
//                                           );
//                                         if (M1845_CRNT_TOILTG_HYGN_0 != null) {
//                                           M1845_CRNT_TOILTG_HYGN_0.checked = true;
//                                         }

//                                         let M1850_CRNT_TRNSFRNG_1 =
//                                           document.getElementById(
//                                             "M1850_CRNT_TRNSFRNG_1"
//                                           );
//                                         if (M1850_CRNT_TRNSFRNG_1 != null) {
//                                           M1850_CRNT_TRNSFRNG_1.checked = true;
//                                         }

//                                         let M1860_CRNT_AMBLTN_1 =
//                                           document.getElementById(
//                                             "M1860_CRNT_AMBLTN_1"
//                                           );
//                                         if (M1860_CRNT_AMBLTN_1 != null) {
//                                           M1860_CRNT_AMBLTN_1.checked = true;
//                                         }
//                                       } else if (options.adls == "2") {
//                                         let M1800_CRNT_GROOMING_2 =
//                                           document.getElementById(
//                                             "M1800_CRNT_GROOMING_2"
//                                           );
//                                         if (M1800_CRNT_GROOMING_2 != null) {
//                                           M1800_CRNT_GROOMING_2.checked = true;
//                                         }

//                                         let M1810_CRNT_DRESS_UPPER_2 =
//                                           document.getElementById(
//                                             "M1810_CRNT_DRESS_UPPER_2"
//                                           );
//                                         if (M1810_CRNT_DRESS_UPPER_2 != null) {
//                                           M1810_CRNT_DRESS_UPPER_2.checked = true;
//                                         }

//                                         let M1820_CRNT_DRESS_LOWER_2 =
//                                           document.getElementById(
//                                             "M1820_CRNT_DRESS_LOWER_2"
//                                           );
//                                         if (M1820_CRNT_DRESS_LOWER_2 != null) {
//                                           M1820_CRNT_DRESS_LOWER_2.checked = true;
//                                         }

//                                         let M1830_CRNT_BATHG_2 =
//                                           document.getElementById(
//                                             "M1830_CRNT_BATHG_2"
//                                           );
//                                         if (M1830_CRNT_BATHG_2 != null) {
//                                           M1830_CRNT_BATHG_2.checked = true;
//                                         }

//                                         let M1840_CRNT_TOILTG_1 =
//                                           document.getElementById(
//                                             "M1840_CRNT_TOILTG_1"
//                                           );
//                                         if (M1840_CRNT_TOILTG_1 != null) {
//                                           M1840_CRNT_TOILTG_1.checked = true;
//                                         }

//                                         let M1845_CRNT_TOILTG_HYGN_2 =
//                                           document.getElementById(
//                                             "M1845_CRNT_TOILTG_HYGN_2"
//                                           );
//                                         if (M1845_CRNT_TOILTG_HYGN_2 != null) {
//                                           M1845_CRNT_TOILTG_HYGN_2.checked = true;
//                                         }

//                                         let M1850_CRNT_TRNSFRNG_1 =
//                                           document.getElementById(
//                                             "M1850_CRNT_TRNSFRNG_1"
//                                           );
//                                         if (M1850_CRNT_TRNSFRNG_1 != null) {
//                                           M1850_CRNT_TRNSFRNG_1.checked = true;
//                                         }

//                                         let M1860_CRNT_AMBLTN_2 =
//                                           document.getElementById(
//                                             "M1860_CRNT_AMBLTN_2"
//                                           );
//                                         if (M1860_CRNT_AMBLTN_2 != null) {
//                                           M1860_CRNT_AMBLTN_2.checked = true;
//                                         }
//                                       } else if (options.adls == "3") {
//                                         let M1800_CRNT_GROOMING_3 =
//                                           document.getElementById(
//                                             "M1800_CRNT_GROOMING_3"
//                                           );
//                                         if (M1800_CRNT_GROOMING_3 != null) {
//                                           M1800_CRNT_GROOMING_3.checked = true;
//                                         }

//                                         let M1810_CRNT_DRESS_UPPER_2 =
//                                           document.getElementById(
//                                             "M1810_CRNT_DRESS_UPPER_2"
//                                           );
//                                         if (M1810_CRNT_DRESS_UPPER_2 != null) {
//                                           M1810_CRNT_DRESS_UPPER_2.checked = true;
//                                         }

//                                         let M1820_CRNT_DRESS_LOWER_3 =
//                                           document.getElementById(
//                                             "M1820_CRNT_DRESS_LOWER_3"
//                                           );
//                                         if (M1820_CRNT_DRESS_LOWER_3 != null) {
//                                           M1820_CRNT_DRESS_LOWER_3.checked = true;
//                                         }

//                                         let M1830_CRNT_BATHG_5 =
//                                           document.getElementById(
//                                             "M1830_CRNT_BATHG_5"
//                                           );
//                                         if (M1830_CRNT_BATHG_5 != null) {
//                                           M1830_CRNT_BATHG_5.checked = true;
//                                         }

//                                         let M1840_CRNT_TOILTG_3 =
//                                           document.getElementById(
//                                             "M1840_CRNT_TOILTG_3"
//                                           );
//                                         if (M1840_CRNT_TOILTG_3 != null) {
//                                           M1840_CRNT_TOILTG_3.checked = true;
//                                         }

//                                         let M1845_CRNT_TOILTG_HYGN_3 =
//                                           document.getElementById(
//                                             "M1845_CRNT_TOILTG_HYGN_3"
//                                           );
//                                         if (M1845_CRNT_TOILTG_HYGN_3 != null) {
//                                           M1845_CRNT_TOILTG_HYGN_3.checked = true;
//                                         }

//                                         let M1850_CRNT_TRNSFRNG_3 =
//                                           document.getElementById(
//                                             "M1850_CRNT_TRNSFRNG_3"
//                                           );
//                                         if (M1850_CRNT_TRNSFRNG_3 != null) {
//                                           M1850_CRNT_TRNSFRNG_3.checked = true;
//                                         }

//                                         let M1860_CRNT_AMBLTN_3 =
//                                           document.getElementById(
//                                             "M1860_CRNT_AMBLTN_3"
//                                           );
//                                         if (M1860_CRNT_AMBLTN_3 != null) {
//                                           M1860_CRNT_AMBLTN_3.checked = true;
//                                         }

//                                         let M1860_CRNT_AMBLTN_5 =
//                                           document.getElementById(
//                                             "M1860_CRNT_AMBLTN_5"
//                                           );
//                                         if (M1860_CRNT_AMBLTN_5 != null) {
//                                           M1860_CRNT_AMBLTN_5.checked = true;
//                                         }
//                                       } else if (options.adls == "4") {
//                                         let M1800_CRNT_GROOMING_3 =
//                                           document.getElementById(
//                                             "M1800_CRNT_GROOMING_3"
//                                           );
//                                         if (M1800_CRNT_GROOMING_3 != null) {
//                                           M1800_CRNT_GROOMING_3.checked = true;
//                                         }

//                                         let M1810_CRNT_DRESS_UPPER_3 =
//                                           document.getElementById(
//                                             "M1810_CRNT_DRESS_UPPER_3"
//                                           );
//                                         if (M1810_CRNT_DRESS_UPPER_3 != null) {
//                                           M1810_CRNT_DRESS_UPPER_3.checked = true;
//                                         }

//                                         let M1820_CRNT_DRESS_LOWER_3 =
//                                           document.getElementById(
//                                             "M1820_CRNT_DRESS_LOWER_3"
//                                           );
//                                         if (M1820_CRNT_DRESS_LOWER_3 != null) {
//                                           M1820_CRNT_DRESS_LOWER_3.checked = true;
//                                         }

//                                         let M1830_CRNT_BATHG_6 =
//                                           document.getElementById(
//                                             "M1830_CRNT_BATHG_6"
//                                           );
//                                         if (M1830_CRNT_BATHG_6 != null) {
//                                           M1830_CRNT_BATHG_6.checked = true;
//                                         }

//                                         let M1840_CRNT_TOILTG_4 =
//                                           document.getElementById(
//                                             "M1840_CRNT_TOILTG_4"
//                                           );
//                                         if (M1840_CRNT_TOILTG_4 != null) {
//                                           M1840_CRNT_TOILTG_4.checked = true;
//                                         }

//                                         let M1845_CRNT_TOILTG_HYGN_3 =
//                                           document.getElementById(
//                                             "M1845_CRNT_TOILTG_HYGN_3"
//                                           );
//                                         if (M1845_CRNT_TOILTG_HYGN_3 != null) {
//                                           M1845_CRNT_TOILTG_HYGN_3.checked = true;
//                                         }

//                                         let M1850_CRNT_TRNSFRNG_4 =
//                                           document.getElementById(
//                                             "M1850_CRNT_TRNSFRNG_4"
//                                           );
//                                         if (M1850_CRNT_TRNSFRNG_4 != null) {
//                                           M1850_CRNT_TRNSFRNG_4.checked = true;
//                                         }

//                                         let M1860_CRNT_AMBLTN_6 =
//                                           document.getElementById(
//                                             "M1860_CRNT_AMBLTN_6"
//                                           );
//                                         if (M1860_CRNT_AMBLTN_6 != null) {
//                                           M1860_CRNT_AMBLTN_6.checked = true;
//                                         }

//                                         //FUNCTIONAL ABILITIES AND GOALS
//                                       }

//                                       const anchorTags = [
//                                         ...document.querySelectorAll(".pages a"),
//                                       ].filter((a) => /\d/.test(a.textContent));
//                                       anchorTags[10].click();
//                                       let page11Interval = setInterval(() => {
//                                         //MUSCULOSKELETAL
//                                         let mus_NoDeficits_Chk_key =
//                                           document.getElementById(
//                                             "mus_NoDeficits_Chk_key"
//                                           );
//                                         let mus_Fracture_Chk_key =
//                                           document.getElementById(
//                                             "mus_Fracture_Chk_key"
//                                           );
//                                         let mus_Amputation_Chk_key =
//                                           document.getElementById(
//                                             "mus_Amputation_Chk_key"
//                                           );
//                                         let mus_AmputationBk_Chk_key =
//                                           document.getElementById(
//                                             "mus_AmputationBk_Chk_key"
//                                           );
//                                         let mus_AmputationUe_Chk_key =
//                                           document.getElementById(
//                                             "mus_AmputationUe_Chk_key"
//                                           );
//                                         let mus_AmputationR_Chk_key =
//                                           document.getElementById(
//                                             "mus_AmputationR_Chk_key"
//                                           );
//                                         let mus_AmputationAkR_Chk_key =
//                                           document.getElementById(
//                                             "mus_AmputationAkR_Chk_key"
//                                           );
//                                         let mus_AmputationUeR_Chk_key =
//                                           document.getElementById(
//                                             "mus_AmputationUeR_Chk_key"
//                                           );
//                                         let mus_AmputationL_Chk_key =
//                                           document.getElementById(
//                                             "mus_AmputationL_Chk_key"
//                                           );
//                                         let mus_AmputationAkL_Chk_key =
//                                           document.getElementById(
//                                             "mus_AmputationAkL_Chk_key"
//                                           );
//                                         let mus_AmputationUeL_Chk_key =
//                                           document.getElementById(
//                                             "mus_AmputationUeL_Chk_key"
//                                           );
//                                         let mus_Weight_Chk_key =
//                                           document.getElementById(
//                                             "mus_Weight_Chk_key"
//                                           );
//                                         let mus_Prosthesis_Chk_key =
//                                           document.getElementById(
//                                             "mus_Weight_Chk_key"
//                                           );
//                                         let mus_Other_Chk_key =
//                                           document.getElementById(
//                                             "mus_Other_Chk_key"
//                                           );
//                                         let mus_Atrophy_Chk_key =
//                                           document.getElementById(
//                                             "mus_Atrophy_Chk_key"
//                                           );
//                                         let mus_DecreasedRom_Chk_key =
//                                           document.getElementById(
//                                             "mus_DecreasedRom_Chk_key"
//                                           );
//                                         let mus_Paresthesia_Chk_key =
//                                           document.getElementById(
//                                             "mus_Paresthesia_Chk_key"
//                                           );
//                                         let mus_Swollen_Chk_key =
//                                           document.getElementById(
//                                             "mus_Swollen_Chk_key"
//                                           );
//                                         let mus_Hemiplegia_Chk_key =
//                                           document.getElementById(
//                                             "mus_Hemiplegia_Chk_key"
//                                           );
//                                         let mus_Paraplegia_Chk_key =
//                                           document.getElementById(
//                                             "mus_Hemiplegia_Chk_key"
//                                           );
//                                         let mus_Quadriplegia_Chk_key =
//                                           document.getElementById(
//                                             "mus_Quadriplegia_Chk_key"
//                                           );
//                                         let mus_Contractures_Chk_key =
//                                           document.getElementById(
//                                             "mus_Contractures_Chk_key"
//                                           );
//                                         let mus_Shuffling_Chk_key =
//                                           document.getElementById(
//                                             "mus_Shuffling_Chk_key"
//                                           );
//                                         let mus_Weakness_Chk_key =
//                                           document.getElementById(
//                                             "mus_Weakness_Chk_key"
//                                           );
//                                         let mus_Other1_Chk_key =
//                                           document.getElementById(
//                                             "mus_Other1_Chk_key"
//                                           );
//                                         // let mus_NoDeficits_Chk_key=document.getElementById("mus_NoDeficits_Chk_key")
//                                         if (mus_NoDeficits_Chk_key != null) {
//                                           if (options.adls == "1") {
//                                             mus_NoDeficits_Chk_key.checked = false;
//                                             mus_Amputation_Chk_key.checked = false;
//                                             mus_Fracture_Chk_key.checked = false;
//                                             mus_AmputationBk_Chk_key.checked = false;
//                                             mus_AmputationUe_Chk_key.checked = false;
//                                             mus_AmputationR_Chk_key.checked = false;
//                                             mus_AmputationAkR_Chk_key.checked = false;
//                                             mus_AmputationUeR_Chk_key.checked = false;
//                                             mus_AmputationL_Chk_key.checked = false;
//                                             mus_AmputationAkL_Chk_key.checked = false;
//                                             mus_AmputationUeL_Chk_key.checked = false;
//                                             mus_Weight_Chk_key.checked = false;
//                                             mus_Prosthesis_Chk_key.checked = false;
//                                             mus_Other_Chk_key.checked = false;
//                                             mus_Atrophy_Chk_key.checked = false;
//                                             mus_DecreasedRom_Chk_key.checked = false;
//                                             mus_Paresthesia_Chk_key.checked = false;
//                                             mus_Swollen_Chk_key.checked = false;
//                                             mus_Hemiplegia_Chk_key.checked = false;
//                                             mus_Paraplegia_Chk_key.checked = false;
//                                             mus_Quadriplegia_Chk_key.checked = false;
//                                             mus_Contractures_Chk_key.checked = false;
//                                             mus_Shuffling_Chk_key.checked = true;
//                                             mus_Weakness_Chk_key.checked = false;
//                                             mus_Other1_Chk_key.checked = false;
//                                             // mus_NoDeficits_Chk_key.checked=false
//                                           } else if (options.adls == "2") {
//                                             mus_NoDeficits_Chk_key.checked = false;
//                                             mus_Amputation_Chk_key.checked = false;
//                                             mus_Fracture_Chk_key.checked = false;
//                                             mus_AmputationBk_Chk_key.checked = false;
//                                             mus_AmputationUe_Chk_key.checked = false;
//                                             mus_AmputationR_Chk_key.checked = false;
//                                             mus_AmputationAkR_Chk_key.checked = false;
//                                             mus_AmputationUeR_Chk_key.checked = false;
//                                             mus_AmputationL_Chk_key.checked = false;
//                                             mus_AmputationAkL_Chk_key.checked = false;
//                                             mus_AmputationUeL_Chk_key.checked = false;
//                                             mus_Weight_Chk_key.checked = false;
//                                             mus_Prosthesis_Chk_key.checked = false;
//                                             mus_Other_Chk_key.checked = false;
//                                             mus_Atrophy_Chk_key.checked = false;
//                                             mus_DecreasedRom_Chk_key.checked = false;
//                                             mus_Paresthesia_Chk_key.checked = false;
//                                             mus_Swollen_Chk_key.checked = false;
//                                             mus_Hemiplegia_Chk_key.checked = false;
//                                             mus_Paraplegia_Chk_key.checked = false;
//                                             mus_Quadriplegia_Chk_key.checked = false;
//                                             mus_Contractures_Chk_key.checked = false;
//                                             mus_Shuffling_Chk_key.checked = true;
//                                             mus_Weakness_Chk_key.checked = false;
//                                             mus_Other1_Chk_key.checked = false;
//                                           } else if (options.adls == "3") {
//                                             mus_NoDeficits_Chk_key.checked = false;
//                                             mus_Amputation_Chk_key.checked = false;
//                                             mus_Fracture_Chk_key.checked = false;
//                                             mus_AmputationBk_Chk_key.checked = false;
//                                             mus_AmputationUe_Chk_key.checked = false;
//                                             mus_AmputationR_Chk_key.checked = false;
//                                             mus_AmputationAkR_Chk_key.checked = false;
//                                             mus_AmputationUeR_Chk_key.checked = false;
//                                             mus_AmputationL_Chk_key.checked = false;
//                                             mus_AmputationAkL_Chk_key.checked = false;
//                                             mus_AmputationUeL_Chk_key.checked = false;
//                                             mus_Weight_Chk_key.checked = true;
//                                             mus_Prosthesis_Chk_key.checked = false;
//                                             mus_Other_Chk_key.checked = false;
//                                             mus_Atrophy_Chk_key.checked = false;
//                                             mus_DecreasedRom_Chk_key.checked = false;
//                                             mus_Paresthesia_Chk_key.checked = false;
//                                             mus_Swollen_Chk_key.checked = false;
//                                             mus_Hemiplegia_Chk_key.checked = false;
//                                             mus_Paraplegia_Chk_key.checked = false;
//                                             mus_Quadriplegia_Chk_key.checked = false;
//                                             mus_Contractures_Chk_key.checked = false;
//                                             mus_Shuffling_Chk_key.checked = false;
//                                             mus_Weakness_Chk_key.checked = true;
//                                             mus_Other1_Chk_key.checked = false;
//                                           } else if (options.adls == "4") {
//                                             mus_NoDeficits_Chk_key.checked = false;
//                                             mus_Amputation_Chk_key.checked = false;
//                                             mus_Fracture_Chk_key.checked = false;
//                                             mus_AmputationBk_Chk_key.checked = false;
//                                             mus_AmputationUe_Chk_key.checked = false;
//                                             mus_AmputationR_Chk_key.checked = false;
//                                             mus_AmputationAkR_Chk_key.checked = false;
//                                             mus_AmputationUeR_Chk_key.checked = false;
//                                             mus_AmputationL_Chk_key.checked = false;
//                                             mus_AmputationAkL_Chk_key.checked = false;
//                                             mus_AmputationUeL_Chk_key.checked = false;
//                                             mus_Weight_Chk_key.checked = false;
//                                             mus_Prosthesis_Chk_key.checked = false;
//                                             mus_Other_Chk_key.checked = false;
//                                             mus_Atrophy_Chk_key.checked = false;
//                                             mus_DecreasedRom_Chk_key.checked = true;
//                                             mus_Paresthesia_Chk_key.checked = false;
//                                             mus_Swollen_Chk_key.checked = false;
//                                             mus_Hemiplegia_Chk_key.checked = false;
//                                             mus_Paraplegia_Chk_key.checked = false;
//                                             mus_Quadriplegia_Chk_key.checked = false;
//                                             mus_Contractures_Chk_key.checked = false;
//                                             mus_Shuffling_Chk_key.checked = false;
//                                             mus_Weakness_Chk_key.checked = true;
//                                             mus_Other1_Chk_key.checked = false;
//                                           }
//                                           const anchorTags = [
//                                             ...document.querySelectorAll(
//                                               ".pages a"
//                                             ),
//                                           ].filter((a) =>
//                                             /\d/.test(a.textContent)
//                                           );
//                                           anchorTags[11].click();
//                                           let page12Interval = setInterval(
//                                             () => {
//                                               let nvn1_Color_Chk_key =
//                                                 document.getElementById(
//                                                   "nvn1_Color_Chk_key"
//                                                 );
//                                               let nvn1_Color_Rdo_0_1 =
//                                                 document.getElementById(
//                                                   "nvn1_Color_Rdo_0_1"
//                                                 );

//                                               let nvn1_SkinTurgor_Chk_key =
//                                                 document.getElementById(
//                                                   "nvn1_SkinTurgor_Chk_key"
//                                                 );
//                                               if (nvn1_Color_Chk_key != null) {
//                                                 nvn1_Color_Rdo_0_1.checked = true;
//                                                 nvn1_Color_Chk_key.checked = true;
//                                                 nvn1_SkinTurgor_Chk_key.checked = true;

//                                                 let nvn1_SkinTurgor_Rdo_2 =
//                                                   document.getElementById(
//                                                     "nvn1_SkinTurgor_Rdo_2"
//                                                   );
//                                                 let nvn1_Temperature_Chk_key =
//                                                   document.getElementById(
//                                                     "nvn1_Temperature_Chk_key"
//                                                   );

//                                                 nvn1_SkinTurgor_Rdo_2.checked = true;
//                                                 nvn1_Temperature_Chk_key.checked = true;

//                                                 let nvn1_TemperaWarm_Chk_key =
//                                                   document.getElementById(
//                                                     "nvn1_TemperaWarm_Chk_key"
//                                                   );
//                                                 if (
//                                                   nvn1_TemperaWarm_Chk_key !=
//                                                   null
//                                                 )
//                                                   if (
//                                                     options.diagnosis == "wound"
//                                                   ) {
//                                                     let nvn1_WoundIdenti_Rdo_1 =
//                                                       document.getElementById(
//                                                         "nvn1_WoundIdenti_Rdo_1"
//                                                       );
//                                                     if (
//                                                       nvn1_WoundIdenti_Rdo_1 !=
//                                                       null
//                                                     ) {
//                                                       nvn1_WoundIdenti_Rdo_1.checked = true;
//                                                     }
//                                                   }

//                                                 let M1306_UNHLD_STG2_PRSR_ULCR_0 =
//                                                   document.getElementById(
//                                                     "M1306_UNHLD_STG2_PRSR_ULCR_0"
//                                                   );
//                                                 if (
//                                                   M1306_UNHLD_STG2_PRSR_ULCR_0 !=
//                                                   null
//                                                 ) {
//                                                   M1306_UNHLD_STG2_PRSR_ULCR_0.checked = true;
//                                                 }

//                                                 let M1322_NBR_PRSULC_STG1_0 =
//                                                   document.getElementById(
//                                                     "M1322_NBR_PRSULC_STG1_0"
//                                                   );
//                                                 if (
//                                                   M1322_NBR_PRSULC_STG1_0 !=
//                                                   null
//                                                 ) {
//                                                   M1322_NBR_PRSULC_STG1_0.checked = true;
//                                                 }

//                                                 let M1324_STG_PRBLM_ULCER_NA =
//                                                   document.getElementById(
//                                                     "M1324_STG_PRBLM_ULCER_NA"
//                                                   );
//                                                 if (
//                                                   M1324_STG_PRBLM_ULCER_NA !=
//                                                   null
//                                                 ) {
//                                                   M1324_STG_PRBLM_ULCER_NA.checked = true;
//                                                 }

//                                                 let M1330_STAS_ULCR_PRSNT_0 =
//                                                   document.getElementById(
//                                                     "M1330_STAS_ULCR_PRSNT_0"
//                                                   );
//                                                 if (
//                                                   M1330_STAS_ULCR_PRSNT_0 !=
//                                                   null
//                                                 ) {
//                                                   M1330_STAS_ULCR_PRSNT_0.checked =
//                                                     true;
//                                                 }

//                                                 let M1340_SRGCL_WND_PRSNT_0 =
//                                                   document.getElementById(
//                                                     "M1340_SRGCL_WND_PRSNT_0"
//                                                   );
//                                                 if (
//                                                   M1340_SRGCL_WND_PRSNT_0 !=
//                                                   null
//                                                 ) {
//                                                   M1340_SRGCL_WND_PRSNT_0.checked = true;
//                                                 }

//                                                 //MEdication
//                                                 const anchorTags = [
//                                                   ...document.querySelectorAll(
//                                                     ".pages a"
//                                                   ),
//                                                 ].filter((a) =>
//                                                   /\d/.test(a.textContent)
//                                                 );
//                                                 anchorTags[12].click();

//                                                 let page13Interval =
//                                                   setInterval(() => {
//                                                     let M2001_DRUG_RGMN_RVW_0 =
//                                                       document.getElementById(
//                                                         "M2001_DRUG_RGMN_RVW_0"
//                                                       );
//                                                     if (
//                                                       M2001_DRUG_RGMN_RVW_0 !=
//                                                       null
//                                                     ) {
//                                                       M2001_DRUG_RGMN_RVW_0.checked = true;

//                                                       if (options.adls == "1") {
//                                                         let M2020_CRNT_MGMT_ORAL_MDCTN_0 =
//                                                           document.getElementById(
//                                                             "M2020_CRNT_MGMT_ORAL_MDCTN_0"
//                                                           );
//                                                         if (
//                                                           M2020_CRNT_MGMT_ORAL_MDCTN_0 !=
//                                                           null
//                                                         ) {
//                                                           M2020_CRNT_MGMT_ORAL_MDCTN_0.checked = true;
//                                                         }
//                                                       } else if (
//                                                         options.adls == "2"
//                                                       ) {
//                                                         let M2020_CRNT_MGMT_ORAL_MDCTN_2 =
//                                                           document.getElementById(
//                                                             "M2020_CRNT_MGMT_ORAL_MDCTN_2"
//                                                           );
//                                                         if (
//                                                           M2020_CRNT_MGMT_ORAL_MDCTN_2 !=
//                                                           null
//                                                         ) {
//                                                           M2020_CRNT_MGMT_ORAL_MDCTN_2.checked = true;
//                                                         }
//                                                       } else if (
//                                                         options.adls == "3"
//                                                       ) {
//                                                         let M2020_CRNT_MGMT_ORAL_MDCTN_2 =
//                                                           document.getElementById(
//                                                             "M2020_CRNT_MGMT_ORAL_MDCTN_2"
//                                                           );
//                                                         if (
//                                                           M2020_CRNT_MGMT_ORAL_MDCTN_2 !=
//                                                           null
//                                                         ) {
//                                                           M2020_CRNT_MGMT_ORAL_MDCTN_2.checked = true;
//                                                         }
//                                                       } else if (
//                                                         options.adls == "4"
//                                                       ) {
//                                                         let M2020_CRNT_MGMT_ORAL_MDCTN_3 =
//                                                           document.getElementById(
//                                                             "M2020_CRNT_MGMT_ORAL_MDCTN_3"
//                                                           );
//                                                         if (
//                                                           M2020_CRNT_MGMT_ORAL_MDCTN_3 !=
//                                                           null
//                                                         ) {
//                                                           M2020_CRNT_MGMT_ORAL_MDCTN_3.checked = true;
//                                                         }
//                                                       }

//                                                       let M2030_CRNT_MGMT_INJCTN_MDCTN_NA =
//                                                         document.getElementById(
//                                                           "M2030_CRNT_MGMT_INJCTN_MDCTN_NA"
//                                                         );
//                                                       if (
//                                                         M2030_CRNT_MGMT_INJCTN_MDCTN_NA !=
//                                                         null
//                                                       ) {
//                                                         M2030_CRNT_MGMT_INJCTN_MDCTN_NA.checked = true;
//                                                       }

//                                                       let mem_PrescribedMedications_Rdo_0_1 =
//                                                         document.getElementById(
//                                                           "mem_PrescribedMedications_Rdo_0_1"
//                                                         );
//                                                       if (
//                                                         mem_PrescribedMedications_Rdo_0_1 !=
//                                                         null
//                                                       ) {
//                                                         mem_PrescribedMedications_Rdo_0_1.checked = true;
//                                                       }

//                                                       let mem_ManageMedications_Rdo_1 =
//                                                         document.getElementById(
//                                                           "mem_ManageMedications_Rdo_1"
//                                                         );
//                                                       if (
//                                                         mem_ManageMedications_Rdo_1 !=
//                                                         null
//                                                       ) {
//                                                         mem_ManageMedications_Rdo_1.checked = true;
//                                                       }

//                                                       let mem_CurrentPrescribed_Rdo_0_0 =
//                                                         document.getElementById(
//                                                           "mem_CurrentPrescribed_Rdo_0_0"
//                                                         );
//                                                       if (
//                                                         mem_CurrentPrescribed_Rdo_0_0 !=
//                                                         null
//                                                       ) {
//                                                         mem_CurrentPrescribed_Rdo_0_0.checked = true;
//                                                       }

//                                                       let mem_Storage_Chk_key =
//                                                         document.getElementById(
//                                                           "mem_Storage_Chk_key"
//                                                         );
//                                                       let mem_Disposal_Chk_key =
//                                                         document.getElementById(
//                                                           "mem_Disposal_Chk_key"
//                                                         );
//                                                       let mem_Expirationdates_Chk_key =
//                                                         document.getElementById(
//                                                           "mem_Expirationdates_Chk_key"
//                                                         );
//                                                       let mem_Clearlylabeled_Chk_key =
//                                                         document.getElementById(
//                                                           "mem_Clearlylabeled_Chk_key"
//                                                         );
//                                                       let mem_Other_Chk_key =
//                                                         document.getElementById(
//                                                           "mem_Other_Chk_key"
//                                                         );
//                                                       let mem_PillBox_Chk_key =
//                                                         document.getElementById(
//                                                           "mem_PillBox_Chk_key"
//                                                         );
//                                                       let mem_NoMedication_Chk_key =
//                                                         document.getElementById(
//                                                           "mem_NoMedication_Chk_key"
//                                                         );

//                                                       if (
//                                                         mem_Storage_Chk_key !=
//                                                         null
//                                                       ) {
//                                                         mem_Storage_Chk_key.checked = true;
//                                                         mem_Disposal_Chk_key.checked = true;
//                                                         mem_Expirationdates_Chk_key.checked = true;
//                                                         mem_Clearlylabeled_Chk_key.checked = false;
//                                                         mem_NoMedication_Chk_key.checked = false;
//                                                         mem_PillBox_Chk_key.checked = false;
//                                                         mem_Other_Chk_key.checked = false;
//                                                       }

//                                                       //SPECIAL TREATMENT, PROCEDURES, AND PROGRAMS
//                                                       const anchorTags = [
//                                                         ...document.querySelectorAll(
//                                                           ".pages a"
//                                                         ),
//                                                       ].filter((a) =>
//                                                         /\d/.test(a.textContent)
//                                                       );
//                                                       anchorTags[13].click();
//                                                       let page14Interval =
//                                                         setInterval(() => {
//                                                           let mrf_Mostrecntfall_Rdo_5 =
//                                                             document.getElementById(
//                                                               "mrf_Mostrecntfall_Rdo_5"
//                                                             );
//                                                           if (
//                                                             mrf_Mostrecntfall_Rdo_5 !=
//                                                             null
//                                                           ) {
//                                                             mrf_Mostrecntfall_Rdo_5.checked = true;

//                                                             let FallRiskAssessment1_key =
//                                                               document.getElementById(
//                                                                 "FallRiskAssessment1_key"
//                                                               );
//                                                             let FallRiskAssessment2_key =
//                                                               document.getElementById(
//                                                                 "FallRiskAssessment2_key"
//                                                               );
//                                                             let FallRiskAssessment3_key =
//                                                               document.getElementById(
//                                                                 "FallRiskAssessment3_key"
//                                                               );
//                                                             let FallRiskAssessment4_key =
//                                                               document.getElementById(
//                                                                 "FallRiskAssessment4_key"
//                                                               );
//                                                             let FallRiskAssessment5_key =
//                                                               document.getElementById(
//                                                                 "FallRiskAssessment5_key"
//                                                               );
//                                                             let FallRiskAssessment6_key =
//                                                               document.getElementById(
//                                                                 "FallRiskAssessment6_key"
//                                                               );
//                                                             let FallRiskAssessment7_key =
//                                                               document.getElementById(
//                                                                 "FallRiskAssessment7_key"
//                                                               );
//                                                             let FallRiskAssessment8_key =
//                                                               document.getElementById(
//                                                                 "FallRiskAssessment7_key"
//                                                               );
//                                                             let FallRiskAssessment9_key =
//                                                               document.getElementById(
//                                                                 "FallRiskAssessment9_key"
//                                                               );
//                                                             let FallRiskAssessment10_key =
//                                                               document.getElementById(
//                                                                 "FallRiskAssessment10_key"
//                                                               );

//                                                             if (
//                                                               options.mental ==
//                                                               "forgetful"
//                                                             ) {
//                                                               if (
//                                                                 FallRiskAssessment1_key !=
//                                                                 null
//                                                               ) {
//                                                                 FallRiskAssessment1_key.checked = true;
//                                                                 FallRiskAssessment2_key.checked = true;
//                                                                 FallRiskAssessment6_key.checked = true;
//                                                                 FallRiskAssessment8_key.checked = true;
//                                                                 FallRiskAssessment10_key.checked = true;
//                                                                 FallRiskAssessment9_key.checked = false;
//                                                                 FallRiskAssessment7_key.checked = false;
//                                                                 FallRiskAssessment5_key.checked = false;
//                                                                 FallRiskAssessment4_key.checked = false;
//                                                                 FallRiskAssessment3_key.checked = false;
//                                                               } else if (
//                                                                 options.mental ==
//                                                                 "aaox4"
//                                                               ) {
//                                                                 FallRiskAssessment1_key.checked = true;
//                                                                 FallRiskAssessment2_key.checked = true;
//                                                                 FallRiskAssessment6_key.checked = true;
//                                                                 FallRiskAssessment8_key.checked = false;
//                                                                 FallRiskAssessment10_key.checked = false;
//                                                                 FallRiskAssessment9_key.checked = false;
//                                                                 FallRiskAssessment7_key.checked = false;
//                                                                 FallRiskAssessment5_key.checked = false;
//                                                                 FallRiskAssessment4_key.checked = false;
//                                                                 FallRiskAssessment3_key.checked = false;
//                                                               }
//                                                             }

//                                                             let ris_RiskAssessment1_Chk_key =
//                                                               document.getElementById(
//                                                                 "ris_RiskAssessment1_Chk_key"
//                                                               );
//                                                             let ris_RiskAssessment3_Chk_key =
//                                                               document.getElementById(
//                                                                 "ris_RiskAssessment3_Chk_key"
//                                                               );
//                                                             let ris_RiskAssessment5_Chk_key =
//                                                               document.getElementById(
//                                                                 "ris_RiskAssessment5_Chk_key"
//                                                               );
//                                                             let ris_RiskAssessment7_Chk_key =
//                                                               document.getElementById(
//                                                                 "ris_RiskAssessment7_Chk_key"
//                                                               );
//                                                             let ris_RiskAssessment9_Chk_key =
//                                                               document.getElementById(
//                                                                 "ris_RiskAssessment9_Chk_key"
//                                                               );
//                                                             let ris_RiskAssessment11_Chk_key =
//                                                               document.getElementById(
//                                                                 "ris_RiskAssessment11_Chk_key"
//                                                               );
//                                                             let ris_RiskAssessment2_Chk_key =
//                                                               document.getElementById(
//                                                                 "ris_RiskAssessment2_Chk_key"
//                                                               );
//                                                             let ris_RiskAssessment4_Chk_key =
//                                                               document.getElementById(
//                                                                 "ris_RiskAssessment4_Chk_key"
//                                                               );
//                                                             let ris_RiskAssessment6_Chk_key =
//                                                               document.getElementById(
//                                                                 "ris_RiskAssessment6_Chk_key"
//                                                               );
//                                                             let ris_RiskAssessment8_Chk_key =
//                                                               document.getElementById(
//                                                                 "ris_RiskAssessment8_Chk_key"
//                                                               );
//                                                             let ris_RiskAssessment10_Chk_key =
//                                                               document.getElementById(
//                                                                 "ris_RiskAssessment10_Chk_key"
//                                                               );

//                                                             if (
//                                                               ris_RiskAssessment3_Chk_key !=
//                                                               null
//                                                             ) {
//                                                               ris_RiskAssessment3_Chk_key.checked = true;
//                                                               ris_RiskAssessment5_Chk_key.checked = true;
//                                                               ris_RiskAssessment7_Chk_key.checked = true;
//                                                               ris_RiskAssessment9_Chk_key.checked = true;

//                                                               ris_RiskAssessment11_Chk_key.checked = false;
//                                                               ris_RiskAssessment2_Chk_key.checked = false;
//                                                               ris_RiskAssessment4_Chk_key.checked = false;
//                                                               ris_RiskAssessment6_Chk_key.checked = false;
//                                                               ris_RiskAssessment10_Chk_key.checked = false;
//                                                               ris_RiskAssessment8_Chk_key.checked = false;
//                                                               ris_RiskAssessment1_Chk_key.checked = false;
//                                                             }

//                                                             let M1033_HOSP_RISK_HSTRY_FALLS_key =
//                                                               document.getElementById(
//                                                                 "M1033_HOSP_RISK_HSTRY_FALLS_key"
//                                                               );
//                                                             let M1033_HOSP_RISK_WEIGHT_LOSS_key =
//                                                               document.getElementById(
//                                                                 "M1033_HOSP_RISK_HSTRY_FALLS_key"
//                                                               );
//                                                             let M1033_HOSP_RISK_MLTPL_HOSPZTN_key =
//                                                               document.getElementById(
//                                                                 "M1033_HOSP_RISK_MLTPL_HOSPZTN_key"
//                                                               );
//                                                             let M1033_HOSP_RISK_MLTPL_ED_VISIT_key =
//                                                               document.getElementById(
//                                                                 "M1033_HOSP_RISK_MLTPL_ED_VISIT_key"
//                                                               );
//                                                             let M1033_HOSP_RISK_MNTL_BHV_DCLN_key =
//                                                               document.getElementById(
//                                                                 "M1033_HOSP_RISK_MNTL_BHV_DCLN_key"
//                                                               );
//                                                             let M1033_HOSP_RISK_COMPLIANCE_key =
//                                                               document.getElementById(
//                                                                 "M1033_HOSP_RISK_COMPLIANCE_key"
//                                                               );
//                                                             let M1033_HOSP_RISK_5PLUS_MDCTN_key =
//                                                               document.getElementById(
//                                                                 "M1033_HOSP_RISK_5PLUS_MDCTN_key"
//                                                               );
//                                                             let M1033_HOSP_RISK_CRNT_EXHSTN_key =
//                                                               document.getElementById(
//                                                                 "M1033_HOSP_RISK_CRNT_EXHSTN_key"
//                                                               );
//                                                             let M1033_HOSP_RISK_OTHR_RISK_key =
//                                                               document.getElementById(
//                                                                 "M1033_HOSP_RISK_OTHR_RISK_key"
//                                                               );
//                                                             let M1033_HOSP_RISK_NONE_ABOVE_key =
//                                                               document.getElementById(
//                                                                 "M1033_HOSP_RISK_NONE_ABOVE_key"
//                                                               );

//                                                             if (
//                                                               M1033_HOSP_RISK_HSTRY_FALLS_key !=
//                                                               null
//                                                             ) {
//                                                               M1033_HOSP_RISK_COMPLIANCE_key.checked = true;
//                                                               M1033_HOSP_RISK_5PLUS_MDCTN_key.checked = true;
//                                                               M1033_HOSP_RISK_CRNT_EXHSTN_key.checked = true;
//                                                               M1033_HOSP_RISK_WEIGHT_LOSS_key.checked = false;
//                                                               M1033_HOSP_RISK_NONE_ABOVE_key.checked = false;
//                                                               M1033_HOSP_RISK_OTHR_RISK_key.checked = false;
//                                                               M1033_HOSP_RISK_MLTPL_ED_VISIT_key.checked = false;
//                                                               M1033_HOSP_RISK_MLTPL_HOSPZTN_key.checked = false;
//                                                               M1033_HOSP_RISK_MNTL_BHV_DCLN_key.checked = false;
//                                                             }

//                                                             //Materials provided
//                                                             let ins_InstructMaterial1_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterial1_Chk_key"
//                                                               );
//                                                             let ins_InstructMaterial2_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterial2_Chk_key"
//                                                               );
//                                                             let ins_InstructMaterial3_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterial3_Chk_key"
//                                                               );
//                                                             let ins_InstructMaterial4_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterial4_Chk_key"
//                                                               );
//                                                             let ins_InstructMaterial7_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterial7_Chk_key"
//                                                               );
//                                                             let ins_InstructMaterial8_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterial8_Chk_key"
//                                                               );
//                                                             let ins_InstructMaterial5_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterial5_Chk_key"
//                                                               );
//                                                             let ins_InstructMaterial6_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterial6_Chk_key"
//                                                               );
//                                                             let ins_InstructMaterial9_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterial9_Chk_key"
//                                                               );
//                                                             let ins_InstructMaterial10_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterial10_Chk_key"
//                                                               );
//                                                             let ins_InstructMaterial11_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterial11_Chk_key"
//                                                               );
//                                                             let ins_InstructMaterialOther_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterialOther_Chk_key"
//                                                               );
//                                                             let ins_InstructMaterial13_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterial13_Chk_key"
//                                                               );
//                                                             let ins_InstructMaterial15_Chk_key =
//                                                               document.getElementById(
//                                                                 "ins_InstructMaterial15_Chk_key"
//                                                               );

//                                                             if (
//                                                               ins_InstructMaterial15_Chk_key !=
//                                                               null
//                                                             ) {
//                                                               ins_InstructMaterial6_Chk_key.checked = true;
//                                                               ins_InstructMaterial9_Chk_key.checked = true;
//                                                               ins_InstructMaterial13_Chk_key.checked = true;
//                                                               ins_InstructMaterial8_Chk_key.checked = true;
//                                                               ins_InstructMaterial2_Chk_key.checked = true;
//                                                               ins_InstructMaterial10_Chk_key.checked = true;
//                                                               ins_InstructMaterial3_Chk_key.checked = true;
//                                                               ins_InstructMaterial5_Chk_key.checked = true;
//                                                               ins_InstructMaterial11_Chk_key.checked = true;
//                                                               ins_InstructMaterial15_Chk_key.checked = true;
//                                                               ins_InstructMaterial4_Chk_key.checked = true;
//                                                               ins_InstructMaterial1_Chk_key.checked = true;
//                                                               ins_InstructMaterialOther_Chk_key.checked = false;
//                                                               ins_InstructMaterial7_Chk_key.checked = false;
//                                                             }

//                                                             // CARE PLANNING/COORDINATION
//                                                             const anchorTags = [
//                                                               ...document.querySelectorAll(
//                                                                 ".pages a"
//                                                               ),
//                                                             ].filter((a) =>
//                                                               /\d/.test(
//                                                                 a.textContent
//                                                               )
//                                                             );
//                                                             anchorTags[14].click();

//                                                             let page15Interval =
//                                                               setInterval(
//                                                                 () => {
//                                                                   let care_PatientRepCare_Chk_key =
//                                                                     document.getElementById(
//                                                                       "care_PatientRepCare_Chk_key"
//                                                                     );
//                                                                   let care_Physician_Chk_key =
//                                                                     document.getElementById(
//                                                                       "care_Physician_Chk_key"
//                                                                     );
//                                                                   let care_CaseMgr_Chk_key =
//                                                                     document.getElementById(
//                                                                       "care_CaseMgr_Chk_key"
//                                                                     );
//                                                                   let care_Clinical_Chk_key =
//                                                                     document.getElementById(
//                                                                       "care_Clinical_Chk_key"
//                                                                     );
//                                                                   let care_ClinicalSn_Chk_key =
//                                                                     document.getElementById(
//                                                                       "care_ClinicalSn_Chk_key"
//                                                                     );
//                                                                   let care_ClinicalPt_Chk_key =
//                                                                     document.getElementById(
//                                                                       "care_ClinicalPt_Chk_key"
//                                                                     );
//                                                                   let care_ClinicalPta_Chk_key =
//                                                                     document.getElementById(
//                                                                       "care_ClinicalPta_Chk_key"
//                                                                     );
//                                                                   let care_ClinicalOt_Chk_key =
//                                                                     document.getElementById(
//                                                                       "care_ClinicalOt_Chk_key"
//                                                                     );
//                                                                   let care_ClinicalCota_Chk_key =
//                                                                     document.getElementById(
//                                                                       "care_ClinicalCota_Chk_key"
//                                                                     );
//                                                                   let care_ClinicalSt_Chk_key =
//                                                                     document.getElementById(
//                                                                       "care_ClinicalSt_Chk_key"
//                                                                     );
//                                                                   let care_ClinicalAide_Chk_key =
//                                                                     document.getElementById(
//                                                                       "care_ClinicalAide_Chk_key"
//                                                                     );
//                                                                   let care_ClinicalMsw_Chk_key =
//                                                                     document.getElementById(
//                                                                       "care_ClinicalMsw_Chk_key"
//                                                                     );
//                                                                   let care_ChangesMade_Chk_key =
//                                                                     document.getElementById(
//                                                                       "care_ClinicalMsw_Chk_key"
//                                                                     );
//                                                                   if (
//                                                                     care_PatientRepCare_Chk_key !=
//                                                                     null
//                                                                   ) {
//                                                                     care_PatientRepCare_Chk_key.checked = true;
//                                                                     care_CaseMgr_Chk_key.checked = true;
//                                                                     care_Physician_Chk_key.checked = true;
//                                                                     care_ClinicalSn_Chk_key.checked = true;
//                                                                     care_ChangesMade_Chk_key.checked = true;
//                                                                     care_Clinical_Chk_key.checked = false;
//                                                                     care_ClinicalPt_Chk_key.checked = false;
//                                                                     care_ClinicalPta_Chk_key.checked = false;
//                                                                     care_ClinicalOt_Chk_key.checked = false;
//                                                                     care_ClinicalCota_Chk_key.checked = false;
//                                                                     care_ClinicalSt_Chk_key.checked = false;
//                                                                     care_ClinicalAide_Chk_key.checked = false;
//                                                                     care_ClinicalMsw_Chk_key.checked = false;

//                                                                     clearInterval(
//                                                                       page15Interval
//                                                                     );
//                                                                     clearInterval(
//                                                                       page14Interval
//                                                                     );
//                                                                     clearInterval(
//                                                                       page13Interval
//                                                                     );
//                                                                     clearInterval(
//                                                                       page12Interval
//                                                                     );
//                                                                     clearInterval(
//                                                                       page11Interval
//                                                                     );
//                                                                     clearInterval(
//                                                                       page10Interval
//                                                                     );
//                                                                     clearInterval(
//                                                                       page9Interval
//                                                                     );
//                                                                     clearInterval(
//                                                                       page8Interval
//                                                                     );
//                                                                     clearInterval(
//                                                                       page7Interval
//                                                                     );
//                                                                     clearInterval(
//                                                                       page6Interval
//                                                                     );
//                                                                     clearInterval(
//                                                                       page5Interval
//                                                                     );
//                                                                     clearInterval(
//                                                                       page4Interval
//                                                                     );
//                                                                     clearInterval(
//                                                                       page2Interval
//                                                                     );
//                                                                     location.reload()
//                                                                   }
//                                                                 },
//                                                                 500
//                                                               );
//                                                           }
//                                                         }, 500);
//                                                     }
//                                                   }, 500);
//                                               }
//                                             },
//                                             500
//                                           );
//                                         }
//                                       }, 500);
//                                     }
//                                   }, 500);
//                                 }
//                               }, 500);
//                             }
//                           }, 500);
//                         }
//                       }, 500);
//                     }
//                   }, 500);
//                 }
//               }, 500);
//             }
//           }, 500);
//         }
//       }, 500);
//     }
//   }
// }

// function getQueryParam(param) {
//   let urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get(param);
// }

// if (getQueryParam("openedByScript") === "true") {
//   console.log("Window opened by script. Running script...");

//   let options = JSON.parse(getQueryParam("options"));
//   //POPUPS
//   if (options != null) {
//     let vbLevel = document.getElementById("DrpVerbalLevel");
//     if (vbLevel != null) {
//       vbLevel.value = "0";
//     }

//     let patSIT = document.getElementById("TxtPatientSIT");
//     if (patSIT != null) {
//       if (
//         options != null &&
//         (options.mental == "forgetful" || options.mental == "aaox4")
//       ) {
//         patSIT.value = "5";
//       } else {
//         patSIT.value = "";
//       }
//     }

//     let patientSafety = document.getElementById("As29");
//     if (patientSafety != null) {
//       if (options.mental == "aaox4") {
//         patientSafety.value = "No";
//       } else if (options.mental == "forgetful" || options.mental == "unable") {
//         patientSafety.value = "Yes";
//       } else {
//         patientSafety.value = "Select";
//       }
//     }

//     let patientHistorySafety = document.getElementById("As30");
//     if (patientHistorySafety != null) {
//       patientHistorySafety.value = "No";
//     }
//     let patientfootWearSafety = document.getElementById("As31");
//     if (patientfootWearSafety != null) {
//       patientfootWearSafety.value = "Yes";
//     }
//     let patientAmbSafety = document.getElementById("As32");
//     if (patientAmbSafety != null) {
//       patientAmbSafety.value = "Yes";
//     }
//     let patientAidsSafety = document.getElementById("As33");
//     if (patientAidsSafety != null) {
//       patientAidsSafety.value = "Yes";
//     }

//     let patientAwareSafety = document.getElementById("As34");
//     if (patientAwareSafety != null) {
//       if (options.mental == "aaox4" || options.mental == "forgetful") {
//         patientAwareSafety.value = "Yes";
//       } else if (options.mental == "unable") {
//         patientAwareSafety.value = "No";
//       } else {
//         patientAwareSafety.value = "Select";
//       }
//     }

//     let impairedJudgementSafety = document.getElementById("As35");
//     if (impairedJudgementSafety != null) {
//       if (options.mental == "aaox4") {
//         impairedJudgementSafety.value = "No";
//       } else if (options.mental == "unable" || options.mental == "forgetful") {
//         impairedJudgementSafety.value = "Yes";
//       } else {
//         impairedJudgementSafety.value = "Select";
//       }
//     }

//     let sucideAttemptsSafety = document.getElementById("As36");
//     if (sucideAttemptsSafety != null) {
//       sucideAttemptsSafety.value = "No";
//     }
//     let currentMentalDisorderSafety = document.getElementById("As37");
//     if (currentMentalDisorderSafety != null) {
//       currentMentalDisorderSafety.value = "No";
//     }

//     let pcg1Safety = document.getElementById("As38");
//     if (pcg1Safety != null) {
//       pcg1Safety.value = "Yes";
//     }
//     let pcg2Safety = document.getElementById("As39");
//     if (pcg2Safety != null) {
//       pcg2Safety.value = "Yes";
//     }
//     let pcg3Safety = document.getElementById("As40");
//     if (pcg3Safety != null) {
//       pcg3Safety.value = "Yes";
//     }
//     let pcg4Safety = document.getElementById("As41");
//     if (pcg4Safety != null) {
//       pcg4Safety.value = "No";
//     }

//     let ck3 = document.getElementById("Ck3");
//     if (ck3 != null) {
//       if (options.mental == "forgetful") {
//         ck3.checked = true;
//       }
//     }

//     let ck4 = document.getElementById("Ck4");
//     if (ck4 != null) {
//       if (options.mental == "unable") {
//         ck4.checked = true;
//       }
//     }
//     let ck5 = document.getElementById("Ck5");
//     if (ck5 != null) {
//       if (options.adls == "1" || options.adls == "2") {
//         ck5.checked = true;
//       }
//     }

//     let ck6 = document.getElementById("Ck6");
//     if (ck6 != null) {
//       if (options.adls == "3" || options.adls == "4") {
//         ck6.checked = true;
//       }
//     }

//     let ck7 = document.getElementById("Ck7");
//     if (ck7 != null) {
//       if (options.mental == "unable") {
//         ck7.checked = true;
//       }
//     }

//     let drp8 = document.getElementById("Drp8_0");
//     if (drp8 != null) {
//       drp8.checked = true;
//     }

//     let ck9 = document.getElementById("Ck9");
//     if (ck9 != null) {
//       if (options.mental == "forgetful") {
//         ck9.checked = true;
//       }
//     }

//     let ck10 = document.getElementById("Ck10");
//     if (ck10 != null) {
//       if (options.mental == "unable") {
//         ck10.checked = true;
//       }
//     }

//     let ck11 = document.getElementById("Ck11");
//     if (ck11 != null) {
//       ck11.checked = true;
//     }

//     let ck14 = document.getElementById("Ck14");
//     if (ck14 != null) {
//       ck14.checked = true;
//     }

//     let ck15 = document.getElementById("Ck15");
//     if (ck15 != null) {
//       ck15.checked = true;
//     }

//     let ck21 = document.getElementById("Ck21");
//     if (ck21 != null) {
//       ck21.checked = true;
//     }

//     let ck20 = document.getElementById("Ck20");
//     if (ck20 != null) {
//       if (options.mental == "unable" || options.mental == "forgetful") {
//         ck20.checked = true;
//       }
//     }
//   }

//   // document.body.style.backgroundColor = "lightblue"; // Example script
// }
// if (getQueryParam("openedByScript_FU") === "true") {
//   let radpain = document.getElementById("radpainintensity_0");

//   if (radpain != null) {
//     radpain.checked = true;
//   }

//   let verbalLevel = document.getElementById("DrpVerbalLevel");

//   if (verbalLevel != null) {
//     verbalLevel.value = 5;
//   }

//   let guarding = document.getElementById("Chkguarding");
//   if (guarding != null) {
//     guarding.checked = true;
//   }
//   let bodyImg = document.getElementById("ImageButton1");
//   if (bodyImg != null) {
//     bodyImg.click();

//     setTimeout(() => {
//       document.getElementById("DrpIntensity").value = "5";
//       document.getElementById("DrpActivity").value = "With Activity";
//       document.getElementById("DrpFrequency").value = "Frequent";
//       document.getElementById("DrpDescription").value = "Dull ache";
//       document.getElementById("DrpPainBetter").value = "Medication";
//       document.getElementById("DrpPainWorse").value = "Movement";
//       document.getElementById("DrpIntervention").value = "Non-opioid analgesic";
//       document.getElementById("DrpWellWorking").value = "Fairly well";
//       document.getElementById("DrpStatus").value = "Treat";
//     }, 500);
//   }
// } else {
//   console.log("This window was not opened by the script.");
// }

// function getRandomNumber(min, max, allowDecimal = true) {
//   let randomNumber = Math.random() * (max - min) + min;

//   if (allowDecimal) {
//     randomNumber = randomNumber.toFixed(1);
//     randomNumber = parseFloat(randomNumber);
//   } else {
//     randomNumber = Math.round(randomNumber);
//   }

//   return randomNumber;
// }

// // function injectScriptFile(filePath) {
// //     const script = document.createElement('script');
// //     script.src = chrome.runtime.getURL(filePath); // Path to your script file
// //     script.onload = function () {
// //       this.remove(); // Clean up after injection
// //     };
// //     document.documentElement.appendChild(script);
// //   }

// //   // Inject the external script
// //   injectScriptFile('injected.js');
//  setTimeout(()=>{window.location.reload()},30*1000);

function FillForm(options) {
  console.log(options);
  if (options.project == "project1") {
    if (options.SocIsActive) {
      let ids = [
        "ctl00_ContentPlaceHolder1_LnkOPA",
        "ctl00_ContentPlaceHolder1_lnkSafetAssessment",
        "ctl00_ContentPlaceHolder1_lnkFALLRISK",
      ];
      let elements = [];
      for (let i = 0; i < ids.length; i++) {
        elements.push(document.getElementById(ids[i]));
      }

      // let element = document.getElementById("ctl00_ContentPlaceHolder1_LnkOPA");
      elements.forEach((element) => {
        if (element != null) {
          let onClickAttr = element.getAttribute("onclick");

          // Use a regular expression to extract the URL inside the OpenpopupWithSize function
          let regex = /OpenpopupWithSize\('(.*?)'/;
          let match = onClickAttr.match(regex);

          if (match && match[1]) {
            let extractedUrl = match[1];
            console.log(
              "Extracted URL:",
              "https://www.hospicemd.com/" + extractedUrl
            );
            window.open(
              "https://www.hospicemd.com/" +
                extractedUrl +
                (extractedUrl.includes("?") ? "&" : "?") +
                "openedByScript=true" +
                "&options=" +
                JSON.stringify(options),
              "_blank"
            );
          } else {
            console.log("URL not found");
          }
        }
      });
      // Extract the 'onclick' attribute

      let ff = document.getElementById("ctl00_ContentPlaceHolder1_RD_PN_UN_1");
      if (ff != null) ff.click();

      if (options != null && options.mental == "forgetful") {
        let CRPPrefText = document.getElementById(
          "ctl00_ContentPlaceHolder1_CPRPreftxt"
        );
        if (CRPPrefText != null) {
          CRPPrefText.value = "yes";
        }

        let OwnCare = document.getElementById(
          "ctl00_ContentPlaceHolder1_DRP_CE_OCare"
        );
        if (OwnCare != null) OwnCare.value = "No";

        let administermeds = document.getElementById(
          "ctl00_ContentPlaceHolder1_PSSD"
        );
        if (administermeds != null) administermeds.value = "No";

        let familyMeds = document.getElementById(
          "ctl00_ContentPlaceHolder1_PCCSD"
        );
        if (familyMeds != null) familyMeds.value = "Family";
      }
      if (
        document.getElementById("ctl00_ContentPlaceHolder1_Vital_temp") != null
      ) {
        document.getElementById("ctl00_ContentPlaceHolder1_Vital_temp").value =
          Math.floor(Math.random() * 200) + 50;
        document.getElementById("ctl00_ContentPlaceHolder1_Vital_Pulse").value =
          Math.floor(Math.random() * 200) + 50;
        document.getElementById("ctl00_ContentPlaceHolder1_Vital_Resp").value =
          Math.floor(Math.random() * 200) + 50;
        document.getElementById("ctl00_ContentPlaceHolder1_Vital_BP").value =
          Math.floor(Math.random() * 200) + 50;
      }

      // let admitForm = document.getElementById("ctl00_ContentPlaceHolder1_AdmitFrom");

      // if(admitForm!=null)
      // admitForm.value = "Hospice in patient`s home/residence (B&C, RCFE)";

      // let admitForm1 = document.getElementById("ctl00$ContentPlaceHolder1$AdmitFrom1");
      // if(admitForm1!=null)
      // admitForm1.value = "Residential Setting (Home, B&C, AL)";

      // let cprPrefReg = document.getElementById("ctl00_ContentPlaceHolder1_CPRPrefReg");
      // if(cprPrefReg!=null)
      // cprPrefReg.value ='Patient/responsible party refused to discuss';

      // let ptFmAvoidHosp = document.getElementById('ctl00_ContentPlaceHolder1_DRP_NA_AH');
      // if(ptFmAvoidHosp!=null)
      // ptFmAvoidHosp.value = 'Yes';

      let desireForPatient = document.getElementById(
        "ctl00_ContentPlaceHolder1_DRP_NA_EV"
      );
      if (desireForPatient != null) desireForPatient.value = "Not Sure";

      //PCG

      let pcgAnxiety = document.getElementById(
        "ctl00_ContentPlaceHolder1_DRP_CEPF_AN"
      );
      if (pcgAnxiety != null) {
        pcgAnxiety.value = "None";
      }

      let pcgHardHearing = document.getElementById(
        "ctl00_ContentPlaceHolder1_DRP_CEPF_HD"
      );
      if (pcgHardHearing != null) {
        pcgHardHearing.value = "No";
      }

      let pcgHS = document.getElementById(
        "ctl00_ContentPlaceHolder1_DRP_CEPF_HS"
      );
      if (pcgHS != null) {
        pcgHS.value = "Good";
      }

      let pcgPC = document.getElementById(
        "ctl00_ContentPlaceHolder1_DRP_CEPF_PC"
      );
      if (pcgPC != null) {
        pcgPC.value = "Yes";
      }

      let pcgYC = document.getElementById(
        "ctl00_ContentPlaceHolder1_DRP_CEPF_YC"
      );
      if (pcgYC != null) {
        pcgYC.value = "No";
      }

      let pcgPets = document.getElementById(
        "ctl00_ContentPlaceHolder1_DRP_CEPF_AP"
      );
      if (pcgPets != null) {
        pcgPets.value = "No";
      }

      let pcgMeds = document.getElementById("ctl00_ContentPlaceHolder1_PCGSSD");
      if (pcgMeds != null) {
        pcgMeds.value = "Yes";
      }

      let pcgC1 = document.getElementById(
        "ctl00_ContentPlaceHolder1_CHK_CEPF_HO"
      );
      if (pcgC1 != null) {
        pcgC1.checked = true;
      }

      let pcgC2 = document.getElementById(
        "ctl00_ContentPlaceHolder1_CHK_CEPF_DP"
      );
      if (pcgC2 != null) {
        pcgC2.checked = true;
      }

      let pcgC3 = document.getElementById(
        "ctl00_ContentPlaceHolder1_CHK_CEPF_ME"
      );
      if (pcgC3 != null) {
        pcgC3.checked = true;
      }

      let pcgC4 = document.getElementById(
        "ctl00_ContentPlaceHolder1_CHK_CEPF_AD"
      );
      if (pcgC4 != null) {
        pcgC4.checked = true;
      }

      //mobility
      let cane = document.getElementById(
        "ctl00_ContentPlaceHolder1_Chk_CEMO_C"
      );
      let walker = document.getElementById(
        "ctl00_ContentPlaceHolder1_Chk_CEMO_W"
      );
      let wheeelChair = document.getElementById(
        "ctl00_ContentPlaceHolder1_Chk_CEMO_WC"
      );
      let standAssist = document.getElementById(
        "ctl00_ContentPlaceHolder1_Chk_CEMO_S"
      );
      let moderateAssist = document.getElementById(
        "ctl00_ContentPlaceHolder1_Chk_CEMO_M"
      );
      let maxAssist = document.getElementById(
        "ctl00_ContentPlaceHolder1_Chk_CEMO_MX"
      );
      let bedBound = document.getElementById(
        "ctl00_ContentPlaceHolder1_ChK_CEMO_BB"
      );
      let bedRest = document.getElementById(
        "ctl00_ContentPlaceHolder1_Chk_CEMO_BR"
      );
      let uptolerated = document.getElementById(
        "ctl00_ContentPlaceHolder1_Chk_CEMO_TO"
      );
      let maxAssistNon = document.getElementById(
        "ctl00_ContentPlaceHolder1_Chk_CEMO_MXA"
      );
      let transferCheck = document.getElementById(
        "ctl00_ContentPlaceHolder1_Chk_CEMO_TC"
      );
      let exercisePres = document.getElementById(
        "ctl00_ContentPlaceHolder1_Chk_CEMO_Ex"
      );
      let rangeMotion = document.getElementById(
        "ctl00_ContentPlaceHolder1_Chk_CEMO_RM"
      );

      if (cane != null) {
        cane.checked = false;
        standAssist.checked = false;
        walker.checked = false;
        wheeelChair.checked = false;
        moderateAssist.checked = false;
        maxAssist.checked = false;
        bedBound.checked = false;
        bedRest.checked = false;
        uptolerated.checked = false;
        maxAssistNon.checked = false;
        transferCheck.checked = false;
        exercisePres.checked = false;
        rangeMotion.checked = false;

        if (options != null && options.adls != null) {
          document.getElementById(
            "ctl00_ContentPlaceHolder1_RAD_CEMO_AN"
          ).checked = true;
          if (options.adls == "1") {
            cane.checked = true;
            standAssist.checked = true;
            walker.checked = false;
            wheeelChair.checked = false;
            moderateAssist.checked = false;
            maxAssist.checked = false;
            bedBound.checked = false;
            bedRest.checked = false;
            uptolerated.checked = false;
            maxAssistNon.checked = false;
            transferCheck.checked = false;
            exercisePres.checked = false;
            rangeMotion.checked = false;
          } else if (options.adls == "2") {
            cane.checked = false;
            standAssist.checked = true;
            walker.checked = true;
            wheeelChair.checked = false;
            moderateAssist.checked = false;
            maxAssist.checked = false;
            bedBound.checked = false;
            bedRest.checked = false;
            uptolerated.checked = false;
            maxAssistNon.checked = false;
            transferCheck.checked = false;
            exercisePres.checked = false;
            rangeMotion.checked = false;
          } else if (options.adls == "3") {
            document.getElementById(
              "ctl00_ContentPlaceHolder1_RAD_CEMO_AN1"
            ).checked = true;
            cane.checked = false;
            standAssist.checked = false;
            walker.checked = false;
            wheeelChair.checked = false;
            moderateAssist.checked = false;
            maxAssist.checked = false;
            bedBound.checked = false;
            bedRest.checked = true;
            uptolerated.checked = false;
            maxAssistNon.checked = true;
            transferCheck.checked = true;
            exercisePres.checked = false;
            rangeMotion.checked = false;
          } else if (options.adls == "4") {
            document.getElementById(
              "ctl00_ContentPlaceHolder1_RAD_CEMO_AN1"
            ).checked = true;
            cane.checked = false;
            standAssist.checked = false;
            walker.checked = false;
            wheeelChair.checked = false;
            moderateAssist.checked = false;
            maxAssist.checked = false;
            bedBound.checked = true;
            bedRest.checked = false;
            uptolerated.checked = false;
            maxAssistNon.checked = true;
            transferCheck.checked = false;
            exercisePres.checked = true;
            rangeMotion.checked = true;
          }
        }
      }

      //IV Assesement

      let chkCEIVNO = document.getElementById(
        "ctl00_ContentPlaceHolder1_CHK_CEIV_NO"
      );
      if (chkCEIVNO != null) {
        chkCEIVNO.checked = true;
      }

      // let  = document.getElementById('');
      // if( != null){
      //     .value = '';
      // }

      // let  = document.getElementById('');
      // if( != null){
      //     .value = '';
      // }

      // let  = document.getElementById('');
      // if( != null){
      //     .value = '';
      // }

      // let  = document.getElementById('');
      // if( != null){
      //     .value = '';
      // }

      // let  = document.getElementById('');
      // if( != null){
      //     .value = '';
      // }

      // let  = document.getElementById('');
      // if( != null){
      //     .value = '';
      // }

      // let needInterpreter = document.getElementById('ctl00_ContentPlaceHolder1_NeedInt');
      // if(needInterpreter!=null)
      // needInterpreter.value = 'No';

      // let servedInMilitry = document.getElementById('ctl00_ContentPlaceHolder1_P_MIL');
      // if(servedInMilitry!=null)
      // servedInMilitry.value = 'No';

      let kps = document.getElementById("ctl00_ContentPlaceHolder1_KPSList");
      if (kps != null) kps.value = "70";

      let pps = document.getElementById("ctl00_ContentPlaceHolder1_PPSList");
      if (pps != null) pps.value = "70";

      let fast = document.getElementById("ctl00_ContentPlaceHolder1_FASTList");
      if (fast != null) fast.value = "1";
      //Nature and COndition

      let medicalhistory = document.getElementById(
        "ctl00_ContentPlaceHolder1_NC_Chk1"
      );
      let PCGfamily = document.getElementById(
        "ctl00_ContentPlaceHolder1_NC_Chk3"
      );

      if (medicalhistory != null) medicalhistory.checked = true;
      if (PCGfamily != null) PCGfamily.checked = true;

      //Body System Head to toe

      //Symtoms
      let peaceful = document.getElementById(
        "ctl00_ContentPlaceHolder1_Nue_DEMpe"
      );
      let deamCon = document.getElementById(
        "ctl00_ContentPlaceHolder1_Nue_DEMco"
      );
      let otherSy = document.getElementById(
        "ctl00_ContentPlaceHolder1_Nue_OTHot"
      );
      let otherText = document.getElementById(
        "ctl00_ContentPlaceHolder1_Nue_OTHotText"
      );

      let levelCo = document.getElementById(
        "ctl00_ContentPlaceHolder1_Nue_LOCaw"
      );
      let alertCo = document.getElementById(
        "ctl00_ContentPlaceHolder1_Nue_LOCal"
      );

      if (levelCo != null) {
        levelCo.checked = true;
        alertCo.checked = true;
      }

      let timeOR = document.getElementById(
        "ctl00_ContentPlaceHolder1_Nue_ORTtm"
      );
      let placeOR = document.getElementById(
        "ctl00_ContentPlaceHolder1_Nue_ORTpl"
      );
      let personOR = document.getElementById(
        "ctl00_ContentPlaceHolder1_Nue_ORTpr"
      );
      let disOR = document.getElementById(
        "ctl00_ContentPlaceHolder1_Nue_ORTds"
      );

      let psyNone = document.getElementById(
        "ctl00_ContentPlaceHolder1_Nue_PHXno"
      );
      let commNormal = document.getElementById(
        "ctl00_ContentPlaceHolder1_Nue_CVPno"
      );
      let speechLimited = document.getElementById(
        "ctl00_ContentPlaceHolder1_Nue_SS"
      );

      if (psyNone != null) {
        psyNone.checked = true;
      }
      if (commNormal != null) {
        commNormal.checked = true;
      }
      if (speechLimited != null) {
        speechLimited.value = "No";
      }
      if (peaceful != null) {
        if (options != null && options.mental != null) {
          if (options.mental == "forgetful") {
            peaceful.checked = false;
            deamCon.checked = true;
            otherSy.checked = true;
            otherText.value = "forgetful";
            s;
            personOR.checked = true;
            disOR.checked = true;
            timeOR.checked = false;
            placeOR.checked = false;
          }
          if (options.mental == "aaox4") {
            peaceful.checked = true;
            deamCon.checked = false;
            otherSy.checked = false;
            disOR.checked = false;
            personOR.checked = true;
            timeOR.checked = true;
            placeOR.checked = true;
          }
        }
      }
      if (
        document.getElementById("ctl00_ContentPlaceHolder1_Nue_Balni_0") != null
      ) {
        if (options != null && options.adls != null) {
          if (options.adls == "1" || options.adls == "2") {
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Nue_Balni_0"
            ).checked = true;
          }
          document.getElementById(
            "ctl00_ContentPlaceHolder1_Mus_ISScw"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_Mus_ISSno"
          ).checked = false;
        }
      }

      //cardio
      if (
        document.getElementById("ctl00_ContentPlaceHolder1_BPLevel_0") != null
      ) {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_BPLevel_0"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_PULar"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_PULrr"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_PULpr"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_Carsp_0"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_SKNco_0"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_PULrt"
        ).checked = false;
      }

      //Respiratory
      if (
        document.getElementById("ctl00_ContentPlaceHolder1_Car_DYS_0") != null
      ) {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_DYS_0"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_LUScl"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_RESnm"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_CGHno"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_PO2_1"
        ).checked = true;
        document.getElementById("ctl00_ContentPlaceHolder1_Car_CO2Text").value =
          "2";
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_CO2nc"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_O2Fpn"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Car_O2Fco"
        ).checked = false;
      }

      //Infections
      if (
        document.getElementById("ctl00_ContentPlaceHolder1_Imm_FAL_0") != null
      ) {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Imm_FAL_0"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Imm_OAL_0"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Imm_CASno"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Imm_HXAno"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Imm_CAIno"
        ).checked = true;
      }

      //Gastro
      if (
        document.getElementById("ctl00_ContentPlaceHolder1_Gas_NAU_0") != null
      ) {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gas_NAU_0"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gas_VOM_0"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gas_ABDso"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gas_ABDnt"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gas_SND_0"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gas_STLnm"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gas_STS_0"
        ).checked = true;
        document.getElementById("ctl00_ContentPlaceHolder1_Gas_FRQ").value =
          "7";
      }

      //Nutrition

      if (
        document.getElementById("ctl00_ContentPlaceHolder1_GAS_RWL") != null
      ) {
        document.getElementById("ctl00_ContentPlaceHolder1_GAS_RWL").value =
          "No";
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gas_APPfr"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gas_APPpr"
        ).checked = false;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gas_AFF_0"
        ).checked = true;
        document.getElementById("ctl00_ContentPlaceHolder1_DrpDietType").value =
          "Other";
        document.getElementById("ctl00_ContentPlaceHolder1_Gas_DTPText").value =
          "Low sodium";
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gas_ORCnm"
        ).checked = true;
      }

      //Genitourinary
      if (
        document.getElementById("ctl00_ContentPlaceHolder1_Gen_URCco") != null
      ) {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gen_URCco"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gen_URNcl"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Gen_CATno"
        ).checked = true;
      }

      //sleep rest

      if (
        document.getElementById("ctl00_ContentPlaceHolder1_Slp_PAT_5") != null
      ) {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Slp_PAT_5"
        ).checked = true;
        document.getElementById("ctl00_ContentPlaceHolder1_Slp_DURhr").value =
          "8";
      }

      //Integumnetory Skin

      if (
        document.getElementById("ctl00_ContentPlaceHolder1_Int_SKSnm") != null
      ) {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Int_SKSnm"
        ).checked = false;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Int_SKSwm"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Int_SKT_0"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Int_SKI_0"
        ).checked = true;

        document.getElementById(
          "ctl00_ContentPlaceHolder1_Int_SNP4"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Int_MOS4"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Int_ACT4"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Int_MOB4"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Int_NUT4"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Int_FRI3"
        ).checked = true;

        if (options != null && options.adls != null) {
          if (options.adls == "1") {
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_SNP4"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_MOS4"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_ACT3"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_MOB3"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_NUT4"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_FRI3"
            ).checked = true;
          } else if (options.adls == "2") {
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_SNP4"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_MOS4"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_ACT3"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_MOB3"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_NUT3"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_FRI3"
            ).checked = true;
          } else if (options.adls == "3") {
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_SNP3"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_MOS3"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_ACT2"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_MOB2"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_NUT3"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_FRI2"
            ).checked = true;
          } else if (options.adls == "4") {
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_SNP3"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_MOS3"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_ACT1"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_MOB1"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_NUT2"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Int_FRI1"
            ).checked = true;
          }
        }
      }

      let = document.getElementById("");

      //Environmental Saftey
      let safteyAssesmentCompleted = document.getElementById(
        "ctl00_ContentPlaceHolder1_Env_SAC_0"
      );
      if (safteyAssesmentCompleted != null) {
        safteyAssesmentCompleted.checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Env_FRA_0"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Env_DST_1"
        ).checked = true;
      }
      if (
        document.getElementById("ctl00_ContentPlaceHolder1_Env_DSTl1_1") != null
      ) {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Env_DSTl1_1"
        ).checked = false;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Env_DSTl2dw"
        ).checked = false;
        if (options != null && options.adls != null) {
          if (options.adls == "1" || options.adls == "2") {
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Env_DSTl2dw"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Env_DSTl3cb"
            ).checked = false;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Env_DSTl3re"
            ).checked = false;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Env_DSTl1_1"
            ).checked = false;
          }
          if (options.adls == "3" || options.adls == "4") {
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Env_DSTl3cb"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Env_DSTl3re"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Env_DSTl2dw"
            ).checked = false;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Env_DSTl1_1"
            ).checked = false;
          }
          if (
            document.getElementById("ctl00_ContentPlaceHolder1_Env_DST_1")
              .checked == true
          ) {
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Env_DSTl1_1"
            ).checked = false;
          }
        }
      }

      let electref = document.getElementById("As1");
      if (electref != null) {
        electref.value = "Yes";
      }
      let telephone = document.getElementById("As2");
      if (telephone != null) {
        telephone.value = "Yes";
      }

      let emer = document.getElementById("As3");
      if (emer != null) {
        emer.value = "Yes";
      }

      let verhos = document.getElementById("As4");
      if (verhos != null) {
        verhos.value = "Yes";
      }

      let call911 = document.getElementById("As5");
      if (call911 != null) {
        call911.value = "Yes";
      }
      let adeplum = document.getElementById("As6");
      if (adeplum != null) {
        adeplum.value = "Yes";
      }
      let smokedet = document.getElementById("As7");
      if (smokedet != null) {
        smokedet.value = "Yes";
      }

      let fireextin = document.getElementById("As8");
      if (fireextin != null) {
        fireextin.value = "Yes";
      }

      let fireexit = document.getElementById("As9");
      if (fireexit != null) {
        fireexit.value = "Yes";
      }

      let weatherreleated = document.getElementById("As10");
      if (weatherreleated != null) {
        weatherreleated.value = "Yes";
        document.getElementById("As10c1").click();
        document.getElementById("As10c2").click();
        document.getElementById("As10c3").click();
        document.getElementById("As10c4").click();
      }
      let anyconcern = document.getElementById("As11");
      if (anyconcern != null) {
        anyconcern.value = "No";
      }

      let emergencyPer = document.getElementById("EP");
      if (emergencyPer != null) {
        emergencyPer.value = "Yes";
      }

      for (let i = 14; i <= 52; i++) {
        if (i == 29 || i == 30 || i == 34 || i == 35 || i == 37 || i == 41)
          continue;
        let As = document.getElementById("As" + i);
        if (As != null) {
          if (i == 36) {
            As.value = "No";
          } else As.value = "Yes";
        }
      }
      // let sucideAttempt = document.getElementById('As36');
      // if( sucideAttempt!= null){
      //     sucideAttempt.value = 'No';
      // }

      // let  = document.getElementById('');
      // if( != null){
      //     .value = 'Yes';
      // }

      // let  = document.getElementById('');
      // if( != null){
      //     .value = 'Yes';
      // }

      //Personal Care and Support

      // let hospiceAid = document.getElementById('ctl00_ContentPlaceHolder1_Pcs_NHAgr');
      // if(hospiceAid != null)
      //     hospiceAid.checked=true;

      // let needVoulnteer = document.getElementById('ctl00_ContentPlaceHolder1_Pcs_NFVno');
      // if(needVoulnteer!=null)
      //     needVoulnteer.checked=true;

      // let needSupport = document.getElementById('ctl00_ContentPlaceHolder1_Pcs_NCSno');
      //     if(needSupport!=null)
      //         needSupport.checked=true;

      if (
        document.getElementById("ctl00_ContentPlaceHolder1_Pcs_NHAno") != null
      ) {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Pcs_NHAno"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Pcs_NHAgr"
        ).checked = false;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Pcs_NHAlm"
        ).checked = false;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Pcs_NHAlc"
        ).checked = false;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Pcs_NHAsa"
        ).checked = false;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Pcs_NFVno"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Pcs_NFV"
        ).checked = false;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Pcs_NFVlm"
        ).checked = false;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Pcs_NFVer"
        ).checked = false;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Pcs_NFVcr"
        ).checked = false;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Pcs_NCSno"
        ).checked = true;

        if (options != null && options.adls != null) {
          if (
            options.adls == "2" ||
            options.adls == "3" ||
            options.adls == "4"
          ) {
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Pcs_NHAno"
            ).checked = false;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Pcs_NHAgr"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Pcs_NHAlm"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Pcs_NHAlc"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Pcs_NHAsa"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Pcs_NFVno"
            ).checked = false;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Pcs_NFV"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Pcs_NFVlm"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Pcs_NFVer"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_Pcs_NFVcr"
            ).checked = true;
          }
        }
      }

      //Teaching Needs
      let diag = document.getElementById("ctl00_ContentPlaceHolder1_Tea_PFPda");
      if (diag != null) diag.checked = true;

      let medi = document.getElementById("ctl00_ContentPlaceHolder1_Tea_PFPme");
      if (medi != null) medi.checked = true;

      let oxygen = document.getElementById(
        "ctl00_ContentPlaceHolder1_Tea_PFPox"
      );
      if (oxygen != null) oxygen.checked = true;

      let dme = document.getElementById("ctl00_ContentPlaceHolder1_Tea_PFPdm");
      if (dme != null) dme.checked = true;

      let infControl = document.getElementById(
        "ctl00_ContentPlaceHolder1_Tea_PFPin"
      );
      if (infControl != null) infControl.checked = true;

      if (document.getElementById("ctl00_ContentPlaceHolder1_Tea_MSU") != null)
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Tea_MSU"
        ).checked = true;

      //psychosocial Screening
      if (
        document.getElementById("ctl00_ContentPlaceHolder1_RAD_PS_SS_0") != null
      ) {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_RAD_PS_SS_0"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_CHK_PS_NO"
        ).checked = true;
      }

      //spirtual screening
      if (
        document.getElementById("ctl00_ContentPlaceHolder1_RAD_SS_FA_1") != null
      ) {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_RAD_SS_FA_1"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_RAD_SS_PGFA_1"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_CHK_SS_DS"
        ).checked = true;
        document.getElementById("ctl00_ContentPlaceHolder1_DRP_SS_SD").value =
          "None";
        document.getElementById("ctl00_ContentPlaceHolder1_DRP_SS_ISC").value =
          "Yes";
      }

      //Bereavement Screening
      if (
        document.getElementById("ctl00_ContentPlaceHolder1_CHK_BA_PTNO") != null
      ) {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_CHK_BA_PTNO"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_CHK_BA_PGNO"
        ).checked = true;
        document.getElementById("ctl00_ContentPlaceHolder1_DRP_BV_ISC").value =
          "No";
      }

      //Refferals
      // let ref= document.getElementById('ctl00_ContentPlaceHolder1_Tea_REFno');
      // if(ref!=null)
      //     ref.checked=true;
      if (
        document.getElementById("ctl00_ContentPlaceHolder1_Tea_REFno") != null
      ) {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Tea_REFno"
        ).checked = false;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Tea_REFsw"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Tea_REFsc"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Tea_REFvo"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_Tea_REFho"
        ).checked = true;
      }

      //Narrative and Disease Trajectory

      let trajectory = document.getElementById(
        "ctl00_ContentPlaceHolder1_DiseaseTraj_2"
      );
      if (trajectory != null) trajectory.checked = true;

      // if(document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP4')!=null){
      // document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP4').checked=true;
      // document.getElementById('ctl00_ContentPlaceHolder1_Int_MOS4').checked=true;
      // document.getElementById('ctl00_ContentPlaceHolder1_Int_ACT4').checked=true;
      // document.getElementById('ctl00_ContentPlaceHolder1_Int_MOB4').checked=true;
      // document.getElementById('ctl00_ContentPlaceHolder1_Int_NUT4').checked=true;
      // document.getElementById('ctl00_ContentPlaceHolder1_Int_FRI3').checked=true;
      // }

      if (options) {
        let adl = 0;
        let O2Conc = document.getElementById(
          "ctl00_ContentPlaceHolder1_DRP_CEDM_O2"
        );
        if (O2Conc != null) O2Conc.value = "Need";

        if (options.adls) {
          if (options.adls == "4") {
            adl = "3";
          } else {
            adl = options.adls;
          }

          let ambulations = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEAD_A"
          );
          if (ambulations != null) ambulations.value = adl;

          let toileting = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEAD_C"
          );
          if (toileting != null) toileting.value = adl;

          let transfer = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEAD_T"
          );
          if (transfer != null) transfer.value = adl;

          let dressing = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEAD_D"
          );
          if (dressing != null) dressing.value = adl;

          let feeding = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEAD_F"
          );
          if (feeding != null) feeding.value = adl;

          let bathing = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEAD_B"
          );
          if (bathing != null) bathing.value = adl;

          let cane = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_CA"
          );
          let walker = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_WA"
          );
          let wheelchair = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_WC"
          );
          let showerChair = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_SC"
          );
          let urinal = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_UL"
          );
          let commode = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_CO"
          );
          let hoyeLift = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_HL"
          );
          let bed = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_BD"
          );
          let airMetress = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_AM"
          );
          let bedPan = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_BP"
          );
          let overbedTable = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_OT"
          );
          let nebulizer = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_NUB"
          );
          let suctionMachine = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_SM"
          );
          let eTank = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_ET"
          );
          // let = document.getElementById('');
          // let = document.getElementById('');
          // let = document.getElementById('');
          // let = document.getElementById('');
          let others = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEDM_OTH"
          );
          let otherstext = document.getElementById(
            "ctl00_ContentPlaceHolder1_TXT_CEDM_OTH"
          );

          if (options.adls == 1) {
            if (cane != null) cane.value = "Has";
            if (walker != null) walker.value = "";

            if (wheelchair != null) wheelchair.value = "";

            if (showerChair != null) showerChair.value = "";

            if (urinal != null) urinal.value = "Need";
            if (commode != null) commode.value = "";

            if (hoyeLift != null) hoyeLift.value = "";

            if (airMetress != null) airMetress.value = "";

            if (bed != null) bed.value = "";

            if (bedPan != null) bedPan.value = "";

            if (overbedTable != null) overbedTable.value = "";

            if (nebulizer != null) nebulizer.value = "";

            if (suctionMachine != null) suctionMachine.value = "";

            if (eTank != null) eTank.value = "";
            if (others != null) {
              others.value = "";
              if (otherstext != null) otherstext.value = "";
            }
            if (kps != null) kps.value = "60";
            if (pps != null) pps.value = "60";
            if (fast != null) fast.value = "2";
          } else if (options.adls == 2) {
            if (cane != null) cane.value = "";
            if (walker != null) walker.value = "Has";

            if (wheelchair != null) wheelchair.value = "Need";

            if (showerChair != null) showerChair.value = "Need";

            if (urinal != null) urinal.value = "Need";
            if (commode != null) commode.value = "";

            if (hoyeLift != null) hoyeLift.value = "";

            if (airMetress != null) airMetress.value = "";

            if (bed != null) bed.value = "";

            if (bedPan != null) bedPan.value = "";

            if (overbedTable != null) overbedTable.value = "";

            if (nebulizer != null) nebulizer.value = "";

            if (suctionMachine != null) suctionMachine.value = "";

            if (eTank != null) eTank.value = "";

            if (others != null) {
              others.value = "";
              if (otherstext != null) otherstext.value = "";
            }
            if (kps != null) kps.value = "60";
            if (pps != null) pps.value = "60";
            if (fast != null) fast.value = "4";
            // if(document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP3') != null){
            //  document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP3').click();
            // }
          } else if (options.adls == 3) {
            if (cane != null) cane.value = "";
            if (walker != null) walker.value = "";

            if (wheelchair != null) wheelchair.value = "Need";

            if (showerChair != null) showerChair.value = "Need";

            if (urinal != null) urinal.value = "Need";
            if (commode != null) commode.value = "Need";

            if (hoyeLift != null) hoyeLift.value = "";

            if (airMetress != null) airMetress.value = "Need";

            if (bed != null) bed.value = "Need";

            if (bedPan != null) bedPan.value = "Need";

            if (overbedTable != null) overbedTable.value = "Need";

            if (nebulizer != null) nebulizer.value = "Need";

            if (suctionMachine != null) suctionMachine.value = "Need";

            if (eTank != null) eTank.value = "Need";

            if (others != null) {
              others.value = "";
              if (otherstext != null) otherstext.value = "";
            }

            if (kps != null) kps.value = "50";
            if (pps != null) pps.value = "50";
            if (fast != null) fast.value = "5";
            // if(document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP3') != null){
            // document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP3').click();
            // document.getElementById('ctl00_ContentPlaceHolder1_Int_MOS3').click();
            // document.getElementById('ctl00_ContentPlaceHolder1_Int_ACT3').click();
            // document.getElementById('ctl00_ContentPlaceHolder1_Int_MOB2').click();
            // document.getElementById('ctl00_ContentPlaceHolder1_Int_NUT3').click();
            // }
          } else if (options.adls == 4) {
            if (cane != null) cane.value = "";
            if (walker != null) walker.value = "";

            if (wheelchair != null) wheelchair.value = "Need";

            if (showerChair != null) showerChair.value = "Need";

            if (urinal != null) urinal.value = "Need";
            if (commode != null) commode.value = "Need";

            if (hoyeLift != null) hoyeLift.value = "Need";

            if (airMetress != null) airMetress.value = "Need";

            if (bed != null) bed.value = "Need";

            if (bedPan != null) bedPan.value = "Need";

            if (overbedTable != null) overbedTable.value = "Need";

            if (nebulizer != null) nebulizer.value = "Need";

            if (suctionMachine != null) suctionMachine.value = "Need";

            if (eTank != null) eTank.value = "Need";

            if (others != null) {
              others.value = "";
              if (otherstext != null) otherstext.value = "";
            }

            if (kps != null) kps.value = "40";
            if (pps != null) pps.value = "40";
            if (fast != null) fast.value = "7A";
            // if(document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP3') != null){
            // document.getElementById('ctl00_ContentPlaceHolder1_Int_SNP3').click();
            // document.getElementById('ctl00_ContentPlaceHolder1_Int_MOS3').click();
            // document.getElementById('ctl00_ContentPlaceHolder1_Int_ACT3').click();
            // document.getElementById('ctl00_ContentPlaceHolder1_Int_MOB2').click();
            // document.getElementById('ctl00_ContentPlaceHolder1_Int_NUT3').click();
            // }
          }
        }
      }

      let kpsppsless70 = document.getElementById(
        "ctl00_ContentPlaceHolder1_DRP_IF"
      );
      if (kpsppsless70 != null) kpsppsless70.value = "2";

      let DA = document.getElementById("ctl00_ContentPlaceHolder1_DRP_DA");
      if (DA != null) DA.value = "2";

      // let  = document.getElementById('');
      // if( != null)
      //     .value = '';

      // let  = document.getElementById('');
      // if( != null)
      //     .value = '';
      //HA Assignment
      let caneHA = document.getElementById("ctl00_ContentPlaceHolder1_Cane");
      let walkerHA = document.getElementById(
        "ctl00_ContentPlaceHolder1_Walker"
      );
      let wheelChairHA = document.getElementById(
        "ctl00_ContentPlaceHolder1_WheelChair"
      );
      let bedboundHA = document.getElementById(
        "ctl00_ContentPlaceHolder1_Bedbound"
      );
      let bedRailsHA = document.getElementById(
        "ctl00_ContentPlaceHolder1_BedRails"
      );
      let bedRails2HA = document.getElementById(
        "ctl00_ContentPlaceHolder1_BedRails2"
      );
      let objectsHA = document.getElementById(
        "ctl00_ContentPlaceHolder1_Objects"
      );
      let bedinLowHA = document.getElementById(
        "ctl00_ContentPlaceHolder1_BedinLow"
      );
      let turnHA = document.getElementById("ctl00_ContentPlaceHolder1_Turn");
      let chairtoBedHA = document.getElementById(
        "ctl00_ContentPlaceHolder1_ChairtoBed"
      );

      if (caneHA != null) {
        caneHA.checked = false;
        walkerHA.checked = false;
        wheelChairHA.checked = false;
        bedboundHA.checked = false;
        bedRailsHA.checked = false;
        bedRails2HA.checked = false;
        objectsHA.checked = false;
        bedinLowHA.checked = false;
        turnHA.checked = false;
        chairtoBedHA.checked = false;

        if (options.adls == "1") {
          caneHA.checked = true;
        } else if (options.adls == "2") {
          walkerHA.checked = true;
        } else if (options.adls == "3") {
          wheelChairHA.checked = true;
        } else if (options.adls == "4") {
          bedboundHA.checked = true;
          bedRailsHA.checked = true;
          objectsHA.checked = true;
          bedinLowHA.checked = true;
          turnHA.checked = true;
        }

        //Continence/Toileting
        let dependScale = document.getElementById(
          "ctl00_ContentPlaceHolder1_ConDdpSca"
        );
        let bathroom = document.getElementById(
          "ctl00_ContentPlaceHolder1_Bathroom"
        );
        let comode = document.getElementById(
          "ctl00_ContentPlaceHolder1_Commode"
        );
        let bedpan = document.getElementById(
          "ctl00_ContentPlaceHolder1_BedPan"
        );
        let adultDiapers = document.getElementById(
          "ctl00_ContentPlaceHolder1_AdultDiapers"
        );

        //urinary

        let cont = document.getElementById(
          "ctl00_ContentPlaceHolder1_Continent1"
        );
        let incont = document.getElementById(
          "ctl00_ContentPlaceHolder1_Incontinent1"
        );
        let incont1 = document.getElementById(
          "ctl00_ContentPlaceHolder1_IncontinentcarePRN"
        );
        let foley = document.getElementById(
          "ctl00_ContentPlaceHolder1_FoleyCatheter"
        );
        let emptycollbag = document.getElementById(
          "ctl00_ContentPlaceHolder1_EmptyCollectionBagPRN"
        );

        //bowel

        let contB = document.getElementById(
          "ctl00_ContentPlaceHolder1_Continent2"
        );
        let incontB = document.getElementById(
          "ctl00_ContentPlaceHolder1_Incontinent2"
        );
        let incont1B = document.getElementById(
          "ctl00_ContentPlaceHolder1_IncontinentCarePRN1"
        );
        let recordBowel = document.getElementById(
          "ctl00_ContentPlaceHolder1_RecordBowelMovements"
        );

        //transfer
        let dependScaleTransfer = document.getElementById(
          "ctl00_ContentPlaceHolder1_TranDDpSca"
        );
        let person1 = document.getElementById(
          "ctl00_ContentPlaceHolder1_AssisstanceRequired"
        );
        let person2 = document.getElementById("ctl00_ContentPlaceHolder1_NBHA");
        let mechLift = document.getElementById(
          "ctl00_ContentPlaceHolder1_HoyerLift"
        );
        let fallpre = document.getElementById(
          "ctl00_ContentPlaceHolder1_OtherS"
        );

        //Dressing
        let dependScaleDressing = document.getElementById(
          "ctl00_ContentPlaceHolder1_DressDDpSca"
        );
        let pajamas = document.getElementById(
          "ctl00_ContentPlaceHolder1_Pajamas"
        );
        let dress = document.getElementById(
          "ctl00_ContentPlaceHolder1_OthAsSpec"
        );

        //Feeding
        let dependScaleFeeding = document.getElementById(
          "ctl00_ContentPlaceHolder1_FeeDdpSca"
        );
        let aspPre = document.getElementById(
          "ctl00_ContentPlaceHolder1_SupplementsAsSpecified"
        );
        let feedAss = document.getElementById(
          "ctl00_ContentPlaceHolder1_TrayPrep"
        );
        let assOralMed = document.getElementById(
          "ctl00_ContentPlaceHolder1_FeedingAssisstance"
        );
        let encourageFluids = document.getElementById(
          "ctl00_ContentPlaceHolder1_EncourageFluidsAsTolerated"
        );

        //  Bathing/Hygiene
        let dependScaleBath = document.getElementById(
          "ctl00_ContentPlaceHolder1_BATDdpSca"
        );
        let shower = document.getElementById(
          "ctl00_ContentPlaceHolder1_Shower"
        );
        let tubBath = document.getElementById(
          "ctl00_ContentPlaceHolder1_TubBath"
        );
        let bedBath = document.getElementById(
          "ctl00_ContentPlaceHolder1_BedBath"
        );
        let showerChair = document.getElementById(
          "ctl00_ContentPlaceHolder1_ShowerChair"
        );

        //Patient Status
        let alertPS = document.getElementById(
          "ctl00_ContentPlaceHolder1_PatientAc"
        );
        let confusedPS = document.getElementById(
          "ctl00_ContentPlaceHolder1_PCGAc"
        );

        if (dependScale != null) {
          dependScale.value = "None";
          dependScaleTransfer.value = "None";
          dependScaleDressing.value = "None";
          dependScaleFeeding.value = "None";
          dependScaleBath.value = "None";

          adultDiapers.checked = false;
          bathroom.checked = true;
          comode.checked = false;
          bedpan.checked = false;

          cont.checked = true;
          incont.checked = false;
          incont1.checked = false;
          foley.checked = false;
          emptycollbag.checked = false;

          contB.checked = true;
          incontB.checked = false;
          incont1B.checked = false;
          recordBowel.checked = true;

          person1.checked = false;
          person2.checked = false;
          mechLift.checked = false;
          fallpre.checked = true;

          pajamas.checked = false;
          dress.checked = false;

          document.getElementById(
            "ctl00_ContentPlaceHolder1_AsTolerated"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_Breakfast"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_Lunch"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_Dinner"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_Snack"
          ).checked = true;
          assOralMed.checked = true;
          encourageFluids.checked = true;
          aspPre.checked = false;
          feedAss.checked = false;

          tubBath.checked = false;
          shower.checked = false;
          bedBath.checked = false;
          showerChair.checked = false;

          document.getElementById(
            "ctl00_ContentPlaceHolder1_Shampoo"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_Combo"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_Brush"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_BrushTeeth"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_Nails"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_Clean"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_DeodrantApplyEveryVisit"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_VisulaizeCondition"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_CreamandMassagetoBack"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_SpecialCareAs"
          ).checked = false;

          alertPS.checked = false;
          confusedPS.checked = false;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_SCASPCHA"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_RomAsSpecified"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_ChangeLinensAsSpecified"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_TidyPatientsRoom"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_MakePatientsBed"
          ).checked = false;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_DoPatientsLaundry"
          ).checked = false;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_Vitals"
          ).checked = true;

          document.getElementById(
            "ctl00_ContentPlaceHolder1_AskPatientPain"
          ).checked = true;

          if (options.adls == "1") {
            dependScale.value = "Minimal";
            dependScaleTransfer.value = "Minimal";
            dependScaleDressing.value = "Minimal";
            dependScaleFeeding.value = "Minimal";
            dependScaleBath.value = "Minimal";

            bathroom.checked = true;
            adultDiapers.checked = false;
            comode.checked = false;
            bedpan.checked = false;

            cont.checked = true;
            incont.checked = false;
            incont1.checked = false;
            foley.checked = false;
            emptycollbag.checked = false;

            contB.checked = true;
            incontB.checked = false;
            incont1B.checked = false;
            recordBowel.checked = true;

            person1.checked = false;
            person2.checked = false;
            mechLift.checked = false;
            fallpre.checked = true;

            assOralMed.checked = true;
            encourageFluids.checked = true;
            aspPre.checked = false;
            feedAss.checked = true;

            tubBath.checked = false;
            shower.checked = true;
            bedBath.checked = false;
            showerChair.checked = false;
          } else if (options.adls == "2") {
            dependScale.value = "Moderate";
            dependScaleTransfer.value = "Moderate";
            dependScaleDressing.value = "Moderate";
            dependScaleFeeding.value = "Moderate";
            dependScaleBath.value = "Moderate";

            bathroom.checked = true;
            adultDiapers.checked = false;
            comode.checked = false;
            bedpan.checked = false;

            cont.checked = true;
            incont.checked = false;
            incont1.checked = false;
            foley.checked = false;
            emptycollbag.checked = false;

            contB.checked = true;
            incontB.checked = false;
            incont1B.checked = false;
            recordBowel.checked = true;

            person1.checked = false;
            person2.checked = false;
            mechLift.checked = false;
            fallpre.checked = true;

            pajamas.checked = true;
            dress.checked = true;

            assOralMed.checked = true;
            encourageFluids.checked = true;
            aspPre.checked = false;
            feedAss.checked = true;

            tubBath.checked = false;
            shower.checked = true;
            bedBath.checked = false;
            showerChair.checked = false;
          } else if (options.adls == "3") {
            dependScale.value = "Complete";
            dependScaleTransfer.value = "Complete";
            dependScaleDressing.value = "Complete";
            dependScaleFeeding.value = "Complete";
            dependScaleBath.value = "Complete";

            comode.checked = true;
            bathroom.checked = false;
            adultDiapers.checked = false;
            bedpan.checked = false;

            cont.checked = false;
            incont.checked = true;
            incont1.checked = true;
            foley.checked = false;
            emptycollbag.checked = false;

            contB.checked = false;
            incontB.checked = true;
            incont1B.checked = true;
            recordBowel.checked = true;

            person1.checked = true;
            person2.checked = false;
            mechLift.checked = false;
            fallpre.checked = true;

            pajamas.checked = true;
            dress.checked = true;

            assOralMed.checked = true;
            encourageFluids.checked = true;
            aspPre.checked = false;
            feedAss.checked = true;

            tubBath.checked = false;
            shower.checked = false;
            bedBath.checked = false;
            showerChair.checked = true;
          } else if (options.adls == "4") {
            dependScale.value = "Complete";
            dependScaleTransfer.value = "Complete";
            dependScaleDressing.value = "Complete";
            dependScaleFeeding.value = "Complete";
            dependScaleBath.value = "Complete";

            bedpan.checked = true;
            comode.checked = false;
            bathroom.checked = false;
            adultDiapers.checked = false;

            cont.checked = false;
            incont.checked = true;
            incont1.checked = true;
            foley.checked = false;
            emptycollbag.checked = false;

            contB.checked = false;
            incontB.checked = true;
            incont1B.checked = true;
            recordBowel.checked = true;

            person1.checked = false;
            person2.checked = true;
            mechLift.checked = true;
            fallpre.checked = true;

            pajamas.checked = true;
            dress.checked = true;

            assOralMed.checked = true;
            encourageFluids.checked = true;
            aspPre.checked = true;
            feedAss.checked = true;

            tubBath.checked = false;
            shower.checked = false;
            bedBath.checked = true;
            showerChair.checked = false;
          }

          if (options.mental == "aaox4") {
            alertPS.checked = true;
            confusedPS.checked = false;
          } else if (options.mental == "forgetful") {
            confusedPS.checked = true;
            alertPS.checked = false;
          } else if (options.mental == "unable") {
            confusedPS.checked = true;
            alertPS.checked = false;
          }
        }
      }
    }
    //Follow Up
    else if (options.followUpIsActive) {
      let IsPainControllable = document.getElementById(
        "ctl00_ContentPlaceHolder1_RbControlled_0"
      );
      let ids = ["ctl00_ContentPlaceHolder1_lnkPainAssessment"];
      let elements = [];
      for (let i = 0; i < ids.length; i++) {
        elements.push(document.getElementById(ids[i]));
      }
      if (IsPainControllable != null) {
        IsPainControllable.checked = false;
        if (options != null) {
          if (options.fu_diagnosis.includes("Pain")) {
            IsPainControllable.checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_DropPainLevel"
            ).value = "5";

            elements.forEach((element) => {
              if (element != null) {
                let onClickAttr = element.getAttribute("onclick");

                // Use a regular expression to extract the URL inside the OpenpopupWithSize function
                let regex = /OpenpopupWithSize\('(.*?)'/;
                let match = onClickAttr.match(regex);

                if (match && match[1]) {
                  let extractedUrl = match[1];
                  console.log(
                    "Extracted URL:",
                    "https://www.hospicemd.com/" + extractedUrl
                  );
                  window.open(
                    "https://www.hospicemd.com/" +
                      extractedUrl +
                      (extractedUrl.includes("?") ? "&" : "?") +
                      "openedByScript_FU=true" +
                      "&options=" +
                      JSON.stringify(options),
                    "_blank"
                  );
                } else {
                  console.log("URL not found");
                }
              }
            });
          }

          let sitting = document.getElementById(
            "ctl00_ContentPlaceHolder1_RBbpPosition_0"
          );
          let lying = document.getElementById(
            "ctl00_ContentPlaceHolder1_RBbpPosition_1"
          );

          //mobility
          let amb = document.getElementById(
            "ctl00_ContentPlaceHolder1_RAD_CEMO_AN"
          );
          let ambCane = document.getElementById(
            "ctl00_ContentPlaceHolder1_Chk_CEMO_C"
          );
          let ambStand = document.getElementById(
            "ctl00_ContentPlaceHolder1_Chk_CEMO_S"
          );

          let nonAmb = document.getElementById(
            "ctl00_ContentPlaceHolder1_RAD_CEMO_AN1"
          );
          let bedBound = document.getElementById(
            "ctl00_ContentPlaceHolder1_ChK_CEMO_BB"
          );
          let bedRest = document.getElementById(
            "ctl00_ContentPlaceHolder1_Chk_CEMO_BR"
          );
          let maxAssist = document.getElementById(
            "ctl00_ContentPlaceHolder1_Chk_CEMO_MXA"
          );
          let transferbedChair = document.getElementById(
            "ctl00_ContentPlaceHolder1_Chk_CEMO_TC"
          );
          let exercisePrescribed = document.getElementById(
            "ctl00_ContentPlaceHolder1_Chk_CEMO_Ex"
          );
          let rangeMotion = document.getElementById(
            "ctl00_ContentPlaceHolder1_Chk_CEMO_RM"
          );
          let moderateAssist = document.getElementById(
            "ctl00_ContentPlaceHolder1_Chk_CEMO_M"
          );
          let ambMaxAssist = document.getElementById(
            "ctl00_ContentPlaceHolder1_Chk_CEMO_MX"
          );

          //adl assessment

          let ambAss = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEAD_A"
          );
          let toiletAss = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEAD_C"
          );
          let transferAss = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEAD_T"
          );
          let dressingAss = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEAD_D"
          );
          let feedAss = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEAD_F"
          );
          let bathAss = document.getElementById(
            "ctl00_ContentPlaceHolder1_DRP_CEAD_B"
          );

          //imminent dying

          let imminentDyingNoIssueReported = document.getElementById(
            "ctl00_ContentPlaceHolder1_ChkImminently"
          );
          imminentDyingNoIssueReported.checked = true;

          let isPatientDying = document.getElementById(
            "ctl00_ContentPlaceHolder1_RBImminentlyDying_1"
          );
          isPatientDying.checked = true;

          let isFallIncidence = document.getElementById(
            "ctl00_ContentPlaceHolder1_Env_FRA_1"
          );
          isFallIncidence.checked = true;

          let isSafetyIssue = document.getElementById(
            "ctl00_ContentPlaceHolder1_Env_SAFA_1"
          );
          isSafetyIssue.checked = true;

          let physicalSupport = document.getElementById(
            "ctl00_ContentPlaceHolder1_CHK_CAP_PHY"
          );
          let emotionalSupport = document.getElementById(
            "ctl00_ContentPlaceHolder1_CHK_CAP_Emo"
          );
          let safety = document.getElementById(
            "ctl00_ContentPlaceHolder1_CHK_CAP_Saf"
          );
          let environmentalNeeds = document.getElementById(
            "ctl00_ContentPlaceHolder1_CHK_CAP_Env"
          );
          let knowledgeRelated = document.getElementById(
            "ctl00_ContentPlaceHolder1_CHK_CAP_Kno"
          );

          physicalSupport.checked = true;
          emotionalSupport.checked = true;
          safety.checked = true;
          environmentalNeeds.checked = true;
          knowledgeRelated.checked = true;

          //Visit Check List
          document.getElementById(
            "ctl00_ContentPlaceHolder1_RbVC1_0"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_RbVC2_0"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_RbVC3_0"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_RbVC4_0"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_RBVC6_2"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_RBVC7_2"
          ).checked = true;
          document.getElementById(
            "ctl00_ContentPlaceHolder1_RbVC5_0"
          ).checked = true;

          amb.checked = false;
          ambCane.checked = false;
          ambStand.checked = false;
          nonAmb.checked = false;
          bedBound.checked = false;
          bedRest.checked = false;
          maxAssist.checked = false;
          transferbedChair.checked = false;
          exercisePrescribed.checked = false;
          rangeMotion.checked = false;
          moderateAssist.checked = false;
          ambMaxAssist.checked = false;

          ambAss.value = "0";
          toiletAss.value = "0";
          transferAss.value = "0";
          dressingAss.value = "0";
          feedAss.value = "0";
          bathAss.value = "0";

          sitting.checked = true;
          if (options.fu_adls == 1) {
            sitting.checked = true;

            amb.checked = true;
            ambCane.checked = true;
            ambStand.checked = true;
            nonAmb.checked = false;
            bedBound.checked = false;
            bedRest.checked = false;
            maxAssist.checked = false;
            transferbedChair.checked = false;
            exercisePrescribed.checked = false;
            rangeMotion = false;
            moderateAssist.checked = false;
            ambMaxAssist.checked = false;
            ambAss.value = "1";
            toiletAss.value = "1";
            transferAss.value = "1";
            dressingAss.value = "1";
            feedAss.value = "1";
            bathAss.value = "1";
          }
          if (options.fu_adls == 2) {
            sitting.checked = true;

            amb.checked = true;
            ambCane.checked = true;
            ambStand.checked = true;
            nonAmb.checked = false;
            bedBound.checked = false;
            bedRest.checked = false;
            maxAssist.checked = false;
            transferbedChair.checked = false;
            exercisePrescribed.checked = false;
            rangeMotion.checked = false;
            moderateAssist.checked = false;
            ambMaxAssist.checked = false;

            ambAss.value = "2";
            toiletAss.value = "2";
            transferAss.value = "2";
            dressingAss.value = "2";
            feedAss.value = "2";
            bathAss.value = "2";
          }
          if (options.fu_adls == 3) {
            sitting.checked = true;

            amb.checked = false;
            ambCane.checked = false;
            ambStand.checked = false;
            nonAmb.checked = true;
            bedBound.checked = false;
            bedRest.checked = true;
            maxAssist.checked = true;
            transferbedChair.checked = true;
            exercisePrescribed.checked = false;
            rangeMotion.checked = false;
            moderateAssist.checked = false;
            ambMaxAssist.checked = false;

            ambAss.value = "3";
            toiletAss.value = "3";
            transferAss.value = "3";
            dressingAss.value = "2";
            feedAss.value = "2";
            bathAss.value = "3";
          }
          if (options.fu_adls == 4) {
            lying.checked = true;

            amb.checked = false;
            ambCane.checked = false;
            ambStand.checked = false;
            nonAmb.checked = true;
            bedBound.checked = true;
            bedRest.checked = false;
            maxAssist.checked = true;
            transferbedChair.checked = false;
            exercisePrescribed.checked = true;
            rangeMotion.checked = true;
            moderateAssist.checked = false;
            ambMaxAssist.checked = false;

            ambAss.value = "3";
            toiletAss.value = "3";
            transferAss.value = "3";
            dressingAss.value = "3";
            feedAss.value = "3";
            bathAss.value = "3";
          }

          if (options.fu_diagnosis.includes("CHF")) {
            document.getElementById(
              "ctl00_ContentPlaceHolder1_RB_CAR_EDM2"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_RB_A2"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_RB_C2"
            ).checked = true;
            document.getElementById(
              "ctl00_ContentPlaceHolder1_RB_CAR_DYS2"
            ).checked = true;
          }
          if (options.fu_diagnosis.includes("Foley")) {
            document.getElementById(
              "ctl00_ContentPlaceHolder1_RB_GEN_URP2"
            ).checked = true;
          }

          let noIssueReported = document.getElementById(
            "ctl00_ContentPlaceHolder1_ChkMusculoSkeletal"
          );
          let weaknessNone = document.getElementById(
            "ctl00_ContentPlaceHolder1_RB_MUS_WKN1"
          );
          let weaknessMild = document.getElementById(
            "ctl00_ContentPlaceHolder1_RB_MUS_WKN2"
          );
          let weaknessModerate = document.getElementById(
            "ctl00_ContentPlaceHolder1_RB_MUS_WKN3"
          );
          let weaknessSevere = document.getElementById(
            "ctl00_ContentPlaceHolder1_RB_MUS_WKN4"
          );

          let contractureNone = document.getElementById(
            "ctl00_ContentPlaceHolder1_RB_MUS_CON1"
          );
          let contractureMild = document.getElementById(
            "ctl00_ContentPlaceHolder1_RB_MUS_CON2"
          );
          let contractureModerate = document.getElementById(
            "ctl00_ContentPlaceHolder1_RB_MUS_CON3"
          );
          let contractureSevere = document.getElementById(
            "ctl00_ContentPlaceHolder1_RB_MUS_CON4"
          );

          let gastroNoIssueReported = document.getElementById(
            "ctl00_ContentPlaceHolder1_ChkGastro"
          );
          let immunNoIssueReported = document.getElementById(
            "ctl00_ContentPlaceHolder1_ChkImmunological"
          );
          let nutritionNoIssueReported = document.getElementById(
            "ctl00_ContentPlaceHolder1_ChkNut"
          );
          let endoNoIssueReported = document.getElementById(
            "ctl00_ContentPlaceHolder1_ChkIndocrine"
          );
          let integuNoIssueReported = document.getElementById(
            "ctl00_ContentPlaceHolder1_ChkIntegumentary"
          );

          gastroNoIssueReported.checked = true;
          immunNoIssueReported.checked = true;
          nutritionNoIssueReported.checked = true;
          endoNoIssueReported.checked = true;
          integuNoIssueReported.checked = true;

          noIssueReported.checked = true;
          weaknessNone.checked = true;
          contractureNone.checked = true;
          if (options.fu_adls == 1) {
            noIssueReported.checked = false;
            weaknessMild.checked = true;
            contractureMild.checked = true;
          } else if (options.fu_adls == 2) {
            noIssueReported.checked = false;
            weaknessMild.checked = true;
            contractureMild.checked = true;
          } else if (options.fu_adls == 3) {
            noIssueReported.checked = false;
            weaknessModerate.checked = true;
            contractureModerate.checked = true;
          } else if (options.fu_adls == 4) {
            noIssueReported.checked = false;
            weaknessSevere.checked = true;
            contractureSevere.checked = true;
          } else {
            noIssueReported.checked = true;
            weaknessNone.checked = true;
            contractureNone.checked = true;
          }
        }
        document.getElementById("ctl00_ContentPlaceHolder1_txtTemp").value =
          getRandomNumber(96.5, 99.2);
        document.getElementById("ctl00_ContentPlaceHolder1_TxtPulse").value =
          getRandomNumber(60, 100, false);
        document.getElementById("ctl00_ContentPlaceHolder1_TxtResp").value =
          getRandomNumber(12, 22, false);
        document.getElementById("ctl00_ContentPlaceHolder1_TxtBp").value =
          getRandomNumber(90, 149, false) +
          "/" +
          getRandomNumber(60, 90, false);

        document.getElementById(
          "ctl00_ContentPlaceHolder1_RBLM_0"
        ).checked = true;
        document.getElementById("ctl00_ContentPlaceHolder1_TxtO2SAT").value =
          getRandomNumber(90, 99, false);

        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemA"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemB"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemC"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemD"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemE"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemF"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemG"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemH"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemI"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemJ"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemK"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemL"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemM"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemN"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemO"
        ).checked = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_chkBodySystemP"
        ).checked = true;

        // document.getElementById('ctl00_ContentPlaceHolder1_btnBodySystemContinue').click();
      }
    }
  } else if (options.project == "project2") {
    const iframe = document.getElementById("form-frame-container");
    if (iframe != null) {
      let currentPaymentSource = iframe.contentDocument.querySelector(
        'input[name="value(M0150_CPAY_MCARE_HMO)"]'
      );
      currentPaymentSource.checked = true;

      iframe.contentDocument.getElementById("pageNum2").click();

      let intervalId = setInterval(() => {
        let m0102 = iframe.contentDocument.getElementById(
          "M0102_PHYSN_ORDRD_SOCROC_DT_NA"
        );
        if (m0102 != null) {
          m0102.checked = true;
          iframe.contentDocument.getElementById(
            "M0110_EPISODE_TIMING1"
          ).checked = true;

          iframe.contentDocument.getElementById("pageNum4").click();
          let intervalIdM1028 = setInterval(() => {
            let m1028DM =
              iframe.contentDocument.getElementById("M1028_ACTV_DIAG_DM");
            if (m1028DM != null) {
              if (options.diagnosis.includes("dm2")) {
                m1028DM.checked = true;
              }
              iframe.contentDocument.getElementById("pageNum5").click();

              let envSafetyInterval = setInterval(() => {
                let envSafety =
                  iframe.contentDocument.getElementById("SafetyHazardsNone");

                if (envSafety != null) {
                  envSafety.checked = true;

                  let fireExt = iframe.contentDocument.getElementById(
                    "emp_ExtinguishersYes_Rdo"
                  );
                  if (fireExt != null) {
                    fireExt.checked = true;
                  }

                  let detExt = iframe.contentDocument.getElementById(
                    "emp_DetectorsHomeYes_Rdo"
                  );
                  if (detExt != null) {
                    detExt.checked = true;
                  }

                  let moreExit = iframe.contentDocument.getElementById(
                    "emp_MoreExitYes_Rdo"
                  );
                  if (moreExit != null) {
                    moreExit.checked = true;
                  }

                  let exitplan = iframe.contentDocument.getElementById(
                    "emp_ExitPlanYes_Rdo"
                  );
                  if (exitplan != null) {
                    exitplan.checked = true;
                  }

                  let pwrFailure = iframe.contentDocument.getElementById(
                    "emp_PowerFailureYes_Rdo"
                  );
                  if (pwrFailure != null) {
                    pwrFailure.checked = true;
                  }

                  let natDis = iframe.contentDocument.getElementById(
                    "emp_NaturalDisasterYes_Rdo"
                  );
                  if (natDis != null) {
                    natDis.checked = true;
                  }

                  if (options.precautions == "oxygen") {
                    let oxygen = iframe.contentDocument.getElementById(
                      "emp_OxygenSignsYes_Rdo"
                    );
                    if (oxygen != null) {
                      oxygen.checked = true;
                    }

                    let backupOxygen = iframe.contentDocument.getElementById(
                      "emp_BackupOxygenYes_Rdo"
                    );
                    if (backupOxygen != null) {
                      backupOxygen.checked = true;
                    }
                  } else {
                    let oxygen = iframe.contentDocument.getElementById(
                      "emp_OxygenSignsNa_Rdo"
                    );
                    if (oxygen != null) {
                      oxygen.checked = true;
                    }

                    let backupOxygen = iframe.contentDocument.getElementById(
                      "emp_BackupOxygenNa_Rdo"
                    );
                    if (backupOxygen != null) {
                      backupOxygen.checked = true;
                    }
                  }
                  let equipNone =
                    iframe.contentDocument.getElementById("eqc_None_Chk");
                  let wheelChair =
                    iframe.contentDocument.getElementById("eqc_Wheelchair_Chk");
                  let walker =
                    iframe.contentDocument.getElementById("eqc_Walker_Chk");
                  let cane =
                    iframe.contentDocument.getElementById("eqc_Cane_Chk");
                  let besideComode = iframe.contentDocument.getElementById(
                    "eqc_BedsideCommode_Chk"
                  );

                  equipNone.checked = true;
                  wheelChair.checked = false;
                  walker.checked = false;
                  cane.checked = false;
                  besideComode.checked = false;

                  if (options.adls) {
                    equipNone.checked = false;

                    let wheelChair =
                      iframe.contentDocument.getElementById(
                        "eqc_Wheelchair_Chk"
                      );
                    let walker =
                      iframe.contentDocument.getElementById("eqc_Walker_Chk");
                    let cane =
                      iframe.contentDocument.getElementById("eqc_Cane_Chk");
                    let besideComode = iframe.contentDocument.getElementById(
                      "eqc_BedsideCommode_Chk"
                    );

                    if (options.adls == 1) {
                      wheelChair.checked = false;
                      walker.checked = false;
                      cane.checked = true;
                      besideComode.checked = false;
                    } else if (options.adls == 2) {
                      wheelChair.checked = false;
                      walker.checked = true;
                      cane.checked = false;
                      besideComode.checked = false;
                    } else if (options.adls == 3) {
                      wheelChair.checked = true;
                      walker.checked = false;
                      cane.checked = false;
                      besideComode.checked = false;
                    } else if (options.adls == 4) {
                      wheelChair.checked = true;
                      walker.checked = false;
                      cane.checked = false;
                      besideComode.checked = true;
                    }
                  }

                  iframe.contentDocument.getElementById("pageNum9").click();

                  let cognitiveIntId = setInterval(() => {
                    let dementia =
                      iframe.contentDocument.getElementById("neh_Dementia_Chk");
                    if (dementia != null) {
                      let memoryLoss =
                        iframe.contentDocument.getElementById(
                          "neh_MemoryLoss_Chk"
                        );
                      let noHistory =
                        iframe.contentDocument.getElementById(
                          "neh_NoHistory_Chk"
                        );
                      let m1700RequirePrompting =
                        iframe.contentDocument.getElementById(
                          "M1700_COG1_FUNCTION"
                        );
                      let m1700Alert = iframe.contentDocument.getElementById(
                        "M1700_COG0_FUNCTION"
                      );
                      let m1700reqConsiderable =
                        iframe.contentDocument.getElementById(
                          "M1700_COG3_FUNCTION"
                        );
                      let m1710Never = iframe.contentDocument.getElementById(
                        "M1710_WHEN0_CONFUSED"
                      );
                      let m1710Awakening =
                        iframe.contentDocument.getElementById(
                          "M1710_WHEN2_CONFUSED"
                        );
                      let m1710Constantly =
                        iframe.contentDocument.getElementById(
                          "M1710_WHEN4_CONFUSED"
                        );
                      let m1720NoneTime = iframe.contentDocument.getElementById(
                        "M1720_WHEN0_ANXIOUS"
                      );
                      let m1740MemDeficit =
                        iframe.contentDocument.getElementById(
                          "M1740_BD_MEM1_DEFICIT"
                        );
                      let m1740Imapaired =
                        iframe.contentDocument.getElementById(
                          "M1740_BD_MEM2_DEFICIT"
                        );
                      let m1740NoneDemo = iframe.contentDocument.getElementById(
                        "M1740_BD_MEM7_DEFICIT"
                      );
                      let m1745Never = iframe.contentDocument.getElementById(
                        "M1745_BEH_PROB0_FREQ"
                      );
                      let riskFactor =
                        iframe.contentDocument.getElementById(
                          "rif_Noneabove_Chk"
                        );
                      let g0100SelfCare = iframe.contentDocument.querySelector(
                        'select[name="value(GG0100A)"]'
                      );
                      let g0100Indoor = iframe.contentDocument.querySelector(
                        'select[name="value(GG0100B)"]'
                      );
                      let g0100Stairs = iframe.contentDocument.querySelector(
                        'select[name="value(GG0100C)"]'
                      );
                      let g0100FuncCognition =
                        iframe.contentDocument.querySelector(
                          'select[name="value(GG0100D)"]'
                        );

                      let GG0110A =
                        iframe.contentDocument.getElementById("GG0110A");
                      let GG0110B =
                        iframe.contentDocument.getElementById("GG0110B");
                      let GG0110C =
                        iframe.contentDocument.getElementById("GG0110C");
                      let GG0110D =
                        iframe.contentDocument.getElementById("GG0110D");
                      let GG0110E =
                        iframe.contentDocument.getElementById("GG0110E");
                      let GG0110Z =
                        iframe.contentDocument.getElementById("GG0110Z");

                      let gg0130SA1 = iframe.contentDocument.querySelector(
                        'select[name="value(GG0130A1)"]'
                      );
                      let gg0130SB1 = iframe.contentDocument.querySelector(
                        'select[name="value(GG0130B1)"]'
                      );
                      let gg0130SC1 = iframe.contentDocument.querySelector(
                        'select[name="value(GG0130C1)"]'
                      );
                      let gg0130SE1 = iframe.contentDocument.querySelector(
                        'select[name="value(GG0130E1)"]'
                      );
                      let gg0130SF1 = iframe.contentDocument.querySelector(
                        'select[name="value(GG0130F1)"]'
                      );
                      let gg0130SG1 = iframe.contentDocument.querySelector(
                        'select[name="value(GG0130G1)"]'
                      );
                      let gg0130SH1 = iframe.contentDocument.querySelector(
                        'select[name="value(GG0130H1)"]'
                      );

                      dementia.checked = false;
                      memoryLoss.checked = false;
                      noHistory.checked = false;
                      m1700Alert.checked = false;
                      m1700RequirePrompting.checked = false;
                      m1710Never.checked = false;
                      m1710Awakening.checked = false;
                      m1720NoneTime.checked = false;
                      m1700reqConsiderable.checked = false;
                      m1710Constantly.checked = false;
                      m1740MemDeficit.checked = false;
                      m1740Imapaired.checked = false;
                      m1740NoneDemo.checked = false;
                      m1745Never.checked = true;
                      riskFactor.checked = true;
                      g0100SelfCare.value = "3";
                      g0100Indoor.value = "3";
                      g0100Stairs.value = "3";
                      g0100FuncCognition.value = "";
                      GG0110A.checked = false;
                      GG0110B.checked = false;
                      GG0110C.checked = false;
                      GG0110D.checked = false;
                      GG0110E.checked = false;
                      GG0110Z.checked = true;

                      gg0130SA1.value = "06";
                      gg0130SB1.value = "06";
                      gg0130SC1.value = "06";
                      gg0130SE1.value = "06";
                      gg0130SF1.value = "06";
                      gg0130SG1.value = "06";
                      gg0130SH1.value = "06";

                      if (options.mental == "forgetful") {
                        dementia.checked = true;
                        memoryLoss.checked = true;
                        noHistory.checked = false;
                        m1700Alert.checked = false;
                        m1700RequirePrompting.checked = true;
                        m1710Never.checked = false;
                        m1710Awakening.checked = true;
                        m1720NoneTime.checked = true;
                        m1740MemDeficit.checked = true;
                        m1740Imapaired.checked = true;
                        m1740NoneDemo.checked = false;
                        g0100FuncCognition.value = "2";
                      } else if (options.mental == "aaox4") {
                        dementia.checked = false;
                        memoryLoss.checked = false;
                        noHistory.checked = true;
                        m1700Alert.checked = true;
                        m1700RequirePrompting.checked = false;
                        m1710Never.checked = true;
                        m1710Awakening.checked = false;
                        m1720NoneTime.checked = true;
                        m1740MemDeficit.checked = false;
                        m1740Imapaired.checked = false;
                        m1740NoneDemo.checked = true;
                        g0100FuncCognition.value = "3";
                      } else if (options.mental == "unable") {
                        dementia.checked = false;
                        memoryLoss.checked = false;
                        noHistory.checked = false;
                        m1700Alert.checked = false;
                        m1700RequirePrompting.checked = false;
                        m1710Never.checked = false;
                        m1710Awakening.checked = false;
                        m1720NoneTime.checked = true;
                        m1700reqConsiderable.checked = true;
                        m1710Constantly.checked = true;
                        m1740MemDeficit.checked = true;
                        m1740Imapaired.checked = true;
                        m1740NoneDemo.checked = false;
                        g0100FuncCognition.value = "1";
                      }

                      if (options.adls) {
                        if (options.adls == "1") {
                          g0100SelfCare.value = "2";
                          g0100Indoor.value = "2";
                          g0100Stairs.value = "2";

                          GG0110A.checked = false;
                          GG0110B.checked = false;
                          GG0110C.checked = false;
                          GG0110D.checked = false;
                          GG0110E.checked = false;
                          GG0110Z.checked = true;

                          gg0130SA1.value = "05";
                          gg0130SB1.value = "05";
                          gg0130SC1.value = "05";
                          gg0130SE1.value = "05";
                          gg0130SF1.value = "05";
                          gg0130SG1.value = "05";
                          gg0130SH1.value = "05";
                        } else if (options.adls == "2") {
                          g0100SelfCare.value = "2";
                          g0100Indoor.value = "2";
                          g0100Stairs.value = "2";

                          GG0110A.checked = false;
                          GG0110B.checked = false;
                          GG0110C.checked = false;
                          GG0110D.checked = true;
                          GG0110E.checked = false;
                          GG0110Z.checked = false;

                          gg0130SA1.value = "05";
                          gg0130SB1.value = "05";
                          gg0130SC1.value = "03";
                          gg0130SE1.value = "03";
                          gg0130SF1.value = "03";
                          gg0130SG1.value = "03";
                          gg0130SH1.value = "03";
                        } else if (options.adls == "3") {
                          g0100SelfCare.value = "1";
                          g0100Indoor.value = "1";
                          g0100Stairs.value = "1";

                          GG0110A.checked = true;
                          GG0110B.checked = false;
                          GG0110C.checked = false;
                          GG0110D.checked = false;
                          GG0110E.checked = false;
                          GG0110Z.checked = false;

                          gg0130SA1.value = "04";
                          gg0130SB1.value = "04";
                          gg0130SC1.value = "01";
                          gg0130SE1.value = "01";
                          gg0130SF1.value = "02";
                          gg0130SG1.value = "01";
                          gg0130SH1.value = "01";
                        } else if (options.adls == "4") {
                          g0100SelfCare.value = "1";
                          g0100Indoor.value = "1";
                          g0100Stairs.value = "1";

                          GG0110A.checked = true;
                          GG0110B.checked = false;
                          GG0110C.checked = true;
                          GG0110D.checked = false;
                          GG0110E.checked = false;
                          GG0110Z.checked = false;

                          gg0130SA1.value = "01";
                          gg0130SB1.value = "01";
                          gg0130SC1.value = "01";
                          gg0130SE1.value = "01";
                          gg0130SF1.value = "01";
                          gg0130SG1.value = "01";
                          gg0130SH1.value = "01";
                        }
                      }
                      iframe.contentDocument
                        .getElementById("pageNum10")
                        .click();

                      var page10Interval = setInterval(() => {
                        let m1800 = iframe.contentDocument.getElementById(
                          "M1800_CRNT0_GROOMING"
                        );

                        if (m1800 != null) {
                          let gg0170A1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170A1)"]'
                          );
                          let gg0170B1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170B1)"]'
                          );
                          let gg0170C1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170C_MOBILITY_SOCROC_PERF)"]'
                          );
                          let gg0170D1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170D1)"]'
                          );
                          let gg0170E1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170E1)"]'
                          );
                          let gg0170F1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170F1)"]'
                          );
                          let gg0170G1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170G1)"]'
                          );
                          let gg0170I1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170I1)"]'
                          );
                          let gg0170J1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170J1)"]'
                          );
                          let gg0170K1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170K1)"]'
                          );
                          let gg0170L1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170L1)"]'
                          );
                          let gg0170M1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170M1)"]'
                          );
                          let gg0170N1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170N1)"]'
                          );
                          let gg0170O1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170O1)"]'
                          );
                          let gg0170P1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170P1)"]'
                          );
                          let gg0170Q1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170Q1)"]'
                          );
                          let gg0170R1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170R1)"]'
                          );
                          let gg0170RR1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170RR1)"]'
                          );
                          let gg0170S1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170S1)"]'
                          );
                          let gg0170SS1 = iframe.contentDocument.querySelector(
                            'select[name="value(GG0170SS1)"]'
                          );

                          let m1800C0 = iframe.contentDocument.getElementById(
                            "M1800_CRNT0_GROOMING"
                          );
                          let m1800C1 = iframe.contentDocument.getElementById(
                            "M1800_CRNT1_GROOMING"
                          );
                          let m1800C2 = iframe.contentDocument.getElementById(
                            "M1800_CRNT2_GROOMING"
                          );
                          let m1800C3 = iframe.contentDocument.getElementById(
                            "M1800_CRNT3_GROOMING"
                          );

                          let m1810D0 = iframe.contentDocument.getElementById(
                            "M1810_CRNT_DRESS0_UPPER"
                          );
                          let m1810D1 = iframe.contentDocument.getElementById(
                            "M1810_CRNT_DRESS1_UPPER"
                          );
                          let m1810D2 = iframe.contentDocument.getElementById(
                            "M1810_CRNT_DRESS2_UPPER"
                          );
                          let m1810D3 = iframe.contentDocument.getElementById(
                            "M1810_CRNT_DRESS3_UPPER"
                          );

                          let m1820D0 = iframe.contentDocument.getElementById(
                            "M1820_CRNT_DRESS0_LOWER"
                          );
                          let m1820D1 = iframe.contentDocument.getElementById(
                            "M1820_CRNT_DRESS1_LOWER"
                          );
                          let m1820D2 = iframe.contentDocument.getElementById(
                            "M1820_CRNT_DRESS2_LOWER"
                          );
                          let m1820D3 = iframe.contentDocument.getElementById(
                            "M1820_CRNT_DRESS3_LOWER"
                          );

                          let m1830B0 =
                            iframe.contentDocument.getElementById(
                              "M1830_CRNT0_BATHG"
                            );
                          let m1830B1 =
                            iframe.contentDocument.getElementById(
                              "M1830_CRNT1_BATHG"
                            );
                          let m1830B2 =
                            iframe.contentDocument.getElementById(
                              "M1830_CRNT2_BATHG"
                            );
                          let m1830B5 =
                            iframe.contentDocument.getElementById(
                              "M1830_CRNT5_BATHG"
                            );
                          let m1830B6 =
                            iframe.contentDocument.getElementById(
                              "M1830_CRNT6_BATHG"
                            );

                          let m1840T0 =
                            iframe.contentDocument.getElementById(
                              "M1840_CRNT0_TOILTG"
                            );
                          let m1840T1 =
                            iframe.contentDocument.getElementById(
                              "M1840_CRNT1_TOILTG"
                            );
                          let m1840T4 =
                            iframe.contentDocument.getElementById(
                              "M1840_CRNT4_TOILTG"
                            );
                          let m1840T3 =
                            iframe.contentDocument.getElementById(
                              "M1840_CRNT3_TOILTG"
                            );

                          let m1845T0 = iframe.contentDocument.getElementById(
                            "M1845_CRNT_TOILTG0_HYGN"
                          );
                          let m1845T1 = iframe.contentDocument.getElementById(
                            "M1845_CRNT_TOILTG1_HYGN"
                          );
                          let m1845T2 = iframe.contentDocument.getElementById(
                            "M1845_CRNT_TOILTG2_HYGN"
                          );
                          let m1845T3 = iframe.contentDocument.getElementById(
                            "M1845_CRNT_TOILTG3_HYGN"
                          );

                          let m1850T0 = iframe.contentDocument.getElementById(
                            "M1850_CRNT0_TRNSFRNG"
                          );
                          let m1850T1 = iframe.contentDocument.getElementById(
                            "M1850_CRNT1_TRNSFRNG"
                          );
                          let m1850T3 = iframe.contentDocument.getElementById(
                            "M1850_CRNT3_TRNSFRNG"
                          );
                          let m1850T4 = iframe.contentDocument.getElementById(
                            "M1850_CRNT4_TRNSFRNG"
                          );

                          let m1860A0 =
                            iframe.contentDocument.getElementById(
                              "M1860_CRNT0_AMBLTN"
                            );
                          let m1860A1 =
                            iframe.contentDocument.getElementById(
                              "M1860_CRNT1_AMBLTN"
                            );
                          let m1860A2 =
                            iframe.contentDocument.getElementById(
                              "M1860_CRNT2_AMBLTN"
                            );
                          let m1860A5 =
                            iframe.contentDocument.getElementById(
                              "M1860_CRNT5_AMBLTN"
                            );
                          let m1860A6 =
                            iframe.contentDocument.getElementById(
                              "M1860_CRNT6_AMBLTN"
                            );

                          let weightBearing =
                            iframe.contentDocument.getElementById(
                              "mus_Weight_Chk"
                            );
                          let decreasedRom =
                            iframe.contentDocument.getElementById(
                              "mus_DecreasedRom_Chk"
                            );
                          let shuffling =
                            iframe.contentDocument.getElementById(
                              "mus_Shuffling_Chk"
                            );
                          let weakness =
                            iframe.contentDocument.getElementById(
                              "mus_Weakness_Chk"
                            );
                          let noDeficits =
                            iframe.contentDocument.getElementById(
                              "mus_NoDeficits_Chk"
                            );

                          gg0170A1.value = "06";
                          gg0170B1.value = "06";
                          gg0170C1.value = "06";
                          gg0170D1.value = "06";
                          gg0170E1.value = "06";
                          gg0170F1.value = "06";
                          gg0170G1.value = "06";
                          gg0170I1.value = "06";
                          gg0170J1.value = "06";
                          gg0170K1.value = "06";
                          gg0170L1.value = "06";
                          gg0170M1.value = "06";
                          gg0170N1.value = "06";
                          gg0170O1.value = "06";
                          gg0170P1.value = "06";
                          gg0170Q1.value = "0";
                          gg0170R1.value = "";
                          gg0170RR1.value = "";
                          gg0170S1.value = "";
                          gg0170SS1.value = "";

                          m1800C0.checked = true;
                          m1810D0.checked = true;
                          m1820D0.checked = true;
                          m1830B0.checked = true;
                          m1840T0.checked = true;
                          m1845T0.checked = true;
                          m1850T0.checked = true;
                          m1860A0.checked = true;

                          weightBearing.checked = false;
                          decreasedRom.checked = false;
                          shuffling.checked = false;
                          weakness.checked = false;
                          noDeficits.checked = true;

                          if (options.adls) {
                            if (options.adls == "1") {
                              gg0170A1.value = "05";
                              gg0170B1.value = "05";
                              gg0170C1.value = "05";
                              gg0170D1.value = "05";
                              gg0170E1.value = "05";
                              gg0170F1.value = "05";
                              gg0170G1.value = "05";
                              gg0170I1.value = "05";
                              gg0170J1.value = "05";
                              gg0170K1.value = "05";
                              gg0170L1.value = "05";
                              gg0170M1.value = "05";
                              gg0170N1.value = "05";
                              gg0170O1.value = "05";
                              gg0170P1.value = "05";
                              gg0170Q1.value = "0";

                              m1800C1.checked = true;
                              m1810D1.checked = true;
                              m1820D1.checked = true;
                              m1830B1.checked = true;
                              m1840T1.checked = true;
                              m1845T1.checked = true;
                              m1850T1.checked = true;
                              m1860A1.checked = true;

                              weightBearing.checked = false;
                              decreasedRom.checked = false;
                              shuffling.checked = true;
                              weakness.checked = true;
                              noDeficits.checked = false;
                            } else if (options.adls == "2") {
                              gg0170A1.value = "03";
                              gg0170B1.value = "03";
                              gg0170C1.value = "03";
                              gg0170D1.value = "03";
                              gg0170E1.value = "03";
                              gg0170F1.value = "03";
                              gg0170G1.value = "03";
                              gg0170I1.value = "03";
                              gg0170J1.value = "03";
                              gg0170K1.value = "03";
                              gg0170L1.value = "88";
                              gg0170M1.value = "88";
                              gg0170N1.value = "88";
                              gg0170O1.value = "05";
                              gg0170P1.value = "88";
                              gg0170Q1.value = "0";

                              m1800C2.checked = true;
                              m1810D2.checked = true;
                              m1820D2.checked = true;
                              m1830B2.checked = true;
                              m1840T1.checked = true;
                              m1845T2.checked = true;
                              m1850T1.checked = true;
                              m1860A2.checked = true;

                              weightBearing.checked = false;
                              decreasedRom.checked = false;
                              shuffling.checked = true;
                              weakness.checked = true;
                              noDeficits.checked = false;
                            } else if (options.adls == "3") {
                              gg0170A1.value = "01";
                              gg0170B1.value = "02";
                              gg0170C1.value = "02";
                              gg0170D1.value = "01";
                              gg0170E1.value = "01";
                              gg0170F1.value = "01";
                              gg0170G1.value = "01";
                              gg0170I1.value = "88";
                              gg0170J1.value = "88";
                              gg0170K1.value = "88";
                              gg0170L1.value = "88";
                              gg0170M1.value = "88";
                              gg0170N1.value = "";
                              gg0170O1.value = "";
                              gg0170P1.value = "88";
                              gg0170Q1.value = "1";
                              gg0170R1.value = "01";
                              gg0170RR1.value = "1";
                              gg0170S1.value = "01";
                              gg0170SS1.value = "1";

                              m1800C3.checked = true;
                              m1810D2.checked = true;
                              m1820D3.checked = true;
                              m1830B5.checked = true;
                              m1840T3.checked = true;
                              m1845T3.checked = true;
                              m1850T3.checked = true;
                              m1860A5.checked = true;

                              weightBearing.checked = true;
                              decreasedRom.checked = false;
                              shuffling.checked = false;
                              weakness.checked = true;
                              noDeficits.checked = false;
                            } else if (options.adls == "4") {
                              gg0170A1.value = "01";
                              gg0170B1.value = "01";
                              gg0170C1.value = "01";
                              gg0170D1.value = "88";
                              gg0170E1.value = "88";
                              gg0170F1.value = "88";
                              gg0170G1.value = "88";
                              gg0170I1.value = "88";
                              gg0170J1.value = "88";
                              gg0170K1.value = "88";
                              gg0170L1.value = "88";
                              gg0170M1.value = "88";
                              gg0170N1.value = "06";
                              gg0170O1.value = "06";
                              gg0170P1.value = "88";
                              gg0170Q1.value = "0";
                              gg0170R1.value = "";
                              gg0170RR1.value = "";
                              gg0170S1.value = "";
                              gg0170SS1.value = "";

                              m1800C3.checked = true;
                              m1810D3.checked = true;
                              m1820D3.checked = true;
                              m1830B6.checked = true;
                              m1840T4.checked = true;
                              m1845T3.checked = true;
                              m1850T4.checked = true;
                              m1860A6.checked = true;

                              weightBearing.checked = false;
                              decreasedRom.checked = true;
                              shuffling.checked = false;
                              weakness.checked = true;
                              noDeficits.checked = false;
                            }
                          }

                          iframe.contentDocument
                            .getElementById("pageNum11")
                            .click();
                          var page11Interval = setInterval(() => {
                            let m1870 = iframe.contentDocument.getElementById(
                              "M1870_CRNT0_FEEDING"
                            );

                            if (m1870 != null) {
                              let m1870F0 =
                                iframe.contentDocument.getElementById(
                                  "M1870_CRNT0_FEEDING"
                                );
                              let m1870F1 =
                                iframe.contentDocument.getElementById(
                                  "M1870_CRNT1_FEEDING"
                                );
                              let m1870F2 =
                                iframe.contentDocument.getElementById(
                                  "M1870_CRNT2_FEEDING"
                                );
                              let m1870F4 =
                                iframe.contentDocument.getElementById(
                                  "M1870_CRNT4_FEEDING"
                                );

                              let m2001Drug =
                                iframe.contentDocument.getElementById(
                                  "M2001_DRUG_RGMN0_RVW"
                                );

                              let m2020M0 =
                                iframe.contentDocument.getElementById(
                                  "M2020_CRNT_MGMT_ORAL0_MDCTN"
                                );
                              let m2020M1 =
                                iframe.contentDocument.getElementById(
                                  "M2020_CRNT_MGMT_ORAL1_MDCTN"
                                );
                              let m2020M3 =
                                iframe.contentDocument.getElementById(
                                  "M2020_CRNT_MGMT_ORAL3_MDCTN"
                                );

                              let noInjection =
                                iframe.contentDocument.getElementById(
                                  "M2030_CRNT_MGMT_INJCTN4_MDCTN"
                                );
                              let patPreMedYes =
                                iframe.contentDocument.getElementById(
                                  "mem_PrescribedMedicationsyes_Rdo"
                                );
                              let manageMedYes =
                                iframe.contentDocument.getElementById(
                                  "mem_ManageMedicationsyes_Rdo"
                                );
                              let currentPreNo =
                                iframe.contentDocument.getElementById(
                                  "mem_CurrentPrescribedNo_Rdo"
                                );

                              let medStorage =
                                iframe.contentDocument.getElementById(
                                  "mem_Storage_Chk"
                                );
                              let medDisp =
                                iframe.contentDocument.getElementById(
                                  "mem_Disposal_Chk"
                                );
                              let medExpir =
                                iframe.contentDocument.getElementById(
                                  "mem_Expirationdates_Chk"
                                );

                              m2001Drug.checked = true;
                              m1870F0.checked = true;
                              m2020M0.checked = true;
                              noInjection.checked = true;
                              patPreMedYes.checked = true;
                              manageMedYes.checked = true;
                              currentPreNo.checked = true;
                              medStorage.checked = true;
                              medDisp.checked = true;
                              medExpir.checked = true;

                              if (options.adls) {
                                if (options.adls == "1") {
                                  m1870F1.checked = true;
                                  m2020M0.checked = true;
                                } else if (options.adls == "2") {
                                  m1870F1.checked = true;
                                  m2020M1.checked = true;
                                } else if (options.adls == "3") {
                                  m1870F1.checked = true;
                                  m2020M1.checked = true;
                                } else if (options.adls == "4") {
                                  m1870F2.checked = true;
                                  m2020M3.checked = true;
                                }
                              }

                              if (options.diagnosis) {
                                if (options.diagnosis == "ogtube") {
                                  m1870F4.checked = true;
                                }
                              }

                              iframe.contentDocument
                                .getElementById("pageNum12")
                                .click();

                              var page12Interval = setInterval(() => {
                                let fSuperVisionNonAgency =
                                  iframe.contentDocument.getElementById(
                                    "M2102_CARE_TYPE_SRC_SPRVSN2"
                                  );

                                if (fSuperVisionNonAgency != null) {
                                  fSuperVisionNonAgency.checked = true;

                                  iframe.contentDocument.getElementById(
                                    "prc_PrimaryFinancial_Chk"
                                  ).checked = true;
                                  iframe.contentDocument.getElementById(
                                    "prc_PrimaryADLs_Chk"
                                  ).checked = true;
                                  iframe.contentDocument.getElementById(
                                    "prc_PrimaryMedica_Chk"
                                  ).checked = true;
                                  iframe.contentDocument.getElementById(
                                    "prc_PrimaryHome_Chk"
                                  ).checked = true;
                                  iframe.contentDocument.getElementById(
                                    "M2200_THER_NEED_NA_NO"
                                  ).checked = true;

                                  iframe.contentDocument.getElementById(
                                    "ris_RiskAssessment3_Chk"
                                  ).checked = true;
                                  iframe.contentDocument.getElementById(
                                    "ris_RiskAssessment5_Chk"
                                  ).checked = true;
                                  iframe.contentDocument.getElementById(
                                    "ris_RiskAssessment7_Chk"
                                  ).checked = true;
                                  iframe.contentDocument.getElementById(
                                    "ris_RiskAssessment9_Chk"
                                  ).checked = true;
                                  iframe.contentDocument.getElementById(
                                    "M2200_THER_NEED_NA_NO"
                                  ).checked = true;

                                  iframe.contentDocument
                                    .getElementById("pageNum13")
                                    .click();

                                  var page13Interval = setInterval(() => {
                                    let page13 =
                                      iframe.contentDocument.getElementById(
                                        "ins_InstructMaterial1_Chk"
                                      );

                                    if (page13 != null) {
                                      iframe.contentDocument.getElementById(
                                        "ins_InstructMaterial1_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "ins_InstructMaterial9_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "ins_InstructMaterial13_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "ins_InstructMaterial2_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "ins_InstructMaterial8_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "ins_InstructMaterial10_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "ins_InstructMaterial3_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "ins_InstructMaterial5_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "ins_InstructMaterial11_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "ins_InstructMaterial15_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "ins_InstructMaterial4_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "ins_InstructMaterial6_Chk"
                                      ).checked = true;

                                      iframe.contentDocument.getElementById(
                                        "care_PatientRepCare_Chk"
                                      ).checked = true;

                                      iframe.contentDocument.getElementById(
                                        "care_Physician_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "care_CaseMgr_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "care_ClinicalSn_Chk"
                                      ).checked = true;
                                      iframe.contentDocument.getElementById(
                                        "care_ChangesMade_Chk"
                                      ).checked = true;

                                      iframe.contentDocument
                                        .getElementById("pageNum7")
                                        .click();

                                      var page7Interval = setInterval(() => {
                                        let m1306 =
                                          iframe.contentDocument.getElementById(
                                            "M1306_UNHLD_STG2_PRSR_ULCR_0"
                                          );
                                        if (m1306 != null) {
                                          m1306.checked = true;
                                          iframe.contentDocument.getElementById(
                                            "M1322_NBR_PRSULC_STG10"
                                          ).checked = true;
                                          iframe.contentDocument.getElementById(
                                            "M1324_STG_PRBLM_ULCER5"
                                          ).checked = true;
                                          iframe.contentDocument.getElementById(
                                            "M1330_STAS_ULCR_PRSNT0"
                                          ).checked = true;
                                          iframe.contentDocument.getElementById(
                                            "M1340_SRGCL_WND_PRSNT0"
                                          ).checked = true;

                                          iframe.contentDocument
                                            .getElementById("pageNum8")
                                            .click();

                                          var page8Interval = setInterval(
                                            () => {
                                              let resp =
                                                iframe.contentDocument.getElementById(
                                                  "reh_Asthma_Chk"
                                                );
                                              if (resp != null) {
                                                iframe.contentDocument.getElementById(
                                                  "M1400_WHEN_DYSPNEIC1"
                                                ).checked = true;

                                                if (options.diagnosis) {
                                                  if (
                                                    options.diagnosis == "chf"
                                                  ) {
                                                    iframe.contentDocument.getElementById(
                                                      "M1400_WHEN_DYSPNEIC3"
                                                    ).checked = true;
                                                  }
                                                }

                                                iframe.contentDocument.getElementById(
                                                  "cah_Hypertension_Chk"
                                                ).checked = true;
                                                iframe.contentDocument.getElementById(
                                                  "crd_NorHeartSnd_Chk"
                                                ).checked = true;
                                                iframe.contentDocument.getElementById(
                                                  "crd_CapillaryRef_Chk"
                                                ).checked = true;
                                                iframe.contentDocument.getElementById(
                                                  "crd_RefLess3_Rdo"
                                                ).checked = true;

                                                iframe.contentDocument.getElementById(
                                                  "M1600_UTI0"
                                                ).checked = true;
                                                iframe.contentDocument.getElementById(
                                                  "M1610_UR_INCONT0"
                                                ).checked = true;
                                                iframe.contentDocument.getElementById(
                                                  "M1610_UR_INCONT2"
                                                ).checked = true;

                                                iframe.contentDocument.getElementById(
                                                  "lbd_Formed_Chk"
                                                ).checked = true;
                                                iframe.contentDocument.getElementById(
                                                  "lbd_Normal_Chk"
                                                ).checked = true;
                                                iframe.contentDocument.getElementById(
                                                  "M1620_BWL0_INCONT"
                                                ).checked = true;
                                                iframe.contentDocument.getElementById(
                                                  "M1630_OSTOMY0"
                                                ).checked = true;
                                                iframe.contentDocument.getElementById(
                                                  "lbd_Formed_Chk"
                                                ).checked = true;

                                                clearInterval(page8Interval);
                                                clearInterval(page7Interval);
                                                clearInterval(page13Interval);
                                                clearInterval(page12Interval);
                                                clearInterval(page11Interval);
                                                clearInterval(page10Interval);
                                                clearInterval(cognitiveIntId);
                                                clearInterval(
                                                  envSafetyInterval
                                                );

                                                clearInterval(intervalIdM1028);
                                                clearInterval(intervalId);
                                                location.reload();
                                              }
                                            },
                                            500
                                          );
                                        }
                                      }, 500);
                                    }
                                  }, 500);
                                }
                              }, 500);
                            }
                          }, 500);
                        }
                      }, 500);
                    }
                  }, 500);
                }
              }, 500);
            }
          }, 500);
        }
      }, 500);

      // }
    } else {
      let currentPaymentSource = document.querySelector(
        'input[name="value(M0150_CPAY_MCARE_HMO)"]'
      );
      currentPaymentSource.checked = true;
      //callSubmitPage();
    }
  } else if (options.project == "project3") {
    let currentPaymentSource = document.getElementById(
      "M0150_CPAY_MCARE_HMO_key"
    );
    if (currentPaymentSource !== null) {
      currentPaymentSource.checked = true;
      currentPaymentSource.dispatchEvent(
        new Event("change", { bubbles: true })
      );
      const anchorTags = [...document.querySelectorAll(".pages a")].filter(
        (a) => /\d/.test(a.textContent)
      );
      anchorTags[1].click();
      var page2Interval = setInterval(() => {
        let insuranceCard = document.getElementById("pti_InsCard_Chk_key");
        if (insuranceCard != null) {
          let pti_PtAddressConf_Chk_key = document.getElementById(
            "pti_PtAddressConf_Chk_key"
          );
          insuranceCard.checked = true;
          insuranceCard.dispatchEvent(new Event("change", { bubbles: true }));
          if (pti_PtAddressConf_Chk_key != null) {
            pti_PtAddressConf_Chk_key.checked = true;
            pti_PtAddressConf_Chk_key.dispatchEvent(
              new Event("change", { bubbles: true })
            );
          }

          let A1110B_0 = document.getElementById("A1110B_0");
          if (A1110B_0 != null) {
            A1110B_0.checked = true;
            A1110B_0.dispatchEvent(new Event("change", { bubbles: true }));
          }

          let M0102_PHYSN_ORDRD_SOCROC_DT_NA_key = document.getElementById(
            "M0102_PHYSN_ORDRD_SOCROC_DT_NA_key"
          );
          if (M0102_PHYSN_ORDRD_SOCROC_DT_NA_key != null) {
            M0102_PHYSN_ORDRD_SOCROC_DT_NA_key.checked = true;
            M0102_PHYSN_ORDRD_SOCROC_DT_NA_key.dispatchEvent(
              new Event("change", { bubbles: true })
            );
          }

          if (options.home == "assisted") {
            let A1250C_key = document.getElementById("A1250C_key");
            if (A1250C_key != null) {
              A1250C_key.checked = true;
              A1250C_key.dispatchEvent(new Event("change", { bubbles: true }));
            }
          }
          const anchorTags = [...document.querySelectorAll(".pages a")].filter(
            (a) => /\d/.test(a.textContent)
          );
          anchorTags[3].click();
          var page4Interval = setInterval(() => {
            let M1100_PTNT_LVG_STUTN_11 = document.getElementById(
              "M1100_PTNT_LVG_STUTN_11"
            );
            if (M1100_PTNT_LVG_STUTN_11 != null) {
              if (options.home == "assisted") {
                M1100_PTNT_LVG_STUTN_11.checked = true;
                M1100_PTNT_LVG_STUTN_11.dispatchEvent(
                  new Event("change", { bubbles: true })
                );
              }
              let M2102_CARE_TYPE_SRC_SPRVSN2_0_02 = document.getElementById(
                "M2102_CARE_TYPE_SRC_SPRVSN2_0_02"
              );
              if (M2102_CARE_TYPE_SRC_SPRVSN2_0_02 != null) {
                M2102_CARE_TYPE_SRC_SPRVSN2_0_02.checked = true;
                M2102_CARE_TYPE_SRC_SPRVSN2_0_02.dispatchEvent(
                  new Event("change", { bubbles: true })
                );
              }

              let prc_PrimaryADLs_Chk_key = document.getElementById(
                "prc_PrimaryADLs_Chk_key"
              );
              if (prc_PrimaryADLs_Chk_key != null) {
                prc_PrimaryADLs_Chk_key.checked = true;
                prc_PrimaryADLs_Chk_key.dispatchEvent(
                  new Event("change", { bubbles: true })
                );
              }

              let psy_PatientReady_Chk_key = document.getElementById(
                "psy_PatientReady_Chk_key"
              );
              if (psy_PatientReady_Chk_key != null) {
                psy_PatientReady_Chk_key.checked = true;
                psy_PatientReady_Chk_key.dispatchEvent(
                  new Event("change", { bubbles: true })
                );
              }

              let psy_CaregiverReady_Chk_key = document.getElementById(
                "psy_CaregiverReady_Chk_key"
              );
              if (psy_CaregiverReady_Chk_key != null) {
                psy_CaregiverReady_Chk_key.checked = true;
                psy_CaregiverReady_Chk_key.dispatchEvent(
                  new Event("change", { bubbles: true })
                );
              }

              let sah_NoHazardsIdentified_Chk_key = document.getElementById(
                "sah_NoHazardsIdentified_Chk_key"
              );
              if (sah_NoHazardsIdentified_Chk_key != null) {
                sah_NoHazardsIdentified_Chk_key.checked = true;
                sah_NoHazardsIdentified_Chk_key.dispatchEvent(
                  new Event("change", { bubbles: true })
                );
              }

              let Yes1p_1 = document.getElementById("Yes1p_1");
              if (Yes1p_1 != null) {
                Yes1p_1.checked = true;
                Yes1p_1.dispatchEvent(new Event("change", { bubbles: true }));
              }

              let Yes2p_1 = document.getElementById("Yes2p_1");
              if (Yes2p_1 != null) {
                Yes2p_1.checked = true;
                Yes2p_1.dispatchEvent(new Event("change", { bubbles: true }));
              }

              let Yes3p_1 = document.getElementById("Yes3p_1");
              if (Yes3p_1 != null) {
                Yes3p_1.checked = true;
                Yes3p_1.dispatchEvent(new Event("change", { bubbles: true }));
              }

              let Yes4p_1 = document.getElementById("Yes4p_1");
              if (Yes4p_1 != null) {
                Yes4p_1.checked = true;
                Yes4p_1.dispatchEvent(new Event("change", { bubbles: true }));
              }

              let Yes5p_1 = document.getElementById("Yes5p_1");
              if (Yes5p_1 != null) {
                Yes5p_1.checked = true;
                Yes5p_1.dispatchEvent(new Event("change", { bubbles: true }));
              }

              let Yes6p_1 = document.getElementById("Yes6p_1");
              if (Yes6p_1 != null) {
                Yes6p_1.checked = true;
                Yes6p_1.dispatchEvent(new Event("change", { bubbles: true }));
              }

              let emp_NaturalDisaster_Rdo_1 = document.getElementById(
                "emp_NaturalDisaster_Rdo_1"
              );
              if (emp_NaturalDisaster_Rdo_1 != null) {
                emp_NaturalDisaster_Rdo_1.checked = true;
                emp_NaturalDisaster_Rdo_1.dispatchEvent(
                  new Event("change", { bubbles: true })
                );
              }

              if (options.precautions.includes("oxygen")) {
                let Yes7p_1 = document.getElementById("Yes7p_1");
                let emp_BackupOxygen_Rdo_1 = document.getElementById(
                  "emp_BackupOxygen_Rdo_1"
                );
                if (Yes7p_1 != null) {
                  Yes7p_1.checked = true;
                  Yes7p_1.dispatchEvent(new Event("change", { bubbles: true }));
                }
                if (emp_BackupOxygen_Rdo_1 != null) {
                  emp_BackupOxygen_Rdo_1.checked = true;
                  emp_BackupOxygen_Rdo_1.dispatchEvent(
                    new Event("change", { bubbles: true })
                  );
                }
              } else {
                let Yes7p_2 = document.getElementById("Yes7p_2");
                if (Yes7p_2 != null) {
                  Yes7p_2.checked = true;
                  Yes7p_2.dispatchEvent(new Event("change", { bubbles: true }));
                }
                let emp_BackupOxygen_Rdo_2 = document.getElementById(
                  "emp_BackupOxygen_Rdo_2"
                );
                if (emp_BackupOxygen_Rdo_2 != null) {
                  emp_BackupOxygen_Rdo_2.checked = true;
                  emp_BackupOxygen_Rdo_2.dispatchEvent(
                    new Event("change", { bubbles: true })
                  );
                }
              }

              //Priority/Disaster Code:
              // const item = document.querySelector(
              //   '.choices__item[data-value="2"]'
              // );
              // if(item){

              //   item.setAttribute("aria-selected", "true"); // Ensures the item is selected
              //   item.setAttribute("data-value", "2"); // Ensures the value remains set
              // }

              //Safety Measures

              if (options.adls == "1") {
                let eqc_Cane_Chk_key =
                  document.getElementById("eqc_Cane_Chk_key");
                if (eqc_Cane_Chk_key != null) {
                  eqc_Cane_Chk_key.checked = true;
                  eqc_Cane_Chk_key.dispatchEvent(
                    new Event("change", { bubbles: true })
                  );
                }
              }
              if (options.adls == "2") {
                let eqc_Wheelchair_Chk_key = document.getElementById(
                  "eqc_Wheelchair_Chk_key"
                );
                if (eqc_Wheelchair_Chk_key != null) {
                  eqc_Wheelchair_Chk_key.checked = true;
                  eqc_Wheelchair_Chk_key.dispatchEvent(
                    new Event("change", { bubbles: true })
                  );
                }
              }
              if (options.adls == "3") {
                let eqc_Wheelchair_Chk_key = document.getElementById(
                  "eqc_Wheelchair_Chk_key"
                );
                if (eqc_Wheelchair_Chk_key != null) {
                  eqc_Wheelchair_Chk_key.checked = true;
                  eqc_Wheelchair_Chk_key.dispatchEvent(
                    new Event("change", { bubbles: true })
                  );
                }
              }
              if (options.adls == "4") {
                let eqc_Wheelchair_Chk_key = document.getElementById(
                  "eqc_Wheelchair_Chk_key"
                );
                if (eqc_Wheelchair_Chk_key != null) {
                  eqc_Wheelchair_Chk_key.checked = true;
                  eqc_Wheelchair_Chk_key.dispatchEvent(
                    new Event("change", { bubbles: true })
                  );
                }
              }
              const anchorTags = [
                ...document.querySelectorAll(".pages a"),
              ].filter((a) => /\d/.test(a.textContent));
              anchorTags[4].click();
              var page5Interval = setInterval(() => {
                let B0200_0 = document.getElementById("B0200_0");
                if (B0200_0 != null) {
                  B0200_0.checked = true;
                  B0200_0.dispatchEvent(new Event("change", { bubbles: true }));

                  let B1000_0 = document.getElementById("B1000_0");
                  if (B1000_0 != null) {
                    B1000_0.checked = true;
                    B1000_0.dispatchEvent(
                      new Event("change", { bubbles: true })
                    );
                  }

                  if (options.mental == "aaox4") {
                    let B1300_2 = document.getElementById("B1300_2");
                    if (B1300_2 != null) {
                      B1300_2.checked = true;
                      B1300_2.dispatchEvent(
                        new Event("change", { bubbles: true })
                      );
                    }
                  }
                  if (options.mental == "forgetful") {
                    let B1300_2 = document.getElementById("B1300_2");
                    if (B1300_2 != null) {
                      B1300_2.checked = true;
                      B1300_2.dispatchEvent(
                        new Event("change", { bubbles: true })
                      );
                    }
                  }
                  if (options.mental == "unable") {
                    let B1300_8 = document.getElementById("B1300_8");
                    if (B1300_8 != null) {
                      B1300_8.checked = true;
                      B1300_8.dispatchEvent(
                        new Event("change", { bubbles: true })
                      );
                    }
                  }
                  const anchorTags = [
                    ...document.querySelectorAll(".pages a"),
                  ].filter((a) => /\d/.test(a.textContent));
                  anchorTags[5].click();
                  var page6Interval = setInterval(() => {
                    let C0100_0 = document.getElementById("C0100_0");
                    if (C0100_0 != null) {
                      if (options.mental == "unable") {
                        C0100_0.checked = true;
                        C0100_0.dispatchEvent(
                          new Event("change", { bubbles: true })
                        );
                      }
                      if (options.mental == "aaox4") {
                        let C0200_3 = document.getElementById("C0200_3");
                        if (C0200_3 != null) {
                          C0200_3.checked = true;
                          C0200_3.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0100_1 = document.getElementById("C0100_1");
                        if (C0100_1 != null) {
                          C0100_1.checked = true;
                          C0100_1.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0300A_3 = document.getElementById("C0300A_3");
                        if (C0300A_3 != null) {
                          C0300A_3.checked = true;
                          C0300A_3.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0300B_2 = document.getElementById("C0300B_2");
                        if (C0300B_2 != null) {
                          C0300B_2.checked = true;
                          C0300B_2.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0300C_1 = document.getElementById("C0300C_1");
                        if (C0300C_1 != null) {
                          C0300C_1.checked = true;
                          C0300C_1.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0400A_2 = document.getElementById("C0400A_2");
                        if (C0400A_2 != null) {
                          C0400A_2.checked = true;
                          C0400A_2.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0400B_2 = document.getElementById("C0400B_2");
                        if (C0400B_2 != null) {
                          C0400B_2.checked = true;
                          C0400B_2.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0400C_2 = document.getElementById("C0400C_2");
                        if (C0400C_2 != null) {
                          C0400C_2.checked = true;
                          C0400C_2.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }
                      }
                      if (options.mental == "forgetful") {
                        let C0100_1 = document.getElementById("C0100_1");
                        if (C0100_1 != null) {
                          C0100_1.checked = true;
                          C0100_1.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0200_2 = document.getElementById("C0200_2");
                        if (C0200_2 != null) {
                          C0200_2.checked = true;
                          C0200_2.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0300A_2 = document.getElementById("C0300A_2");
                        if (C0300A_2 != null) {
                          C0300A_2.checked = true;
                          C0300A_2.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0300B_1 = document.getElementById("C0300B_1");
                        if (C0300B_1 != null) {
                          C0300B_1.checked = true;
                          C0300B_1.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0300C_0 = document.getElementById("C0300C_0");
                        if (C0300C_0 != null) {
                          C0300C_0.checked = true;
                          C0300C_0.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0400A_1 = document.getElementById("C0400A_1");
                        if (C0400A_1 != null) {
                          C0400A_1.checked = true;
                          C0400A_1.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0400B_1 = document.getElementById("C0400B_1");
                        if (C0400B_1 != null) {
                          C0400B_1.checked = true;
                          C0400B_1.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }

                        let C0400C_1 = document.getElementById("C0400C_1");
                        if (C0400C_1 != null) {
                          C0400C_1.checked = true;
                          C0400C_1.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }
                      }

                      // if(options.mental=="forgetful"){
                      //   let C0200_2=document.getElementById("C0200_2")
                      //   if(C0200_2!=null){
                      //     C0200_2.checked=true
                      //   }
                      // }else if(options.mental=="aaox4"){
                      //   let C0200_3=document.getElementById("C0200_3")
                      //   if(C0200_3!=null){
                      //     C0200_3.checked=true
                      //   }
                      // }

                      // if(options.mental=="forgetful"){
                      //   let C0300A_2=document.getElementById("C0300A_2")
                      //   if(C0300A_2!=null){
                      //     C0300A_2.checked=true
                      //   }
                      // }else if(options.mental=="aaox4"){
                      //   let C0300A_3=document.getElementById("C0300A_3")
                      //   if(C0300A_3!=null){
                      //     C0300A_3.checked=true
                      //   }
                      // }
                      const anchorTags = [
                        ...document.querySelectorAll(".pages a"),
                      ].filter((a) => /\d/.test(a.textContent));
                      anchorTags[6].click();
                      var page7Interval = setInterval(() => {
                        //History of

                        let neh_MemoryLoss_Chk_key = document.getElementById(
                          "neh_MemoryLoss_Chk_key"
                        );
                        let neh_Dementia_Chk_key = document.getElementById(
                          "neh_Dementia_Chk_key"
                        );
                        let neh_Parkinson_Chk_key = document.getElementById(
                          "neh_Parkinson_Chk_key"
                        );
                        let neh_HistoryMs_Chk_key = document.getElementById(
                          "neh_HistoryMs_Chk_key"
                        );
                        let neh_Seizures_Chk_key = document.getElementById(
                          "neh_Seizures_Chk_key"
                        );
                        let neh_HistoryTia_Chk_key = document.getElementById(
                          "neh_HistoryTia_Chk_key"
                        );
                        let neh_Traumatic_Chk_key = document.getElementById(
                          "neh_Traumatic_Chk_key"
                        );
                        let neh_Psychiatric_Chk_key = document.getElementById(
                          "neh_Psychiatric_Chk_key"
                        );
                        let neh_Stroke_Chk_key =
                          document.getElementById("neh_Stroke_Chk_key");
                        let neh_HisOther_Chk_key = document.getElementById(
                          "neh_HisOther_Chk_key"
                        );
                        let neh_NoHistory_Chk_key = document.getElementById(
                          "neh_NoHistory_Chk_key"
                        );
                        let neu_Pupillary_Chk_key = document.getElementById(
                          "neu_Pupillary_Chk_key"
                        );
                        let neu_Loss_Chk_key =
                          document.getElementById("neu_Loss_Chk_key");
                        let neu_Dizzy_Chk_key =
                          document.getElementById("neu_Dizzy_Chk_key");
                        let neu_Spasms_Chk_key =
                          document.getElementById("neu_Spasms_Chk_key");
                        let neu_Forgetful_Chk_key = document.getElementById(
                          "neu_Forgetful_Chk_key"
                        );
                        let neu_Tremors_Chk_key = document.getElementById(
                          "neu_Tremors_Chk_key"
                        );
                        let neu_Slurred_Chk_key = document.getElementById(
                          "neu_Slurred_Chk_key"
                        );
                        let neu_Cognition_Chk_key = document.getElementById(
                          "neu_Cognition_Chk_key"
                        );
                        let neu_Numbness_Chk_key = document.getElementById(
                          "neu_Numbness_Chk_key"
                        );
                        let neu_Facial_Chk_key =
                          document.getElementById("neu_Facial_Chk_key");
                        let neu_Speech_Chk_key =
                          document.getElementById("neu_Speech_Chk_key");
                        let neu_Mood_Chk_key =
                          document.getElementById("neu_Mood_Chk_key");
                        let neu_Headache_Chk_key = document.getElementById(
                          "neu_Headache_Chk_key"
                        );
                        let neu_Weakness_Chk_key = document.getElementById(
                          "neu_Weakness_Chk_key"
                        );
                        let neu_WeaknessR_Chk_key = document.getElementById(
                          "neu_WeaknessR_Chk_key"
                        );
                        let neu_WeaknessL_Chk_key = document.getElementById(
                          "neu_WeaknessL_Chk_key"
                        );
                        let neu_HandR_Chk_key =
                          document.getElementById("neu_HandR_Chk_key");
                        let neu_HandL_Chk_key =
                          document.getElementById("neu_HandL_Chk_key");
                        let neu_Strong_Chk_key =
                          document.getElementById("neu_Strong_Chk_key");
                        let neu_Weak_Chk_key =
                          document.getElementById("neu_Weak_Chk_key");
                        let neu_Equal_Chk_key =
                          document.getElementById("neu_Equal_Chk_key");
                        let neu_Unequal_Chk_key = document.getElementById(
                          "neu_Unequal_Chk_key"
                        );
                        let neu_Other_Chk_key =
                          document.getElementById("neu_Other_Chk_key");
                        let neu_Deficit_Chk_key = document.getElementById(
                          "neu_Deficit_Chk_key"
                        );
                        let emh_Oriented_Chk_key = document.getElementById(
                          "emh_Oriented_Chk_key"
                        );
                        let bhe_NeuPerson_Chk_key = document.getElementById(
                          "bhe_NeuPerson_Chk_key"
                        );
                        let bhe_NeuPlce_Chk_key = document.getElementById(
                          "bhe_NeuPlce_Chk_key"
                        );
                        let bhe_NeuTime_Chk_key = document.getElementById(
                          "bhe_NeuTime_Chk_key"
                        );
                        let bhe_NeuSituation_Chk_key = document.getElementById(
                          "bhe_NeuSituation_Chk_key"
                        );
                        let emh_Alert_Chk_key =
                          document.getElementById("emh_Alert_Chk_key");
                        let emh_Disoriented_Chk_key = document.getElementById(
                          "emh_Disoriented_Chk_key"
                        );
                        let emh_Confused_Chk_key = document.getElementById(
                          "emh_Confused_Chk_key"
                        );
                        let emh_Agitated_Chk_key = document.getElementById(
                          "emh_Agitated_Chk_key"
                        );
                        let emh_Depressed_Chk_key = document.getElementById(
                          "emh_Depressed_Chk_key"
                        );
                        let emh_Other_Chk_key =
                          document.getElementById("emh_Other_Chk_key");

                        if (neh_MemoryLoss_Chk_key != null) {
                          if (options.mental == "forgetful") {
                            neh_MemoryLoss_Chk_key.checked = true;
                            neh_MemoryLoss_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neh_Dementia_Chk_key.checked = false;
                            neh_Dementia_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neh_Parkinson_Chk_key.checked = false;
                            neh_Parkinson_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neh_NoHistory_Chk_key.checked = false;
                            neh_NoHistory_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neh_HisOther_Chk_key.checked = false;
                            neh_HisOther_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neh_Stroke_Chk_key.checked = false;
                            neh_Stroke_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neh_Psychiatric_Chk_key.checked = false;
                            neh_Psychiatric_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neh_Traumatic_Chk_key.checked = false;
                            neh_Traumatic_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neh_HistoryTia_Chk_key.checked = false;
                            neh_HistoryTia_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neh_Seizures_Chk_key.checked = false;
                            neh_Seizures_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neh_HistoryMs_Chk_key.checked = false;
                            neh_HistoryMs_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Pupillary_Chk_key.checked = false;
                            neu_Pupillary_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Loss_Chk_key.checked = false;
                            neu_Loss_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Dizzy_Chk_key.checked = false;
                            neu_Dizzy_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Spasms_Chk_key.checked = false;
                            neu_Spasms_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Forgetful_Chk_key.checked = false;
                            neu_Forgetful_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Tremors_Chk_key.checked = false;
                            neu_Tremors_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Slurred_Chk_key.checked = false;
                            neu_Slurred_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Cognition_Chk_key.checked = false;
                            neu_Cognition_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Numbness_Chk_key.checked = false;
                            neu_Numbness_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Facial_Chk_key.checked = false;
                            neu_Facial_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Speech_Chk_key.checked = false;
                            neu_Speech_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Mood_Chk_key.checked = false;
                            neu_Mood_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Headache_Chk_key.checked = false;
                            neu_Headache_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Weakness_Chk_key.checked = false;
                            neu_Weakness_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_WeaknessR_Chk_key.checked = false;
                            neu_WeaknessR_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_WeaknessL_Chk_key.checked = false;
                            neu_WeaknessL_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_HandR_Chk_key.checked = false;
                            neu_HandR_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_HandL_Chk_key.checked = false;
                            neu_HandL_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Strong_Chk_key.checked = false;
                            neu_Strong_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Weak_Chk_key.checked = false;
                            neu_Weak_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Equal_Chk_key.checked = false;
                            neu_Equal_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Unequal_Chk_key.checked = false;
                            neu_Unequal_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Other_Chk_key.checked = false;
                            neu_Other_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            neu_Deficit_Chk_key.checked = false;
                            neu_Deficit_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            emh_Oriented_Chk_key.checked = false;
                            emh_Oriented_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            bhe_NeuPerson_Chk_key.checked = false;
                            bhe_NeuPerson_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            bhe_NeuPlce_Chk_key.checked = false;
                            bhe_NeuPlce_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            bhe_NeuTime_Chk_key.checked = false;
                            bhe_NeuTime_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            bhe_NeuSituation_Chk_key.checked = false;
                            bhe_NeuSituation_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            emh_Alert_Chk_key.checked = false;
                            emh_Alert_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            emh_Disoriented_Chk_key.checked = false;
                            emh_Disoriented_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            emh_Confused_Chk_key.checked = false;
                            emh_Confused_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            emh_Agitated_Chk_key.checked = false;
                            emh_Agitated_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            emh_Depressed_Chk_key.checked = false;
                            emh_Depressed_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            emh_Other_Chk_key.checked = false;
                            emh_Other_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                            var M1700_COG_FUNCTION_1 = document.getElementById(
                              "M1700_COG_FUNCTION_1"
                            );
                            if (M1700_COG_FUNCTION_1 != null) {
                              M1700_COG_FUNCTION_1.checked = true;
                              M1700_COG_FUNCTION_1.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            var M1710_WHEN_CONFUSED_2 = document.getElementById(
                              "M1710_WHEN_CONFUSED_2"
                            );
                            if (M1710_WHEN_CONFUSED_2 != null) {
                              M1710_WHEN_CONFUSED_2.checked = true;
                              M1710_WHEN_CONFUSED_2.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            let C1310A_0 = document.getElementById("C1310A_0");
                            if (C1310A_0 != null) {
                              C1310A_0.checked = true;
                              C1310A_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            let C1310B_0 = document.getElementById("C1310B_0");
                            if (C1310B_0 != null) {
                              C1310B_0.checked = true;
                              C1310B_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            let C1310C_2 = document.getElementById("C1310C_2");
                            if (C1310C_2 != null) {
                              C1310C_2.checked = true;
                              C1310C_2.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            let C1310D_0 = document.getElementById("C1310D_0");
                            if (C1310D_0 != null) {
                              C1310D_0.checked = true;
                              C1310D_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            // var M1700_COG_FUNCTION_1=document.getElementById("M1700_COG_FUNCTION_1")
                            if (M1700_COG_FUNCTION_1 != null) {
                              M1700_COG_FUNCTION_1.checked = true;
                              M1700_COG_FUNCTION_1.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            if (M1710_WHEN_CONFUSED_2 != null) {
                              M1710_WHEN_CONFUSED_2.checked = true;
                              M1710_WHEN_CONFUSED_2.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }
                            let M1720_WHEN_ANXIOUS_0 = document.getElementById(
                              "M1720_WHEN_ANXIOUS_0"
                            );
                            if (M1720_WHEN_ANXIOUS_0 != null) {
                              M1720_WHEN_ANXIOUS_0.checked = true;
                              M1720_WHEN_ANXIOUS_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }
                          }
                          if (options.mental == "aaox4") {
                            neh_NoHistory_Chk_key.checked = false;
                            neh_NoHistory_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            var M1700_COG_FUNCTION_0 = document.getElementById(
                              "M1700_COG_FUNCTION_0"
                            );
                            if (M1700_COG_FUNCTION_0 != null) {
                              M1700_COG_FUNCTION_0.checked = true;
                              M1700_COG_FUNCTION_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            var M1710_WHEN_CONFUSED_0 = document.getElementById(
                              "M1710_WHEN_CONFUSED_0"
                            );
                            if (M1710_WHEN_CONFUSED_0 != null) {
                              M1710_WHEN_CONFUSED_0.checked = true;
                              M1710_WHEN_CONFUSED_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            let M1720_WHEN_ANXIOUS_0 = document.getElementById(
                              "M1720_WHEN_ANXIOUS_0"
                            );
                            if (M1720_WHEN_ANXIOUS_0 != null) {
                              M1720_WHEN_ANXIOUS_0.checked = true;
                              M1720_WHEN_ANXIOUS_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            let C1310A_0 = document.getElementById("C1310A_0");
                            if (C1310A_0 != null) {
                              C1310A_0.checked = true;
                              C1310A_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            let C1310B_0 = document.getElementById("C1310B_0");
                            if (C1310B_0 != null) {
                              C1310B_0.checked = true;
                              C1310B_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            let C1310C_0 = document.getElementById("C1310C_0");
                            if (C1310C_0 != null) {
                              C1310C_0.checked = true;
                              C1310C_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            let C1310D_0 = document.getElementById("C1310D_0");
                            if (C1310D_0 != null) {
                              C1310D_0.checked = true;
                              C1310D_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            if (M1700_COG_FUNCTION_0 != null) {
                              M1700_COG_FUNCTION_0.checked = true;
                              M1700_COG_FUNCTION_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            if (M1710_WHEN_CONFUSED_0 != null) {
                              M1710_WHEN_CONFUSED_0.checked = true;
                              M1710_WHEN_CONFUSED_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            if (M1720_WHEN_ANXIOUS_0 != null) {
                              M1720_WHEN_ANXIOUS_0.checked = true;
                              M1720_WHEN_ANXIOUS_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }
                          }
                          if (options.mental == "unable") {
                            let C1310A_0 = document.getElementById("C1310A_0");
                            if (C1310A_0 != null) {
                              C1310A_0.checked = true;
                              C1310A_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            let C1310B_1 = document.getElementById("C1310B_1");
                            if (C1310B_1 != null) {
                              C1310B_1.checked = true;
                              C1310B_1.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            let C1310C_1 = document.getElementById("C1310C_1");
                            if (C1310C_1 != null) {
                              C1310C_1.checked = true;
                              C1310C_1.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            let C1310D_0 = document.getElementById("C1310D_0");
                            if (C1310D_0 != null) {
                              C1310D_0.checked = true;
                              C1310D_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }

                            let M1700_COG_FUNCTION_3 = document.getElementById(
                              "M1700_COG_FUNCTION_3"
                            );
                            if (M1700_COG_FUNCTION_3 != null) {
                              M1700_COG_FUNCTION_3.checked = true;
                              M1700_COG_FUNCTION_3.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }
                          }

                          //MOOD

                          let M1740_BD_MEM_DEFICIT_key =
                            document.getElementById("M1740_BD_MEM_DEFICIT_key");
                          let M1740_BD_IMP_DECISN_key = document.getElementById(
                            "M1740_BD_IMP_DECISN_key"
                          );
                          let M1740_BD_VERBAL_key = document.getElementById(
                            "M1740_BD_VERBAL_key"
                          );
                          let M1740_BD_PHYSICAL_key = document.getElementById(
                            "M1740_BD_PHYSICAL_key"
                          );
                          let M1740_BD_SOC_INAPPRO_key =
                            document.getElementById("M1740_BD_SOC_INAPPRO_key");
                          let M1740_BD_DELUSIONS_key = document.getElementById(
                            "M1740_BD_DELUSIONS_key"
                          );
                          let M1740_BD_NONE_key =
                            document.getElementById("M1740_BD_NONE_key");

                          if (options.mental == "unable") {
                            if (M1740_BD_MEM_DEFICIT_key != null) {
                              M1740_BD_MEM_DEFICIT_key.checked = true;
                              M1740_BD_MEM_DEFICIT_key.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );

                              M1740_BD_IMP_DECISN_key.checked = true;
                              M1740_BD_IMP_DECISN_key.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );

                              M1740_BD_VERBAL_key.checked = false;
                              M1740_BD_VERBAL_key.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );

                              M1740_BD_PHYSICAL_key.checked = false;
                              M1740_BD_PHYSICAL_key.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );

                              M1740_BD_SOC_INAPPRO_key.checked = false;
                              M1740_BD_SOC_INAPPRO_key.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );

                              M1740_BD_DELUSIONS_key.checked = false;
                              M1740_BD_DELUSIONS_key.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );

                              M1740_BD_NONE_key.checked = false;
                              M1740_BD_NONE_key.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );
                            }
                          }

                          if (options.mental == "forgetful") {
                            M1740_BD_MEM_DEFICIT_key.checked = true;
                            M1740_BD_MEM_DEFICIT_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            M1740_BD_IMP_DECISN_key.checked = true;
                            M1740_BD_IMP_DECISN_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            M1740_BD_VERBAL_key.checked = false;
                            M1740_BD_VERBAL_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            M1740_BD_PHYSICAL_key.checked = false;
                            M1740_BD_PHYSICAL_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            M1740_BD_SOC_INAPPRO_key.checked = false;
                            M1740_BD_SOC_INAPPRO_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            M1740_BD_DELUSIONS_key.checked = false;
                            M1740_BD_DELUSIONS_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            M1740_BD_NONE_key.checked = false;
                            M1740_BD_NONE_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                          }

                          if (options.mental == "aaoo4") {
                            M1740_BD_MEM_DEFICIT_key.checked = false;
                            M1740_BD_MEM_DEFICIT_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            M1740_BD_IMP_DECISN_key.checked = false;
                            M1740_BD_IMP_DECISN_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            M1740_BD_VERBAL_key.checked = false;
                            M1740_BD_VERBAL_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            M1740_BD_PHYSICAL_key.checked = false;
                            M1740_BD_PHYSICAL_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            M1740_BD_SOC_INAPPRO_key.checked = false;
                            M1740_BD_SOC_INAPPRO_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            M1740_BD_DELUSIONS_key.checked = false;
                            M1740_BD_DELUSIONS_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            M1740_BD_NONE_key.checked = true;
                            M1740_BD_NONE_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                          }

                          let M1745_BEH_PROB_FREQ_0 = document.getElementById(
                            "M1745_BEH_PROB_FREQ_0"
                          );
                          if (M1745_BEH_PROB_FREQ_0 != null) {
                            M1745_BEH_PROB_FREQ_0.checked = true;
                            M1745_BEH_PROB_FREQ_0.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                          }

                          let rif_Smoking_Chk_key = document.getElementById(
                            "rif_Smoking_Chk_key"
                          );
                          let rif_Obesity_Chk_key = document.getElementById(
                            "rif_Obesity_Chk_key"
                          );
                          let rif_Alcohol_Chk_key = document.getElementById(
                            "rif_Alcohol_Chk_key"
                          );
                          let rif_Drug_Chk_key =
                            document.getElementById("rif_Drug_Chk_key");
                          let rif_Unknown_Chk_key = document.getElementById(
                            "rif_Unknown_Chk_key"
                          );
                          let rif_Noneabove_Chk_key = document.getElementById(
                            "rif_Noneabove_Chk_key"
                          );

                          if (rif_Smoking_Chk_key != null) {
                            rif_Noneabove_Chk_key.checked = true;
                            rif_Noneabove_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            rif_Unknown_Chk_key.checked = false;
                            rif_Unknown_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            rif_Drug_Chk_key.checked = false;
                            rif_Drug_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            rif_Alcohol_Chk_key.checked = false;
                            rif_Alcohol_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            rif_Obesity_Chk_key.checked = false;
                            rif_Obesity_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                          }

                          let eane_Noneobserved_Chk_key =
                            document.getElementById(
                              "eane_Noneobserved_Chk_key"
                            );
                          let eane_Actual_Chk_key = document.getElementById(
                            "eane_Actual_Chk_key"
                          );
                          let eane_Potential_Chk_key = document.getElementById(
                            "eane_Potential_Chk_key"
                          );
                          let eane_Verbal_Chk_key = document.getElementById(
                            "eane_Verbal_Chk_key"
                          );
                          let eane_Physical_Chk_key = document.getElementById(
                            "eane_Physical_Chk_key"
                          );
                          let eane_Financial_Chk_key = document.getElementById(
                            "eane_Financial_Chk_key"
                          );

                          if (eane_Noneobserved_Chk_key != null) {
                            eane_Noneobserved_Chk_key.checked = true;
                            eane_Noneobserved_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            eane_Actual_Chk_key.checked = false;
                            eane_Actual_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            eane_Potential_Chk_key.checked = false;
                            eane_Potential_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            eane_Verbal_Chk_key.checked = false;
                            eane_Verbal_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            eane_Physical_Chk_key.checked = false;
                            eane_Physical_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );

                            eane_Financial_Chk_key.checked = false;
                            eane_Financial_Chk_key.dispatchEvent(
                              new Event("change", { bubbles: true })
                            );
                          }

                          //MentalPsychosocialCognitiveStatus

                          // var MentalPsychosocialCognitiveStatus = document.querySelector('.copElement.cop-text p');
                          // if(MentalPsychosocialCognitiveStatus!=null){
                          //   if(options.mental=="unable"){

                          //   }

                          // }

                          const anchorTags = [
                            ...document.querySelectorAll(".pages a"),
                          ].filter((a) => /\d/.test(a.textContent));
                          anchorTags[7].click();

                          var page8Interval = setInterval(() => {
                            let M1400_WHEN_DYSPNEIC_0 = document.getElementById(
                              "M1400_WHEN_DYSPNEIC_0"
                            );
                            if (M1400_WHEN_DYSPNEIC_0 != null) {
                              M1400_WHEN_DYSPNEIC_0.checked = true;
                              M1400_WHEN_DYSPNEIC_0.dispatchEvent(
                                new Event("change", { bubbles: true })
                              );

                              if (options.diagnosis == "chf") {
                                let M1400_WHEN_DYSPNEIC_2 =
                                  document.getElementById(
                                    "M1400_WHEN_DYSPNEIC_2"
                                  );
                                if (M1400_WHEN_DYSPNEIC_2 != null) {
                                  M1400_WHEN_DYSPNEIC_2.checked = true;
                                  M1400_WHEN_DYSPNEIC_2.dispatchEvent(
                                    new Event("change", { bubbles: true })
                                  );
                                }
                              }

                              let cah_HeartFailure_Chk_key =
                                document.getElementById(
                                  "cah_HeartFailure_Chk_key"
                                );
                              let cah_Angina_Chk_key =
                                document.getElementById("cah_Angina_Chk_key");
                              let cah_Bradycardia_Chk_key =
                                document.getElementById(
                                  "cah_Bradycardia_Chk_key"
                                );
                              let cah_Hypotension_Chk_key =
                                document.getElementById(
                                  "cah_Hypotension_Chk_key"
                                );
                              let cah_Hypertension_Chk_key =
                                document.getElementById(
                                  "cah_Hypertension_Chk_key"
                                );
                              let cah_AtrialFib_Chk_key =
                                document.getElementById(
                                  "cah_AtrialFib_Chk_key"
                                );
                              let cah_Pacemaker_Chk_key =
                                document.getElementById(
                                  "cah_Pacemaker_Chk_key"
                                );
                              let cah_Tachycardia_Chk_key =
                                document.getElementById(
                                  "cah_Tachycardia_Chk_key"
                                );
                              let cah_Implanted_Chk_key =
                                document.getElementById(
                                  "cah_Implanted_Chk_key"
                                );
                              let cah_Stent_Chk_key =
                                document.getElementById("cah_Stent_Chk_key");
                              let cah_Pad_Chk_key =
                                document.getElementById("cah_Pad_Chk_key");
                              let cah_Palpitations_Chk_key =
                                document.getElementById(
                                  "cah_Palpitations_Chk_key"
                                );
                              let cah_NoHistory_Chk_key =
                                document.getElementById(
                                  "cah_NoHistory_Chk_key"
                                );
                              let crd_NorHeartSnd_Chk_key =
                                document.getElementById(
                                  "crd_NorHeartSnd_Chk_key"
                                );
                              let crd_AbnorHeartSnd_Chk_key =
                                document.getElementById(
                                  "crd_AbnorHeartSnd_Chk_key"
                                );
                              let crd_ChestPain_Chk_key =
                                document.getElementById(
                                  "crd_ChestPain_Chk_key"
                                );
                              let crd_Vertigo_Chk_key = document.getElementById(
                                "crd_Vertigo_Chk_key"
                              );
                              let crd_NeckVeinDisten_Chk_key =
                                document.getElementById(
                                  "crd_NeckVeinDisten_Chk_key"
                                );
                              let crd_Diaphoresis_Chk_key =
                                document.getElementById(
                                  "crd_Diaphoresis_Chk_key"
                                );
                              let crd_Fatigues_Chk_key =
                                document.getElementById("crd_Fatigues_Chk_key");
                              let crd_Arrhythmia_Chk_key =
                                document.getElementById(
                                  "crd_Arrhythmia_Chk_key"
                                );
                              let crd_CapillaryRef_Chk_key =
                                document.getElementById(
                                  "crd_CapillaryRef_Chk_key"
                                );
                              let crd_CompresStock_Chk_key =
                                document.getElementById(
                                  "crd_CompresStock_Chk_key"
                                );
                              let crd_PedalPulse_Chk_key =
                                document.getElementById(
                                  "crd_PedalPulse_Chk_key"
                                );
                              let crd_Edema_Chk_key =
                                document.getElementById("crd_Edema_Chk_key");
                              let crd_EdemaPedal_Chk_key =
                                document.getElementById(
                                  "crd_EdemaPedal_Chk_key"
                                );
                              let crd_EdemaR_Chk_key =
                                document.getElementById("crd_EdemaR_Chk_key");
                              let crd_EdemaL_Chk_key =
                                document.getElementById("crd_EdemaL_Chk_key");
                              let crd_EdemaDepend_Chk_key =
                                document.getElementById(
                                  "crd_EdemaDepend_Chk_key"
                                );
                              let crd_NonPit_Chk_key =
                                document.getElementById("crd_NonPit_Chk_key");
                              let crd_RightAnkle_Chk_key =
                                document.getElementById(
                                  "crd_RightAnkle_Chk_key"
                                );
                              let crd_RightCalf_Chk_key =
                                document.getElementById(
                                  "crd_RightCalf_Chk_key"
                                );
                              let crd_LeftAnkle_Chk_key =
                                document.getElementById(
                                  "crd_LeftAnkle_Chk_key"
                                );
                              let crd_LeftCalf_Chk_key =
                                document.getElementById("crd_LeftCalf_Chk_key");
                              let crd_Other_Chk_key =
                                document.getElementById("crd_Other_Chk_key");

                              let crd_CapillaryRef_Rdo_1 =
                                document.getElementById(
                                  "crd_CapillaryRef_Rdo_1"
                                );
                              if (cah_HeartFailure_Chk_key != null) {
                                cah_Hypertension_Chk_key.checked = true;
                                cah_Hypertension_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_NorHeartSnd_Chk_key.checked = true;
                                crd_NorHeartSnd_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_CapillaryRef_Chk_key.checked = true;
                                crd_CapillaryRef_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_CapillaryRef_Rdo_1.checked = true;
                                crd_CapillaryRef_Rdo_1.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_Other_Chk_key.checked = false;
                                crd_Other_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_LeftCalf_Chk_key.checked = false;
                                crd_LeftCalf_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_LeftAnkle_Chk_key.checked = false;
                                crd_LeftAnkle_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_RightCalf_Chk_key.checked = false;
                                crd_RightCalf_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_RightAnkle_Chk_key.checked = false;
                                crd_RightAnkle_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_NonPit_Chk_key.checked = false;
                                crd_NonPit_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_EdemaDepend_Chk_key.checked = false;
                                crd_EdemaDepend_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_EdemaL_Chk_key.checked = false;
                                crd_EdemaL_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_EdemaR_Chk_key.checked = false;
                                crd_EdemaR_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_EdemaPedal_Chk_key.checked = false;
                                crd_EdemaPedal_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_Edema_Chk_key.checked = false;
                                crd_Edema_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_PedalPulse_Chk_key.checked = false;
                                crd_PedalPulse_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_CompresStock_Chk_key.checked = false;
                                crd_CompresStock_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_Arrhythmia_Chk_key.checked = false;
                                crd_Arrhythmia_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_Fatigues_Chk_key.checked = false;
                                crd_Fatigues_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_Diaphoresis_Chk_key.checked = false;
                                crd_Diaphoresis_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_NeckVeinDisten_Chk_key.checked = false;
                                crd_NeckVeinDisten_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_Vertigo_Chk_key.checked = false;
                                crd_Vertigo_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_ChestPain_Chk_key.checked = false;
                                crd_ChestPain_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                crd_AbnorHeartSnd_Chk_key.checked = false;
                                crd_AbnorHeartSnd_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                cah_NoHistory_Chk_key.checked = false;
                                cah_NoHistory_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                cah_Palpitations_Chk_key.checked = false;
                                cah_Palpitations_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                cah_Pad_Chk_key.checked = false;
                                cah_Pad_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                cah_Tachycardia_Chk_key.checked = false;
                                cah_Tachycardia_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                cah_Implanted_Chk_key.checked = false;
                                cah_Implanted_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                cah_Stent_Chk_key.checked = false;
                                cah_Stent_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                cah_Pacemaker_Chk_key.checked = false;
                                cah_Pacemaker_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                cah_AtrialFib_Chk_key.checked = false;
                                cah_AtrialFib_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                cah_Hypotension_Chk_key.checked = false;
                                cah_Hypotension_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                cah_Angina_Chk_key.checked = false;
                                cah_Angina_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                cah_Bradycardia_Chk_key.checked = false;
                                cah_Bradycardia_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );
                              }

                              let M1600_UTI_0 =
                                document.getElementById("M1600_UTI_0");
                              if (M1600_UTI_0 != null) {
                                M1600_UTI_0.checked = true;
                                M1600_UTI_0.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );
                              }

                              let M1610_UR_INCONT_0 =
                                document.getElementById("M1610_UR_INCONT_0");
                              if (M1610_UR_INCONT_0 != null) {
                                M1610_UR_INCONT_0.checked = true;
                                M1610_UR_INCONT_0.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );
                              }

                              let lbd_Soft_Chk_key =
                                document.getElementById("lbd_Soft_Chk_key");
                              let lbd_Formed_Chk_key =
                                document.getElementById("lbd_Formed_Chk_key");
                              let lbd_Hard_Chk_key =
                                document.getElementById("lbd_Hard_Chk_key");
                              let lbd_Mucous_Chk_key =
                                document.getElementById("lbd_Mucous_Chk_key");
                              let lbd_Other_Chk_key =
                                document.getElementById("lbd_Other_Chk_key");
                              let lbd_Incontinence_Chk_key =
                                document.getElementById(
                                  "lbd_Incontinence_Chk_key"
                                );
                              let lbd_Vomiting_Chk_key =
                                document.getElementById("lbd_Vomiting_Chk_key");
                              let lbd_Placement_Chk_key =
                                document.getElementById(
                                  "lbd_Placement_Chk_key"
                                );
                              let lbd_Abdominal_Chk_key =
                                document.getElementById(
                                  "lbd_Abdominal_Chk_key"
                                );
                              let lbd_Residual_Chk_key =
                                document.getElementById("lbd_Residual_Chk_key");
                              let lbd_Stoma_Chk_key =
                                document.getElementById("lbd_Stoma_Chk_key");
                              let lbd_Pink_Chk_key =
                                document.getElementById("lbd_Pink_Chk_key");
                              let lbd_Red_Chk_key =
                                document.getElementById("lbd_Red_Chk_key");
                              let lbd_Moist_Chk_key =
                                document.getElementById("lbd_Red_Chk_key");
                              let lbd_SelfCare_Chk_key =
                                document.getElementById("lbd_SelfCare_Chk_key");
                              let lbd_NeedsAssis_Chk_key =
                                document.getElementById(
                                  "lbd_NeedsAssis_Chk_key"
                                );
                              let lbd_Constipation_Chk_key =
                                document.getElementById(
                                  "lbd_Constipation_Chk_key"
                                );
                              let lbd_Diarrhea_Chk_key =
                                document.getElementById("lbd_Diarrhea_Chk_key");
                              let lbd_Indigestion_Chk_key =
                                document.getElementById(
                                  "lbd_Indigestion_Chk_key"
                                );
                              let lbd_Nausea_Chk_key =
                                document.getElementById("lbd_Nausea_Chk_key");
                              let lbd_Enternal_Chk_key =
                                document.getElementById("lbd_Enternal_Chk_key");
                              let lbd_Ostomy_Chk_key =
                                document.getElementById("lbd_Ostomy_Chk_key");
                              let lbd_Colostomy_Chk_key =
                                document.getElementById(
                                  "lbd_Colostomy_Chk_key"
                                );
                              let lbd_Ileostomy_Chk_key =
                                document.getElementById(
                                  "lbd_Ileostomy_Chk_key"
                                );
                              let lbd_Urostomy_Chk_key =
                                document.getElementById("lbd_Urostomy_Chk_key");
                              let lbd_OstomyOther_Chk_key =
                                document.getElementById(
                                  "lbd_OstomyOther_Chk_key"
                                );
                              if (lbd_Formed_Chk_key != null) {
                                lbd_Formed_Chk_key.checked = true;
                                lbd_Formed_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Soft_Chk_key.checked = false;
                                lbd_Soft_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Hard_Chk_key.checked = false;
                                lbd_Hard_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Mucous_Chk_key.checked = false;
                                lbd_Mucous_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Other_Chk_key.checked = false;
                                lbd_Other_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Incontinence_Chk_key.checked = false;
                                lbd_Incontinence_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Vomiting_Chk_key.checked = false;
                                lbd_Vomiting_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Abdominal_Chk_key.checked = false;
                                lbd_Abdominal_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Placement_Chk_key.checked = false;
                                lbd_Placement_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Residual_Chk_key.checked = false;
                                lbd_Residual_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Stoma_Chk_key.checked = false;
                                lbd_Stoma_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Pink_Chk_key.checked = false;
                                lbd_Pink_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Red_Chk_key.checked = false;
                                lbd_Red_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Moist_Chk_key.checked = false;
                                lbd_Moist_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_SelfCare_Chk_key.checked = false;
                                lbd_SelfCare_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_NeedsAssis_Chk_key.checked = false;
                                lbd_NeedsAssis_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Constipation_Chk_key.checked = false;
                                lbd_Constipation_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Diarrhea_Chk_key.checked = false;
                                lbd_Diarrhea_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Indigestion_Chk_key.checked = false;
                                lbd_Indigestion_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Nausea_Chk_key.checked = false;
                                lbd_Nausea_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Enternal_Chk_key.checked = false;
                                lbd_Enternal_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Ostomy_Chk_key.checked = false;
                                lbd_Ostomy_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Colostomy_Chk_key.checked = false;
                                lbd_Colostomy_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Ileostomy_Chk_key.checked = false;
                                lbd_Ileostomy_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Urostomy_Chk_key.checked = false;
                                lbd_Urostomy_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_OstomyOther_Chk_key.checked = false;
                                lbd_OstomyOther_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );
                              }

                              let lbd_Normal_Chk_key =
                                document.getElementById("lbd_Normal_Chk_key");
                              let lbd_Hyperactive_Chk_key =
                                document.getElementById(
                                  "lbd_Hyperactive_Chk_key"
                                );
                              let lbd_Diminished_Chk_key =
                                document.getElementById(
                                  "lbd_Diminished_Chk_key"
                                );
                              let lbd_Absent_Chk_key =
                                document.getElementById("lbd_Absent_Chk_key");

                              if (lbd_Normal_Chk_key != null) {
                                lbd_Normal_Chk_key.checked = true;
                                lbd_Normal_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Hyperactive_Chk_key.checked = false;
                                lbd_Hyperactive_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Diminished_Chk_key.checked = false;
                                lbd_Diminished_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );

                                lbd_Absent_Chk_key.checked = false;
                                lbd_Absent_Chk_key.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );
                              }

                              let M1620_BWL_INCONT_0 =
                                document.getElementById("M1620_BWL_INCONT_0");
                              if (M1620_BWL_INCONT_0 != null) {
                                M1620_BWL_INCONT_0.checked = true;
                                M1620_BWL_INCONT_0.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );
                              }

                              let M1630_OSTOMY_0 =
                                document.getElementById("M1630_OSTOMY_0");
                              if (M1630_OSTOMY_0 != null) {
                                M1630_OSTOMY_0.checked = true;
                                M1630_OSTOMY_0.dispatchEvent(
                                  new Event("change", { bubbles: true })
                                );
                              }

                              const anchorTags = [
                                ...document.querySelectorAll(".pages a"),
                              ].filter((a) => /\d/.test(a.textContent));
                              anchorTags[8].click();
                              var page9Interval = setInterval(() => {
                                let K0520B1_key =
                                  document.getElementById("K0520B1_key");
                                let K0520A1_key =
                                  document.getElementById("K0520A1_key");
                                let K0520C1_key =
                                  document.getElementById("K0520C1_key");
                                let K0520D1_key =
                                  document.getElementById("K0520C1_key");
                                let K0520Z1_key =
                                  document.getElementById("K0520Z1_key");
                                if (K0520B1_key != null) {
                                  K0520B1_key.checked = true;
                                  K0520B1_key.dispatchEvent(
                                    new Event("change", { bubbles: true })
                                  );

                                  K0520A1_key.checked = false;
                                  K0520A1_key.dispatchEvent(
                                    new Event("change", { bubbles: true })
                                  );

                                  K0520C1_key.checked = false;
                                  K0520C1_key.dispatchEvent(
                                    new Event("change", { bubbles: true })
                                  );

                                  K0520D1_key.checked = true;
                                  K0520D1_key.dispatchEvent(
                                    new Event("change", { bubbles: true })
                                  );

                                  K0520Z1_key.checked = false;
                                  K0520Z1_key.dispatchEvent(
                                    new Event("change", { bubbles: true })
                                  );

                                  if (
                                    options.adls == "1" ||
                                    options.adls == "2" ||
                                    options.adls == "3"
                                  ) {
                                    let M1870_CRNT_FEEDING_1 =
                                      document.getElementById(
                                        "M1870_CRNT_FEEDING_1"
                                      );
                                    if (M1870_CRNT_FEEDING_1 != null) {
                                      M1870_CRNT_FEEDING_1.checked = true;
                                      M1870_CRNT_FEEDING_1.dispatchEvent(
                                        new Event("change", { bubbles: true })
                                      );
                                    }
                                  }
                                  if (options.adls == "4") {
                                    let M1870_CRNT_FEEDING_2 =
                                      document.getElementById(
                                        "M1870_CRNT_FEEDING_2"
                                      );
                                    if (M1870_CRNT_FEEDING_2 != null) {
                                      M1870_CRNT_FEEDING_2.checked = true;
                                      M1870_CRNT_FEEDING_2.dispatchEvent(
                                        new Event("change", { bubbles: true })
                                      );
                                    }
                                  }

                                  if (options.diagnosis.includes("ogtube")) {
                                    let M1870_CRNT_FEEDING_4 =
                                      document.getElementById(
                                        "M1870_CRNT_FEEDING_4"
                                      );
                                    if (M1870_CRNT_FEEDING_4 != null) {
                                      M1870_CRNT_FEEDING_4.checked = true;
                                      M1870_CRNT_FEEDING_4.dispatchEvent(
                                        new Event("change", { bubbles: true })
                                      );
                                    }
                                  }

                                  let EatingAssessment1_key =
                                    document.getElementById(
                                      "EatingAssessment1_key"
                                    );
                                  let EatingAssessment2_key =
                                    document.getElementById(
                                      "EatingAssessment2_key"
                                    );
                                  let EatingAssessment3_key =
                                    document.getElementById(
                                      "EatingAssessment3_key"
                                    );
                                  let EatingAssessment4_key =
                                    document.getElementById(
                                      "EatingAssessment4_key"
                                    );
                                  let EatingAssessment5_key =
                                    document.getElementById(
                                      "EatingAssessment5_key"
                                    );
                                  let EatingAssessment6_key =
                                    document.getElementById(
                                      "EatingAssessment6_key"
                                    );
                                  let EatingAssessment7_key =
                                    document.getElementById(
                                      "EatingAssessment7_key"
                                    );
                                  let EatingAssessment8_key =
                                    document.getElementById(
                                      "EatingAssessment8_key"
                                    );
                                  let EatingAssessment9_key =
                                    document.getElementById(
                                      "EatingAssessment9_key"
                                    );
                                  let EatingAssessment10_key =
                                    document.getElementById(
                                      "EatingAssessment10_key"
                                    );

                                  if (EatingAssessment1_key != null) {
                                    EatingAssessment10_key.checked = true;
                                    EatingAssessment10_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment9_key.checked = false;
                                    EatingAssessment9_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment8_key.checked = true;
                                    EatingAssessment8_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment7_key.checked = false;
                                    EatingAssessment7_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment6_key.checked = false;
                                    EatingAssessment6_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment5_key.checked = false;
                                    EatingAssessment5_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment4_key.checked = false;
                                    EatingAssessment4_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment3_key.checked = false;
                                    EatingAssessment3_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment2_key.checked = false;
                                    EatingAssessment2_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment1_key.checked = false;
                                    EatingAssessment1_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );
                                  }

                                  if (
                                    options.precautions.includes("aspiration")
                                  ) {
                                    EatingAssessment10_key.checked = true;
                                    EatingAssessment10_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment1_key.checked = true;
                                    EatingAssessment1_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment8_key.checked = true;
                                    EatingAssessment8_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment9_key.checked = false;
                                    EatingAssessment9_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment7_key.checked = false;
                                    EatingAssessment7_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment6_key.checked = false;
                                    EatingAssessment6_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment5_key.checked = false;
                                    EatingAssessment5_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment4_key.checked = false;
                                    EatingAssessment4_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment3_key.checked = false;
                                    EatingAssessment3_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );

                                    EatingAssessment2_key.checked = false;
                                    EatingAssessment2_key.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );
                                  }

                                  let app_Appetite_Rdo_2 =
                                    document.getElementById(
                                      "app_Appetite_Rdo_2"
                                    );
                                  if (app_Appetite_Rdo_2 != null) {
                                    app_Appetite_Rdo_2.checked = true;
                                    app_Appetite_Rdo_2.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );
                                  }

                                  if (options.diagnosis.includes("dm2")) {
                                    let end_DiabetesType_Rdo_2 =
                                      document.getElementById(
                                        "end_DiabetesType_Rdo_2"
                                      );
                                    end_DiabetesType_Rdo_2.checked = true;
                                    end_DiabetesType_Rdo_2.dispatchEvent(
                                      new Event("change", { bubbles: true })
                                    );
                                  }

                                  const anchorTags = [
                                    ...document.querySelectorAll(".pages a"),
                                  ].filter((a) => /\d/.test(a.textContent));
                                  anchorTags[9].click();

                                  var page10Interval = setInterval(() => {
                                    let M1800_CRNT_GROOMING_0 =
                                      document.getElementById(
                                        "M1800_CRNT_GROOMING_0"
                                      );
                                    if (M1800_CRNT_GROOMING_0 != null) {
                                      if (options.adls == "1") {
                                        let M1800_CRNT_GROOMING_1 =
                                          document.getElementById(
                                            "M1800_CRNT_GROOMING_1"
                                          );
                                        if (M1800_CRNT_GROOMING_1 != null) {
                                          M1800_CRNT_GROOMING_1.checked = true;
                                          M1800_CRNT_GROOMING_1.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1810_CRNT_DRESS_UPPER_1 =
                                          document.getElementById(
                                            "M1810_CRNT_DRESS_UPPER_1"
                                          );
                                        if (M1810_CRNT_DRESS_UPPER_1 != null) {
                                          M1810_CRNT_DRESS_UPPER_1.checked = true;
                                          M1810_CRNT_DRESS_UPPER_1.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1820_CRNT_DRESS_LOWER_1 =
                                          document.getElementById(
                                            "M1820_CRNT_DRESS_LOWER_1"
                                          );
                                        if (M1820_CRNT_DRESS_LOWER_1 != null) {
                                          M1820_CRNT_DRESS_LOWER_1.checked = true;
                                          M1820_CRNT_DRESS_LOWER_1.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1830_CRNT_BATHG_1 =
                                          document.getElementById(
                                            "M1830_CRNT_BATHG_1"
                                          );
                                        if (M1830_CRNT_BATHG_1 != null) {
                                          M1830_CRNT_BATHG_1.checked = true;
                                          M1830_CRNT_BATHG_1.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1840_CRNT_TOILTG_1 =
                                          document.getElementById(
                                            "M1840_CRNT_TOILTG_1"
                                          );
                                        if (M1840_CRNT_TOILTG_1 != null) {
                                          M1840_CRNT_TOILTG_1.checked = true;
                                          M1840_CRNT_TOILTG_1.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1845_CRNT_TOILTG_HYGN_0 =
                                          document.getElementById(
                                            "M1845_CRNT_TOILTG_HYGN_0"
                                          );
                                        if (M1845_CRNT_TOILTG_HYGN_0 != null) {
                                          M1845_CRNT_TOILTG_HYGN_0.checked = true;
                                          M1845_CRNT_TOILTG_HYGN_0.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1850_CRNT_TRNSFRNG_1 =
                                          document.getElementById(
                                            "M1850_CRNT_TRNSFRNG_1"
                                          );
                                        if (M1850_CRNT_TRNSFRNG_1 != null) {
                                          M1850_CRNT_TRNSFRNG_1.checked = true;
                                          M1850_CRNT_TRNSFRNG_1.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1860_CRNT_AMBLTN_1 =
                                          document.getElementById(
                                            "M1860_CRNT_AMBLTN_1"
                                          );
                                        if (M1860_CRNT_AMBLTN_1 != null) {
                                          M1860_CRNT_AMBLTN_1.checked = true;
                                          M1860_CRNT_AMBLTN_1.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }
                                      } else if (options.adls == "2") {
                                        let M1800_CRNT_GROOMING_2 =
                                          document.getElementById(
                                            "M1800_CRNT_GROOMING_2"
                                          );
                                        if (M1800_CRNT_GROOMING_2 != null) {
                                          M1800_CRNT_GROOMING_2.checked = true;
                                          M1800_CRNT_GROOMING_2.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1810_CRNT_DRESS_UPPER_2 =
                                          document.getElementById(
                                            "M1810_CRNT_DRESS_UPPER_2"
                                          );
                                        if (M1810_CRNT_DRESS_UPPER_2 != null) {
                                          M1810_CRNT_DRESS_UPPER_2.checked = true;
                                          M1810_CRNT_DRESS_UPPER_2.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1820_CRNT_DRESS_LOWER_2 =
                                          document.getElementById(
                                            "M1820_CRNT_DRESS_LOWER_2"
                                          );
                                        if (M1820_CRNT_DRESS_LOWER_2 != null) {
                                          M1820_CRNT_DRESS_LOWER_2.checked = true;
                                          M1820_CRNT_DRESS_LOWER_2.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1830_CRNT_BATHG_2 =
                                          document.getElementById(
                                            "M1830_CRNT_BATHG_2"
                                          );
                                        if (M1830_CRNT_BATHG_2 != null) {
                                          M1830_CRNT_BATHG_2.checked = true;
                                          M1830_CRNT_BATHG_2.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1840_CRNT_TOILTG_1 =
                                          document.getElementById(
                                            "M1840_CRNT_TOILTG_1"
                                          );
                                        if (M1840_CRNT_TOILTG_1 != null) {
                                          M1840_CRNT_TOILTG_1.checked = true;
                                          M1840_CRNT_TOILTG_1.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1845_CRNT_TOILTG_HYGN_2 =
                                          document.getElementById(
                                            "M1845_CRNT_TOILTG_HYGN_2"
                                          );
                                        if (M1845_CRNT_TOILTG_HYGN_2 != null) {
                                          M1845_CRNT_TOILTG_HYGN_2.checked = true;
                                          M1845_CRNT_TOILTG_HYGN_2.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1850_CRNT_TRNSFRNG_1 =
                                          document.getElementById(
                                            "M1850_CRNT_TRNSFRNG_1"
                                          );
                                        if (M1850_CRNT_TRNSFRNG_1 != null) {
                                          M1850_CRNT_TRNSFRNG_1.checked = true;
                                          M1850_CRNT_TRNSFRNG_1.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1860_CRNT_AMBLTN_2 =
                                          document.getElementById(
                                            "M1860_CRNT_AMBLTN_2"
                                          );
                                        if (M1860_CRNT_AMBLTN_2 != null) {
                                          M1860_CRNT_AMBLTN_2.checked = true;
                                          M1860_CRNT_AMBLTN_2.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }
                                      } else if (options.adls == "3") {
                                        let M1800_CRNT_GROOMING_3 =
                                          document.getElementById(
                                            "M1800_CRNT_GROOMING_3"
                                          );
                                        if (M1800_CRNT_GROOMING_3 != null) {
                                          M1800_CRNT_GROOMING_3.checked = true;
                                          M1800_CRNT_GROOMING_3.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1810_CRNT_DRESS_UPPER_2 =
                                          document.getElementById(
                                            "M1810_CRNT_DRESS_UPPER_2"
                                          );
                                        if (M1810_CRNT_DRESS_UPPER_2 != null) {
                                          M1810_CRNT_DRESS_UPPER_2.checked = true;
                                          M1810_CRNT_DRESS_UPPER_2.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1820_CRNT_DRESS_LOWER_3 =
                                          document.getElementById(
                                            "M1820_CRNT_DRESS_LOWER_3"
                                          );
                                        if (M1820_CRNT_DRESS_LOWER_3 != null) {
                                          M1820_CRNT_DRESS_LOWER_3.checked = true;
                                          M1820_CRNT_DRESS_LOWER_3.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1830_CRNT_BATHG_5 =
                                          document.getElementById(
                                            "M1830_CRNT_BATHG_5"
                                          );
                                        if (M1830_CRNT_BATHG_5 != null) {
                                          M1830_CRNT_BATHG_5.checked = true;
                                          M1830_CRNT_BATHG_5.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1840_CRNT_TOILTG_3 =
                                          document.getElementById(
                                            "M1840_CRNT_TOILTG_3"
                                          );
                                        if (M1840_CRNT_TOILTG_3 != null) {
                                          M1840_CRNT_TOILTG_3.checked = true;
                                          M1840_CRNT_TOILTG_3.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1845_CRNT_TOILTG_HYGN_3 =
                                          document.getElementById(
                                            "M1845_CRNT_TOILTG_HYGN_3"
                                          );
                                        if (M1845_CRNT_TOILTG_HYGN_3 != null) {
                                          M1845_CRNT_TOILTG_HYGN_3.checked = true;
                                          M1845_CRNT_TOILTG_HYGN_3.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1850_CRNT_TRNSFRNG_3 =
                                          document.getElementById(
                                            "M1850_CRNT_TRNSFRNG_3"
                                          );
                                        if (M1850_CRNT_TRNSFRNG_3 != null) {
                                          M1850_CRNT_TRNSFRNG_3.checked = true;
                                          M1850_CRNT_TRNSFRNG_3.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1860_CRNT_AMBLTN_3 =
                                          document.getElementById(
                                            "M1860_CRNT_AMBLTN_3"
                                          );
                                        if (M1860_CRNT_AMBLTN_3 != null) {
                                          M1860_CRNT_AMBLTN_3.checked = true;
                                          M1860_CRNT_AMBLTN_3.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1860_CRNT_AMBLTN_5 =
                                          document.getElementById(
                                            "M1860_CRNT_AMBLTN_5"
                                          );
                                        if (M1860_CRNT_AMBLTN_5 != null) {
                                          M1860_CRNT_AMBLTN_5.checked = true;
                                          M1860_CRNT_AMBLTN_5.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }
                                      } else if (options.adls == "4") {
                                        let M1800_CRNT_GROOMING_3 =
                                          document.getElementById(
                                            "M1800_CRNT_GROOMING_3"
                                          );
                                        if (M1800_CRNT_GROOMING_3 != null) {
                                          M1800_CRNT_GROOMING_3.checked = true;
                                          M1800_CRNT_GROOMING_3.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1810_CRNT_DRESS_UPPER_3 =
                                          document.getElementById(
                                            "M1810_CRNT_DRESS_UPPER_3"
                                          );
                                        if (M1810_CRNT_DRESS_UPPER_3 != null) {
                                          M1810_CRNT_DRESS_UPPER_3.checked = true;
                                          M1810_CRNT_DRESS_UPPER_3.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1820_CRNT_DRESS_LOWER_3 =
                                          document.getElementById(
                                            "M1820_CRNT_DRESS_LOWER_3"
                                          );
                                        if (M1820_CRNT_DRESS_LOWER_3 != null) {
                                          M1820_CRNT_DRESS_LOWER_3.checked = true;
                                          M1820_CRNT_DRESS_LOWER_3.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1830_CRNT_BATHG_6 =
                                          document.getElementById(
                                            "M1830_CRNT_BATHG_6"
                                          );
                                        if (M1830_CRNT_BATHG_6 != null) {
                                          M1830_CRNT_BATHG_6.checked = true;
                                          M1830_CRNT_BATHG_6.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1840_CRNT_TOILTG_4 =
                                          document.getElementById(
                                            "M1840_CRNT_TOILTG_4"
                                          );
                                        if (M1840_CRNT_TOILTG_4 != null) {
                                          M1840_CRNT_TOILTG_4.checked = true;
                                          M1840_CRNT_TOILTG_4.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1845_CRNT_TOILTG_HYGN_3 =
                                          document.getElementById(
                                            "M1845_CRNT_TOILTG_HYGN_3"
                                          );
                                        if (M1845_CRNT_TOILTG_HYGN_3 != null) {
                                          M1845_CRNT_TOILTG_HYGN_3.checked = true;
                                          M1845_CRNT_TOILTG_HYGN_3.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1850_CRNT_TRNSFRNG_4 =
                                          document.getElementById(
                                            "M1850_CRNT_TRNSFRNG_4"
                                          );
                                        if (M1850_CRNT_TRNSFRNG_4 != null) {
                                          M1850_CRNT_TRNSFRNG_4.checked = true;
                                          M1850_CRNT_TRNSFRNG_4.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        let M1860_CRNT_AMBLTN_6 =
                                          document.getElementById(
                                            "M1860_CRNT_AMBLTN_6"
                                          );
                                        if (M1860_CRNT_AMBLTN_6 != null) {
                                          M1860_CRNT_AMBLTN_6.checked = true;
                                          M1860_CRNT_AMBLTN_6.dispatchEvent(
                                            new Event("change", {
                                              bubbles: true,
                                            })
                                          );
                                        }

                                        //FUNCTIONAL ABILITIES AND GOALS
                                      }

                                      const anchorTags = [
                                        ...document.querySelectorAll(
                                          ".pages a"
                                        ),
                                      ].filter((a) => /\d/.test(a.textContent));
                                      anchorTags[10].click();
                                      var page11Interval = setInterval(() => {
                                        //MUSCULOSKELETAL
                                        let mus_NoDeficits_Chk_key =
                                          document.getElementById(
                                            "mus_NoDeficits_Chk_key"
                                          );
                                        let mus_Fracture_Chk_key =
                                          document.getElementById(
                                            "mus_Fracture_Chk_key"
                                          );
                                        let mus_Amputation_Chk_key =
                                          document.getElementById(
                                            "mus_Amputation_Chk_key"
                                          );
                                        let mus_AmputationBk_Chk_key =
                                          document.getElementById(
                                            "mus_AmputationBk_Chk_key"
                                          );
                                        let mus_AmputationUe_Chk_key =
                                          document.getElementById(
                                            "mus_AmputationUe_Chk_key"
                                          );
                                        let mus_AmputationR_Chk_key =
                                          document.getElementById(
                                            "mus_AmputationR_Chk_key"
                                          );
                                        let mus_AmputationAkR_Chk_key =
                                          document.getElementById(
                                            "mus_AmputationAkR_Chk_key"
                                          );
                                        let mus_AmputationUeR_Chk_key =
                                          document.getElementById(
                                            "mus_AmputationUeR_Chk_key"
                                          );
                                        let mus_AmputationL_Chk_key =
                                          document.getElementById(
                                            "mus_AmputationL_Chk_key"
                                          );
                                        let mus_AmputationAkL_Chk_key =
                                          document.getElementById(
                                            "mus_AmputationAkL_Chk_key"
                                          );
                                        let mus_AmputationUeL_Chk_key =
                                          document.getElementById(
                                            "mus_AmputationUeL_Chk_key"
                                          );
                                        let mus_Weight_Chk_key =
                                          document.getElementById(
                                            "mus_Weight_Chk_key"
                                          );
                                        let mus_Prosthesis_Chk_key =
                                          document.getElementById(
                                            "mus_Weight_Chk_key"
                                          );
                                        let mus_Other_Chk_key =
                                          document.getElementById(
                                            "mus_Other_Chk_key"
                                          );
                                        let mus_Atrophy_Chk_key =
                                          document.getElementById(
                                            "mus_Atrophy_Chk_key"
                                          );
                                        let mus_DecreasedRom_Chk_key =
                                          document.getElementById(
                                            "mus_DecreasedRom_Chk_key"
                                          );
                                        let mus_Paresthesia_Chk_key =
                                          document.getElementById(
                                            "mus_Paresthesia_Chk_key"
                                          );
                                        let mus_Swollen_Chk_key =
                                          document.getElementById(
                                            "mus_Swollen_Chk_key"
                                          );
                                        let mus_Hemiplegia_Chk_key =
                                          document.getElementById(
                                            "mus_Hemiplegia_Chk_key"
                                          );
                                        let mus_Paraplegia_Chk_key =
                                          document.getElementById(
                                            "mus_Hemiplegia_Chk_key"
                                          );
                                        let mus_Quadriplegia_Chk_key =
                                          document.getElementById(
                                            "mus_Quadriplegia_Chk_key"
                                          );
                                        let mus_Contractures_Chk_key =
                                          document.getElementById(
                                            "mus_Contractures_Chk_key"
                                          );
                                        let mus_Shuffling_Chk_key =
                                          document.getElementById(
                                            "mus_Shuffling_Chk_key"
                                          );
                                        let mus_Weakness_Chk_key =
                                          document.getElementById(
                                            "mus_Weakness_Chk_key"
                                          );
                                        let mus_Other1_Chk_key =
                                          document.getElementById(
                                            "mus_Other1_Chk_key"
                                          );
                                        // let mus_NoDeficits_Chk_key=document.getElementById("mus_NoDeficits_Chk_key")
                                        if (mus_NoDeficits_Chk_key != null) {
                                          if (options.adls == "1") {
                                            mus_NoDeficits_Chk_key.checked = false;
                                            mus_NoDeficits_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Amputation_Chk_key.checked = false;
                                            mus_Amputation_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Fracture_Chk_key.checked = false;
                                            mus_Fracture_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationBk_Chk_key.checked = false;
                                            mus_AmputationBk_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationUe_Chk_key.checked = false;
                                            mus_AmputationUe_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationR_Chk_key.checked = false;
                                            mus_AmputationR_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationAkR_Chk_key.checked = false;
                                            mus_AmputationAkR_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationUeR_Chk_key.checked = false;
                                            mus_AmputationUeR_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationL_Chk_key.checked = false;
                                            mus_AmputationL_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationAkL_Chk_key.checked = false;
                                            mus_AmputationAkL_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationUeL_Chk_key.checked = false;
                                            mus_AmputationUeL_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Weight_Chk_key.checked = false;
                                            mus_Weight_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Prosthesis_Chk_key.checked = false;
                                            mus_Prosthesis_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Other_Chk_key.checked = false;
                                            mus_Other_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Atrophy_Chk_key.checked = false;
                                            mus_Atrophy_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_DecreasedRom_Chk_key.checked = false;
                                            mus_DecreasedRom_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Paresthesia_Chk_key.checked = false;
                                            mus_Paresthesia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Swollen_Chk_key.checked = false;
                                            mus_Swollen_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Hemiplegia_Chk_key.checked = false;
                                            mus_Hemiplegia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Paraplegia_Chk_key.checked = false;
                                            mus_Paraplegia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Quadriplegia_Chk_key.checked = false;
                                            mus_Quadriplegia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Contractures_Chk_key.checked = false;
                                            mus_Contractures_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Shuffling_Chk_key.checked = true;
                                            mus_Shuffling_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Weakness_Chk_key.checked = false;
                                            mus_Weakness_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Other1_Chk_key.checked = false;
                                            mus_Other1_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            // mus_NoDeficits_Chk_key.checked=false
                                          } else if (options.adls == "2") {
                                            mus_NoDeficits_Chk_key.checked = false;
                                            mus_NoDeficits_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Amputation_Chk_key.checked = false;
                                            mus_Amputation_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Fracture_Chk_key.checked = false;
                                            mus_Fracture_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationBk_Chk_key.checked = false;
                                            mus_AmputationBk_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationUe_Chk_key.checked = false;
                                            mus_AmputationUe_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationR_Chk_key.checked = false;
                                            mus_AmputationR_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationAkR_Chk_key.checked = false;
                                            mus_AmputationAkR_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationUeR_Chk_key.checked = false;
                                            mus_AmputationUeR_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationL_Chk_key.checked = false;
                                            mus_AmputationL_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationAkL_Chk_key.checked = false;
                                            mus_AmputationAkL_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationUeL_Chk_key.checked = false;
                                            mus_AmputationUeL_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Weight_Chk_key.checked = false;
                                            mus_Weight_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Prosthesis_Chk_key.checked = false;
                                            mus_Prosthesis_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Other_Chk_key.checked = false;
                                            mus_Other_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Atrophy_Chk_key.checked = false;
                                            mus_Atrophy_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_DecreasedRom_Chk_key.checked = false;
                                            mus_DecreasedRom_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Paresthesia_Chk_key.checked = false;
                                            mus_Paresthesia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Swollen_Chk_key.checked = false;
                                            mus_Swollen_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Hemiplegia_Chk_key.checked = false;
                                            mus_Hemiplegia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Paraplegia_Chk_key.checked = false;
                                            mus_Paraplegia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Quadriplegia_Chk_key.checked = false;
                                            mus_Quadriplegia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Contractures_Chk_key.checked = false;
                                            mus_Contractures_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Shuffling_Chk_key.checked = true;
                                            mus_Shuffling_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Weakness_Chk_key.checked = false;
                                            mus_Weakness_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Other1_Chk_key.checked = false;
                                            mus_Other1_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );
                                          } else if (options.adls == "3") {
                                            mus_NoDeficits_Chk_key.checked = false;
                                            mus_NoDeficits_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Amputation_Chk_key.checked = false;
                                            mus_Amputation_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Fracture_Chk_key.checked = false;
                                            mus_Fracture_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationBk_Chk_key.checked = false;
                                            mus_AmputationBk_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationUe_Chk_key.checked = false;
                                            mus_AmputationUe_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationR_Chk_key.checked = false;
                                            mus_AmputationR_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationAkR_Chk_key.checked = false;
                                            mus_AmputationAkR_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationUeR_Chk_key.checked = false;
                                            mus_AmputationUeR_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationL_Chk_key.checked = false;
                                            mus_AmputationL_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationAkL_Chk_key.checked = false;
                                            mus_AmputationAkL_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationUeL_Chk_key.checked = false;
                                            mus_AmputationUeL_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Weight_Chk_key.checked = true;
                                            mus_Weight_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Prosthesis_Chk_key.checked = false;
                                            mus_Prosthesis_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Other_Chk_key.checked = false;
                                            mus_Other_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Atrophy_Chk_key.checked = false;
                                            mus_Atrophy_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_DecreasedRom_Chk_key.checked = false;
                                            mus_DecreasedRom_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Paresthesia_Chk_key.checked = false;
                                            mus_Paresthesia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Swollen_Chk_key.checked = false;
                                            mus_Swollen_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Hemiplegia_Chk_key.checked = false;
                                            mus_Hemiplegia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Paraplegia_Chk_key.checked = false;
                                            mus_Paraplegia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Quadriplegia_Chk_key.checked = false;
                                            mus_Quadriplegia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Contractures_Chk_key.checked = false;
                                            mus_Contractures_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Shuffling_Chk_key.checked = false;
                                            mus_Shuffling_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Weakness_Chk_key.checked = true;
                                            mus_Weakness_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Other1_Chk_key.checked = false;
                                            mus_Other1_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );
                                          } else if (options.adls == "4") {
                                            mus_NoDeficits_Chk_key.checked = false;
                                            mus_NoDeficits_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Amputation_Chk_key.checked = false;
                                            mus_Amputation_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Fracture_Chk_key.checked = false;
                                            mus_Fracture_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationBk_Chk_key.checked = false;
                                            mus_AmputationBk_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationUe_Chk_key.checked = false;
                                            mus_AmputationUe_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationR_Chk_key.checked = false;
                                            mus_AmputationR_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationAkR_Chk_key.checked = false;
                                            mus_AmputationAkR_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationUeR_Chk_key.checked = false;
                                            mus_AmputationUeR_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationL_Chk_key.checked = false;
                                            mus_AmputationL_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationAkL_Chk_key.checked = false;
                                            mus_AmputationAkL_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_AmputationUeL_Chk_key.checked = false;
                                            mus_AmputationUeL_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Weight_Chk_key.checked = false;
                                            mus_Weight_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Prosthesis_Chk_key.checked = false;
                                            mus_Prosthesis_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Other_Chk_key.checked = false;
                                            mus_Other_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Atrophy_Chk_key.checked = false;
                                            mus_Atrophy_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_DecreasedRom_Chk_key.checked = true;
                                            mus_DecreasedRom_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Paresthesia_Chk_key.checked = false;
                                            mus_Paresthesia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Swollen_Chk_key.checked = false;
                                            mus_Swollen_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Hemiplegia_Chk_key.checked = false;
                                            mus_Hemiplegia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Paraplegia_Chk_key.checked = false;
                                            mus_Paraplegia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Quadriplegia_Chk_key.checked = false;
                                            mus_Quadriplegia_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Contractures_Chk_key.checked = false;
                                            mus_Contractures_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Shuffling_Chk_key.checked = false;
                                            mus_Shuffling_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Weakness_Chk_key.checked = true;
                                            mus_Weakness_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );

                                            mus_Other1_Chk_key.checked = false;
                                            mus_Other1_Chk_key.dispatchEvent(
                                              new Event("change", {
                                                bubbles: true,
                                              })
                                            );
                                          }
                                          const anchorTags = [
                                            ...document.querySelectorAll(
                                              ".pages a"
                                            ),
                                          ].filter((a) =>
                                            /\d/.test(a.textContent)
                                          );
                                          anchorTags[11].click();
                                          var page12Interval = setInterval(
                                            () => {
                                              let nvn1_Color_Chk_key =
                                                document.getElementById(
                                                  "nvn1_Color_Chk_key"
                                                );
                                              let nvn1_Color_Rdo_0_1 =
                                                document.getElementById(
                                                  "nvn1_Color_Rdo_0_1"
                                                );

                                              let nvn1_SkinTurgor_Chk_key =
                                                document.getElementById(
                                                  "nvn1_SkinTurgor_Chk_key"
                                                );
                                              if (nvn1_Color_Chk_key != null) {
                                                nvn1_Color_Rdo_0_1.checked = true;
                                                nvn1_Color_Rdo_0_1.dispatchEvent(
                                                  new Event("change", {
                                                    bubbles: true,
                                                  })
                                                );

                                                nvn1_Color_Chk_key.checked = true;
                                                nvn1_Color_Chk_key.dispatchEvent(
                                                  new Event("change", {
                                                    bubbles: true,
                                                  })
                                                );

                                                nvn1_SkinTurgor_Chk_key.checked = true;
                                                nvn1_SkinTurgor_Chk_key.dispatchEvent(
                                                  new Event("change", {
                                                    bubbles: true,
                                                  })
                                                );

                                                let nvn1_SkinTurgor_Rdo_2 =
                                                  document.getElementById(
                                                    "nvn1_SkinTurgor_Rdo_2"
                                                  );
                                                let nvn1_Temperature_Chk_key =
                                                  document.getElementById(
                                                    "nvn1_Temperature_Chk_key"
                                                  );

                                                nvn1_SkinTurgor_Rdo_2.checked = true;
                                                nvn1_SkinTurgor_Rdo_2.dispatchEvent(
                                                  new Event("change", {
                                                    bubbles: true,
                                                  })
                                                );

                                                nvn1_Temperature_Chk_key.checked = true;
                                                nvn1_Temperature_Chk_key.dispatchEvent(
                                                  new Event("change", {
                                                    bubbles: true,
                                                  })
                                                );

                                                let nvn1_TemperaWarm_Chk_key =
                                                  document.getElementById(
                                                    "nvn1_TemperaWarm_Chk_key"
                                                  );
                                                if (
                                                  nvn1_TemperaWarm_Chk_key !=
                                                  null
                                                )
                                                  if (
                                                    options.diagnosis == "wound"
                                                  ) {
                                                    let nvn1_WoundIdenti_Rdo_1 =
                                                      document.getElementById(
                                                        "nvn1_WoundIdenti_Rdo_1"
                                                      );
                                                    if (
                                                      nvn1_WoundIdenti_Rdo_1 !=
                                                      null
                                                    ) {
                                                      nvn1_WoundIdenti_Rdo_1.checked = true;
                                                      nvn1_WoundIdenti_Rdo_1.dispatchEvent(
                                                        new Event("change", {
                                                          bubbles: true,
                                                        })
                                                      );
                                                    }
                                                  }

                                                let M1306_UNHLD_STG2_PRSR_ULCR_0 =
                                                  document.getElementById(
                                                    "M1306_UNHLD_STG2_PRSR_ULCR_0"
                                                  );
                                                if (
                                                  M1306_UNHLD_STG2_PRSR_ULCR_0 !=
                                                  null
                                                ) {
                                                  M1306_UNHLD_STG2_PRSR_ULCR_0.checked = true;
                                                  M1306_UNHLD_STG2_PRSR_ULCR_0.dispatchEvent(
                                                    new Event("change", {
                                                      bubbles: true,
                                                    })
                                                  );
                                                }

                                                let M1322_NBR_PRSULC_STG1_0 =
                                                  document.getElementById(
                                                    "M1322_NBR_PRSULC_STG1_0"
                                                  );
                                                if (
                                                  M1322_NBR_PRSULC_STG1_0 !=
                                                  null
                                                ) {
                                                  M1322_NBR_PRSULC_STG1_0.checked = true;
                                                  M1322_NBR_PRSULC_STG1_0.dispatchEvent(
                                                    new Event("change", {
                                                      bubbles: true,
                                                    })
                                                  );
                                                }

                                                let M1324_STG_PRBLM_ULCER_NA =
                                                  document.getElementById(
                                                    "M1324_STG_PRBLM_ULCER_NA"
                                                  );
                                                if (
                                                  M1324_STG_PRBLM_ULCER_NA !=
                                                  null
                                                ) {
                                                  M1324_STG_PRBLM_ULCER_NA.checked = true;
                                                  M1324_STG_PRBLM_ULCER_NA.dispatchEvent(
                                                    new Event("change", {
                                                      bubbles: true,
                                                    })
                                                  );
                                                }

                                                let M1330_STAS_ULCR_PRSNT_0 =
                                                  document.getElementById(
                                                    "M1330_STAS_ULCR_PRSNT_0"
                                                  );
                                                if (
                                                  M1330_STAS_ULCR_PRSNT_0 !=
                                                  null
                                                ) {
                                                  M1330_STAS_ULCR_PRSNT_0.checked = true;
                                                  M1330_STAS_ULCR_PRSNT_0.dispatchEvent(
                                                    new Event("change", {
                                                      bubbles: true,
                                                    })
                                                  );
                                                }

                                                let M1340_SRGCL_WND_PRSNT_0 =
                                                  document.getElementById(
                                                    "M1340_SRGCL_WND_PRSNT_0"
                                                  );
                                                if (
                                                  M1340_SRGCL_WND_PRSNT_0 !=
                                                  null
                                                ) {
                                                  M1340_SRGCL_WND_PRSNT_0.checked = true;
                                                  M1340_SRGCL_WND_PRSNT_0.dispatchEvent(
                                                    new Event("change", {
                                                      bubbles: true,
                                                    })
                                                  );
                                                }

                                                //MEdication
                                                const anchorTags = [
                                                  ...document.querySelectorAll(
                                                    ".pages a"
                                                  ),
                                                ].filter((a) =>
                                                  /\d/.test(a.textContent)
                                                );
                                                anchorTags[12].click();

                                                var page13Interval =
                                                  setInterval(() => {
                                                    let M2001_DRUG_RGMN_RVW_0 =
                                                      document.getElementById(
                                                        "M2001_DRUG_RGMN_RVW_0"
                                                      );
                                                    if (
                                                      M2001_DRUG_RGMN_RVW_0 !=
                                                      null
                                                    ) {
                                                      M2001_DRUG_RGMN_RVW_0.checked = true;
                                                      M2001_DRUG_RGMN_RVW_0.dispatchEvent(
                                                        new Event("change", {
                                                          bubbles: true,
                                                        })
                                                      );

                                                      if (options.adls == "1") {
                                                        let M2020_CRNT_MGMT_ORAL_MDCTN_0 =
                                                          document.getElementById(
                                                            "M2020_CRNT_MGMT_ORAL_MDCTN_0"
                                                          );
                                                        if (
                                                          M2020_CRNT_MGMT_ORAL_MDCTN_0 !=
                                                          null
                                                        ) {
                                                          M2020_CRNT_MGMT_ORAL_MDCTN_0.checked = true;
                                                          M2020_CRNT_MGMT_ORAL_MDCTN_0.dispatchEvent(
                                                            new Event(
                                                              "change",
                                                              { bubbles: true }
                                                            )
                                                          );
                                                        }
                                                      } else if (
                                                        options.adls == "2"
                                                      ) {
                                                        let M2020_CRNT_MGMT_ORAL_MDCTN_2 =
                                                          document.getElementById(
                                                            "M2020_CRNT_MGMT_ORAL_MDCTN_2"
                                                          );
                                                        if (
                                                          M2020_CRNT_MGMT_ORAL_MDCTN_2 !=
                                                          null
                                                        ) {
                                                          M2020_CRNT_MGMT_ORAL_MDCTN_2.checked = true;
                                                          M2020_CRNT_MGMT_ORAL_MDCTN_2.dispatchEvent(
                                                            new Event(
                                                              "change",
                                                              { bubbles: true }
                                                            )
                                                          );
                                                        }
                                                      } else if (
                                                        options.adls == "3"
                                                      ) {
                                                        let M2020_CRNT_MGMT_ORAL_MDCTN_2 =
                                                          document.getElementById(
                                                            "M2020_CRNT_MGMT_ORAL_MDCTN_2"
                                                          );
                                                        if (
                                                          M2020_CRNT_MGMT_ORAL_MDCTN_2 !=
                                                          null
                                                        ) {
                                                          M2020_CRNT_MGMT_ORAL_MDCTN_2.checked = true;
                                                          M2020_CRNT_MGMT_ORAL_MDCTN_2.dispatchEvent(
                                                            new Event(
                                                              "change",
                                                              { bubbles: true }
                                                            )
                                                          );
                                                        }
                                                      } else if (
                                                        options.adls == "4"
                                                      ) {
                                                        let M2020_CRNT_MGMT_ORAL_MDCTN_3 =
                                                          document.getElementById(
                                                            "M2020_CRNT_MGMT_ORAL_MDCTN_3"
                                                          );
                                                        if (
                                                          M2020_CRNT_MGMT_ORAL_MDCTN_3 !=
                                                          null
                                                        ) {
                                                          M2020_CRNT_MGMT_ORAL_MDCTN_3.checked = true;
                                                          M2020_CRNT_MGMT_ORAL_MDCTN_3.dispatchEvent(
                                                            new Event(
                                                              "change",
                                                              { bubbles: true }
                                                            )
                                                          );
                                                        }
                                                      }

                                                      let M2030_CRNT_MGMT_INJCTN_MDCTN_NA =
                                                        document.getElementById(
                                                          "M2030_CRNT_MGMT_INJCTN_MDCTN_NA"
                                                        );
                                                      if (
                                                        M2030_CRNT_MGMT_INJCTN_MDCTN_NA !=
                                                        null
                                                      ) {
                                                        M2030_CRNT_MGMT_INJCTN_MDCTN_NA.checked = true;
                                                        M2030_CRNT_MGMT_INJCTN_MDCTN_NA.dispatchEvent(
                                                          new Event("change", {
                                                            bubbles: true,
                                                          })
                                                        );
                                                      }

                                                      let mem_PrescribedMedications_Rdo_0_1 =
                                                        document.getElementById(
                                                          "mem_PrescribedMedications_Rdo_0_1"
                                                        );
                                                      if (
                                                        mem_PrescribedMedications_Rdo_0_1 !=
                                                        null
                                                      ) {
                                                        mem_PrescribedMedications_Rdo_0_1.checked = true;
                                                        mem_PrescribedMedications_Rdo_0_1.dispatchEvent(
                                                          new Event("change", {
                                                            bubbles: true,
                                                          })
                                                        );
                                                      }

                                                      let mem_ManageMedications_Rdo_1 =
                                                        document.getElementById(
                                                          "mem_ManageMedications_Rdo_1"
                                                        );
                                                      if (
                                                        mem_ManageMedications_Rdo_1 !=
                                                        null
                                                      ) {
                                                        mem_ManageMedications_Rdo_1.checked = true;
                                                        mem_ManageMedications_Rdo_1.dispatchEvent(
                                                          new Event("change", {
                                                            bubbles: true,
                                                          })
                                                        );
                                                      }

                                                      let mem_CurrentPrescribed_Rdo_0_0 =
                                                        document.getElementById(
                                                          "mem_CurrentPrescribed_Rdo_0_0"
                                                        );
                                                      if (
                                                        mem_CurrentPrescribed_Rdo_0_0 !=
                                                        null
                                                      ) {
                                                        mem_CurrentPrescribed_Rdo_0_0.checked = true;
                                                        mem_CurrentPrescribed_Rdo_0_0.dispatchEvent(
                                                          new Event("change", {
                                                            bubbles: true,
                                                          })
                                                        );
                                                      }

                                                      let mem_Storage_Chk_key =
                                                        document.getElementById(
                                                          "mem_Storage_Chk_key"
                                                        );
                                                      let mem_Disposal_Chk_key =
                                                        document.getElementById(
                                                          "mem_Disposal_Chk_key"
                                                        );
                                                      let mem_Expirationdates_Chk_key =
                                                        document.getElementById(
                                                          "mem_Expirationdates_Chk_key"
                                                        );
                                                      let mem_Clearlylabeled_Chk_key =
                                                        document.getElementById(
                                                          "mem_Clearlylabeled_Chk_key"
                                                        );
                                                      let mem_Other_Chk_key =
                                                        document.getElementById(
                                                          "mem_Other_Chk_key"
                                                        );
                                                      let mem_PillBox_Chk_key =
                                                        document.getElementById(
                                                          "mem_PillBox_Chk_key"
                                                        );
                                                      let mem_NoMedication_Chk_key =
                                                        document.getElementById(
                                                          "mem_NoMedication_Chk_key"
                                                        );

                                                      if (
                                                        mem_Storage_Chk_key !=
                                                        null
                                                      ) {
                                                        mem_Storage_Chk_key.checked = true;
                                                        mem_Storage_Chk_key.dispatchEvent(
                                                          new Event("change", {
                                                            bubbles: true,
                                                          })
                                                        );

                                                        mem_Disposal_Chk_key.checked = true;
                                                        mem_Disposal_Chk_key.dispatchEvent(
                                                          new Event("change", {
                                                            bubbles: true,
                                                          })
                                                        );

                                                        mem_Expirationdates_Chk_key.checked = true;
                                                        mem_Expirationdates_Chk_key.dispatchEvent(
                                                          new Event("change", {
                                                            bubbles: true,
                                                          })
                                                        );

                                                        mem_Clearlylabeled_Chk_key.checked = false;
                                                        mem_Clearlylabeled_Chk_key.dispatchEvent(
                                                          new Event("change", {
                                                            bubbles: true,
                                                          })
                                                        );

                                                        mem_NoMedication_Chk_key.checked = false;
                                                        mem_NoMedication_Chk_key.dispatchEvent(
                                                          new Event("change", {
                                                            bubbles: true,
                                                          })
                                                        );

                                                        mem_PillBox_Chk_key.checked = false;
                                                        mem_PillBox_Chk_key.dispatchEvent(
                                                          new Event("change", {
                                                            bubbles: true,
                                                          })
                                                        );

                                                        mem_Other_Chk_key.checked = false;
                                                        mem_Other_Chk_key.dispatchEvent(
                                                          new Event("change", {
                                                            bubbles: true,
                                                          })
                                                        );
                                                      }

                                                      //SPECIAL TREATMENT, PROCEDURES, AND PROGRAMS
                                                      const anchorTags = [
                                                        ...document.querySelectorAll(
                                                          ".pages a"
                                                        ),
                                                      ].filter((a) =>
                                                        /\d/.test(a.textContent)
                                                      );
                                                      anchorTags[13].click();
                                                      var page14Interval =
                                                        setInterval(() => {
                                                          let mrf_Mostrecntfall_Rdo_5 =
                                                            document.getElementById(
                                                              "mrf_Mostrecntfall_Rdo_5"
                                                            );
                                                          if (
                                                            mrf_Mostrecntfall_Rdo_5 !=
                                                            null
                                                          ) {
                                                            mrf_Mostrecntfall_Rdo_5.checked = true;
                                                            mrf_Mostrecntfall_Rdo_5.dispatchEvent(
                                                              new Event(
                                                                "change",
                                                                {
                                                                  bubbles: true,
                                                                }
                                                              )
                                                            );

                                                            let FallRiskAssessment1_key =
                                                              document.getElementById(
                                                                "FallRiskAssessment1_key"
                                                              );
                                                            let FallRiskAssessment2_key =
                                                              document.getElementById(
                                                                "FallRiskAssessment2_key"
                                                              );
                                                            let FallRiskAssessment3_key =
                                                              document.getElementById(
                                                                "FallRiskAssessment3_key"
                                                              );
                                                            let FallRiskAssessment4_key =
                                                              document.getElementById(
                                                                "FallRiskAssessment4_key"
                                                              );
                                                            let FallRiskAssessment5_key =
                                                              document.getElementById(
                                                                "FallRiskAssessment5_key"
                                                              );
                                                            let FallRiskAssessment6_key =
                                                              document.getElementById(
                                                                "FallRiskAssessment6_key"
                                                              );
                                                            let FallRiskAssessment7_key =
                                                              document.getElementById(
                                                                "FallRiskAssessment7_key"
                                                              );
                                                            let FallRiskAssessment8_key =
                                                              document.getElementById(
                                                                "FallRiskAssessment7_key"
                                                              );
                                                            let FallRiskAssessment9_key =
                                                              document.getElementById(
                                                                "FallRiskAssessment9_key"
                                                              );
                                                            let FallRiskAssessment10_key =
                                                              document.getElementById(
                                                                "FallRiskAssessment10_key"
                                                              );

                                                            if (
                                                              options.mental ==
                                                              "forgetful"
                                                            ) {
                                                              if (
                                                                FallRiskAssessment1_key !=
                                                                null
                                                              ) {
                                                                FallRiskAssessment1_key.checked = true;
                                                                FallRiskAssessment1_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment2_key.checked = true;
                                                                FallRiskAssessment2_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment6_key.checked = true;
                                                                FallRiskAssessment6_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment8_key.checked = true;
                                                                FallRiskAssessment8_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment10_key.checked = true;
                                                                FallRiskAssessment10_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment9_key.checked = false;
                                                                FallRiskAssessment9_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment7_key.checked = false;
                                                                FallRiskAssessment7_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment5_key.checked = false;
                                                                FallRiskAssessment5_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment4_key.checked = false;
                                                                FallRiskAssessment4_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment3_key.checked = false;
                                                                FallRiskAssessment3_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );
                                                              } else if (
                                                                options.mental ==
                                                                "aaox4"
                                                              ) {
                                                                FallRiskAssessment1_key.checked = true;
                                                                FallRiskAssessment1_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment2_key.checked = true;
                                                                FallRiskAssessment2_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment6_key.checked = true;
                                                                FallRiskAssessment6_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment8_key.checked = false;
                                                                FallRiskAssessment8_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment10_key.checked = false;
                                                                FallRiskAssessment10_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment9_key.checked = false;
                                                                FallRiskAssessment9_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment7_key.checked = false;
                                                                FallRiskAssessment7_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment5_key.checked = false;
                                                                FallRiskAssessment5_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment4_key.checked = false;
                                                                FallRiskAssessment4_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );

                                                                FallRiskAssessment3_key.checked = false;
                                                                mrf_Mostrecntfall_Rdo_5.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );
                                                                FallRiskAssessment3_key.dispatchEvent(
                                                                  new Event(
                                                                    "change",
                                                                    {
                                                                      bubbles: true,
                                                                    }
                                                                  )
                                                                );
                                                              }
                                                            }

                                                            let ris_RiskAssessment1_Chk_key =
                                                              document.getElementById(
                                                                "ris_RiskAssessment1_Chk_key"
                                                              );
                                                            let ris_RiskAssessment3_Chk_key =
                                                              document.getElementById(
                                                                "ris_RiskAssessment3_Chk_key"
                                                              );
                                                            let ris_RiskAssessment5_Chk_key =
                                                              document.getElementById(
                                                                "ris_RiskAssessment5_Chk_key"
                                                              );
                                                            let ris_RiskAssessment7_Chk_key =
                                                              document.getElementById(
                                                                "ris_RiskAssessment7_Chk_key"
                                                              );
                                                            let ris_RiskAssessment9_Chk_key =
                                                              document.getElementById(
                                                                "ris_RiskAssessment9_Chk_key"
                                                              );
                                                            let ris_RiskAssessment11_Chk_key =
                                                              document.getElementById(
                                                                "ris_RiskAssessment11_Chk_key"
                                                              );
                                                            let ris_RiskAssessment2_Chk_key =
                                                              document.getElementById(
                                                                "ris_RiskAssessment2_Chk_key"
                                                              );
                                                            let ris_RiskAssessment4_Chk_key =
                                                              document.getElementById(
                                                                "ris_RiskAssessment4_Chk_key"
                                                              );
                                                            let ris_RiskAssessment6_Chk_key =
                                                              document.getElementById(
                                                                "ris_RiskAssessment6_Chk_key"
                                                              );
                                                            let ris_RiskAssessment8_Chk_key =
                                                              document.getElementById(
                                                                "ris_RiskAssessment8_Chk_key"
                                                              );
                                                            let ris_RiskAssessment10_Chk_key =
                                                              document.getElementById(
                                                                "ris_RiskAssessment10_Chk_key"
                                                              );

                                                            if (
                                                              ris_RiskAssessment3_Chk_key !=
                                                              null
                                                            ) {
                                                              ris_RiskAssessment3_Chk_key.checked = true;
                                                              ris_RiskAssessment3_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ris_RiskAssessment5_Chk_key.checked = true;
                                                              ris_RiskAssessment5_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ris_RiskAssessment7_Chk_key.checked = true;
                                                              ris_RiskAssessment7_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ris_RiskAssessment9_Chk_key.checked = true;

                                                              ris_RiskAssessment9_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ris_RiskAssessment11_Chk_key.checked = false;
                                                              ris_RiskAssessment11_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ris_RiskAssessment2_Chk_key.checked = false;
                                                              ris_RiskAssessment2_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ris_RiskAssessment4_Chk_key.checked = false;
                                                              ris_RiskAssessment4_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ris_RiskAssessment6_Chk_key.checked = false;
                                                              ris_RiskAssessment6_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ris_RiskAssessment10_Chk_key.checked = false;
                                                              ris_RiskAssessment10_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ris_RiskAssessment8_Chk_key.checked = false;
                                                              ris_RiskAssessment8_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ris_RiskAssessment1_Chk_key.checked = false;
                                                              ris_RiskAssessment1_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );
                                                            }

                                                            let M1033_HOSP_RISK_HSTRY_FALLS_key =
                                                              document.getElementById(
                                                                "M1033_HOSP_RISK_HSTRY_FALLS_key"
                                                              );
                                                            let M1033_HOSP_RISK_WEIGHT_LOSS_key =
                                                              document.getElementById(
                                                                "M1033_HOSP_RISK_HSTRY_FALLS_key"
                                                              );
                                                            let M1033_HOSP_RISK_MLTPL_HOSPZTN_key =
                                                              document.getElementById(
                                                                "M1033_HOSP_RISK_MLTPL_HOSPZTN_key"
                                                              );
                                                            let M1033_HOSP_RISK_MLTPL_ED_VISIT_key =
                                                              document.getElementById(
                                                                "M1033_HOSP_RISK_MLTPL_ED_VISIT_key"
                                                              );
                                                            let M1033_HOSP_RISK_MNTL_BHV_DCLN_key =
                                                              document.getElementById(
                                                                "M1033_HOSP_RISK_MNTL_BHV_DCLN_key"
                                                              );
                                                            let M1033_HOSP_RISK_COMPLIANCE_key =
                                                              document.getElementById(
                                                                "M1033_HOSP_RISK_COMPLIANCE_key"
                                                              );
                                                            let M1033_HOSP_RISK_5PLUS_MDCTN_key =
                                                              document.getElementById(
                                                                "M1033_HOSP_RISK_5PLUS_MDCTN_key"
                                                              );
                                                            let M1033_HOSP_RISK_CRNT_EXHSTN_key =
                                                              document.getElementById(
                                                                "M1033_HOSP_RISK_CRNT_EXHSTN_key"
                                                              );
                                                            let M1033_HOSP_RISK_OTHR_RISK_key =
                                                              document.getElementById(
                                                                "M1033_HOSP_RISK_OTHR_RISK_key"
                                                              );
                                                            let M1033_HOSP_RISK_NONE_ABOVE_key =
                                                              document.getElementById(
                                                                "M1033_HOSP_RISK_NONE_ABOVE_key"
                                                              );

                                                            if (
                                                              M1033_HOSP_RISK_HSTRY_FALLS_key !=
                                                              null
                                                            ) {
                                                              M1033_HOSP_RISK_COMPLIANCE_key.checked = true;
                                                              M1033_HOSP_RISK_COMPLIANCE_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              M1033_HOSP_RISK_5PLUS_MDCTN_key.checked = true;
                                                              M1033_HOSP_RISK_5PLUS_MDCTN_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              M1033_HOSP_RISK_CRNT_EXHSTN_key.checked = true;
                                                              M1033_HOSP_RISK_CRNT_EXHSTN_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              M1033_HOSP_RISK_WEIGHT_LOSS_key.checked = false;
                                                              M1033_HOSP_RISK_WEIGHT_LOSS_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              M1033_HOSP_RISK_NONE_ABOVE_key.checked = false;
                                                              M1033_HOSP_RISK_NONE_ABOVE_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              M1033_HOSP_RISK_OTHR_RISK_key.checked = false;
                                                              M1033_HOSP_RISK_OTHR_RISK_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              M1033_HOSP_RISK_MLTPL_ED_VISIT_key.checked = false;
                                                              M1033_HOSP_RISK_MLTPL_ED_VISIT_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              M1033_HOSP_RISK_MLTPL_HOSPZTN_key.checked = false;
                                                              M1033_HOSP_RISK_MLTPL_HOSPZTN_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              M1033_HOSP_RISK_MNTL_BHV_DCLN_key.checked = false;
                                                              M1033_HOSP_RISK_MNTL_BHV_DCLN_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );
                                                            }

                                                            //Materials provided
                                                            let ins_InstructMaterial1_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterial1_Chk_key"
                                                              );
                                                            let ins_InstructMaterial2_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterial2_Chk_key"
                                                              );
                                                            let ins_InstructMaterial3_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterial3_Chk_key"
                                                              );
                                                            let ins_InstructMaterial4_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterial4_Chk_key"
                                                              );
                                                            let ins_InstructMaterial7_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterial7_Chk_key"
                                                              );
                                                            let ins_InstructMaterial8_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterial8_Chk_key"
                                                              );
                                                            let ins_InstructMaterial5_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterial5_Chk_key"
                                                              );
                                                            let ins_InstructMaterial6_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterial6_Chk_key"
                                                              );
                                                            let ins_InstructMaterial9_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterial9_Chk_key"
                                                              );
                                                            let ins_InstructMaterial10_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterial10_Chk_key"
                                                              );
                                                            let ins_InstructMaterial11_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterial11_Chk_key"
                                                              );
                                                            let ins_InstructMaterialOther_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterialOther_Chk_key"
                                                              );
                                                            let ins_InstructMaterial13_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterial13_Chk_key"
                                                              );
                                                            let ins_InstructMaterial15_Chk_key =
                                                              document.getElementById(
                                                                "ins_InstructMaterial15_Chk_key"
                                                              );

                                                            if (
                                                              ins_InstructMaterial15_Chk_key !=
                                                              null
                                                            ) {
                                                              ins_InstructMaterial6_Chk_key.checked = true;
                                                              ins_InstructMaterial6_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ins_InstructMaterial9_Chk_key.checked = true;
                                                              ins_InstructMaterial9_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ins_InstructMaterial13_Chk_key.checked = true;
                                                              ins_InstructMaterial13_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ins_InstructMaterial2_Chk_key.checked = true;
                                                              ins_InstructMaterial2_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ins_InstructMaterial2_Chk_key.checked = true;
                                                              ins_InstructMaterial2_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ins_InstructMaterial10_Chk_key.checked = true;
                                                              ins_InstructMaterial10_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ins_InstructMaterial3_Chk_key.checked = true;
                                                              ins_InstructMaterial3_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ins_InstructMaterial5_Chk_key.checked = true;
                                                              ins_InstructMaterial5_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ins_InstructMaterial11_Chk_key.checked = true;
                                                              ins_InstructMaterial11_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ins_InstructMaterial15_Chk_key.checked = true;
                                                              ins_InstructMaterial15_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ins_InstructMaterial4_Chk_key.checked = true;
                                                              ins_InstructMaterial4_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ins_InstructMaterial1_Chk_key.checked = true;
                                                              ins_InstructMaterial1_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ins_InstructMaterialOther_Chk_key.checked = false;
                                                              ins_InstructMaterialOther_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );

                                                              ins_InstructMaterial7_Chk_key.checked = false;
                                                              ins_InstructMaterial7_Chk_key.dispatchEvent(
                                                                new Event(
                                                                  "change",
                                                                  {
                                                                    bubbles: true,
                                                                  }
                                                                )
                                                              );
                                                            }

                                                            // CARE PLANNING/COORDINATION
                                                            const anchorTags = [
                                                              ...document.querySelectorAll(
                                                                ".pages a"
                                                              ),
                                                            ].filter((a) =>
                                                              /\d/.test(
                                                                a.textContent
                                                              )
                                                            );
                                                            anchorTags[14].click();

                                                            var page15Interval =
                                                              setInterval(
                                                                () => {
                                                                  let care_PatientRepCare_Chk_key =
                                                                    document.getElementById(
                                                                      "care_PatientRepCare_Chk_key"
                                                                    );
                                                                  let care_Physician_Chk_key =
                                                                    document.getElementById(
                                                                      "care_Physician_Chk_key"
                                                                    );
                                                                  let care_CaseMgr_Chk_key =
                                                                    document.getElementById(
                                                                      "care_CaseMgr_Chk_key"
                                                                    );
                                                                  let care_Clinical_Chk_key =
                                                                    document.getElementById(
                                                                      "care_Clinical_Chk_key"
                                                                    );
                                                                  let care_ClinicalSn_Chk_key =
                                                                    document.getElementById(
                                                                      "care_ClinicalSn_Chk_key"
                                                                    );
                                                                  let care_ClinicalPt_Chk_key =
                                                                    document.getElementById(
                                                                      "care_ClinicalPt_Chk_key"
                                                                    );
                                                                  let care_ClinicalPta_Chk_key =
                                                                    document.getElementById(
                                                                      "care_ClinicalPta_Chk_key"
                                                                    );
                                                                  let care_ClinicalOt_Chk_key =
                                                                    document.getElementById(
                                                                      "care_ClinicalOt_Chk_key"
                                                                    );
                                                                  let care_ClinicalCota_Chk_key =
                                                                    document.getElementById(
                                                                      "care_ClinicalCota_Chk_key"
                                                                    );
                                                                  let care_ClinicalSt_Chk_key =
                                                                    document.getElementById(
                                                                      "care_ClinicalSt_Chk_key"
                                                                    );
                                                                  let care_ClinicalAide_Chk_key =
                                                                    document.getElementById(
                                                                      "care_ClinicalAide_Chk_key"
                                                                    );
                                                                  let care_ClinicalMsw_Chk_key =
                                                                    document.getElementById(
                                                                      "care_ClinicalMsw_Chk_key"
                                                                    );
                                                                  let care_ChangesMade_Chk_key =
                                                                    document.getElementById(
                                                                      "care_ClinicalMsw_Chk_key"
                                                                    );
                                                                  if (
                                                                    care_PatientRepCare_Chk_key !=
                                                                    null
                                                                  ) {
                                                                    
                                                                    care_PatientRepCare_Chk_key.checked = true;
                                                                    care_PatientRepCare_Chk_key.dispatchEvent(
                                                                      new Event(
                                                                        "change",
                                                                        {
                                                                          bubbles: true,
                                                                        }
                                                                      )
                                                                    );

                                                                    care_CaseMgr_Chk_key.checked = true;
                                                                    care_CaseMgr_Chk_key.dispatchEvent(
                                                                      new Event(
                                                                        "change",
                                                                        {
                                                                          bubbles: true,
                                                                        }
                                                                      )
                                                                    );
                                                                   
                                                                    care_Physician_Chk_key.checked = true;
                                                                    care_Physician_Chk_key.dispatchEvent(
                                                                      new Event(
                                                                        "change",
                                                                        {
                                                                          bubbles: true,
                                                                        }
                                                                      )
                                                                    );

                                                                    care_ClinicalSn_Chk_key.checked = true;
                                                                    care_ClinicalSn_Chk_key.dispatchEvent(
                                                                      new Event(
                                                                        "change",
                                                                        {
                                                                          bubbles: true,
                                                                        }
                                                                      )
                                                                    );
                                                                    

                                                                    care_ChangesMade_Chk_key.checked = true;
                                                                    care_ChangesMade_Chk_key.dispatchEvent(
                                                                      new Event(
                                                                        "change",
                                                                        {
                                                                          bubbles: true,
                                                                        }
                                                                      )
                                                                    );

                                                                    care_Clinical_Chk_key.checked = false;
                                                                    care_Clinical_Chk_key.dispatchEvent(
                                                                      new Event(
                                                                        "change",
                                                                        {
                                                                          bubbles: true,
                                                                        }
                                                                      )
                                                                    );

                                                                    care_ClinicalPt_Chk_key.checked = false;
                                                                    care_ClinicalPt_Chk_key.dispatchEvent(
                                                                      new Event(
                                                                        "change",
                                                                        {
                                                                          bubbles: true,
                                                                        }
                                                                      )
                                                                    );

                                                                    care_ClinicalPta_Chk_key.checked = false;
                                                                    care_ClinicalPta_Chk_key.dispatchEvent(
                                                                      new Event(
                                                                        "change",
                                                                        {
                                                                          bubbles: true,
                                                                        }
                                                                      )
                                                                    );

                                                                    care_ClinicalOt_Chk_key.checked = false;
                                                                    care_ClinicalOt_Chk_key.dispatchEvent(
                                                                      new Event(
                                                                        "change",
                                                                        {
                                                                          bubbles: true,
                                                                        }
                                                                      )
                                                                    );

                                                                    care_ClinicalCota_Chk_key.checked = false;
                                                                    care_ClinicalCota_Chk_key.dispatchEvent(
                                                                      new Event(
                                                                        "change",
                                                                        {
                                                                          bubbles: true,
                                                                        }
                                                                      )
                                                                    );

                                                                    care_ClinicalSt_Chk_key.checked = false;
                                                                    care_ClinicalSt_Chk_key.dispatchEvent(
                                                                      new Event(
                                                                        "change",
                                                                        {
                                                                          bubbles: true,
                                                                        }
                                                                      )
                                                                    );

                                                                    care_ClinicalAide_Chk_key.checked = false;
                                                                    care_ClinicalAide_Chk_key.dispatchEvent(
                                                                      new Event(
                                                                        "change",
                                                                        {
                                                                          bubbles: true,
                                                                        }
                                                                      )
                                                                    );

                                                                    care_ClinicalMsw_Chk_key.checked = false;
                                                                    care_ClinicalMsw_Chk_key.dispatchEvent(
                                                                      new Event(
                                                                        "change",
                                                                        {
                                                                          bubbles: true,
                                                                        }
                                                                      )
                                                                    );

                                                                    const anchorTags =
                                                                      [
                                                                        ...document.querySelectorAll(
                                                                          ".pages a"
                                                                        ),
                                                                      ].filter(
                                                                        (a) =>
                                                                          /\d/.test(
                                                                            a.textContent
                                                                          )
                                                                      );
                                                                    anchorTags[14].click();
                                                                    if (
                                                                      care_PatientRepCare_Chk_key !=
                                                                      null
                                                                    ) {
                                                                      document.querySelector('input[ng-click="dynamicFormController.submitForm(ngform, button)"]').click();
                                                                      document.getElementsByClassName('btn btn-md')[0].click();

                                                                      clearInterval(
                                                                        page15Interval
                                                                      );
                                                                      clearInterval(
                                                                        page14Interval
                                                                      );

                                                                      clearInterval(
                                                                        page13Interval
                                                                      );

                                                                      clearInterval(
                                                                        page12Interval
                                                                      );

                                                                      clearInterval(
                                                                        page11Interval
                                                                      );

                                                                      clearInterval(
                                                                        page10Interval
                                                                      );

                                                                      clearInterval(
                                                                        page9Interval
                                                                      );

                                                                      clearInterval(
                                                                        page8Interval
                                                                      );

                                                                      clearInterval(
                                                                        page7Interval
                                                                      );

                                                                      clearInterval(
                                                                        page6Interval
                                                                      );

                                                                      clearInterval(
                                                                        page5Interval
                                                                      );

                                                                      clearInterval(
                                                                        page4Interval
                                                                      );

                                                                      clearInterval(
                                                                        page2Interval
                                                                      );
                                                                    
                                                                      location.reload();
                                                                    }
                                                                    
                                                                  }
                                                                },
                                                                500
                                                              );
                                                          }
                                                        }, 500);
                                                    }
                                                  }, 500);
                                              }
                                            },
                                            500
                                          );
                                        }
                                      }, 500);
                                    }
                                  }, 500);
                                }
                              }, 500);
                            }
                          }, 500);
                        }
                      }, 500);
                    }
                  }, 500);
                }
              }, 500);
            }
          }, 500);
        }
      }, 500);
    }
  }
}

function getQueryParam(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

if (getQueryParam("openedByScript") === "true") {
  console.log("Window opened by script. Running script...");

  let options = JSON.parse(getQueryParam("options"));
  //POPUPS
  if (options != null) {
    let vbLevel = document.getElementById("DrpVerbalLevel");
    if (vbLevel != null) {
      vbLevel.value = "0";
    }

    let patSIT = document.getElementById("TxtPatientSIT");
    if (patSIT != null) {
      if (
        options != null &&
        (options.mental == "forgetful" || options.mental == "aaox4")
      ) {
        patSIT.value = "5";
      } else {
        patSIT.value = "";
      }
    }

    let patientSafety = document.getElementById("As29");
    if (patientSafety != null) {
      if (options.mental == "aaox4") {
        patientSafety.value = "No";
      } else if (options.mental == "forgetful" || options.mental == "unable") {
        patientSafety.value = "Yes";
      } else {
        patientSafety.value = "Select";
      }
    }

    let patientHistorySafety = document.getElementById("As30");
    if (patientHistorySafety != null) {
      patientHistorySafety.value = "No";
    }
    let patientfootWearSafety = document.getElementById("As31");
    if (patientfootWearSafety != null) {
      patientfootWearSafety.value = "Yes";
    }
    let patientAmbSafety = document.getElementById("As32");
    if (patientAmbSafety != null) {
      patientAmbSafety.value = "Yes";
    }
    let patientAidsSafety = document.getElementById("As33");
    if (patientAidsSafety != null) {
      patientAidsSafety.value = "Yes";
    }

    let patientAwareSafety = document.getElementById("As34");
    if (patientAwareSafety != null) {
      if (options.mental == "aaox4" || options.mental == "forgetful") {
        patientAwareSafety.value = "Yes";
      } else if (options.mental == "unable") {
        patientAwareSafety.value = "No";
      } else {
        patientAwareSafety.value = "Select";
      }
    }

    let impairedJudgementSafety = document.getElementById("As35");
    if (impairedJudgementSafety != null) {
      if (options.mental == "aaox4") {
        impairedJudgementSafety.value = "No";
      } else if (options.mental == "unable" || options.mental == "forgetful") {
        impairedJudgementSafety.value = "Yes";
      } else {
        impairedJudgementSafety.value = "Select";
      }
    }

    let sucideAttemptsSafety = document.getElementById("As36");
    if (sucideAttemptsSafety != null) {
      sucideAttemptsSafety.value = "No";
    }
    let currentMentalDisorderSafety = document.getElementById("As37");
    if (currentMentalDisorderSafety != null) {
      currentMentalDisorderSafety.value = "No";
    }

    let pcg1Safety = document.getElementById("As38");
    if (pcg1Safety != null) {
      pcg1Safety.value = "Yes";
    }
    let pcg2Safety = document.getElementById("As39");
    if (pcg2Safety != null) {
      pcg2Safety.value = "Yes";
    }
    let pcg3Safety = document.getElementById("As40");
    if (pcg3Safety != null) {
      pcg3Safety.value = "Yes";
    }
    let pcg4Safety = document.getElementById("As41");
    if (pcg4Safety != null) {
      pcg4Safety.value = "No";
    }

    let ck3 = document.getElementById("Ck3");
    if (ck3 != null) {
      if (options.mental == "forgetful") {
        ck3.checked = true;
      }
    }

    let ck4 = document.getElementById("Ck4");
    if (ck4 != null) {
      if (options.mental == "unable") {
        ck4.checked = true;
      }
    }
    let ck5 = document.getElementById("Ck5");
    if (ck5 != null) {
      if (options.adls == "1" || options.adls == "2") {
        ck5.checked = true;
      }
    }

    let ck6 = document.getElementById("Ck6");
    if (ck6 != null) {
      if (options.adls == "3" || options.adls == "4") {
        ck6.checked = true;
      }
    }

    let ck7 = document.getElementById("Ck7");
    if (ck7 != null) {
      if (options.mental == "unable") {
        ck7.checked = true;
      }
    }

    let drp8 = document.getElementById("Drp8_0");
    if (drp8 != null) {
      drp8.checked = true;
    }

    let ck9 = document.getElementById("Ck9");
    if (ck9 != null) {
      if (options.mental == "forgetful") {
        ck9.checked = true;
      }
    }

    let ck10 = document.getElementById("Ck10");
    if (ck10 != null) {
      if (options.mental == "unable") {
        ck10.checked = true;
      }
    }

    let ck11 = document.getElementById("Ck11");
    if (ck11 != null) {
      ck11.checked = true;
    }

    let ck14 = document.getElementById("Ck14");
    if (ck14 != null) {
      ck14.checked = true;
    }

    let ck15 = document.getElementById("Ck15");
    if (ck15 != null) {
      ck15.checked = true;
    }

    let ck21 = document.getElementById("Ck21");
    if (ck21 != null) {
      ck21.checked = true;
    }

    let ck20 = document.getElementById("Ck20");
    if (ck20 != null) {
      if (options.mental == "unable" || options.mental == "forgetful") {
        ck20.checked = true;
      }
    }
  }

  // document.body.style.backgroundColor = "lightblue"; // Example script
}
if (getQueryParam("openedByScript_FU") === "true") {
  let radpain = document.getElementById("radpainintensity_0");

  if (radpain != null) {
    radpain.checked = true;
  }

  let verbalLevel = document.getElementById("DrpVerbalLevel");

  if (verbalLevel != null) {
    verbalLevel.value = 5;
  }

  let guarding = document.getElementById("Chkguarding");
  if (guarding != null) {
    guarding.checked = true;
  }
  let bodyImg = document.getElementById("ImageButton1");
  if (bodyImg != null) {
    bodyImg.click();

    setTimeout(() => {
      document.getElementById("DrpIntensity").value = "5";
      document.getElementById("DrpActivity").value = "With Activity";
      document.getElementById("DrpFrequency").value = "Frequent";
      document.getElementById("DrpDescription").value = "Dull ache";
      document.getElementById("DrpPainBetter").value = "Medication";
      document.getElementById("DrpPainWorse").value = "Movement";
      document.getElementById("DrpIntervention").value = "Non-opioid analgesic";
      document.getElementById("DrpWellWorking").value = "Fairly well";
      document.getElementById("DrpStatus").value = "Treat";
    }, 500);
  }
} else {
  console.log("This window was not opened by the script.");
}

function getRandomNumber(min, max, allowDecimal = true) {
  let randomNumber = Math.random() * (max - min) + min;

  if (allowDecimal) {
    randomNumber = randomNumber.toFixed(1);
    randomNumber = parseFloat(randomNumber);
  } else {
    randomNumber = Math.round(randomNumber);
  }

  return randomNumber;
}

// function injectScriptFile(filePath) {
//     const script = document.createElement('script');
//     script.src = chrome.runtime.getURL(filePath); // Path to your script file
//     script.onload = function () {
//       this.remove(); // Clean up after injection
//     };
//     document.documentElement.appendChild(script);
//   }

//   // Inject the external script
//   injectScriptFile('injected.js');
