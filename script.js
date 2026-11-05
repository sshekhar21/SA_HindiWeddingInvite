const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
const intro=$('#intro'),site=$('#site');let opened=false;
function enterSite(){if(opened)return;opened=true;startWeddingMusic();intro.classList.add('opening');setTimeout(()=>{intro.classList.add('fade');site.classList.remove('is-hidden');document.body.classList.add('music-ready');observeReveals();makePetals();makeHeroLanterns();setTimeout(()=>intro.remove(),950)},850)}
$('#openInvite').addEventListener('click',enterSite);$('#skipIntro').addEventListener('click',enterSite);
function observeReveals(){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}}),{threshold:.12});$$('.reveal').forEach(el=>io.observe(el))}
window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;$('#scrollProgress').style.width=(max>0?scrollY/max*100:0)+'%'},{passive:true});
function makePetals(){const layer=$('.floating-petals');if(!layer||layer.childElementCount)return;for(let i=0;i<30;i++){const p=document.createElement('i');p.className='petal';p.style.setProperty('--left',`${Math.random()*100}%`);p.style.setProperty('--duration',`${9+Math.random()*13}s`);p.style.setProperty('--delay',`${-Math.random()*22}s`);p.style.setProperty('--drift',`${-85+Math.random()*170}px`);p.style.setProperty('--petal-size',`${7+Math.random()*6}px`);p.style.setProperty('--petal-opacity',`${.42+Math.random()*.42}`);p.style.setProperty('--petal-color',Math.random()>.5?'#b95e78':'#d18a91');layer.appendChild(p)}}
// Traditional paper sky lanterns rise only inside the first hero screen.
let heroLanternTimer=null;
function addHeroLantern(delay=0){
  const layer=$('#heroLanterns');
  if(!layer||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const lantern=document.createElement('span');
  lantern.className='hero-rising-lantern';
  const image=document.createElement('img');
  image.src='assets/images/traditional-sky-lantern.png';
  image.alt='';
  image.draggable=false;
  lantern.appendChild(image);
  lantern.style.left=`${5+Math.random()*90}%`;
  lantern.style.setProperty('--rise-duration',`${17+Math.random()*7}s`);
  lantern.style.setProperty('--rise-drift',`${-42+Math.random()*84}px`);
  lantern.style.setProperty('--rise-size',`${25+Math.random()*12}px`);
  lantern.style.animationDelay=delay?`${delay}s`:'0s';
  layer.appendChild(lantern);
  lantern.addEventListener('animationend',()=>lantern.remove(),{once:true});
}
function makeHeroLanterns(){
  if(heroLanternTimer||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  for(let i=0;i<5;i++)addHeroLantern(-i*3.7);
  heroLanternTimer=setInterval(()=>addHeroLantern(),3600);
}
// Wedding-day countdown uses India Standard Time. Event time is not yet specified.
function updateCountdown(){const target=new Date('2026-11-26T00:00:00+05:30').getTime(),diff=Math.max(0,target-Date.now());$('#days').textContent=String(Math.floor(diff/86400000)).padStart(2,'0');$('#hours').textContent=String(Math.floor(diff%86400000/3600000)).padStart(2,'0');$('#minutes').textContent=String(Math.floor(diff%3600000/60000)).padStart(2,'0');$('#seconds').textContent=String(Math.floor(diff%60000/1000)).padStart(2,'0')}
updateCountdown();setInterval(updateCountdown,1000);
// Gallery placeholders are deliberately local and easy to replace with real couple photographs.
const gallerySlides=[
  {src:'assets/images/painted-moments-01.png',alt:'Anjali and Shashank together in an ornate floral wedding frame'},
  {src:'assets/images/painted-moments-02.png',alt:'Anjali and Shashank seated together in an ornate floral wedding frame'}
];
let photoIndex=0;
function showPhoto(index){
  photoIndex=(index+gallerySlides.length)%gallerySlides.length;
  const slide=gallerySlides[photoIndex];
  const photo=$('#galleryPhoto');
  const image=photo.querySelector('.gallery-slide-image');
  image.style.opacity='0';
  window.setTimeout(()=>{
    image.src=slide.src;
    image.alt=slide.alt;
    image.style.opacity='1';
  },120);
  $('#photoCaption').textContent=slide.caption;
  $$('#galleryIndicators button').forEach((button,i)=>button.classList.toggle('selected',i===photoIndex));
  $$('#galleryThumbs button').forEach((button,i)=>button.classList.toggle('selected',i===photoIndex));
}
$('#prevPhoto').addEventListener('click',()=>showPhoto(photoIndex-1));
$('#nextPhoto').addEventListener('click',()=>showPhoto(photoIndex+1));
$$('#galleryIndicators button').forEach(button=>button.addEventListener('click',()=>showPhoto(Number(button.dataset.index))));
$$('#galleryThumbs button').forEach(button=>button.addEventListener('click',()=>showPhoto(Number(button.dataset.index))));
// RSVP submissions are sent directly to the linked Google Form.
// The hidden iframe lets this static GitHub Pages site POST cross-origin without a backend.
const GOOGLE_FORM_RESPONSE_URL='https://docs.google.com/forms/d/e/1FAIpQLSeUVdqhUBoEdHY8F3KegZm7fOwU-dkOE_tAcS5E7W5W9YxM-g/formResponse';
const RSVP_FIELDS={
  name:'entry.1914091421',
  phone:'entry.331237101',
  attendance:'entry.1465332909',
  guests:'entry.750387527',
  message:'entry.916307692'
};
const rsvpForm=$('#rsvpForm');
const rsvpButton=rsvpForm.querySelector('.submit-button');
let rsvpSubmitting=false;
rsvpForm.addEventListener('submit',event=>{
  event.preventDefault();
  if(rsvpSubmitting)return;
  if(!rsvpForm.reportValidity())return;
  const data=new FormData(rsvpForm);
  const iframeName='googleFormsRsvpTarget';
  let target=document.getElementById(iframeName);
  if(!target){
    target=document.createElement('iframe');
    target.name=iframeName;
    target.id=iframeName;
    target.title='Google Forms submission';
    target.setAttribute('aria-hidden','true');
    target.style.cssText='position:absolute;width:1px;height:1px;left:-9999px;border:0';
    document.body.appendChild(target);
  }
  const postForm=document.createElement('form');
  postForm.method='POST';
  postForm.action=GOOGLE_FORM_RESPONSE_URL;
  postForm.target=iframeName;
  postForm.style.display='none';
  const attendanceValue=data.get('attendance')==='Joyfully yes'?'Yes':'No';
  const values={
    [RSVP_FIELDS.name]:String(data.get('name')||'').trim(),
    [RSVP_FIELDS.phone]:String(data.get('phone')||'').trim(),
    [RSVP_FIELDS.attendance]:attendanceValue,
    [RSVP_FIELDS.guests]:String(data.get('guests')||'1'),
    [RSVP_FIELDS.message]:String(data.get('message')||'').trim()
  };
  Object.entries(values).forEach(([name,value])=>{
    const input=document.createElement('input');
    input.type='hidden';input.name=name;input.value=value;
    postForm.appendChild(input);
  });
  document.body.appendChild(postForm);
  rsvpSubmitting=true;
  rsvpButton.disabled=true;
  rsvpButton.textContent='SENDING YOUR RSVP…';
  $('#formStatus').textContent='Sending your response securely to our RSVP form…';
  postForm.submit();
  // Google Forms accepts the POST in the background; give its response time to complete.
  window.setTimeout(()=>{
    $('#formStatus').textContent='Thank you! Your RSVP has been submitted. We look forward to celebrating with you.';
    rsvpButton.textContent='RSVP SUBMITTED ✓';
    postForm.remove();
  },1800);
});
// Wedding music: attempt autoplay directly from the envelope/skip click gesture.
// Browsers allow this more reliably because enterSite() is called by a user click.
const weddingAudio=$('#weddingAudio');
const soundToggle=$('#soundToggle');
function updateMusicButton(isPlaying){
  soundToggle.classList.toggle('is-playing',isPlaying);
  soundToggle.setAttribute('aria-pressed',String(isPlaying));
  soundToggle.setAttribute('aria-label',isPlaying?'Pause wedding music':'Play wedding music');
  soundToggle.setAttribute('title',isPlaying?'Pause wedding music':'Play wedding music');
}
function startWeddingMusic(){
  if(!weddingAudio)return;
  const playAttempt=weddingAudio.play();
  if(playAttempt&&typeof playAttempt.then==='function'){
    playAttempt.then(()=>updateMusicButton(true)).catch(error=>{
      // If the browser blocks playback, leave the visible button ready for a tap.
      updateMusicButton(false);
      console.info('Browser blocked automatic audio playback; tap the music button to start.',error);
    });
  }else{
    updateMusicButton(!weddingAudio.paused);
  }
}
soundToggle.addEventListener('click',async()=>{
  if(!weddingAudio)return;
  if(weddingAudio.paused){
    try{
      await weddingAudio.play();
      updateMusicButton(true);
    }catch(error){
      updateMusicButton(false);
      console.error('Unable to play the wedding audio:',error);
    }
  }else{
    weddingAudio.pause();
    updateMusicButton(false);
  }
});
weddingAudio.addEventListener('play',()=>updateMusicButton(true));
weddingAudio.addEventListener('pause',()=>updateMusicButton(false));
weddingAudio.addEventListener('ended',()=>updateMusicButton(false));
