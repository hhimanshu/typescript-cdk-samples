export type EnvVar = {
    key: string,
    value: string
}


export type FunctionDefinition = {
    id: string,
    handlerFilePath: string,
    handlerName: string,
    envVariables?: EnvVar[];
}