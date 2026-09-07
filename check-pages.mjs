const token = process.env.GITHUB_TOKEN || '';
const repos = [
  '3D-Animation-Portfolio',
  'velora-chocolate',
  'aurelia-luxury-estates',
  'tidal-veil-skincare',
  'rootsole-footwear',
  'kinroot-fitness',
  'aura-noir-perfume',
  'nocturne-dining',
  'pulseform-fitness',
  'gusto-italian',
  'nova-sneakers',
  'maison-braise',
  'ember-restaurant',
  'soluna-cove-resort',
  'aurelia-developments',
  'solara-atelier',
  'web-roast',
  'mira-vale-studio'
];

async function checkAndEnable(repo) {
  try {
    let res = await fetch(`https://api.github.com/repos/rajeshkanna-s/${repo}/pages`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'NodeJS'
      }
    });

    if (res.status === 200) {
      const data = await res.json();
      console.log(`[OK] ${repo}: ${data.html_url} (status: ${data.status})`);
      return;
    }

    res = await fetch(`https://api.github.com/repos/rajeshkanna-s/${repo}/pages`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'NodeJS'
      },
      body: JSON.stringify({
        source: {
          branch: 'gh-pages',
          path: '/'
        }
      })
    });
    const data = await res.json();
    console.log(`[ENABLED] ${repo}: ${data.html_url || data.message || res.status}`);
  } catch (err) {
    console.error(`[ERR] ${repo}: ${err.message}`);
  }
}

async function main() {
  for (const r of repos) {
    await checkAndEnable(r);
  }
}

main();
