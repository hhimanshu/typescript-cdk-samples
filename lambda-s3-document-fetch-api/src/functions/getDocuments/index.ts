import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Context} from 'aws-lambda'
import {_Object, GetObjectCommand, ListObjectsCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({});
const bucketName = process.env.DOCUMENTS_BUCKET_NAME

export const getDocuments = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    console.log(`Bucket Name: ${bucketName}`)
    try {
        const command = new ListObjectsCommand({
            Bucket: bucketName
        });
        const response = await s3Client.send(command);

        //const documents = await Promise.all(response.Contents?.map(doc => generateSignedURL(doc)))
        let documents = await Promise.all(response.Contents!.map(doc => generateSignedURL(doc)));
        return {
            statusCode: 200,
            body: JSON.stringify(documents)
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: err.message
        }
    }
}

const generateSignedURL = async (doc: _Object): Promise<{ filename: string, url: string }> => {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: doc.Key!,
    })
    const url = await getSignedUrl(s3Client, command, {expiresIn: 180})
    console.log({url})
    return {
        filename: doc.Key!,
        url: url
    }
}
