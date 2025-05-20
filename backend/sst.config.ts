import { SSTConfig } from "sst";
import { ConfigStack } from "./stacks/ConfigStack";

export default {
  config(_input) {
    return {
      name: "aircraft-utilization-backend",
      region: "us-east-1",
      stage: 'neel' //TODO: set it as a key
    };
  },
  stacks(app) {
    app.stack(ConfigStack);
  }
} satisfies SSTConfig;