// a variable that stores a function call to save the page when signing the form
var submitStore;

// whether there is an alert in some saving scenarios
var noAlert = false;

// is there any unsaved data
var unsavedChanges = false;

// should we leave the page without being prompted for data not being saved 
var normalSave = false;

// whether the main menu link was just clicked
var mainMenu = false;

// is a validation request in progress
var validating = false;

// are we adding a note
var addingNote = false;

// the time of the last change
var lastChangeTime = new Date().getTime();

// total amount of idle time before redirecting to the login screen
var autosaveTimeout = 61 * 60 * 1000; // 61 minutes

// amount of time before performing extended save actions
var extendSaveDelay = 15 * 1000; // 15 seconds

// variable to store the current extended save timer
var extendSaveTimer = null;

// the m00 question details window
var mDetailsWindow = null;

// the popup dialog for whether to sign the form when saving
var aConfirmBox = null;

// the popup window for copying the form
var aConfirmCopyBox = null;

//the popup window for pushing the form
var aConfirmPushBox = null;

// a flash hack variable
var swfcount;

// an alert message used when copying a form
var copyAlert = "";

// source window variables
var sourceWindow = null;

// whether to get rid of the overlay from the source window 
var dontHideOverlay = false;

// the frozen fields in the source window
var frozenFields = {};

// is the user currently in the process of relogging in (start to end)
var relogging = false;

// are we trying to autosave in order to sign this form
var needToSaveToSign = false;

// is the last modification window currently shown
var showingLastModification = false;

// is there a save currently in progress
var saveInProgress = false;

// is there an autosave currently in progress
var autosaveInProgress = false;

// is there a save currently submitted
var isSubmitted = false;

// if a save occurs during an autosave, this variable stores the function call for later
var pendingSave = null;

// If we need to check authorization status before saving, save the callback function
var authCheckCallBack = null;

// an image used when waiting for a save to finish (eg. "* Saving ...")
var progressImg = 'css/themes/alert/progress.gif';

//Counter for successive autoSaveFailed attempts
var autoSaveFailedCount = 0;


var isModalView = true,
isGroupActionSubmitted = false;
prototypeFilePath = 'js/prototype/prototype_2024.24.5.24ac5.js';

// whether we're currently showing the results of various operations
var showHiddenFields = false;
var showFieldNames = false;
var fillFieldNames = false;
var listNames = false;
var showMasterFieldsXML = false;

var inlineReportWindow = null;
var activeInlineReportName;

// error messages for connectivity / exceptions
var connectivityErrorMessage = 'You have limited or no connectivity. You may continue to document but will not be able to save your data unless you move to an area where you have connectivity.';
var generalErrorMessage = 'This action cannot be completed at this time. Please try again later. If you continue to experience this issue, please contact support.';
var saveFailurePopup = null;
var saveOverridePopup = null;
var showUserPromptPopup = null;

var pocWindow = null;

var submitPush = null;

var mAssessmentDetailsWindow = null;

var overridePrompt = false;

var assessmentImageMap = {
    "empty": "/images/OasisC/no_data.png",
    "pre-better": "/images/OasisC/equal_to_1.png",
    "pre-worst": "/images/OasisC/equal_to_2.png",
    "green": "/images/OasisC/up_arrow.png",
    "red": "/images/OasisC/down_arrow.png"
};

var ASSESSMENT_IMAGE_SELECTOR_SUFFIX = "_ASSESSMENT_IMAGE";

if (typeof isClockOutEnabled === 'function') {
    // Disable Complete or Send To Office Button when the activity has clock out enabled.
    if (isClockOutEnabled()) {
        $('sendToOfficeBtn').disabled=true;
    }
}

function extractFieldName(field) {
    if (field) {
        return field.replace('value(', '').replace(')', '');
    } else {
        return '';
    }
}

function addIncreasedQuestions(fieldName) {
    var index = recentFormMQuestionInfo.valueIncreasedQuestions.indexOf(fieldName);
    if (index === -1) {
        recentFormMQuestionInfo.valueIncreasedQuestions.push(fieldName);
    }
}

function removeIncreasedQuestions(fieldName) {
    var index = recentFormMQuestionInfo.valueIncreasedQuestions.indexOf(fieldName);
    if (index > -1) {
        recentFormMQuestionInfo.valueIncreasedQuestions.splice(index, 1);
    }
}

function validateAssessmentValue(context) {
    var fieldName = extractFieldName(context.name);
    if (isAssesValueCompareApplicable(fieldName)) {
       if ((excludeQuestions.length !=0 && excludeQuestions.indexOf(fieldName) !== -1) ||
               null == recentFormMQuestionInfo.mQuestionValues) {
               return;
       }
       var previousFieldValue = parseInt(recentFormMQuestionInfo.mQuestionValues[fieldName], 10),
           currentFieldalue = parseInt(context.value, 10),
           imageUrl;
        if (previousFieldValue.toString() === "NaN") {
            if (recentFormMQuestionInfo.activityId !== null) {
                // empty image
                imageUrl = assessmentImageMap["empty"];
            }
        }
        if (previousFieldValue == currentFieldalue) {
            if (previousFieldValue > 0) {
                // yellow
                imageUrl = assessmentImageMap["pre-worst"];
                removeIncreasedQuestions(fieldName);
            } else if (previousFieldValue == 0) {
                // Green
                imageUrl = assessmentImageMap["pre-better"];
                removeIncreasedQuestions(fieldName);
            }
        } else if (currentFieldalue > previousFieldValue) {
            // red
            imageUrl = assessmentImageMap["red"];
            addIncreasedQuestions(fieldName);
        } else if (currentFieldalue < previousFieldValue) {
            // green
            imageUrl = assessmentImageMap["green"];
            removeIncreasedQuestions(fieldName);
        }

        var imageElement = $(fieldName + ASSESSMENT_IMAGE_SELECTOR_SUFFIX);
        if (imageElement && imageUrl) {
            imageElement.style.display = "block";
            imageElement.src = imageUrl;
        }
    }
}

function convertMapStringToJSON(jsonString) {
    var jsonObject = {};
    if (jsonString) {
        jsonString = jsonString.replace('{', '');
        jsonString = jsonString.replace('}', '');
        var jsonInfoAsArray = jsonString.split(',');
        for (var i = 0; i < jsonInfoAsArray.length; i++) {
            var keyValueArray = jsonInfoAsArray[i].split('=');
            var key = keyValueArray[0].toString().trim();
            jsonObject[key] = keyValueArray[1];
        }
    }
    return jsonObject;
}

function clearAssessmentValue(fieldName) {
    var imageElement = $(fieldName + ASSESSMENT_IMAGE_SELECTOR_SUFFIX);
    if (imageElement) {
        imageElement.style.display = "none";
        imageElement.src = '';
    }
    removeIncreasedQuestions(fieldName);
}

function showAssessmenInfo(mQuestion, icon){
    if ( mAssessmentDetailsWindow != null ) {
        mAssessmentDetailsWindow.close();
    }
    var iconLoc = $(icon).cumulativeOffset();
    
    mAssessmentDetailsWindow = new Window('mAssessmentDetailsWindow', {
        title: 'Previous Assessment Details',
        top:iconLoc[1]-50, left:iconLoc[0]+100,width:500, height:130,
        className: aTheme, showEffectOptions: {duration:1.5},
        onClose: function() {
        },
        onload: function() {
            mAssessmentDetailsWindow.updateSize();
        }
    });
    mAssessmentDetailsWindow.setDestroyOnClose();
    mAssessmentDetailsWindow.setHTMLContent( getPreviousAssessmentDetail(mQuestion) );
    mAssessmentDetailsWindow.show();
}

function getPreviousAssessmentDetail(mQuestion) {
    var previousAssessmentDetail = '<h1>' + getQuestionNumber(mQuestion) + '</h1>';
    if (recentFormMQuestionInfo.mQuestionValues && (null != recentFormMQuestionInfo.mQuestionValues[mQuestion])) {
        previousAssessmentDetail += '<p>Form Name : ' + recentFormMQuestionInfo.formName || '' + '</p>';
        previousAssessmentDetail += '<p>Visit Date : ' + recentFormMQuestionInfo.visitDate || '' + '</p>';
        previousAssessmentDetail += '<p>Assessment Value : ' + recentFormMQuestionInfo.mQuestionValues[mQuestion] || '' + '</p>';
    } else {
        previousAssessmentDetail += '<p>No SOC/ROC assessment activity available to compare patient\'s health.</p>';
    }
    return previousAssessmentDetail;
}

function isAssesValueCompareApplicable(fieldName) {
    var preconditionPass = false;
    if (compareAssesmentOnSendAndComplete === "warn") {
        if (typeof fieldName === "undefined" || (excludeQuestions.length !== 0 && excludeQuestions.indexOf(fieldName) === -1)) {
            // We got empty string ("") as a value in 'currentOasisVersion'
            // variable if the form is selected with OASIS version "B"
           if (excludeOASISVersions && (currentOasisVersion !== "" && excludeOASISVersions.indexOf(currentOasisVersion) === -1 ||
                   (currentOasisVersion === "" && excludeOASISVersions.indexOf("B") === -1 ))) {
               preconditionPass = true;
           }
       }
    }
    return preconditionPass;
}

function validateMQuestionValues(actionToPerform, callback) {
    recentFormMQuestionInfo.valueIncreasedQuestions = recentFormMQuestionInfo.valueIncreasedQuestions || [];
    if ((actionToPerform === 'sendToOffice') && isAssesValueCompareApplicable() &&
            recentFormMQuestionInfo.valueIncreasedQuestions.length !== 0) {
        showMQuestionValidationPrompts(recentFormMQuestionInfo, callback);
    } else {
        callback();
    }
}

var mQuestionsValidationInfoWindow = null;

function showMQuestionValidationPrompts(recentFormMQuestionInfo, callback) {
    if (null != mQuestionsValidationInfoWindow) {
        mQuestionsValidationInfoWindow.close();
    }

    mQuestionsValidationInfoWindow = Dialog.confirm( getMQuestionValidationMessage(recentFormMQuestionInfo), {
        title: 'Assessment Details',
        className: 'alphacube',
        width: 380,
        opacity: 1.0,
        okLabel: 'OK', 
        cancelLabel: 'Cancel', 
        onShow: function(){
            mQuestionsValidationInfoWindow.updateSize();
        },
        onOk: function() {
            callback();
            return true;
        },
        onCancel: function() {
            $('overlay').hide();
            return true;
        }
    });

}

function getMQuestionValidationMessage(recentFormMQuestionInfo) {
    var messageDetail = '<h1>The following questions have values that show a decrease in the patient since the last assessment. </h1>';
    messageDetail += '<ol>';
    recentFormMQuestionInfo.valueIncreasedQuestions.forEach(function(question) {
        var fieldDisplayName = recentFormMQuestionInfo.valueIncreasedQuestionFieldInfo[question];
        if (!fieldDisplayName) {
            fieldDisplayName = question;
        }
        messageDetail += '<li class="text-align-left">' + fieldDisplayName + '</li>';
    });
    messageDetail += '</ol>';
    return messageDetail;
}

// this function gets called on page load
function doOnLoad() {

	$$('input, textarea, select').each( function(e) {
		// If Quick Start JSP path was set, validate on change of M0090 date 
	    if(isQuickStart && e.name == 'value(M0090_INFO_COMPLETED_DT)') {
	        e.observe('change', function() {
                validateM0090Date(e);
              });
        }

        if(e.name == 'value(A0220)') {
            e.observe('change', function() {
                validateA0220Date(e);
              });
        }

        if(e.name == 'value(A0270)') {
            e.observe('change', function() {
                validateA0270Date(e);
              });
        }

		if (e.readOnly) {
			e.addClassName('readonly');
		}

		// do not observe the patient drop-down
		if(e.id != 'patientSearchText'){
			if (e.tagName == 'TEXTAREA' || (e.tagName == 'INPUT' && e.type == 'text')) {
			    if(!e.readOnly){ //prevented fieldChanged event for readonly fields
		              e.observe('keypress', fieldChanged); 
			    }
			} else if (!(e.tagName == 'INPUT' && e.type == 'hidden')) {
				e.observe('change', fieldChanged);
			}
		}
	});

    // If we need to track changes to authorizations, we need to track changes to visit date and billing codes
    if(checkAuthorizedOnSave != '') {
        var billingCodeElement = document.getElementsByName('value(BillingCode)')[0];

        if(billingCodeElement != null) {
            billingCodeElement.observe('change', function() {
                checkAuthorizationOnChange(this);
            });
        }

        if(visitAuthStatus != null) {
            if(visitAuthStatus == 'Authorized') {
                $('visitAuthorizedText').show();
            } else if(visitAuthStatus == 'NotAuthorized'){
                $('visitNotAuthorizedText').show();
            }
        }
    }

	var activityId = document.buildFormForm.activityId.value;
	// Extracted this logic into build form action
	//autosaving = autosaveInterval > 0 && !isPoc && !(formName == 'cpc' && activityId == '') && formName != 'communicationsNote';
	if (useAutosaves) {
		// call autosave with NO arguments (setInterval can pass an argument)
		setInterval(function() { autosave(); }, autosaveInterval);
	}

/**
     * @description The logout link has to be available only when the UI 
     * version is 2.0. If the UI version is 3.0 and iFrame view is enabled,
     * there is no need of attaching the logout event since it is already
	 * handled in UI 3.0.
     */
    if (!isModalView) {
        // modify the logout link to save first
        var logoutLink = $('logOutId'); 
        logoutLink.href = '#';
        logoutLink.observe('click', function() { return logout(); } );
    }
	
	countSwf();

	if (lastModificationOccurred) {
		unsavedChanges = true; // We want to prompt if we leave the page, even if we don't intend to autosave
		openLastModificationDialog(true);
	}

	doOnLoad1();

	showAssessment5StartImageOnLoad();
	if(externalMessageResponse && 200 != externalMessageResponse && "200" !== externalMessageResponse){
	    var isUserPrompt = externalMessageResponse && externalMessageResponse.includes("USERPROMPT");
	    if(isQuickStart && isUserPrompt){
	        var activityId = externalMessageResponse.split(":")[1];
	        showUserPrompt(activityId);
	    }else{
	        alert(externalMessageResponse);
	    }   
	}
}

var FIVE_STAR_ASSESMENT_QUESTIONS = ["M1200", "M1240","M1242", "M1350", "M1324", "M1334", "M1340", "M1342", "M1400", "M1610", "M1615", "M1620", "M1710", "M1810", "M1820", "M1830", "M1840", "M1850", "M1860", "M2020"];

function getQuestionNumber(fieldName) {
    fieldName = replaceUndefinedByEmptyString(fieldName);
    return replaceUndefinedByEmptyString(fieldName.split('_')[0]);
}

function showAssessment5StartImageOnLoad() {
    if (isAssesValueCompareApplicable()) {
        var radioElements = $$('input[type="radio"]');
        radioElements.forEach(function(radioElement) {
            if (radioElement.checked == true &&
                    FIVE_STAR_ASSESMENT_QUESTIONS.indexOf(getQuestionNumber((extractFieldName(radioElement.name) || ''))) !== -1) {
                validateAssessmentValue(radioElement);
            }
        });
    }
}

function submitPage(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt, oasisValidationType, neverIncludeInFrequencyForm, isFromFieldRuleValidatation) {
    // If we are in Read Only mode, simply submit the page(do not save before submitting the form)
    // Do action specific functions(e.g. show dialog when actionToPerform = declineThisForm) in submitReadOnly() 
    if (sanitizeFormInputValues(document.buildFormForm)) {
        return;
    }
    if(isReadOnly) {
        submitReadOnly(action, actionToPerform, nextPageNum, currentStatus, nextStatus, signatureLocation, evt);
        return;
    }
    if (actionToPerform === 'sendToOffice') {
        autosave();
    }
    validateMQuestionValues(actionToPerform, function() {
        if (actionToPerform == 'sendToOffice' && !neverIncludeInFrequencyForm) {
            if(checkAuthorizedOnSave != '' && visitAuthStatus == null) {
                checkAuthorizationOnChange('0');
                authCheckCallBack = function() {
                    submitPage(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt);
                };
                return;
            }

            if(checkAuthorizedOnSave != '') {
                if(checkAuthorizedOnSave == 'warn') {
                    if(visitAuthStatus == 'NotAuthorized') {
                        if(!confirm("There are no available authorizations for this patient, would you like to continue?")) {
                            return;
                        }
                    }
                } else if(checkAuthorizedOnSave == 'require') {
                    if(visitAuthStatus == 'NotAuthorized') {
                        alert("There are no available authorizations for this patient. Please contact your administrator to add more authorizations to this patient's schedule.");
                        return;
                    }
                }
            }
        }

        // do things that need to be done when a save starts (such as show an overlay)
        saveStarted();

        if (autosaveInProgress) {
            // if an autosave is in progress, wait until it finishes, and then continue
            // do this by saving off the current function call for later, and exiting for now
            pendingSave = function() {
                submitPage(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt);
            };
            return;
        } else if (pendingSave != null) {
            // clear out the pending save and continue
            pendingSave = null;
        }

        // if the last modification prompt already came up, show the prompt instead of saving
        if (lastModificationOccurred) {
            openLastModificationDialog(false);
            return;
        }

        // push stuff
        if (actionToPerform == "push") {
            var callBackFn = function () {
                pushConfirm(evt);
            }
            doFormSubmissionX(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt, callBackFn)
            return;
        }
        // copy to new form
        if (actionToPerform == "copy") {
            if(alertMsg != null && alertMsg != '') {
                copyAlert = alertMsg;
            }
            var callBackFn = function () {
                copyConfirm(evt);
            }
            doFormSubmissionX(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt, callBackFn);
            return;
        }

        // save the final step of the submit
        submitStore = function() {
            submitPageX(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt);
        };

        if (signatureLocation!='' && actionToPerform=='sendToOffice') {
            noAlert = true;

            //To perform preform validation based form already saved or not. 
            function checkActivityAndProceedPreFormValidation() {
                var isActivityCreated = document.buildFormForm.activityId.value && document.buildFormForm.activityId.value!="";
                if (isActivityCreated) {
                    checkPreFormValidation(formVersionId, episodeId, null, null, null, signCallbackFn, eventToPass, nextStatus);
                } else {
                    unsavedChanges = needToSaveToSign = true;
                    saveFirst(function(error) {
                       needToSaveToSign = validating = false;
                       // if an error occurred, do not continue, and show the save failure popup instead
                       if (error) {
                           showSaveFailurePopup(error);
                           return;
                       }
                       checkPreFormValidation(formVersionId, episodeId, null, null, null, signCallbackFn, eventToPass, nextStatus);
                    });
                }
            };

            var callbackFnBeforeSendToOffice = checkActivityAndProceedPreFormValidation, signCallbackFn = signOnSendConfirm, eventToPass = evt;
            if (promptSign && !isAdmin) {
                callbackFnBeforeSendToOffice = function () {
                    performFormCreateChecks(formVersionId, episodeId, null, null, null, checkActivityAndProceedPreFormValidation, null);
                };
                signCallbackFn = startSignForm;
                eventToPass = null;
            } else {
                document.getElementsByName('sendSignDefault')[0].value = document.getElementsByName('sendSignDef')[0].value;
            }

            doFormSubmissionX(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt, callbackFnBeforeSendToOffice);
        } else if (signatureLocation!='' && actionToPerform=='signThisForm') {
            noAlert = true;
            //  if the form passes all validation,
            var callBackFn = function () {
                // Perform additional form signature checks
                performFormCreateChecks(formVersionId, episodeId, null, null, null, startSignForm, null);
            }
            doFormSubmissionX(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt, callBackFn);

        } else if (actionToPerform=='declineThisForm') {
            noAlert = true;
            //  if the form passes all validation,
            var callBackFn = function () {
                startDeclineForm();
            }
            doFormSubmissionX(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt, callBackFn);

        } else {
            noAlert = false;
            //  if the form passes all validation, submit it
            var callBackFn = function () {
                submitPageX(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt);
            }
            doFormSubmissionX(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt, callBackFn);
        }
    });
}

function submitReadOnly(action, actionToPerform, nextPageNum, currentStatus, nextStatus, signatureLocation, event) {
    if( action != null ) {
        document.buildFormForm.action = action;
    }
    if (actionToPerform != null && actionToPerform != '') {
        document.buildFormForm.actionToPerform.value = actionToPerform;
    }   
    if( nextPageNum != null ) {
        document.buildFormForm.nextPageNum.value = nextPageNum;
    }
    if (nextStatus != null && nextStatus != '') {
        document.buildFormForm.status.value = nextStatus || '';
    }

    // Handle button actions such as sign/decline/push here
    if (actionToPerform == 'declineThisForm') {
        noAlert = true;
        startDeclineForm();
    } else if (signatureLocation!='' && actionToPerform=='signThisForm') {
        noAlert = true;
        startSignFormReadOnly();
    } else if (actionToPerform == "push") {
        // We can still use the standard pushConfirm() function because we're blocking saving in the backend already.
        pushConfirm(event);
        return;
    } else if (actionToPerform == "reviewedAndApproved") {
    	document.buildFormForm.actionToPerform.value = 'reviewedAndApproved';
        // for readOnly mode simply submit the form
        document.buildFormForm.submit();
    }
    else {
        document.buildFormForm.submit();
    }
}

function submitPageX(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt) {
	// If the form is not yet submitted
	if(!isSubmitted ) {
		isSubmitted = true;
		
		// Submit the form
		if (nextStatus=="Reviewed" && document.buildFormForm.configNoteEnabled.value=="true") {
			if (confirm("Confirm to send for correction (Note window will pop-up)?")) {
				document.buildFormForm.nextPageNum.value = document.buildFormForm.pageNum.value;
				document.buildFormForm.actionToPerform.value = "next";
				document.buildFormForm.autoOpenNote.value = "true";
				document.buildFormForm.nextStatus.value = nextStatus || '';
				submitSave();
				//submitNote(); //TODO, wait to close?
				return;
			} else {
				isSubmitted = false;
				saveCanceled();
				return false;
			}
		} else if (actionToPerform=="saveCN") {
			// communication note
			document.buildFormForm.nextPageNum.value = "1";
			document.buildFormForm.action.value = "buildForm.action";
			document.buildFormForm.actionToPerform.value = "next";
			document.buildFormForm.nextStatus.value = nextStatus || '';
			submitSave();
			return;
		} else if (actionToPerform=="signThisForm") {
			//document.buildFormForm.nextPageNum.value = nextPageNum;
			document.buildFormForm.action.value = "buildForm.action";
			//document.buildFormForm.actionToPerform.value = "next";
			document.buildFormForm.nextStatus.value = nextStatus || '';
			submitSave();
			return;
		}
		document.buildFormForm.nextStatus.value = nextStatus || '';
        submitSave();
	}
}
function doFormSubmissionX(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt, cb) {
	// Save some parameters into fields in the submission
	if( nextPageNum != null ) {
		document.buildFormForm.nextPageNum.value = nextPageNum;
	}
	if( action != null ) {
		document.buildFormForm.action = action;
	}
	if (actionToPerform != null && actionToPerform != '') {
		document.buildFormForm.actionToPerform.value = actionToPerform;
	}	
	
	// Skip normal validation if we're just saving the current page and then going to reload the same page 
	// TODO: there's probably other possible actionToPerform values that would qualify
    var isSamePage = ((actionToPerform == null || actionToPerform == '' || actionToPerform == 'next') && document.buildFormForm.pageNum.value == nextPageNum); 

    if (isSamePage) {
        showConfirmationMessage(true, alertMsg, noAlert, nextStatus, currentStatus, cb);
    } else {
        // Perform validation
        var visitDateValidated = doVisitDateValidation();        
        if (visitDateValidated) {
            var fieldRuleCheckCallBack = function(res) {
                if(res) {
                    res = doValidation(actionToPerform, signatureLocation);
                }
                                
                // If we're saving a cpc, there's a special async api call that we need to call
                // But also sanity check the function exists too
                if(res && formName === 'cpc' && validatePatientProfile) {
                    validatePatientProfile(actionToPerform, signatureLocation, cb);
                } else {
                    showConfirmationMessage(res, alertMsg, noAlert, nextStatus, currentStatus, cb);
                }
            }
            
            var nullFieldValidationRes = doFieldValidation(actionToPerform);
            checkFieldRuleValidation(actionToPerform, nullFieldValidationRes, fieldRuleCheckCallBack);
        } else {
            saveCanceled();
        }
    }
}

function showConfirmationMessage(result, alertMsg, noAlert, nextStatus, currentStatus, cb) {
    if (result) {
        // If we passed validation and there's a confirmation we need to provide...
        if (alertMsg != null && alertMsg != '' && !noAlert) {
            result = confirm(alertMsg);
        }
        
        // If result is still true...
        if(result) {
            // Determine whether the activity status needs to change
            if (nextStatus != null && nextStatus != '') {
                document.buildFormForm.sendToOffice.value = "true";
                document.buildFormForm.status.value = nextStatus || '';
            } else {
                document.buildFormForm.status.value = currentStatus || '';
            }
        }
    }
    if (!result) {
        saveCanceled();
    } else if(cb) {
        cb();
    }
}

function doVisitDateValidation(){
	// If the VisitDate field is on this page -- make sure it's valid before continuing
    var visitDateElement = document.getElementsByName('value(VisitDate)')[0];
    
    if(!visitDateElement) {
        return true;
    }

    var isValidVisitDate = validateDate(visitDateElement);
    
    if(isValidVisitDate) {
        var visitDate = Date.parse(visitDateElement.value); 
        
        // Validate visit date against level of care start date and end date
        var levelOfCareStartDate = $('currentLevelOfCareStartDateHidden') ? Date.parse($('currentLevelOfCareStartDateHidden').value) : null;
        var levelOfCareEndDate = $('currentLevelOfCareEndDateHidden') ? Date.parse($('currentLevelOfCareEndDateHidden').value) : null;
        if(levelOfCareStartDate) {
            var timeInFieldValue = $('timeInHidden') ? $('timeInHidden').value : null;
            var levelOfCareStartTime = $('currentLevelOfCareStartTimeHidden') ? $('currentLevelOfCareStartTimeHidden').value : null;
            var levelOfCareEndTime = $('currentLevelOfCareEndTimeHidden') ? $('currentLevelOfCareEndTimeHidden').value : null;
            
            // If TimeIn field and levelOfCareStartTime exist, set time field values to the date fields before we validate
            if(timeInFieldValue && levelOfCareStartTime) {
                visitDate = setTime(visitDate, timeInFieldValue);
                levelOfCareStartDate = setTime(levelOfCareStartDate, levelOfCareStartTime);
                levelOfCareEndDate = setTime(levelOfCareEndDate, levelOfCareEndTime);
            }
            
            var isValidLevelOfCare = levelOfCareEndDate ? visitDate >=  levelOfCareStartDate && visitDate <= levelOfCareEndDate : visitDate >=  levelOfCareStartDate;
            if(!isValidLevelOfCare) {
                alert("The Level of Care on this form will change to reflect the Level that spans the Visit Date" + (timeInFieldValue && levelOfCareStartTime ? " and Time In" : "") + ".");
            }
        }
        
        // Validate visit date against location of care start date and end date
        var locationOfCareStartDate = $('currentLocationOfCareStartDateHidden') ? Date.parse($('currentLocationOfCareStartDateHidden').value) : null;
        var locationOfCareEndDate = $('currentLocationOfCareEndDateHidden') ? Date.parse($('currentLocationOfCareEndDateHidden').value) : null;
        if(locationOfCareStartDate) {
            var isValidLocationOfCare = locationOfCareEndDate ? visitDate >=  locationOfCareStartDate && visitDate <= locationOfCareEndDate : visitDate >=  locationOfCareStartDate;
            if(!isValidLocationOfCare) {
                alert("The Location of Care on this form will change to reflect the Location that spans the Visit Date.");
            }
        }
    }
    
	return isValidVisitDate;
}

// Set hours and minutes from given time to the given date
function setTime(date, time) {
    if(!date) {
        return null;
    }
    if(!time) {
        return date;
    }
    // Time is in the format hh:mm:ss or Thh:mm:ss
    var match = time.match(/^T?(\d\d):(\d\d):\d\d$/);
    if (match) {
        var hour = parseInt(match[1], 10);
        var min = parseInt(match[2], 10);
        
        date.setHours(hour);
        date.setMinutes(min)
    }
    return date;
}

function doFieldValidation(actionToPerform) {
	var result = {warn:[], require:[], otherPageRequire:[]};
	
	for (var fieldName in validationTypes) {
		var displayName = validationTypes[fieldName][0];
		var validationType = validationTypes[fieldName][1];
		var e = document.getElementsByName('value(' + fieldName + ')');
		
		// this is a field that is set to warn/require on the current page
		// if it's on the current page and it's not filled out, put it in the results
		if (e.length != 0 && !isFilledOut(e)) {
			result[validationType].push( displayName != null && displayName.length != 0 ? displayName : fieldName );
		}
	}
	
	for( var pageNum in requiredFieldsOnOtherPages ) {
		var requiredFieldInfo = requiredFieldsOnOtherPages[ pageNum ];
		var otherPageRequire = [];
		for (var i=0; i<requiredFieldInfo.length; i++) {
			var fieldName = requiredFieldInfo[i][0];
			var displayName = requiredFieldInfo[i][1];
			var filled = requiredFieldInfo[i][2];
			var e = document.getElementsByName('value(' + fieldName + ')');

			// if the field is also on the current page, act as though it is required on this page
			// if it's not on the current page, then add it to the list of fields on other pages that arent filled out if it's not filled out  
			if (e.length != 0 && !isFilledOut(e) ) { //
				result.require.push( displayName != null && displayName.length != 0 ? displayName : fieldName );
			} else if (e.length == 0 && !filled) {
				otherPageRequire.push( displayName != null && displayName.length != 0 ? displayName : fieldName );
			}
		}
		// if we found at least one required field 
		if (otherPageRequire.length > 0) {
			result.otherPageRequire.push( [ pageNum, otherPageRequire ] );
		}
	}
	return result;
}

function checkPreFormValidation(formVersionId, episodeId, chartId, patientId, isSign, callback, callbackArg, submitStatus) {
    var activityId = document.buildFormForm.activityId.value;

    // TODO we only want to perform this ajax call under certain conditions
    
    // Perform an ajax call to determine if we are allowed to perform a "Complete" or "Send to Office" on this form.
    // These checks are to ensure that we do not allow the user to "Complete" or "Send to Office" an assessment
    // if it's marked with "Check EOB" = "Yes" unless certain conditions are met. 
    var startOfCareValue = '';

    if (document.getElementsByName('value(StartOfCareDate)')[0] != null) {
        startOfCareValue = document.getElementsByName('value(StartOfCareDate)')[0].value;
    } else {
        startOfCareValue = '-1';
    }

    var parameters = {
           actionToPerform: 'PreFormValidationChecks',
           formId: formVersionId,
           activityId: activityId,
           startOfCareDate: startOfCareValue,
           submitStatus: submitStatus,
           hhsosSessionKey: $('hhsosSessionKey').value
    };
    var devicePrevStatus = getDeviceStatus();
    new Ajax.Request('ajax.action', {
        requestHeaders: { Accept: 'application/json' },
        parameters: parameters,
        onSuccess: function(transport) {
            var response = transport.responseJSON || {};

            if (response.error) {
                var errorString = "The following errors were found: \n";
                
                for(var i = 0; i < response.error.length; i++) {
                    errorString += response.error[i];
                    errorString += "\n";
                }
                
                alert(errorString);
                saveCanceled();
                return true;
            }
            
            if (response.warning) {
                var warningString = "The following warnings were found: \n";
                for(var i = 0; i < response.warning.length; i++) {
                    warningString += response.warning[i];
                    warningString += "\n";
                }
                
                if (!confirm(warningString)) {
                    saveCanceled();
                    return true;
                }
            }

            // If there is any unsaved changes, Initiate an auto save before further validations.
            if (unsavedChanges) {
                needToSaveToSign = true;
                saveFirst(function(error) {
                    needToSaveToSign = false;
                    // If an error occurred, do not continue and show the save failure pop up instead
                    if (error) {
                        showSaveFailurePopup(error);
                        return;
                    }
                    detectVisitOverlap(callback, callbackArg);
                });
            } else {
                detectVisitOverlap(callback, callbackArg);
            }
            return;
        },
        onFailure:   function(transport) {
            allowFormCreate = false;
            submitted = false;
            $('overlay').hide();
            var errCode = transport.status, errMsg = '';
            if (errCode === 0) {
                errMsg = 'Server unreachable or failed to contact server. Please try again.';
            } else {
                errMsg = 'Failed to contact server. Please try again or contact support.';
            }
            errCode = errCode + ':' + '10001';
            logUIErrorAudits('Failure - Ajax.action - PreFormValidationChecks, ' + devicePrevStatus + '(prev), Message: ' + errMsg + ',Status Code: ' + errCode);
            alert(errMsg + '\nErrCode: ' + errCode);
        }
    });
}

function isFilledOut(e) {
	var filled;
	if (e[0].type == 'checkbox') {
		filled = e[0].checked;
	} else if (e[0].type == 'radio') {
		filled = false;
		for (var i=0; i<e.length; i++) {
			filled = filled || e[i].checked;
		}
	} else {
		var value = e[0].value.strip(); 
		if (e[0].tagName == 'select' || e[0].type == 'hidden' || e[0].style.display == 'none') {
			filled = value != '' && value != '-1';
		} else {
			filled = value != '';
		}
	}
	return filled;
}


function doMainMenu() {
	// figure out if this page was opened from another tab/window
	var windowOpened = false;
	try {
		windowOpened = window.opener && window.opener.document ? true : false;
	} catch (err) { }
	
	// get the activity id
	var activityId = document.buildFormForm.activityId.value;
	
	// don't save if: 
	//  * autosaving is disabled
	//  * we're on a plan of care
	//  * this activity hasn't been created yet
	//  * we've had a last modification popup
	if (!useAutosaves || isPoc || activityId.length == 0 || lastModificationOccurred) {
		if (windowOpened) {
			// if the window this page was opened from another tab/window, just close it
			window.close();
		} else {
			// otherwise, go to the page specified by main menu forward
			document.buildFormForm.action = document.buildFormForm.mainMenuForward.value;
			document.buildFormForm.actionToPerform.value = '';
			document.buildFormForm.submit();
		}
	} else {
		// act like the save button on the last page
		submitPage('buildForm.action', 'save', '1');
		if (isReadOnly && windowOpened) {
			window.close();
		}
	}
	return false;
}

// shows the notes for the current page (notes popup)
function submitNote() {
	if (!addingNote) {
		addingNote = true;
		var activityId = document.buildFormForm.activityId.value;
		var pageNum = document.buildFormForm.pageNum.value;
		var targetUrl = "activityNote.action?hhsosSessionKey="+ $('hhsosSessionKey').value +"&activityId=" + activityId + "&pageNum=" + pageNum;
		noteWindow = new Window("noteWin", {
			url: targetUrl,
			title: 'Notes',
			top:30, left:100, width:510, height:100,
			className: aTheme, showEffectOptions: {duration:1.5},
			onClose: function() {
				addingNote = false;
			},
			onload: function() {
				noteWindow.updateSize();
			}
		});
		noteWindow.setDestroyOnClose();
		noteWindow.show();
		// Check is iOS mobile device and enable UI-3.1
		if(isModalViewInIos()) {
			if(document.getElementById('noteWin')) {
				setTimeout(function() {window.parent.scrollTo(0, 0);}, 100);
			}
		}
	}
}

// used by communications note to close a single note
function resolveNote(noteId) {
	if (confirm('Are you sure you want to resolve this note?')) {
		document.buildFormForm.noteId.value = noteId;
		submitPage('buildForm.action', 'resolveNote', '1');
	}
}

// used by communications note to remove a single note (same as resolve, different message)
function removeNote(noteId) {
	if (confirm('Are you sure you want to remove this note?')) {
		document.buildFormForm.noteId.value = noteId;
		submitPage('buildForm.action', 'removeNote', '1');
	}
}

// used by communications note to restore a single note
function restoreNote(noteId) {
	if (confirm('Are you sure you want to restore this note?')) {
		document.buildFormForm.noteId.value = noteId;
		submitPage('buildForm.action', 'restoreNote', '1');
	}
}

function openPrinterFriendly(isDocumentAttached) {
	if (!unsavedChanges || confirm('Are you sure you want to open the printer friendly version without saving first?\n\nHitting OK will not display unsaved data in the printer friendly version.')) {
        if(isDocumentAttached) {
	        printDialog = Dialog.confirm( $('includeAttachment').innerHTML, {
                title: '',
                className: 'alphacube',
                width: 380,
                opacity: 1.0,
                okLabel: 'Print', 
                cancelLabel: 'Cancel', 
                onShow: function(){
                    printDialog.updateSize();
                },
                onOk: function() {
                    var okButton = printDialog.getContent().parentNode.down('.ok_button');              
                    // If we're performing the 'Print" action
                    if( okButton.value == 'Print' ){
                        okButton.value = "Preparing pages...";
                        okButton.disabled = true;
                        // Added requestFromPage parameter which will be used for computing the file name
                        var includeAttachment = ( $('include_Yes').checked ? "true" : "false" );
                        var printPreviewUrl = buildPrintPreviewActionUrl(includeAttachment);
                        openWindow(printPreviewUrl);
                        $('printSelectTbl').hide();
                        $('overlay').hide();
                    }   
                    return true;            
                },
                onCancel: function() {
                    $('overlay').hide();
                    return true;
                }
            });
        } else {
            openWindow(buildPrintPreviewActionUrl('false'));
        }
	}
	return false;
}

function buildPrintPreviewActionUrl(includeAttachment) {
    var url = 'printPreview.action';
    
    // Add hhsos session key
    url += '?hhsosSessionKey=' + $('hhsosSessionKey').value;
    
    // Add print preview request parameters
    url += '&formVersionIds=' + document.buildFormForm.formVersionId.value;
    url += '&activityIds=' + document.buildFormForm.activityId.value;
    url += '&showPdf=true';
    // IncludeAttachment should be 'true' or 'false'
    url += '&isIncludeAttachment=' + includeAttachment
    
    // Add print preview properties (defined in formLayout.jsp)
    if(printPreviewProperties) {
        for(var pppKey in printPreviewProperties) {
            if(printPreviewProperties.hasOwnProperty(pppKey)) {
                url += '&' + pppKey + "=" + printPreviewProperties[pppKey];
            }
        }
    }
    
    return url;
}

function openPOCModule(){
    var url = 'app#/carePlanModule/?chartId=' + document.buildFormForm.chartId.value + '&patientId=' + document.buildFormForm.patientId.value + '&redirect=' + 1;
    openWindow(url);
    return false;
}

function openPatientChart(isNewWindow) {
    var url = 'patientCharts.action' +
      '?hhsosSessionKey=' + $('hhsosSessionKey').value + '&selectedPatientId=' + document.buildFormForm.patientId.value +
      '&mainMenuForward=buildForm.action';
    if (isModalView) {
    	url += '&newWindow=true';
    	if(window.parent && window.parent.angular) {
    	    redirectToNewTabForm(url, 'patientChart');
    	} else {
    	    openWindow('app#/patientCharts?=selectedPatientId=' + document.buildFormForm.patientId.value + '&mainMenuForward=buildForm.action');
    	}
    } else {
        openWindow(url, 'patientChart');
    }
    return false;
}

/**
 * @deprecated
 * <p>
 * This is method was used to decide open patient chart in same tab or newtab. 
 * And confirm popup will be shown if we open on same tab.It is used inside openPatientChart method.
 * </p> 
 * @param url
 * @param isNewWindow
 * 
 */

function openPatientChartInModalView(url, isNewWindow) {
	if (isNewWindow) {
	    window.top.open(url + '&newWindow=true');
	} else if (!unsavedChanges || confirm('You will lose all unsaved data. Are you sure you want to leave this page?')) {
		window.onbeforeunload = function(){
			return null;
		}
	    window.location.href = url;
	}
}

function openHistory(isGenericAuditTrailEnabled) {
    document.buildFormForm.action = 'history.action';
    document.buildFormForm.actionToPerform.value = '';
    var selectedPatientId = document.buildFormForm.selectedPatientId.value;
    document.buildFormForm.selectedPatientId.value = (isGenericAuditTrailEnabled && !selectedPatientId)
            ? document.buildFormForm.patientId.value : selectedPatientId;
    if (!isModalView) {
        document.buildFormForm.submit();
    } else {
        var properties = ["hhsosSessionKey", "hhsosTokenKey", "activityId", "userId", "selectedPatientId", "searchType", 
                          "actionToPeform", "startDate", "endDate", "startTime", "endTime", "historyId", "start", "showReturnToForm" ];
        var kvpairs = [];
        var form = document.buildFormForm;// get the form somehow
        for ( var element = 0; element < form.elements.length; element++ ) {
           var elementObj = document.buildFormForm.elements[element];
               if(properties.indexOf(encodeURIComponent(elementObj.name)) > -1) {
                   kvpairs.push(encodeURIComponent(elementObj.name) + "=" + encodeURIComponent(elementObj.value));
               }
        }
        var locationURL = 'history.action?' + kvpairs.join("&");
        if(isGenericAuditTrailEnabled) {
            locationURL = locationURL + '&isRedirect=true';
        }
        if(locationURL.length <= 2048) {
            redirectJspToUrl(locationURL);
        } else {
            console.log('URL limit exceeded');
        }
    }
    return false;
}


function fieldChanged() {
	
	// mark that data has been changed
	unsavedChanges = true;
	
	// reset idle time
	lastChangeTime = new Date().getTime();
}

function countSwf() {
	swfcount = window.setTimeout(setSwf, 6000);
}

function setSwf() {
	window.document.buildFormForm.notswf.value="true";
}

function clearSwfcount() {
	clearTimeout(swfcount);
}

function autosaveFrequency(values, isNewActivity, callback) {
    if (isNewActivity) {
        autosave(values, callback);
    } else {
        autosave(values);
        if (callback) {
            callback();
        }
    }
}

function autosave(values, callback) {
	// determine whether this is a full save
	var fullSave = !values;

	// by default, this is not the last save
	var lastSave = false;

	// if this was a timed autosave
	if (!callback) {
		// if enough time has passed that the user has been idle, get ready to do a last save and log out
		var idleTime = new Date().getTime() - lastChangeTime; // idle time in millis
		lastSave = (idleTime > autosaveTimeout);
	}

	if(checkAuthorizedOnSave != '' && visitAuthStatus == null) {
	    checkAuthorizationOnChange('0');
	}

	// we do not want to perform an autosave if
	//  1. we're currently relogging in
	//  2. a last modification popup has occurred
	//  3. a regular save is in progress (unless we need to fire an autosave in order to sign this form)
	//  4. an autosave is in progress
	//  5. there's no data to save UNLESS
	//     a) this is a final save before redirecting from the page, or
	//     b) this was not a timed save (there is a callback)
    if (relogging
        || lastModificationOccurred
        || (saveInProgress && !needToSaveToSign)
        || autosaveInProgress
        || (!unsavedChanges && !lastSave && !callback)) {

        // if we can't save BUT this is supposed to be the last save, just redirect to the login page
        if (lastSave) {
            unsavedChanges = false; // don't prompt that data isnt saved
            window.location.href = 'login.action?source=' + document.forms[0].name + '&path=3';
        }

        // if there is a callback, let it know that autosave failed
        if (callback) {
            callback(false);
        }

        return;
    }

	// get the forms values if they weren't passed in
	if ( fullSave ) {
		// serialize the entire form
		values = $(document.buildFormForm).serialize(true);
	} else {
		// if we're not serializing the entire form, add the hhsosSessionKey to be submittted as part of the ajax request
		values.hhsosSessionKey = $('hhsosSessionKey').value;
	}

	var errorFieldNames = checkFieldRuleValidationOnAutoSave();
	values.fieldValidationResult = JSON.stringify(errorFieldNames);

	// figure out if this is an auto save or ajax save
	values.actionToPerform = callback ? 'ajaxSave' : 'autoSave';

	// add all the auth failures to the save
	values.authFailures = getAuthFailures();

    // add activity visit data value to the save
	if (typeof getActivityVisitData === 'function') {
	    values.activityVisitDataValue = getActivityVisitData();
	}

	// an autosave is now in progress
	autosaveInProgress = true;
	if ( fullSave ) {
		// display a message that we are saving
		setSaveMessage('Saving ...', true);
		if (extendSaveTimer) window.clearTimeout(extendSaveTimer);
		extendSaveTimer = window.setTimeout(extendSaveMessage, extendSaveDelay);
	}

	// perform the save
    if (this.useSchedulingNx) {
        overridePrompt = false;
        values.overridePrompt = overridePrompt;
    }
    if (sanitizeFormInputValues(document.buildFormForm)) {
        autosaveFailure( null, callback );
        return;
    }
	if (document.buildFormForm.activityId.value && document.buildFormForm.activityId.value!="") {
		// normal autosave
		new Ajax.Request( 'buildForm.action', {
			requestHeaders: { Accept: 'application/json', 'Response-Type': 'application/json' },
			parameters: values,
			method: 'post',
			onSuccess:   function(transport) { autosaveSuccess ( transport, callback, fullSave, lastSave ); },
			onFailure:   function(transport) { autosaveFailure ( transport, callback, values, lastSave ); },
			onException: function(requester, ex) { autosaveFailure( null, callback ); }
		} );
	} else {
		// autosave with autocreate
		new Ajax.Request( 'buildForm.action', {
			requestHeaders: { Accept: 'application/json' },
			parameters: values,
			method: 'post',
			onSuccess:   function(transport) { autosaveSuccess ( transport, callback, fullSave, lastSave ); },
            onFailure:   function(transport) { autosaveFailure ( transport, callback ); },
			onException: function(requester, ex) { autosaveFailure ( null, callback ); }
		} );
	}
}

function setSaveMessage(message, visible) {
	$$('.messageText').each(function(e) {e.innerHTML = message;});
	$$('.messageImage').each(function(e) {e.style.visibility = visible ? 'visible' : 'hidden';});
}

function extendSaveMessage() {
	setSaveMessage('Saving ... This is taking longer than normal, please check your connectivity. Do not close your browser.', true);
}

/**
 * Set ActivityId in the FrameURI.
 * If ActivityId is not present in FrameURI,
 *   then only only given ActivityId will be set to FrameURI, otherwise not.
 *
 * @param actId, ActivityId to set to FrameURI
 */
function setActivityIdInFrameURI(actId) {
    var sessURI = window.sessionStorage.getItem('frameUri');
    if (sessURI && !sessURI.match('activityId=[0-9]+&')) {
        if (sessURI.match('activityId=[0-9]*&')) {
            sessURI = sessURI.replace('activityId=', 'activityId=' + actId);
            window.sessionStorage.setItem('frameUri', sessURI);
        }
    }
}

function autosaveSuccess(transport, callback, fullSave, lastSave) {
	var result = transport.responseJSON;
	var isSuccess = result && result['saved'] == true;
	var isTokenValid = result && result['isTokenValid'] == true;
	var lastModification = result && result['lastModification'];
    var error = null;
	
    if (isModalView && null != result) {
        setActivityIdInFrameURI(result.activityId);
    }

	autosaveInProgress = false; // autosave is no longer in progress
	
    // clear the last failures, they were logged on a successful json response
    if (result != null) clearAuthFailures();
    
	if (lastSave) {
		// we just tried to do a last save after being idle for a very long time.
		// whether or not it was successful, we need to redirect to the login page.
		unsavedChanges = false; // don't prompt that data isnt saved
		window.location.href = 'login.action?source=' + document.forms[0].name + '&path=4';
	}
	
	if (isSuccess) {
		// if we're told that the form was created
		if (result['created']) {
			// change some parts of the page to reflect that the form has been created
	        autocreate(result['activityId'], result['episodeId']);
	    }
	    
	    // if a page token was returned
	    var token = result['token'];
	    if (token) {
	    	// update the page token
	    	document.buildFormForm['hhsosTokenKey'].value = token;
	    }
	    
	    // if a lastModificationId was returned
		var lastModificationId = result['lastModificationId'];
		var lastTileFieldModificationId = result['lastTileFieldModificationId'];
	    if (lastModificationId) {
	    	// update the lastModificationId (this represents when the page was last modified)
	    	document.buildFormForm['lastModificationId'].value = lastModificationId;
	    }
	    if (lastTileFieldModificationId) {
	    	// update the lastTileFieldModificationId (this represents when the common field(s) was last modified)
	    	document.buildFormForm['lastTileFieldModificationId'].value = lastTileFieldModificationId;
	    }

	    // Update the chartId so that POC items flow to the appropriate POC Module
	    var chartId = result['chartId'];
	    if (chartId) {
	        document.buildFormForm['chartId'].value = chartId;
	    }

	    if (result && result['externalMessageResponse']) {
	        alert(result['externalMessageResponse']);
        }

	    // if this was a full save
	    if ( fullSave ) {
	    	// put into autosaveStatus the time that we saved (the current time)
	    	setSaveMessage('Saved ' + formatTime( new Date() ), false);
			if (extendSaveTimer) window.clearTimeout(extendSaveTimer);
			extendSaveTimer = null;
			
			// there should be nothing left to save
			unsavedChanges = false;
	    }
	    
	} else {
		
	    // since isSuccess is false, set the error message as the general error message
	    error = generalErrorMessage;
	    
		// if this was a full save
		if ( fullSave ) {
		    var message = '';
	        var isPatientNotFound = result && result['error'] == 'PATIENT_NOT_FOUND';
	        if (isPatientNotFound) {
	            message = '<font color="red">' + (result['message'] || '') + '</font>';

	            // It will avoid a infinite attempt to save cilinician form without patient.
	            // This form should be reloaded again after selecting the patient. 
	            // So, these changes will be ignored
	            unsavedChanges = false;
	        }
		    
			// clear out the autosave status
	    	setSaveMessage(message, false);
			if (extendSaveTimer) window.clearTimeout(extendSaveTimer);
			extendSaveTimer = null;
		}
		
		if (lastModification) {
			// saving failed specifically because the page / whole activity was last modified by someone else
			// we need to display a prompt on whether to use your data or reload with fresh data
			
			lastModificationOccurred = true;
			openLastModificationDialog(true, lastModification);
			
		} else if (!isTokenValid) {
			// for some reason, saving failed. it could be a token or a session issue.
			// we'll need to re-login to continue.
			
			// figure out what kind of issue occurred and log that error
            addAuthFailure('autosaveSuccess', 200 /* HTTP OK */, result == null ? 'not logged in' : 'token invalid');
	        
	        // start the re-login process
		    startRelogin();
		}
	}
	
	autosaveCompleted(error, callback);
}

function autosaveFailure(transport, callback, values, lastSave) {
    var error = transport && transport.status == 0 ? connectivityErrorMessage : generalErrorMessage;
    addAuthFailure('autosaveFailure', transport ? transport.status : null, error);
    if (transport && transport.status == 422) {
        showSaveFailurePopup(transport.responseJSON.message, true);
    } else if (transport && transport.status == 428) {
        showSaveOverridePopup(transport.responseJSON.message, values, transport, callback, lastSave);
    }
    if(showAutoSaveConnectionWarnings && transport) {
        // If autoSave has successively failed for 6 times then reset the counter
        autoSaveFailedCount++;
        if(autoSaveFailedCount >= 6) {
            showSaveFailurePopup(error);
        }
    }
    
	autosaveInProgress = false; // autosave is no longer in progress
	
	autosaveCompleted(error, callback);
	
	// clear out the autosave status
	setSaveMessage('', false);
	if (extendSaveTimer) window.clearTimeout(extendSaveTimer);
	extendSaveTimer = null;

	// If this failure is due the null session/when session has been expired, it will get 404 error.
	// Re-authenticate the user if the status is '404'
	if(transport && (transport.status == '404' || transport.status == '401')) {
        startRelogin(transport.responseJSON);
	}
}

function showSaveFailurePopup(errorMessage, isError) {
    $('overlay').show();
    var title = 'Warning';
    if (isError) {
        title = 'Error';
    }
    var errorMessageHtml = '<div style="text-align: left; padding: 10px;">' + errorMessage + '</div>';
    if (saveFailurePopup) saveFailurePopup.close();
    saveFailurePopup = Dialog.alert( errorMessageHtml, {
        title: title,
        width: 300,
        className: 'alphacube_lite',
        okLabel: 'OK',
        onOk: function() {
            // reset the counter
            autoSaveFailedCount = 0;
            saveCanceled();
            saveFailurePopup = null;
            if (isError) {
                document.buildFormForm.nextPageNum.value = document.buildFormForm.pageNum.value;
                document.buildFormForm.actionToPerform.value = '';
                document.buildFormForm.submit();
            }
            return true;
        }
    });
}


function showSaveOverridePopup(errorMessage, values, transport, callback, lastSave) {
    $('overlay').show();
    var errorMessageHtml = '<div style="text-align: left; padding: 10px;">' + errorMessage + '\nWould you like to continue?</div>';
    if (saveFailurePopup) saveFailurePopup.close();
    saveFailurePopup = Dialog.confirm( errorMessageHtml, {
        title: 'Warning',
        width: 300,
        className: 'alphacube_lite',
        okLabel: 'OK',
        cancelLabel: "Cancel",
        onOk: function() {
            // normal autosave
            overridePrompt = true;
            values.overridePrompt = overridePrompt;
            new Ajax.Request( 'buildForm.action', {
                requestHeaders: { Accept: 'application/json', 'Response-Type': 'application/json' },
                parameters: values,
                method: 'post',
                onSuccess:   function(transport) { autosaveSuccess ( transport, callback, !values, lastSave ); },
                onFailure:   function(transport) { autosaveFailure ( transport, callback, values, lastSave ); },
                onException: function(requester, ex) { autosaveFailure( requester.transport, callback ); }
            } );
            $('overlay').hide();
            return true;
        },
        onCancel: function() {
            // reset the counter
            autoSaveFailedCount = 0;
            saveCanceled();
            saveFailurePopup = null;
            overridePrompt = false;
            document.buildFormForm.nextPageNum.value = document.buildFormForm.pageNum.value;
            document.buildFormForm.actionToPerform.value = '';
            document.buildFormForm.submit();
            return true;
        }
    });
}

function autosaveCompleted(error, callback) {
	// call the callback with whether it succeeded
	if (callback) {
		callback(error);
	}
	
	// if there was a pending save, perform it
	if (pendingSave != null) {
		pendingSave();
	}
}

function startSignForm(signatureKey, responseJSON) {
    $('overlay').show();
    
    if (!signatureKey) {
        signatureKey = '';
    }
    
    // we may have to perform an autosave later, so store the authentication dialog call in a variable
    var startSigning = function() {
        openAuthenticationDialog({
            actionToPerform: 'sign',
            okCallback: submitPush || submitStore || saveCanceled,
            cancelCallback: saveCanceled,
            signatureAuthorizationRequired: document.buildFormForm.signatureAuthorizationRequired.value == 'true',
            signatureKey: signatureKey,
            activityId: document.buildFormForm.activityId.value,
            responseJSON: responseJSON
        });
    };
    
    // determine if the activity is saved yet
    var activityId = document.buildFormForm.activityId.value;
    if (!activityId || activityId <= 0 || isPushedForSignature) {
        // if not, we need to perform an autosave
        unsavedChanges = true;
        needToSaveToSign = true;
        saveFirst(function(error) {
            needToSaveToSign = false;
            validating = false;
            
            // if an error occurred, do not continue, and show the save failure popup instead
            if (error) {
                showSaveFailurePopup(error);
                return;
            }
            
            // autosave complete, now procede to sign the form
            startSigning();
        });
    } else {
        // activity was already created, go ahead and sign the form
        startSigning();
    }
}

function startSignFormReadOnly(signatureKey) {
    $('overlay').show();
    
    // For readOnly, we won't be saving anything
    openAuthenticationDialog({
        actionToPerform: 'sign',
        okCallback: signSucceeded,
        cancelCallback: signCanceled,
        signatureAuthorizationRequired: document.buildFormForm.signatureAuthorizationRequired.value == 'true',
        signatureKey: signatureKey,
        activityId: document.buildFormForm.activityId.value
    });
}

function signSucceeded(activityId) {
    var form = document.buildFormForm;
    form.actionToPerform.value = 'signThisForm';
    form.activityId.value = activityId;
    form.submit();
}

function signCanceled() {
    $('overlay').hide();
}

function startRelogin(options) {
    $('overlay').show();
    relogging = true;
    if (options) {
        openAuthenticationDialog({
            actionToPerform: 'relogin',
            okCallback: reloginSuccess,
            cancelCallback: logout,
            responseJSON: {
                isNIAMAuthEnabled: options.isNiamEnabled,
                NIAMRedirectURL: options.niamRedirectUrl
            }
        });
    } else {
        openAuthenticationDialog({
            actionToPerform: 'relogin',
            okCallback: reloginSuccess,
            cancelCallback: logout
        });
    }
}

function startDeclineForm() {
    $('overlay').show();
    openDeclineDialog({
        okCallback: declineSuccess,
        cancelCallback: saveCanceled,
        activityId: document.buildFormForm.activityId.value
    });
}

function reloginSuccess(token) {
    // reset the idle counter to avoid the situation where we re-logged in but get redirected to the login page anyway
    idleTime = new Date().getTime();

    // set the token
    document.buildFormForm.hhsosTokenKey.value = token || '';
    
    // we're done relogging in
    relogging = false;
    
    $('overlay').hide();
}

function declineSuccess(activityId, declineComment) {
    // store the decline comment
    document.buildFormForm.declineComment.value = declineComment;
    
    if(!isReadOnly) {
        // submit the form using submitStore
        submitStore();
    } else {
        document.buildFormForm.actionToPerform.value = 'declineThisForm';
        document.buildFormForm.activityId.value = activityId;
        
        // for readOnly mode simply submit the form
        document.buildFormForm.submit();
    }
}

function saveStarted() {
	$('overlay').show();
	saveInProgress = true;
}

function saveCanceled() {
	$('overlay').hide();
	saveInProgress = false;
    resetAllowVisitOverlapValue();
}

function submitSave() {
	setSaveMessage('Saving ...', true);
    saveInProgress = true;
    if (extendSaveTimer) window.clearTimeout(extendSaveTimer);
	extendSaveTimer = window.setTimeout(extendSaveMessage, extendSaveDelay);
	normalSave = true;

    if (this.useSchedulingNx || (this.useExternalScheduling && this.useSyncAlerting)) {
        var values = $(document.buildFormForm).serialize(true);
        if (typeof getActivityVisitData === 'function') {
            values.activityVisitDataValue = getActivityVisitData();
        }
        overridePrompt = false;
        values.overridePrompt = overridePrompt;
        new Ajax.Request('buildForm.action', {
            requestHeaders: {Accept: 'application/json', 'Response-Type': 'application/json'},
            parameters: values,
            method: 'post',
            onSuccess: function (transport) {
                overridePrompt = true;
                values.overridePrompt = overridePrompt;
                if (transport.responseJSON && transport.responseJSON.message && transport.responseJSON.message !== "Saved successfully") {
                    alert(transport.responseJSON.message);
                }
                document.buildFormForm.submit();
            },
            onFailure: function (transport) {
                saveInProgress = true;
                if (transport && transport.status == 428) {
                    $('overlay').show();
                    var errorMessageHtml = '<div style="text-align: left; padding: 10px;">' + transport.responseJSON.message + '\nWould you like to continue?</div>';
                    if (saveOverridePopup) saveOverridePopup.close();
                    saveOverridePopup = Dialog.confirm(errorMessageHtml, {
                        title: 'Warning',
                        width: 300,
                        className: 'alphacube_lite',
                        okLabel: 'OK',
                        cancelLabel: "Cancel",
                        onOk: function () {
                            // normal autosave
                            overridePrompt = true;
                            document.buildFormForm.overridePrompt.value = overridePrompt;
                            document.buildFormForm.submit();
                            return true;
                        },
                        onCancel: function () {
                            isSubmitted = false;
                            saveOverridePopup = null;
                            overridePrompt = false;
                            setSaveMessage('', false);
                            if (extendSaveTimer) window.clearTimeout(extendSaveTimer);
                            saveCanceled();
                            extendSaveTimer = null;
                            return true;
                        }
                    });
                } else if (transport) {
                    showSaveFailurePopup(transport.responseJSON.message, true);
                    // clear out the status
                    isSubmitted = false;
                    setSaveMessage('', false);
                    if (extendSaveTimer) window.clearTimeout(extendSaveTimer);
                    saveCanceled();
                    extendSaveTimer = null;
                }
            },
            onException: function(requester, ex) {
                isSubmitted = false;
                setSaveMessage('', false);
                if (extendSaveTimer) window.clearTimeout(extendSaveTimer);
                extendSaveTimer = null;
                saveCanceled();
                alert('An unexpected error occurred: ' + ex);
            }
        });
    } else {
        if (typeof getActivityVisitData === 'function') {
            document.buildFormForm.activityVisitDataValue = getActivityVisitData();
        }

        document.buildFormForm.submit();
    }
}

function formatTime(date) {
	var hours = date.getHours();
	var mins = date.getMinutes();
	var secs = date.getSeconds();
	
	var pm = hours >= 12;
	hours = hours == 0 ? 12 : hours > 12 ? hours - 12 : hours;
	mins = (mins < 10 ? '0' : '') + mins;
	secs = (secs < 10 ? '0' : '') + secs;
	pm = pm ? 'pm' : 'am';
	
	return hours + ':' + mins + ':' + secs + ' ' + pm;
}

function logout() {
	var windowOpened = false;
	try {
		windowOpened = window.opener && window.opener.document ? true : false;
	} catch (err) { }
	
	if (windowOpened) {
		normalSave = true;
		window.opener.location.href = 'login.action?logout=Y&hhsosSessionKey='+ $('hhsosSessionKey').value + '&source=' + document.forms[0].name + '&path=6';
		window.close();
	} else {
		window.location.href = 'login.action?logout=Y&hhsosSessionKey='+ $('hhsosSessionKey').value + '&source=' + document.forms[0].name + '&path=5';
	}
}

function autocreate(activityId, episodeId) {
	try {
	    var isDocumentAttached = false;
	    document.buildFormForm.activityId.value = activityId;
	    if(document.buildFormForm.isPrintPreview.value && document.buildFormForm.isPrintPreview.value === 'true' && 
            document.buildFormForm.attachedDocumentsSize && document.buildFormForm.attachedDocumentsSize.value) {
	        isDocumentAttached = parseInt(document.buildFormForm.attachedDocumentsSize.value) > 0;  
	    }
	    if (episodeId) document.buildFormForm.episodeId.value = episodeId;
	    $('printerFriendlyId').innerHTML = '<a href="#" onClick="return openPrinterFriendly('+ isDocumentAttached +')">Printer-Friendly Version</a>';
	    $('selectActionId').disabled = false;
	    var hiddenCheckBox = $('checkboxClass0');
	    if(hiddenCheckBox) {
		    var split = hiddenCheckBox.value.split('_');
			var isPoc = split[1];
			var isShared = split[2];
			var isExportable = split[3];
			var printAllPages = split[4];
			hiddenCheckBox.value = activityId + '_' + isPoc + '_' + isShared + '_' + isExportable + '_' + printAllPages;
	    }
	    $('noteId').innerHTML = '<a name="addNoteId" href="#" onclick="submitNote();">Notes</a>';
	    // Only if the validate link is available on the form, then enable it
	    if($('validateId')) {
	        $('validateId').innerHTML = '<a name="addValidateId" href="#" onclick="submitValidate();">Validate</a>';
	    }
		$$('.trackingSpan').each( function(e) { e.hide(); });
	    $$('.trackingLink').each( function(e) { e.show(); });
	    if (document.buildFormForm.copyFormBtn && document.buildFormForm.copyFormBtn.disabled) document.buildFormForm.copyFormBtn.disabled=false;
	    if (document.buildFormForm.pushBtn && document.buildFormForm.pushBtn.disabled) document.buildFormForm.pushBtn.disabled=false;
	} catch (err) {
		// don't allow an error here to mess everything else up for an autocreate
	}
}

window.onbeforeunload = function() {
    // if the data is about to not be saved...
    if (!normalSave && unsavedChanges && document.buildFormForm.notswf.value=="true" && !isPoc) {
        
        // window.close() incorrectly calls onbeforeunload twice in FF3 and chrome
        if (mainMenu) unsavedChanges = false;
        
        // return a message to confirm whether or not the user wants to leave the page
        return "YOU WILL LOSE UNSAVED DATA IF YOU CLICK OK!";
    }
};

window.onunload = function() {
	// figure out if this page was opened from another tab/window
	var windowOpened = false,
		windowOpener;
	try {
		if (isModalView) {
			windowOpener = window.parent.opener;
		} else {
			windowOpener = window.opener;
		}
		windowOpened = windowOpener && windowOpener.document ? true : false;
	} catch (err) { }
	// if this is a new window and the user hit main menu or close, try to resubmit window.opener's form
	if (!normalSave && windowOpened) {
		// only resubmit the opener's form in certain cases:
		var f = windowOpener.document.viewOnlineActivityForm
		     || windowOpener.document.scheduleByUserForm
		     || windowOpener.document.scheduleByPatientForm
		     || windowOpener.document.buildFormForm
		     || windowOpener.document.therapyVisitAnalyticsReportForm;
		if (f) {
			// disable the post button in the opener's window if there is one
			var postButton = windowOpener.document.getElementById('postButton');
			if (postButton) postButton.setAttribute('disabled','disabled');
			// show the overlay in the opener's window if there is one
			var overlay = windowOpener.document.getElementById('overlay');
			if (overlay) overlay.style.display = '';
			// remove action to perform in the opener's window
			if (windowOpener.document.buildFormForm) {
			    f.actionToPerform.value = '';
				// Hard refresh implementation resolves the issue which the 
				// following code intented to do.
			    /*if(f.newWindow) {
			        // No need to pass new window true in case tab is being auto-refreshed, else will redirect to '/app'
			        f.newWindow.value = '';
			    }*/
			} 
			// submit the opener's form
			f.submit(); 
		} else {
			windowOpener = windowOpener.angular ? windowOpener : windowOpener.parent;
			windowOpener.angular.element(windowOpener.document).injector()
				.get('GridService')
				.refreshPage(episodeId);
	    }
	}
};

function signOnSendConfirm(ev) {
	var content = document.getElementById('signcfm_content');
	Dialog.confirm( content.innerHTML, {
		title: 'Send To Office',
		width: 500,
		className: 'alphacube',
		okLabel: 'OK',
		cancelLabel: "Cancel",
		onOk: function(dialog) {
		   	// close the dialog
		    dialog.close();
		   	
		   	// if the user chose to sign before submitting to office
		    if (document.getElementsByName('sendSignDefault')[0].value=="true") {
		        // start the signature process
		        performFormCreateChecks(formVersionId, episodeId, null, null, null, startSignForm, null);
			} else {
			    // otherwise, go ahead and submit to office
				submitStore();
			}
		    
		    return true;
		},
		onCancel: function() {
		    saveCanceled();
		    return true;
		}
	});
}

function updateIndividualUsers(leadUserElement) {
    // Find all supporting users for the lead user and check/uncheck based on lead user
    var className = 'supportingUserGroup_' + leadUserElement.value;
    var supportingGroupElements = $('pushcfm_content_new').getElementsByClassName(className)
    for(var i = 0; i < supportingGroupElements.length; i++ ) {
        supportingGroupElements[i].checked = leadUserElement.checked;
    }
    
    // Find the list of all supporting users that were selected in the group
    var selectedSupportingUserIds = new Array();
    $$("input:checkbox[name=supportingUserChecks]:checked").each(function(e){
        selectedSupportingUserIds.push($(e).value);
    });
    
    // un-check and disable the individual users if they were selected in the group section
    // otherwise enable the the individual users if they were not selected in the group section
    $$("input:checkbox[name=pushUserChecks]").each(function(e){
        var item = $(e);
        if(selectedSupportingUserIds.indexOf(item.value) > -1) {
            item.checked = false;
            item.disabled = true;
            item.next().addClassName('disabledCheckboxLabel');
        } else {
            item.disabled = false;
            item.next().removeClassName('disabledCheckboxLabel');
        }
    });
}

function confirmPushYes(dialog) {
    // Individual userIds pushed for signature
	var pushUserIds = "";
	var pushUserChecks = document.getElementsByName("pushUserChecks");

	for( var i = 0; i < pushUserChecks.length; i++ ) {
		if (pushUserChecks[i].checked) {
			if (pushUserIds=="") {
				pushUserIds = pushUserChecks[i].value;
			} else {
				pushUserIds = pushUserIds+","+pushUserChecks[i].value;
			}
		}
	}

	// Lead and supporting userIds pushed from group section
	var pushedForSupportingUserIds = "";
    var supportingUserChecks = document.getElementsByName("supportingUserChecks");

    for( var i = 0; i < supportingUserChecks.length; i++ ) {
        if (supportingUserChecks[i].checked) {
            if (pushedForSupportingUserIds == "") {
                pushedForSupportingUserIds = supportingUserChecks[i].value;
            } else {
                pushedForSupportingUserIds = pushedForSupportingUserIds + "," + supportingUserChecks[i].value;
            }
        }
    }
	
    document.buildFormForm.pushedForSupportingUserIds.value = pushedForSupportingUserIds;
	document.buildFormForm.pushUserIds.value = pushUserIds;
	document.buildFormForm.assignType.value = "PushedForSignature";
	document.buildFormForm.isAssigned.value = true;
	document.buildFormForm.orderTrackingFormValue.value = $('orderTracking').checked;
	//document.buildFormForm.autoOpenNote.value = "true";
	
	if (pushUserIds == "" && pushedForSupportingUserIds == "") {
		alert("Please choose one or more users.");
		saveCanceled();
		return false;
	} else {
		var signFormOnPushValue = document.getElementById("signFormOnPushValue").value;
		if ( signFormOnPushValue == "signFormOnPush" ) {
		    submitPush = function() {
		        submitSave();
		        return true;
		    };
		    performFormCreateChecks(formVersionId, episodeId, null, null, null, startSignForm, null);
		} else if (signFormOnPushValue == "no") { 
		    submitSave();
		    return true;
		}
	}
}

function pushConfirm(ev) {
	var content = document.getElementById('pushcfm_content');
	Dialog.confirm( '<div id="pushcfm_content_new">' + content.innerHTML + '</div>', {
		title: 'Push to user(s)',
		width: 400,
		className: 'alphacube',
		okLabel: 'Push',
		cancelLabel: "Cancel",
		onOk: confirmPushYes,
        onCancel: function() {
            saveCanceled();
            return true;
        },
		onShow: function() {
		    if (showOrderTracking) {
		        $('orderTrackingArea').show();
		        // if this is being displayed at all, the form has to be is_order
		        $('orderTracking').checked = true;
		    }
		}
	});
}

function confirmCopyYes(content) {
    var targetEpisodeId = "";
    
    var radioButtons = $(content).getElementsBySelector('input[ type=radio]');
    for(var i = radioButtons.length-1; i >= 0; i--) {
		if(radioButtons[i].checked) {
			targetEpisodeId = radioButtons[i].value;
			break;
		}
	}
    
    if (targetEpisodeId=="") {
        alert("You have not selected an episode to copy to.");
		saveCanceled();
    } 
    else {
	    var values = $(document.buildFormForm).serialize(true);
		values.actionToPerform = "validateTargetEpisode";
		values.targetEpisodeId = targetEpisodeId;
		
	    new Ajax.Request( 'ajax.action', {
			requestHeaders: { Accept: 'application/json' },
			parameters: values,
			method: 'post',
			onSuccess:   function(transport) { confirmExistingFormCopy(transport); }, 
			onFailure: function(transport) {
                var errorMessage = transport.transport.getResponseHeader("Error-Message");
                if (errorMessage) {
                    alert(errorMessage);
                } else {
                    $('overlay').hide();
                    var errCode = transport.status + ':' + '10002';
                    logUIErrorAudits('Failure - Ajax.action - validateTargetEpisode, Status Code: ' + errCode);
                    alert("Failed to contact server. Please try again or contact support.\nErrCode: " + errCode);
                }
				saveCanceled();
			},
			onException: function(requester, ex) {
				alert("Caught Exception\n" + ex.message);
				saveCanceled();
			}
	    } );
    }
}

function confirmExistingFormCopy(transport) {
	var result = transport.responseJSON;
	if (result != null) {
		if(result.episodeHasExistingForm == "true") {
			var ans = confirm("There is an existing " + result.formName + " in chart # " + result.chartNum + ", episode #" + result.episodeNum + ".  Are you sure you would like to continue?");
			if (ans) {
				performCopy(result.targetEpisodeId);
			} else {
				saveCanceled();
			}
		}
		else {
			performCopy(result.targetEpisodeId);
		}
	} else {
		saveCanceled();
	}
}

function performCopy(targetEpisodeId) {
	
    if (targetEpisodeId=="") {
        alert("You have not selected an episode to copy to.");
        saveCanceled();
    } else {
    	
    	if(copyAlert != null && copyAlert != '') {
    		copyAlert += " Do you want to:\n Click OK to set the open shared form to \"Complete\" and start using the copied form?";
			if (!confirm(copyAlert)) {
				saveCanceled();
				return;
			}
		}
    	
		window.document.buildFormForm.targetEpisodeId.value = targetEpisodeId;
	    window.document.buildFormForm.actionToPerform.value = "copy";
		submitSave();
    }
}

function copyConfirm(ev) {
	var maxHeight = 400;
	if (aConfirmCopyBox == null){
		aConfirmCopyBox = Dialog.confirm(
			 $('copycfm_content').innerHTML, {
	    	  className: "alphacube",
	    	  width: 400,
	          title: "Copy to New",
		      okLabel: "OK",
		      cancelLabel: "Cancel",
		      onOk: function(){
		    	  confirmCopyYes(aConfirmCopyBox.content);
		    	  aConfirmCopyBox.destroy();
		    	  return true;
		      },
		      onCancel: function() {
		          saveCanceled();
		    	  aConfirmCopyBox.destroy();
		    	  return true;
		      },
			  onDestroy: function(){
				  aConfirmCopyBox = null;
			  }
		    }
		);
	}
	var scrollTop = document.body.scrollTop || document.body.parentNode.scrollTop;
	
	aConfirmCopyBox.show();
	if (aConfirmCopyBox.height > maxHeight ){
		aConfirmCopyBox.setSize(aConfirmCopyBox.width, maxHeight);
	}
	aConfirmCopyBox.updatePosition();
}

function saveFirst(callback) {
	if (validating && !unsavedChanges) return;
	
	if (lastModificationOccurred) {
		// If we've already shown the last modification prompt, prompt again
		openLastModificationDialog(false);
	} else if (unsavedChanges) {
		// If we have unsaved data, perform an autosave and call the callback if it was successful
		validating = true;
		autosave(null, function(error) {
			// If the save was successful, continue
			// If the save was not successful *but* the re-authentication popup or the last modification window was displayed, do not continue
			// If the save was otherwise not successful (we will not show any message in this case), just continue
			if (!error || !( relogging || lastModificationOccurred )) {
				if (callback) callback(error);
			} else {
				validating = false;
			}
		});
	} else {
		// If we dont have unsaved data, just call the callback directly
		validating = true;
		if (callback) callback();
	}
}

function submitValidate(oasisVersion) {
	// make sure patientId and activityId are specified
	var patientId = document.buildFormForm.patientId.value;
	var activityId = document.buildFormForm.activityId.value;
	if (patientId.length == 0) {
		alert('Cannot validate a user form.');
		return;
	} else if (activityId.length == 0) {
		alert('This form must be saved first.');
		return;
	}
	
	saveFirst( displayValidation(oasisVersion) );
	return false;
}

function submitPPSPlus() {
	// make sure activityId is specified
	var activityId = document.buildFormForm.activityId.value;
	if (activityId.length == 0) {
		alert('This form must be saved first.');
		return;
	}
	
	saveFirst( displayPPSPlus );
	return false;
}

function submitSHP() {
	// make sure activityId is specified
	var activityId = document.buildFormForm.activityId.value;
	if (activityId.length == 0) {
		alert('This form must be saved first.');
		return;
	}
	
	saveFirst( displaySHPAlertManager );
	return false;
}

function displayValidation(oasisVersion) {
	var patientId = document.buildFormForm.patientId.value;
	var activityId = document.buildFormForm.activityId.value;
	var formType = document.buildFormForm.formType.value;
	var titleStr = "";
	if (oasisVersion == 'hospice') {
	    titleStr = "HIS Validation";
	} else if(oasisVersion == 'oasis'){
	    titleStr = "OASIS Validation";
	} else {
	    titleStr = "Validation";
	}
	var targetUrl = 'validateOasis.action?hhsosSessionKey='+ $('hhsosSessionKey').value +'&patientId=' + patientId + '&activityId=' + activityId + '&formType=' + formType + '&agencyCode=' + agencyCode;
	var winId = "validateWin";
	
	// Display the validation results in a js window
	var noteWindow = new Window(winId, {
			url: targetUrl,
			title: titleStr, 
			top: 30,
			left: 100,
			width: 800,
			height: 300,
			className: aTheme,
		showEffectOptions: { duration:1.5 },
		onClose: function() {
			validating = false;
		}
	});
	noteWindow.setDestroyOnClose();
	noteWindow.show();
}

function displayPPSPlus() {
	displayExternalExportResult("exportPpsPlus.action");
}

function displaySHPAlertManager() {
	displayExternalExportResult("sendShpAssessment.action");
}

function displayExternalExportResult(action) {
	// Build the form to submit
	var form = document.createElement("form");
	form.setAttribute("method", "post"); 
	form.setAttribute("action", action); 
	form.setAttribute("target", "_blank"); 
 
	var activityId = document.buildFormForm.activityId.value;	 
	var hiddenField = document.createElement("input");               
	hiddenField.setAttribute("name", "activityId");
	hiddenField.setAttribute("value", activityId);
	hiddenField.setAttribute("type", "hidden");
	form.appendChild(hiddenField);	
	window.top.document.body.appendChild(form);
	 
	var hiddenField2 = document.createElement("input");
	hiddenField2.setAttribute("name", "hhsosSessionKey");
	hiddenField2.setAttribute("value", $('hhsosSessionKey').value);
	hiddenField2.setAttribute("type", "hidden");
	form.appendChild(hiddenField2);	
	window.top.document.body.appendChild(form);
	
	form.submit();
	validating = false;
	window.top.document.body.removeChild(form);
}

function openSources( fieldName, linkId, trackingTitle ) {

	var link = $(linkId);
	var choices = $('choices_' + fieldName);

	if ( choices != null ) {

		var choicesItems = choices.select('li');
		var isFreezable = (fieldName == 'Orders21' || fieldName == 'Goals22' || fieldName == 'MedicationsPOC10' || fieldName == 'POCLocator26');

		if ( trackingTitle || isFreezable || choicesItems.length >= 1 ) {

			// multiple choice or freezable, ask the user with a custom popup

			sourceWindow = new Window('sourceWindow', {
				title: ( trackingTitle || 'Source Forms' ),
				className: 'alphacube', showEffectOptions: { duration: 1.5 },
				parent: document.buildFormForm,
				top: 0, left: 0, width: 600, height: 50,
				opacity: trackingTitle ? 1.0 : 0.85,
				onClose: closeSourceWindow
			});
			sourceWindow.setDestroyOnClose();

			sourceWindow.setContent( choices );

			sourceWindow.show();

			if (isFreezable) {
				$(fieldName + 'SourceLinks').show();
				$(fieldName + "UpdateLink").show();
				$(fieldName + "UpdateSection").hide();
			}

			// update the width and height based on content
			sourceWindow.updateSize();

			// position the window to the left and a little under the source link
			var linkLoc = link.cumulativeOffset();
			var winSize = sourceWindow.getSize();
			sourceWindow.setLocation(linkLoc[1] + 25, linkLoc[0] - winSize.width - 25);

			// now adjust the position so we don't go off the page
			sourceWindow.updatePosition();

			// when we show the source choice window, show the white overlay
			$('overlay').show();

			return;
		}
	}

	alert('There are no forms populating this section.');
}

function closeSourceWindow() {
	// when we manually close the source choice window, remove the white overlay
	if (!dontHideOverlay) $('overlay').hide();
}

function showUpdateSection(fieldName) {
	if(fieldName == 'POCLocator26') {
		$('POCLocator26StaticText').innerHTML = $('value(' + fieldName + ')').value;
	} else {
		$(fieldName + 'Text').value = $('value(' + fieldName + ')').value;
	}
	
	$(fieldName + 'SourceLinks').hide();
	$(fieldName + 'UpdateLink').hide();
	$(fieldName + 'UpdateSection').show();
	sourceWindow.setTitle('Edit ' + (fieldName == 'Orders21' ? 'Orders' : fieldName == 'Goals22' ? 'Goals' : fieldName == 'POCLocator26' ? 'Locator 26' : 'Medications'));

	// update the width and height based on content
	sourceWindow.updateSize();

	// adjust the window if it went overboard
	sourceWindow.updatePosition();
	// If Internet Explorer, return version number and it resolve ie non editable issue on iframe load
    if (isModalView && (window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))) {
        $(fieldName + 'Text').focus();
    }
}

function updateFields(fieldWrapper, freezingFieldName, isFrozen, isResourceItem) {
	var fieldNames = [];
	var hiddenFieldNames = [];
	var fields = fieldWrapper.select('input[name], textarea[name], select[name]');
	
	for (var i=0; i<fields.length; i++) {
		var match = fields[i].name.match(/^(value|hiddenField)\((.*)\)$/);
		if (match) {
			(match[1] == 'value' ? fieldNames : hiddenFieldNames).push( match[2] );
		}
	}
	
	var fieldName, fieldDisplayName;
	
	if (freezingFieldName) {
		isFrozen = isFrozen || frozenFields[freezingFieldName];
		fieldNames.push( freezingFieldName );
		
		fieldName = fieldNames[0];
		fieldDisplayName = (fieldName == 'Orders21' ? 'Orders' : fieldName == 'Goals22' ? 'Goals' : fieldName == 'POCLocator26' ? 'Locator 26' : 'Medications');
		
		var confirmMessage = (fieldName == 'POCLocator26' ? 'Are you sure you want to make this change?' 
				: 'Are you sure you want to freeze the ' + fieldDisplayName + ' section?\n\nNote: If you click \'OK\' this section will no longer reflect changes made directly to the source forms.');
		
		if (!isFrozen && !confirm(confirmMessage)) {
			return;
		}
		frozenFields[fieldName] = true;
		
		if(fieldName == 'POCLocator26') {
			var selectedFieldValue = $$('input:checked[type=radio][name=' + fieldName + 'Radio]')[0].value;
			$('value(' + fieldName + ')').value = selectedFieldValue;
			$('POCLocator26StaticText').innerHTML = selectedFieldValue;
		} else {
			$('value(' + fieldName + ')').value = $(fieldName + 'Text').value;
		}
	}
	
	dontHideOverlay = true;
	sourceWindow.close();
	dontHideOverlay = false;
	
	fields = [
		document.buildFormForm.activityId,
		document.buildFormForm.patientId,
		document.buildFormForm.formVersionId,
		document.buildFormForm.lastModificationId,
		document.buildFormForm.lastTileFieldModificationId,
		document.getElementsByName('hhsosTokenKey')[0]
	];
	if (isResourceItem) {
	    fields.push(document.querySelector('input[name="pageNum"]'));
	}
	for (var i=0; i<fieldNames.length; i++) {
	    fields.push( validateFieldElement(document.buildFormForm['value(' + fieldNames[i] + ')'] ));
	}
	for (var i=0; i<hiddenFieldNames.length; i++) {
	    if(isResourceItem) {
            if(hiddenFieldNames[i].indexOf('resourceItem') === 0) {
                document.buildFormForm['hiddenField(' + hiddenFieldNames[i] + ')'].value = "true";
            }
        }
        fields.push( validateFieldElement(document.buildFormForm['hiddenField(' + hiddenFieldNames[i] + ')'] ));
	}

	var callback = function() {
		$('overlay').hide();
	};

	autosave( Form.serializeElements( fields, true ), callback );

	if (freezingFieldName && freezingFieldName != 'POCLocator26') {
		if (fieldDisplayName != 'Medications') {
			// redo the diffs
			var diffFunction = (fieldName == 'Orders21' ? odiff : gdiff );
			diffFunction();
			diffFunction();
		}
		
		// redo the link
		var diffLink = "<a href='#' onClick='" + (fieldDisplayName == 'Orders' ? 'odiff();' : fieldDisplayName == 'Goals' ? 'gdiff();' : 'mdiff();' ) + " return false;' title='Source data modified' style='text-decoration: none; color: red'>&ne;</a>";
		$((fieldDisplayName == 'Orders' ? 'ordersUpdate' : fieldDisplayName == 'Goals' ? 'goalsUpdate' : 'medsUpdate' )).innerHTML = diffLink;
		
		// don't allow going to the source forms
		$(fieldName + 'SourceLinks').down().hide();
		$(fieldName + 'OrText').hide();
	}
}

function validateFieldElement(fields) {
    var selectedRadioValue = fields;
    if (fields && (isRadioList(fields)) && fields.length != 0) {
        var radioButtonElement = fields[0];
        if (radioButtonElement && radioButtonElement.type === 'radio') {
            for (var radioBtnIdx = 0;radioBtnIdx < fields.length; radioBtnIdx++) {
                if (fields[radioBtnIdx] && fields[radioBtnIdx].checked === true) {
                    selectedRadioValue = fields[radioBtnIdx];
                    break;
                }
            }
            // For clear(hack: if the fields are cleared out, the `fields` has some RadioNodeList value
            if (isRadioList(selectedRadioValue)) {
                selectedRadioValue = fields[0];
            }
        }
        // For clear(hack: if the hidden fields are cleared out, the `fields` has some RadioNodeList value
        if (radioButtonElement && radioButtonElement.type === 'hidden') {
            if (isRadioList(selectedRadioValue)) {
                selectedRadioValue = fields[0];
            }
        }
    }
    return selectedRadioValue;
}

function isRadioList(field) {
    if (isIE()) {
       return (field instanceof HTMLCollection);
    } else {
        return (field instanceof RadioNodeList);
    }
}

function clearList(results, list, field) {
	$(list).select('input,textarea,select').each( function(e) {
		if (e.tagName == 'INPUT' && e.type == 'checkbox' && e.checked) {
			e.checked = false;
		} // TODO: others?
	});
	field = document.forms[0]['value(' + field + ')'];
	if (field) field.value = ' (none) ';
	$(results).innerHTML = ' (none) ';
	$(results).style.fontStyle = 'italic';
}

function updateList(results, list, field) {
	var result = '';
	var fontStyle = '';
	$(list).select('input,textarea,select').each( function(e) {
		if (e.tagName == 'INPUT' && e.type == 'checkbox' && e.checked) {
			if (result.length > 0) result += ', ';
			result += e.next().innerHTML;
		} // TODO: others?
	});
	if (result == '') {
		result = ' (none) ';
		fontStyle = 'italic';
	}
	field = document.forms[0]['value(' + field + ')'];
	if (field) field.value = result;
	$(results).innerHTML = result;
	$(results).style.fontStyle = fontStyle;
}

// shows the M question details for the given M question
function showMDetails(mQuestion, link) {
	showDetails(mQuestion, link, 'mDetails');
}

function showHISDetails(hisQuestion, link) {
    showDetails(hisQuestion, link, 'hisdetails');
}

function showDetails(question, link, action) {
    if ( mDetailsWindow != null ) {
        mDetailsWindow.close();
    }
    var linkLoc = $(link).cumulativeOffset();
    var targetUrl = 'ajax.action?actionToPerform=' + action + '&mQuestion=' + question +'&oasisVersion=' + oasisVersion +'&hhsosSessionKey='+ $('hhsosSessionKey').value;
    
    mDetailsWindow = new Window('mDetailsWindow', {
        url: targetUrl,
        title: 'Details',
        top:linkLoc[1]-50, left:linkLoc[0]+100,width:800, height:200,
        className: aTheme, showEffectOptions: {duration:1.5},
        onClose: function() {
        },
        onload: function() {
            mDetailsWindow.updateSize();
        }
    });
    mDetailsWindow.setDestroyOnClose();
    mDetailsWindow.show();
}

function lookupICD9(elemId) {
    lookupCode(elemId, '2.16.840.1.113883.6.103');
}

function lookupICD10(elemId) {
    lookupCode(elemId, '2.16.840.1.113883.6.90');
}

function lookupCode(elemId, codeSystem) {
    var code = '';
    if(isReadOnly) {
        var elemValue = $(elemId).textContent || $(elemId).innerText;
        code = elemValue.trim();
    } else {
        code = $(elemId).value;
    }
    // See http://www.nlm.nih.gov/medlineplus/connect/service.html for usage
    var url = 'https://apps.nlm.nih.gov/medlineplus/services/mpconnect.cfm?mainSearchCriteria.v.cs=' + codeSystem + '&mainSearchCriteria.v.c=' + code;
    window.open(url);
}

function displayInternalInfo() {
	if (sourceWindow) {
		sourceWindow.close();
	}
	var activityId = document.buildFormForm.activityId.value;
	sourceWindow = new Window('internalInfoWindow', {
		title: ('Internal Form Information' + (activityId > 0 ? ' (activityId=' + activityId + ')' : '') ),
		className: 'alphacube', showEffectOptions: { duration: 1.5 },
		parent: document.buildFormForm,
		top: 250, left: 250, height: 50, width: 500,
		onClose: closeSourceWindow
	});
	sourceWindow.setDestroyOnClose();
	sourceWindow.setContent( $('internalInfo') );
	sourceWindow.show();
	
	// update the width and height based on content
	sourceWindow.updateSize();
	
	// now adjust the position so we don't go off the page
	sourceWindow.updatePosition();
}

function openLastModificationDialog(showDateDifference, lastModification) {
	showingLastModification = true;

	var lastModificationBody = $('lastModification');
	
	if (lastModification) {
		lastModificationBody.down('.dateDifference').innerHTML = lastModification.dateDifference;
		lastModificationBody.down('.date').innerHTML = lastModification.date;
		lastModificationBody.down('.modifiedObject').innerHTML = lastModification.modifiedObject;
		if (lastModification.isCurrentUser) {
			lastModificationBody.down('.you').show();
			lastModificationBody.down('.userDisplayName').hide().innerHTML = lastModification.userDisplayName;
		} else {
			lastModificationBody.down('.you').hide();
			lastModificationBody.down('.userDisplayName').show().innerHTML = lastModification.userDisplayName;
		}
	}
	lastModificationBody.down('.dateDifference')[showDateDifference ? 'show' : 'hide']();
	lastModificationBody.down('.dateDivider')[showDateDifference ? 'show' : 'hide']();
	
	Dialog.confirm(
		lastModificationBody.innerHTML, {
			className: 'alphacube',
			width: 400,
			title: 'Saving Conflict',
			okLabel: 'Reload',
			cancelLabel: 'Cancel',
			onOk:function(win){
				document.buildFormForm.nextPageNum.value = document.buildFormForm.pageNum.value;
				document.buildFormForm.actionToPerform.value = '';
				document.buildFormForm.submit();
			},
			onCancel: function() {
				showingLastModification = false;
				saveCanceled();
				return true;
			}
		}
	);
}

function openLibrary(actionName, parameterName, fieldId) {
	window.open( actionName + '?hhsosSessionKey=' + $('hhsosSessionKey').value + '&' + parameterName + '=' + $(fieldId).value );
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
    	return false;

    return true;
}

function toggleDefaultText(elementId, showAuto, override) {
	if(!showAuto) {
		return false;
	}
	else if(!override) {
		return false;
	}
	var element = document.getElementById(elementId);
	if(element.value == '') {
		element.value = '(Auto)';
		element.style.color = 'gray';
	}
	else if(element.value== '(Auto)') {
		element.value = '';
		element.style.color = 'black';
	}
	else if(element.value.length > 0 ){
		element.style.color = 'black';
	}
}

function submitForm() {
	var actionToPerform;
	// if POC, just reload the page: do not save
	if (isPoc) {
		document.buildFormForm.actionToPerform.value = '';
		actionToPerform = '';
	} else {
		actionToPerform = 'next';
	}
	
	submitPage('buildForm.action', actionToPerform, document.buildFormForm.pageNum.value);
}

function toggleHiddenFields() {
	showHiddenFields = !showHiddenFields;
	if (showHiddenFields) {
		$$('input[type="hidden"]').findAll(function(e) {
			return e.name.match(/^value(.+)$/);
		}).each(function(e){
			e.type = 'text';
			e.style.backgroundColor = 'yellow';
			e.addClassName('should-be-hidden');
		});
	} else {
		$$('input.should-be-hidden').each(function(e){
			e.type = 'hidden';
			e.style.backgroundColor = '';
			e.removeClassName('should-be-hidden');
		});
	}
}

function toggleFieldNames() {
	showFieldNames = !showFieldNames;
	if (showFieldNames) {
		$$('input[type="text"],textarea').findAll(function(e) {
			return e.name.match(/^value\((.+)\)$/);
		}).each( function(e) {
			if (!e.readOnly && !e.disabled && e.name != 'value(VisitDate)') {
				e.value = e.name.substring('value('.length, e.name.length - 1);
			}
		});
		
		$$('input[type="checkbox"],input[type="radio"],select').findAll(function(e) {
			return e.name.match(/^value\((.+)\)$/);
		}).each( function(e) {
			var name = e.name.match(/^value\((.+)\)$/)[1];
			e.parentNode.style.position = 'relative';
			e.insert({ after: '<div class="fieldNameInfo">' + name + '</div>' });
		});
	} else {
		$$('input[type="text"],textarea').findAll(function(e) {
			return e.name.match(/^value\((.+)\)$/);
		}).each( function(e) {
			if (!e.readOnly && !e.disabled && e.name != 'value(VisitDate)') {
				e.value = '';
			}
		});
		
		$$('.fieldNameInfo').each( function(e) {
			e.remove();
		});
	}
}

function toggleFillAllFields() {
	fillFieldNames = !fillFieldNames;
	if (fillFieldNames) {
		// fill texts and textareas
		$$('input[type="text"],textarea').findAll(function(e) {
			return e.name.match(/^value\((.+)\)$/);
		}).each( function(e) {
			if (!e.readOnly && !e.disabled && e.name != 'value(VisitDate)' && e.name.indexOf('value(') === 0) {
				e.value = e.name.substring('value('.length, e.name.length - 1);
			}
		});
		
		// fill checkboxes and radios
		$$('input[type="checkbox"],input[type="radio"]').findAll(function(e) {
			return e.name.match(/^value\((.+)\)$/);
		}).each( function(e) {
			if (!e.disabled && e.name.indexOf('value(') === 0) {
				e.checked = true;
			}
		});
		
		// fill selects
		$$('select').findAll(function(e) {
			return e.name.match(/^value\((.+)\)$/);
		}).each( function(e) {
			if (!e.disabled && e.name.indexOf('value(') === 0 && e.options.length > 1) {
				e.selectedIndex = 1;
			}
		});
	} else {
		// clear texts and textareas
		$$('input[type="text"],textarea').findAll(function(e) {
			return e.name.match(/^value\((.+)\)$/);
		}).each( function(e) {
			if (!e.readOnly && !e.disabled && e.name != 'value(VisitDate)' && e.name.indexOf('value(') === 0) {
				e.value = '';
			}
		});
		
		// uncheck checkboxes and radios
		$$('input[type="checkbox"],input[type="radio"]').findAll(function(e) {
			return e.name.match(/^value\((.+)\)$/);
		}).each( function(e) {
			if (!e.disabled && e.name.indexOf('value(') === 0) {
				e.checked = false;
			}
		});
		
		// clear selects
		$$('select').findAll(function(e) {
			return e.name.match(/^value\((.+)\)$/);
		}).each( function(e) {
			if (!e.disabled && e.name.indexOf('value(') === 0 && e.options.length > 1) {
				e.selectedIndex = 0;
			}
		});
	}
}


function listFieldNames() {
	listNames = !listNames;
	var fieldNameHTML = '';
	var typeNameHTML = '';
	//temp variable to avoid duplicates with radio buttons
	var lastRadioField = '';
	
	if(listNames) 
	{
		fieldNameHTML += '<span class="boldText">Field Name:</span><br /><br />';
		typeNameHTML += '<span class="boldText">Field Type:</span><br /><br />';
		
		// fill texts and textareas
		$$('input[type="text"],textarea,input[type="checkbox"],input[type="radio"],select').findAll(function(e) {
			return e.name.match(/^value\((.+)\)$/);
		}).each( function(e) {
			if (!e.readOnly && !e.disabled && e.name != 'value(VisitDate)' && e.name.indexOf('value(') === 0) {
				var fieldName = e.name.substring('value('.length, e.name.length - 1);
				//if the field is a radio field
				if( e.type == 'radio') {
					//if the field name matches lastRadioField (starts empty), add it to string
					if(fieldName != lastRadioField)
					{
						fieldNameHTML += fieldName + '<br />';
						typeNameHTML += e.type + '<br />';
					}
					//set lastRadioField temp variable to the current radio field name
					lastRadioField = fieldName;
				}
				else {
					fieldNameHTML += fieldName + '<br />';
					typeNameHTML += e.type + '<br />';
				}
			}
		});
	}
	$$('.fieldList')[0].innerHTML= fieldNameHTML;
	$$('.typeList')[0].innerHTML= typeNameHTML;
	sourceWindow.setSize(0,0);
	sourceWindow.updateSize();
}



function generateMasterFields() {
	showMasterFieldsXML = !showMasterFieldsXML;
	var masterFieldsXML = '';
	//temp variable to avoid duplicates with radio buttons
	var lastRadioField = '';
	
	if(showMasterFieldsXML) 
	{
		var masterFieldsXML = '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\n'
						+ '<hhsos version=\'' + releaseName + '\' uuid=\'bac000e8-e309-4926-83e9-8126f21497a3\'>\n'
						+ '  <masterForms>\n'
						+ '    <masterForm masterForm=\'' + formName + '\' slaveForm=\'' + formName + '\' priority=\'1\' isPoc=\'false\'>\n';
						
		// fill texts and textareas
		$$('input[type="text"],textarea,input[type="checkbox"],input[type="radio"],select').findAll(function(e) {
			return e.name.match(/^value\((.+)\)$/);
		}).each( function(e) {
			if (!e.readOnly && !e.disabled && e.name != 'value(VisitDate)' && e.name.indexOf('value(') === 0) {
				var fieldName = e.name.substring('value('.length, e.name.length - 1);
				//if the field is a radio field
				if( e.type == 'radio') {
					//if the field name matches lastRadioField (starts empty), add it to string
					if(fieldName != lastRadioField)
					{
						masterFieldsXML += '      <masterFormField masterFieldName=\''
						+ fieldName + '\' slaveFieldName=\''
						+ fieldName + '\' isEditable=\'true\'/>\n';
					}
					//set lastRadioField temp variable to the current radio field name
					lastRadioField = fieldName;
				}
				else {
					masterFieldsXML += '      <masterFormField masterFieldName=\''
					+ fieldName + '\' slaveFieldName=\''
					+ fieldName + '\' isEditable=\'true\'/>\n';
				}
			}
		});
		
		masterFieldsXML += '    </masterForm>\n  </masterForms>\n</hhsos>';
	}
	

	$$('.masterFields')[0].innerHTML= escapeHtml(masterFieldsXML);
	sourceWindow.setSize(0,0);
	sourceWindow.updateSize();
}

function loadInlineReport(reportName, maxResults) {
    var patientIdStr = document.buildFormForm.patientId.value;
    var chartIdStr = document.buildFormForm.chartId.value;
    
    if(!patientIdStr || !chartIdStr) {
        alert("Please save the form before Viewing Historical Data.");
        return;
    }
    
    if(inlineReportWindow) {
        // If this report is already open, do nothing
        if(activeInlineReportName == reportName) {
            return;
        } else {
            inlineReportWindow.close();
        }
    }
    
    var params = { 
            actionToPerform: 'inline',
            reportName: reportName,
            selectedPatientId: patientIdStr,
            selectedChartId: chartIdStr,
            start: "0",
            maxResults: maxResults ? maxResults : "5",
            startDate: "All",
            endDate: "All",
            reportName: reportName,
            order: "visitDate",
            desc: "1",
            hhsosSessionKey:  $('hhsosSessionKey').value
        };
    
    // NOTE: Scrolling is not working for Apple mobile devices(ipad, iphone etc.)
    var appleMobileDevice = /\blike Mac OS X\b/.test(window.navigator.userAgent);

    new Ajax.Request('runReport.action', {
        parameters: params,
        method: 'post',
        onSuccess: function(transport) {
            // Display inline report result
            inlineReportWindow = new Window("inlineReportWin", {
                    title: reportName, 
                    top: 0,
                    left: 0,
                    width: 800,
                    height: 0,
                    ignoreScrollSize: appleMobileDevice,
                    className: aTheme,
                	showEffectOptions: { duration:1.5 },
                	onClose: function() {
                    	activeInlineReportName = null;
                	}
            });

            inlineReportWindow.setHTMLContent(transport.responseText);
            inlineReportWindow.setDestroyOnClose();
            inlineReportWindow.show();
            
            inlineReportWindow.updateSize();
            inlineReportWindow.updatePosition();
        },
        onFailure: function(transport) {
            var errorMessage = transport.transport.getResponseHeader("Error-Message");
            if (errorMessage) {
                alert(errorMessage);
            } else {
                $('overlay').hide();
                var errCode = transport.status + ':' + '20001';
                logUIErrorAudits('Failure - runReport.action - inline, Status Code: ' + errCode);
                alert("Failed to contact server. Please try again or contact support.\nErrCode: " + errCode);
            }
        },
        onException: function(requester, ex) {
            alert('An unexpected error occurred: ' + ex);
        }
    });
    
    activeInlineReportName = reportName;
 }

function showCompanyName(logoImage, companyName) {
    // hide the image
    logoImage.style.display = 'none';

    // show the company name in text
    var elem = document.getElementById(companyName);
    elem.style.display = 'block';
}

function checkAuthorizationOnChange(element) {
    if(checkAuthorizedOnSave != '') {
        var visitDate = document.getElementsByName('value(VisitDate)')[0].value;
        var patientId = document.buildFormForm.patientId.value;
        var billingCode = document.getElementsByName('value(BillingCode)')[0];
        if(billingCode && billingCode.type != 'hidden') {
            billingCode = billingCode[billingCode.selectedIndex].value;
        } else {
            billingCode = null;
        }
        var activityId = document.buildFormForm.activityId.value;

        var ownerId = document.getElementsByName('ownerId');
        if(ownerId) {
            ownerId = ownerId[0];
            if(ownerId) {
                ownerId = ownerId.value;
            } else {
                ownerId = null;
            }
        }

        var parameters = {
            actionToPerform: 'checkAuthorization',
            hhsosSessionKey: $('hhsosSessionKey').value,
            visitDate: visitDate,
            checkBillingCode: billingCode,
            patientId: patientId,
            activityId: activityId,
            ownerId: ownerId
        };

        new Ajax.Request('createAuthorization.action', {
            method: 'post',
            parameters: parameters,
            requestHeaders: { Accept: 'application/json' },
            onSuccess: function(transport) {
                var result = transport.responseJSON || {};
                var authStatus = result['authStatus'];

                if(authStatus == 'Authorized') {
                    $('visitAuthorizedText').show();
                    $('visitNotAuthorizedText').hide();
                    visitAuthStatus = authStatus;
                } else if(authStatus == 'NotAuthorized' || authStatus == 'OverAuthorized') {
                    $('visitAuthorizedText').hide();
                    $('visitNotAuthorizedText').show();
                    visitAuthStatus = authStatus;
                } else if(authStatus == 'NotBillable') {
                    $('visitAuthorizedText').hide();
                    $('visitNotAuthorizedText').hide();
                    // Set this to true to avoid warning popups
                    visitAuthStatus = authStatus;
                }
                if(authCheckCallBack != null) {
                    authCheckCallBack();
                    authCheckCallBack = null;
                }
            },
            onException: function(requester, ex) {
                setMessage('Internal error, failed to check if this visit is authorized.');
                alert(ex.message);
                authCheckCallBack = null;
                visitAuthStatus = null;
            },
            onFailure: function(transport) {
                var errorMessage = transport.transport.getResponseHeader("Error-Message");
                if (errorMessage) {
                    setMessage(errorMessage);
                } else {
                    setMessage('Could not contact the server while checking authorization status. Please check your connection and try again.');
                }
                authCheckCallBack = null;
                visitAuthStatus = null;
            }
        });
    }
}

function validateOasis(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt, oasisValidationType, callback) {
    var parameters = { 
            hhsosSessionKey:  $('hhsosSessionKey').value,
            activityId: document.buildFormForm.activityId.value,
            nextStatus: nextStatus,
            actionToPerform: 'validationOnSubmit'
        };
    
    new Ajax.Request('validateOasis.action', {
        parameters: parameters,
        method: 'post',
        onSuccess: function(transport) {
            var response = transport.responseJSON || {};
            
            var numOfErrors = response.errors.length;
            if (numOfErrors > 0) {
                var oasisVersion = response.oasisVersion;
                var oasisValidation = response.oasisValidation;
                var hospiceValidation = response.hospiceValidation;
                
                var resultTypeLabel = oasisValidation == 'hhg' ? 'Edit' : 'Error';
                resultTypeLabel = numOfErrors > 1 ? resultTypeLabel + 's' : resultTypeLabel;
                
                var content = '<div style=\"margin-left: 20px; text-align: left\">';
                content += '<div><b>' + numOfErrors + '</b> ' + resultTypeLabel + ' Found</div>';
                if(oasisVersion && oasisVersion.indexOf('HOSPICE') >= 0) {
                    if(hospiceValidation == 'devero') {
                        content += '<div>Assessment Analysis powered by Netsmart</div>';
                    }
                } else if(oasisValidation == 'hhg') {
                    content += '<div> Assessment Analysis powered by Home Health Gold</div>';
                }	
                
                content += '<div style=\"margin-top: 10px;\"><b>' + resultTypeLabel + ':</b></div>';
                for(var i = 0; i < numOfErrors; i++) {
                    content += '<div style=\"white-space: pre-wrap;\">' + ((i + 1) + '. ' + response.errors[i] + '</div>');
                } 
                content +='</div>';
                
                var title = oasisValidationType == 'warn' ? 'Warning' :  'Error';
                
                var okButtonLabel = "Ok";
                if(oasisValidationType == 'warn') {
                    okButtonLabel = nextStatus == 'Completed' ? 'Complete' : 'Send To Office';
                }
                
                var dialogParameters = {
                        title : title,
                        top: 30,
                        left: 100,
                        width: 800,
                        height: 300,
                        className: aTheme,
                        showEffectOptions: { duration:1.5 },
                        recenterAuto: true,
                        draggable: true,
                        okLabel : okButtonLabel,
                        cancelLabel : 'Cancel',
                        onBeforeShow: function() {
                        },
                        onOk : function() {
                            if(oasisValidationType == 'warn') {
                                callback(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt, oasisValidationType);
                            } 
                            return true;
                        },
                        onCancel : function() {
                            return true;
                        }
                    };
                    
                    if(oasisValidationType == 'require') {
                        Dialog.alert(content, dialogParameters);
                    } else {
                        Dialog.confirm(content, dialogParameters);
                    }
            } else {
                callback(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt, oasisValidationType);
            }
            
        },
        onFailure: function(transport) {
            var errorMessage = transport.transport.getResponseHeader("Error-Message");
            if (errorMessage) {
                setMessage(errorMessage);
            } else {
                var errCode = transport.status + ':' + '30001';
                logUIErrorAudits('Failure - validateOasis.action - validationOnSubmit, Status Code: ' + errCode);
                setMessage("Failed to contact server. Please try again or contact support.\nErrCode: " + errCode);
            }
        },
        onException: function(requester, ex) {
            setMessage('An unexpected error occurred: ' + ex);
        }
    });
}

function validateOasisAndSubmitPage(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt, oasisValidationType) {
    validateOasis(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt, oasisValidationType, function() {
            submitPage(action, actionToPerform, nextPageNum, currentStatus, nextStatus, alertMsg, signatureLocation, evt);
    });
}

function openLoadDocumentNewTab(hhsosSessionKey, documentId) {
    var loadDocumentUri = 'loadDocument.action?hhsosSessionKey=' + hhsosSessionKey + '&documentId=' + documentId;
    window.top.open(loadDocumentUri);
}

function getInfoDetail(infoType, info) {
    var content = '<div style="text-align: left;">'
        + '<p>The following ' + infoType + 's were found:<\/p>'
        + '<ul>';			    
    for(var j = 0; j < info.length; j++) {
        content += '<li>' + info[j] + '<\/li>';
    }
    content += '<\/ul>';
    content += '<\/div>';
    return content;
}

function initiateMessageListener(pocWindowObj) {
    return new EventListener('message', function(event) {
        var dialogOptions = {
                width: 400,
                className: 'alphacube',
                okLabel : 'OK',
                onOk: event.data.onOK || function() { return true; }
            },
            data = '',
            openDialog = Dialog.alert.bind(Dialog);
        if (event.data.errors && event.data.errors.length > 0) {
            dialogOptions.title = 'Error';
            data += getInfoDetail('error', event.data.errors);
        }

        if(event.data.warnings && event.data.warnings.length > 0) {
            dialogOptions.title = 'Warning';
            data += getInfoDetail('warning', event.data.warnings);
            if (event.data.errors.length === 0) {
                data += '<p style="text-align:left;">Do you want to continue?<\/p>';
                dialogOptions.cancelLabel = 'Cancel';
                dialogOptions.onCancel = function() { return true; };
                dialogOptions.onOk = function() {
                    pocWindowObj.postMessage('insert-into-form', getURLOrigin());
                    return true;
                }
                openDialog = Dialog.confirm.bind(Dialog);
            }
        }

        if (event.data.errors && event.data.errors.length > 0 && 
            event.data.warnings && event.data.warnings.length > 0) {
            dialogOptions.title = 'Error';
        }
        
        openDialog(data, dialogOptions);
    });
}

function openPOCPopup(sectionNames, activeSection, includeType) {
  var activityId = document.querySelector('input[name="activityId"]').value;
  if (document.buildFormForm && document.buildFormForm.activityId && document.buildFormForm.activityId.value <= 0) {
      autosave(null, function(error) {
          if (!error) {
              openPOCPopup(sectionNames, activeSection, includeType);
          } else {
              showSaveFailurePopup(error);
          }
      });
      return;
  }   
  if(window.parent && window.parent.angular) {
      var injector = window.parent.angular.element(window.parent.document.body).injector(),
          FormFrameService = injector.get('FormFrameService'),
          SystemService = injector.get('SystemService'),
          chartId = document.querySelector('input[name="chartId"]').value;

      SystemService.setSelectedChart(chartId);
      FormFrameService.redirectFromJSP('home.form-frame.popup.poc', {
        'internalSectionNames': sectionNames,
        'activeSection': activeSection,
        'isPopup': true,
        'includeType' : includeType,
        'activityId' : activityId,
        'includeM1025' : includeM1025,
        'isHospiceDiagnosis' : isHospiceDiagnosis
      });
  } else {
      var chartId = document.querySelector('input[name="chartId"]').value;
      var patientId = document.querySelector('input[name="patientId"]').value;
      var isiPad = (/\(iPad.*os (\d+)[._](\d+)/i).test(navigator.userAgent) === true || navigator.platform.toLowerCase() === 'ipad';
      var isAndroid = (/\(*Android (\d+)[._](\d+)/i).test(navigator.userAgent);
      var locationLeft, locationTop, isWindowClosed = false, msgListenerPOC;
      pocWindow = new Window("pocWindow", {
          url: '/app-poc#/?internalSectionNames='+sectionNames+'&isPopup=true&activityId='+activityId+'&isVersion3_0=true&activeSection='+sectionNames+'&chartId='+chartId+'&includeType='+includeType+'&patientId='+patientId+'&hhsosSessionKey=' + document.getElementById('hhsosSessionKey').value +'&includeM1025=' + includeM1025,
          top: 0,
          left: 0,
          width: 'auto', 
          height: 'auto',
          zIndex: 25,
          maximizable: false,
          minimizable: false,
          resizable: false,
          className: aTheme, 
          showEffectOptions: {
              duration:1.5
          },
          onload: function() {
              pocWindow.maximize();
              pocWindow.updatePosition();
              pocWindow.show();
              this.focus();
              msgListenerPOC = initiateMessageListener(pocWindow.content.contentWindow);
              msgListenerPOC.createEventListener();
          },
          onClose: function() {
              isWindowClosed = true;
              msgListenerPOC.destroyEventListener();
              window.parent.document.forms[0].style.display = 'block';
              if (isiPad || isAndroid) {
                  removeOrientation();
              }
              window.scrollTo(locationLeft, locationTop);
              if (!isiPad || !isAndroid) {
                  $('overlay').hide();
              }
          },
          closableTemplate: (includeType === 'OASIS' ? function(className, id) {
              return "<div class='"+ className +"_close' id='"+ id +"_close' onclick='closePOCDialogBox(id, event);'> </div>";
          } : undefined)
      });
      locationLeft = window.pageXOffset || window.document.documentElement.scrollLeft || window.document.body.scrollLeft;
      locationTop = window.pageYOffset || window.document.documentElement.scrollTop || window.document.body.scrollTop;
      window.parent.document.forms[0].style.display = 'none';
      if (isiPad || isAndroid) {
          addOrientation(isiPad);
      }
      if (!isiPad || !isAndroid) {
          $('overlay').show();
      }
      pocWindow.setDestroyOnClose();

  }
}

function closePOCDialogBox(id, event) {
    var pocAngularPageWindow = pocWindow.content.contentWindow;
    if (pocAngularPageWindow && pocAngularPageWindow.angular && pocAngularPageWindow.$) {
        // Used to close POC popup, listening function is in CarePlanModuleController
        pocAngularPageWindow.$('#customCOPEditPopup').trigger('hide.bs.modal')
    }
}


/**
 *  Poc pop up - Add listener for device orientation change
 */
function addOrientation(isiPad) {
    window.addEventListener("orientationchange", function() {
        setTimeout(function(){
            pocWindow.setSize(window.innerWidth, window.innerHeight - 80);
            if (isiPad) {
                //window.orientation === 90 or -90 landscape mode
                pocWindow.setPocWindowOverflow(Math.abs(window.orientation) === 90);
            }
        }, 500);
    }, false);
}

/**
 *  Remove orientation change listener when poc popup is closed 
 */
function removeOrientation() {
    window.removeEventListener("orientationchange", function() {
    }, false);
}
  
function setPOCPopupTitle(title) {
    if(pocWindow){
        pocWindow.setTitle(title || '')
    } 
}

function closePOCPopup() {
    if(pocWindow){
        pocWindow.close();
    } 
}

function callFromPocPopup(sectionInternalName, sectionType, selectedRows, includeType, selectedModuleItems, sectionName, includeSummaryOfProblems, isPrimaryDiagnosis) {
    
    var isDynamicHospiceIncludeVersion = document.getElementById("isDynamicHospiceIncludeVersion");
    isDynamicHospiceIncludeVersion = null != isDynamicHospiceIncludeVersion ? isDynamicHospiceIncludeVersion.value : false;
    
    if(includeType === 'orders' || includeType === 'ORDERS_RELATED_CATEGORY'|| includeType === 'VISIT_NOTE_RELATED_CATEGORY') {
        //autosave will be triggered from 'OrdersCpSection.jsp'
        addorUpdatePOCSection(sectionInternalName, selectedRows, selectedModuleItems, sectionName, includeType, includeSummaryOfProblems, isPrimaryDiagnosis);
        return;
    }
    if(includeType === 'clear' && sectionType !== 'diagnosis'){
        selectedRows = "";
    }
    if(includeType === 'clear' && sectionType === 'diagnosis'){
        if(isDynamicHospiceIncludeVersion) {
            resetHospiceDiagnosisForm();
        } else {
            resetDiagnosisForm();
        }
    }
    if (includeType === 'CLEAR_RELATED_CATEGORY') {
        // Clears all sections for the specified related category.
        clearRelatedCategoryItems(sectionInternalName);
        clearModuleItemHistory(sectionInternalName, sectionType, isDynamicHospiceIncludeVersion, true);
    }
    if (includeType === 'clear') {
        clearModuleItemHistory(sectionInternalName, sectionType, isDynamicHospiceIncludeVersion, false);
    }
    switch (sectionType) {
        case 'diagnosis':
            if(!isDynamicHospiceIncludeVersion) {
                updateDiagnosisForm(selectedRows);
            } else {
                updateHospiceDiagnosisForm(selectedRows);
            }
            break;
        default:
            if (includeType === 'RELATED_CATEGORY' && Object.keys(selectedRows).length > 0) {
                Object.keys(selectedRows).forEach(function(key,index) {
                    if ($(sectionName + '-'+ key) && selectedRows[key][0] && selectedRows[key][0].text && selectedRows[key][0].ids) {
                        $(sectionName + '-'+ key).innerText = selectedRows[key][0].text;
                        document.querySelector('input[name="value(cp_'+sectionName+'_' + key + ')"]').value=(selectedRows[key][0].text);
                        document.querySelector('input[name="value(cp_'+sectionName+'_' + key +'_module_items)"]').value = selectedRows[key][0].ids;
                    }
                });
            } else if ((includeType === 'clear') || (selectedRows && selectedRows.length > 0)){
                $(sectionInternalName + '-poc-view-area').innerText = selectedRows;
                document.querySelector('input[name="value(cp_'+sectionInternalName+')"]').value=(selectedRows);
                document.querySelector('input[name="value(cp_'+sectionInternalName+'_module_items)"]').value = selectedModuleItems || '';
            }
            break;
    }
    if (includeType === 'CLEAR_RELATED_CATEGORY' || includeType === 'clear') {
        autoSaveInsertIntoForm();
    }
}

function clearRelatedCategoryItems(sectionName) {
    ['summary_of_problems', 'interventions', 'goals'].forEach(function(key) {
        if ($(sectionName + '-'+ key)) {
            $(sectionName + '-'+ key).update('');
            document.querySelector('input[name="value(cp_'+sectionName+'_' + key + ')"]').value = '';
            document.querySelector('input[name="value(cp_'+sectionName+'_' + key +'_module_items)"]').value = '';
        }
    });
}

function autoSaveInsertIntoForm() {
    unsavedChanges = true;
    autosave();
}

function clearModuleItemHistory(sectionInternalName, sectionType, isDynamicHospiceIncludeVersion, isRelatedCategory) {
    var activityId = document.querySelector('input[name="activityId"]').value;
    var isDynamicDiagnosis = false, diagnosisRows;
    if ((getSelectedModuleItemsFromForm(sectionInternalName) || (sectionType === 'diagnosis') || (isRelatedCategory))
            && activityId) {
        // The 'isDynamicIncludeVersion' field is available in StandardDiagnosisV2.jsp alone
        var isDynamicIncludeVersion = document.getElementById("isDynamicIncludeVersion");
        if ((null != isDynamicIncludeVersion && isDynamicIncludeVersion.value === "true") || isDynamicHospiceIncludeVersion) {
            isDynamicDiagnosis = true;
            diagnosisRows = document.getElementsByClassName("dxDiagnosisRow");
        }
        
        var values = {
            actionToPerform: 'clearModuleItemsHistory',
            sectionInternalName: sectionInternalName,
            activityId: activityId,
            isDynamicDiagnosis: isDynamicDiagnosis,
            isRelatedCategory: isRelatedCategory,
            formVersionId: document.buildFormForm.formVersionId.value,
            pageNum: document.buildFormForm.pageNum.value,
            hhsosSessionKey: $('hhsosSessionKey').value
        }

        if (isRelatedCategory) {
            values.relatedCategory = sectionType;
            
            // Flag to determine whether to clear all sections (i.e Summary of Problems,Interventions, Goals)
            // for the specific related category
            values.clearAllRelatedCategorySections = ['summary_of_problems', 'interventions', 'goals'].indexOf(sectionInternalName) === -1;
        }

        new Ajax.Request('carePlanModule.action', {
            parameters: values,
            method: 'post',
            onSuccess: function(result) { 
                console.log("module item history deleted successfully");
                if (isDynamicDiagnosis && diagnosisRows) {
                    deleteDynamicDiagnosisRows(diagnosisRows);
                }
            }, 
            onFailure: function(result) {
                console.error("Error occurred while deleting module item history");
            },
            onException: function(requester, ex) {
                console.error("Caught Exception\n" + ex.message);
            }
        });
    }
}

function deleteDynamicDiagnosisRows(diagnosisRows) {
    for (var i = diagnosisRows.length; i > 6; i--) {
        document.getElementById("diagnosis-grid").deleteRow((i + 3) - 1);
    }
}

function getSelectedModuleItemsFromForm(sectionInternalName, isRelatedCategory, categoryName){
    var section = document.querySelector('input[name="value(cp_'+sectionInternalName+'_module_items)"]');
    if (isRelatedCategory) {
        var itemIds = [];
        ['summary_of_problems', 'interventions', 'goals'].forEach(function(key) {
            var sec = document.querySelector('input[name="value(cp_'+categoryName+'_' + key +'_module_items)"]');
            if (sec && sec.value) {
                itemIds.push(sec.value);
            }
        } );
        return itemIds.toString();
    } else if (section) { 
        return section.value || '';
    } else {
        return null;
    }
}

function addDiagnosis(indexChar, index) {
    // get the allergy rows and the allergy row template
    var table = document.getElementById("diagnosis-grid");

    var tableIndex = 3 + index;
    var row = table.insertRow(tableIndex);
    row.className = "dxDiagnosisRow";

    var cell1 = row.insertCell(0);
    cell1.align = "left";

    var cell2 = row.insertCell(1);
    cell2.align = "center";

    cell1.innerHTML = '<span class="m00Value">' + indexChar + '.</span>' +
        ' <input type="text" name="value(M1021' + indexChar + ')" maxlength="30000" size="15" value="" class="text-field readonly" readonly="">' +
        '<input type="text" name="value(M1021' + indexChar + 'Date)" maxlength="30000" size="10" value="" onblur="validateDate(this)" class="text-field readonly" readonly="">' +
        '<img src="images/cal_thumb_up.gif" class="datePicker" title="Click to open calendar." alt="" onclick="showCalendar($(this).previous())">' +
        '<select name="value(M1021' + indexChar + 'OE)" disabled="">' +
        '<option value="0" selected="selected">(Select)</option>' +
        '<option value="1">O</option>' +
        '<option value="2">E</option>' +
        '</select>' +
        '<input type="hidden" name="value(M1021' + indexChar + 'OE)" value="0">' +
        '<input type="hidden" name="value(cpModuleItemId_M1021' + indexChar + ')" value="">';
    cell2.innerHTML = '<div style="width: 165px;">' +
        ' <div>' +
        ' <span class="m00Value">' + indexChar + '.</span>' +
        ' <span class="m00Value">(</span>' +
        ' <input type="text" name="value(M1023_OTH_DIAG' + index + '_ICD)" maxlength="30000" size="15" value="" id="M1023_OTH_DIAG' + index + '_ICD" class="text-field readonly" readonly="">' +
        ' <span class="m00Value">)</span>' +
        ' </div>' +
        ' <div style="clear: both"></div>' +
        ' </div>' +
        ' <input type="hidden" name="hiddenField(M1023_OTH_DIAG' + index + '_SEVERITY)" value="">' +
        ' <input type="hidden" name="hiddenField(M1023_OTH_DIAG' + index + '_SEVERITY)">' +
        ' <input type="radio" name="value(M1023_OTH_DIAG' + index + '_SEVERITY)" value="0" class="radio-field">' +
        ' <span class="m00Value">0</span>' +
        ' <input type="hidden" name="hiddenField(M1023_OTH_DIAG' + index + '_SEVERITY)">' +
        ' <input type="radio" name="value(M1023_OTH_DIAG' + index + '_SEVERITY)" value="1" class="radio-field">' +
        ' <span class="m00Value">1</span>' +
        ' <input type="hidden" name="hiddenField(M1023_OTH_DIAG' + index + '_SEVERITY)">' +
        ' <input type="radio" name="value(M1023_OTH_DIAG' + index + '_SEVERITY)" value="2" class="radio-field">' +
        ' <span class="m00Value">2</span>' +
        ' <input type="hidden" name="hiddenField(M1023_OTH_DIAG' + index + '_SEVERITY)">' +
        ' <input type="radio" name="value(M1023_OTH_DIAG' + index + '_SEVERITY)" value="3" class="radio-field">' +
        ' <span class="m00Value">3</span>' +
        ' <input type="hidden" name="hiddenField(M1023_OTH_DIAG' + index + '_SEVERITY)">' +
        ' <input type="radio" name="value(M1023_OTH_DIAG' + index + '_SEVERITY)" value="4" class="radio-field">' +
        ' <span class="m00Value">4</span>' +
        ' <span class="" style="display: inline-table;vertical-align: sub;">' +
        ' <a href="#" class="clearImg clearButton" onclick="clearSymptomControlRating(this, \'M1023_OTH_DIAG' + index + '_SEVERITY\'); return false;">Clear</a>' +
        ' </span>';
    return row;
}


function addHospiceDiagnosis(indexChar, index) {
    // get the allergy rows and the allergy row template
    var table = document.getElementById("diagnosis-grid");

    var tableIndex = 3 + index;
    var row = table.insertRow(tableIndex);
    row.className = "dxDiagnosisRow";

    var cell1 = row.insertCell(0);
    cell1.align = "left";

    var cell2 = row.insertCell(1);
    cell2.align = "center";
    
    var cell3 = row.insertCell(2);
    cell3.align = "center";
    
    var cell4 = row.insertCell(3);
    cell4.align = "center";

    cell1.innerHTML = '<span class="m00Value">' + indexChar + '.</span>' +
        ' <input type="text" name="value(M1021' + indexChar + ')" maxlength="30000" size="15" value="" class="text-field readonly" readonly="">';
    cell2.innerHTML = '<input type="text" name="value(M1021' + indexChar + 'Date)" maxlength="30000" size="10" value="" onblur="validateDate(this)" class="text-field readonly" readonly="">' +
    '<img src="images/cal_thumb_up.gif" class="datePicker" title="Click to open calendar." alt="" onclick="showCalendar($(this).previous())">' +
    '<input type="hidden" name="value(cpModuleItemId_M1021' + indexChar + ')" value="">';
    cell3.innerHTML = '<div style="width: 165px;">' +
        ' <div>' +
        ' <span class="m00Value">' + indexChar + '.</span>' +
        ' <span class="m00Value">(</span>' +
        ' <input type="text" name="value(M1023_OTH_DIAG' + index + '_ICD)" maxlength="30000" size="15" value="" id="M1023_OTH_DIAG' + index + '_ICD" class="text-field readonly" readonly="">' +
        ' <span class="m00Value">)</span>' +
        ' </div>';
        
    cell4.innerHTML = ' <div style="clear: both"></div>' +
        ' </div>' +
        ' <input type="hidden" name="value(M1023' + indexChar + '_TERMINAL_PROGNOSIS_RELATION)">' +
        ' <input type="radio" name="value(M1023' + indexChar + '_TERMINAL_PROGNOSIS_RELATION)" value="Yes" class="radio-field" disabled = "true">' +
        ' <span class="m00Value">Yes</span>' +
        ' <input type="radio" name="value(M1023' + indexChar + '_TERMINAL_PROGNOSIS_RELATION)" value="No" class="radio-field" disabled = "true">' +
        ' <span class="m00Value">No</span>';
    return row;
}

var alphabets = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];

function findCharByIndex(index) {
    if (Math.floor(index / 26) == 0) {
        return alphabets[index];
    } else {
        var firstCharIndex = Math.floor(index / 26) - 1;
        var lastCharIndex = index % 26;
        return alphabets[firstCharIndex] + alphabets[lastCharIndex];
    }
}

function updateDiagnosisForm(updatedPocRows) {

    var onsetOrExacerbationKeyValuePair = { 'O': 1, 'E': 2, 'H': 3 };
    var diagnosisRows = document.getElementsByClassName("dxDiagnosisRow");

    var isDynamicIncludeVersion = document.getElementById("isDynamicIncludeVersion");
    var isDynamicIncludeVersionValue = null != isDynamicIncludeVersion ? isDynamicIncludeVersion.value : "false";
    var diagnosisRowsCount = 0;
    if (isDynamicIncludeVersionValue === "true") {
        diagnosisRowsCount = updatedPocRows.length;
    } else {
        diagnosisRowsCount = diagnosisRows.length < updatedPocRows.length ?
                diagnosisRows.length : updatedPocRows.length;
    }
    for (var i=0; i < diagnosisRowsCount; i++) {
        var diagnosisRow = diagnosisRows[i];
        if ((isDynamicIncludeVersionValue === "true") && (i >= diagnosisRows.length)) {
            diagnosisRow = addDiagnosis(findCharByIndex(i), i);
        }
        var pocRow = updatedPocRows[i];
        if (pocRow) {
            var txtFields = diagnosisRow.querySelectorAll('input[type="text"]');
            txtFields[0].value = replaceUndefinedByEmptyString(pocRow.itemText);
            txtFields[1].value = pocRow.effectiveStartDate;
            txtFields[2].value = replaceUndefinedByEmptyString(pocRow.description);
            if(includeM1025 == 'true'){
                txtFields[3].value = replaceUndefinedByEmptyString(pocRow.m1025Column3Text);
                txtFields[4].value = replaceUndefinedByEmptyString(pocRow.m1025Column3Code);
                txtFields[5].value = replaceUndefinedByEmptyString(pocRow.m1025Column4Text);
                txtFields[6].value = replaceUndefinedByEmptyString(pocRow.m1025Column4Code);
            }
            var selField = diagnosisRow.querySelector('select');
            selField.value = pocRow.onsetOrExacerbation == '' ? 0 : onsetOrExacerbationKeyValuePair[pocRow.onsetOrExacerbation];
            var selHiddenField = diagnosisRows[i].querySelectorAll('input[type="hidden"]');
            selHiddenField[0].value = selField.value ;

            var radFields = diagnosisRow.querySelectorAll('input[type="radio"]');
            var severityRating = parseInt(pocRow.severityRating, 10);
            if (radFields && radFields[severityRating]) {
                radFields[severityRating].checked = true;
                radFields[severityRating].disabled = false;
                for (var radField = 0; radField < radFields.length; radField++) {
                    if(includeM1025 == 'false') {
                        radFields[radField].disabled = false;
                    } else {
                        if(radField != severityRating) {
                            radFields[radField].disabled = true;
                        }
                    }
                }
            } else {
                if (severityRating === -1) {
                    for (var j = 0; j < radFields.length; j++) {
                        radFields[j].checked = false;
                        if(includeM1025 == 'false') {
                            radFields[j].disabled = false;
                        } else {
                            radFields[j].disabled = true;
                        }
                    }
                }
            }
            selHiddenField[2].value = severityRating === -1 ? '' : severityRating;

            var hiddenFields = diagnosisRow.querySelectorAll('input[type="hidden"]');
            hiddenFields[1].value = replaceUndefinedByEmptyString(pocRow.cpModuleItemId);
            if(includeM1025 == 'true'){
                hiddenFields[8].value = replaceUndefinedByEmptyString(pocRow.m1025Column3ModuleId);
                hiddenFields[9].value = replaceUndefinedByEmptyString(pocRow.m1025Column4ModuleId);
            }
        }
    }
}

function updateHospiceDiagnosisForm(updatedPocRows) {
    var diagnosisRows = document.getElementsByClassName("dxDiagnosisRow");

    for (var i=0; i < updatedPocRows.length; i++) {
        var diagnosisRow = diagnosisRows[i];
        if (i >= diagnosisRows.length) {
            diagnosisRow = addHospiceDiagnosis(findCharByIndex(i), i);
        }
        var pocRow = updatedPocRows[i];
        if (pocRow) {
            var txtFields = diagnosisRow.querySelectorAll('input[type="text"]');
            txtFields[0].value = replaceUndefinedByEmptyString(pocRow.itemText);
            txtFields[1].value = pocRow.effectiveStartDate;
            txtFields[2].value = replaceUndefinedByEmptyString(pocRow.description);
            
            var selHiddenField = diagnosisRows[i].querySelectorAll('input[type="hidden"]');

            var radFields = diagnosisRow.querySelectorAll('input[type="radio"]');
            if(radFields.length > 0){
                var terminalPrognosisRelation = pocRow.terminalPrognosisRelation;
                var terminalPrognosisRelationIndex = pocRow.terminalPrognosisRelation == 'Yes' ? 0 : pocRow.terminalPrognosisRelation == 'No' ? 1 : pocRow.terminalPrognosisRelation;
                if (radFields && radFields[terminalPrognosisRelationIndex]) {
                    radFields[terminalPrognosisRelationIndex].checked = true;
                } else {
                    if (terminalPrognosisRelation === ' ' || terminalPrognosisRelation === ' ') {
                        for (var j = 0; j < radFields.length; j++) {
                            radFields[j].checked = false;
                        }
                    }
                }
                selHiddenField[1].value = terminalPrognosisRelation == '' ? ' ': terminalPrognosisRelation;
            }

            var hiddenFields = diagnosisRow.querySelectorAll('input[type="hidden"]');
            hiddenFields[0].value = replaceUndefinedByEmptyString(pocRow.cpModuleItemId);
        }
    }
}

function resetDiagnosisForm() {
    var diagnosisRows = document.getElementsByClassName("dxDiagnosisRow");
    for (var i = 0; i < diagnosisRows.length; i++){
        
        var txtFields = diagnosisRows[i].querySelectorAll('input[type="text"]');
        for (var j = 0; j < txtFields.length; j++) {
            txtFields[j].value = '';
        }
        var selField = diagnosisRows[i].querySelector('select');
        selField.value = 0 ;
        var selHiddenField = diagnosisRows[i].querySelectorAll('input[type="hidden"]');
        selHiddenField[0].value = 0 ;
        selHiddenField[1].value = '' ;

        var radFields = diagnosisRows[i].querySelectorAll('input[type="radio"]');
        for (var j = 0; j < radFields.length; j++) {
            radFields[j].checked = false;
            radFields[j].disabled = true;
        }
        if(includeM1025 == 'true') { 
            selHiddenField[8].value = '' ;
            selHiddenField[9].value = '' ;
        }
    }
}

function resetHospiceDiagnosisForm() {
    var diagnosisRows = document.getElementsByClassName("dxDiagnosisRow");
    for (var i = 0; i < diagnosisRows.length; i++){
        
        var txtFields = diagnosisRows[i].querySelectorAll('input[type="text"]');
        for (var j = 0; j < txtFields.length; j++) {
            txtFields[j].value = '';
        }
        var selHiddenField = diagnosisRows[i].querySelectorAll('input[type="hidden"]');
        selHiddenField[0].value = 0 ;

        var radFields = diagnosisRows[i].querySelectorAll('input[type="radio"]');
        if(radFields.length > 0) {
            for (var j = 0; j < radFields.length; j++) {
                radFields[j].checked = false;
                radFields[j].disabled = true;
            }
            selHiddenField[1].value = '' ;
        }
    }
}

function clearSymptomControlRating(context, fieldName) {
    object = context.parentElement.parentElement;
    var radFields = object.querySelectorAll('input[name="value(' + fieldName + ')"]');
    for (var j = 0; j < radFields.length; j++) {
        radFields[j].checked = false;
    }
    autosave();
}

function clearTerminalPrognosisRelation(context, fieldName) {
    object = context.parentElement.parentElement;
    var radFields = object.querySelectorAll('input[name="value(' + fieldName + ')"]');
    for (var j = 0; j < radFields.length; j++) {
        radFields[j].checked = false;
    }
    autosave();
}

/**
 * Replace undefined/null data by empty string.
 */ 
function replaceUndefinedByEmptyString(value) {
    return value || '';
}

function checkPrn() {
    var activityId = document.buildFormForm.activityId.value;
    var visitDate = document.getElementsByName('value(VisitDate)')[0].value;

    if(!activityId) {
        // If activityId is null, throw an error saying the user needs to save the form first.
        alert("Please save the form before attempting to make it a PRN visit.");
        return;
    }

    // Make an api call to determine if the user can make the activity a prn activity

    var parameters = {
            actionToPerform: 'checkprn',
            activityId: activityId,
            visitDate: visitDate,
            hhsosSessionKey: $('hhsosSessionKey').value
     };

     new Ajax.Request('ajax.action', {
         requestHeaders: { Accept: 'application/json' },
         parameters: parameters,
         onSuccess: function(transport) {
             // Alert any errors
             var result = transport.responseJSON;
             var errors = result.errors;
             if(errors.length > 0) {
                 var error = "";
                 for(var i = 0; i < errors.length; i++) {
                     error += errors[i];
                 }
                 alert(error);
                 return;
             }

             // If there are available prn, confirm the user's decision
             var availablePrn = result.availablePrn;
             if(availablePrn > 0) {
                 // Confirm they want to save as prn if there's a prn visit available.
                 if(confirm("Are you sure you want to make this a PRN visit? In order to undo the PRN visit you'll be required to delete this form.")) {
                     //      yes - second api call to create activity history and save activity value, update the value on the form
					 makePrn(activityId, visitDate);
                 }
             } else {
                 alert("There are no PRN visit available.");
             }
         },
         onFailure: function(transport) {
             var errCode = transport.status + ':' + '10003';
             logUIErrorAudits('Failure - Ajax.action - checkprn, Status Code: ' + errCode);
             alert("Failed to contact server. Please try again or contact support.\nErrCode: " + errCode);
         }
     });
}

function makePrn(activityId, visitDate) {
    var isPrnInput = document.createElement("input");
        isPrnInput.setAttribute("type", "hidden")
        isPrnInput.setAttribute("id", "value(IsPRN)")
        isPrnInput.setAttribute("name", "value(IsPRN)")
        isPrnInput.setAttribute("value", "on")
    document.getElementById("IsPRNInfo").appendChild(isPrnInput)
    document.getElementsByName("value(VisitDate)")[0].setAttribute("readonly", "readonly");
    fieldChanged();

	saveFirst(function(error){
		var parameters = {
            actionToPerform: 'makeprn',
            activityId: activityId,
            visitDate: visitDate,
            hhsosSessionKey: $('hhsosSessionKey').value
	 	};

		new Ajax.Request('ajax.action', {
			requestHeaders: { Accept: 'application/json' },
			parameters: parameters,
			onSuccess: function(transport) {
				var checkbox = document.createElement("input");
					checkbox.setAttribute("type", "checkbox");
                    checkbox.setAttribute("style", "display: none");
					checkbox.addClassName("checkbox-field disabled");	

				var label = document.createElement("label")
					label.innerText = "PRN Visit";
					label.setAttribute("style", "vertical-align: middle;");

				var IsPRNCol = document.getElementById('IsPRNCol');
					IsPRNCol.setAttribute("style", "padding-left: 5px; white-space: nowrap");
					IsPRNCol.replaceChild(checkbox, IsPRNCol.children[0]);
					IsPRNCol.appendChild(label);


				// Alert any errors
				var result = transport.responseJSON;
				var errors = result.errors;
				if(errors.length > 0) {
					var error = "";
					for(var i = 0; i < errors.length; i++) {
						error += " " + errors[i];
					}
					alert(error);
					return;
				}

			},
			onFailure: function(transport) {
                document.getElementsByName("value(IsPRN)")[0].value = "";
                document.getElementsByName("value(VisitDate)")[0].removeAttribute("readonly");
                var errCode = transport.status + ':' + '10004';
                logUIErrorAudits('Failure -  Ajax.action - makeprn, Status Code: ' + errCode);
                alert("Failed to contact server. Please try again or contact support.\nErrCode: " + errCode);
			}
		});
	})
}

/**
 * Method to validate whether POC can be created and if success will create the POC activity,
 * otherwise will show warning/error message
 */
function validateAndCreatePOCForm(chartIdPOC, saveAllPOCData, asOfDatePOC, isIdgReview, additionalSections) {
    var parameters = {
            actionToPerform : 'verifyCpModuleCategories',
            chartId : chartIdPOC,
            sectionIds: -1,
            includeWarnings: true,
            completeIDGReview: isIdgReview,
            hhsosSessionKey: $('hhsosSessionKey').value
        };
    new Ajax.Request('carePlanModule.action', {
        requestHeaders: { Accept: 'application/json' },
        parameters: parameters,
        onSuccess: function(transport) {
            var response = transport.responseJSON || {};

            var misses = "",
            error = '',
            formattedMsg;
            if (response.length > 0) {
                for (var i=0; i<response.length; i++) {
                    formattedMsg = '';
                    formattedMsg += '\n' + response[i].cpSectionName + "/" + response[i].categoryName;
                    if (response[i].requireCategory == 0) {
                        if (misses.length > 0) {
                            misses += ", ";
                        }
                        misses += formattedMsg;
                    } else {
                        if (error.length > 0) {
                            error += ", ";
                        }
                        error += formattedMsg;
                    }
                }
                var msgPrefix = 'The following section/categories have not been selected:';
                $('overlay').show();
                if (error && misses || error && !misses) {
                    var msg = error;
                    if (misses) {
                        if (msg && msg.length > 0) {
                            msg += ", ";
                        }
                        msg += misses;
                    }
                    Dialog.alert( msgPrefix + msg, {
                        title: 'Error',
                        width: 400,
                        className: 'alphacube',
                        onOk: function(dialog) {
                            $('overlay').hide();
                            dialog.close();
                        }
                    });
                } else {
                    Dialog.confirm( msgPrefix + misses, {
                        title: 'Warning',
                        width: 400,
                        className: 'alphacube',
                        okLabel: 'OK',
                        cancelLabel: "Cancel",
                        onOk: function(dialog) {
                            createPOCForm(chartIdPOC, saveAllPOCData, asOfDatePOC, isIdgReview, additionalSections);
                            dialog.close();
                        },
                        onCancel: function(dialog) {
                            $('overlay').hide();
                            dialog.close();
                        }
                    });
                }
            } else {
                $('overlay').show();
                createPOCForm(chartIdPOC, saveAllPOCData, asOfDatePOC, isIdgReview, additionalSections);
            }
            return;
        },
        onFailure: function(transport) {
            alert("Care Plan Categories could not be verified. ");
        }
    });
}

/**
 * Initiate backend call to create POC, with the given data
 */
function createPOCForm(chartIdPOC, saveAllPOCData, asOfDatePOC, isIdgReview, additionalSections) {
    var parameters = {
        actionToPerform : 'createCpModuleSnapshot',
        chartId : chartIdPOC,
        saveAllPOCData: saveAllPOCData,
        asOfDate: asOfDatePOC,
        completeIDGReview: isIdgReview,
        hhsosSessionKey: $('hhsosSessionKey').value,
        additionalSections: additionalSections
    };
    new Ajax.Request('carePlanModule.action', {
        requestHeaders: { Accept: 'application/json' },
        parameters: parameters,
        onSuccess: function(transport) {
            var response = transport.responseJSON || {};
            Dialog.alert( response.success, {
                title: 'Success',
                width: 400,
                className: 'alphacube',
                onOk: function(dialog) {
                    window.close();
                }
            });
        },
        onFailure: function(transport) {
            alert("Care Plan Categories could not be verified. ");
        }
    });
}

function autoCalculateVisits(mQuestion) {
    $('overlay').show();
    var parameters = {
            actionToPerform : 'autoCalculateVisits',
            activityId : $('activityId').value,
            patientId : $('patientId').value,
            numOfDaysPriorDeath: mQuestion && mQuestion== '05010' ? '2' : '6',
            hhsosSessionKey: $('hhsosSessionKey').value
        };
    new Ajax.Request('ajax.action', {
        requestHeaders: { Accept: 'application/json' },
        parameters: parameters,
        onSuccess: function(transport) {
            $('overlay').hide();
            var response = transport.responseJSON || {};
            
            var error = response.error;
            if(error) {
                alert(error);
                return;
            } 
           
            var fromIndex = mQuestion && mQuestion == '05010' ? 0 : 3;
            var toIndex = mQuestion && mQuestion == '05010' ? 2 : 6;
            
            var visitCountsByUsertypes = response.visitCounts || {};
            var fieldNamesByUsertypes = getHospiceVisitFieldNamesByUsertypes();
            
            var fieldValues = {};
            for(var usertype in fieldNamesByUsertypes) {
                var visitCountsArray = visitCountsByUsertypes[usertype];
                var fieldNamesArray = fieldNamesByUsertypes[usertype];
                
                for(var i = fromIndex; i <= toIndex; i++) {
                    var visitCount = visitCountsArray ? visitCountsArray[i] : [];
                    var fieldName = fieldNamesArray[i];
                    var fieldValue = fieldValues[fieldName];
                    
                    // If the value was not set for this field yet, default to 0
                    if(!fieldValue) {
                        fieldValue = 0;
                    }
                    
                    if(visitCount && visitCount > 0) {
                        fieldValue = fieldValue + visitCount;
                    }
                    
                    // Make sure fieldValue is not greater than 9
                    if(fieldValue > 9) {
                        fieldValue = 9;
                    } 
                    
                    fieldValues[fieldName] = fieldValue;
                }
            }
            
            // Now update all the field elements
            updateFieldValueElements(fieldValues);
        },
        onFailure: function(transport) {
            $('overlay').hide();
            alert("Error on calculating the visits. Please contact customer support.");
        }
    });
}

/**
 * Determines whether the current activity overlaps any existing visits and
 * displays prompt accordingly
 *
 */
function detectVisitOverlap(callback, callbackArg) {
    var actionToPerform = document.buildFormForm.actionToPerform ? document.buildFormForm.actionToPerform.value : '';
    // Defaulting the warn visit overlap value to false.
    resetAllowVisitOverlapValue();

    if (actionToPerform === 'sendToOffice' && !isAdmin && isVisitForm && (restrictVisitOverlapOnSendToOffice === 'require'
        || restrictVisitOverlapOnSendToOffice === 'warn')) {

        var parameters = {
            actionToPerform : 'detectvisitoverlap',
            activityId : $('activityId').value,
            hhsosSessionKey: $('hhsosSessionKey').value
        };
        new Ajax.Request('ajax.action', {
            requestHeaders: { Accept: 'application/json' },
            parameters: parameters,
            onSuccess: function(transport) {
                var response = transport.responseJSON || {};

                // Display the prompt only when there is at least one overlapping visit
                if (response.overlapVisits && response.overlapVisits.length > 0) {
                    var title = 'Visit Overlap Error';
                    var okButtonLabel = 'Close';
                    var message = 'The following errors were found: The date and time for this visit overlaps with an existing visit. Please adjust your visit date(s) and/or times.';
                    if (restrictVisitOverlapOnSendToOffice === 'warn') {
                        title = 'Visit Overlap Warning';
                        okButtonLabel = 'Send to Office';
                        message = 'The following errors were found: The date and time for this visit overlaps with an existing visit. Would you still like to Send to Office?';
                    }
                    var dialogParams = {
                        title: title,
                        width: 1200,
                        className: 'alphacube',
                        okLabel: okButtonLabel,
                        cancelLabel: "Close",
                        onOk: function(dialog) {
                            $('overlay').hide();
                            dialog.close();
                            if (restrictVisitOverlapOnSendToOffice === 'warn') {
                                document.buildFormForm.allowVisitOverlap.value = true;
                                callback(callbackArg);
                            } else {
                                // When restrictVisitOverlapOnSendToOffice === 'require' ok button will act as close button
                                saveCanceled();
                            }
                        },
                        onCancel: function(dialog) {
                            saveCanceled();
                            dialog.close();
                        }
                    };
                    var content = '<div class="visitOverlapWrapper">';
                    content += '<div>' + message + '</div><div class="overlap-visits"><table style="width:100%">'
                    + '<thead><tr><th>Patient</th>'
                    + '<th>MR #</th>'
                    + '<th>Date In</th>'
                    + '<th>Date Out</th>'
                    + '<th>Time In</th>'
                    + '<th>Time Out</th>'
                    + '<th>User</th>'
                    + '<th>Form</th></tr></thead><tbody>';
                    for(var i=0; i < response.overlapVisits.length; i++) {
                        content += '<tr><td>'+ response.overlapVisits[i].patientDisplayName + '</td>'
                        + '<td>' + response.overlapVisits[i].patientMrn + '</td>'
                        + '<td>' + response.overlapVisits[i].dateIn + '</td>'
                        + '<td>' + getDefaultStringIfBlank(response.overlapVisits[i].dateOut) + '</td>'
                        + '<td>' + getDefaultStringIfBlank(response.overlapVisits[i].timeIn) + '</td>'
                        + '<td>' + getDefaultStringIfBlank(response.overlapVisits[i].timeOut) + '</td>'
                        + '<td>' + response.overlapVisits[i].userDisplayName + '</td>'
                        + '<td>' + response.overlapVisits[i].formDisplayName + '</td></tr>';
                    }
                    content += '</tbody></table></div></div>';

                    $('overlay').show();
                    if(restrictVisitOverlapOnSendToOffice === 'require') {
                        Dialog.alert(content, dialogParams);
                    } else {
                        Dialog.confirm(content, dialogParams);
                    }

                } else {
                    callback(callbackArg);
                }
            },
            onFailure:   function(transport)     {
                alert("Error occured while detecting visit overlaps");
            }
        });
    } else {
        callback(callbackArg);
    }
}

/**
 * Reset the allowVisitOverlap field value to false.
 *
 */
function resetAllowVisitOverlapValue() {
    if (document.buildFormForm.allowVisitOverlap && document.buildFormForm.allowVisitOverlap.value) {
        document.buildFormForm.allowVisitOverlap.value = false;
    }
}

/**
 * Returns the value if available else returns the default value provided.
 * If default value is not provided, Empty string will be returned.
 *
 * @param value
 * @param defaultValue
 * @returns
 */
function getDefaultStringIfBlank(value, defaultValue) {
    return value ? value : (defaultValue ? defaultValue : '');
}

function getHospiceVisitFieldNamesByUsertypes() {
    return { 
        rn : ['value(O5010A1)', 'value(O5010A2)', 'value(O5010A3)', 'value(O5030A1)', 'value(O5030A2)', 'value(O5030A3)', 'value(O5030A4)'],
        rnh : ['value(O5010A1)', 'value(O5010A2)', 'value(O5010A3)', 'value(O5030A1)', 'value(O5030A2)', 'value(O5030A3)', 'value(O5030A4)'],
        physician : ['value(O5010B1)', 'value(O5010B2)', 'value(O5010B3)', 'value(O5030B1)', 'value(O5030B2)', 'value(O5030B3)', 'value(O5030B4)'],
        nurse_practitioner : ['value(O5010B1)', 'value(O5010B2)', 'value(O5010B3)', 'value(O5030B1)', 'value(O5030B2)', 'value(O5030B3)', 'value(O5030B4)'],
        msw : ['value(O5010C1)', 'value(O5010C2)', 'value(O5010C3)', 'value(O5030C1)', 'value(O5030C2)', 'value(O5030C3)', 'value(O5030C4)'],
        hsw : ['value(O5010C1)', 'value(O5010C2)', 'value(O5010C3)', 'value(O5030C1)', 'value(O5030C2)', 'value(O5030C3)', 'value(O5030C4)'],
        chaplain : ['value(O5010D1)', 'value(O5010D2)', 'value(O5010D3)', 'value(O5030D1)', 'value(O5030D2)', 'value(O5030D3)', 'value(O5030D4)'],
        scc: ['value(O5010D1)', 'value(O5010D2)', 'value(O5010D3)', 'value(O5030D1)', 'value(O5030D2)', 'value(O5030D3)', 'value(O5030D4)'],
        lpn : ['value(O5010E1)', 'value(O5010E2)', 'value(O5010E3)', 'value(O5030E1)', 'value(O5030E2)', 'value(O5030E3)', 'value(O5030E4)'],
        hlpn : ['value(O5010E1)', 'value(O5010E2)', 'value(O5010E3)', 'value(O5030E1)', 'value(O5030E2)', 'value(O5030E3)', 'value(O5030E4)'],
        lvn : ['value(O5010E1)', 'value(O5010E2)', 'value(O5010E3)', 'value(O5030E1)', 'value(O5030E2)', 'value(O5030E3)', 'value(O5030E4)'],
        hlvn : ['value(O5010E1)', 'value(O5010E2)', 'value(O5010E3)', 'value(O5030E1)', 'value(O5030E2)', 'value(O5030E3)', 'value(O5030E4)'],
        hha : ['value(O5010F1)', 'value(O5010F2)', 'value(O5010F3)', 'value(O5030F1)', 'value(O5030F2)', 'value(O5030F3)', 'value(O5030F4)'],
        ha : ['value(O5010F1)', 'value(O5010F2)', 'value(O5010F3)', 'value(O5030F1)', 'value(O5030F2)', 'value(O5030F3)', 'value(O5030F4)']
    };
}

function updateFieldValueElements(fieldValues) {
    for(var fieldName in fieldValues) {
        var elements = document.getElementsByName(fieldName);
        if(elements) {
            elements[0].value = fieldValues[fieldName];
        }
    }
}

function showUserPrompt(activityId){
    $('overlay').show();
    console.log("Deleting activity ID: "+activityId);
    var patientIdStr = document.buildFormForm.patientId.value;
    var chartIdStr = document.buildFormForm.chartId.value;
    var reqParameters = {
            actionToPerform: 'removeActivityHas',
            chartId: chartIdStr,
            selectedActivityIds: activityId,
            selectedPatientId: patientIdStr,
            hhsosSessionKey: $('hhsosSessionKey').value
     };
    var content = '<label>The following errors were found:</label>' +
        '<p><span>This scheduled visit is not authorized by the payer. Would you like to continue?</span></p>' +
        '<br/>';
    if (showUserPromptPopup) showUserPromptPopup.close();
    showUserPromptPopup = Dialog.confirm( content, {
        title: 'Warning',
        width: 400,
        className: 'alphacube',
        okLabel: 'Yes',
        cancelLabel: "No",
        onOk: function(dialog) {
            dialog.close();
            $('overlay').hide();
            $('visitNotAuthorizedText').show();
        },
        onCancel: function(dialog) {
            new Ajax.Request( 'patientCharts.action', {
                requestHeaders: { Accept: 'application/json', 'Response-Type': 'application/json' },
                parameters: reqParameters,
                method: 'post',
                onSuccess:   function(transport) {
                    var response = transport.responseJSON || {};
                    if (response.error) {
                    alert(response.error);
                }else{
                    //alert('Un Authorized visit deleted');
                    Dialog.alert( 'UnAuthorized visit deleted', {
                        title: 'Alert',
                        width: 300,
                        className: 'alphacube_lite',
                        okLabel: 'OK',
                        onOk: function() {
                            var injector = window.parent.angular.element(window.parent.document.body).injector(),
                            FormFrameService = injector.get('FormFrameService');
                            FormFrameService.redirectFromJSP(isAdmin ? 'home.main' : 'home.agentMenu');
                            return true;
                        }
                    });
                    
                }
                },
                onFailure:   function(transport) { alert("Failed to delete the activity. Please try again or contact support."); },
                onException: function(requester, ex) { alert("Failed to delete the activity. Please try again or contact support."+ex); }
            } );
            $('overlay').hide();
            dialog.close();
        }
    });
    
}

// postPrototypeLoadProcess();



// //////////////////////

// /**
//  * @name isPrototypeLoaded
//  * @public
//  * @description Check whether the prototype library has been loaded
//  * @returns {Boolean} 
//  */
// function isPrototypeLoaded() {
//     return typeof $ !== 'undefined';
// }

// /**
//  * @name loadScriptsDynamically
//  * @public
//  * @description Load scripts dynamically based on url received
//  * @returns {void} 
//  */
// function loadScriptsDynamically(src) {
//     var script = document.createElement('script');
//     script.setAttribute('src', src);
//     document.head.appendChild(script);
// }

// /**
//  * @name postPrototypeLoadProcess
//  * @public
//  * @description Check the prototype library has been loaded and trigger 
//  * checkIFrameVersionAndSendData method
//  * @returns {void} 
//  */
// function postPrototypeLoadProcess() {
//     if (isModalView) {
//         var postProcessPrototypeIntervalInstance = setInterval(function () {
//             if (isPrototypeLoaded()) {
//                 clearInterval(postProcessPrototypeIntervalInstance);
//                 checkIFrameVersionAndSendData(document.forms[0]);
//             }
//         }, 100);
//     }
// }



// /**
//  * Checks the browser is IE
//  */
// function isIE() {
//     var userAgent = window.navigator.userAgent;
//     return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
// }

// function openWindow(url, action) {
//     // For window open calls inside iframes this check needed
//     if (isModalView) {
//         // If opening in new tab for 3.1 pages
//         if(typeof action !== 'undefined' && (action !== '_self')) {
//             url = appendNewWindowParams(url);
//         }
//         redirectToNewTabForm(url, action);
        
//     } else {
//         /**
//          * @todo To open a new tab in IE we have to duplicate the 
//          * code as in common.js since the code in common.js
//          * will be available only in angular application
//          */
//         if (isIE()) {
//             url = getURLOrigin() + "/" + url;
//             setTimeout(function() {
//                 openIframeUrlForIE(url, action);
//             }, 1);
//         } else {
//             window.open(url, action);
//         }
//     }
// }


// function getUrlVars(url) {
//     var hash;
//     var myJson = {};
//     var hashes = url.slice(url.indexOf('?') + 1).split('&');
//     for (var i = 0; i < hashes.length; i++) {
//         hash = hashes[i].split('=');
//         myJson[hash[0]] = hash[1];
//         // If you want to get in native datatypes
//         // myJson[hash[0]] = JSON.parse(hash[1]); 
//     }
//     return myJson;
// }

// function redirectJspToUrl(url) {
//     if(window.parent && window.parent.angular) {
//             // JSON result in `data` variable
//             data = getUrlVars(url);
//             data.action = url.split('?')[0];
//             var injector = window.parent.angular.element(window.parent.document.body).injector(),
//             RedirectService = injector.get('RedirectService');
//             RedirectService.setRedirectLink({form: data});
//     } else {
//         window.location.href = url;
//     }
    
// }

// function redirectToNewTabForm(url, action) {
//     if(window.parent && window.parent.angular && url.includes(".action")) {
//             // JSON result in `data` variable
//             data = getUrlVars(url);
//             data.action = url.split('?')[0];
//             var injector = window.parent.angular.element(window.parent.document.body).injector(),
//             RedirectService = injector.get('RedirectService');
//             if(url.split(".action")[0] === 'printPreview' || url.split(".action")[0] === 'batchPrintPreview' ) {
//                 RedirectService.redirectToNewTabNx(url);
//             } else if(url.split(".action")[0] === 'loadDocument') {
//                 if (window === window.top) {
//                     window.open(url, action);
//                 } else {
//                     window.top.openWindow(url, action);
//                 }
//             } else {
//                 RedirectService.redirectToNewTabForm(data);
//             }
//     } else {
//         if (window === window.top) {
//             window.open(url, action);
//         } else {
//             window.top.openWindow(url, action);
//         }
//     }
    
// }

// /**
//  * @todo To open a new tab in IE we have to duplicate the 
//  * code as in common.js since the code in common.js
//  * will be available only in angular application
//  * @name getURLOrigin
//  * @description Get URL from origin if compatible.If not, 
//  * processed pollyfill to get origin details.
//  * @returns {String} Origin
//  */
// function getURLOrigin() {
//     return window.location.origin || 
//         (window.location.protocol + '//' + window.location.hostname +
//         (window.location.port ? ':' + window.location.port : ''));
// }

// /**
//  * @todo To open a new tab in IE we have to duplicate the 
//  * code as in common.js since the code in common.js
//  * will be available only in angular application
//  * <p>
//  * Opening new tab with window.open loses http referrer at back end
//  * and hence causing mainmenuforward to be null and blanks out page.
//  * Hence a hacky way for IE with a hidden anchor tag.
//  * </p>
//  * 
//  * @param url to open in new tab
//  * @param targetWindow window name to open
//  */
// function openIframeUrlForIE(url, targetWindow) {
//     var link = window.document.getElementById("newTabAnchor");
//     if (typeof(link) == 'undefined' || link == null) {
//         link = window.document.createElement('a');
//         link.setAttribute("id", "newTabAnchor");
//         link.href = url;
//         link.target = targetWindow;
//         window.document.body.appendChild(link);
//     } else {
//         link.href = url;
//         link.target = targetWindow;
//     }
//     link.click();
//     // Just focus the already opened window
//     var win = window.open('', targetWindow);
//     win.focus();
//     // Close the target window if not focus
//     setTimeout(function() {
//         if(document.hasFocus()) {
//             win.close();
//             link.click();
//             // Just focus the already opened window
//             window.open('', targetWindow).focus();
//         }
//     }, 100);
// }

// //Checks the UI version is set to v3.1 and opened in iOS
// function appendNewWindowParams(url) {
//     if (url.indexOf("newWindow") === -1) {
//         var separator = (url.indexOf("?") === -1) ? "?" : "&";
//         url = url + separator + "newWindow=true";
//     }
//     return url;
// }

// //Checks the UI version is set to v3.1 and opened in iOS
// function appendNewWindowParams(url) {
//     if (url.indexOf("newWindow") === -1) {
//         var separator = (url.indexOf("?") === -1) ? "?" : "&";
//         url = url + separator + "newWindow=true";
//     }
//     return url;
// }

// var isModalViewInIos = function () {
//     return checkIsModalViewInMobileOS('iOS');
// };

// var isModalViewInAndroid = function () {
//     return checkIsModalViewInMobileOS('android');
// };

// function checkIsModalViewInMobileOS(mobileOs) {
//     var parentWindow = window.parent,
//         isMobileModalView = false;
//     if (parentWindow.isMobileOS && parentWindow.isMobileOS() === mobileOs && isModalView) {
//         isMobileModalView = true;
//     }
//     return isMobileModalView;
// }

// if (isModalViewInIos()) {
//     var parentWindow = window.parent, scrollX, scrollY, lastCursorPosition;

//     //adding keypress events for the navigation keys)
//     window.addEventListener('keypress',
//         function() {
//             setScrollPositions();
//         }, false);

//     function addFocusListners() {
//         var inputList = [
//             document.querySelectorAll("input[type='text']"),
//             document.querySelectorAll("textarea")
//         ];
//         // Get window x,y position every input and textarea focus
//         for(var i=0; i<inputList.length; i++) {
//             for(var j=0; j<inputList[i].length; j++) {
//                 inputList[i][j].addEventListener("focus", function() {
//                     setScrollPositions();
//                 });
//             }
//         }
//     };

//     document.addEventListener("DOMContentLoaded", function() {
//         addFocusListners();
//     });

//     function setScrollPositions() {
//         scrollX = parentWindow.scrollX;
//         scrollY = parentWindow.scrollY;
//         lastCursorPosition = null;
//     }

//     var parentWindowScrollListener = function() {
//         var activeElement = document.activeElement;
//         if (activeElement && activeElement.value) {
//             var currentCursorPosition = getActiveElementCursorPosition();
//             if (activeElement.value.length >= currentCursorPosition &&
//                 lastCursorPosition !== currentCursorPosition) {
//                     lastCursorPosition = currentCursorPosition;
//                     parentWindow.scrollTo(scrollX, scrollY);
//             }
//         }
//     }

//     /**
//      * To get the cursor position for the active element in DOM (Eg. text/textarea)
//      */
//     function getActiveElementCursorPosition() {
//         var activeElement = document.activeElement;
//         return activeElement.value.slice(0, activeElement.selectionStart).length;
//     }
//     // scroll event is fired when the document view or an element has been scrolled.
//     parentWindow.addEventListener('scroll', parentWindowScrollListener);
// }

// var header = [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
//     dataos = [
//         { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
//         { name: 'Windows', value: 'Win', version: 'NT' },
//         { name: 'iPhone', value: 'iPhone', version: 'OS' },
//         { name: 'iPad', value: 'iPad', version: 'OS' },
//         { name: 'Kindle', value: 'Silk', version: 'Silk' },
//         { name: 'Android', value: 'Android', version: 'Android' },
//         { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
//         { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
//         { name: 'Macintosh', value: 'Mac', version: 'OS X' },
//         { name: 'Linux', value: 'Linux', version: 'rv' },
//         { name: 'Palm', value: 'Palm', version: 'PalmOS' }
//     ],
//     databrowser = [
//         { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
//         { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
//         { name: 'Safari', value: 'Safari', version: 'Version' },
//         { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
//         { name: 'Opera', value: 'Opera', version: 'Opera' },
//         { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
//         { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
//     ];

// var isIpad = function() {
//     if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
//        return 'ontouchstart' in window && navigator.platform.indexOf("Mac") != -1;
//     }
//     return false;
// }

// //Due to iOS 13 and Safari 13 update window.navigator.userAgent and other details got updated in devices like iPad.
// //To achieve the default behaviors for all modal dialogs to work with iOS 13 and other lower versions we need to check 
// //for device os and browser versions.
// //Refer KN-4019 for more details.
// var deviceBrowserVersion = getDeviceBrowserVersion();

// function matchBrowserUserAgent(navigatorString, data) {
//     var i = 0, j = 0, html = '', regex, regexv, match, matches, version;
    
//     for (i = 0; i < data.length; i += 1) {
//         regex = new RegExp(data[i].value, 'i');
//         match = regex.test(navigatorString);
//         if (match) {
//             regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
//             matches = navigatorString.match(regexv);
//             version = '';
//             if (matches) {
//                 if (matches[1]) {
//                     matches = matches[1];
//                 }
//             }
//             if (matches) {
//                 matches = matches.split(/[._]+/);
//                 for (j = 0; j < matches.length; j += 1) {
//                     if (j === 0) {
//                         version += matches[j] + '.';
//                     } else {
//                         version += matches[j];
//                     }
//                 }
//             } else {
//                 version = '0';
//             }
//             return {
//                 name : data[i].name,
//                 version : parseFloat(version)
//             };
//         }
//     }
//     return {
//         name : 'unknown',
//         version : 0
//     };
// }

// function getDeviceBrowserVersion() {
//     var agent = header.join(' '),
//         os = matchBrowserUserAgent(agent, dataos),
//         browser = matchBrowserUserAgent(agent, databrowser);
//     return { os: os, browser: browser }
// }

// // Check if mobile device is android OS
// if (isModalViewInAndroid()) {
//     var parentWindow = window.parent;
//     var parentWindowScrollListener = function() {
//         var modalDialog = document.getElementsByClassName('dialog');
//         if(modalDialog.length) {
//             modalDialog = modalDialog[0];
//             // Calculate top with parent header height
//             var top = (( parentWindow.innerHeight - modalDialog.style.height.split('px')[0] ) / 2 ) + 
//                 parentWindow.pageYOffset - 140;
//             modalDialog.style.top = top + "px";
//         }
//     }
//     // scroll event is fired when the document view or an element has been scrolled.
//     parentWindow.addEventListener('scroll', parentWindowScrollListener);
// }

// // Set iframe inner height to iframe container
// function setIframeContainerHeight() {
//     // Calculate iframe height with parent header height
//     var formFrameContainer = window.parent.document.getElementById('form-frame-container');
//     if (formFrameContainer) {
//         formFrameContainer.style.minHeight = (window.document.body.getHeight() + 140) +"px";
//     }
// }

// // Remove iframe container height
// function removeIframeContainerHeight() {
//     var formFrameContainer = window.parent.document.getElementById('form-frame-container');
//     if (formFrameContainer) {
//         formFrameContainer.style.minHeight = "0px";
//     }
// }
// /**
//  * @name queryStringToJSON
//  * @public
//  * @description Convert the form elements to JSON objects
//  * @param {String} queryString 
//  * @returns {Object} formObject
//  */
// function queryStringToJSON(queryString) {
//     var queryStringArray = queryString.split('&'),
//         result = {},
//         queryStringParameter,
//         key,
//         value;
//     queryStringArray.forEach(function (pair) {
//         queryStringParameter = pair.split('=');
//         key = queryStringParameter[0];
//         value = decodeURIComponent(queryStringParameter[1] || '');

//         if (result[key]) {
//             if (Object.prototype.toString.call(result[key]) === '[object Array]') {
//                 result[key].push(value);
//             } else {
//                 result[key] = [result[key], value];
//             }
//         } else {
//             result[key] = value;
//         }
//     });

//     return JSON.parse(JSON.stringify(result));
// }

// /**
//  * @name convertFormDataToJSON
//  * @public
//  * @description Get form JSON object and add action value from
//  * form elements
//  * @param {HTMLELEMENTS} formData 
//  * @returns {Object} formObject
//  */
// function convertFormDataToJSON(formData) {
//     var formJSON = queryStringToJSON($(formData).serialize());
//     formJSON.action = formData.getAttribute('action');
//     return formJSON;
// }

// /**
//  * @name postDataToParentWindow
//  * @public
//  * @description Send data to parent window
//  * @returns void
//  */
// function postDataToParentWindow(data) {
//     data.actionToPerform = '';
//     window.parent.postMessage(data,
//         window.location.protocol + '//' + window.location.hostname +
//         (window.location.port ? ':' + window.location.port : ''));
// }

// /**
//  * @name checkIFrameVersionAndSendData
//  * @public
//  * @description Check UI3.1 and convert to object 
//  * if the input is Form Element and send.
//  * @param {HTMLELEMENTS | Object} formData
//  * @param {Boolean} isFormDataObj
//  * @returns void
//  */
// function checkIFrameVersionAndSendData(formData, isFormDataObj) {
//     if (isModalView) {
//         postDataToParentWindow(isFormDataObj ?
//             formData : convertFormDataToJSON(formData));
//     }
// }

// if(location.pathname.indexOf('patientChart') == -1) {
//     window.name = '';
// }

// function getAllUrlParams(url) {

//     // get query string from url (optional) or window
//     var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

//     // we'll store the parameters here
//     var obj = {};

//     // if query string exists
//     if (queryString) {

//       // stuff after # is not part of query string, so get rid of it
//       queryString = queryString.split('#')[0];

//       // split our query string into its component parts
//       var arr = queryString.split('&');

//       for (var i=0; i<arr.length; i++) {
//         // separate the keys and the values
//         var a = arr[i].split('=');

//         // in case params look like: list[]=thing1&list[]=thing2
//         var paramNum = undefined;
//         var paramName = a[0].replace(/\[\d*\]/, function(v) {
//           paramNum = v.slice(1,-1);
//           return '';
//         });

//         // set parameter value (use 'true' if empty)
//         var paramValue = typeof(a[1])==='undefined' ? true : a[1];

//         paramValue = paramValue.toLowerCase();

//         // if parameter name already exists
//         if (obj[paramName]) {
//           // convert value to array (if still string)
//           if (typeof obj[paramName] === 'string') {
//             obj[paramName] = [obj[paramName]];
//           }
//           // if no array index number specified...
//           if (typeof paramNum === 'undefined') {
//             // put the value on the end of the array
//             obj[paramName].push(paramValue);
//           }
//           // if array index number specified...
//           else {
//             // put the value at that index number
//             obj[paramName][paramNum] = paramValue;
//           }
//         }
//         // if param name doesn't exist yet, set it
//         else {
//           obj[paramName] = paramValue;
//         }
//       }
//     }

//     return obj;
// }

// /**
//  * Open 3.0 forms from non-angular pages in order to set web storages
//  * @param activityId
//  * @param formVersionId
//  */
// function openDbForm(activityId, formVersionId) {
//     var params = { formVersionId: formVersionId, activityId: activityId, pageNum: 1};
//     window.sessionStorage.setItem('dynamicFormActivity', encodeURIComponent(btoa(JSON.stringify(params))));
//     openWindow('app#/dynamicForm');
//     window.sessionStorage.removeItem('dynamicFormActivity');
// }

// function getDeviceStatus() {
//     var deviceStatus  = (window && window.navigator) ? (window.navigator.onLine ? 'ONLINE' : 'OFFLINE') : 'UNKNOWN';
//     return 'Device Status: ' + deviceStatus;
// }

// function logUIErrorAudits(auditAction) {
//     auditAction = auditAction + ', '+ getDeviceStatus();
//     var parameters = {
//         actionToPerform: 'generateUIErrorAuditLog',
//         auditAction: auditAction,
//         hhsosSessionKey: $('hhsosSessionKey').value,
//         auditPatientId: ''
//     };

//     new Ajax.Request('externalLog.action', {
//         requestHeaders: { Accept: 'application/json' },
//         parameters: parameters,
//         onSuccess: function(transport) {
//             //Success on writing UI Error logs
//         },
//         onFailure:   function(transport) {
//             console.error('Failed to write audit UI error logs.' + (transport.status) ? (transport.status + ':' ) : '');
//         }
//     });
// }

// function invokeExternalAjaxCall(action, parameters) {
//     new Ajax.Request(action, {
//         requestHeaders: { Accept: 'application/json' },
//         parameters: parameters,
//         onSuccess: function(transport) {
//             console.log('Successfully reset the cache for new 3.0 UI');
//         },
//         onFailure:   function(transport) {
//             console.error('Failed to reset the cache for new 3.0 UI.' + (transport.status) ? (transport.status + ':' ) : '');
//         }
//     });
// }

// /**
//  * skip sanitize for required fields
//  */
// function skipInputFields(key) {
// 	var fields = ['value(svgdraw'];
// 	var fieldExists = 0;
// 	for(var field in fields) {
// 		if(key.toLowerCase().indexOf(fields[field]) === 0) {
// 			fieldExists = fieldExists + 1;
// 			continue;
// 		}
// 	}
// 	if(fieldExists > 0) {
// 		return false;
// 	} else {
// 		return true;
// 	}
// }
// /**
//  * Sanitize all input text values
//  */
// function sanitizeFormInputValues(doc) {
//     var formValues = $(doc).serialize(true);
//     var error = false;
//     if (DOMPurify) {
//         Object.keys(formValues).forEach(function(key){
//             if (typeof doc[key].value === 'string' && !error && skipInputFields(key)) {
//                 if (doc[key].value.match(/<([a-zA-Z]+)/) && !(doc[key].value.match(/<svg/) || doc[key].value.match(/<SVG/))
//                     && !confirm('Potentially malicious text has been found and will need to be cleared starting with \''+ doc[key].value.substring(0, 20)
//                         + '\'. A space will need to exist between \'<\' or \'>\' and the text. Press Cancel to correct the text. Press OK to remove the malicious text.')) {
//                     error = true;
//                     return;
//                 } else {
//                     doc[key].value = DOMPurify.sanitize(formValues[key]);
//                     doc[key].value = doc[key].value.replace(/&lt;/g , "<").replace(/&gt;/g , ">");
//                 }
//             }
//         });
//     }
//     return error;
// }

// function resetGroupCache3_0() {
//     var parameters = {
//         actionToPerform: 'invalidateGroupsOverviewCaches',
//         hhsosSessionKey: $('hhsosSessionKey').value,
//         "isNewUi": true
//     };
//     invokeExternalAjaxCall('groupsOverviewCacheResetApi.action', parameters);
//     sessionStorage.setItem("isGroupActionSubmitted", 'false');
// }
// ///////////////////////


// /*  Prototype JavaScript framework, version 1.7
//  *  (c) 2005-2010 Sam Stephenson
//  *
//  *  Prototype is freely distributable under the terms of an MIT-style license.
//  *  For details, see the Prototype web site: http://www.prototypejs.org/
//  *
//  *--------------------------------------------------------------------------*/

// var ooJsPrototype =  Function.bind;

// var Prototype = {

//   Version: '1.7',

//   Browser: (function(){
//     var ua = navigator.userAgent;
//     var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
//     return {
//       IE:             !!window.attachEvent && !isOpera,
//       Opera:          isOpera,
//       WebKit:         ua.indexOf('AppleWebKit/') > -1,
//       Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
//       MobileSafari:   /Apple.*Mobile/.test(ua)
//     }
//   })(),

//   BrowserFeatures: {
//     XPath: !!document.evaluate,

//     SelectorsAPI: !!document.querySelector,

//     ElementExtensions: (function() {
//       var constructor = window.Element || window.HTMLElement;
//       return !!(constructor && constructor.prototype);
//     })(),
//     SpecificElementExtensions: (function() {
//       if (typeof window.HTMLDivElement !== 'undefined')
//         return true;

//       var div = document.createElement('div'),
//           form = document.createElement('form'),
//           isSupported = false;

//       if (div['__proto__'] && (div['__proto__'] !== form['__proto__'])) {
//         isSupported = true;
//       }

//       div = form = null;

//       return isSupported;
//     })()
//   },

//   ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
//   JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

//   emptyFunction: function() { },

//   K: function(x) { return x }
// };

// if (Prototype.Browser.MobileSafari)
//   Prototype.BrowserFeatures.SpecificElementExtensions = false;


// var Abstract = { };


// var Try = {
//   these: function() {
//     var returnValue;

//     for (var i = 0, length = arguments.length; i < length; i++) {
//       var lambda = arguments[i];
//       try {
//         returnValue = lambda();
//         break;
//       } catch (e) { }
//     }

//     return returnValue;
//   }
// };

// /* Based on Alex Arnell's inheritance implementation. */

// var Class = (function() {

//   var IS_DONTENUM_BUGGY = (function(){
//     for (var p in { toString: 1 }) {
//       if (p === 'toString') return false;
//     }
//     return true;
//   })();

//   function subclass() {};
//   function create() {
//     var parent = null, properties = $A(arguments);
//     if (Object.isFunction(properties[0]))
//       parent = properties.shift();

//     function klass() {
//       this.initialize.apply(this, arguments);
//     }

//     Object.extend(klass, Class.Methods);
//     klass.superclass = parent;
//     klass.subclasses = [];

//     if (parent) {
//       subclass.prototype = parent.prototype;
//       klass.prototype = new subclass;
//       parent.subclasses.push(klass);
//     }

//     for (var i = 0, length = properties.length; i < length; i++)
//       klass.addMethods(properties[i]);

//     if (!klass.prototype.initialize)
//       klass.prototype.initialize = Prototype.emptyFunction;

//     klass.prototype.constructor = klass;
//     return klass;
//   }

//   function addMethods(source) {
//     var ancestor   = this.superclass && this.superclass.prototype,
//         properties = Object.keys(source);

//     if (IS_DONTENUM_BUGGY) {
//       if (source.toString != Object.prototype.toString)
//         properties.push("toString");
//       if (source.valueOf != Object.prototype.valueOf)
//         properties.push("valueOf");
//     }

//     for (var i = 0, length = properties.length; i < length; i++) {
//       var property = properties[i], value = source[property];
//       if (ancestor && Object.isFunction(value) &&
//           value.argumentNames()[0] == "$super") {
//         var method = value;
//         value = (function(m) {
//           return function() { return ancestor[m].apply(this, arguments); };
//         })(property).wrap(method);

//         value.valueOf = method.valueOf.bind(method);
//         value.toString = method.toString.bind(method);
//       }
//       this.prototype[property] = value;
//     }

//     return this;
//   }

//   return {
//     create: create,
//     Methods: {
//       addMethods: addMethods
//     }
//   };
// })();
// (function() {

//   var _toString = Object.prototype.toString,
//       NULL_TYPE = 'Null',
//       UNDEFINED_TYPE = 'Undefined',
//       BOOLEAN_TYPE = 'Boolean',
//       NUMBER_TYPE = 'Number',
//       STRING_TYPE = 'String',
//       OBJECT_TYPE = 'Object',
//       FUNCTION_CLASS = '[object Function]',
//       BOOLEAN_CLASS = '[object Boolean]',
//       NUMBER_CLASS = '[object Number]',
//       STRING_CLASS = '[object String]',
//       ARRAY_CLASS = '[object Array]',
//       DATE_CLASS = '[object Date]',
//       NATIVE_JSON_STRINGIFY_SUPPORT = window.JSON &&
//         typeof JSON.stringify === 'function' &&
//         JSON.stringify(0) === '0' &&
//         typeof JSON.stringify(Prototype.K) === 'undefined';

//   function Type(o) {
//     switch(o) {
//       case null: return NULL_TYPE;
//       case (void 0): return UNDEFINED_TYPE;
//     }
//     var type = typeof o;
//     switch(type) {
//       case 'boolean': return BOOLEAN_TYPE;
//       case 'number':  return NUMBER_TYPE;
//       case 'string':  return STRING_TYPE;
//     }
//     return OBJECT_TYPE;
//   }

//   function extend(destination, source) {
//     for (var property in source)
//       destination[property] = source[property];
//     return destination;
//   }

//   function inspect(object) {
//     try {
//       if (isUndefined(object)) return 'undefined';
//       if (object === null) return 'null';
//       return object.inspect ? object.inspect() : String(object);
//     } catch (e) {
//       if (e instanceof RangeError) return '...';
//       throw e;
//     }
//   }

//   function toJSON(value) {
//     return Str('', { '': value }, []);
//   }

//   function Str(key, holder, stack) {
//     var value = holder[key],
//         type = typeof value;

//     if (Type(value) === OBJECT_TYPE && typeof value.toJSON === 'function') {
//       value = value.toJSON(key);
//     }

//     var _class = _toString.call(value);

//     switch (_class) {
//       case NUMBER_CLASS:
//       case BOOLEAN_CLASS:
//       case STRING_CLASS:
//         value = value.valueOf();
//     }

//     switch (value) {
//       case null: return 'null';
//       case true: return 'true';
//       case false: return 'false';
//     }

//     type = typeof value;
//     switch (type) {
//       case 'string':
//         return value.inspect(true);
//       case 'number':
//         return isFinite(value) ? String(value) : 'null';
//       case 'object':

//         for (var i = 0, length = stack.length; i < length; i++) {
//           if (stack[i] === value) { throw new TypeError(); }
//         }
//         stack.push(value);

//         var partial = [];
//         if (_class === ARRAY_CLASS) {
//           for (var i = 0, length = value.length; i < length; i++) {
//             var str = Str(i, value, stack);
//             partial.push(typeof str === 'undefined' ? 'null' : str);
//           }
//           partial = '[' + partial.join(',') + ']';
//         } else {
//           var keys = Object.keys(value);
//           for (var i = 0, length = keys.length; i < length; i++) {
//             var key = keys[i], str = Str(key, value, stack);
//             if (typeof str !== "undefined") {
//                partial.push(key.inspect(true)+ ':' + str);
//              }
//           }
//           partial = '{' + partial.join(',') + '}';
//         }
//         stack.pop();
//         return partial;
//     }
//   }

//   function stringify(object) {
//     return JSON.stringify(object);
//   }

//   function toQueryString(object) {
//     return $H(object).toQueryString();
//   }

//   function toHTML(object) {
//     return object && object.toHTML ? object.toHTML() : String.interpret(object);
//   }

//   function keys(object) {
//     if (Type(object) !== OBJECT_TYPE) { throw new TypeError(); }
//     var results = [];
//     for (var property in object) {
//       if (object.hasOwnProperty(property)) {
//         results.push(property);
//       }
//     }
//     return results;
//   }

//   function values(object) {
//     var results = [];
//     for (var property in object)
//       results.push(object[property]);
//     return results;
//   }

//   function clone(object) {
//     return extend({ }, object);
//   }

//   function isElement(object) {
//     return !!(object && object.nodeType == 1);
//   }

//   function isArray(object) {
//     return _toString.call(object) === ARRAY_CLASS;
//   }

//   var hasNativeIsArray = (typeof Array.isArray == 'function')
//     && Array.isArray([]) && !Array.isArray({});

//   if (hasNativeIsArray) {
//     isArray = Array.isArray;
//   }

//   function isHash(object) {
//     return object instanceof Hash;
//   }

//   function isFunction(object) {
//     return _toString.call(object) === FUNCTION_CLASS;
//   }

//   function isString(object) {
//     return _toString.call(object) === STRING_CLASS;
//   }

//   function isNumber(object) {
//     return _toString.call(object) === NUMBER_CLASS;
//   }

//   function isDate(object) {
//     return _toString.call(object) === DATE_CLASS;
//   }

//   function isUndefined(object) {
//     return typeof object === "undefined";
//   }

//   extend(Object, {
//     extend:        extend,
//     inspect:       inspect,
//     toJSON:        NATIVE_JSON_STRINGIFY_SUPPORT ? stringify : toJSON,
//     toQueryString: toQueryString,
//     toHTML:        toHTML,
//     keys:          Object.keys || keys,
//     values:        values,
//     clone:         clone,
//     isElement:     isElement,
//     isArray:       isArray,
//     isHash:        isHash,
//     isFunction:    isFunction,
//     isString:      isString,
//     isNumber:      isNumber,
//     isDate:        isDate,
//     isUndefined:   isUndefined
//   });
// })();
// Object.extend(Function.prototype, (function() {
//   var slice = Array.prototype.slice;

//   function update(array, args) {
//     var arrayLength = array.length, length = args.length;
//     while (length--) array[arrayLength + length] = args[length];
//     return array;
//   }

//   function merge(array, args) {
//     array = slice.call(array, 0);
//     return update(array, args);
//   }

//   function argumentNames() {
//     var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
//       .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
//       .replace(/\s+/g, '').split(',');
//     return names.length == 1 && !names[0] ? [] : names;
//   }

//   function bind(context) {
//     if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
//     var __method = this, args = slice.call(arguments, 1);
//     return function() {
//       var a = merge(args, arguments);
//       return __method.apply(context, a);
//     }
//   }

//   function bindAsEventListener(context) {
//     var __method = this, args = slice.call(arguments, 1);
//     return function(event) {
//       var a = update([event || window.event], args);
//       return __method.apply(context, a);
//     }
//   }

//   function curry() {
//     if (!arguments.length) return this;
//     var __method = this, args = slice.call(arguments, 0);
//     return function() {
//       var a = merge(args, arguments);
//       return __method.apply(this, a);
//     }
//   }

//   function delay(timeout) {
//     var __method = this, args = slice.call(arguments, 1);
//     timeout = timeout * 1000;
//     return window.setTimeout(function() {
//       return __method.apply(__method, args);
//     }, timeout);
//   }

//   function defer() {
//     var args = update([0.01], arguments);
//     return this.delay.apply(this, args);
//   }

//   function wrap(wrapper) {
//     var __method = this;
//     return function() {
//       var a = update([__method.bind(this)], arguments);
//       return wrapper.apply(this, a);
//     }
//   }

//   function methodize() {
//     if (this._methodized) return this._methodized;
//     var __method = this;
//     return this._methodized = function() {
//       var a = update([this], arguments);
//       return __method.apply(null, a);
//     };
//   }

//   return {
//     argumentNames:       argumentNames,
//     bind:                bind,
//     bindAsEventListener: bindAsEventListener,
//     curry:               curry,
//     delay:               delay,
//     defer:               defer,
//     wrap:                wrap,
//     methodize:           methodize
//   }
// })());



// (function(proto) {


//   function toISOString() {
//     return this.getUTCFullYear() + '-' +
//       (this.getUTCMonth() + 1).toPaddedString(2) + '-' +
//       this.getUTCDate().toPaddedString(2) + 'T' +
//       this.getUTCHours().toPaddedString(2) + ':' +
//       this.getUTCMinutes().toPaddedString(2) + ':' +
//       this.getUTCSeconds().toPaddedString(2) + 'Z';
//   }


//   function toJSON() {
//     return this.toISOString();
//   }

//   if (!proto.toISOString) proto.toISOString = toISOString;
//   if (!proto.toJSON) proto.toJSON = toJSON;

// })(Date.prototype);


// RegExp.prototype.match = RegExp.prototype.test;

// RegExp.escape = function(str) {
//   return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
// };
// var PeriodicalExecuter = Class.create({
//   initialize: function(callback, frequency) {
//     this.callback = callback;
//     this.frequency = frequency;
//     this.currentlyExecuting = false;

//     this.registerCallback();
//   },

//   registerCallback: function() {
//     this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
//   },

//   execute: function() {
//     this.callback(this);
//   },

//   stop: function() {
//     if (!this.timer) return;
//     clearInterval(this.timer);
//     this.timer = null;
//   },

//   onTimerEvent: function() {
//     if (!this.currentlyExecuting) {
//       try {
//         this.currentlyExecuting = true;
//         this.execute();
//         this.currentlyExecuting = false;
//       } catch(e) {
//         this.currentlyExecuting = false;
//         throw e;
//       }
//     }
//   }
// });
// Object.extend(String, {
//   interpret: function(value) {
//     return value == null ? '' : String(value);
//   },
//   specialChar: {
//     '\b': '\\b',
//     '\t': '\\t',
//     '\n': '\\n',
//     '\f': '\\f',
//     '\r': '\\r',
//     '\\': '\\\\'
//   }
// });

// Object.extend(String.prototype, (function() {
//   var NATIVE_JSON_PARSE_SUPPORT = window.JSON &&
//     typeof JSON.parse === 'function' &&
//     JSON.parse('{"test": true}').test;

//   function prepareReplacement(replacement) {
//     if (Object.isFunction(replacement)) return replacement;
//     var template = new Template(replacement);
//     return function(match) { return template.evaluate(match) };
//   }

//   function gsub(pattern, replacement) {
//     var result = '', source = this, match;
//     replacement = prepareReplacement(replacement);

//     if (Object.isString(pattern))
//       pattern = RegExp.escape(pattern);

//     if (!(pattern.length || pattern.source)) {
//       replacement = replacement('');
//       return replacement + source.split('').join(replacement) + replacement;
//     }

//     while (source.length > 0) {
//       if (match = source.match(pattern)) {
//         result += source.slice(0, match.index);
//         result += String.interpret(replacement(match));
//         source  = source.slice(match.index + match[0].length);
//       } else {
//         result += source, source = '';
//       }
//     }
//     return result;
//   }

//   function sub(pattern, replacement, count) {
//     replacement = prepareReplacement(replacement);
//     count = Object.isUndefined(count) ? 1 : count;

//     return this.gsub(pattern, function(match) {
//       if (--count < 0) return match[0];
//       return replacement(match);
//     });
//   }

//   function scan(pattern, iterator) {
//     this.gsub(pattern, iterator);
//     return String(this);
//   }

//   function truncate(length, truncation) {
//     length = length || 30;
//     truncation = Object.isUndefined(truncation) ? '...' : truncation;
//     return this.length > length ?
//       this.slice(0, length - truncation.length) + truncation : String(this);
//   }

//   function strip() {
//     return this.replace(/^\s+/, '').replace(/\s+$/, '');
//   }

//   function stripTags() {
//     return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
//   }

//   function stripScripts() {
//     return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
//   }

//   function extractScripts() {
//     var matchAll = new RegExp(Prototype.ScriptFragment, 'img'),
//         matchOne = new RegExp(Prototype.ScriptFragment, 'im');
//     return (this.match(matchAll) || []).map(function(scriptTag) {
//       return (scriptTag.match(matchOne) || ['', ''])[1];
//     });
//   }

//   function evalScripts() {
//     return this.extractScripts().map(function(script) { return eval(script) });
//   }

//   function escapeHTML() {
//     return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
//   }

//   function unescapeHTML() {
//     return this.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
//   }


//   function toQueryParams(separator) {
//     var match = this.strip().match(/([^?#]*)(#.*)?$/);
//     if (!match) return { };

//     return match[1].split(separator || '&').inject({ }, function(hash, pair) {
//       if ((pair = pair.split('='))[0]) {
//         var key = decodeURIComponent(pair.shift()),
//             value = pair.length > 1 ? pair.join('=') : pair[0];

//         if (value != undefined) value = decodeURIComponent(value);

//         if (key in hash) {
//           if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
//           hash[key].push(value);
//         }
//         else hash[key] = value;
//       }
//       return hash;
//     });
//   }

//   function toArray() {
//     return this.split('');
//   }

//   function succ() {
//     return this.slice(0, this.length - 1) +
//       String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
//   }

//   function times(count) {
//     return count < 1 ? '' : new Array(count + 1).join(this);
//   }

//   function camelize() {
//     return this.replace(/-+(.)?/g, function(match, chr) {
//       return chr ? chr.toUpperCase() : '';
//     });
//   }

//   function capitalize() {
//     return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
//   }

//   function underscore() {
//     return this.replace(/::/g, '/')
//                .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
//                .replace(/([a-z\d])([A-Z])/g, '$1_$2')
//                .replace(/-/g, '_')
//                .toLowerCase();
//   }

//   function dasherize() {
//     return this.replace(/_/g, '-');
//   }

//   function inspect(useDoubleQuotes) {
//     var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character) {
//       if (character in String.specialChar) {
//         return String.specialChar[character];
//       }
//       return '\\u00' + character.charCodeAt().toPaddedString(2, 16);
//     });
//     if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
//     return "'" + escapedString.replace(/'/g, '\\\'') + "'";
//   }

//   function unfilterJSON(filter) {
//     return this.replace(filter || Prototype.JSONFilter, '$1');
//   }

//   function isJSON() {
//     var str = this;
//     if (str.blank()) return false;
//     str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
//     str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
//     str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
//     return (/^[\],:{}\s]*$/).test(str);
//   }

//   function evalJSON(sanitize) {
//     var json = this.unfilterJSON(),
//         cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
//     if (cx.test(json)) {
//       json = json.replace(cx, function (a) {
//         return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
//       });
//     }
//     try {
//       if (!sanitize || json.isJSON()) return eval('(' + json + ')');
//     } catch (e) { }
//     throw new SyntaxError('Badly formed JSON string: ' + this.inspect());
//   }

//   function parseJSON() {
//     var json = this.unfilterJSON();
//     return JSON.parse(json);
//   }

//   function include(pattern) {
//     return this.indexOf(pattern) > -1;
//   }

//   function startsWith(pattern) {
//     return this.lastIndexOf(pattern, 0) === 0;
//   }

//   function endsWith(pattern) {
//     var d = this.length - pattern.length;
//     return d >= 0 && this.indexOf(pattern, d) === d;
//   }

//   function empty() {
//     return this == '';
//   }

//   function blank() {
//     return /^\s*$/.test(this);
//   }

//   function interpolate(object, pattern) {
//     return new Template(this, pattern).evaluate(object);
//   }

//   return {
//     gsub:           gsub,
//     sub:            sub,
//     scan:           scan,
//     truncate:       truncate,
//     strip:          String.prototype.trim || strip,
//     stripTags:      stripTags,
//     stripScripts:   stripScripts,
//     extractScripts: extractScripts,
//     evalScripts:    evalScripts,
//     escapeHTML:     escapeHTML,
//     unescapeHTML:   unescapeHTML,
//     toQueryParams:  toQueryParams,
//     parseQuery:     toQueryParams,
//     toArray:        toArray,
//     succ:           succ,
//     times:          times,
//     camelize:       camelize,
//     capitalize:     capitalize,
//     underscore:     underscore,
//     dasherize:      dasherize,
//     inspect:        inspect,
//     unfilterJSON:   unfilterJSON,
//     isJSON:         isJSON,
//     evalJSON:       NATIVE_JSON_PARSE_SUPPORT ? parseJSON : evalJSON,
//     include:        include,
//     startsWith:     startsWith,
//     endsWith:       endsWith,
//     empty:          empty,
//     blank:          blank,
//     interpolate:    interpolate
//   };
// })());

// var Template = Class.create({
//   initialize: function(template, pattern) {
//     this.template = template.toString();
//     this.pattern = pattern || Template.Pattern;
//   },

//   evaluate: function(object) {
//     if (object && Object.isFunction(object.toTemplateReplacements))
//       object = object.toTemplateReplacements();

//     return this.template.gsub(this.pattern, function(match) {
//       if (object == null) return (match[1] + '');

//       var before = match[1] || '';
//       if (before == '\\') return match[2];

//       var ctx = object, expr = match[3],
//           pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;

//       match = pattern.exec(expr);
//       if (match == null) return before;

//       while (match != null) {
//         var comp = match[1].startsWith('[') ? match[2].replace(/\\\\]/g, ']') : match[1];
//         ctx = ctx[comp];
//         if (null == ctx || '' == match[3]) break;
//         expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
//         match = pattern.exec(expr);
//       }

//       return before + String.interpret(ctx);
//     });
//   }
// });
// Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

// var $break = { };

// var Enumerable = (function() {
//   function each(iterator, context) {
//     var index = 0;
//     try {
//       this._each(function(value) {
//         iterator.call(context, value, index++);
//       });
//     } catch (e) {
//       if (e != $break) throw e;
//     }
//     return this;
//   }

//   function eachSlice(number, iterator, context) {
//     var index = -number, slices = [], array = this.toArray();
//     if (number < 1) return array;
//     while ((index += number) < array.length)
//       slices.push(array.slice(index, index+number));
//     return slices.collect(iterator, context);
//   }

//   function all(iterator, context) {
//     iterator = iterator || Prototype.K;
//     var result = true;
//     this.each(function(value, index) {
//       result = result && !!iterator.call(context, value, index);
//       if (!result) throw $break;
//     });
//     return result;
//   }

//   function any(iterator, context) {
//     iterator = iterator || Prototype.K;
//     var result = false;
//     this.each(function(value, index) {
//       if (result = !!iterator.call(context, value, index))
//         throw $break;
//     });
//     return result;
//   }

//   function collect(iterator, context) {
//     iterator = iterator || Prototype.K;
//     var results = [];
//     this.each(function(value, index) {
//       results.push(iterator.call(context, value, index));
//     });
//     return results;
//   }

//   function detect(iterator, context) {
//     var result;
//     this.each(function(value, index) {
//       if (iterator.call(context, value, index)) {
//         result = value;
//         throw $break;
//       }
//     });
//     return result;
//   }

//   function findAll(iterator, context) {
//     var results = [];
//     this.each(function(value, index) {
//       if (iterator.call(context, value, index))
//         results.push(value);
//     });
//     return results;
//   }

//   function grep(filter, iterator, context) {
//     iterator = iterator || Prototype.K;
//     var results = [];

//     if (Object.isString(filter))
//       filter = new RegExp(RegExp.escape(filter));

//     this.each(function(value, index) {
//       if (filter.match(value))
//         results.push(iterator.call(context, value, index));
//     });
//     return results;
//   }

//   function include(object) {
//     if (Object.isFunction(this.indexOf))
//       if (this.indexOf(object) != -1) return true;

//     var found = false;
//     this.each(function(value) {
//       if (value == object) {
//         found = true;
//         throw $break;
//       }
//     });
//     return found;
//   }

//   function inGroupsOf(number, fillWith) {
//     fillWith = Object.isUndefined(fillWith) ? null : fillWith;
//     return this.eachSlice(number, function(slice) {
//       while(slice.length < number) slice.push(fillWith);
//       return slice;
//     });
//   }

//   function inject(memo, iterator, context) {
//     this.each(function(value, index) {
//       memo = iterator.call(context, memo, value, index);
//     });
//     return memo;
//   }

//   function invoke(method) {
//     var args = $A(arguments).slice(1);
//     return this.map(function(value) {
//       return value[method].apply(value, args);
//     });
//   }

//   function max(iterator, context) {
//     iterator = iterator || Prototype.K;
//     var result;
//     this.each(function(value, index) {
//       value = iterator.call(context, value, index);
//       if (result == null || value >= result)
//         result = value;
//     });
//     return result;
//   }

//   function min(iterator, context) {
//     iterator = iterator || Prototype.K;
//     var result;
//     this.each(function(value, index) {
//       value = iterator.call(context, value, index);
//       if (result == null || value < result)
//         result = value;
//     });
//     return result;
//   }

//   function partition(iterator, context) {
//     iterator = iterator || Prototype.K;
//     var trues = [], falses = [];
//     this.each(function(value, index) {
//       (iterator.call(context, value, index) ?
//         trues : falses).push(value);
//     });
//     return [trues, falses];
//   }

//   function pluck(property) {
//     var results = [];
//     this.each(function(value) {
//       results.push(value[property]);
//     });
//     return results;
//   }

//   function reject(iterator, context) {
//     var results = [];
//     this.each(function(value, index) {
//       if (!iterator.call(context, value, index))
//         results.push(value);
//     });
//     return results;
//   }

//   function sortBy(iterator, context) {
//     return this.map(function(value, index) {
//       return {
//         value: value,
//         criteria: iterator.call(context, value, index)
//       };
//     }).sort(function(left, right) {
//       var a = left.criteria, b = right.criteria;
//       return a < b ? -1 : a > b ? 1 : 0;
//     }).pluck('value');
//   }

//   function toArray() {
//     return this.map();
//   }

//   function zip() {
//     var iterator = Prototype.K, args = $A(arguments);
//     if (Object.isFunction(args.last()))
//       iterator = args.pop();

//     var collections = [this].concat(args).map($A);
//     return this.map(function(value, index) {
//       return iterator(collections.pluck(index));
//     });
//   }

//   function size() {
//     return this.toArray().length;
//   }

//   function inspect() {
//     return '#<Enumerable:' + this.toArray().inspect() + '>';
//   }









//   return {
//     each:       each,
//     eachSlice:  eachSlice,
//     all:        all,
//     every:      all,
//     any:        any,
//     some:       any,
//     collect:    collect,
//     map:        collect,
//     detect:     detect,
//     findAll:    findAll,
//     select:     findAll,
//     filter:     findAll,
//     grep:       grep,
//     include:    include,
//     member:     include,
//     inGroupsOf: inGroupsOf,
//     inject:     inject,
//     invoke:     invoke,
//     max:        max,
//     min:        min,
//     partition:  partition,
//     pluck:      pluck,
//     reject:     reject,
//     sortBy:     sortBy,
//     toArray:    toArray,
//     entries:    toArray,
//     zip:        zip,
//     size:       size,
//     inspect:    inspect,
//     find:       detect
//   };
// })();

// function $A(iterable) {
//   if (!iterable) return [];
//   if ('toArray' in Object(iterable)) return iterable.toArray();
//   var length = iterable.length || 0, results = new Array(length);
//   while (length--) results[length] = iterable[length];
//   return results;
// }


// function $w(string) {
//   if (!Object.isString(string)) return [];
//   string = string.strip();
//   return string ? string.split(/\s+/) : [];
// }

// Array.from = $A;


// (function() {
//   var arrayProto = Array.prototype,
//       slice = arrayProto.slice,
//       _each = arrayProto.forEach; // use native browser JS 1.6 implementation if available

//   function each(iterator, context) {
//     for (var i = 0, length = this.length >>> 0; i < length; i++) {
//       if (i in this) iterator.call(context, this[i], i, this);
//     }
//   }
//   if (!_each) _each = each;

//   function clear() {
//     this.length = 0;
//     return this;
//   }

//   function first() {
//     return this[0];
//   }

//   function last() {
//     return this[this.length - 1];
//   }

//   function compact() {
//     return this.select(function(value) {
//       return value != null;
//     });
//   }

//   function flatten() {
//     return this.inject([], function(array, value) {
//       if (Object.isArray(value))
//         return array.concat(value.flatten());
//       array.push(value);
//       return array;
//     });
//   }

//   function without() {
//     var values = slice.call(arguments, 0);
//     return this.select(function(value) {
//       return !values.include(value);
//     });
//   }

//   function reverse(inline) {
//     return (inline === false ? this.toArray() : this)._reverse();
//   }

//   function uniq(sorted) {
//     return this.inject([], function(array, value, index) {
//       if (0 == index || (sorted ? array.last() != value : !array.include(value)))
//         array.push(value);
//       return array;
//     });
//   }

//   function intersect(array) {
//     return this.uniq().findAll(function(item) {
//       return array.detect(function(value) { return item === value });
//     });
//   }


//   function clone() {
//     return slice.call(this, 0);
//   }

//   function size() {
//     return this.length;
//   }

//   function inspect() {
//     return '[' + this.map(Object.inspect).join(', ') + ']';
//   }

//   function indexOf(item, i) {
//     i || (i = 0);
//     var length = this.length;
//     if (i < 0) i = length + i;
//     for (; i < length; i++)
//       if (this[i] === item) return i;
//     return -1;
//   }

//   function lastIndexOf(item, i) {
//     i = isNaN(i) ? this.length : (i < 0 ? this.length + i : i) + 1;
//     var n = this.slice(0, i).reverse().indexOf(item);
//     return (n < 0) ? n : i - n - 1;
//   }

//   function concat() {
//     var array = slice.call(this, 0), item;
//     for (var i = 0, length = arguments.length; i < length; i++) {
//       item = arguments[i];
//       if (Object.isArray(item) && !('callee' in item)) {
//         for (var j = 0, arrayLength = item.length; j < arrayLength; j++)
//           array.push(item[j]);
//       } else {
//         array.push(item);
//       }
//     }
//     return array;
//   }

//   Object.extend(arrayProto, Enumerable);

//   if (!arrayProto._reverse)
//     arrayProto._reverse = arrayProto.reverse;

//   Object.extend(arrayProto, {
//     _each:     _each,
//     clear:     clear,
//     first:     first,
//     last:      last,
//     compact:   compact,
//     flatten:   flatten,
//     without:   without,
//     reverse:   reverse,
//     uniq:      uniq,
//     intersect: intersect,
//     clone:     clone,
//     toArray:   clone,
//     size:      size,
//     inspect:   inspect
//   });

//   var CONCAT_ARGUMENTS_BUGGY = (function() {
//     return [].concat(arguments)[0][0] !== 1;
//   })(1,2)

//   if (CONCAT_ARGUMENTS_BUGGY) arrayProto.concat = concat;

//   if (!arrayProto.indexOf) arrayProto.indexOf = indexOf;
//   if (!arrayProto.lastIndexOf) arrayProto.lastIndexOf = lastIndexOf;
// })();
// function $H(object) {
//   return new Hash(object);
// };

// var Hash = Class.create(Enumerable, (function() {
//   function initialize(object) {
//     this._object = Object.isHash(object) ? object.toObject() : Object.clone(object);
//   }


//   function _each(iterator) {
//     for (var key in this._object) {
//       var value = this._object[key], pair = [key, value];
//       pair.key = key;
//       pair.value = value;
//       iterator(pair);
//     }
//   }

//   function set(key, value) {
//     return this._object[key] = value;
//   }

//   function get(key) {
//     if (this._object[key] !== Object.prototype[key])
//       return this._object[key];
//   }

//   function unset(key) {
//     var value = this._object[key];
//     delete this._object[key];
//     return value;
//   }

//   function toObject() {
//     return Object.clone(this._object);
//   }



//   function keys() {
//     return this.pluck('key');
//   }

//   function values() {
//     return this.pluck('value');
//   }

//   function index(value) {
//     var match = this.detect(function(pair) {
//       return pair.value === value;
//     });
//     return match && match.key;
//   }

//   function merge(object) {
//     return this.clone().update(object);
//   }

//   function update(object) {
//     return new Hash(object).inject(this, function(result, pair) {
//       result.set(pair.key, pair.value);
//       return result;
//     });
//   }

//   function toQueryPair(key, value) {
//     if (Object.isUndefined(value)) return key;
//     //Applied the fix for KN-2986, copied from prototype version 1.7.1. 
//     //the way it serialize form values to be more accurate to the way browsers work that line breaks (\n) are normalized to \r\n.
//     value = String.interpret(value);
//     value = value.gsub(/(\r)?\n/, '\r\n');
//     value = encodeURIComponent(value);
//     value = value.gsub(/%20/, '+');
//     return key + '=' + value;
//   }

//   function toQueryString() {
//     return this.inject([], function(results, pair) {
//       var key = encodeURIComponent(pair.key), values = pair.value;

//       if (values && typeof values == 'object') {
//         if (Object.isArray(values)) {
//           var queryValues = [];
//           for (var i = 0, len = values.length, value; i < len; i++) {
//             value = values[i];
//             queryValues.push(toQueryPair(key, value));
//           }
//           return results.concat(queryValues);
//         }
//       } else results.push(toQueryPair(key, values));
//       return results;
//     }).join('&');
//   }

//   function inspect() {
//     return '#<Hash:{' + this.map(function(pair) {
//       return pair.map(Object.inspect).join(': ');
//     }).join(', ') + '}>';
//   }

//   function clone() {
//     return new Hash(this);
//   }

//   return {
//     initialize:             initialize,
//     _each:                  _each,
//     set:                    set,
//     get:                    get,
//     unset:                  unset,
//     toObject:               toObject,
//     toTemplateReplacements: toObject,
//     keys:                   keys,
//     values:                 values,
//     index:                  index,
//     merge:                  merge,
//     update:                 update,
//     toQueryString:          toQueryString,
//     inspect:                inspect,
//     toJSON:                 toObject,
//     clone:                  clone
//   };
// })());

// Hash.from = $H;
// Object.extend(Number.prototype, (function() {
//   function toColorPart() {
//     return this.toPaddedString(2, 16);
//   }

//   function succ() {
//     return this + 1;
//   }

//   function times(iterator, context) {
//     $R(0, this, true).each(iterator, context);
//     return this;
//   }

//   function toPaddedString(length, radix) {
//     var string = this.toString(radix || 10);
//     return '0'.times(length - string.length) + string;
//   }

//   function abs() {
//     return Math.abs(this);
//   }

//   function round() {
//     return Math.round(this);
//   }

//   function ceil() {
//     return Math.ceil(this);
//   }

//   function floor() {
//     return Math.floor(this);
//   }

//   return {
//     toColorPart:    toColorPart,
//     succ:           succ,
//     times:          times,
//     toPaddedString: toPaddedString,
//     abs:            abs,
//     round:          round,
//     ceil:           ceil,
//     floor:          floor
//   };
// })());

// function $R(start, end, exclusive) {
//   return new ObjectRange(start, end, exclusive);
// }

// var ObjectRange = Class.create(Enumerable, (function() {
//   function initialize(start, end, exclusive) {
//     this.start = start;
//     this.end = end;
//     this.exclusive = exclusive;
//   }

//   function _each(iterator) {
//     var value = this.start;
//     while (this.include(value)) {
//       iterator(value);
//       value = value.succ();
//     }
//   }

//   function include(value) {
//     if (value < this.start)
//       return false;
//     if (this.exclusive)
//       return value < this.end;
//     return value <= this.end;
//   }

//   return {
//     initialize: initialize,
//     _each:      _each,
//     include:    include
//   };
// })());



// var Ajax = {
//   getTransport: function() {
//     return Try.these(
//       function() {return new XMLHttpRequest()},
//       function() {return new ActiveXObject('Msxml2.XMLHTTP')},
//       function() {return new ActiveXObject('Microsoft.XMLHTTP')}
//     ) || false;
//   },

//   activeRequestCount: 0
// };

// Ajax.Responders = {
//   responders: [],

//   _each: function(iterator) {
//     this.responders._each(iterator);
//   },

//   register: function(responder) {
//     if (!this.include(responder))
//       this.responders.push(responder);
//   },

//   unregister: function(responder) {
//     this.responders = this.responders.without(responder);
//   },

//   dispatch: function(callback, request, transport, json) {
//     this.each(function(responder) {
//       if (Object.isFunction(responder[callback])) {
//         try {
//           responder[callback].apply(responder, [request, transport, json]);
//         } catch (e) { }
//       }
//     });
//   }
// };

// Object.extend(Ajax.Responders, Enumerable);

// Ajax.Responders.register({
//   onCreate:   function() { Ajax.activeRequestCount++ },
//   onComplete: function() { Ajax.activeRequestCount-- }
// });
// Ajax.Base = Class.create({
//   initialize: function(options) {
//     this.options = {
//       method:       'post',
//       asynchronous: true,
//       contentType:  'application/x-www-form-urlencoded',
//       encoding:     'UTF-8',
//       parameters:   '',
//       evalJSON:     true,
//       evalJS:       true
//     };
//     Object.extend(this.options, options || { });

//     this.options.method = this.options.method.toLowerCase();

//     if (Object.isHash(this.options.parameters))
//       this.options.parameters = this.options.parameters.toObject();
//   }
// });
// Ajax.Request = Class.create(Ajax.Base, {
//   _complete: false,

//   initialize: function($super, url, options) {
//     $super(options);
//     this.transport = Ajax.getTransport();
//     this.request(url);
//   },

//   request: function(url) {
//     this.url = url;
//     this.method = this.options.method;
//     var params = Object.isString(this.options.parameters) ?
//           this.options.parameters :
//           Object.toQueryString(this.options.parameters);

//     if (!['get', 'post'].include(this.method)) {
//       params += (params ? '&' : '') + "_method=" + this.method;
//       this.method = 'post';
//     }

//     if (params && this.method === 'get') {
//       this.url += (this.url.include('?') ? '&' : '?') + params;
//     }

//     this.parameters = params.toQueryParams();

//     try {
//       var response = new Ajax.Response(this);
//       if (this.options.onCreate) this.options.onCreate(response);
//       Ajax.Responders.dispatch('onCreate', this, response);

//       this.transport.open(this.method.toUpperCase(), this.url,
//         this.options.asynchronous);

//       if (this.options.asynchronous) this.respondToReadyState.bind(this).defer(1);

//       this.transport.onreadystatechange = this.onStateChange.bind(this);
//       this.setRequestHeaders();

//       this.body = this.method == 'post' ? (this.options.postBody || params) : null;
//       this.transport.send(this.body);

//       /* Force Firefox to handle ready state 4 for synchronous requests */
//       if (!this.options.asynchronous && this.transport.overrideMimeType)
//         this.onStateChange();

//     }
//     catch (e) {
//       this.dispatchException(e);
//     }
//   },

//   onStateChange: function() {
//     var readyState = this.transport.readyState;
//     if (readyState > 1 && !((readyState == 4) && this._complete))
//       this.respondToReadyState(this.transport.readyState);
//   },

//   setRequestHeaders: function() {
//     var headers = {
//       'X-Requested-With': 'XMLHttpRequest',
//       'X-Prototype-Version': Prototype.Version,
//       'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
//     };

//     if (this.method == 'post') {
//       headers['Content-type'] = this.options.contentType +
//         (this.options.encoding ? '; charset=' + this.options.encoding : '');

//       /* Force "Connection: close" for older Mozilla browsers to work
//        * around a bug where XMLHttpRequest sends an incorrect
//        * Content-length header. See Mozilla Bugzilla #246651.
//        */
//       if (this.transport.overrideMimeType &&
//           (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
//             headers['Connection'] = 'close';
//     }

//     if (typeof this.options.requestHeaders == 'object') {
//       var extras = this.options.requestHeaders;

//       if (Object.isFunction(extras.push))
//         for (var i = 0, length = extras.length; i < length; i += 2)
//           headers[extras[i]] = extras[i+1];
//       else
//         $H(extras).each(function(pair) { headers[pair.key] = pair.value });
//     }

//     for (var name in headers)
//       this.transport.setRequestHeader(name, headers[name]);
//   },

//   success: function() {
//     var status = this.getStatus();
//     return (status >= 200 && status < 300) || status == 304 || (status === 0 && this.transport.responseText !== '');
//   },

//   getStatus: function() {
//     try {
//       if (this.transport.status === 1223) return 204;
//       return this.transport.status || 0;
//     } catch (e) { return 0 }
//   },

//   respondToReadyState: function(readyState) {
//     var state = Ajax.Request.Events[readyState], response = new Ajax.Response(this);

//     if (state == 'Complete') {
//       try {
//         this._complete = true;
//         (this.options['on' + response.status]
//          || this.options['on' + (this.success() ? 'Success' : 'Failure')]
//          || Prototype.emptyFunction)(response, response.headerJSON);
//       } catch (e) {
//         this.dispatchException(e);
//       }

//       var contentType = response.getHeader('Content-type');
//       if (this.options.evalJS == 'force'
//           || (this.options.evalJS && this.isSameOrigin() && contentType
//           && contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
//         this.evalResponse();
//     }

//     try {
//       (this.options['on' + state] || Prototype.emptyFunction)(response, response.headerJSON);
//       Ajax.Responders.dispatch('on' + state, this, response, response.headerJSON);
//     } catch (e) {
//       this.dispatchException(e);
//     }

//     if (state == 'Complete') {
//       this.transport.onreadystatechange = Prototype.emptyFunction;
//     }
//   },

//   isSameOrigin: function() {
//     var m = this.url.match(/^\s*https?:\/\/[^\/]*/);
//     return !m || (m[0] == '#{protocol}//#{domain}#{port}'.interpolate({
//       protocol: location.protocol,
//       domain: document.domain,
//       port: location.port ? ':' + location.port : ''
//     }));
//   },

//   getHeader: function(name) {
//     try {
//       return this.transport.getResponseHeader(name) || null;
//     } catch (e) { return null; }
//   },

//   evalResponse: function() {
//     try {
//       return eval((this.transport.responseText || '').unfilterJSON());
//     } catch (e) {
//       this.dispatchException(e);
//     }
//   },

//   dispatchException: function(exception) {
//     (this.options.onException || Prototype.emptyFunction)(this, exception);
//     Ajax.Responders.dispatch('onException', this, exception);
//   }
// });

// Ajax.Request.Events =
//   ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];








// Ajax.Response = Class.create({
//   initialize: function(request){
//     this.request = request;
//     var transport  = this.transport  = request.transport,
//         readyState = this.readyState = transport.readyState;

//     if ((readyState > 2 && !Prototype.Browser.IE) || readyState == 4) {
//       this.status       = this.getStatus();
//       this.statusText   = this.getStatusText();
//       this.responseText = String.interpret(transport.responseText);
//       this.headerJSON   = this._getHeaderJSON();
//     }

//     if (readyState == 4) {
//       var xml = transport.responseXML;
//       this.responseXML  = Object.isUndefined(xml) ? null : xml;
//       this.responseJSON = this._getResponseJSON();
//     }
//   },

//   status:      0,

//   statusText: '',

//   getStatus: Ajax.Request.prototype.getStatus,

//   getStatusText: function() {
//     try {
//       return this.transport.statusText || '';
//     } catch (e) { return '' }
//   },

//   getHeader: Ajax.Request.prototype.getHeader,

//   getAllHeaders: function() {
//     try {
//       return this.getAllResponseHeaders();
//     } catch (e) { return null }
//   },

//   getResponseHeader: function(name) {
//     return this.transport.getResponseHeader(name);
//   },

//   getAllResponseHeaders: function() {
//     return this.transport.getAllResponseHeaders();
//   },

//   _getHeaderJSON: function() {
//     var json = this.getHeader('X-JSON');
//     if (!json) return null;
//     json = decodeURIComponent(escape(json));
//     try {
//       return json.evalJSON(this.request.options.sanitizeJSON ||
//         !this.request.isSameOrigin());
//     } catch (e) {
//       this.request.dispatchException(e);
//     }
//   },

//   _getResponseJSON: function() {
//     var options = this.request.options;
//     if (!options.evalJSON || (options.evalJSON != 'force' &&
//       !(this.getHeader('Content-type') || '').include('application/json')) ||
//         this.responseText.blank())
//           return null;
//     try {
//       return this.responseText.evalJSON(options.sanitizeJSON ||
//         !this.request.isSameOrigin());
//     } catch (e) {
//       this.request.dispatchException(e);
//     }
//   }
// });

// Ajax.Updater = Class.create(Ajax.Request, {
//   initialize: function($super, container, url, options) {
//     this.container = {
//       success: (container.success || container),
//       failure: (container.failure || (container.success ? null : container))
//     };

//     options = Object.clone(options);
//     var onComplete = options.onComplete;
//     options.onComplete = (function(response, json) {
//       this.updateContent(response.responseText);
//       if (Object.isFunction(onComplete)) onComplete(response, json);
//     }).bind(this);

//     $super(url, options);
//   },

//   updateContent: function(responseText) {
//     var receiver = this.container[this.success() ? 'success' : 'failure'],
//         options = this.options;

//     if (!options.evalScripts) responseText = responseText.stripScripts();

//     if (receiver = $(receiver)) {
//       if (options.insertion) {
//         if (Object.isString(options.insertion)) {
//           var insertion = { }; insertion[options.insertion] = responseText;
//           receiver.insert(insertion);
//         }
//         else options.insertion(receiver, responseText);
//       }
//       else receiver.update(responseText);
//     }
//   }
// });

// Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
//   initialize: function($super, container, url, options) {
//     $super(options);
//     this.onComplete = this.options.onComplete;

//     this.frequency = (this.options.frequency || 2);
//     this.decay = (this.options.decay || 1);

//     this.updater = { };
//     this.container = container;
//     this.url = url;

//     this.start();
//   },

//   start: function() {
//     this.options.onComplete = this.updateComplete.bind(this);
//     this.onTimerEvent();
//   },

//   stop: function() {
//     this.updater.options.onComplete = undefined;
//     clearTimeout(this.timer);
//     (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
//   },

//   updateComplete: function(response) {
//     if (this.options.decay) {
//       this.decay = (response.responseText == this.lastText ?
//         this.decay * this.options.decay : 1);

//       this.lastText = response.responseText;
//     }
//     this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);
//   },

//   onTimerEvent: function() {
//     this.updater = new Ajax.Updater(this.container, this.url, this.options);
//   }
// });


// function $(element) {
//   if (arguments.length > 1) {
//     for (var i = 0, elements = [], length = arguments.length; i < length; i++)
//       elements.push($(arguments[i]));
//     return elements;
//   }
//   if (Object.isString(element))
//     element = document.getElementById(element);
//   return Element.extend(element);
// }

// if (Prototype.BrowserFeatures.XPath) {
//   document._getElementsByXPath = function(expression, parentElement) {
//     var results = [];
//     var query = document.evaluate(expression, $(parentElement) || document,
//       null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//     for (var i = 0, length = query.snapshotLength; i < length; i++)
//       results.push(Element.extend(query.snapshotItem(i)));
//     return results;
//   };
// }

// /*--------------------------------------------------------------------------*/

// if (!Node) var Node = { };

// if (!Node.ELEMENT_NODE) {
//   Object.extend(Node, {
//     ELEMENT_NODE: 1,
//     ATTRIBUTE_NODE: 2,
//     TEXT_NODE: 3,
//     CDATA_SECTION_NODE: 4,
//     ENTITY_REFERENCE_NODE: 5,
//     ENTITY_NODE: 6,
//     PROCESSING_INSTRUCTION_NODE: 7,
//     COMMENT_NODE: 8,
//     DOCUMENT_NODE: 9,
//     DOCUMENT_TYPE_NODE: 10,
//     DOCUMENT_FRAGMENT_NODE: 11,
//     NOTATION_NODE: 12
//   });
// }



// (function(global) {
//   function shouldUseCache(tagName, attributes) {
//     if (tagName === 'select') return false;
//     if ('type' in attributes) return false;
//     return true;
//   }

//   var HAS_EXTENDED_CREATE_ELEMENT_SYNTAX = (function(){
//     try {
//       var el = document.createElement('<input name="x">');
//       return el.tagName.toLowerCase() === 'input' && el.name === 'x';
//     }
//     catch(err) {
//       return false;
//     }
//   })();

//   var element = global.Element;

//   global.Element = function(tagName, attributes) {
//     attributes = attributes || { };
//     tagName = tagName.toLowerCase();
//     var cache = Element.cache;

//     if (HAS_EXTENDED_CREATE_ELEMENT_SYNTAX && attributes.name) {
//       tagName = '<' + tagName + ' name="' + attributes.name + '">';
//       delete attributes.name;
//       return Element.writeAttribute(document.createElement(tagName), attributes);
//     }

//     if (!cache[tagName]) cache[tagName] = Element.extend(document.createElement(tagName));

//     var node = shouldUseCache(tagName, attributes) ?
//      cache[tagName].cloneNode(false) : document.createElement(tagName);

//     return Element.writeAttribute(node, attributes);
//   };

//   Object.extend(global.Element, element || { });
//   if (element) global.Element.prototype = element.prototype;

// })(this);

// Element.idCounter = 1;
// Element.cache = { };

// Element._purgeElement = function(element) {
//   var uid = element._prototypeUID;
//   if (uid) {
//     Element.stopObserving(element);
//     element._prototypeUID = void 0;
//     delete Element.Storage[uid];
//   }
// }

// Element.Methods = {
//   visible: function(element) {
//     return $(element).style.display != 'none';
//   },

//   toggle: function(element) {
//     element = $(element);
//     Element[Element.visible(element) ? 'hide' : 'show'](element);
//     return element;
//   },

//   hide: function(element) {
//     element = $(element);
//     element.style.display = 'none';
//     return element;
//   },

//   show: function(element) {
//     element = $(element);
//     element.style.display = '';
//     return element;
//   },

//   remove: function(element) {
//     element = $(element);
//     element.parentNode.removeChild(element);
//     return element;
//   },

//   update: (function(){

//     var SELECT_ELEMENT_INNERHTML_BUGGY = (function(){
//       var el = document.createElement("select"),
//           isBuggy = true;
//       el.innerHTML = "<option value=\"test\">test</option>";
//       if (el.options && el.options[0]) {
//         isBuggy = el.options[0].nodeName.toUpperCase() !== "OPTION";
//       }
//       el = null;
//       return isBuggy;
//     })();

//     var TABLE_ELEMENT_INNERHTML_BUGGY = (function(){
//       try {
//         var el = document.createElement("table");
//         if (el && el.tBodies) {
//           el.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
//           var isBuggy = typeof el.tBodies[0] == "undefined";
//           el = null;
//           return isBuggy;
//         }
//       } catch (e) {
//         return true;
//       }
//     })();

//     var LINK_ELEMENT_INNERHTML_BUGGY = (function() {
//       try {
//         var el = document.createElement('div');
//         el.innerHTML = "<link>";
//         var isBuggy = (el.childNodes.length === 0);
//         el = null;
//         return isBuggy;
//       } catch(e) {
//         return true;
//       }
//     })();

//     var ANY_INNERHTML_BUGGY = SELECT_ELEMENT_INNERHTML_BUGGY ||
//      TABLE_ELEMENT_INNERHTML_BUGGY || LINK_ELEMENT_INNERHTML_BUGGY;

//     var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING = (function () {
//       var s = document.createElement("script"),
//           isBuggy = false;
//       try {
//         s.appendChild(document.createTextNode(""));
//         isBuggy = !s.firstChild ||
//           s.firstChild && s.firstChild.nodeType !== 3;
//       } catch (e) {
//         isBuggy = true;
//       }
//       s = null;
//       return isBuggy;
//     })();


//     function update(element, content) {
//       element = $(element);
//       var purgeElement = Element._purgeElement;

//       var descendants = element.getElementsByTagName('*'),
//        i = descendants.length;
//       while (i--) purgeElement(descendants[i]);

//       if (content && content.toElement)
//         content = content.toElement();

//       if (Object.isElement(content))
//         return element.update().insert(content);

//       content = Object.toHTML(content);

//       var tagName = element.tagName.toUpperCase();

//       if (tagName === 'SCRIPT' && SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING) {
//         element.text = content;
//         return element;
//       }

//       if (ANY_INNERHTML_BUGGY) {
//         if (tagName in Element._insertionTranslations.tags) {
//           while (element.firstChild) {
//             element.removeChild(element.firstChild);
//           }
//           Element._getContentFromAnonymousElement(tagName, content.stripScripts())
//             .each(function(node) {
//               element.appendChild(node)
//             });
//         } else if (LINK_ELEMENT_INNERHTML_BUGGY && Object.isString(content) && content.indexOf('<link') > -1) {
//           while (element.firstChild) {
//             element.removeChild(element.firstChild);
//           }
//           var nodes = Element._getContentFromAnonymousElement(tagName, content.stripScripts(), true);
//           nodes.each(function(node) { element.appendChild(node) });
//         }
//         else {
//           element.innerHTML = content.stripScripts();
//         }
//       }
//       else {
//         element.innerHTML = content.stripScripts();
//       }

//       content.evalScripts.bind(content).defer();
//       return element;
//     }

//     return update;
//   })(),

//   replace: function(element, content) {
//     element = $(element);
//     if (content && content.toElement) content = content.toElement();
//     else if (!Object.isElement(content)) {
//       content = Object.toHTML(content);
//       var range = element.ownerDocument.createRange();
//       range.selectNode(element);
//       content.evalScripts.bind(content).defer();
//       content = range.createContextualFragment(content.stripScripts());
//     }
//     element.parentNode.replaceChild(content, element);
//     return element;
//   },

//   insert: function(element, insertions) {
//     element = $(element);

//     if (Object.isString(insertions) || Object.isNumber(insertions) ||
//         Object.isElement(insertions) || (insertions && (insertions.toElement || insertions.toHTML)))
//           insertions = {bottom:insertions};

//     var content, insert, tagName, childNodes;

//     for (var position in insertions) {
//       content  = insertions[position];
//       position = position.toLowerCase();
//       insert = Element._insertionTranslations[position];

//       if (content && content.toElement) content = content.toElement();
//       if (Object.isElement(content)) {
//         insert(element, content);
//         continue;
//       }

//       content = Object.toHTML(content);

//       tagName = ((position == 'before' || position == 'after')
//         ? element.parentNode : element).tagName.toUpperCase();

//       childNodes = Element._getContentFromAnonymousElement(tagName, content.stripScripts());

//       if (position == 'top' || position == 'after') childNodes.reverse();
//       childNodes.each(insert.curry(element));

//       content.evalScripts.bind(content).defer();
//     }

//     return element;
//   },

//   wrap: function(element, wrapper, attributes) {
//     element = $(element);
//     if (Object.isElement(wrapper))
//       $(wrapper).writeAttribute(attributes || { });
//     else if (Object.isString(wrapper)) wrapper = new Element(wrapper, attributes);
//     else wrapper = new Element('div', wrapper);
//     if (element.parentNode)
//       element.parentNode.replaceChild(wrapper, element);
//     wrapper.appendChild(element);
//     return wrapper;
//   },

//   inspect: function(element) {
//     element = $(element);
//     var result = '<' + element.tagName.toLowerCase();
//     $H({'id': 'id', 'className': 'class'}).each(function(pair) {
//       var property = pair.first(),
//           attribute = pair.last(),
//           value = (element[property] || '').toString();
//       if (value) result += ' ' + attribute + '=' + value.inspect(true);
//     });
//     return result + '>';
//   },

//   recursivelyCollect: function(element, property, maximumLength) {
//     element = $(element);
//     maximumLength = maximumLength || -1;
//     var elements = [];

//     while (element = element[property]) {
//       if (element.nodeType == 1)
//         elements.push(Element.extend(element));
//       if (elements.length == maximumLength)
//         break;
//     }

//     return elements;
//   },

//   ancestors: function(element) {
//     return Element.recursivelyCollect(element, 'parentNode');
//   },

//   descendants: function(element) {
//     return Element.select(element, "*");
//   },

//   firstDescendant: function(element) {
//     element = $(element).firstChild;
//     while (element && element.nodeType != 1) element = element.nextSibling;
//     return $(element);
//   },

//   immediateDescendants: function(element) {
//     var results = [], child = $(element).firstChild;
//     while (child) {
//       if (child.nodeType === 1) {
//         results.push(Element.extend(child));
//       }
//       child = child.nextSibling;
//     }
//     return results;
//   },

//   previousSiblings: function(element, maximumLength) {
//     return Element.recursivelyCollect(element, 'previousSibling');
//   },

//   nextSiblings: function(element) {
//     return Element.recursivelyCollect(element, 'nextSibling');
//   },

//   siblings: function(element) {
//     element = $(element);
//     return Element.previousSiblings(element).reverse()
//       .concat(Element.nextSiblings(element));
//   },

//   match: function(element, selector) {
//     element = $(element);
//     if (Object.isString(selector))
//       return Prototype.Selector.match(element, selector);
//     return selector.match(element);
//   },

//   up: function(element, expression, index) {
//     element = $(element);
//     if (arguments.length == 1) return $(element.parentNode);
//     var ancestors = Element.ancestors(element);
//     return Object.isNumber(expression) ? ancestors[expression] :
//       Prototype.Selector.find(ancestors, expression, index);
//   },

//   down: function(element, expression, index) {
//     element = $(element);
//     if (arguments.length == 1) return Element.firstDescendant(element);
//     return Object.isNumber(expression) ? Element.descendants(element)[expression] :
//       Element.select(element, expression)[index || 0];
//   },

//   previous: function(element, expression, index) {
//     element = $(element);
//     if (Object.isNumber(expression)) index = expression, expression = false;
//     if (!Object.isNumber(index)) index = 0;

//     if (expression) {
//       return Prototype.Selector.find(element.previousSiblings(), expression, index);
//     } else {
//       return element.recursivelyCollect("previousSibling", index + 1)[index];
//     }
//   },

//   next: function(element, expression, index) {
//     element = $(element);
//     if (Object.isNumber(expression)) index = expression, expression = false;
//     if (!Object.isNumber(index)) index = 0;

//     if (expression) {
//       return Prototype.Selector.find(element.nextSiblings(), expression, index);
//     } else {
//       var maximumLength = Object.isNumber(index) ? index + 1 : 1;
//       return element.recursivelyCollect("nextSibling", index + 1)[index];
//     }
//   },


//   select: function(element) {
//     element = $(element);
//     var expressions = Array.prototype.slice.call(arguments, 1).join(', ');
//     return Prototype.Selector.select(expressions, element);
//   },

//   adjacent: function(element) {
//     element = $(element);
//     var expressions = Array.prototype.slice.call(arguments, 1).join(', ');
//     return Prototype.Selector.select(expressions, element.parentNode).without(element);
//   },

//   identify: function(element) {
//     element = $(element);
//     var id = Element.readAttribute(element, 'id');
//     if (id) return id;
//     do { id = 'anonymous_element_' + Element.idCounter++ } while ($(id));
//     Element.writeAttribute(element, 'id', id);
//     return id;
//   },

//   readAttribute: function(element, name) {
//     element = $(element);
//     if (Prototype.Browser.IE) {
//       var t = Element._attributeTranslations.read;
//       if (t.values[name]) return t.values[name](element, name);
//       if (t.names[name]) name = t.names[name];
//       if (name.include(':')) {
//         return (!element.attributes || !element.attributes[name]) ? null :
//          element.attributes[name].value;
//       }
//     }
//     return element.getAttribute(name);
//   },

//   writeAttribute: function(element, name, value) {
//     element = $(element);
//     var attributes = { }, t = Element._attributeTranslations.write;

//     if (typeof name == 'object') attributes = name;
//     else attributes[name] = Object.isUndefined(value) ? true : value;

//     for (var attr in attributes) {
//       name = t.names[attr] || attr;
//       value = attributes[attr];
//       if (t.values[attr]) name = t.values[attr](element, value);
//       if (value === false || value === null)
//         element.removeAttribute(name);
//       else if (value === true)
//         element.setAttribute(name, name);
//       else element.setAttribute(name, value);
//     }
//     return element;
//   },

//   getHeight: function(element) {
//     return Element.getDimensions(element).height;
//   },

//   getWidth: function(element) {
//     return Element.getDimensions(element).width;
//   },

//   classNames: function(element) {
//     return new Element.ClassNames(element);
//   },

//   hasClassName: function(element, className) {
//     if (!(element = $(element))) return;
//     var elementClassName = element.className;
//     return (elementClassName.length > 0 && (elementClassName == className ||
//       new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
//   },

//   addClassName: function(element, className) {
//     if (!(element = $(element))) return;
//     if (!Element.hasClassName(element, className))
//       element.className += (element.className ? ' ' : '') + className;
//     return element;
//   },

//   removeClassName: function(element, className) {
//     if (!(element = $(element))) return;
//     element.className = element.className.replace(
//       new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').strip();
//     return element;
//   },

//   toggleClassName: function(element, className) {
//     if (!(element = $(element))) return;
//     return Element[Element.hasClassName(element, className) ?
//       'removeClassName' : 'addClassName'](element, className);
//   },

//   cleanWhitespace: function(element) {
//     element = $(element);
//     var node = element.firstChild;
//     while (node) {
//       var nextNode = node.nextSibling;
//       if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
//         element.removeChild(node);
//       node = nextNode;
//     }
//     return element;
//   },

//   empty: function(element) {
//     return $(element).innerHTML.blank();
//   },

//   descendantOf: function(element, ancestor) {
//     element = $(element), ancestor = $(ancestor);

//     if (element.compareDocumentPosition)
//       return (element.compareDocumentPosition(ancestor) & 8) === 8;

//     if (ancestor.contains)
//       return ancestor.contains(element) && ancestor !== element;

//     while (element = element.parentNode)
//       if (element == ancestor) return true;

//     return false;
//   },

//   scrollTo: function(element) {
//     element = $(element);
//     var pos = Element.cumulativeOffset(element);
//     window.scrollTo(pos[0], pos[1]);
//     return element;
//   },

//   getStyle: function(element, style) {
//     element = $(element);
//     style = style == 'float' ? 'cssFloat' : style.camelize();
//     var value = element.style[style];
//     if (!value || value == 'auto') {
//       var css = document.defaultView.getComputedStyle(element, null);
//       value = css ? css[style] : null;
//     }
//     if (style == 'opacity') return value ? parseFloat(value) : 1.0;
//     return value == 'auto' ? null : value;
//   },

//   getOpacity: function(element) {
//     return $(element).getStyle('opacity');
//   },

//   setStyle: function(element, styles) {
//     element = $(element);
//     var elementStyle = element.style, match;
//     if (Object.isString(styles)) {
//       element.style.cssText += ';' + styles;
//       return styles.include('opacity') ?
//         element.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]) : element;
//     }
//     for (var property in styles)
//       if (property == 'opacity') element.setOpacity(styles[property]);
//       else
//         elementStyle[(property == 'float' || property == 'cssFloat') ?
//           (Object.isUndefined(elementStyle.styleFloat) ? 'cssFloat' : 'styleFloat') :
//             property] = styles[property];

//     return element;
//   },

//   setOpacity: function(element, value) {
//     element = $(element);
//     element.style.opacity = (value == 1 || value === '') ? '' :
//       (value < 0.00001) ? 0 : value;
//     return element;
//   },

//   makePositioned: function(element) {
//     element = $(element);
//     var pos = Element.getStyle(element, 'position');
//     if (pos == 'static' || !pos) {
//       element._madePositioned = true;
//       element.style.position = 'relative';
//       if (Prototype.Browser.Opera) {
//         element.style.top = 0;
//         element.style.left = 0;
//       }
//     }
//     return element;
//   },

//   undoPositioned: function(element) {
//     element = $(element);
//     if (element._madePositioned) {
//       element._madePositioned = undefined;
//       element.style.position =
//         element.style.top =
//         element.style.left =
//         element.style.bottom =
//         element.style.right = '';
//     }
//     return element;
//   },

//   makeClipping: function(element) {
//     element = $(element);
//     if (element._overflow) return element;
//     element._overflow = Element.getStyle(element, 'overflow') || 'auto';
//     if (element._overflow !== 'hidden')
//       element.style.overflow = 'hidden';
//     return element;
//   },

//   undoClipping: function(element) {
//     element = $(element);
//     if (!element._overflow) return element;
//     element.style.overflow = element._overflow == 'auto' ? '' : element._overflow;
//     element._overflow = null;
//     return element;
//   },

//   clonePosition: function(element, source) {
//     var options = Object.extend({
//       setLeft:    true,
//       setTop:     true,
//       setWidth:   true,
//       setHeight:  true,
//       offsetTop:  0,
//       offsetLeft: 0
//     }, arguments[2] || { });

//     source = $(source);
//     var p = Element.viewportOffset(source), delta = [0, 0], parent = null;

//     element = $(element);

//     if (Element.getStyle(element, 'position') == 'absolute') {
//       parent = Element.getOffsetParent(element);
//       delta = Element.viewportOffset(parent);
//     }

//     if (parent == document.body) {
//       delta[0] -= document.body.offsetLeft;
//       delta[1] -= document.body.offsetTop;
//     }

//     if (options.setLeft)   element.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
//     if (options.setTop)    element.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
//     if (options.setWidth)  element.style.width = source.offsetWidth + 'px';
//     if (options.setHeight) element.style.height = source.offsetHeight + 'px';
//     return element;
//   }
// };

// Object.extend(Element.Methods, {
//   getElementsBySelector: Element.Methods.select,

//   childElements: Element.Methods.immediateDescendants
// });

// Element._attributeTranslations = {
//   write: {
//     names: {
//       className: 'class',
//       htmlFor:   'for'
//     },
//     values: { }
//   }
// };

// if (Prototype.Browser.Opera) {
//   Element.Methods.getStyle = Element.Methods.getStyle.wrap(
//     function(proceed, element, style) {
//       switch (style) {
//         case 'height': case 'width':
//           if (!Element.visible(element)) return null;

//           var dim = parseInt(proceed(element, style), 10);

//           if (dim !== element['offset' + style.capitalize()])
//             return dim + 'px';

//           var properties;
//           if (style === 'height') {
//             properties = ['border-top-width', 'padding-top',
//              'padding-bottom', 'border-bottom-width'];
//           }
//           else {
//             properties = ['border-left-width', 'padding-left',
//              'padding-right', 'border-right-width'];
//           }
//           return properties.inject(dim, function(memo, property) {
//             var val = proceed(element, property);
//             return val === null ? memo : memo - parseInt(val, 10);
//           }) + 'px';
//         default: return proceed(element, style);
//       }
//     }
//   );

//   Element.Methods.readAttribute = Element.Methods.readAttribute.wrap(
//     function(proceed, element, attribute) {
//       if (attribute === 'title') return element.title;
//       return proceed(element, attribute);
//     }
//   );
// }

// else if (Prototype.Browser.IE) {
//   Element.Methods.getStyle = function(element, style) {
//     element = $(element);
//     style = (style == 'float' || style == 'cssFloat') ? 'styleFloat' : style.camelize();
//     var value = element.style[style];
//     if (!value && element.currentStyle) value = element.currentStyle[style];

//     if (style == 'opacity') {
//       if (value = (element.getStyle('filter') || '').match(/alpha\(opacity=(.*)\)/))
//         if (value[1]) return parseFloat(value[1]) / 100;
//       return 1.0;
//     }

//     if (value == 'auto') {
//       if ((style == 'width' || style == 'height') && (element.getStyle('display') != 'none'))
//         return element['offset' + style.capitalize()] + 'px';
//       return null;
//     }
//     return value;
//   };

//   Element.Methods.setOpacity = function(element, value) {
//     function stripAlpha(filter){
//       return filter.replace(/alpha\([^\)]*\)/gi,'');
//     }
//     element = $(element);
//     var currentStyle = element.currentStyle;
//     if ((currentStyle && !currentStyle.hasLayout) ||
//       (!currentStyle && element.style.zoom == 'normal'))
//         element.style.zoom = 1;

//     var filter = element.getStyle('filter'), style = element.style;
//     if (value == 1 || value === '') {
//       (filter = stripAlpha(filter)) ?
//         style.filter = filter : style.removeAttribute('filter');
//       return element;
//     } else if (value < 0.00001) value = 0;
//     style.filter = stripAlpha(filter) +
//       'alpha(opacity=' + (value * 100) + ')';
//     return element;
//   };

//   Element._attributeTranslations = (function(){

//     var classProp = 'className',
//         forProp = 'for',
//         el = document.createElement('div');

//     el.setAttribute(classProp, 'x');

//     if (el.className !== 'x') {
//       el.setAttribute('class', 'x');
//       if (el.className === 'x') {
//         classProp = 'class';
//       }
//     }
//     el = null;

//     el = document.createElement('label');
//     el.setAttribute(forProp, 'x');
//     if (el.htmlFor !== 'x') {
//       el.setAttribute('htmlFor', 'x');
//       if (el.htmlFor === 'x') {
//         forProp = 'htmlFor';
//       }
//     }
//     el = null;

//     return {
//       read: {
//         names: {
//           'class':      classProp,
//           'className':  classProp,
//           'for':        forProp,
//           'htmlFor':    forProp
//         },
//         values: {
//           _getAttr: function(element, attribute) {
//             return element.getAttribute(attribute);
//           },
//           _getAttr2: function(element, attribute) {
//             return element.getAttribute(attribute, 2);
//           },
//           _getAttrNode: function(element, attribute) {
//             var node = element.getAttributeNode(attribute);
//             return node ? node.value : "";
//           },
//           _getEv: (function(){

//             var el = document.createElement('div'), f;
//             el.onclick = Prototype.emptyFunction;
//             var value = el.getAttribute('onclick');

//             if (String(value).indexOf('{') > -1) {
//               f = function(element, attribute) {
//                 attribute = element.getAttribute(attribute);
//                 if (!attribute) return null;
//                 attribute = attribute.toString();
//                 attribute = attribute.split('{')[1];
//                 attribute = attribute.split('}')[0];
//                 return attribute.strip();
//               };
//             }
//             else if (value === '') {
//               f = function(element, attribute) {
//                 attribute = element.getAttribute(attribute);
//                 if (!attribute) return null;
//                 return attribute.strip();
//               };
//             }
//             el = null;
//             return f;
//           })(),
//           _flag: function(element, attribute) {
//             return $(element).hasAttribute(attribute) ? attribute : null;
//           },
//           style: function(element) {
//             return element.style.cssText.toLowerCase();
//           },
//           title: function(element) {
//             return element.title;
//           }
//         }
//       }
//     }
//   })();

//   Element._attributeTranslations.write = {
//     names: Object.extend({
//       cellpadding: 'cellPadding',
//       cellspacing: 'cellSpacing'
//     }, Element._attributeTranslations.read.names),
//     values: {
//       checked: function(element, value) {
//         element.checked = !!value;
//       },

//       style: function(element, value) {
//         element.style.cssText = value ? value : '';
//       }
//     }
//   };

//   Element._attributeTranslations.has = {};

//   $w('colSpan rowSpan vAlign dateTime accessKey tabIndex ' +
//       'encType maxLength readOnly longDesc frameBorder').each(function(attr) {
//     Element._attributeTranslations.write.names[attr.toLowerCase()] = attr;
//     Element._attributeTranslations.has[attr.toLowerCase()] = attr;
//   });

//   (function(v) {
//     Object.extend(v, {
//       href:        v._getAttr2,
//       src:         v._getAttr2,
//       type:        v._getAttr,
//       action:      v._getAttrNode,
//       disabled:    v._flag,
//       checked:     v._flag,
//       readonly:    v._flag,
//       multiple:    v._flag,
//       onload:      v._getEv,
//       onunload:    v._getEv,
//       onclick:     v._getEv,
//       ondblclick:  v._getEv,
//       onmousedown: v._getEv,
//       onmouseup:   v._getEv,
//       onmouseover: v._getEv,
//       onmousemove: v._getEv,
//       onmouseout:  v._getEv,
//       onfocus:     v._getEv,
//       onblur:      v._getEv,
//       onkeypress:  v._getEv,
//       onkeydown:   v._getEv,
//       onkeyup:     v._getEv,
//       onsubmit:    v._getEv,
//       onreset:     v._getEv,
//       onselect:    v._getEv,
//       onchange:    v._getEv
//     });
//   })(Element._attributeTranslations.read.values);

//   if (Prototype.BrowserFeatures.ElementExtensions) {
//     (function() {
//       function _descendants(element) {
//         var nodes = element.getElementsByTagName('*'), results = [];
//         for (var i = 0, node; node = nodes[i]; i++)
//           if (node.tagName !== "!") // Filter out comment nodes.
//             results.push(node);
//         return results;
//       }

//       Element.Methods.down = function(element, expression, index) {
//         element = $(element);
//         if (arguments.length == 1) return element.firstDescendant();
//         return Object.isNumber(expression) ? _descendants(element)[expression] :
//           Element.select(element, expression)[index || 0];
//       }
//     })();
//   }

// }

// else if (Prototype.Browser.Gecko && /rv:1\.8\.0/.test(navigator.userAgent)) {
//   Element.Methods.setOpacity = function(element, value) {
//     element = $(element);
//     element.style.opacity = (value == 1) ? 0.999999 :
//       (value === '') ? '' : (value < 0.00001) ? 0 : value;
//     return element;
//   };
// }

// else if (Prototype.Browser.WebKit) {
//   Element.Methods.setOpacity = function(element, value) {
//     element = $(element);
//     element.style.opacity = (value == 1 || value === '') ? '' :
//       (value < 0.00001) ? 0 : value;

//     if (value == 1)
//       if (element.tagName.toUpperCase() == 'IMG' && element.width) {
//         element.width++; element.width--;
//       } else try {
//         var n = document.createTextNode(' ');
//         element.appendChild(n);
//         element.removeChild(n);
//       } catch (e) { }

//     return element;
//   };
// }

// if ('outerHTML' in document.documentElement) {
//   Element.Methods.replace = function(element, content) {
//     element = $(element);

//     if (content && content.toElement) content = content.toElement();
//     if (Object.isElement(content)) {
//       element.parentNode.replaceChild(content, element);
//       return element;
//     }

//     content = Object.toHTML(content);
//     var parent = element.parentNode, tagName = parent.tagName.toUpperCase();

//     if (Element._insertionTranslations.tags[tagName]) {
//       var nextSibling = element.next(),
//           fragments = Element._getContentFromAnonymousElement(tagName, content.stripScripts());
//       parent.removeChild(element);
//       if (nextSibling)
//         fragments.each(function(node) { parent.insertBefore(node, nextSibling) });
//       else
//         fragments.each(function(node) { parent.appendChild(node) });
//     }
//     else element.outerHTML = content.stripScripts();

//     content.evalScripts.bind(content).defer();
//     return element;
//   };
// }

// Element._returnOffset = function(l, t) {
//   var result = [l, t];
//   result.left = l;
//   result.top = t;
//   return result;
// };

// Element._getContentFromAnonymousElement = function(tagName, html, force) {
//   var div = new Element('div'),
//       t = Element._insertionTranslations.tags[tagName];

//   var workaround = false;
//   if (t) workaround = true;
//   else if (force) {
//     workaround = true;
//     t = ['', '', 0];
//   }

//   if (workaround) {
//     div.innerHTML = '&nbsp;' + t[0] + html + t[1];
//     div.removeChild(div.firstChild);
//     for (var i = t[2]; i--; ) {
//       div = div.firstChild;
//     }
//   }
//   else {
//     div.innerHTML = html;
//   }
//   return $A(div.childNodes);
// };

// Element._insertionTranslations = {
//   before: function(element, node) {
//     element.parentNode.insertBefore(node, element);
//   },
//   top: function(element, node) {
//     element.insertBefore(node, element.firstChild);
//   },
//   bottom: function(element, node) {
//     element.appendChild(node);
//   },
//   after: function(element, node) {
//     element.parentNode.insertBefore(node, element.nextSibling);
//   },
//   tags: {
//     TABLE:  ['<table>',                '</table>',                   1],
//     TBODY:  ['<table><tbody>',         '</tbody></table>',           2],
//     TR:     ['<table><tbody><tr>',     '</tr></tbody></table>',      3],
//     TD:     ['<table><tbody><tr><td>', '</td></tr></tbody></table>', 4],
//     SELECT: ['<select>',               '</select>',                  1]
//   }
// };

// (function() {
//   var tags = Element._insertionTranslations.tags;
//   Object.extend(tags, {
//     THEAD: tags.TBODY,
//     TFOOT: tags.TBODY,
//     TH:    tags.TD
//   });
// })();

// Element.Methods.Simulated = {
//   hasAttribute: function(element, attribute) {
//     attribute = Element._attributeTranslations.has[attribute] || attribute;
//     var node = $(element).getAttributeNode(attribute);
//     return !!(node && node.specified);
//   }
// };

// Element.Methods.ByTag = { };

// Object.extend(Element, Element.Methods);

// (function(div) {

//   if (!Prototype.BrowserFeatures.ElementExtensions && div['__proto__']) {
//     window.HTMLElement = { };
//     window.HTMLElement.prototype = div['__proto__'];
//     Prototype.BrowserFeatures.ElementExtensions = true;
//   }

//   div = null;

// })(document.createElement('div'));

// Element.extend = (function() {

//   function checkDeficiency(tagName) {
//     if (typeof window.Element != 'undefined') {
//       var proto = window.Element.prototype;
//       if (proto) {
//         var id = '_' + (Math.random()+'').slice(2),
//             el = document.createElement(tagName);
//         proto[id] = 'x';
//         var isBuggy = (el[id] !== 'x');
//         delete proto[id];
//         el = null;
//         return isBuggy;
//       }
//     }
//     return false;
//   }

//   function extendElementWith(element, methods) {
//     for (var property in methods) {
//       var value = methods[property];
//       if (Object.isFunction(value) && !(property in element))
//         element[property] = value.methodize();
//     }
//   }

//   var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY = checkDeficiency('object');

//   if (Prototype.BrowserFeatures.SpecificElementExtensions) {
//     if (HTMLOBJECTELEMENT_PROTOTYPE_BUGGY) {
//       return function(element) {
//         if (element && typeof element._extendedByPrototype == 'undefined') {
//           var t = element.tagName;
//           if (t && (/^(?:object|applet|embed)$/i.test(t))) {
//             extendElementWith(element, Element.Methods);
//             extendElementWith(element, Element.Methods.Simulated);
//             extendElementWith(element, Element.Methods.ByTag[t.toUpperCase()]);
//           }
//         }
//         return element;
//       }
//     }
//     return Prototype.K;
//   }

//   var Methods = { }, ByTag = Element.Methods.ByTag;

//   var extend = Object.extend(function(element) {
//     if (!element || typeof element._extendedByPrototype != 'undefined' ||
//         element.nodeType != 1 || element == window) return element;

//     var methods = Object.clone(Methods),
//         tagName = element.tagName.toUpperCase();

//     if (ByTag[tagName]) Object.extend(methods, ByTag[tagName]);

//     extendElementWith(element, methods);

//     element._extendedByPrototype = Prototype.emptyFunction;
//     return element;

//   }, {
//     refresh: function() {
//       if (!Prototype.BrowserFeatures.ElementExtensions) {
//         Object.extend(Methods, Element.Methods);
//         Object.extend(Methods, Element.Methods.Simulated);
//       }
//     }
//   });

//   extend.refresh();
//   return extend;
// })();

// if (document.documentElement.hasAttribute) {
//   Element.hasAttribute = function(element, attribute) {
//     return element.hasAttribute(attribute);
//   };
// }
// else {
//   Element.hasAttribute = Element.Methods.Simulated.hasAttribute;
// }

// Element.addMethods = function(methods) {
//   var F = Prototype.BrowserFeatures, T = Element.Methods.ByTag;

//   if (!methods) {
//     Object.extend(Form, Form.Methods);
//     Object.extend(Form.Element, Form.Element.Methods);
//     Object.extend(Element.Methods.ByTag, {
//       "FORM":     Object.clone(Form.Methods),
//       "INPUT":    Object.clone(Form.Element.Methods),
//       "SELECT":   Object.clone(Form.Element.Methods),
//       "TEXTAREA": Object.clone(Form.Element.Methods),
//       "BUTTON":   Object.clone(Form.Element.Methods)
//     });
//   }

//   if (arguments.length == 2) {
//     var tagName = methods;
//     methods = arguments[1];
//   }

//   if (!tagName) Object.extend(Element.Methods, methods || { });
//   else {
//     if (Object.isArray(tagName)) tagName.each(extend);
//     else extend(tagName);
//   }

//   function extend(tagName) {
//     tagName = tagName.toUpperCase();
//     if (!Element.Methods.ByTag[tagName])
//       Element.Methods.ByTag[tagName] = { };
//     Object.extend(Element.Methods.ByTag[tagName], methods);
//   }

//   function copy(methods, destination, onlyIfAbsent) {
//     onlyIfAbsent = onlyIfAbsent || false;
//     for (var property in methods) {
//       var value = methods[property];
//       if (!Object.isFunction(value)) continue;
//       if (!onlyIfAbsent || !(property in destination))
//         destination[property] = value.methodize();
//     }
//   }

//   function findDOMClass(tagName) {
//     var klass;
//     var trans = {
//       "OPTGROUP": "OptGroup", "TEXTAREA": "TextArea", "P": "Paragraph",
//       "FIELDSET": "FieldSet", "UL": "UList", "OL": "OList", "DL": "DList",
//       "DIR": "Directory", "H1": "Heading", "H2": "Heading", "H3": "Heading",
//       "H4": "Heading", "H5": "Heading", "H6": "Heading", "Q": "Quote",
//       "INS": "Mod", "DEL": "Mod", "A": "Anchor", "IMG": "Image", "CAPTION":
//       "TableCaption", "COL": "TableCol", "COLGROUP": "TableCol", "THEAD":
//       "TableSection", "TFOOT": "TableSection", "TBODY": "TableSection", "TR":
//       "TableRow", "TH": "TableCell", "TD": "TableCell", "FRAMESET":
//       "FrameSet", "IFRAME": "IFrame"
//     };
//     if (trans[tagName]) klass = 'HTML' + trans[tagName] + 'Element';
//     if (window[klass]) return window[klass];
//     klass = 'HTML' + tagName + 'Element';
//     if (window[klass]) return window[klass];
//     klass = 'HTML' + tagName.capitalize() + 'Element';
//     if (window[klass]) return window[klass];

//     var element = document.createElement(tagName),
//         proto = element['__proto__'] || element.constructor.prototype;

//     element = null;
//     return proto;
//   }

//   var elementPrototype = window.HTMLElement ? HTMLElement.prototype :
//    Element.prototype;

//   if (F.ElementExtensions) {
//     copy(Element.Methods, elementPrototype);
//     copy(Element.Methods.Simulated, elementPrototype, true);
//   }

//   if (F.SpecificElementExtensions) {
//     for (var tag in Element.Methods.ByTag) {
//       var klass = findDOMClass(tag);
//       if (Object.isUndefined(klass)) continue;
//       copy(T[tag], klass.prototype);
//     }
//   }

//   Object.extend(Element, Element.Methods);
//   delete Element.ByTag;

//   if (Element.extend.refresh) Element.extend.refresh();
//   Element.cache = { };
// };


// document.viewport = {

//   getDimensions: function() {
//     return { width: this.getWidth(), height: this.getHeight() };
//   },

//   getScrollOffsets: function() {
//     return Element._returnOffset(
//       window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
//       window.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop);
//   }
// };

// (function(viewport) {
//   var B = Prototype.Browser, doc = document, element, property = {};

//   function getRootElement() {
//     if (B.WebKit && !doc.evaluate)
//       return document;

//     if (B.Opera && window.parseFloat(window.opera.version()) < 9.5)
//       return document.body;

//     return document.documentElement;
//   }

//   function define(D) {
//     if (!element) element = getRootElement();

//     property[D] = 'client' + D;

//     viewport['get' + D] = function() { return element[property[D]] };
//     return viewport['get' + D]();
//   }

//   viewport.getWidth  = define.curry('Width');

//   viewport.getHeight = define.curry('Height');
// })(document.viewport);


// Element.Storage = {
//   UID: 1
// };

// Element.addMethods({
//   getStorage: function(element) {
//     if (!(element = $(element))) return;

//     var uid;
//     if (element === window) {
//       uid = 0;
//     } else {
//       if (typeof element._prototypeUID === "undefined")
//         element._prototypeUID = Element.Storage.UID++;
//       uid = element._prototypeUID;
//     }

//     if (!Element.Storage[uid])
//       Element.Storage[uid] = $H();

//     return Element.Storage[uid];
//   },

//   store: function(element, key, value) {
//     if (!(element = $(element))) return;

//     if (arguments.length === 2) {
//       Element.getStorage(element).update(key);
//     } else {
//       Element.getStorage(element).set(key, value);
//     }

//     return element;
//   },

//   retrieve: function(element, key, defaultValue) {
//     if (!(element = $(element))) return;
//     var hash = Element.getStorage(element), value = hash.get(key);

//     if (Object.isUndefined(value)) {
//       hash.set(key, defaultValue);
//       value = defaultValue;
//     }

//     return value;
//   },

//   clone: function(element, deep) {
//     if (!(element = $(element))) return;
//     var clone = element.cloneNode(deep);
//     clone._prototypeUID = void 0;
//     if (deep) {
//       var descendants = Element.select(clone, '*'),
//           i = descendants.length;
//       while (i--) {
//         descendants[i]._prototypeUID = void 0;
//       }
//     }
//     return Element.extend(clone);
//   },

//   purge: function(element) {
//     if (!(element = $(element))) return;
//     var purgeElement = Element._purgeElement;

//     purgeElement(element);

//     var descendants = element.getElementsByTagName('*'),
//      i = descendants.length;

//     while (i--) purgeElement(descendants[i]);

//     return null;
//   }
// });

// (function() {

//   function toDecimal(pctString) {
//     var match = pctString.match(/^(\d+)%?$/i);
//     if (!match) return null;
//     return (Number(match[1]) / 100);
//   }

//   function getPixelValue(value, property, context) {
//     var element = null;
//     if (Object.isElement(value)) {
//       element = value;
//       value = element.getStyle(property);
//     }

//     if (value === null) {
//       return null;
//     }

//     if ((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(value)) {
//       return window.parseFloat(value);
//     }

//     var isPercentage = value.include('%'), isViewport = (context === document.viewport);

//     if (/\d/.test(value) && element && element.runtimeStyle && !(isPercentage && isViewport)) {
//       var style = element.style.left, rStyle = element.runtimeStyle.left;
//       element.runtimeStyle.left = element.currentStyle.left;
//       element.style.left = value || 0;
//       value = element.style.pixelLeft;
//       element.style.left = style;
//       element.runtimeStyle.left = rStyle;

//       return value;
//     }

//     if (element && isPercentage) {
//       context = context || element.parentNode;
//       var decimal = toDecimal(value);
//       var whole = null;
//       var position = element.getStyle('position');

//       var isHorizontal = property.include('left') || property.include('right') ||
//        property.include('width');

//       var isVertical =  property.include('top') || property.include('bottom') ||
//         property.include('height');

//       if (context === document.viewport) {
//         if (isHorizontal) {
//           whole = document.viewport.getWidth();
//         } else if (isVertical) {
//           whole = document.viewport.getHeight();
//         }
//       } else {
//         if (isHorizontal) {
//           whole = $(context).measure('width');
//         } else if (isVertical) {
//           whole = $(context).measure('height');
//         }
//       }

//       return (whole === null) ? 0 : whole * decimal;
//     }

//     return 0;
//   }

//   function toCSSPixels(number) {
//     if (Object.isString(number) && number.endsWith('px')) {
//       return number;
//     }
//     return number + 'px';
//   }

//   function isDisplayed(element) {
//     var originalElement = element;
//     while (element && element.parentNode) {
//       var display = element.getStyle('display');
//       if (display === 'none') {
//         return false;
//       }
//       element = $(element.parentNode);
//     }
//     return true;
//   }

//   var hasLayout = Prototype.K;
//   if ('currentStyle' in document.documentElement) {
//     hasLayout = function(element) {
//       if (!element.currentStyle.hasLayout) {
//         element.style.zoom = 1;
//       }
//       return element;
//     };
//   }

//   function cssNameFor(key) {
//     if (key.include('border')) key = key + '-width';
//     return key.camelize();
//   }

//   Element.Layout = Class.create(Hash, {
//     initialize: function($super, element, preCompute) {
//       $super();
//       this.element = $(element);

//       Element.Layout.PROPERTIES.each( function(property) {
//         this._set(property, null);
//       }, this);

//       if (preCompute) {
//         this._preComputing = true;
//         this._begin();
//         Element.Layout.PROPERTIES.each( this._compute, this );
//         this._end();
//         this._preComputing = false;
//       }
//     },

//     _set: function(property, value) {
//       return Hash.prototype.set.call(this, property, value);
//     },

//     set: function(property, value) {
//       throw "Properties of Element.Layout are read-only.";
//     },

//     get: function($super, property) {
//       var value = $super(property);
//       return value === null ? this._compute(property) : value;
//     },

//     _begin: function() {
//       if (this._prepared) return;

//       var element = this.element;
//       if (isDisplayed(element)) {
//         this._prepared = true;
//         return;
//       }

//       var originalStyles = {
//         position:   element.style.position   || '',
//         width:      element.style.width      || '',
//         visibility: element.style.visibility || '',
//         display:    element.style.display    || ''
//       };

//       element.store('prototype_original_styles', originalStyles);

//       var position = element.getStyle('position'),
//        width = element.getStyle('width');

//       if (width === "0px" || width === null) {
//         element.style.display = 'block';
//         width = element.getStyle('width');
//       }

//       var context = (position === 'fixed') ? document.viewport :
//        element.parentNode;

//       element.setStyle({
//         position:   'absolute',
//         visibility: 'hidden',
//         display:    'block'
//       });

//       var positionedWidth = element.getStyle('width');

//       var newWidth;
//       if (width && (positionedWidth === width)) {
//         newWidth = getPixelValue(element, 'width', context);
//       } else if (position === 'absolute' || position === 'fixed') {
//         newWidth = getPixelValue(element, 'width', context);
//       } else {
//         var parent = element.parentNode, pLayout = $(parent).getLayout();

//         newWidth = pLayout.get('width') -
//          this.get('margin-left') -
//          this.get('border-left') -
//          this.get('padding-left') -
//          this.get('padding-right') -
//          this.get('border-right') -
//          this.get('margin-right');
//       }

//       element.setStyle({ width: newWidth + 'px' });

//       this._prepared = true;
//     },

//     _end: function() {
//       var element = this.element;
//       var originalStyles = element.retrieve('prototype_original_styles');
//       element.store('prototype_original_styles', null);
//       element.setStyle(originalStyles);
//       this._prepared = false;
//     },

//     _compute: function(property) {
//       var COMPUTATIONS = Element.Layout.COMPUTATIONS;
//       if (!(property in COMPUTATIONS)) {
//         throw "Property not found.";
//       }

//       return this._set(property, COMPUTATIONS[property].call(this, this.element));
//     },

//     toObject: function() {
//       var args = $A(arguments);
//       var keys = (args.length === 0) ? Element.Layout.PROPERTIES :
//        args.join(' ').split(' ');
//       var obj = {};
//       keys.each( function(key) {
//         if (!Element.Layout.PROPERTIES.include(key)) return;
//         var value = this.get(key);
//         if (value != null) obj[key] = value;
//       }, this);
//       return obj;
//     },

//     toHash: function() {
//       var obj = this.toObject.apply(this, arguments);
//       return new Hash(obj);
//     },

//     toCSS: function() {
//       var args = $A(arguments);
//       var keys = (args.length === 0) ? Element.Layout.PROPERTIES :
//        args.join(' ').split(' ');
//       var css = {};

//       keys.each( function(key) {
//         if (!Element.Layout.PROPERTIES.include(key)) return;
//         if (Element.Layout.COMPOSITE_PROPERTIES.include(key)) return;

//         var value = this.get(key);
//         if (value != null) css[cssNameFor(key)] = value + 'px';
//       }, this);
//       return css;
//     },

//     inspect: function() {
//       return "#<Element.Layout>";
//     }
//   });

//   Object.extend(Element.Layout, {
//     PROPERTIES: $w('height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height'),

//     COMPOSITE_PROPERTIES: $w('padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height'),

//     COMPUTATIONS: {
//       'height': function(element) {
//         if (!this._preComputing) this._begin();

//         var bHeight = this.get('border-box-height');
//         if (bHeight <= 0) {
//           if (!this._preComputing) this._end();
//           return 0;
//         }

//         var bTop = this.get('border-top'),
//          bBottom = this.get('border-bottom');

//         var pTop = this.get('padding-top'),
//          pBottom = this.get('padding-bottom');

//         if (!this._preComputing) this._end();

//         return bHeight - bTop - bBottom - pTop - pBottom;
//       },

//       'width': function(element) {
//         if (!this._preComputing) this._begin();

//         var bWidth = this.get('border-box-width');
//         if (bWidth <= 0) {
//           if (!this._preComputing) this._end();
//           return 0;
//         }

//         var bLeft = this.get('border-left'),
//          bRight = this.get('border-right');

//         var pLeft = this.get('padding-left'),
//          pRight = this.get('padding-right');

//         if (!this._preComputing) this._end();

//         return bWidth - bLeft - bRight - pLeft - pRight;
//       },

//       'padding-box-height': function(element) {
//         var height = this.get('height'),
//          pTop = this.get('padding-top'),
//          pBottom = this.get('padding-bottom');

//         return height + pTop + pBottom;
//       },

//       'padding-box-width': function(element) {
//         var width = this.get('width'),
//          pLeft = this.get('padding-left'),
//          pRight = this.get('padding-right');

//         return width + pLeft + pRight;
//       },

//       'border-box-height': function(element) {
//         if (!this._preComputing) this._begin();
//         var height = element.offsetHeight;
//         if (!this._preComputing) this._end();
//         return height;
//       },

//       'border-box-width': function(element) {
//         if (!this._preComputing) this._begin();
//         var width = element.offsetWidth;
//         if (!this._preComputing) this._end();
//         return width;
//       },

//       'margin-box-height': function(element) {
//         var bHeight = this.get('border-box-height'),
//          mTop = this.get('margin-top'),
//          mBottom = this.get('margin-bottom');

//         if (bHeight <= 0) return 0;

//         return bHeight + mTop + mBottom;
//       },

//       'margin-box-width': function(element) {
//         var bWidth = this.get('border-box-width'),
//          mLeft = this.get('margin-left'),
//          mRight = this.get('margin-right');

//         if (bWidth <= 0) return 0;

//         return bWidth + mLeft + mRight;
//       },

//       'top': function(element) {
//         var offset = element.positionedOffset();
//         return offset.top;
//       },

//       'bottom': function(element) {
//         var offset = element.positionedOffset(),
//          parent = element.getOffsetParent(),
//          pHeight = parent.measure('height');

//         var mHeight = this.get('border-box-height');

//         return pHeight - mHeight - offset.top;
//       },

//       'left': function(element) {
//         var offset = element.positionedOffset();
//         return offset.left;
//       },

//       'right': function(element) {
//         var offset = element.positionedOffset(),
//          parent = element.getOffsetParent(),
//          pWidth = parent.measure('width');

//         var mWidth = this.get('border-box-width');

//         return pWidth - mWidth - offset.left;
//       },

//       'padding-top': function(element) {
//         return getPixelValue(element, 'paddingTop');
//       },

//       'padding-bottom': function(element) {
//         return getPixelValue(element, 'paddingBottom');
//       },

//       'padding-left': function(element) {
//         return getPixelValue(element, 'paddingLeft');
//       },

//       'padding-right': function(element) {
//         return getPixelValue(element, 'paddingRight');
//       },

//       'border-top': function(element) {
//         return getPixelValue(element, 'borderTopWidth');
//       },

//       'border-bottom': function(element) {
//         return getPixelValue(element, 'borderBottomWidth');
//       },

//       'border-left': function(element) {
//         return getPixelValue(element, 'borderLeftWidth');
//       },

//       'border-right': function(element) {
//         return getPixelValue(element, 'borderRightWidth');
//       },

//       'margin-top': function(element) {
//         return getPixelValue(element, 'marginTop');
//       },

//       'margin-bottom': function(element) {
//         return getPixelValue(element, 'marginBottom');
//       },

//       'margin-left': function(element) {
//         return getPixelValue(element, 'marginLeft');
//       },

//       'margin-right': function(element) {
//         return getPixelValue(element, 'marginRight');
//       }
//     }
//   });

//   if ('getBoundingClientRect' in document.documentElement) {
//     Object.extend(Element.Layout.COMPUTATIONS, {
//       'right': function(element) {
//         var parent = hasLayout(element.getOffsetParent());
//         var rect = element.getBoundingClientRect(),
//          pRect = parent.getBoundingClientRect();

//         return (pRect.right - rect.right).round();
//       },

//       'bottom': function(element) {
//         var parent = hasLayout(element.getOffsetParent());
//         var rect = element.getBoundingClientRect(),
//          pRect = parent.getBoundingClientRect();

//         return (pRect.bottom - rect.bottom).round();
//       }
//     });
//   }

//   Element.Offset = Class.create({
//     initialize: function(left, top) {
//       this.left = left.round();
//       this.top  = top.round();

//       this[0] = this.left;
//       this[1] = this.top;
//     },

//     relativeTo: function(offset) {
//       return new Element.Offset(
//         this.left - offset.left,
//         this.top  - offset.top
//       );
//     },

//     inspect: function() {
//       return "#<Element.Offset left: #{left} top: #{top}>".interpolate(this);
//     },

//     toString: function() {
//       return "[#{left}, #{top}]".interpolate(this);
//     },

//     toArray: function() {
//       return [this.left, this.top];
//     }
//   });

//   function getLayout(element, preCompute) {
//     return new Element.Layout(element, preCompute);
//   }

//   function measure(element, property) {
//     return $(element).getLayout().get(property);
//   }

//   function getDimensions(element) {
//     element = $(element);
//     var display = Element.getStyle(element, 'display');

//     if (display && display !== 'none') {
//       return { width: element.offsetWidth, height: element.offsetHeight };
//     }

//     var style = element.style;
//     var originalStyles = {
//       visibility: style.visibility,
//       position:   style.position,
//       display:    style.display
//     };

//     var newStyles = {
//       visibility: 'hidden',
//       display:    'block'
//     };

//     if (originalStyles.position !== 'fixed')
//       newStyles.position = 'absolute';

//     Element.setStyle(element, newStyles);

//     var dimensions = {
//       width:  element.offsetWidth,
//       height: element.offsetHeight
//     };

//     Element.setStyle(element, originalStyles);

//     return dimensions;
//   }

//   function getOffsetParent(element) {
//     element = $(element);

//     if (isDocument(element) || isDetached(element) || isBody(element) || isHtml(element))
//       return $(document.body);

//     var isInline = (Element.getStyle(element, 'display') === 'inline');
//     if (!isInline && element.offsetParent) return $(element.offsetParent);

//     while ((element = element.parentNode) && element !== document.body) {
//       if (Element.getStyle(element, 'position') !== 'static') {
//         return isHtml(element) ? $(document.body) : $(element);
//       }
//     }

//     return $(document.body);
//   }


//   function cumulativeOffset(element) {
//     element = $(element);
//     var valueT = 0, valueL = 0;
//     if (element.parentNode) {
//       do {
//         valueT += element.offsetTop  || 0;
//         valueL += element.offsetLeft || 0;
//         element = element.offsetParent;
//       } while (element);
//     }
//     return new Element.Offset(valueL, valueT);
//   }

//   function positionedOffset(element) {
//     element = $(element);

//     var layout = element.getLayout();

//     var valueT = 0, valueL = 0;
//     do {
//       valueT += element.offsetTop  || 0;
//       valueL += element.offsetLeft || 0;
//       element = element.offsetParent;
//       if (element) {
//         if (isBody(element)) break;
//         var p = Element.getStyle(element, 'position');
//         if (p !== 'static') break;
//       }
//     } while (element);

//     valueL -= layout.get('margin-top');
//     valueT -= layout.get('margin-left');

//     return new Element.Offset(valueL, valueT);
//   }

//   function cumulativeScrollOffset(element) {
//     var valueT = 0, valueL = 0;
//     do {
//       valueT += element.scrollTop  || 0;
//       valueL += element.scrollLeft || 0;
//       element = element.parentNode;
//     } while (element);
//     return new Element.Offset(valueL, valueT);
//   }

//   function viewportOffset(forElement) {
//     element = $(element);
//     var valueT = 0, valueL = 0, docBody = document.body;

//     var element = forElement;
//     do {
//       valueT += element.offsetTop  || 0;
//       valueL += element.offsetLeft || 0;
//       if (element.offsetParent == docBody &&
//         Element.getStyle(element, 'position') == 'absolute') break;
//     } while (element = element.offsetParent);

//     element = forElement;
//     do {
//       if (element != docBody) {
//         valueT -= element.scrollTop  || 0;
//         valueL -= element.scrollLeft || 0;
//       }
//     } while (element = element.parentNode);
//     return new Element.Offset(valueL, valueT);
//   }

//   function absolutize(element) {
//     element = $(element);

//     if (Element.getStyle(element, 'position') === 'absolute') {
//       return element;
//     }

//     var offsetParent = getOffsetParent(element);
//     var eOffset = element.viewportOffset(),
//      pOffset = offsetParent.viewportOffset();

//     var offset = eOffset.relativeTo(pOffset);
//     var layout = element.getLayout();

//     element.store('prototype_absolutize_original_styles', {
//       left:   element.getStyle('left'),
//       top:    element.getStyle('top'),
//       width:  element.getStyle('width'),
//       height: element.getStyle('height')
//     });

//     element.setStyle({
//       position: 'absolute',
//       top:    offset.top + 'px',
//       left:   offset.left + 'px',
//       width:  layout.get('width') + 'px',
//       height: layout.get('height') + 'px'
//     });

//     return element;
//   }

//   function relativize(element) {
//     element = $(element);
//     if (Element.getStyle(element, 'position') === 'relative') {
//       return element;
//     }

//     var originalStyles =
//      element.retrieve('prototype_absolutize_original_styles');

//     if (originalStyles) element.setStyle(originalStyles);
//     return element;
//   }

//   if (Prototype.Browser.IE) {
//     getOffsetParent = getOffsetParent.wrap(
//       function(proceed, element) {
//         element = $(element);

//         if (isDocument(element) || isDetached(element) || isBody(element) || isHtml(element))
//           return $(document.body);

//         var position = element.getStyle('position');
//         if (position !== 'static') return proceed(element);

//         element.setStyle({ position: 'relative' });
//         var value = proceed(element);
//         element.setStyle({ position: position });
//         return value;
//       }
//     );

//     positionedOffset = positionedOffset.wrap(function(proceed, element) {
//       element = $(element);
//       if (!element.parentNode) return new Element.Offset(0, 0);
//       var position = element.getStyle('position');
//       if (position !== 'static') return proceed(element);

//       var offsetParent = element.getOffsetParent();
//       if (offsetParent && offsetParent.getStyle('position') === 'fixed')
//         hasLayout(offsetParent);

//       element.setStyle({ position: 'relative' });
//       var value = proceed(element);
//       element.setStyle({ position: position });
//       return value;
//     });
//   } else if (Prototype.Browser.Webkit) {
//     cumulativeOffset = function(element) {
//       element = $(element);
//       var valueT = 0, valueL = 0;
//       do {
//         valueT += element.offsetTop  || 0;
//         valueL += element.offsetLeft || 0;
//         if (element.offsetParent == document.body)
//           if (Element.getStyle(element, 'position') == 'absolute') break;

//         element = element.offsetParent;
//       } while (element);

//       return new Element.Offset(valueL, valueT);
//     };
//   }


//   Element.addMethods({
//     getLayout:              getLayout,
//     measure:                measure,
//     getDimensions:          getDimensions,
//     getOffsetParent:        getOffsetParent,
//     cumulativeOffset:       cumulativeOffset,
//     positionedOffset:       positionedOffset,
//     cumulativeScrollOffset: cumulativeScrollOffset,
//     viewportOffset:         viewportOffset,
//     absolutize:             absolutize,
//     relativize:             relativize
//   });

//   function isBody(element) {
//     return element.nodeName.toUpperCase() === 'BODY';
//   }

//   function isHtml(element) {
//     return element.nodeName.toUpperCase() === 'HTML';
//   }

//   function isDocument(element) {
//     return element.nodeType === Node.DOCUMENT_NODE;
//   }

//   function isDetached(element) {
//     return element !== document.body &&
//      !Element.descendantOf(element, document.body);
//   }

//   if ('getBoundingClientRect' in document.documentElement) {
//     Element.addMethods({
//       viewportOffset: function(element) {
//         element = $(element);
//         if (isDetached(element)) return new Element.Offset(0, 0);

//         var rect = element.getBoundingClientRect(),
//          docEl = document.documentElement;
//         return new Element.Offset(rect.left - docEl.clientLeft,
//          rect.top - docEl.clientTop);
//       }
//     });
//   }
// })();
// window.$$ = function() {
//   var expression = $A(arguments).join(', ');
//   return Prototype.Selector.select(expression, document);
// };

// Prototype.Selector = (function() {

//   function select() {
//     throw new Error('Method "Prototype.Selector.select" must be defined.');
//   }

//   function match() {
//     throw new Error('Method "Prototype.Selector.match" must be defined.');
//   }

//   function find(elements, expression, index) {
//     index = index || 0;
//     var match = Prototype.Selector.match, length = elements.length, matchIndex = 0, i;

//     for (i = 0; i < length; i++) {
//       if (match(elements[i], expression) && index == matchIndex++) {
//         return Element.extend(elements[i]);
//       }
//     }
//   }

//   function extendElements(elements) {
//     for (var i = 0, length = elements.length; i < length; i++) {
//       Element.extend(elements[i]);
//     }
//     return elements;
//   }


//   var K = Prototype.K;

//   return {
//     select: select,
//     match: match,
//     find: find,
//     extendElements: (Element.extend === K) ? K : extendElements,
//     extendElement: Element.extend
//   };
// })();
// Prototype._original_property = window.Sizzle;
// /*!
//  * Sizzle CSS Selector Engine - v1.0
//  *  Copyright 2009, The Dojo Foundation
//  *  Released under the MIT, BSD, and GPL Licenses.
//  *  More information: http://sizzlejs.com/
//  */
// (function(){

// var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
// 	done = 0,
// 	toString = Object.prototype.toString,
// 	hasDuplicate = false,
// 	baseHasDuplicate = true;

// [0, 0].sort(function(){
// 	baseHasDuplicate = false;
// 	return 0;
// });

// var Sizzle = function(selector, context, results, seed) {
// 	results = results || [];
// 	var origContext = context = context || document;

// 	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
// 		return [];
// 	}

// 	if ( !selector || typeof selector !== "string" ) {
// 		return results;
// 	}

// 	var parts = [], m, set, checkSet, check, mode, extra, prune = true, contextXML = isXML(context),
// 		soFar = selector;

// 	while ( (chunker.exec(""), m = chunker.exec(soFar)) !== null ) {
// 		soFar = m[3];

// 		parts.push( m[1] );

// 		if ( m[2] ) {
// 			extra = m[3];
// 			break;
// 		}
// 	}

// 	if ( parts.length > 1 && origPOS.exec( selector ) ) {
// 		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
// 			set = posProcess( parts[0] + parts[1], context );
// 		} else {
// 			set = Expr.relative[ parts[0] ] ?
// 				[ context ] :
// 				Sizzle( parts.shift(), context );

// 			while ( parts.length ) {
// 				selector = parts.shift();

// 				if ( Expr.relative[ selector ] )
// 					selector += parts.shift();

// 				set = posProcess( selector, set );
// 			}
// 		}
// 	} else {
// 		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
// 				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
// 			var ret = Sizzle.find( parts.shift(), context, contextXML );
// 			context = ret.expr ? Sizzle.filter( ret.expr, ret.set )[0] : ret.set[0];
// 		}

// 		if ( context ) {
// 			var ret = seed ?
// 				{ expr: parts.pop(), set: makeArray(seed) } :
// 				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
// 			set = ret.expr ? Sizzle.filter( ret.expr, ret.set ) : ret.set;

// 			if ( parts.length > 0 ) {
// 				checkSet = makeArray(set);
// 			} else {
// 				prune = false;
// 			}

// 			while ( parts.length ) {
// 				var cur = parts.pop(), pop = cur;

// 				if ( !Expr.relative[ cur ] ) {
// 					cur = "";
// 				} else {
// 					pop = parts.pop();
// 				}

// 				if ( pop == null ) {
// 					pop = context;
// 				}

// 				Expr.relative[ cur ]( checkSet, pop, contextXML );
// 			}
// 		} else {
// 			checkSet = parts = [];
// 		}
// 	}

// 	if ( !checkSet ) {
// 		checkSet = set;
// 	}

// 	if ( !checkSet ) {
// 		throw "Syntax error, unrecognized expression: " + (cur || selector);
// 	}

// 	if ( toString.call(checkSet) === "[object Array]" ) {
// 		if ( !prune ) {
// 			results.push.apply( results, checkSet );
// 		} else if ( context && context.nodeType === 1 ) {
// 			for ( var i = 0; checkSet[i] != null; i++ ) {
// 				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i])) ) {
// 					results.push( set[i] );
// 				}
// 			}
// 		} else {
// 			for ( var i = 0; checkSet[i] != null; i++ ) {
// 				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
// 					results.push( set[i] );
// 				}
// 			}
// 		}
// 	} else {
// 		makeArray( checkSet, results );
// 	}

// 	if ( extra ) {
// 		Sizzle( extra, origContext, results, seed );
// 		Sizzle.uniqueSort( results );
// 	}

// 	return results;
// };

// Sizzle.uniqueSort = function(results){
// 	if ( sortOrder ) {
// 		hasDuplicate = baseHasDuplicate;
// 		results.sort(sortOrder);

// 		if ( hasDuplicate ) {
// 			for ( var i = 1; i < results.length; i++ ) {
// 				if ( results[i] === results[i-1] ) {
// 					results.splice(i--, 1);
// 				}
// 			}
// 		}
// 	}

// 	return results;
// };

// Sizzle.matches = function(expr, set){
// 	return Sizzle(expr, null, null, set);
// };

// Sizzle.find = function(expr, context, isXML){
// 	var set, match;

// 	if ( !expr ) {
// 		return [];
// 	}

// 	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
// 		var type = Expr.order[i], match;

// 		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
// 			var left = match[1];
// 			match.splice(1,1);

// 			if ( left.substr( left.length - 1 ) !== "\\" ) {
// 				match[1] = (match[1] || "").replace(/\\/g, "");
// 				set = Expr.find[ type ]( match, context, isXML );
// 				if ( set != null ) {
// 					expr = expr.replace( Expr.match[ type ], "" );
// 					break;
// 				}
// 			}
// 		}
// 	}

// 	if ( !set ) {
// 		set = context.getElementsByTagName("*");
// 	}

// 	return {set: set, expr: expr};
// };

// Sizzle.filter = function(expr, set, inplace, not){
// 	var old = expr, result = [], curLoop = set, match, anyFound,
// 		isXMLFilter = set && set[0] && isXML(set[0]);

// 	while ( expr && set.length ) {
// 		for ( var type in Expr.filter ) {
// 			if ( (match = Expr.match[ type ].exec( expr )) != null ) {
// 				var filter = Expr.filter[ type ], found, item;
// 				anyFound = false;

// 				if ( curLoop == result ) {
// 					result = [];
// 				}

// 				if ( Expr.preFilter[ type ] ) {
// 					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

// 					if ( !match ) {
// 						anyFound = found = true;
// 					} else if ( match === true ) {
// 						continue;
// 					}
// 				}

// 				if ( match ) {
// 					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
// 						if ( item ) {
// 							found = filter( item, match, i, curLoop );
// 							var pass = not ^ !!found;

// 							if ( inplace && found != null ) {
// 								if ( pass ) {
// 									anyFound = true;
// 								} else {
// 									curLoop[i] = false;
// 								}
// 							} else if ( pass ) {
// 								result.push( item );
// 								anyFound = true;
// 							}
// 						}
// 					}
// 				}

// 				if ( found !== undefined ) {
// 					if ( !inplace ) {
// 						curLoop = result;
// 					}

// 					expr = expr.replace( Expr.match[ type ], "" );

// 					if ( !anyFound ) {
// 						return [];
// 					}

// 					break;
// 				}
// 			}
// 		}

// 		if ( expr == old ) {
// 			if ( anyFound == null ) {
// 				throw "Syntax error, unrecognized expression: " + expr;
// 			} else {
// 				break;
// 			}
// 		}

// 		old = expr;
// 	}

// 	return curLoop;
// };

// var Expr = Sizzle.selectors = {
// 	order: [ "ID", "NAME", "TAG" ],
// 	match: {
// 		ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
// 		CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
// 		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
// 		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
// 		TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
// 		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
// 		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
// 		PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
// 	},
// 	leftMatch: {},
// 	attrMap: {
// 		"class": "className",
// 		"for": "htmlFor"
// 	},
// 	attrHandle: {
// 		href: function(elem){
// 			return elem.getAttribute("href");
// 		}
// 	},
// 	relative: {
// 		"+": function(checkSet, part, isXML){
// 			var isPartStr = typeof part === "string",
// 				isTag = isPartStr && !/\W/.test(part),
// 				isPartStrNotTag = isPartStr && !isTag;

// 			if ( isTag && !isXML ) {
// 				part = part.toUpperCase();
// 			}

// 			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
// 				if ( (elem = checkSet[i]) ) {
// 					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

// 					checkSet[i] = isPartStrNotTag || elem && elem.nodeName === part ?
// 						elem || false :
// 						elem === part;
// 				}
// 			}

// 			if ( isPartStrNotTag ) {
// 				Sizzle.filter( part, checkSet, true );
// 			}
// 		},
// 		">": function(checkSet, part, isXML){
// 			var isPartStr = typeof part === "string";

// 			if ( isPartStr && !/\W/.test(part) ) {
// 				part = isXML ? part : part.toUpperCase();

// 				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
// 					var elem = checkSet[i];
// 					if ( elem ) {
// 						var parent = elem.parentNode;
// 						checkSet[i] = parent.nodeName === part ? parent : false;
// 					}
// 				}
// 			} else {
// 				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
// 					var elem = checkSet[i];
// 					if ( elem ) {
// 						checkSet[i] = isPartStr ?
// 							elem.parentNode :
// 							elem.parentNode === part;
// 					}
// 				}

// 				if ( isPartStr ) {
// 					Sizzle.filter( part, checkSet, true );
// 				}
// 			}
// 		},
// 		"": function(checkSet, part, isXML){
// 			var doneName = done++, checkFn = dirCheck;

// 			if ( !/\W/.test(part) ) {
// 				var nodeCheck = part = isXML ? part : part.toUpperCase();
// 				checkFn = dirNodeCheck;
// 			}

// 			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
// 		},
// 		"~": function(checkSet, part, isXML){
// 			var doneName = done++, checkFn = dirCheck;

// 			if ( typeof part === "string" && !/\W/.test(part) ) {
// 				var nodeCheck = part = isXML ? part : part.toUpperCase();
// 				checkFn = dirNodeCheck;
// 			}

// 			checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
// 		}
// 	},
// 	find: {
// 		ID: function(match, context, isXML){
// 			if ( typeof context.getElementById !== "undefined" && !isXML ) {
// 				var m = context.getElementById(match[1]);
// 				return m ? [m] : [];
// 			}
// 		},
// 		NAME: function(match, context, isXML){
// 			if ( typeof context.getElementsByName !== "undefined" ) {
// 				var ret = [], results = context.getElementsByName(match[1]);

// 				for ( var i = 0, l = results.length; i < l; i++ ) {
// 					if ( results[i].getAttribute("name") === match[1] ) {
// 						ret.push( results[i] );
// 					}
// 				}

// 				return ret.length === 0 ? null : ret;
// 			}
// 		},
// 		TAG: function(match, context){
// 			return context.getElementsByTagName(match[1]);
// 		}
// 	},
// 	preFilter: {
// 		CLASS: function(match, curLoop, inplace, result, not, isXML){
// 			match = " " + match[1].replace(/\\/g, "") + " ";

// 			if ( isXML ) {
// 				return match;
// 			}

// 			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
// 				if ( elem ) {
// 					if ( not ^ (elem.className && (" " + elem.className + " ").indexOf(match) >= 0) ) {
// 						if ( !inplace )
// 							result.push( elem );
// 					} else if ( inplace ) {
// 						curLoop[i] = false;
// 					}
// 				}
// 			}

// 			return false;
// 		},
// 		ID: function(match){
// 			return match[1].replace(/\\/g, "");
// 		},
// 		TAG: function(match, curLoop){
// 			for ( var i = 0; curLoop[i] === false; i++ ){}
// 			return curLoop[i] && isXML(curLoop[i]) ? match[1] : match[1].toUpperCase();
// 		},
// 		CHILD: function(match){
// 			if ( match[1] == "nth" ) {
// 				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
// 					match[2] == "even" && "2n" || match[2] == "odd" && "2n+1" ||
// 					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

// 				match[2] = (test[1] + (test[2] || 1)) - 0;
// 				match[3] = test[3] - 0;
// 			}

// 			match[0] = done++;

// 			return match;
// 		},
// 		ATTR: function(match, curLoop, inplace, result, not, isXML){
// 			var name = match[1].replace(/\\/g, "");

// 			if ( !isXML && Expr.attrMap[name] ) {
// 				match[1] = Expr.attrMap[name];
// 			}

// 			if ( match[2] === "~=" ) {
// 				match[4] = " " + match[4] + " ";
// 			}

// 			return match;
// 		},
// 		PSEUDO: function(match, curLoop, inplace, result, not){
// 			if ( match[1] === "not" ) {
// 				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
// 					match[3] = Sizzle(match[3], null, null, curLoop);
// 				} else {
// 					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
// 					if ( !inplace ) {
// 						result.push.apply( result, ret );
// 					}
// 					return false;
// 				}
// 			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
// 				return true;
// 			}

// 			return match;
// 		},
// 		POS: function(match){
// 			match.unshift( true );
// 			return match;
// 		}
// 	},
// 	filters: {
// 		enabled: function(elem){
// 			return elem.disabled === false && elem.type !== "hidden";
// 		},
// 		disabled: function(elem){
// 			return elem.disabled === true;
// 		},
// 		checked: function(elem){
// 			return elem.checked === true;
// 		},
// 		selected: function(elem){
// 			elem.parentNode.selectedIndex;
// 			return elem.selected === true;
// 		},
// 		parent: function(elem){
// 			return !!elem.firstChild;
// 		},
// 		empty: function(elem){
// 			return !elem.firstChild;
// 		},
// 		has: function(elem, i, match){
// 			return !!Sizzle( match[3], elem ).length;
// 		},
// 		header: function(elem){
// 			return /h\d/i.test( elem.nodeName );
// 		},
// 		text: function(elem){
// 			return "text" === elem.type;
// 		},
// 		radio: function(elem){
// 			return "radio" === elem.type;
// 		},
// 		checkbox: function(elem){
// 			return "checkbox" === elem.type;
// 		},
// 		file: function(elem){
// 			return "file" === elem.type;
// 		},
// 		password: function(elem){
// 			return "password" === elem.type;
// 		},
// 		submit: function(elem){
// 			return "submit" === elem.type;
// 		},
// 		image: function(elem){
// 			return "image" === elem.type;
// 		},
// 		reset: function(elem){
// 			return "reset" === elem.type;
// 		},
// 		button: function(elem){
// 			return "button" === elem.type || elem.nodeName.toUpperCase() === "BUTTON";
// 		},
// 		input: function(elem){
// 			return /input|select|textarea|button/i.test(elem.nodeName);
// 		}
// 	},
// 	setFilters: {
// 		first: function(elem, i){
// 			return i === 0;
// 		},
// 		last: function(elem, i, match, array){
// 			return i === array.length - 1;
// 		},
// 		even: function(elem, i){
// 			return i % 2 === 0;
// 		},
// 		odd: function(elem, i){
// 			return i % 2 === 1;
// 		},
// 		lt: function(elem, i, match){
// 			return i < match[3] - 0;
// 		},
// 		gt: function(elem, i, match){
// 			return i > match[3] - 0;
// 		},
// 		nth: function(elem, i, match){
// 			return match[3] - 0 == i;
// 		},
// 		eq: function(elem, i, match){
// 			return match[3] - 0 == i;
// 		}
// 	},
// 	filter: {
// 		PSEUDO: function(elem, match, i, array){
// 			var name = match[1], filter = Expr.filters[ name ];

// 			if ( filter ) {
// 				return filter( elem, i, match, array );
// 			} else if ( name === "contains" ) {
// 				return (elem.textContent || elem.innerText || "").indexOf(match[3]) >= 0;
// 			} else if ( name === "not" ) {
// 				var not = match[3];

// 				for ( var i = 0, l = not.length; i < l; i++ ) {
// 					if ( not[i] === elem ) {
// 						return false;
// 					}
// 				}

// 				return true;
// 			}
// 		},
// 		CHILD: function(elem, match){
// 			var type = match[1], node = elem;
// 			switch (type) {
// 				case 'only':
// 				case 'first':
// 					while ( (node = node.previousSibling) )  {
// 						if ( node.nodeType === 1 ) return false;
// 					}
// 					if ( type == 'first') return true;
// 					node = elem;
// 				case 'last':
// 					while ( (node = node.nextSibling) )  {
// 						if ( node.nodeType === 1 ) return false;
// 					}
// 					return true;
// 				case 'nth':
// 					var first = match[2], last = match[3];

// 					if ( first == 1 && last == 0 ) {
// 						return true;
// 					}

// 					var doneName = match[0],
// 						parent = elem.parentNode;

// 					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
// 						var count = 0;
// 						for ( node = parent.firstChild; node; node = node.nextSibling ) {
// 							if ( node.nodeType === 1 ) {
// 								node.nodeIndex = ++count;
// 							}
// 						}
// 						parent.sizcache = doneName;
// 					}

// 					var diff = elem.nodeIndex - last;
// 					if ( first == 0 ) {
// 						return diff == 0;
// 					} else {
// 						return ( diff % first == 0 && diff / first >= 0 );
// 					}
// 			}
// 		},
// 		ID: function(elem, match){
// 			return elem.nodeType === 1 && elem.getAttribute("id") === match;
// 		},
// 		TAG: function(elem, match){
// 			return (match === "*" && elem.nodeType === 1) || elem.nodeName === match;
// 		},
// 		CLASS: function(elem, match){
// 			return (" " + (elem.className || elem.getAttribute("class")) + " ")
// 				.indexOf( match ) > -1;
// 		},
// 		ATTR: function(elem, match){
// 			var name = match[1],
// 				result = Expr.attrHandle[ name ] ?
// 					Expr.attrHandle[ name ]( elem ) :
// 					elem[ name ] != null ?
// 						elem[ name ] :
// 						elem.getAttribute( name ),
// 				value = result + "",
// 				type = match[2],
// 				check = match[4];

// 			return result == null ?
// 				type === "!=" :
// 				type === "=" ?
// 				value === check :
// 				type === "*=" ?
// 				value.indexOf(check) >= 0 :
// 				type === "~=" ?
// 				(" " + value + " ").indexOf(check) >= 0 :
// 				!check ?
// 				value && result !== false :
// 				type === "!=" ?
// 				value != check :
// 				type === "^=" ?
// 				value.indexOf(check) === 0 :
// 				type === "$=" ?
// 				value.substr(value.length - check.length) === check :
// 				type === "|=" ?
// 				value === check || value.substr(0, check.length + 1) === check + "-" :
// 				false;
// 		},
// 		POS: function(elem, match, i, array){
// 			var name = match[2], filter = Expr.setFilters[ name ];

// 			if ( filter ) {
// 				return filter( elem, i, match, array );
// 			}
// 		}
// 	}
// };

// var origPOS = Expr.match.POS;

// for ( var type in Expr.match ) {
// 	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + /(?![^\[]*\])(?![^\(]*\))/.source );
// 	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source );
// }

// var makeArray = function(array, results) {
// 	array = Array.prototype.slice.call( array, 0 );

// 	if ( results ) {
// 		results.push.apply( results, array );
// 		return results;
// 	}

// 	return array;
// };

// try {
// 	Array.prototype.slice.call( document.documentElement.childNodes, 0 );

// } catch(e){
// 	makeArray = function(array, results) {
// 		var ret = results || [];

// 		if ( toString.call(array) === "[object Array]" ) {
// 			Array.prototype.push.apply( ret, array );
// 		} else {
// 			if ( typeof array.length === "number" ) {
// 				for ( var i = 0, l = array.length; i < l; i++ ) {
// 					ret.push( array[i] );
// 				}
// 			} else {
// 				for ( var i = 0; array[i]; i++ ) {
// 					ret.push( array[i] );
// 				}
// 			}
// 		}

// 		return ret;
// 	};
// }

// var sortOrder;

// if ( document.documentElement.compareDocumentPosition ) {
// 	sortOrder = function( a, b ) {
// 		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
// 			if ( a == b ) {
// 				hasDuplicate = true;
// 			}
// 			return 0;
// 		}

// 		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
// 		if ( ret === 0 ) {
// 			hasDuplicate = true;
// 		}
// 		return ret;
// 	};
// } else if ( "sourceIndex" in document.documentElement ) {
// 	sortOrder = function( a, b ) {
// 		if ( !a.sourceIndex || !b.sourceIndex ) {
// 			if ( a == b ) {
// 				hasDuplicate = true;
// 			}
// 			return 0;
// 		}

// 		var ret = a.sourceIndex - b.sourceIndex;
// 		if ( ret === 0 ) {
// 			hasDuplicate = true;
// 		}
// 		return ret;
// 	};
// } else if ( document.createRange ) {
// 	sortOrder = function( a, b ) {
// 		if ( !a.ownerDocument || !b.ownerDocument ) {
// 			if ( a == b ) {
// 				hasDuplicate = true;
// 			}
// 			return 0;
// 		}

// 		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
// 		aRange.setStart(a, 0);
// 		aRange.setEnd(a, 0);
// 		bRange.setStart(b, 0);
// 		bRange.setEnd(b, 0);
// 		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
// 		if ( ret === 0 ) {
// 			hasDuplicate = true;
// 		}
// 		return ret;
// 	};
// }

// (function(){
// 	var form = document.createElement("div"),
// 		id = "script" + (new Date).getTime();
// 	form.innerHTML = "<a name='" + id + "'/>";

// 	var root = document.documentElement;
// 	root.insertBefore( form, root.firstChild );

// 	if ( !!document.getElementById( id ) ) {
// 		Expr.find.ID = function(match, context, isXML){
// 			if ( typeof context.getElementById !== "undefined" && !isXML ) {
// 				var m = context.getElementById(match[1]);
// 				return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
// 			}
// 		};

// 		Expr.filter.ID = function(elem, match){
// 			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
// 			return elem.nodeType === 1 && node && node.nodeValue === match;
// 		};
// 	}

// 	root.removeChild( form );
// 	root = form = null; // release memory in IE
// })();

// (function(){

// 	var div = document.createElement("div");
// 	div.appendChild( document.createComment("") );

// 	if ( div.getElementsByTagName("*").length > 0 ) {
// 		Expr.find.TAG = function(match, context){
// 			var results = context.getElementsByTagName(match[1]);

// 			if ( match[1] === "*" ) {
// 				var tmp = [];

// 				for ( var i = 0; results[i]; i++ ) {
// 					if ( results[i].nodeType === 1 ) {
// 						tmp.push( results[i] );
// 					}
// 				}

// 				results = tmp;
// 			}

// 			return results;
// 		};
// 	}

// 	div.innerHTML = "<a href='#'></a>";
// 	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
// 			div.firstChild.getAttribute("href") !== "#" ) {
// 		Expr.attrHandle.href = function(elem){
// 			return elem.getAttribute("href", 2);
// 		};
// 	}

// 	div = null; // release memory in IE
// })();

// if ( document.querySelectorAll ) (function(){
// 	var oldSizzle = Sizzle, div = document.createElement("div");
// 	div.innerHTML = "<p class='TEST'></p>";

// 	if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
// 		return;
// 	}

// 	Sizzle = function(query, context, extra, seed){
// 		context = context || document;

// 		if ( !seed && context.nodeType === 9 && !isXML(context) ) {
// 			try {
// 				return makeArray( context.querySelectorAll(query), extra );
// 			} catch(e){}
// 		}

// 		return oldSizzle(query, context, extra, seed);
// 	};

// 	for ( var prop in oldSizzle ) {
// 		Sizzle[ prop ] = oldSizzle[ prop ];
// 	}

// 	div = null; // release memory in IE
// })();

// if ( document.getElementsByClassName && document.documentElement.getElementsByClassName ) (function(){
// 	var div = document.createElement("div");
// 	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

// 	if ( div.getElementsByClassName("e").length === 0 )
// 		return;

// 	div.lastChild.className = "e";

// 	if ( div.getElementsByClassName("e").length === 1 )
// 		return;

// 	Expr.order.splice(1, 0, "CLASS");
// 	Expr.find.CLASS = function(match, context, isXML) {
// 		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
// 			return context.getElementsByClassName(match[1]);
// 		}
// 	};

// 	div = null; // release memory in IE
// })();

// function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
// 	var sibDir = dir == "previousSibling" && !isXML;
// 	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
// 		var elem = checkSet[i];
// 		if ( elem ) {
// 			if ( sibDir && elem.nodeType === 1 ){
// 				elem.sizcache = doneName;
// 				elem.sizset = i;
// 			}
// 			elem = elem[dir];
// 			var match = false;

// 			while ( elem ) {
// 				if ( elem.sizcache === doneName ) {
// 					match = checkSet[elem.sizset];
// 					break;
// 				}

// 				if ( elem.nodeType === 1 && !isXML ){
// 					elem.sizcache = doneName;
// 					elem.sizset = i;
// 				}

// 				if ( elem.nodeName === cur ) {
// 					match = elem;
// 					break;
// 				}

// 				elem = elem[dir];
// 			}

// 			checkSet[i] = match;
// 		}
// 	}
// }

// function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
// 	var sibDir = dir == "previousSibling" && !isXML;
// 	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
// 		var elem = checkSet[i];
// 		if ( elem ) {
// 			if ( sibDir && elem.nodeType === 1 ) {
// 				elem.sizcache = doneName;
// 				elem.sizset = i;
// 			}
// 			elem = elem[dir];
// 			var match = false;

// 			while ( elem ) {
// 				if ( elem.sizcache === doneName ) {
// 					match = checkSet[elem.sizset];
// 					break;
// 				}

// 				if ( elem.nodeType === 1 ) {
// 					if ( !isXML ) {
// 						elem.sizcache = doneName;
// 						elem.sizset = i;
// 					}
// 					if ( typeof cur !== "string" ) {
// 						if ( elem === cur ) {
// 							match = true;
// 							break;
// 						}

// 					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
// 						match = elem;
// 						break;
// 					}
// 				}

// 				elem = elem[dir];
// 			}

// 			checkSet[i] = match;
// 		}
// 	}
// }

// var contains = document.compareDocumentPosition ?  function(a, b){
// 	return a.compareDocumentPosition(b) & 16;
// } : function(a, b){
// 	return a !== b && (a.contains ? a.contains(b) : true);
// };

// var isXML = function(elem){
// 	return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
// 		!!elem.ownerDocument && elem.ownerDocument.documentElement.nodeName !== "HTML";
// };

// var posProcess = function(selector, context){
// 	var tmpSet = [], later = "", match,
// 		root = context.nodeType ? [context] : context;

// 	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
// 		later += match[0];
// 		selector = selector.replace( Expr.match.PSEUDO, "" );
// 	}

// 	selector = Expr.relative[selector] ? selector + "*" : selector;

// 	for ( var i = 0, l = root.length; i < l; i++ ) {
// 		Sizzle( selector, root[i], tmpSet );
// 	}

// 	return Sizzle.filter( later, tmpSet );
// };


// window.Sizzle = Sizzle;

// })();

// ;(function(engine) {
//   var extendElements = Prototype.Selector.extendElements;

//   function select(selector, scope) {
//     return extendElements(engine(selector, scope || document));
//   }

//   function match(element, selector) {
//     return engine.matches(selector, [element]).length == 1;
//   }

//   Prototype.Selector.engine = engine;
//   Prototype.Selector.select = select;
//   Prototype.Selector.match = match;
// })(Sizzle);

// window.Sizzle = Prototype._original_property;
// delete Prototype._original_property;

// var Form = {
//   reset: function(form) {
//     form = $(form);
//     form.reset();
//     return form;
//   },

//   serializeElements: function(elements, options) {
//     if (typeof options != 'object') options = { hash: !!options };
//     else if (Object.isUndefined(options.hash)) options.hash = true;
//     var key, value, submitted = false, submit = options.submit, accumulator, initial;

//     if (options.hash) {
//       initial = {};
//       accumulator = function(result, key, value) {
//         if (key in result) {
//           if (!Object.isArray(result[key])) result[key] = [result[key]];
//           result[key].push(value);
//         } else result[key] = value;
//         return result;
//       };
//     } else {
//       initial = '';
//       //Applied the fix for KN-2986, copied from prototype version 1.7.1. 
//       //the way it serialize form values to be more accurate to the way browsers work that line breaks (\n) are normalized to \r\n.
//       accumulator = function(result, key, values) {
//         if (!Object.isArray(values)) {values = [values];}
//         if (!values.length) {return result;}
//         var encodedKey = encodeURIComponent(key).gsub(/%20/, '+');
//         return result + (result ? "&" : "") + values.map(function (value) {
//           value = value.gsub(/(\r)?\n/, '\r\n');
//           value = encodeURIComponent(value);
//           value = value.gsub(/%20/, '+');
//           return encodedKey + "=" + value;
//         }).join("&");
//       };
//     }

//     return elements.inject(initial, function(result, element) {
//       if (!element.disabled && element.name) {
//         key = element.name; value = $(element).getValue();
//         if (value != null && element.type != 'file' && (element.type != 'submit' || (!submitted &&
//             submit !== false && (!submit || key == submit) && (submitted = true)))) {
//           result = accumulator(result, key, value);
//         }
//       }
//       return result;
//     });
//   }
// };

// Form.Methods = {
//   serialize: function(form, options) {
//     return Form.serializeElements(Form.getElements(form), options);
//   },

//   getElements: function(form) {
//     var elements = $(form).getElementsByTagName('*'),
//         element,
//         arr = [ ],
//         serializers = Form.Element.Serializers;
//     for (var i = 0; element = elements[i]; i++) {
//       arr.push(element);
//     }
//     return arr.inject([], function(elements, child) {
//       if (serializers[child.tagName.toLowerCase()])
//         elements.push(Element.extend(child));
//       return elements;
//     })
//   },

//   getInputs: function(form, typeName, name) {
//     form = $(form);
//     var inputs = form.getElementsByTagName('input');

//     if (!typeName && !name) return $A(inputs).map(Element.extend);

//     for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
//       var input = inputs[i];
//       if ((typeName && input.type != typeName) || (name && input.name != name))
//         continue;
//       matchingInputs.push(Element.extend(input));
//     }

//     return matchingInputs;
//   },

//   disable: function(form) {
//     form = $(form);
//     Form.getElements(form).invoke('disable');
//     return form;
//   },

//   enable: function(form) {
//     form = $(form);
//     Form.getElements(form).invoke('enable');
//     return form;
//   },

//   findFirstElement: function(form) {
//     var elements = $(form).getElements().findAll(function(element) {
//       return 'hidden' != element.type && !element.disabled;
//     });
//     var firstByIndex = elements.findAll(function(element) {
//       return element.hasAttribute('tabIndex') && element.tabIndex >= 0;
//     }).sortBy(function(element) { return element.tabIndex }).first();

//     return firstByIndex ? firstByIndex : elements.find(function(element) {
//       return /^(?:input|select|textarea)$/i.test(element.tagName);
//     });
//   },

//   focusFirstElement: function(form) {
//     form = $(form);
//     var element = form.findFirstElement();
//     if (element) element.activate();
//     return form;
//   },

//   request: function(form, options) {
//     form = $(form), options = Object.clone(options || { });

//     var params = options.parameters, action = form.readAttribute('action') || '';
//     if (action.blank()) action = window.location.href;
//     options.parameters = form.serialize(true);

//     if (params) {
//       if (Object.isString(params)) params = params.toQueryParams();
//       Object.extend(options.parameters, params);
//     }

//     if (form.hasAttribute('method') && !options.method)
//       options.method = form.method;

//     return new Ajax.Request(action, options);
//   }
// };

// /*--------------------------------------------------------------------------*/


// Form.Element = {
//   focus: function(element) {
//     $(element).focus();
//     return element;
//   },

//   select: function(element) {
//     $(element).select();
//     return element;
//   }
// };

// Form.Element.Methods = {

//   serialize: function(element) {
//     element = $(element);
//     if (!element.disabled && element.name) {
//       var value = element.getValue();
//       if (value != undefined) {
//         var pair = { };
//         pair[element.name] = value;
//         return Object.toQueryString(pair);
//       }
//     }
//     return '';
//   },

//   getValue: function(element) {
//     element = $(element);
//     var method = element.tagName.toLowerCase();
//     return Form.Element.Serializers[method](element);
//   },

//   setValue: function(element, value) {
//     element = $(element);
//     var method = element.tagName.toLowerCase();
//     Form.Element.Serializers[method](element, value);
//     return element;
//   },

//   clear: function(element) {
//     $(element).value = '';
//     return element;
//   },

//   present: function(element) {
//     return $(element).value != '';
//   },

//   activate: function(element) {
//     element = $(element);
//     try {
//       element.focus();
//       if (element.select && (element.tagName.toLowerCase() != 'input' ||
//           !(/^(?:button|reset|submit)$/i.test(element.type))))
//         element.select();
//     } catch (e) { }
//     return element;
//   },

//   disable: function(element) {
//     element = $(element);
//     element.disabled = true;
//     return element;
//   },

//   enable: function(element) {
//     element = $(element);
//     element.disabled = false;
//     return element;
//   }
// };

// /*--------------------------------------------------------------------------*/

// var Field = Form.Element;

// var $F = Form.Element.Methods.getValue;

// /*--------------------------------------------------------------------------*/

// Form.Element.Serializers = (function() {
//   function input(element, value) {
//     switch (element.type.toLowerCase()) {
//       case 'checkbox':
//       case 'radio':
//         return inputSelector(element, value);
//       default:
//         return valueSelector(element, value);
//     }
//   }

//   function inputSelector(element, value) {
//     if (Object.isUndefined(value))
//       return element.checked ? element.value : null;
//     else element.checked = !!value;
//   }

//   function valueSelector(element, value) {
//     if (Object.isUndefined(value)) return element.value;
//     else element.value = value;
//   }

//   function select(element, value) {
//     if (Object.isUndefined(value))
//       return (element.type === 'select-one' ? selectOne : selectMany)(element);

//     var opt, currentValue, single = !Object.isArray(value);
//     for (var i = 0, length = element.length; i < length; i++) {
//       opt = element.options[i];
//       currentValue = this.optionValue(opt);
//       if (single) {
//         if (currentValue == value) {
//           opt.selected = true;
//           return;
//         }
//       }
//       else opt.selected = value.include(currentValue);
//     }
//   }

//   function selectOne(element) {
//     var index = element.selectedIndex;
//     return index >= 0 ? optionValue(element.options[index]) : null;
//   }

//   function selectMany(element) {
//     var values, length = element.length;
//     if (!length) return null;

//     for (var i = 0, values = []; i < length; i++) {
//       var opt = element.options[i];
//       if (opt.selected) values.push(optionValue(opt));
//     }
//     return values;
//   }

//   function optionValue(opt) {
//     return Element.hasAttribute(opt, 'value') ? opt.value : opt.text;
//   }

//   return {
//     input:         input,
//     inputSelector: inputSelector,
//     textarea:      valueSelector,
//     select:        select,
//     selectOne:     selectOne,
//     selectMany:    selectMany,
//     optionValue:   optionValue,
//     button:        valueSelector
//   };
// })();

// /*--------------------------------------------------------------------------*/


// Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
//   initialize: function($super, element, frequency, callback) {
//     $super(callback, frequency);
//     this.element   = $(element);
//     this.lastValue = this.getValue();
//   },

//   execute: function() {
//     var value = this.getValue();
//     if (Object.isString(this.lastValue) && Object.isString(value) ?
//         this.lastValue != value : String(this.lastValue) != String(value)) {
//       this.callback(this.element, value);
//       this.lastValue = value;
//     }
//   }
// });

// Form.Element.Observer = Class.create(Abstract.TimedObserver, {
//   getValue: function() {
//     return Form.Element.getValue(this.element);
//   }
// });

// Form.Observer = Class.create(Abstract.TimedObserver, {
//   getValue: function() {
//     return Form.serialize(this.element);
//   }
// });

// /*--------------------------------------------------------------------------*/

// Abstract.EventObserver = Class.create({
//   initialize: function(element, callback) {
//     this.element  = $(element);
//     this.callback = callback;

//     this.lastValue = this.getValue();
//     if (this.element.tagName.toLowerCase() == 'form')
//       this.registerFormCallbacks();
//     else
//       this.registerCallback(this.element);
//   },

//   onElementEvent: function() {
//     var value = this.getValue();
//     if (this.lastValue != value) {
//       this.callback(this.element, value);
//       this.lastValue = value;
//     }
//   },

//   registerFormCallbacks: function() {
//     Form.getElements(this.element).each(this.registerCallback, this);
//   },

//   registerCallback: function(element) {
//     if (element.type) {
//       switch (element.type.toLowerCase()) {
//         case 'checkbox':
//         case 'radio':
//           Event.observe(element, 'click', this.onElementEvent.bind(this));
//           break;
//         default:
//           Event.observe(element, 'change', this.onElementEvent.bind(this));
//           break;
//       }
//     }
//   }
// });

// Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
//   getValue: function() {
//     return Form.Element.getValue(this.element);
//   }
// });

// Form.EventObserver = Class.create(Abstract.EventObserver, {
//   getValue: function() {
//     return Form.serialize(this.element);
//   }
// });
// (function() {

//   var Event = {
//     KEY_BACKSPACE: 8,
//     KEY_TAB:       9,
//     KEY_RETURN:   13,
//     KEY_ESC:      27,
//     KEY_LEFT:     37,
//     KEY_UP:       38,
//     KEY_RIGHT:    39,
//     KEY_DOWN:     40,
//     KEY_DELETE:   46,
//     KEY_HOME:     36,
//     KEY_END:      35,
//     KEY_PAGEUP:   33,
//     KEY_PAGEDOWN: 34,
//     KEY_INSERT:   45,

//     cache: {}
//   };

//   var docEl = document.documentElement;
//   var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'onmouseenter' in docEl
//     && 'onmouseleave' in docEl;



//   var isIELegacyEvent = function(event) { return false; };

//   if (window.attachEvent) {
//     if (window.addEventListener) {
//       isIELegacyEvent = function(event) {
//         return !(event instanceof window.Event);
//       };
//     } else {
//       isIELegacyEvent = function(event) { return true; };
//     }
//   }

//   var _isButton;

//   function _isButtonForDOMEvents(event, code) {
//     return event.which ? (event.which === code + 1) : (event.button === code);
//   }

//   var legacyButtonMap = { 0: 1, 1: 4, 2: 2 };
//   function _isButtonForLegacyEvents(event, code) {
//     return event.button === legacyButtonMap[code];
//   }

//   function _isButtonForWebKit(event, code) {
//     switch (code) {
//       case 0: return event.which == 1 && !event.metaKey;
//       case 1: return event.which == 2 || (event.which == 1 && event.metaKey);
//       case 2: return event.which == 3;
//       default: return false;
//     }
//   }

//   if (window.attachEvent) {
//     if (!window.addEventListener) {
//       _isButton = _isButtonForLegacyEvents;
//     } else {
//       _isButton = function(event, code) {
//         return isIELegacyEvent(event) ? _isButtonForLegacyEvents(event, code) :
//          _isButtonForDOMEvents(event, code);
//       }
//     }
//   } else if (Prototype.Browser.WebKit) {
//     _isButton = _isButtonForWebKit;
//   } else {
//     _isButton = _isButtonForDOMEvents;
//   }

//   function isLeftClick(event)   { return _isButton(event, 0) }

//   function isMiddleClick(event) { return _isButton(event, 1) }

//   function isRightClick(event)  { return _isButton(event, 2) }

//   function element(event) {
//     event = Event.extend(event);

//     var node = event.target, type = event.type,
//      currentTarget = event.currentTarget;

//     if (currentTarget && currentTarget.tagName) {
//       if (type === 'load' || type === 'error' ||
//         (type === 'click' && currentTarget.tagName.toLowerCase() === 'input'
//           && currentTarget.type === 'radio'))
//             node = currentTarget;
//     }

//     if (node.nodeType == Node.TEXT_NODE)
//       node = node.parentNode;

//     return Element.extend(node);
//   }

//   function findElement(event, expression) {
//     var element = Event.element(event);

//     if (!expression) return element;
//     while (element) {
//       if (Object.isElement(element) && Prototype.Selector.match(element, expression)) {
//         return Element.extend(element);
//       }
//       element = element.parentNode;
//     }
//   }

//   function pointer(event) {
//     return { x: pointerX(event), y: pointerY(event) };
//   }

//   function pointerX(event) {
//     var docElement = document.documentElement,
//      body = document.body || { scrollLeft: 0 };

//     return event.pageX || (event.clientX +
//       (docElement.scrollLeft || body.scrollLeft) -
//       (docElement.clientLeft || 0));
//   }

//   function pointerY(event) {
//     var docElement = document.documentElement,
//      body = document.body || { scrollTop: 0 };

//     return  event.pageY || (event.clientY +
//        (docElement.scrollTop || body.scrollTop) -
//        (docElement.clientTop || 0));
//   }


//   function stop(event) {
//     Event.extend(event);
//     event.preventDefault();
//     event.stopPropagation();

//     event.stopped = true;
//   }


//   Event.Methods = {
//     isLeftClick:   isLeftClick,
//     isMiddleClick: isMiddleClick,
//     isRightClick:  isRightClick,

//     element:     element,
//     findElement: findElement,

//     pointer:  pointer,
//     pointerX: pointerX,
//     pointerY: pointerY,

//     stop: stop
//   };

//   var methods = Object.keys(Event.Methods).inject({ }, function(m, name) {
//     m[name] = Event.Methods[name].methodize();
//     return m;
//   });

//   if (window.attachEvent) {
//     function _relatedTarget(event) {
//       var element;
//       switch (event.type) {
//         case 'mouseover':
//         case 'mouseenter':
//           element = event.fromElement;
//           break;
//         case 'mouseout':
//         case 'mouseleave':
//           element = event.toElement;
//           break;
//         default:
//           return null;
//       }
//       return Element.extend(element);
//     }

//     var additionalMethods = {
//       stopPropagation: function() { this.cancelBubble = true },
//       preventDefault:  function() { this.returnValue = false },
//       inspect: function() { return '[object Event]' }
//     };

//     Event.extend = function(event, element) {
//       if (!event) return false;

//       if (!isIELegacyEvent(event)) return event;

//       if (event._extendedByPrototype) return event;
//       event._extendedByPrototype = Prototype.emptyFunction;

//       var pointer = Event.pointer(event);

//       Object.extend(event, {
//         target: event.srcElement || element,
//         relatedTarget: _relatedTarget(event),
//         pageX:  pointer.x,
//         pageY:  pointer.y
//       });

//       Object.extend(event, methods);
//       Object.extend(event, additionalMethods);

//       return event;
//     };
//   } else {
//     Event.extend = Prototype.K;
//   }

//   if (window.addEventListener) {
//     Event.prototype = window.Event.prototype || document.createEvent('HTMLEvents').__proto__;
//     Object.extend(Event.prototype, methods);
//   }

//   function _createResponder(element, eventName, handler) {
//     var registry = Element.retrieve(element, 'prototype_event_registry');

//     if (Object.isUndefined(registry)) {
//       CACHE.push(element);
//       registry = Element.retrieve(element, 'prototype_event_registry', $H());
//     }

//     var respondersForEvent = registry.get(eventName);
//     if (Object.isUndefined(respondersForEvent)) {
//       respondersForEvent = [];
//       registry.set(eventName, respondersForEvent);
//     }

//     if (respondersForEvent.pluck('handler').include(handler)) return false;

//     var responder;
//     if (eventName.include(":")) {
//       responder = function(event) {
//         if (Object.isUndefined(event.eventName))
//           return false;

//         if (event.eventName !== eventName)
//           return false;

//         Event.extend(event, element);
//         handler.call(element, event);
//       };
//     } else {
//       if (!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED &&
//        (eventName === "mouseenter" || eventName === "mouseleave")) {
//         if (eventName === "mouseenter" || eventName === "mouseleave") {
//           responder = function(event) {
//             Event.extend(event, element);

//             var parent = event.relatedTarget;
//             while (parent && parent !== element) {
//               try { parent = parent.parentNode; }
//               catch(e) { parent = element; }
//             }

//             if (parent === element) return;

//             handler.call(element, event);
//           };
//         }
//       } else {
//         responder = function(event) {
//           Event.extend(event, element);
//           handler.call(element, event);
//         };
//       }
//     }

//     responder.handler = handler;
//     respondersForEvent.push(responder);
//     return responder;
//   }

//   function _destroyCache() {
//     for (var i = 0, length = CACHE.length; i < length; i++) {
//       Event.stopObserving(CACHE[i]);
//       CACHE[i] = null;
//     }
//   }

//   var CACHE = [];

//   if (Prototype.Browser.IE)
//     window.attachEvent('onunload', _destroyCache);

//   if (Prototype.Browser.WebKit)
//     window.addEventListener('unload', Prototype.emptyFunction, false);


//   var _getDOMEventName = Prototype.K,
//       translations = { mouseenter: "mouseover", mouseleave: "mouseout" };

//   if (!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED) {
//     _getDOMEventName = function(eventName) {
//       return (translations[eventName] || eventName);
//     };
//   }

//   function observe(element, eventName, handler) {
//     element = $(element);

//     var responder = _createResponder(element, eventName, handler);

//     if (!responder) return element;

//     if (eventName.include(':')) {
//       if (element.addEventListener)
//         element.addEventListener("dataavailable", responder, false);
//       else {
//         element.attachEvent("ondataavailable", responder);
//         element.attachEvent("onlosecapture", responder);
//       }
//     } else {
//       var actualEventName = _getDOMEventName(eventName);

//       if (element.addEventListener)
//         element.addEventListener(actualEventName, responder, false);
//       else
//         element.attachEvent("on" + actualEventName, responder);
//     }

//     return element;
//   }

//   function stopObserving(element, eventName, handler) {
//     element = $(element);

//     var registry = Element.retrieve(element, 'prototype_event_registry');
//     if (!registry) return element;

//     if (!eventName) {
//       registry.each( function(pair) {
//         var eventName = pair.key;
//         stopObserving(element, eventName);
//       });
//       return element;
//     }

//     var responders = registry.get(eventName);
//     if (!responders) return element;

//     if (!handler) {
//       responders.each(function(r) {
//         stopObserving(element, eventName, r.handler);
//       });
//       return element;
//     }

//     var i = responders.length, responder;
//     while (i--) {
//       if (responders[i].handler === handler) {
//         responder = responders[i];
//         break;
//       }
//     }
//     if (!responder) return element;

//     if (eventName.include(':')) {
//       if (element.removeEventListener)
//         element.removeEventListener("dataavailable", responder, false);
//       else {
//         element.detachEvent("ondataavailable", responder);
//         element.detachEvent("onlosecapture", responder);
//       }
//     } else {
//       var actualEventName = _getDOMEventName(eventName);
//       if (element.removeEventListener)
//         element.removeEventListener(actualEventName, responder, false);
//       else
//         element.detachEvent('on' + actualEventName, responder);
//     }

//     registry.set(eventName, responders.without(responder));

//     return element;
//   }

//   function fire(element, eventName, memo, bubble) {
//     element = $(element);

//     if (Object.isUndefined(bubble))
//       bubble = true;

//     if (element == document && document.createEvent && !element.dispatchEvent)
//       element = document.documentElement;

//     var event;
//     if (document.createEvent) {
//       event = document.createEvent('HTMLEvents');
//       event.initEvent('dataavailable', bubble, true);
//     } else {
//       event = document.createEventObject();
//       event.eventType = bubble ? 'ondataavailable' : 'onlosecapture';
//     }

//     event.eventName = eventName;
//     event.memo = memo || { };

//     if (document.createEvent)
//       element.dispatchEvent(event);
//     else
//       element.fireEvent(event.eventType, event);

//     return Event.extend(event);
//   }

//   Event.Handler = Class.create({
//     initialize: function(element, eventName, selector, callback) {
//       this.element   = $(element);
//       this.eventName = eventName;
//       this.selector  = selector;
//       this.callback  = callback;
//       this.handler   = this.handleEvent.bind(this);
//     },

//     start: function() {
//       Event.observe(this.element, this.eventName, this.handler);
//       return this;
//     },

//     stop: function() {
//       Event.stopObserving(this.element, this.eventName, this.handler);
//       return this;
//     },

//     handleEvent: function(event) {
//       var element = Event.findElement(event, this.selector);
//       if (element) this.callback.call(this.element, event, element);
//     }
//   });

//   function on(element, eventName, selector, callback) {
//     element = $(element);
//     if (Object.isFunction(selector) && Object.isUndefined(callback)) {
//       callback = selector, selector = null;
//     }

//     return new Event.Handler(element, eventName, selector, callback).start();
//   }

//   Object.extend(Event, Event.Methods);

//   Object.extend(Event, {
//     fire:          fire,
//     observe:       observe,
//     stopObserving: stopObserving,
//     on:            on
//   });

//   Element.addMethods({
//     fire:          fire,

//     observe:       observe,

//     stopObserving: stopObserving,

//     on:            on
//   });

//   Object.extend(document, {
//     fire:          fire.methodize(),

//     observe:       observe.methodize(),

//     stopObserving: stopObserving.methodize(),

//     on:            on.methodize(),

//     loaded:        false
//   });

//   if (window.Event) Object.extend(window.Event, Event);
//   else window.Event = Event;
// })();

// (function() {
//   /* Support for the DOMContentLoaded event is based on work by Dan Webb,
//      Matthias Miller, Dean Edwards, John Resig, and Diego Perini. */

//   var timer;

//   function fireContentLoadedEvent() {
//     if (document.loaded) return;
//     if (timer) window.clearTimeout(timer);
//     document.loaded = true;
//     document.fire('dom:loaded');
//   }

//   function checkReadyState() {
//     if (document.readyState === 'complete') {
//       document.stopObserving('readystatechange', checkReadyState);
//       fireContentLoadedEvent();
//     }
//   }

//   function pollDoScroll() {
//     try { document.documentElement.doScroll('left'); }
//     catch(e) {
//       timer = pollDoScroll.defer();
//       return;
//     }
//     fireContentLoadedEvent();
//   }

//   if (document.addEventListener) {
//     document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
//   } else {
//     document.observe('readystatechange', checkReadyState);
//     if (window == top)
//       timer = pollDoScroll.defer();
//   }

//   Event.observe(window, 'load', fireContentLoadedEvent);
// })();

// Element.addMethods();

// /*------------------------------- DEPRECATED -------------------------------*/

// Hash.toQueryString = Object.toQueryString;

// var Toggle = { display: Element.toggle };

// Element.Methods.childOf = Element.Methods.descendantOf;

// var Insertion = {
//   Before: function(element, content) {
//     return Element.insert(element, {before:content});
//   },

//   Top: function(element, content) {
//     return Element.insert(element, {top:content});
//   },

//   Bottom: function(element, content) {
//     return Element.insert(element, {bottom:content});
//   },

//   After: function(element, content) {
//     return Element.insert(element, {after:content});
//   }
// };

// var $continue = new Error('"throw $continue" is deprecated, use "return" instead');

// var Position = {
//   includeScrollOffsets: false,

//   prepare: function() {
//     this.deltaX =  window.pageXOffset
//                 || document.documentElement.scrollLeft
//                 || document.body.scrollLeft
//                 || 0;
//     this.deltaY =  window.pageYOffset
//                 || document.documentElement.scrollTop
//                 || document.body.scrollTop
//                 || 0;
//   },

//   within: function(element, x, y) {
//     if (this.includeScrollOffsets)
//       return this.withinIncludingScrolloffsets(element, x, y);
//     this.xcomp = x;
//     this.ycomp = y;
//     this.offset = Element.cumulativeOffset(element);

//     return (y >= this.offset[1] &&
//             y <  this.offset[1] + element.offsetHeight &&
//             x >= this.offset[0] &&
//             x <  this.offset[0] + element.offsetWidth);
//   },

//   withinIncludingScrolloffsets: function(element, x, y) {
//     var offsetcache = Element.cumulativeScrollOffset(element);

//     this.xcomp = x + offsetcache[0] - this.deltaX;
//     this.ycomp = y + offsetcache[1] - this.deltaY;
//     this.offset = Element.cumulativeOffset(element);

//     return (this.ycomp >= this.offset[1] &&
//             this.ycomp <  this.offset[1] + element.offsetHeight &&
//             this.xcomp >= this.offset[0] &&
//             this.xcomp <  this.offset[0] + element.offsetWidth);
//   },

//   overlap: function(mode, element) {
//     if (!mode) return 0;
//     if (mode == 'vertical')
//       return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
//         element.offsetHeight;
//     if (mode == 'horizontal')
//       return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
//         element.offsetWidth;
//   },


//   cumulativeOffset: Element.Methods.cumulativeOffset,

//   positionedOffset: Element.Methods.positionedOffset,

//   absolutize: function(element) {
//     Position.prepare();
//     return Element.absolutize(element);
//   },

//   relativize: function(element) {
//     Position.prepare();
//     return Element.relativize(element);
//   },

//   realOffset: Element.Methods.cumulativeScrollOffset,

//   offsetParent: Element.Methods.getOffsetParent,

//   page: Element.Methods.viewportOffset,

//   clone: function(source, target, options) {
//     options = options || { };
//     return Element.clonePosition(target, source, options);
//   }
// };

// /*--------------------------------------------------------------------------*/

// if (!document.getElementsByClassName) document.getElementsByClassName = function(instanceMethods){
//   function iter(name) {
//     return name.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + name + " ')]";
//   }

//   instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath ?
//   function(element, className) {
//     className = className.toString().strip();
//     var cond = /\s/.test(className) ? $w(className).map(iter).join('') : iter(className);
//     return cond ? document._getElementsByXPath('.//*' + cond, element) : [];
//   } : function(element, className) {
//     className = className.toString().strip();
//     var elements = [], classNames = (/\s/.test(className) ? $w(className) : null);
//     if (!classNames && !className) return elements;

//     var nodes = $(element).getElementsByTagName('*');
//     className = ' ' + className + ' ';

//     for (var i = 0, child, cn; child = nodes[i]; i++) {
//       if (child.className && (cn = ' ' + child.className + ' ') && (cn.include(className) ||
//           (classNames && classNames.all(function(name) {
//             return !name.toString().blank() && cn.include(' ' + name + ' ');
//           }))))
//         elements.push(Element.extend(child));
//     }
//     return elements;
//   };

//   return function(className, parentElement) {
//     return $(parentElement || document.body).getElementsByClassName(className);
//   };
// }(Element.Methods);

// /*--------------------------------------------------------------------------*/

// Element.ClassNames = Class.create();
// Element.ClassNames.prototype = {
//   initialize: function(element) {
//     this.element = $(element);
//   },

//   _each: function(iterator) {
//     this.element.className.split(/\s+/).select(function(name) {
//       return name.length > 0;
//     })._each(iterator);
//   },

//   set: function(className) {
//     this.element.className = className;
//   },

//   add: function(classNameToAdd) {
//     if (this.include(classNameToAdd)) return;
//     this.set($A(this).concat(classNameToAdd).join(' '));
//   },

//   remove: function(classNameToRemove) {
//     if (!this.include(classNameToRemove)) return;
//     this.set($A(this).without(classNameToRemove).join(' '));
//   },

//   toString: function() {
//     return $A(this).join(' ');
//   }
// };

// Object.extend(Element.ClassNames.prototype, Enumerable);

// /*--------------------------------------------------------------------------*/

// (function() {
//   window.Selector = Class.create({
//     initialize: function(expression) {
//       this.expression = expression.strip();
//     },

//     findElements: function(rootElement) {
//       return Prototype.Selector.select(this.expression, rootElement);
//     },

//     match: function(element) {
//       return Prototype.Selector.match(element, this.expression);
//     },

//     toString: function() {
//       return this.expression;
//     },

//     inspect: function() {
//       return "#<Selector: " + this.expression + ">";
//     }
//   });

//   Object.extend(Selector, {
//     matchElements: function(elements, expression) {
//       var match = Prototype.Selector.match,
//           results = [];

//       for (var i = 0, length = elements.length; i < length; i++) {
//         var element = elements[i];
//         if (match(element, expression)) {
//           results.push(Element.extend(element));
//         }
//       }
//       return results;
//     },

//     findElement: function(elements, expression, index) {
//       index = index || 0;
//       var matchIndex = 0, element;
//       for (var i = 0, length = elements.length; i < length; i++) {
//         element = elements[i];
//         if (Prototype.Selector.match(element, expression) && index === matchIndex++) {
//           return Element.extend(element);
//         }
//       }
//     },

//     findChildElements: function(element, expressions) {
//       var selector = expressions.toArray().join(', ');
//       return Prototype.Selector.select(selector, element || document);
//     }
//   });
// })();
