console.log("background script loaded");

function sendBlockListToContentScript() {
    const blockedURLs = JSON.parse(localStorage.getItem('blockedURLs')) || [];
    console.log("Sending block list", blockedURLs);
    
    // gets the current tab we are on
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        const currentTabId = tabs[0].id;
        browser.tabs.sendMessage(currentTabId, { action: "blockList", blockedURLs: blockedURLs });
    });
}


browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the tab has finished loading
    if (changeInfo.status === "complete") {
        sendBlockListToContentScript();
    }
});
