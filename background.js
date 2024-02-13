browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getBlockList") {
        browser.storage.local.get(["blockedURLs"]).then((result) => {
            sendResponse({ blockedURLs: result.blockedURLs || [] });
            console.log("Sending block list", result.blockedURLs);

        });
        return true; 
    }
});
