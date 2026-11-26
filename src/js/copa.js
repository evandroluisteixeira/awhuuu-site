// Copa do Rock: mata-mata de discos com capas e player do Spotify, compra na Amazon e votos no Supabase.
(function(){
  var C=window.COPA, DB=window.COPA_DB||{}, CAPAS=window.CAPAS||{}, porId={};
  C.discos.forEach(function(d){porId[d.id]=d;});
  var e_=function(t){return String(t||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
  var hoje=new Date(Date.now()-3*3600e3).toISOString().slice(0,10);
  var br=function(d){return d.split('-').reverse().join('/');};
  var vis; try{ vis=localStorage.getItem('awhuuu-visitante'); if(!vis){ vis=(crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)+Date.now()); localStorage.setItem('awhuuu-visitante',vis);} }catch(e){ vis='anon-'+Date.now(); }
  var meus; try{ meus=JSON.parse(localStorage.getItem('awhuuu-copa-'+C.slug))||{}; }catch(e){ meus={}; }
  var H={'apikey':DB.chave,'Content-Type':'application/json'}; if(DB.chave && !/^sb_/.test(DB.chave)) H.Authorization='Bearer '+DB.chave;
  var placar={};
  function capa(d,tam){ var u=d&&d.spotify&&CAPAS[d.spotify]; return u?'<img src="'+u+'" alt="Capa de '+e_(d.disco)+'" width="'+tam+'" height="'+tam+'" loading="lazy">':'<span class="sem-capa" aria-hidden="true"></span>'; }
  function spotifyUrl(d){ return d.spotify?'https://open.spotify.com/album/'+d.spotify:'https://open.spotify.com/search/'+encodeURIComponent(d.banda+' '+d.disco); }
  function amazonUrl(d){ return d.amazon?'https://www.amazon.com.br/dp/'+d.amazon+'?tag=awhuuu-20':'https://www.amazon.com.br/s?k='+encodeURIComponent(d.banda+' '+d.disco+' vinil cd')+'&tag=awhuuu-20'; }
  function rodadaAtual(){ for(var r=0;r<C.rodadas.length;r++){ if(hoje>=C.rodadas[r].inicio && hoje<=C.rodadas[r].fim) return r; } return hoje<C.rodadas[0].inicio?-1:C.rodadas.length; }
  function votos(cid,id){ return (placar[cid]&&placar[cid][id])||0; }
  function chave(){
    var R=[], atual=rodadaAtual(), r0=[];
    for(var k=0;k<C.discos.length;k+=2) r0.push({id:'r0-'+(k/2),a:C.discos[k].id,b:C.discos[k+1].id});
    R.push(r0);
    for(var r=1;r<C.rodadas.length;r++){ var ant=R[r-1],cur=[]; for(var k2=0;k2<ant.length;k2+=2) cur.push({id:'r'+r+'-'+(k2/2),a:venc(ant[k2],r-1,atual),b:venc(ant[k2+1],r-1,atual)}); R.push(cur); }
    return R;
  }
  function venc(c,r,atual){ if(!c||!c.a||!c.b||r>=atual) return null; return votos(c.id,c.b)>votos(c.id,c.a)?c.b:c.a; }
  function lado(c,id,aberta){
    var d=porId[id]; if(!d) return '<div class="lado vazio"><span class="sem-capa"></span><p class="a-definir">A definir</p></div>';
    var votou=meus[c.id], tot=votos(c.id,c.a)+votos(c.id,c.b), pct=tot?Math.round(votos(c.id,id)*100/tot):0, s=window.FICHAS[d.banda.toLowerCase()];
    return '<div class="lado'+(votou===id?' meu':'')+'">'+
      '<a class="capa" href="'+spotifyUrl(d)+'" target="_blank" rel="noopener" title="Abrir no Spotify">'+capa(d,300)+'<span class="selo-spotify">Spotify</span></a>'+
      '<div class="info"><strong>'+e_(d.disco)+'</strong><span>'+(s?'<a href="/bandas/'+s+'/">'+e_(d.banda)+'</a>':e_(d.banda))+', '+d.ano+'</span>'+
      (votou?'<span class="barra" style="--p:'+pct+'%"><b>'+pct+'%</b></span>':'')+'</div>'+
      '<div class="acoes">'+
        (aberta&&!votou?'<button type="button" class="botao votar" data-c="'+c.id+'" data-d="'+id+'">Votar</button>':'')+
        '<button type="button" class="botao contorno tocar" data-sp="'+e_(d.spotify||'')+'" data-u="'+spotifyUrl(d)+'">Ouvir</button>'+
        '<a class="botao contorno comprar" href="'+amazonUrl(d)+'" target="_blank" rel="noopener sponsored">Comprar</a>'+
      '</div></div>';
  }
  function desenha(){
    var R=chave(), atual=rodadaAtual(), st=document.getElementById('cp-status'), box=document.getElementById('cp-atual'), mostra=atual<0?0:atual;
    if(atual<0) st.textContent='A votação começa em '+br(C.rodadas[0].inicio)+'. Enquanto isso, ouça os discos da primeira rodada.';
    else if(atual>=C.rodadas.length){
      var fin=R[R.length-1][0], camp=venc(fin,R.length-1,C.rodadas.length), d=porId[camp];
      st.textContent='A Copa acabou.';
      box.innerHTML=d?'<div class="campeao"><a class="capa" href="'+spotifyUrl(d)+'" target="_blank" rel="noopener">'+capa(d,600)+'</a><div><p class="rotulo">Campeão</p><h2 class="grande">'+e_(d.disco)+'</h2><p>'+e_(d.banda)+', '+d.ano+'</p><p class="botoes"><a class="botao" href="'+amazonUrl(d)+'" target="_blank" rel="noopener sponsored">Comprar o disco</a> <a class="botao contorno" href="'+spotifyUrl(d)+'" target="_blank" rel="noopener">Ouvir no Spotify</a></p></div></div>':'';
      ligar(); chaveDesenha(R,atual); return;
    } else st.textContent=C.rodadas[atual].nome+': vote até '+br(C.rodadas[atual].fim)+'.';
    box.innerHTML=R[mostra].map(function(c){ return '<div class="duelo">'+lado(c,c.a,atual===mostra)+'<span class="x">×</span>'+lado(c,c.b,atual===mostra)+'</div>'; }).join('');
    ligar(); chaveDesenha(R,atual);
  }
  function chaveDesenha(R,atual){
    document.getElementById('cp-chave').innerHTML=R.map(function(rod,r){
      return '<div class="coluna"><h3>'+e_(C.rodadas[r].nome)+'</h3>'+rod.map(function(c){
        var v=venc(c,r,atual);
        return '<div class="jogo-chave">'+[c.a,c.b].map(function(id){ var d=porId[id]; return '<p class="'+(v&&v===id?'venceu':(v?'perdeu':''))+'">'+(d?capa(d,40)+'<span>'+e_(d.disco)+'</span>':'<span class="a-definir">a definir</span>')+(r<atual&&d?'<small>'+votos(c.id,id)+'</small>':'')+'</p>'; }).join('')+'</div>';
      }).join('')+'</div>';
    }).join('');
  }
  function ligar(){
    document.querySelectorAll('#cp-atual .votar').forEach(function(b){ b.onclick=function(){ vota(b.dataset.c,b.dataset.d); }; });
    document.querySelectorAll('#cp-atual .tocar').forEach(function(b){ b.onclick=function(){ toca(b.dataset.sp,b.dataset.u); }; });
  }
  function toca(sp,u){
    if(!sp){ window.open(u,'_blank','noopener'); return; }
    var p=document.getElementById('cp-player');
    document.getElementById('cp-iframe').innerHTML='<iframe title="Player do Spotify" src="https://open.spotify.com/embed/album/'+sp+'?utm_source=generator&theme=0" width="100%" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>';
    p.hidden=false;
  }
  document.getElementById('cp-fechar').onclick=function(){ document.getElementById('cp-player').hidden=true; document.getElementById('cp-iframe').innerHTML=''; };
  function vota(cid,id){
    meus[cid]=id; try{ localStorage.setItem('awhuuu-copa-'+C.slug,JSON.stringify(meus)); }catch(e){}
    placar[cid]=placar[cid]||{}; placar[cid][id]=(placar[cid][id]||0)+1; desenha();
    if(DB.url) fetch(DB.url.replace(/\/$/,'')+'/rest/v1/votos_copa',{method:'POST',headers:Object.assign({'Prefer':'return=minimal'},H),body:JSON.stringify({copa:C.slug,confronto:cid,escolha:id,visitante:vis})}).then(carrega);
  }
  function carrega(){
    if(!DB.url) return Promise.resolve(desenha());
    return fetch(DB.url.replace(/\/$/,'')+'/rest/v1/rpc/placar_copa',{method:'POST',headers:H,body:JSON.stringify({p_copa:C.slug})})
      .then(function(r){return r.json();}).then(function(l){ placar={}; (l||[]).forEach(function(x){ (placar[x.confronto]=placar[x.confronto]||{})[x.escolha]=+x.votos; }); desenha(); })
      .catch(function(){ desenha(); });
  }
  carrega();
})();
