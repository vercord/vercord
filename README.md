# Vercel to Discord

A lightweight integration service that connects Vercel deployments with Discord,
delivering real-time status notifications to your team channels. Enhance your
DevOps workflow with immediate visibility into your deployment pipeline.

## Features

- Real-time deployment event notifications
- Support for all Vercel webhook event types
- Rich Discord embeds with status-specific colors and icons
- Direct links to Vercel deployments, projects, and GitHub commits
- Context-rich information including branch, commit, and environment details
- Reliable delivery with retry mechanism for handling rate limits
- Easily extensible for customization

## Setup Guide

1. **Deploy to Vercel**

   - [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Vercord/vercord)
   - No need to fork, just use the button above.

2. **Get your Discord webhook URL**

   - Go to your Discord server settings → Integrations → Webhooks
   - Create a webhook for your desired channel and copy the URL

3. **Set up Vercel's webhook**

   - In the [Vercel dashboard](https://vercel.com/dashboard) (not the project),
     go to Settings → Webhooks
   - Add a new webhook with URL:
     `https://<your-deployed-url>/api/vercel-webhook`
   - Select the events you want notifications for
   - Copy the secret Vercel generates for you

4. **Set environment variables and redeploy**
   - In your Vercel project settings, set:
     ```
     DISCORD_WEBHOOK_URL=your_discord_webhook_url
     WEBHOOK_INTEGRATION_SECRET=vercel_generated_secret
     ```
   - Redeploy your project on Vercel

## Security Considerations

- Store your webhook secret securely with a unique value for each integration
- All incoming webhooks are validated using HMAC-SHA1 signatures
- Webhook payloads are validated against a strict schema to ensure data
  integrity

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

---

Originally conceptualized by [@rewbs](https://github.com/rewbs).
