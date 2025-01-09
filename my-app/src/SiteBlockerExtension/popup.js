document.getElementById("timerLink").addEventListener("click", () => {
  chrome.tabs.create({ url: "http://localhost:3001/timer" });
});

// Event listener to handle save button click and save settings
document.getElementById("saveButton").addEventListener("click", () => {
  const blockedSitesValue = document.getElementById("BlockSitesInput").value;
  const allowedSitesValue = document.getElementById("AllowSitesInput").value;

  // Convert the values into arrays by splitting the input based on newlines
  const blockedSitesArray = blockedSitesValue.split('\n').map(site => site.trim()).filter(site => site !== '');
  const allowedSitesArray = allowedSitesValue.split('\n').map(site => site.trim()).filter(site => site !== '');

  
  // Save to chrome storage
  chrome.storage.local.set({
    blockedSites: blockedSitesArray,
    allowedSites: allowedSitesArray
  }, () => {
    console.log("Settings saved!");
  });
});

chrome.storage.local.get(['blockedSites', 'allowedSites'], (data) => {
  // Ensure blockedSitesInput is updated with the saved sites
  if (data.blockedSites) {
    document.getElementById('blockedSitesInput').value = data.blockedSites.join('\n');
  } else {
    document.getElementById('blockedSitesInput').value = '';  // Set to empty if no data exists
  }
  
  if (data.allowedSites) {
    document.getElementById('allowedSitesInput').value = data.allowedSites.join('\n');
  } else {
    document.getElementById('allowedSitesInput').value = '';  // Set to empty if no data exists
  }
});

// Event listener for block toggle (for starting/stopping the timer)
document.getElementById("blockToggle").addEventListener("change", (event) => {
  const isChecked = event.target.checked;
  chrome.runtime.sendMessage({
    action: isChecked ? "startTimer" : "stopTimer",
  });
});

// Fetch saved block/allow lists from chrome storage when popup loads
window.addEventListener("load", () => {
  chrome.storage.local.get(['blockedSites', 'allowedSites'], (data) => {
    if (data.blockedSites) {
      document.getElementById("blockedSitesInput").value = data.blockedSites.join('\n');
    }
    if (data.allowedSites) {
      document.getElementById("allowedSitesInput").value = data.allowedSites.join('\n');
    }
  });
});
