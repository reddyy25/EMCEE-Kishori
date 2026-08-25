const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
const year=document.querySelector('#year');
year.textContent=new Date().getFullYear();

window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20),{passive:true});
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const counterObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;const end=Number(el.dataset.count);let start=0;const duration=1300;const t0=performance.now();const tick=t=>{const p=Math.min((t-t0)/duration,1);const eased=1-Math.pow(1-p,3);el.textContent=Math.round(end*eased).toLocaleString();if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);counterObserver.unobserve(el)}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>counterObserver.observe(el));

const lightbox=document.querySelector('#lightbox');const lightboxImg=document.querySelector('#lightbox-image');const closeBtn=document.querySelector('.lightbox-close');
document.querySelectorAll('.gallery-item').forEach(btn=>btn.addEventListener('click',()=>{lightboxImg.src=btn.dataset.full;lightbox.hidden=false;document.body.style.overflow='hidden';closeBtn.focus()}));
function closeLightbox(){lightbox.hidden=true;lightboxImg.src='';document.body.style.overflow=''}
closeBtn.addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lightbox.hidden)closeLightbox()});
