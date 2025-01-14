// Background script that checks for blocked sites on every page load
const generateSTYLES = () => {
  return `<style>
  @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');

  body {
    background: linear-gradient(90deg,rgb(40, 36, 98),#2d2869,#454084);;
    color: #fff;
    font-family: 'Amatic SC';
    max-height: 700px;
    overflow: hidden;
    font-weight:700px;
    
  }
  .c {
    text-align: center;
    display: block;
    position: relative;
    width: 80%;
    margin: 100px auto;
  }
  
  ._1 {
    text-align: center;
    display: block;
    position: relative;
    font-size: 50px;
    line-height: 80%;
    margin-bottom:20px;
  }
  ._2 {
    text-align: center;
    display: block;
    position: relative;
    font-size: 50px;
  }
    ._3 {
    text-align: center;
    display: block;
    position: relative;
    font-size: 50px;
    line-height: 80%;
    margin-bottom:20px;
  }
  .text {
    font-size: 70px;
    text-align: center;
    position: relative;
    display: inline-block;
    margin: 19px 0px 0px 0px;
    /* top: 256.301px; */
    z-index: 3;
    width: 100%;
    line-height: 1.2em;
    display: inline-block;
  } 
   </style>`;
};



const generateHTML = (pageName) => {
  return `
  <div class='c'>
      <div class='_1'>GET BACK TO WORK!!!</div>
      <div class='_3'>Remember we can do anything we want to if we stick to it long enough</div>
      <div class='_2'>Getting your work done is much more rewarding than ${pageName}</div>
      
  </div>
   `;
};



const blockWebsites = (hostname,tabId) => {
  chrome.storage.local.get('blockedSites', (data) => {
    const blockedSites = data.blockedSites || []; // Default to empty array if not found

    const isBlocked = blockedSites.some(site => hostname.includes(site));
    console.log("Blocked state:", isBlocked);

    if (isBlocked) {
      const blockedPageUrl = chrome.runtime.getURL('blocked.html');
      chrome.tabs.update(tabId, { url: blockedPageUrl }); // Redirect to the blocked page
      
    }
  });
};

// Poll Timer State and Active Tab
const pollTimerState = () => {
  setInterval(() => {
    const timerIsPlaying = JSON.parse(localStorage.getItem('timerIsPlaying')) || false;
    console.log('Timer is playing:', timerIsPlaying);

    if (timerIsPlaying) {
      // Get active tab's URL
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          const activeTab = tabs[0];
          const url = new URL(activeTab.url);
          console.log('Active tab URL:', url.hostname);

          // Block the site if it's in the blocked list
          blockWebsites(url.hostname,activeTab.id);
        }
      });
    }
  }, 1000); // Check every second
};



  const AllowWebsites = () => {
    chrome.storage.local.get('allowedSites', (data) => {
      const allowedSites = data.allowedSites || []; 
      const hostname = window.location.href;
  
      if (allowedSites.some(site => hostname.includes(site))) {
        alert("This is an allowed site. Hopefully, this site will help with your work and not distract you 🙂");
      }
    });
  };


  
  
  //blockWebsites();
  //AllowWebsites();
  pollTimerState();
  
  