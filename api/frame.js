export default async function handler(req, res) {
  const baseUrl = "https://farcaster-stats-card.vercel.app"; // change if your URL differs

  // If it's a POST request (user clicked the Frame button)
  if (req.method === "POST") {
    const body = await new Promise(resolve => {
      let data = "";
      req.on("data", chunk => (data += chunk));
      req.on("end", () => resolve(data));
    });

    const payload = JSON.parse(body || "{}");
    const username = payload?.untrustedData?.inputText || "demo";

    // Generate user stats dynamically
    const statsUrl = `${baseUrl}/api/stats?username=${username}`;
    const response = await fetch(statsUrl);
    const data = await response.json();

    // Now create dynamic image link
    const imgUrl = `${baseUrl}/api/card?username=${data.username}&followers=${data.follower_count}&casts=${data.cast_count}`;

    const frame = {
      "frame:version": "vNext",
      "frame:image": imgUrl,
      "frame:buttons": [{ label: "🔁 Generate Again" }],
      "frame:inputText": "Enter your Farcaster username",
      "og:title": "Your Farcaster Stats Card",
      "og:description": "Made by Pravinbhai 💜"
    };

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(frame);
  }

  // Default (GET request) — initial frame
  const initialFrame = {
    "frame:version": "vNext",
    "frame:image": `${baseUrl}/api/card?username=demo&followers=0&casts=0`,
    "frame:post_url": `${baseUrl}/api/frame`,
    "frame:buttons": [{ label: "Generate My Stats" }],
    "frame:inputText": "Enter your Farcaster username",
    "og:title": "Farcaster Stats Card",
    "og:description": "Create your own stats card instantly",
    "og:image": `${baseUrl}/api/card?username=demo&followers=0&casts=0`
  };

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(initialFrame);
}

