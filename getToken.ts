const authCode = Bun.env.AUTH_CODE;
const clientId = Bun.env.CLIENT_ID;
const clientSecret = Bun.env.CLIENT_SECRET;
const redirectUri = Bun.env.REDIRECT_URI;

const tokenReqBody = new URLSearchParams();
tokenReqBody.append("grant_type", "authorization_code");
tokenReqBody.append("code", authCode!);
tokenReqBody.append("redirect_uri", redirectUri!);

const tokenReqHeaders = {
  Authorization:
    "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
};

export async function fetchToken() {
  const tokenResponse = await fetch("https://zoom.us/oauth/token", {
    method: "POST",
    headers: tokenReqHeaders,
    body: tokenReqBody,
  });

  const tokenData = await tokenResponse.json();
  console.log(tokenData);
  return tokenData.access_token
}
