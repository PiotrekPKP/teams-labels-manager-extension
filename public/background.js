/*global chrome*/

setInterval(async () => {
  try {
    chrome.storage.sync.get("teamsLabelData", (data) => {
      chrome.tabs &&
        chrome.tabs.query(
          { active: true, currentWindow: true },
          async (tabs) => {
            await chrome.tabs.sendMessage(
              tabs[0].id || 0,
              { type: "FIX_TEAMS_NODES", data: data.teamsLabelData },
              () => {}
            );
          }
        );
    });
  } catch (e) {
    console.log("Error ->", e);
  }
}, 1500);
