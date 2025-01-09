import React,{useState,useEffect} from 'react'
import "./siteBlocker.css";

function SiteBlocker() {
  // store the sites
  const[blockedSites,setBlockedSites]=useState('');
  const[allowesSites,setAllowedSites]=useState('');

  useEffect (() => {
    //get the items 
    const savedBlockedList=localStorage.getItem('blockedSites');
    const savedAllowedList=localStorage.getItem('allowedSites');
    if(savedBlockedList) setBlockedSites(savedBlockedList);
    if(savedAllowedList) setAllowedSites(savedAllowedList);
  })

  // handle the changes of the site
  const BlockedSiteChange = (e) => {
    const value=e.target.value;
    setBlockedSites(value);
    localStorage.setItem('blockedSites',value)
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
