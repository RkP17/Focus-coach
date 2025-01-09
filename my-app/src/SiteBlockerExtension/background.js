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
  
  const blockWebsites = () => {
    // retrieve the list of blocked sites
    const blockedSite = JSON.parse(localStorage.getItem('blockedSites')||[]);

    // get the current hostname 
    const hostname=window.location.hostname;
    
    //check if the current hostnaame matches site in blocked list
    const matched = blockedSite.some((site) => window.location.href.includes(site));

    //if the match 
    if (matched){
        document.body.innerHTML=generateHTML(matched);
    }
  }

  blockWebsites();