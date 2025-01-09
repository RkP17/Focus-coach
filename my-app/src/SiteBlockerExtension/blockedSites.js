export const getblockedSites = () => {
    return JSON.parse(localStorage.getItem("blockedSites") || "[]");
}

export const setBlockedSites = () => {
    localStorage.setItem("blockedSites",JSON.parse(sites));
}