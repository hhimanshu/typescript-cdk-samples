import {Context, APIGatewayProxyResult, APIGatewayEvent} from 'aws-lambda';
// @ts-ignore
import {countRecords} from "./core/count";
import {search} from "./core/search";

const uri = process.env.uri as string
const user = process.env.user as string
const password = process.env.password as string

export const countsHandler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: await countRecords({
                uri, user, password
            }),
        }),
    };
};

/**
 * searchTerm is hardcoded since this is only lambda for now.
 * When integrated with API Gateway, searchTerm will come as part of the request
 * @param event
 * @param context
 */
export const searchHandler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: await search({
                uri, user, password, searchTerm: "beans"
            }),
        }),
    };
};