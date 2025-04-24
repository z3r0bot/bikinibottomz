# BikinibottomZ Deployment Guide

This guide will help you deploy the BikinibottomZ e-commerce website to AWS Amplify.

## Prerequisites

1. AWS Account
2. AWS CLI installed
3. AWS Amplify CLI installed
4. GitHub repository with the BikinibottomZ code

## Deployment Steps

### 1. Install AWS Amplify CLI

```bash
npm install -g @aws-amplify/cli
```

### 2. Configure AWS Amplify

```bash
amplify configure
```

Follow the prompts to:
- Sign in to your AWS account
- Create a new IAM user
- Set up your local AWS profile

### 3. Initialize Amplify in your project

```bash
amplify init
```

When prompted:
- Enter a name for the project: `bikinibottomz`
- Enter a default editor: Choose your preferred editor
- Choose the type of app: `javascript`
- Choose the JavaScript framework: `react`
- Choose the source directory path: `src`
- Choose the distribution directory path: `.next`
- Choose the build command: `npm run build`
- Choose the start command: `npm start`

### 4. Add hosting to your Amplify project

```bash
amplify add hosting
```

Choose:
- Select the plugin module to execute: `Hosting with Amplify Console`
- Choose a type: `Manual deployment`

### 5. Push the changes to AWS

```bash
amplify push
```

### 6. Publish your application

```bash
amplify publish
```

### 7. Connect GitHub repository for continuous deployment

1. Go to the AWS Amplify Console
2. Click "New app" > "Host web app"
3. Choose "GitHub" as your repository source
4. Connect your GitHub account and select the bikinibottomz repository
5. Configure the build settings:
   - Framework: Next.js
   - Build command: `npm run build`
   - Start command: `npm start`
6. Click "Save and deploy"

## Environment Variables

If you need to add environment variables:

1. Go to the AWS Amplify Console
2. Select your app
3. Go to "Environment variables"
4. Add your variables

## Custom Domain

To add a custom domain:

1. Go to the AWS Amplify Console
2. Select your app
3. Go to "Domain Management"
4. Click "Add domain"
5. Follow the prompts to configure your domain

## Troubleshooting

If you encounter issues during deployment:

1. Check the build logs in the AWS Amplify Console
2. Verify that all dependencies are correctly specified in package.json
3. Ensure that the build commands in amplify.yml are correct
4. Check that your Next.js configuration is compatible with AWS Amplify

## Additional Resources

- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [AWS Amplify CLI Documentation](https://docs.aws.amazon.com/amplify/latest/userguide/cli.html) 