export default async function handler(req, res) {
  const baseUrl = "https://farcaster-stats-card.vercel.app"; // 👈 change if different

  // 🟣 POST = user pressed button + entered username
  if (req.method === "POST") {
    let body = "";
    for await (const chunk of req) body += chunk;
    const payload = JSON.parse(body || "{}");
    const username = payload?.untrustedData?.inputText?.trim() || "demo";

    // Get user data from Neynar API
    const response = await fetch(`${baseUrl}/api/stats?username=${username}`);
    const data = await response.json();

    // Handle error or invalid user
    if (!data || data.error) {
      const errorImg = `${baseUrl}/api/card?username=invalid&followers=0&casts=0`;
      const errorFrame = `
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${errorImg}" />
          <meta property="fc:frame:inputText" content="Enter your Farcaster username" />
          <meta property="fc:frame:button:1" content="Try Again" />
          <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
        </head>
      </html>`;
      res.setHeader("Content-Type", "text/html");
      return res.status(200).send(errorFrame);
    }

    // Generate card using live stats
    const imgUrl = `${baseUrl}/api/card?username=${data.username}&followers=${data.follower_count}&casts=${data.cast_count}`;

    const successFrame = `
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imgUrl}" />
        <meta property="fc:frame:inputText" content="Enter another username" />
        <meta property="fc:frame:button:1" content="Generate Again" />
        <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
      </head>
    </html>`;

    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(successFrame);
  }

  // 🟢 GET = initial frame
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
      <meta property="og:description" content="Generate your personalized Farcaster stats instantly!" />
      <meta property="og:image" content="${baseUrl}/api/card?username=demo&followers=0&casts=0" />
    </head>
    <body style="background:#000;color:#fff;text-align:center;">
      <h2>✅ Farcaster Frame Ready</h2>
      <p>Paste this link on Warpcast and type your username!</p>
    </body>
  </html>`;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
