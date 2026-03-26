import { useState, useCallback, useRef } from "react";

/* ═══════════ DECK ═══════════ */
const MAJOR=[
  {name:"The Fool",kr:"광대",num:"0",symbol:"🃏"},
  {name:"The Magician",kr:"마법사",num:"I",symbol:"🪄"},
  {name:"The High Priestess",kr:"여사제",num:"II",symbol:"🌙"},
  {name:"The Empress",kr:"여황제",num:"III",symbol:"👑"},
  {name:"The Emperor",kr:"황제",num:"IV",symbol:"🏛️"},
  {name:"The Hierophant",kr:"교황",num:"V",symbol:"⛪"},
  {name:"The Lovers",kr:"연인",num:"VI",symbol:"💕"},
  {name:"The Chariot",kr:"전차",num:"VII",symbol:"🏇"},
  {name:"Strength",kr:"힘",num:"VIII",symbol:"🦁"},
  {name:"The Hermit",kr:"은둔자",num:"IX",symbol:"🏔️"},
  {name:"Wheel of Fortune",kr:"운명의 수레바퀴",num:"X",symbol:"☸️"},
  {name:"Justice",kr:"정의",num:"XI",symbol:"⚖️"},
  {name:"The Hanged Man",kr:"매달린 사람",num:"XII",symbol:"🙃"},
  {name:"Death",kr:"죽음",num:"XIII",symbol:"💀"},
  {name:"Temperance",kr:"절제",num:"XIV",symbol:"⏳"},
  {name:"The Devil",kr:"악마",num:"XV",symbol:"😈"},
  {name:"The Tower",kr:"탑",num:"XVI",symbol:"🗼"},
  {name:"The Star",kr:"별",num:"XVII",symbol:"⭐"},
  {name:"The Moon",kr:"달",num:"XVIII",symbol:"🌕"},
  {name:"The Sun",kr:"태양",num:"XIX",symbol:"☀️"},
  {name:"Judgement",kr:"심판",num:"XX",symbol:"📯"},
  {name:"The World",kr:"세계",num:"XXI",symbol:"🌍"},
];
const SUITS=[
  {name:"Wands",kr:"완드",symbol:"🪵",color:"#c0392b"},
  {name:"Cups",kr:"컵",symbol:"🏆",color:"#2980b9"},
  {name:"Swords",kr:"소드",symbol:"⚔️",color:"#7f8c8d"},
  {name:"Pentacles",kr:"펜타클",symbol:"⭕",color:"#27ae60"},
];
const RANKS=["Ace","2","3","4","5","6","7","8","9","10","Page","Knight","Queen","King"];
const RANK_KR=["에이스","2","3","4","5","6","7","8","9","10","시종","기사","여왕","왕"];

function buildDeck(){
  const d=[];
  MAJOR.forEach((m,i)=>d.push({type:"major",index:i,...m}));
  SUITS.forEach(s=>RANKS.forEach((r,ri)=>d.push({type:"minor",suit:s,rankIndex:ri,name:`${r} of ${s.name}`,kr:`${s.kr}의 ${RANK_KR[ri]}`,symbol:s.symbol,num:r})));
  return d;
}
const FULL_DECK=buildDeck();
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}

const POS=[
  {label:"1",kr:"현재 상황",desc:"지금 핵심 에너지"},
  {label:"2",kr:"도전/장애",desc:"가로막는 힘"},
  {label:"3",kr:"근본 원인",desc:"무의식적 뿌리"},
  {label:"4",kr:"가까운 과거",desc:"최근 영향"},
  {label:"5",kr:"가능한 미래",desc:"현 경로의 가능성"},
  {label:"6",kr:"가까운 미래",desc:"곧 다가올 흐름"},
  {label:"7",kr:"나 자신",desc:"당신의 태도"},
  {label:"8",kr:"주변 환경",desc:"외부 영향"},
  {label:"9",kr:"희망과 두려움",desc:"깊은 바람과 걱정"},
  {label:"10",kr:"최종 결과",desc:"에너지가 향하는 결말"},
];

