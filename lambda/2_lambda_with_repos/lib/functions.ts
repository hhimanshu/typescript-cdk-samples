import * as path from "path";
import * as dotenv from 'dotenv'

dotenv.config();

type EnvVar = {
    key: string,
    value: string
}

type FunctionDefinition = {
    id: string,
    handlerFilePath: string,
    handlerName: string,
    envVariables?: EnvVar[];
}

export const functions: FunctionDefinition[] = [
    {
        id: 'FakerGetFullName',
        handlerFilePath: path.join(__dirname, '..', 'src', '1_faker', 'index.ts'),
        handlerName: 'handler'
    }, {
        id: 'AuraDbTotalNodes',
        handlerFilePath: path.join(__dirname, '..', 'src', '2_auradb', 'index.ts'),
        handlerName: 'handler',
        envVariables: [
            {key: 'uri', value: process.env.DB_URI as string},
            {key: 'user', value: process.env.DB_USER as string},
            {key: 'password', value: process.env.DB_PASSWD as string},
        ]
    }
]
