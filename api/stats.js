export default async function handler(req, res) {
  try {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: "Username is required" });

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/user-by-username?username=${username}`,
      { headers: { accept: "application/json", api_key: process.env.NEYNAR_API_KEY } }
    );
    const data = await response.json();

    if (!data.result || !data.result.user)
      return res.status(404).json({ error: "User not found on Neynar" });

    const u = data.result.user;
    res.status(200).json({
      username: u.username,
      display_name: u.display_name,
      follower_count: u.follower_count,
      following_count: u.following_count,
      cast_count: u.cast_count
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
