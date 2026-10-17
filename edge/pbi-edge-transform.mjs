// Astra repair of actual Go wrapper draft: footer-scoped edits, exact tuple, no ESM placeholders.
export const REVISION='bkw-20261013-v1';
export const LEGAL='Butterfly Kingdom NSW Pty Ltd';
export const ABN='11 691 050 969';
export const EMAIL='hecate@witch.codes';
export const HOSTS=new Set(['witch.codes','www.witch.codes','witchcraft.beauty','witchcraft.boutique','witchcraft.business','witchcraft.delivery','witchcraft.expert','witchcraft.homes','witchcraft.living','witchcraft.love','witchcraft.markets','witchcraft.pics','witchcraft.recipes','witchcraft.video','anatomy.witchcraft.living','consciousness.witchcraft.living','bestdeals.witchcraft.homes','dailydeals.witchcraft.homes','crossroads.witchcraft.living','cv.witchcraft.expert','old.witchcraft.expert','old.witchcraft.video','old.witchcraft.pics','publications.witchcraft.living','spicy.witchcraft.video','video.witchcraft.pics','liminal.witch.codes','crossroads.witch.codes']);
const FOOTER=`<footer data-witchcraft-identity="${REVISION}" style="box-sizing:border-box;display:block;flex:0 0 auto;width:100%;max-width:100%;margin:0;padding:18px 16px 120px;font:12px/1.6 Helvetica,Arial,sans-serif;color:inherit;text-align:center;border-top:1px solid currentColor;white-space:normal;overflow-wrap:anywhere"><span>${LEGAL} · ABN ${ABN}</span><br><a href="mailto:${EMAIL}" style="color:inherit">${EMAIL}</a></footer>`;
export const CSS=`[data-witchcraft-identity]{box-sizing:border-box;display:block;flex:0 0 auto;width:100%;max-width:100%;margin:0;padding:18px 16px 120px;font:12px/1.6 Helvetica,Arial,sans-serif;color:inherit;text-align:center;border-top:1px solid currentColor;white-space:normal;overflow-wrap:anywhere}[data-witchcraft-identity] a{color:inherit}.wc-footnote{display:flex!important;flex-wrap:wrap!important;gap:12px 20px!important;align-items:center!important}.wc-footnote>span:first-child,.wc-footnote-nav{flex-shrink:0!important}.wc-legal{white-space:normal!important;overflow-wrap:anywhere;font-size:10px!important;line-height:1.6!important;flex:1 1 300px;min-width:0}.wc-footnote-nav{flex-wrap:wrap!important}`;
export function identityAsset(request){if(!HOSTS.has(new URL(request.url).hostname)||new URL(request.url).pathname!=='/_witchcraft/identity.css')return null;if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405,headers:{Allow:'GET, HEAD'}});return new Response(request.method==='HEAD'?null:CSS,{headers:{'Content-Type':'text/css; charset=utf-8','Cache-Control':'public,max-age=300','X-Content-Type-Options':'nosniff'}});}
export function visible(html){return html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'').replace(/<!--[\s\S]*?-->/g,'').replace(/&nbsp;|&#160;|&#xA0;/gi,' ').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').toLowerCase();}
function deobfuscate(html){return html.replace(/<a\b[^>]*(?:data-cfemail="([a-f0-9]+)"|href="\/cdn-cgi\/l\/email-protection[^"]*")[^>]*>[\s\S]*?<\/a>/gi,(whole,hex)=>{
 if(!hex){const m=whole.match(/data-cfemail="([a-f0-9]+)"/i);hex=m?.[1];}if(!hex)return whole;
 const key=parseInt(hex.slice(0,2),16);let decoded='';for(let i=2;i<hex.length;i+=2)decoded+=String.fromCharCode(parseInt(hex.slice(i,i+2),16)^key);
 if(/^(?:hecate|0|ezra)@(?:witch\.codes|black\.industries|shadow\.black|garter\.app)$/i.test(decoded))return `<a href="mailto:${EMAIL}" style="color:inherit">${EMAIL}</a>`;return whole;
 });}
