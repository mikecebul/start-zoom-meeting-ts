interface ZoomTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export async function getZoomToken(): Promise<ZoomTokenResponse | undefined> {
  const accountId = Bun.env.S2S_ACCOUNT_ID;
  const clientId = Bun.env.S2S_CLIENT_ID;
  const clientSecret = Bun.env.S2S_CLIENT_SECRET;

  // Encode clientId and clientSecret to base64
  const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const url = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Host: "zoom.us",
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    if (response.ok) {
      const json: ZoomTokenResponse = await response.json();
      return json;
    } else {
      console.log(`Failed to fetch, status: ${response.status}`);
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
}

getZoomToken();
