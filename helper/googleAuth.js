import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
dotenv.config();

const myOAuth2Client = new OAuth2Client(
  "72207059976-4533ehb37edbpfepval9bp4u8d88ilup.apps.googleusercontent.com",
  "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"
);

myOAuth2Client.setCredentials({
  refresh_token:
    "1//04IctbJ68nGzGCgYIARAAGAQSNwF-L9IryF_OHerRbeXOc0Z2HEdMVfqnwLRoL9-Vm2wxfXvW4dC74M0nE3L2hnZZ0hiXMNdCvnc",
});

const getAccessTokenGoogle = async () => {
  console.log("--vao get access token--");
  try {
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    console.log("myAccessTokenObject", myAccessTokenObject?.token);
    return myAccessTokenObject?.token;
  } catch (error) {
    console.error("Error fetching access token:", error.message);
    throw error;
  }
};
export default getAccessTokenGoogle;
