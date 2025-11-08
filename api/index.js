export default function handler(req, res) {
  res.writeHead(302, { Location: "/api/frame" });
  res.end();
}
