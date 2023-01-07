import * as path from "path";
import {FunctionDefinition} from "../types";
import * as dotenv from "dotenv";

dotenv.config();

export const functionDefinitions: FunctionDefinition[] = [
    {
        id: 'FakerGetFullName',
        handlerFilePath: path.join(__dirname, '..', '..', 'src', '1_faker', 'index.ts'),
        handlerName: 'handler'
    },
    {
        id: 'AuraDbTotalNodes',
        handlerFilePath: path.join(__dirname, '..', '..', 'src', '2_auradb', 'index.ts'),
        handlerName: 'countsHandler',
        envVariables: [
            {key: 'uri', value: process.env.DB_URI as string},
            {key: 'user', value: process.env.DB_USER as string},
            {key: 'password', value: process.env.DB_PASSWD as string},
        ]
    },
    {
        id: 'AuraDbSearch',
        handlerFilePath: path.join(__dirname, '..', '..', 'src', '2_auradb', 'index.ts'),
        handlerName: 'searchHandler',
        envVariables: [
            {key: 'uri', value: process.env.DB_URI as string},
            {key: 'user', value: process.env.DB_USER as string},
            {key: 'password', value: process.env.DB_PASSWD as string},
        ]
    },
]