import React, { useEffect, useState } from "react";
import { DOMMessage, DOMMessageResponse } from "./types";
import "./app.css";
import { applyChanges } from "./utils/applyChanges";

const App = () => {
  const [data, setData] = useState<DOMMessageResponse["data"]>([]);

  useEffect(() => {
    chrome.storage.sync.get("teamsLabelData", (data) => {
      if (!!data.teamsLabelData) {
        setData(data.teamsLabelData as DOMMessageResponse["data"]);
        return;
      }

      chrome.tabs &&
        chrome.tabs.query(
          { active: true, currentWindow: true },
          async (tabs) => {
            await chrome.tabs.sendMessage(
              tabs[0].id || 0,
              { type: "GET_DOM" } as DOMMessage,
              (response: DOMMessageResponse) => {
                setData(response?.data ?? []);
              }
            );
          }
        );
    });
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Change team names</h1>
        <button
          onClick={async () => {
            console.log("Saving to storage ->", data);
            await chrome.storage.sync.set({ teamsLabelData: data });
            await applyChanges();
          }}
        >
          Save changes
        </button>
      </header>
      <div className="app-content">
        {data.map((teamNode, i) => (
          <div key={i}>
            {teamNode.teamImageUrl ? (
              <img
                src={teamNode.teamImageUrl}
                alt={teamNode.teamName + " Profile picture"}
              />
            ) : (
              <></>
            )}
            <h3>Rename {teamNode.teamName} to:</h3>
            <input
              defaultValue={teamNode.replaceWith}
              onChange={(e) => {
                const newData = data;
                newData[i].replaceWith = e.target.value;

                setData(newData);
              }}
            />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
