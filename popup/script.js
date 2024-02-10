let blockedURL = [];

browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
    const currentTab = tabs[0];
    
    const websiteName = currentTab.title;
    const websiteURL = currentTab.url;
    const websiteFavicon = currentTab.favIconUrl;
  
    
    document.getElementById('websiteName').textContent = websiteName;
    document.getElementById('iconUrl').src = websiteFavicon;
    document.getElementById('iconUrl').style.width = '64px';
    document.getElementById('iconUrl').style.height = '64px';

    console.log("hello world");

    document.querySelector('.block-button').addEventListener('click', function() {
        // Add the current website URL to the blockedUrls array
        blockedURL.push(websiteURL);
        console.log('Blocked URLs:', blockedURL);
    });
    
});