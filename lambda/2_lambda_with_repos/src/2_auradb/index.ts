import {Context, APIGatewayProxyResult, APIGatewayEvent} from 'aws-lambda';
// @ts-ignore
import {main} from "./core";

const uri = process.env.uri as string
const user = process.env.user as string
const password = process.env.password as string

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    console.log(`URI=${uri}`)

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: await main({
                uri, user, password
            }),
        }),
    };
};