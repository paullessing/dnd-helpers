import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'dnd-helpers',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-2',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    staticHtml: {
      handler: 'handler.html',
      events: [
        {
          http: {
            method: 'get',
            path: '{location+}',
          }
        },
        {
          http: {
            method: 'get',
            path: '',
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
