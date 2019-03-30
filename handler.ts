import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import fs from 'fs';

export const html: APIGatewayProxyHandler = async (event, _context) => {
  console.log(event, _context);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: fs.readFileSync('./static/index.html').toString(),
  };
};
