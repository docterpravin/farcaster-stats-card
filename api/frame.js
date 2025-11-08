export default async function handler(req, res) {
  const baseUrl = "https://farcaster-stats-card.vercel.app"; // 👈 your domain

  // Default GET: Frame metadata for Warpcast
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${baseUrl}/api/card?username=demo&followers=0&casts=0" />
      <meta property="fc:frame:inputText" content="Enter your Farcaster username" />
      <meta property="fc:frame:button:1" content="Generate My Stats" />
      <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
      <meta property="og:title" content="Farcaster Stats Card" />
      <meta property="og:description" content="Create and share your Farcaster stats instantly!" />
      <meta property="og:image" content="${baseUrl}/api/card?username=demo&followers=0&casts=0" />
    </head>
    <body style="background:#000;color:#fff;text-align:center;">
      <h2>✅ Farcaster Frame Ready</h2>
      <p>Share this link on Warpcast to generate your stats card.</p>
    </body>
  </html>`;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
