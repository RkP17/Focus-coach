/* global chrome */
export function fetchBlockedAndAllowedSites() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['blockedSites', 'allowedSites'], (data) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(data);
        }
      });
    });
  }
  