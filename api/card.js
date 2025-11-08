export default async function handler(req, res) {
  const { username, followers, casts } = req.query;
  const user = username || "unknown";
  const fol = followers || 0;
  const cas = casts || 0;

  const html = `
  <html>
    <head>
      <style>
        body {
          background: linear-gradient(135deg,#111,#333);
          color:#fff;font-family:sans-serif;
          display:flex;flex-direction:column;
          align-items:center;justify-content:center;
          height:100vh;margin:0;text-align:center;
        }
        h1{font-size:50px;margin-bottom:10px;}
        .box{background:rgba(255,255,255,0.1);padding:20px 40px;border-radius:20px;}
      </style>
    </head>
    <body>
      <h1>@${user}</h1>
      <div class="box">
        <p>👥 Followers: ${fol}</p>
        <p>📝 Casts: ${cas}</p>
      </div>
      <footer>Made with 💜 by Pravinbhai</footer>
    </body>
  </html>`;
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
