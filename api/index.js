export default async function handler(req, res) {
  // Redirect permanently to the Frame HTML
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://farcaster-stats-card.vercel.app/api/card?username=demo&followers=0&casts=0" />
        <meta property="fc:frame:inputText" content="Enter your Farcaster username" />
        <meta property="fc:frame:button:1" content="Generate My Stats" />
        <meta property="fc:frame:post_url" content="https://farcaster-stats-card.vercel.app/api/frame" />
        <meta property="og:title" content="Farcaster Stats Card" />
        <meta property="og:description" content="Generate and share your Farcaster stats instantly!" />
        <meta property="og:image" content="https://farcaster-stats-card.vercel.app/api/card?username=demo&followers=0&casts=0" />
      </head>
      <body style="background:#000;color:#fff;text-align:center;">
        <h2>✅ Farcaster Frame Ready</h2>
        <p>Use this link directly in Warpcast to create your card!</p>
      </body>
    </html>
  `);
}
