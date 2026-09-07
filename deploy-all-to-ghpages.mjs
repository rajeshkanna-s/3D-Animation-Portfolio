import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USER = 'rajeshkanna-s';
const TOKEN = process.env.GITHUB_TOKEN || '';

const projects = [
  { name: 'velora-chocolate', port: 5180, title: 'Velora • Artisan Chocolatier' },
  { name: 'aurelia-luxury-estates', port: 5181, title: 'Aurelia • Luxury Estates' },
  { name: 'tidal-veil-skincare', port: 5182, title: 'Tidal Veil • Ocean Skincare' },
  { name: 'rootsole-footwear', port: 5183, title: 'RootSole • Sustainable Footwear' },
  { name: 'kinroot-fitness', port: 5184, title: 'Kinroot • Adaptive Fitness' },
  { name: 'aura-noir-perfume', port: 5185, title: 'Aura Noir • Haute Parfumerie' },
  { name: 'nocturne-dining', port: 5186, title: 'Nocturne • Open-Hearth Dining' },
  { name: 'pulseform-fitness', port: 5187, title: 'PulseForm • Telemetry Lab' },
  { name: 'gusto-italian', port: 5188, title: 'Gusto Italian • Osteria' },
  { name: 'nova-sneakers', port: 5189, title: 'Nøva • Cyber Streetwear' },
  { name: 'maison-braise', port: 5190, title: 'Maison Braise • Fire Gastronomy' },
  { name: 'ember-restaurant', port: 5191, title: 'Ember • Modernist Cuisine' },
  { name: 'soluna-cove-resort', port: 5192, title: 'Soluna Cove • Luxury Resort' },
  { name: 'aurelia-developments', port: 5193, title: 'Aurelia • Premier Developments' },
  { name: 'solara-atelier', port: 5194, title: 'Solara Atelier • Horology' },
  { name: 'web-roast', port: 5195, title: 'Web Roast • Artisanal Coffee' },
  { name: 'mira-vale-studio', port: 5196, title: 'Mira Vale • Creative Studio' }
];

const distSiteDir = path.join(__dirname, 'dist_site');

function run(cmd, cwd = __dirname) {
  console.log(`\n> [${path.basename(cwd)}] ${cmd}`);
  try {
    return execSync(cmd, { cwd, stdio: 'inherit' });
  } catch (err) {
    console.error(`Error executing ${cmd}:`, err.message);
  }
}

