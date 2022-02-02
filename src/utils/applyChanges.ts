import { DOMMessage } from "../types";

export const applyChanges = async () => {
  chrome.storage.sync.get("teamsLabelData", (data) => {
    console.log("Got from storage ->", data);

    chrome.tabs &&
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        await chrome.tabs.sendMessage(
          tabs[0].id || 0,
          { type: "FIX_TEAMS_NODES", data: data.teamsLabelData } as DOMMessage,
          () => {}
        );
      });
  });
};
