const fs = require('fs');

const reportPath = 'test-results/cucumber-report.html';
let html = fs.readFileSync(reportPath, 'utf8');

// Remove previous injected script if exists
html = html.replace(/<script id="AUTO_EXPAND">[\s\S]*?<\/script>\s*/g, '');

const injected = `
<script id="AUTO_EXPAND">
(function () {
  function expandAll() {
    // Click everything that is collapsed
    const collapsed = Array.from(document.querySelectorAll('[aria-expanded="false"]'));
    collapsed.forEach(el => {
      // some elements might not be clickable themselves; try nearest button/link
      const clickable =
        el.closest('button,[role="button"],a') ||
        (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button' ? el : null);

      try { (clickable || el).click(); } catch (e) {}
    });
  }

  // Run a few times because the report is rendered dynamically
  let tries = 0;
  const maxTries = 50; // ~5 seconds
  const interval = setInterval(() => {
    expandAll();
    tries++;
    if (tries >= maxTries) clearInterval(interval);
  }, 100);

  // Also observe new DOM nodes and expand them
  const obs = new MutationObserver(() => expandAll());
  obs.observe(document.documentElement, { childList: true, subtree: true });

  // Final expand after load
  window.addEventListener('load', () => {
    expandAll();
    setTimeout(expandAll, 500);
    setTimeout(expandAll, 1500);
  });
})();
</script>
`;

if (!html.includes('</body>')) {
  throw new Error('No </body> tag found in report HTML');
}

html = html.replace('</body>', `${injected}\n</body>`);
fs.writeFileSync(reportPath, html, 'utf8');

console.log('✔ Cucumber report auto-expanded (aria-expanded clicker)');
