export default async function handler(req, res) {
  const baseUrl = "https://farcaster-stats-card.vercel.app"; // change after deploy
  const frameData = {
    "frame:version": "vNext",
    "frame:image": `${baseUrl}/api/card?username=demo&followers=10&casts=20`,
    "frame:post_url": `${baseUrl}/api/frame`,
    "frame:buttons": [{ "label": "Generate My Stats" }],
    "og:title": "Farcaster Stats Card",
    "og:description": "Generate and share your Farcaster stats instantly!",
    "og:image": `${baseUrl}/api/card?username=demo&followers=10&casts=20`
  };
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(frameData);
}
