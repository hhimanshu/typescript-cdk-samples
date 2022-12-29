import * as path from "path";

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
            {key: 'uri', value: 'neo4j+s://XX.databases.neo4j.io'},
            {key: 'user', value: 'neo4j'},
            {key: 'password', value: 'XX'},
        ]
    }
]
