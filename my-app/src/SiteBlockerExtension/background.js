// Background script that checks for blocked sites on every page load
const generateSTYLES = () => {
  return `<style>
  @import url(https://fonts.googleapis.com/css?family=opensans:500);
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Ubuntu:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Anton&family=M+PLUS+Rounded+1c&family=Major+Mono+Display&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Playwrite+VN:wght@100..400&display=swap');

  body {
    background: linear-gradient(90deg, #454084,#2d2869,#454084);;
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

// Function to block websites
const blockWebsites = () => {
  chrome.storage.local.get('blockedSites', (data) => {
    const blockedSites = data.blockedSites || []; // Default to empty array if not found
    const hostname = window.location.hostname;

    const isBlocked = blockedSites.some(site => hostname.includes(site));
    if (isBlocked) {
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML(hostname);
      /*
      `
        <div style="text-align: center; margin-top: 20%;background=#fffff;">
          <h1>Site Blocked</h1>
          <p>You are not allowed to access ${hostname}.</p>
          <p> Remember we can do anything we want to if we stick to it long enough</p>
        </div>`;
        */
    }
  });
};

/*
const pollTimerState = () => {
  setInterval(() => {
    console.log(chrome)
    //chrome.storage.local.get('timerIsPlaying', (data) => {
      const isPlaying = data.timerIsPlaying || false; // Default to false if not found
      console.log("retrieved timer state:", isPlaying);
    
      if (isPlaying === true) {
        blockWebsites(); // Block websites if timer is playing
      }else{
        blockWebsites();
      }
    });
  },1000);  // Check every second
};
*/

  const AllowWebsites = () => {
    chrome.storage.local.get('allowedSites', (data) => {
      const allowedSites = data.allowedSites || []; 
      const hostname = window.location.href;
  
      if (allowedSites.some(site => hostname.includes(site))) {
        alert("This is an allowed site. Hopefully, this site will help with your work and not distract you 🙂");
      }
    });
  };
  
  
  blockWebsites();
  //AllowWebsites();
  //pollTimerState();
  