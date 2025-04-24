import axios from "axios";

const ENDPOINT =
  "https://hac.friscoisd.org/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f";

export const apiService = {
  getVerificationToken: async () => {
    const response = await axios.get(ENDPOINT);
    const html = response.data;

    // Extract token using regex
    const tokenMatch = html.match(
      /name="__RequestVerificationToken" type="hidden" value="([^"]+)"/
    );

    if (!tokenMatch) {
      console.log("Token not found in HTML");
      return null;
    }

    const token = tokenMatch[1];
    return token;
  },
};

