import open from "open";
import { getZoomToken } from "./getToken";

const token = await getZoomToken();

  async function startZoomMeeting() {
    const meetingId = Bun.env.MEETING_ID;
    const bearerToken = token?.access_token;
  
    const url = `https://api.zoom.us/v2/meetings/${meetingId}`;
  
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    };
  
    const response = await fetch(url, { headers });
    const respJson = await response.json();
  
    // console.log("Response Json:", respJson);
  
    const startUrl = respJson["start_url"];
  
    console.log("Start Url:", startUrl);
  
    open(startUrl);
  }


startZoomMeeting();
