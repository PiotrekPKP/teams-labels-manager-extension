import { DOMMessage, DOMMessageResponse } from "../types";

const messagesFromReactAppListener = async (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  if (msg.type === "GET_DOM") {
    let teamsList = Array.from(
      document
        .querySelectorAll("ul[aria-label^='Teams and Channels list']")
        .item(0)?.childNodes[2]?.childNodes[2]?.childNodes ?? []
    );

    teamsList = teamsList.filter((node) => node.nodeType === Node.ELEMENT_NODE);
    teamsList.shift();

    const response: DOMMessageResponse = {
      data: teamsList.map((teamNode) => {
        const teamName =
          teamNode?.firstChild?.firstChild?.textContent?.trim() ?? "";

        const teamImageUrl =
          (
            teamNode?.firstChild?.firstChild?.firstChild?.firstChild?.childNodes.item(
              1
            ) as HTMLImageElement | undefined
          )?.src ?? "";

        return {
          teamName,
          teamImageUrl: undefined,
        };
      }),
    };

    return sendResponse(response);
  } else if (msg.type === "FIX_TEAMS_NODES") {
    let teamsList = Array.from(
      document
        .querySelectorAll("ul[aria-label^='Teams and Channels list']")
        .item(0)?.childNodes[2]?.childNodes[2]?.childNodes ?? []
    );

    teamsList = teamsList.filter((node) => node.nodeType === Node.ELEMENT_NODE);
    teamsList.shift();

    teamsList?.forEach((teamNode, i) => {
      if (
        teamNode?.firstChild?.firstChild?.firstChild?.childNodes[1]?.firstChild
          ?.childNodes[1]
      )
        teamNode.firstChild.firstChild.firstChild.childNodes[1].firstChild.childNodes[1].textContent =
          msg?.data![i]?.replaceWith ??
          teamNode?.firstChild?.firstChild?.textContent;
    });

    return sendResponse({ data: [] });
  }

  return sendResponse({ data: [] });
};

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
