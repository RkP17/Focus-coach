

/* global chrome */
const generateHTML = (pageName) => {
    return `
     
     <div id="clouds">
        <div class="cloud x1"></div>
        <div class="cloud x1_5"></div>
        <div class="cloud x2"></div>
        <div class="cloud x3"></div>
        <div class="cloud x4"></div>
        <div class="cloud x5"></div>
    </div>
    <div class='c'>
        <div class='_404'>404</div>
        <hr>
        <div class='_1'>GET BACK TO WORK</div>
        <div class='_2'>STUDYING > ${pageName}</div>
    </div>
     `;
  };

  //if (window.location.hostname==="www.youtube.com"){
    //document.body.innerHTML = generateHTML();
  //}
/*
if (chrome && chrome.webRequest) {
    console.log("chrome.webRequest API is available.");
  } else {
    console.error("chrome.webRequest API is not available.");
  }
  
*/

  const blockWebsites = () => {
    // retrieve the list of blocked sites
    const blockedSites = JSON.parse(localStorage.getItem('blockedSites'));
    //console.log(`blocked: ${blockedSites}`);
    // get the current hostname 
    const hostname=window.location.hostname;
    
    const isBlocked = blockedSites.some(site => hostname.includes(site));
    if (isBlocked) {
        document.body.innerHTML = `
        <div style="text-align: center; margin-top: 20%;">
            <h1>Site Blocked</h1>
            <p>You are not allowed to access ${hostname}.</p>
        </div>`;
    }
    
  }

 /* 
  const debugStorage = () => {
    const blockedSites = localStorage.getItem('blockedSites');
    const allowedSites = localStorage.getItem('allowedSites');

    console.log('Blocked Sites:', blockedSites);
    console.log('Allowed Sites:', allowedSites);
  };

// Run the debugging function on startup
debugStorage();
*/
blockWebsites();
  