export function tuple(html){const text=visible(deobfuscate(html));return text.includes(LEGAL.toLowerCase())&&text.includes(ABN)&&text.includes(EMAIL);}
function repairFooter(block){
 let b=deobfuscate(block);
 // Only footer identity text. Preserve all non-footer copy and research attribution.
 b=b.replace(/COGNITIVE INTELLIGENCE SERVICES PTY LTD(\s*(?:·|&#183;|&middot;)?\s*ABN\s*)42\s*689\s*181\s*208/gi,LEGAL+'$1'+ABN);
 b=b.replace(/TRADING AS PITCH BLACK INDUSTRIES/gi,'TRADING AS WITCHCRAFT AI');
 b=b.replace(/A PITCH BLACK INDUSTRIES PRACTICE/gi,'A WITCHCRAFT AI PRACTICE');
 b=b.replace(/produced by Pitch Black Industries/gi,'produced by '+LEGAL);
 b=b.replace(/(©|&copy;)\s*(2026\s*)?PITCH BLACK INDUSTRIES/gi,'$1 $2'+LEGAL);
 b=b.replace(/(WITCHCRAFT AI\s*(?:·|&#183;|&middot;)\s*)PITCH BLACK INDUSTRIES/gi,'$1'+LEGAL);
 b=b.replace(/(?:hecate|0|ezra)@(?:black\.industries|shadow\.black|garter\.app)/gi,EMAIL);
 // Membership identity must not silently transfer to BKW.
 b=b.replace(/NVIDIA INCEPTION MEMBER\b/gi,'NVIDIA Inception: membership held by related Cognitive Intelligence Services Pty Ltd');
 b=b.replace(/POWERED BY NVIDIA INCEPTION/gi,'NVIDIA Inception membership: related Cognitive Intelligence Services Pty Ltd');
 b=b.replace(/IN ASSOCIATION WITH RABATA\.IO\s*·\s*AUTH0\.COM\s*·\s*CLOUDFLARE\.COM\s*·\s*NVIDIA INCEPTION\s*·\s*MICROSOFT AZURE\s*·\s*GOOGLE CLOUD\s*·\s*AMAZON AWS/gi,'Technology platforms referenced: Auth0, Cloudflare, Microsoft Azure, Google Cloud and Amazon AWS. Rabata and NVIDIA Inception benefits belong to related Cognitive Intelligence Services Pty Ltd.');
 return b;
}
export function transform(html,studio=false){
 const original=html;
 html=html.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi,repairFooter);
 const blocks=[...html.matchAll(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi)].map(x=>x[0]);
 // pbi-edge already appends a legal block outside semantic footer; require one bounded <p> tuple.
 blocks.push(...[...html.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/gi)].map(x=>x[0]));
 // Current retained Studio bundle already renders the exact legal tuple; fix its layout without duplicating it.
 const pinnedStudio=studio&&html.includes('/assets/index-DSxvS3b2.js');
 if(!html.includes('href="/_witchcraft/identity.css"'))html=html.replace(/<\/head\s*>/i,'<link rel="stylesheet" href="/_witchcraft/identity.css"></head>');
 if(!pinnedStudio&&!blocks.some(tuple))html=/<\/body\s*>/i.test(html)?html.replace(/<\/body\s*>/i,FOOTER+'</body>'):html+FOOTER;
 return {html,changed:html!==original};
}
export async function applyIdentity(request,response){
 if(request.method!=='GET'||!HOSTS.has(new URL(request.url).hostname)||response.status!==200||!/^text\/html\b/i.test(response.headers.get('content-type')||''))return response;
 if(Number(response.headers.get('content-length'))>2097152)return response;
 const bytes=await response.arrayBuffer();if(bytes.byteLength>2097152)return new Response(bytes,response);
 const result=transform(new TextDecoder().decode(bytes),['witchcraft.pics','witchcraft.video','video.witchcraft.pics'].includes(new URL(request.url).hostname));const h=new Headers(response.headers);
 h.set('X-Witchcraft-Identity',REVISION);
 if(result.changed){for(const k of ['content-length','etag','last-modified','content-encoding'])h.delete(k);h.set('Cache-Control','no-store');}
 return new Response(result.changed?result.html:bytes,{status:response.status,statusText:response.statusText,headers:h});
}
