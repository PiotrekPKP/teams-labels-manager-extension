export type DOMMessage = {
  type: "GET_DOM" | "FIX_TEAMS_NODES";
  data?: DOMMessageResponse["data"];
};

export type DOMMessageResponse = {
  data: { teamName: string; teamImageUrl?: string; replaceWith?: string }[];
  teamNodesData?: ChildNode[];
};