/* ═══════════ COLORS ═══════════ */
const C={bg:"#faf6f0",white:"#fff",accent:"#8B6914",accentLight:"#c9a84c",accentBg:"#f5eedf",text:"#3d3426",textMid:"#6b5d4d",textLight:"#9a8b78",cardBack:"linear-gradient(135deg,#3d2b1f,#5a3e2e,#3d2b1f)",danger:"#c0392b",success:"#27ae60"};
const CSS=`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes cardAppear{from{transform:scale(0.3) translateY(30px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}`;
const FONT="Georgia,'Times New Roman',serif";

/* ═══════════ COMPONENTS ═══════════ */
function TarotCard({card,reversed,flipped,onClick,size="md",style={},posLabel}){
  const S={sm:{w:52,h:82,e:18,t:8,n:7},md:{w:72,h:112,e:28,t:10,n:9},lg:{w:90,h:140,e:36,t:12,n:11}};
  const s=S[size];const isMaj=card?.type==="major";const cc=isMaj?"#8B6914":(card?.suit?.color||"#666");
  return(
    <div onClick={onClick} style={{width:s.w,height:s.h,perspective:600,cursor:onClick?"pointer":"default",...style}}>
      <div style={{width:"100%",height:"100%",position:"relative",transformStyle:"preserve-3d",transition:"transform 0.8s cubic-bezier(0.4,0,0.2,1)",transform:flipped?"rotateY(180deg)":"rotateY(0)"}}>
        <div style={{position:"absolute",width:"100%",height:"100%",backfaceVisibility:"hidden",borderRadius:8,background:C.cardBack,border:"2px solid #8B6914",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 3px 12px rgba(0,0,0,0.2)"}}>
          <div style={{width:"78%",height:"78%",border:"1.5px solid #8B691440",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:s.e*0.7,opacity:0.5}}>✦</span></div>
        </div>
        <div style={{position:"absolute",width:"100%",height:"100%",backfaceVisibility:"hidden",transform:reversed?"rotateY(180deg) rotate(180deg)":"rotateY(180deg)",borderRadius:8,overflow:"hidden",background:isMaj?"linear-gradient(180deg,#fdf6e3,#f5e6c8,#ede0c8)":"linear-gradient(180deg,#faf8f5,#f0ece4)",border:`2px solid ${cc}60`,boxShadow:"0 3px 14px rgba(0,0,0,0.12)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:3}}>
          {posLabel&&<div style={{position:"absolute",top:2,left:4,fontSize:s.n-2,color:"#fff",background:cc,borderRadius:4,padding:"0 3px",fontWeight:800,lineHeight:1.4}}>{posLabel}</div>}
          <div style={{fontSize:s.n-1,fontWeight:600,color:cc,fontFamily:FONT,opacity:0.7,marginBottom:1}}>{card?.num}</div>
          <div style={{fontSize:s.e}}>{card?.symbol}</div>
          <div style={{fontSize:s.t,fontWeight:700,color:"#2c2c2c",textAlign:"center",lineHeight:1.2,marginTop:2,fontFamily:FONT,padding:"0 2px"}}>{card?.kr}</div>
          {isMaj&&<div style={{fontSize:s.n-2,color:"#88776640",fontFamily:FONT,marginTop:1}}>Major</div>}
          {!isMaj&&card?.suit&&<div style={{fontSize:s.n-2,color:card.suit.color+"80",marginTop:1}}>{card.suit.kr}</div>}
          {reversed&&<div style={{position:"absolute",bottom:3,fontSize:s.n-2,color:C.danger,fontWeight:700}}>역방향</div>}
        </div>
      </div>
    </div>
  );
}

function PickCard({picked,onClick,justPicked}){
  return(<div onClick={!picked?onClick:undefined} style={{width:42,height:60,borderRadius:7,cursor:picked?"default":"pointer",background:picked?"#ece6da":C.cardBack,border:picked?"1.5px dashed #c9a84c40":"1.5px solid #8B6914",display:"flex",alignItems:"center",justifyContent:"center",opacity:picked?0.2:1,transition:"all 0.4s",transform:justPicked?"scale(0.5) translateY(-20px)":picked?"scale(0.9)":"scale(1)",boxShadow:picked?"none":"0 2px 8px rgba(0,0,0,0.15)"}}>
    {!picked&&<span style={{color:"#c9a84c60",fontSize:10}}>✦</span>}
  </div>);
}

function CelticCrossLayout({cards,flippedCards,onFlip,selectedCard,onSelect}){
  const pos=[{left:"28%",top:"38%",r:0},{left:"28%",top:"38%",r:90},{left:"28%",top:"68%",r:0},{left:"6%",top:"38%",r:0},{left:"28%",top:"8%",r:0},{left:"50%",top:"38%",r:0},{left:"74%",top:"74%",r:0},{left:"74%",top:"52%",r:0},{left:"74%",top:"30%",r:0},{left:"74%",top:"8%",r:0}];
  return(<div style={{position:"relative",width:"100%",maxWidth:400,aspectRatio:"1/1.05",margin:"0 auto"}}>{pos.map((p,i)=>{if(i>=cards.length)return null;const c=cards[i],isF=flippedCards.includes(i),isS=selectedCard===i;return(<div key={i} style={{position:"absolute",left:p.left,top:p.top,transform:`rotate(${p.r}deg) ${isS?'scale(1.15)':''}`,transition:"transform 0.3s",zIndex:isS?20:(i===1?5:i===0?4:1),filter:isS?"drop-shadow(0 0 10px #c9a84c80)":"none"}}><TarotCard card={c.card} reversed={c.reversed} flipped={isF} size="md" onClick={()=>{if(!isF)onFlip(i);else onSelect(i);}} posLabel={isF?POS[i].label:null}/></div>);})}</div>);
}

/* ═══════════ RESULT FORMATTER ═══════════ */
function formatForChat(cards, question, followUps) {
  let t = "🔮 켈틱 크로스 타로 리딩 결과\n";
  if (question) t += `질문: ${question}\n`;
  t += "─────────────────\n";
  cards.forEach((c,i) => {
    const dir = c.reversed ? "역방향" : "정방향";
    const type = c.card.type === "major" ? "메이저" : c.card.suit.kr;
    t += `${POS[i].label}. ${POS[i].kr}: ${c.card.symbol} ${c.card.kr} (${dir}) [${type}]\n`;
  });
  if (followUps.length > 0) {
    t += "\n─── 추가 질문 ───\n";
    followUps.forEach((fu, fi) => {
      t += `\nQ${fi+1}: ${fu.question}\n`;
      fu.cards.forEach((c,ci) => {
        t += `  → ${c.card.symbol} ${c.card.kr} (${c.reversed?"역방향":"정방향"})\n`;
      });
    });
  }
  t += "─────────────────\n이 결과를 채팅에 붙여넣고 해석을 요청해주세요!";
  return t;
}

/* ═══════════ MAIN ═══════════ */
export default function TarotApp(){
  const [screen,setScreen]=useState("intro");
  const [question,setQuestion]=useState("");
  const [shuffledDeck,setShuffledDeck]=useState([]);
  const [pickedIndices,setPickedIndices]=useState([]);
  const [justPickedIdx,setJustPickedIdx]=useState(null);
  const [pickedCards,setPickedCards]=useState([]);
  const [cards,setCards]=useState([]);
  const [flippedCards,setFlippedCards]=useState([]);
  const [selectedCard,setSelectedCard]=useState(null);
  const [allRevealed,setAllRevealed]=useState(false);
  const [flipOrder,setFlipOrder]=useState(0);
  const [showResultText,setShowResultText]=useState(false);
  // Follow-up
  const [followUps,setFollowUps]=useState([]);
  const [followInput,setFollowInput]=useState("");
  const [followPickMode,setFollowPickMode]=useState(false);
  const [followPickCount,setFollowPickCount]=useState(1);
  const [followQuestion,setFollowQuestion]=useState("");
  const [followDeck,setFollowDeck]=useState([]);
  const [followPicked,setFollowPicked]=useState([]);
  const [followPickedIndices,setFollowPickedIndices]=useState([]);
  const bottomRef=useRef(null);

  const startPicking=useCallback(()=>{
    setShuffledDeck(shuffle(FULL_DECK));setPickedIndices([]);setPickedCards([]);setJustPickedIdx(null);
    setCards([]);setFlippedCards([]);setSelectedCard(null);setAllRevealed(false);
    setFlipOrder(0);setShowResultText(false);setFollowUps([]);setFollowInput("");
    setFollowPickMode(false);setFollowQuestion("");setFollowDeck([]);setFollowPicked([]);setFollowPickedIndices([]);
    setScreen("picking");
  },[]);

  const pickCard=useCallback((di)=>{
    if(pickedIndices.includes(di)||pickedCards.length>=10)return;
    const card=shuffledDeck[di],rev=Math.random()<0.3;
    setJustPickedIdx(di);setTimeout(()=>setJustPickedIdx(null),500);
    setPickedIndices(p=>[...p,di]);
    const np=[...pickedCards,{card,reversed:rev}];setPickedCards(np);
    if(np.length===10)setTimeout(()=>{setCards(np);setScreen("reading");},800);
  },[shuffledDeck,pickedIndices,pickedCards]);

  const flipCard=useCallback(i=>{if(flippedCards.includes(i)||i!==flipOrder)return;setFlippedCards(p=>[...p,i]);setFlipOrder(p=>p+1);if(flipOrder===9)setTimeout(()=>setAllRevealed(true),1000);},[flippedCards,flipOrder]);
  const selectCard=useCallback(i=>setSelectedCard(selectedCard===i?null:i),[selectedCard]);
  const flipAll=useCallback(()=>{let d=0;for(let i=flipOrder;i<10;i++){setTimeout(()=>{setFlippedCards(p=>[...p,i]);setFlipOrder(i+1);if(i===9)setTimeout(()=>setAllRevealed(true),800);},d);d+=250;}},[flipOrder]);

  const toggleResultText=useCallback(()=>{
    setShowResultText(v=>!v);
  },[]);

  const [copied,setCopied]=useState(false);
  const sendToChat=useCallback(()=>{
    const text=formatForChat(cards,question,followUps)+"\n\n이 타로 결과를 심층 해석해주세요!";
    navigator.clipboard.writeText(text).then(()=>{
      setCopied(true);
      setTimeout(()=>setCopied(false),2500);
    }).catch(()=>{
      // fallback
      const ta=document.createElement("textarea");
      ta.value=text;document.body.appendChild(ta);ta.select();
      document.execCommand("copy");document.body.removeChild(ta);
      setCopied(true);setTimeout(()=>setCopied(false),2500);
    });
  },[cards,question,followUps]);

  // Follow-up
  const startFollowUp=useCallback((numCards)=>{
    if(!followInput.trim())return;
    const majorOnly=FULL_DECK.filter(c=>c.type==="major");
    setFollowQuestion(followInput.trim());setFollowInput("");
    setFollowPickCount(numCards);setFollowDeck(shuffle(majorOnly));
    setFollowPicked([]);setFollowPickedIndices([]);setFollowPickMode(true);
    setTimeout(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),100);
  },[followInput]);

  const pickFollowCard=useCallback((idx)=>{
    if(followPickedIndices.includes(idx)||followPicked.length>=followPickCount)return;
    const card=followDeck[idx],rev=Math.random()<0.3;
    setFollowPickedIndices(p=>[...p,idx]);
    const np=[...followPicked,{card,reversed:rev}];setFollowPicked(np);
    if(np.length>=followPickCount){
      setTimeout(()=>{
        setFollowUps(prev=>[...prev,{question:followQuestion,cards:np}]);
        setFollowPickMode(false);setFollowPicked([]);setFollowPickedIndices([]);setFollowDeck([]);setShowResultText(false);
        setTimeout(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),200);
      },600);
    }
  },[followDeck,followPickedIndices,followPicked,followPickCount,followQuestion]);

  const selCard=selectedCard!==null?cards[selectedCard]:null;

  /* ─── INTRO ─── */
  if(screen==="intro") return(
    <div style={{minHeight:"100vh",background:`linear-gradient(180deg,${C.bg},#efe8db)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:FONT,padding:24}}>
      <style>{CSS}</style>
      <div style={{textAlign:"center",maxWidth:380}}>
        <div style={{fontSize:72,marginBottom:12,animation:"float 4s ease-in-out infinite"}}>🔮</div>
        <h1 style={{fontSize:38,color:C.accent,margin:"0 0 8px",letterSpacing:4,fontWeight:400}}>TAROT</h1>
        <p style={{fontSize:15,color:C.textLight,margin:"0 0 6px",letterSpacing:6}}>CELTIC CROSS</p>
        <p style={{fontSize:14,color:C.textLight,margin:"0 0 36px"}}>카드를 뽑고, 채팅에서 심층 해석을 받으세요</p>
        <div style={{background:C.accentBg,border:`1px solid ${C.accent}20`,borderRadius:16,padding:"20px 24px",marginBottom:28}}>
          <p style={{fontSize:15,color:C.textMid,margin:"0 0 14px",lineHeight:1.7}}>마음속 질문을 떠올리고<br/>78장 중 10장을 직접 골라보세요</p>
          <input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="질문을 입력하세요 (선택사항)" style={{width:"100%",padding:"13px 16px",fontSize:15,background:C.white,border:`1px solid ${C.accent}30`,borderRadius:10,color:C.text,outline:"none",fontFamily:FONT,boxSizing:"border-box"}}/>
        </div>
        <button onClick={startPicking} style={{padding:"16px 52px",fontSize:18,fontWeight:400,background:`linear-gradient(135deg,${C.accentLight},${C.accent})`,color:C.white,border:"none",borderRadius:50,cursor:"pointer",boxShadow:"0 4px 20px rgba(139,105,20,0.2)",letterSpacing:3,fontFamily:FONT}}>카드 섞기</button>
        <div style={{marginTop:32,padding:"14px 20px",background:`${C.accent}08`,borderRadius:12,border:`1px solid ${C.accent}10`}}>
          <p style={{color:C.textLight,fontSize:13,margin:0,lineHeight:1.7}}>
            ① 카드를 직접 뽑아 켈틱 크로스 배치<br/>
            ② 버튼 한 번으로 결과를 채팅에 전송<br/>
            ③ Claude가 당신의 상황에 맞춰 심층 해석
          </p>
        </div>
      </div>
    </div>
  );

  /* ─── PICKING ─── */
  if(screen==="picking"){
    const count=pickedCards.length,nextPos=count<10?POS[count]:null;
    return(
      <div style={{minHeight:"100vh",background:`linear-gradient(180deg,${C.bg},#efe8db)`,fontFamily:FONT,display:"flex",flexDirection:"column"}}>
        <style>{CSS}</style>
        <div style={{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.accent}15`,background:C.white}}>
          <button onClick={()=>setScreen("intro")} style={{background:"none",border:`1px solid ${C.accent}40`,color:C.accent,padding:"6px 14px",borderRadius:20,cursor:"pointer",fontSize:13,fontFamily:FONT}}>← 돌아가기</button>
          <span style={{color:C.accent,fontSize:16,fontWeight:600}}>{count} / 10</span>
        </div>
        <div style={{textAlign:"center",padding:"18px 20px 12px"}}>
          {nextPos?<><p style={{color:C.accent,fontSize:19,margin:"0 0 6px",fontWeight:400}}>{nextPos.label}번째 카드를 고르세요</p><p style={{color:C.textMid,fontSize:14,margin:0}}>{nextPos.kr} — {nextPos.desc}</p></>:<p style={{color:C.accent,fontSize:18,margin:0}}>모든 카드를 골랐습니다!</p>}
        </div>
        {count>0&&<div style={{padding:"0 16px 10px",display:"flex",gap:5,justifyContent:"center",flexWrap:"wrap"}}>
          {pickedCards.map((c,i)=><div key={i} style={{width:34,height:48,borderRadius:6,background:c.card.type==="major"?"linear-gradient(180deg,#fdf6e3,#ede0c8)":"linear-gradient(180deg,#faf8f5,#f0ece4)",border:`1.5px solid ${c.card.type==="major"?"#8B6914":c.card.suit?.color||"#666"}50`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:"cardAppear 0.4s ease"}}><span style={{fontSize:13}}>{c.card.symbol}</span><span style={{fontSize:7,color:C.accent,fontWeight:700}}>{i+1}</span></div>)}
        </div>}
        <div style={{flex:1,padding:"12px 12px 24px",overflowY:"auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(42px, 1fr))",gap:5,maxWidth:440,margin:"0 auto"}}>
            {shuffledDeck.map((_,i)=><PickCard key={i} picked={pickedIndices.includes(i)} justPicked={justPickedIdx===i} onClick={()=>pickCard(i)}/>)}
          </div>
        </div>
      </div>
    );
  }

  /* ─── READING ─── */
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(180deg,${C.bg},#efe8db)`,fontFamily:FONT,display:"flex",flexDirection:"column"}}>
      <style>{CSS}</style>
      <div style={{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.accent}15`,background:C.white}}>
        <button onClick={()=>{setScreen("intro");setQuestion("");}} style={{background:"none",border:`1px solid ${C.accent}40`,color:C.accent,padding:"6px 14px",borderRadius:20,cursor:"pointer",fontSize:13,fontFamily:FONT}}>← 다시 뽑기</button>
        <span style={{color:C.textLight,fontSize:13,letterSpacing:2}}>CELTIC CROSS</span>
        {!allRevealed?<button onClick={flipAll} style={{background:C.accentBg,border:`1px solid ${C.accent}30`,color:C.accent,padding:"6px 14px",borderRadius:20,cursor:"pointer",fontSize:13,fontFamily:FONT}}>모두 공개</button>:<div style={{width:80}}/>}
      </div>
      {question&&<div style={{padding:"10px 20px",textAlign:"center",color:C.textMid,fontSize:14,fontStyle:"italic",borderBottom:`1px solid ${C.accent}08`}}>"{question}"</div>}
      {!allRevealed&&<div style={{textAlign:"center",padding:"12px 16px"}}><p style={{color:C.textMid,fontSize:14,margin:0}}>{flipOrder<10?`${flipOrder+1}번 카드를 터치하여 공개 — ${POS[flipOrder].kr}`:"모든 카드가 공개되었습니다"}</p></div>}

      <div style={{padding:"8px 12px"}}><CelticCrossLayout cards={cards} flippedCards={flippedCards} onFlip={flipCard} selectedCard={selectedCard} onSelect={selectCard}/></div>

      {/* Card detail popup */}
      {selectedCard!==null&&selCard&&(
        <div style={{background:`${C.white}f0`,borderTop:`1px solid ${C.accent}20`,padding:"20px 20px 28px",animation:"slideUp 0.4s ease"}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:16}}>
            <TarotCard card={selCard.card} reversed={selCard.reversed} flipped={true} size="lg"/>
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:C.accentLight,letterSpacing:2,marginBottom:4}}>POSITION {selectedCard+1}</div>
              <div style={{fontSize:19,color:C.accent,fontWeight:400,marginBottom:4}}>{POS[selectedCard].kr}</div>
              <div style={{fontSize:13,color:C.textLight,marginBottom:10,lineHeight:1.5}}>{POS[selectedCard].desc}</div>
              <div style={{fontSize:18,color:C.text,fontWeight:400,marginBottom:4}}>{selCard.card.kr}{selCard.reversed&&<span style={{color:C.danger,fontSize:13}}> (역방향)</span>}</div>
              <div style={{fontSize:12,color:C.textLight}}>{selCard.card.name}</div>
              <div style={{fontSize:12,color:C.textLight,marginTop:4}}>{selCard.card.type==="major"?"메이저 아르카나":selCard.card.suit.kr+" · 마이너 아르카나"}</div>
            </div>
          </div>
          <button onClick={()=>setSelectedCard(null)} style={{marginTop:14,width:"100%",padding:"12px",background:C.accentBg,border:`1px solid ${C.accent}20`,color:C.accent,borderRadius:12,cursor:"pointer",fontSize:14,fontFamily:FONT}}>닫기</button>
        </div>
      )}

      {/* All revealed section */}
      {allRevealed&&selectedCard===null&&(
        <div style={{padding:"16px 20px 28px",borderTop:`1px solid ${C.accent}10`}}>
          <p style={{color:C.textMid,fontSize:15,textAlign:"center",marginBottom:16}}>카드를 터치하여 개별 확인하세요</p>

          {/* Card summary grid */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
            {cards.map((c,i)=><div key={i} onClick={()=>selectCard(i)} style={{background:C.white,border:`1px solid ${C.accent}15`,borderRadius:10,padding:"10px 12px",cursor:"pointer",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
              <div style={{fontSize:11,color:C.textLight,marginBottom:2}}>{POS[i].label}. {POS[i].kr}</div>
              <div style={{fontSize:14,color:C.text}}>{c.card.symbol} {c.card.kr}{c.reversed&&<span style={{color:C.danger,fontSize:11}}> ↺</span>}</div>
            </div>)}
          </div>

          {/* Copy to clipboard */}
          <button onClick={sendToChat} style={{width:"100%",padding:"18px",fontSize:17,background:copied?`linear-gradient(135deg,#27ae60,#2ecc71)`:`linear-gradient(135deg,${C.accentLight},${C.accent})`,color:C.white,border:"none",borderRadius:14,cursor:"pointer",fontFamily:FONT,letterSpacing:1,fontWeight:400,boxShadow:"0 4px 20px rgba(139,105,20,0.2)",transition:"background 0.3s"}}>
            {copied?"✅ 복사 완료! Claude에 붙여넣기 하세요":"📋 결과 복사하기 (Claude에 붙여넣기용)"}
          </button>
          <p style={{color:C.textLight,fontSize:12,textAlign:"center",margin:"10px 0 0",lineHeight:1.6}}>
            복사한 결과를 <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{color:C.accent}}>claude.ai</a>에 붙여넣으면<br/>상황에 맞는 심층 해석을 받을 수 있어요
          </p>

          {/* Expandable text result for manual copy */}
          <div style={{textAlign:"center",marginTop:12}}>
            <button onClick={toggleResultText} style={{background:"none",border:"none",color:C.textLight,fontSize:12,cursor:"pointer",fontFamily:FONT,textDecoration:"underline"}}>
              {showResultText?"결과 텍스트 접기":"결과 텍스트 직접 보기 (수동 복사)"}
            </button>
          </div>
          {showResultText&&(
            <textarea readOnly value={formatForChat(cards,question,followUps)} onFocus={e=>e.target.select()}
              style={{width:"100%",marginTop:8,padding:"14px",fontSize:12,fontFamily:"monospace",background:C.accentBg,border:`1px solid ${C.accent}20`,borderRadius:10,color:C.text,resize:"none",boxSizing:"border-box",lineHeight:1.6,minHeight:200,outline:"none"}}/>
          )}

          {/* Follow-up history */}
          {followUps.map((fu,fi)=>(
            <div key={fi} style={{marginTop:20,padding:"16px",background:C.white,borderRadius:14,border:`1px solid ${C.accent}15`,animation:"slideUp 0.5s ease",boxShadow:"0 1px 8px rgba(0,0,0,0.04)"}}>
              <div style={{fontSize:13,color:C.accent,fontWeight:600,marginBottom:10}}>추가 질문 {fi+1}: "{fu.question}"</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {fu.cards.map((c,ci)=>(
                  <div key={ci} style={{display:"flex",alignItems:"center",gap:8}}>
                    <TarotCard card={c.card} reversed={c.reversed} flipped={true} size="sm"/>
                    <div>
                      <div style={{fontSize:13,color:C.text,fontWeight:600}}>{c.card.kr}</div>
                      <div style={{fontSize:11,color:c.reversed?C.danger:C.textLight}}>{c.reversed?"역방향":"정방향"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Follow-up card picking */}
          {followPickMode&&(
            <div style={{marginTop:20,padding:"20px",background:C.white,borderRadius:16,border:`1px solid ${C.accent}15`,animation:"slideUp 0.4s ease"}}>
              <div style={{textAlign:"center",marginBottom:16}}>
                <p style={{color:C.accent,fontSize:16,margin:"0 0 6px",fontWeight:400}}>"{followQuestion}"</p>
                <p style={{color:C.textMid,fontSize:14,margin:"0 0 4px"}}>메이저 아르카나 22장에서 {followPickCount}장을 골라주세요</p>
                <p style={{color:C.textLight,fontSize:13,margin:0}}>{followPicked.length} / {followPickCount}</p>
              </div>
              {followPicked.length>0&&<div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:12}}>
                {followPicked.map((c,i)=><TarotCard key={i} card={c.card} reversed={c.reversed} flipped={true} size="sm"/>)}
              </div>}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(42px, 1fr))",gap:5}}>
                {followDeck.map((_,i)=><PickCard key={i} picked={followPickedIndices.includes(i)} onClick={()=>pickFollowCard(i)}/>)}
              </div>
            </div>
          )}

          {/* Follow-up input */}
          {!followPickMode&&(
            <div style={{marginTop:20,padding:"20px",background:C.white,borderRadius:16,border:`1px solid ${C.accent}15`}}>
              <p style={{color:C.accent,fontSize:16,margin:"0 0 12px",fontWeight:400,textAlign:"center"}}>✦ 추가로 카드를 더 뽑고 싶으신가요?</p>
              <p style={{color:C.textLight,fontSize:12,margin:"0 0 14px",textAlign:"center"}}>질문을 입력하고 메이저 아르카나에서 카드를 뽑으세요.<br/>뽑은 뒤 다시 채팅으로 전송하여 해석받을 수 있어요</p>
              <input value={followInput} onChange={e=>setFollowInput(e.target.value)} placeholder="추가 질문을 입력하세요..." onKeyDown={e=>{if(e.key==="Enter"&&followInput.trim())startFollowUp(1);}}
                style={{width:"100%",padding:"13px 16px",fontSize:15,background:C.accentBg,border:`1px solid ${C.accent}20`,borderRadius:10,color:C.text,outline:"none",fontFamily:FONT,boxSizing:"border-box",marginBottom:10}}/>
              <div style={{display:"flex",gap:8}}>
                {[1,2,3].map(n=>(
                  <button key={n} onClick={()=>startFollowUp(n)} disabled={!followInput.trim()} style={{flex:1,padding:"12px",fontSize:14,background:followInput.trim()?`linear-gradient(135deg,${C.accentLight},${C.accent})`:"#e8e0d4",color:followInput.trim()?C.white:"#aaa",border:"none",borderRadius:10,cursor:followInput.trim()?"pointer":"default",fontFamily:FONT,fontWeight:400}}>
                    {n}장 뽑기
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef}/>

          <button onClick={()=>{setScreen("intro");setQuestion("");}} style={{marginTop:20,width:"100%",padding:"14px",background:"none",border:`1px solid ${C.accent}25`,color:C.textLight,borderRadius:12,cursor:"pointer",fontSize:14,fontFamily:FONT,letterSpacing:2}}>새로운 리딩 시작</button>
        </div>
      )}
    </div>
  );
}
