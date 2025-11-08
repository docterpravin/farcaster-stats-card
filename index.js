export default function handler(req, res) {
  const baseUrl = "https://farcaster-stats-card.vercel.app";

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${baseUrl}/api/card?username=demo&followers=0&casts=0" />
    <meta property="fc:frame:inputText" content="Enter your Farcaster username" />
    <meta property="fc:frame:button:1" content="Generate My Stats" />
    <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
    <meta property="og:title" content="Farcaster Stats Card" />
    <meta property="og:description" content="Generate your Farcaster stats instantly!" />
    <meta property="og:image" content="${baseUrl}/api/card?username=demo&followers=0&casts=0" />
    <title>Farcaster Stats Card</title>
  </head>
  <body style="background-color:#000; color:#fff; text-align:center; font-family:sans-serif;">
    <h2>✅ Farcaster Frame Ready</h2>
    <p>Share this link on Warpcast to generate your stats card.</p>
  </body>
</html>
`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}
