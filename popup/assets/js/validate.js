(async function () {
  const { userLoggedInResponse, userDataDoc } = await chrome.storage.local.get([
    "userLoggedInResponse",
    "userDataDoc",
  ]);

  const { pathname } = window.location;

  if (userLoggedInResponse && userDataDoc) {
    if (pathname.includes("/login.html")) window.location = "./index.html";
  } else if (!pathname.includes("/login.html"))
    window.location = "./login.html";
})();
