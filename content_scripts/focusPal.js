console.log("focusPal.js loaded");

browser.runtime.onMessage.addListener((message) => {
    if (message.action === "blockList") {
        const currentURL = window.location.href;
        const blockedURLs = message.blockedURLs || [];
        console.log("Checking block list for current URL", currentURL);

        if (blockedURLs.some(blocked => currentURL.includes(blocked.url))) {
            document.body.innerHTML = '<h1>This site has been blocked by FocusPal.</h1>';
        }
    }
});
