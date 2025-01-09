document.getElementById("timerLink").addEventListener("click", () => {
    chrome.tabs.create({ url: "http://localhost:3001/timer" });
  });
  
  document.getElementById("blockToggle").addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    chrome.runtime.sendMessage({
      action: isChecked ? "startTimer" : "stopTimer",
    
    });
  });
  