import * as path from "path";

type FunctionDefinition = {
    id: string,
    handlerFilePath: string,
    handlerName: string
}

export const functions: FunctionDefinition[] = [
    {
        id: 'HelloWorldSimple',
        handlerFilePath: path.join(__dirname, '..', 'src', '1_helloworld', 'index.ts'),
        handlerName: 'handler'
    },
    {
        id: 'CurrentDateSimple',
        handlerFilePath: path.join(__dirname, '..', 'src', '2_date', 'index.ts'),
        handlerName: 'handler'
    }
]
