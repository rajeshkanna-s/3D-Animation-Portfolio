import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const projects=['nocturne-dining','aura-noir-perfume','ember-restaurant','aurelia-developments','soluna-cove-resort','maison-braise','mira-vale-studio','pulseform-fitness'];
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.mp4':'video/mp4'};
projects.forEach((name,index)=>{
 const base=path.join(root,name,'dist','client');
 http.createServer((req,res)=>{
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end();}
  let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);return res.end();}
  let file=path.resolve(base,'.'+pathname);
  if(file!==base&&!file.startsWith(base+path.sep)){res.writeHead(403);return res.end();}
  if(!fs.existsSync(file)||fs.statSync(file).isDirectory())file=path.join(base,'index.html');
  if(!fs.existsSync(file)){res.writeHead(503);return res.end('Build is being prepared.');}
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});
  if(req.method==='HEAD')return res.end();fs.createReadStream(file).pipe(res);
 }).listen(4201+index,'127.0.0.1',()=>console.log(name+' http://127.0.0.1:'+(4201+index)));
});
http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/html'});res.end('<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><title>Reference projects</title><style>body{font:18px system-ui;background:#f6f2e9;color:#182c2c;max-width:900px;margin:60px auto;padding:24px}h1{font:48px Georgia}a{display:block;padding:24px;border-bottom:1px solid #ccc;color:inherit;text-decoration:none}a:hover{background:#e8e0cf}p{color:#596666}</style><h1>Your website collection</h1><p>Separate React projects with original imagery and scroll animation. Booking, inquiry and shopping flows are local demonstrations.</p>'+projects.map((name,i)=>'<a href="http://127.0.0.1:'+(4201+i)+'">'+name.replaceAll('-',' ')+' →</a>').join('')+'</html>');}).listen(4200,'127.0.0.1',()=>console.log('Collection http://127.0.0.1:4200'));
