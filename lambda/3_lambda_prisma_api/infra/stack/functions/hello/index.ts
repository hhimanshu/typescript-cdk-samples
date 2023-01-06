import {Context, APIGatewayProxyResult, APIGatewayEvent} from 'aws-lambda';
import {sayHello} from "@app/src/functions/hello";

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log("Hey Hey!")
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: sayHello(),
        }),
    };
}
