# Steps to Set Up CI/CD Pipeline Manually (Gen2)

## Configure AWS Credentials Manually by Running `aws sso configure`
- First, log into your AWS account, create a new IAM user, enable an IAM role for the user, and grant the user access to the projects.
- Next, answer the questions in the terminal and set the credentials.
- Then, add a service role to the deployed app (see [AWS Amplify Service Role](https://docs.aws.amazon.com/amplify/latest/userguide/amplify-service-role.html) for more details).

## Build AWS Backend Locally
- Run `ampx npx sandbox` to create the sandbox environment and build the Amplify backend. This command generates authentication and data resource files and provides a basic Todo schema that you can modify to meet the project's needs.
- You can deploy the backend app separately in a multi-repo app: [Multi-Repo Deployment](https://docs.amplify.aws/react/deploy-and-host/fullstack-branching/mono-and-multi-repos/).
- For a monorepo app, refer to: [Monorepo Deployment](https://docs.amplify.aws/react/deploy-and-host/fullstack-branching/monorepos/).

## Import Data into DynamoDB in Amplify
- Create an S3 bucket in the same account and region as your app.
- Assign the IAM service role of your app (choose from the existing roles in the dropdown). If you don't see the role, it means the role does not have access to S3; in that case, add S3 permissions to the role policy.
- Ensure that the role has Lambda function permissions and S3 read permissions attached.
- Upload your data as JSON files to the S3 bucket.
- Create a Lambda function to import the S3 bucket files into the tables. Below is an example function (for Node.js 18+) for a games hub project to upload genres and games data:

  ```javascript
  import { S3 } from "@aws-sdk/client-s3";
  import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
  import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
  const timestamp = new Date().toISOString(); // Generates a valid timestamp

  // Initialize AWS SDK clients
  const s3 = new S3({});
  const dynamoClient = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(dynamoClient);

  export const handler = async (event) => {
    const s3Params = {
      Bucket: "genres-games", // Replace with your S3 bucket name
      Key: "genres.json", // Replace with your S3 object key (file name)
    };

    try {
      // Fetch data from S3
      const { Body } = await s3.getObject(s3Params);
      const genresData = JSON.parse(await Body.transformToString());

      // Insert data into DynamoDB tables
      for (const genre of genresData) {
        const putParams = new PutCommand({
          TableName: "Genre-m4h2lk6cbfhjbpk7tsv2qiga4i-NONE", // Replace with your Genre table name
          Item: {
            ...genre,
            id: String(genre.id), // Ensure ID is a string
            createdAt: timestamp,
            updatedAt: timestamp,
          },
        });
        await docClient.send(putParams);

        // Handle nested games
        for (const game of genre.games) {
          const gameParams = new PutCommand({
            TableName: "Game-m4h2lk6cbfhjbpk7tsv2qiga4i-NONE", // Replace with your Game table name
            Item: {
              ...game,
              id: String(game.id),
              genreId: String(genre.id), // Assign genreId to link game to genre
              createdAt: timestamp,
              updatedAt: timestamp,
            },
          });
          await docClient.send(gameParams);
        }
      }

      return { statusCode: 200, body: "Data uploaded successfully!" };
    } catch (error) {
      console.error(error);
      return { statusCode: 500, body: "Failed to upload data" };
    }
  };