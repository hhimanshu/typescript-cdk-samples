import * as path from "path";

type FunctionDefinition = {
    id: string,
    handlerFilePath: string,
    handlerName: string
}

export const functions: FunctionDefinition[] = [
    {
        id: 'FakerGetFullName',
        handlerFilePath: path.join(__dirname, '..', 'src', '1_faker', 'index.ts'),
        handlerName: 'handler'
    }
]
