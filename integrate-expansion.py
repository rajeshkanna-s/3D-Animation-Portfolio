from pathlib import Path
for folder in ['web-roast','solara-atelier']:
 p=Path(folder)/'src/App.jsx';s=p.read_text(encoding='utf-8-sig')
 s=s.replace("const[page,setPage]=useState('Home'),", "const[page,navigate]=usePage(['Home','Story','Drinks','Spaces','Journal','Visit','Collection','Craft','Experience',...extraPages]);useMotion(page);const ")
 s=s.replace("const go=p=>{setPage(p);setMenu(false);window.scrollTo({top:0,behavior:'smooth'})}","const go=p=>{navigate(p);setMenu(false)}")
 s="import {usePage,useMotion} from './experience-hooks.js';\nimport {MoreMenu,Discovery,Studio,ExtraPage,extraPages} from './Expansion.jsx';\nimport './expansion.css';\n"+s
 s=s.replace('</nav>','<MoreMenu go={go}/></nav>',1)
 s=s.replace("{page==='Home'?", "{extraPages.includes(page)?<ExtraPage page={page} go={go} "+('reserve={reserve}' if folder=='solara-atelier' else '')+"/>:page==='Home'?",1)
 if folder=='web-roast':
  s=s.replace('<Values/><section className="featured">','<Values/><Studio go={go} embedded/><section className="featured">',1)
  s=s.replace('<Craft/></>:page', '<Craft/><Discovery go={go}/></>:page',1)
  s=s.replace('<div className="visit-card">','<div className="visit-card"><img className="venue-photo" src="./assets/cafe.png" alt="Inside Web Roast, a bright neighborhood café with red stools and navy details"/>')
  s=s.replace('<article key={title}><label>','<article key={title}><img loading="lazy" className="journal-photo" src={"./assets/"+["cafe.png","roastery.png","iced-coffee.png"][i]} alt={title}/><label>')
  s=s.replace('<button className="button" onClick={()=>go(\'Drinks\')}>Explore Our Drinks', '<button className="button" onClick={()=>go(\'Brew Lab\')}>Explore in 3D')
 else:
  s=s.replace('<CraftIntro go={go}/><Collection','<Studio reserve={reserve} embedded/><CraftIntro go={go}/><Collection',1)
  s=s.replace('<Experience reserve={reserve}/></>:page', '<Experience reserve={reserve}/><Discovery go={go}/></>:page',1)
  s=s.replace('Three expressions of time.<br/>Each born from the desert, each<br/>with a purpose.','Six distinct expressions of time.<br/>New materials. New horizons.<br/>One unmistakable philosophy.')
  s=s.replace('<Benefits/></section>:<section className="journal">','<img className="venue-photo" src="./assets/desert.png" alt="The Solara desert pavilion beneath an eclipse"/><Benefits/></section>:<section className="journal">')
  s=s.replace(".map(x=><article key={x[0]}><label>{x[0]}</label><h2>",".map((x,i)=><article key={x[0]}><img loading=\"lazy\" className=\"journal-photo\" src={\"./assets/\"+[\"desert.png\",\"movement.png\",\"atelier.png\"][i]} alt={x[1]}/><label>{x[0]}</label><h2>")
 s=s.replace('</main>','</main><div className="footer-links">{extraPages.map(p=><a key={p} href={"#/"+p.toLowerCase().replaceAll(" ","-")} onClick={()=>go(p)}>{p}</a>)}</div>')
 s=s.replace('src="/assets/','src="./assets/')
 p.write_text(s,encoding='utf-8')
 css=Path(folder)/'src/styles.css';v=css.read_text(encoding='utf-8-sig').replace("url('./assets/", "url('/assets/");css.write_text(v,encoding='utf-8')
 p=Path(folder)/'src/ProductScene.jsx';p.write_text(p.read_text(encoding='utf-8-sig').replace('src="/assets/','src="./assets/'),encoding='utf-8')
 with (Path(folder)/'AGENTS.md').open('a',encoding='utf-8') as f:f.write('\nUser requested expanded image variety, additional pages, and proper 3D animation on 2026-09-07. Preserve both brands, real WebGL product viewers, hash deep links, reduced-motion support, and GitHub Pages subpath-compatible assets.\n')
