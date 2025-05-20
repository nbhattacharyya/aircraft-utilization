import { StackContext } from "sst/constructs";
import * as sst from 'sst/constructs';

export const ConfigsStack = ({stack, app}: StackContext) => {
    
    const AVIATION_STACK_API_KEY = new sst.Config.Secret(stack, 'AVIATION_STACK_API_KEY');
    const AVIATION_STACK_API_URL = new sst.Config.Secret(stack, 'AVIATION_STACK_API_URL');
    const BTS_DATA_URL = new sst.Config.Secret(stack, 'BTS_DATA_URL');

    return {
        AVIATION_STACK_API_KEY,
        AVIATION_STACK_API_URL,
        BTS_DATA_URL
    };
}