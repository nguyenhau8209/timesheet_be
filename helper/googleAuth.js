import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
dotenv.config();

const myOAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

myOAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const getAccessTokenGoogle = async () => {
  console.log("--vao get access token--");
  try {
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    // console.log("myAccessTokenObject", myAccessTokenObject?.token);
    return myAccessTokenObject?.token;
  } catch (error) {
    console.error("Error fetching access token:", error.message);
    throw error;
  }
};
export default getAccessTokenGoogle;
