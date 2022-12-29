import * as path from "path";

type FunctionDefinition = {
    id: string,
    type: "zip" | "docker",
    handlerFilePath: string,
    handlerName: string
}

export const functions: FunctionDefinition[] = [
    {
        id: 'HelloWorldSimple',
        type: "zip",
        handlerFilePath: path.join(__dirname, '..', 'src', '1_helloworld', 'index.ts'),
        handlerName: 'handler'
    }
]
