import { create, type TwConfig } from "twrnc";
import tailwindConfig from "../../../tailwind.config.js";

// create the customized version...
const tw = create(tailwindConfig as TwConfig);

// ... and then this becomes the main function your app uses
export default tw;
