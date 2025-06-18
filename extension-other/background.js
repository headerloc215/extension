chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startProcess") {
    console.log(sender);
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: startProcess,
      args: [message.options],
    });
    chrome.scripting.executeScript({
      target: { allFrames: true, tabId: sender.tab.id },
      files: ["injected.js"], // Your external script file
    });
  }
});

function startProcess(options) {
  console.log("Process started with options:", options);

  // Your process logic here using the options
}
