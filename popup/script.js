let blockedURLs = JSON.parse(localStorage.getItem('blockedURLs')) || [];

function updateBlockedSitesDisplay() {
    const blockedSitesList = document.querySelector('.blocked-sites-ul');
    blockedSitesList.innerHTML = ''; 

    blockedURLs.forEach((site, index) => {
        const li = document.createElement('li');
        li.className = 'blocked-sites-li';
        li.innerHTML = `
            <div class="site-info">
                <img class="favicon" src="" alt="">
                <p class="site-url">${site.url}</p>
            </div>
            <img src="assets/delete.svg" alt="delete" class="delete-btn" data-index="${index}">
        `;
        blockedSitesList.appendChild(li);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            blockedURLs.splice(index, 1); 
            localStorage.setItem('blockedURLs', JSON.stringify(blockedURLs)); 
            updateBlockedSitesDisplay(); 
        });
    });
}

function initPopup() {
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        const currentTab = tabs[0];
        document.getElementById('site-name').textContent = currentTab.title || 'Current Site';
        document.getElementById('iconUrl').src = currentTab.favIconUrl || '';

        document.querySelector('#block-site .primary-btn').addEventListener('click', function() {
            blockedURLs.push({ url: currentTab.url }); 
            localStorage.setItem('blockedURLs', JSON.stringify(blockedURLs)); 
            updateBlockedSitesDisplay(); 
            alert('Site blocked successfully!');
        });
    });

    setupTabNavigation();
    setupEditBlockListButton();

    updateBlockedSitesDisplay(); 
}

function setupTabNavigation() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(evt) {
            document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');
            tabs.forEach(t => t.classList.remove('tab-btn-active'));
            document.getElementById(tab.getAttribute('data-target')).style.display = 'block';
            tab.classList.add('tab-btn-active');
        });
    });

    if (tabs.length > 0) {
        tabs[0].click(); // Display the first tab by default
    }
}

function setupEditBlockListButton() {
    document.querySelector('.secondary-btn').addEventListener('click', function() {
        document.querySelector('[data-target="block-list"]').click(); // Simulate a click on the "Block List" tab
    });
}

document.addEventListener('DOMContentLoaded', initPopup);
