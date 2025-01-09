// Background script that checks for blocked sites on every page load
import {BlockedSites} from 'src/Pages/SiteBlocker.js';

// Function to block websites
const blockWebsites = () => {
    chrome.storage.local.get('blockedSites', (data) => {
      const blockedSites = data.blockedSites || []; // Default to empty array if not found
      const hostname = window.location.hostname;
  
      const isBlocked = blockedSites.some(site => hostname.includes(site));
      if (isBlocked) {
        document.body.innerHTML = `
          <div style="text-align: center; margin-top: 20%;">
            <h1>Site Blocked</h1>
            <p>You are not allowed to access ${hostname}.</p>
          </div>`;
      }
    });
  };
  
  // Run the blocking function on page load
  blockWebsites();
  