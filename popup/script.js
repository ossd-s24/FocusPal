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

function openTab(evt, tabName) {
    tabBtn = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabBtn.length; i++) {
        tabBtn[i].className = "tab-btn";
    }
    evt.target.classList.add("tab-btn-active")

    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    if (tabName === "block-site"){
        document.getElementById(tabName).style.display = "flex";
    }
    else {
        document.getElementById(tabName).style.display = "block";
    }
}