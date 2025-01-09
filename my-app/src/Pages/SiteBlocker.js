/* global chrome */

import React,{useState,useEffect,useRef} from 'react'
import "./siteBlocker.css";

function SiteBlocker() {
  // store the sites needs ot be a list since it has more than one site
  const[blockedSites,setBlockedSites]=useState('');
  const[allowesSites,setAllowedSites]=useState('');

  const blockedSitesRef = useRef();

  useEffect (() => {
    //get the items 
    const savedBlockedList=localStorage.getItem('blockedSites');
    const savedAllowedList=localStorage.getItem('allowedSites');

    if(savedBlockedList) setBlockedSites(savedBlockedList);
    if(savedAllowedList) setAllowedSites(savedAllowedList);
  },[]);


  // handle the changes of the site
  const BlockedSiteChange = (e) => {
    const value = e.target.value;

    // Convert the input into an array of sites (split by newline, filter empty values)
    const blockedSitesArray = value.split('\n').map(site => site.trim()).filter(site => site !== '');

    // Update state and save to localStorage as JSON
    setBlockedSites(value);
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ blockedSites: blockedSitesArray }, () => {
        console.log('Blocked Sites saved to chrome.storage:', blockedSitesArray);
      });
    } else {
      console.log('chrome.storage is not available. Data will not be saved.');
      // Optionally, you could fall back to localStorage if needed (but it's not recommended)
      localStorage.setItem('blockedSites', JSON.stringify(blockedSitesArray));
    }
    /*
    localStorage.setItem('blockedSites', JSON.stringify(blockedSitesArray));
    const storedBlockedSites = JSON.parse(localStorage.getItem('blockedSites'));
    // Log the correctly parsed array
    console.log('Blocked Sites saved2 :', storedBlockedSites);  
    */

  }

  const AllowedSiteChange = (e) => {
    const value=e.target.value;
    setAllowedSites(value);
    localStorage.setItem('allowedSites',value)
  }

  return (
    <div className='Blocker'>
      <div className='Ttile'>
        <h1>
          SiteBlocker
        </h1>
      </div>
      <div className='Blocked-Sites'>
        <h2>Blocked Sites</h2>
        <textarea
          value={blockedSites}
          onChange={BlockedSiteChange}
          rows={10}
          cols={40}
          placeholder='Enter sites to block one per line'
        />
      </div>
      <div className='Allowed-Sites'>
        <h2>Allowed Sites</h2>
        <textarea
          value={allowesSites}
          onChange={AllowedSiteChange}
          rows={10}
          cols={40}
          placeholder='Enter sites to block one per line'
        />
      </div>
    </div>
  )
}

export default SiteBlocker
