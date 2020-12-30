import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import path from 'path';
import StaticFileHandler from 'serverless-aws-static-file-handler';

const clientFilesPath = path.join(__dirname, "./static/")
const fileHandler = new StaticFileHandler(clientFilesPath)

export const html: APIGatewayProxyHandler = async (event, context) => {
  if (!event.path.startsWith('assets/') && !event.path.startsWith('build/')) {
    event.path = 'index.html';
  }
  return fileHandler.get(event, context);
}