function enableGitHubPages(repoName) {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      source: {
        branch: 'gh-pages',
        path: '/'
      }
    });

    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: `/repos/${GITHUB_USER}/${repoName}/pages`,
      method: 'POST',
      headers: {
        'User-Agent': 'NodeJS',
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          console.log(`  🎉 GitHub Pages enabled for ${repoName}: https://${GITHUB_USER}.github.io/${repoName}/`);
        } else if (res.statusCode === 409 || body.includes('already has a GitHub Pages site')) {
          console.log(`  ℹ️  GitHub Pages already active for ${repoName}: https://${GITHUB_USER}.github.io/${repoName}/`);
        } else {
          console.log(`  Pages API response for ${repoName} (${res.statusCode}): ${body}`);
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.error(`  Failed to enable pages for ${repoName}:`, e.message);
      resolve();
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  console.log('🚀 Starting Unified Build & GitHub Pages Deployment for All Projects...\n');

  // Clean dist_site
  if (fs.existsSync(distSiteDir)) {
    fs.rmSync(distSiteDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distSiteDir, { recursive: true });

  // 1. Build and copy each project
  for (const p of projects) {
    const projDir = path.join(__dirname, p.name);
    if (!fs.existsSync(projDir)) continue;

    console.log(`\n📦 Building ${p.name}...`);
    const viteBin = path.join(projDir, 'node_modules', 'vite', 'bin', 'vite.js');
    if (fs.existsSync(viteBin)) {
      run(`node "${viteBin}" build --base ./`, projDir);
    } else {
      run(`npx -y vite build --base ./`, projDir);
    }

    // Determine dist location
    let outDir = path.join(projDir, 'dist');
    if (fs.existsSync(path.join(projDir, 'dist', 'client'))) {
      outDir = path.join(projDir, 'dist', 'client');
    }

    if (fs.existsSync(outDir)) {
      const targetSubDir = path.join(distSiteDir, p.name);
      fs.cpSync(outDir, targetSubDir, { recursive: true });
      console.log(`  ✅ Copied ${p.name} build to dist_site/${p.name}`);

      // Also deploy to individual repo gh-pages branch
      try {
        console.log(`  📤 Deploying ${p.name} to standalone gh-pages branch...`);
        const tempGitDir = path.join(__dirname, '.temp_gh_' + p.name);
        if (fs.existsSync(tempGitDir)) fs.rmSync(tempGitDir, { recursive: true, force: true });
        fs.mkdirSync(tempGitDir, { recursive: true });
        fs.cpSync(outDir, tempGitDir, { recursive: true });

        // Add .nojekyll
        fs.writeFileSync(path.join(tempGitDir, '.nojekyll'), '');

        run('git init', tempGitDir);
        run(`git config user.name "${GITHUB_USER}"`, tempGitDir);
        run(`git config user.email "s.rajeshkanna@kuwy.in"`, tempGitDir);
        run('git checkout -b gh-pages', tempGitDir);
        run('git add -A', tempGitDir);
        run(`git commit -m "Deploy ${p.name} to GitHub Pages"`, tempGitDir);
        run(`git remote add origin https://${TOKEN}@github.com/${GITHUB_USER}/${p.name}.git`, tempGitDir);
        run('git push -f origin gh-pages', tempGitDir);
        fs.rmSync(tempGitDir, { recursive: true, force: true });

        await enableGitHubPages(p.name);
      } catch (e) {
        console.warn(`  Could not deploy standalone for ${p.name}:`, e.message);
      }
    }
  }

  // 2. Prepare Master Hub
  console.log('\n🌟 Bundling Master Hub into dist_site...');
  const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  fs.writeFileSync(path.join(distSiteDir, 'index.html'), indexHtml);
  fs.writeFileSync(path.join(distSiteDir, '.nojekyll'), '');

  // Copy reference assets if any
  const refImagesDir = path.join(__dirname, 'Sites refence images');
  if (fs.existsSync(refImagesDir)) {
    fs.cpSync(refImagesDir, path.join(distSiteDir, 'Sites refence images'), { recursive: true });
  }

  // 3. Deploy Master Portfolio to 3D-Animation-Portfolio gh-pages
  console.log('\n🚀 Deploying Master Portfolio Hub to 3D-Animation-Portfolio gh-pages...');
  const masterTempGit = path.join(__dirname, '.temp_gh_master');
  if (fs.existsSync(masterTempGit)) fs.rmSync(masterTempGit, { recursive: true, force: true });
  fs.mkdirSync(masterTempGit, { recursive: true });
  fs.cpSync(distSiteDir, masterTempGit, { recursive: true });

  run('git init', masterTempGit);
  run(`git config user.name "${GITHUB_USER}"`, masterTempGit);
  run(`git config user.email "s.rajeshkanna@kuwy.in"`, masterTempGit);
  run('git checkout -b gh-pages', masterTempGit);
  run('git add -A', masterTempGit);
  run(`git commit -m "Deploy 3D Animation Portfolio Master Hub & all subprojects"`, masterTempGit);
  run(`git remote add origin https://${TOKEN}@github.com/${GITHUB_USER}/3D-Animation-Portfolio.git`, masterTempGit);
  run('git push -f origin gh-pages', masterTempGit);
  fs.rmSync(masterTempGit, { recursive: true, force: true });

  await enableGitHubPages('3D-Animation-Portfolio');

  console.log('\n✨ ALL DEPLOYMENTS COMPLETE!');
  console.log(`🌐 Master Hub URL: https://${GITHUB_USER}.github.io/3D-Animation-Portfolio/\n`);
}

main();
