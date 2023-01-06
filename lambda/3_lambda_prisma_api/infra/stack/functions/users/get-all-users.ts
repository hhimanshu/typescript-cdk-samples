import {APIGatewayEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import {getAllUsers} from "@app/src/functions/users/read";

const DATABASE_URL = process.env.DATABASE_URL;

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log("Hey Hey!")
    console.log(`DATABASE_URL=${DATABASE_URL}`)

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: getAllUsers(),
        }),
    };
}
