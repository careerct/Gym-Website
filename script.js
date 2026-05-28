/* ==========================================
   TITAN FITNESS CLUB — JAVASCRIPT
   ========================================== */

// --- LOADER ---
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// --- NAVBAR SCROLL ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
});

// --- BACK TO TOP ---
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- HAMBURGER / MOBILE MENU ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// --- THEME TOGGLE ---
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '🌙' : '☀';
});

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- ANIMATED COUNTERS ---
const counters = document.querySelectorAll('.stat-num');
let counted = false;
const runCounters = () => {
  if (counted) return;
  const heroRect = document.getElementById('hero').getBoundingClientRect();
  if (heroRect.top < window.innerHeight) {
    counted = true;
    counters.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'));
      const step = Math.ceil(target / 60);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current.toLocaleString();
      }, 30);
    });
  }
};
window.addEventListener('scroll', runCounters);
runCounters();

// --- REVEAL ON SCROLL ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- FAQ ACCORDION ---
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// --- BMI CALCULATOR ---
document.getElementById('calcBmi').addEventListener('click', () => {
  const weight = parseFloat(document.getElementById('bmiWeight').value);
  const height = parseFloat(document.getElementById('bmiHeight').value) / 100;
  const age = parseInt(document.getElementById('bmiAge').value);
  const gender = document.getElementById('bmiGender').value;

  if (!weight || !height || !age || weight <= 0 || height <= 0) {
    alert('Please enter valid weight, height, and age.');
    return;
  }

  const bmi = (weight / (height * height)).toFixed(1);
  let category, advice, gaugePercent;

  if (bmi < 18.5) {
    category = 'Underweight';
    advice = `At ${bmi} BMI, you are underweight. Our Muscle Gain Program and nutrition guidance can help you build lean mass safely.`;
    gaugePercent = 10;
  } else if (bmi < 25) {
    category = 'Normal Weight ✓';
    advice = `Great! At ${bmi} BMI you're in the healthy range. Our Strength Training or Women's Fitness programs can help you optimize further.`;
    gaugePercent = 35;
  } else if (bmi < 30) {
    category = 'Overweight';
    advice = `At ${bmi} BMI, our Fat Loss Program + personalized nutrition plan can get you to your ideal range within 8–12 weeks.`;
    gaugePercent = 65;
  } else {
    category = 'Obese';
    advice = `At ${bmi} BMI, we recommend starting with our guided Beginner Program and a consultation with our resident dietitian.`;
    gaugePercent = 90;
  }

  document.getElementById('bmiVal').textContent = bmi;
  document.getElementById('bmiCat').textContent = category;
  document.getElementById('bmiAdvice').textContent = advice;
  document.getElementById('gaugeFill').style.width = gaugePercent + '%';
  document.getElementById('bmiResult').classList.remove('hidden');
  document.getElementById('bmiPlaceholder').classList.add('hidden');
});

// --- PAYMENT MODAL ---
const payModal = document.getElementById('payModal');
document.querySelectorAll('.pay-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const plan = btn.getAttribute('data-plan');
    const amount = btn.getAttribute('data-amount');
    document.getElementById('modalPlanInfo').textContent = `${plan} Plan — ₹${parseInt(amount).toLocaleString()}/month`;
    payModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('closeModal').addEventListener('click', closeModal);
payModal.addEventListener('click', (e) => { if (e.target === payModal) closeModal(); });

function closeModal() {
  payModal.classList.add('hidden');
  document.body.style.overflow = '';
}

document.getElementById('payForm').addEventListener('submit', (e) => {
  e.preventDefault();
  closeModal();
  showToast('🎉 Payment successful! Welcome to Titan Fitness Club!');
});

// --- CONTACT FORM ---
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('✅ Message sent! We\'ll get back to you within 24 hours.');
  e.target.reset();
});

// --- NEWSLETTER ---
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('📧 Subscribed! Watch your inbox for exclusive offers.');
  e.target.reset();
});

// --- TOAST NOTIFICATION ---
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Inject toast styles
const toastStyle = document.createElement('style');
toastStyle.textContent = `
.toast {
  position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%) translateY(30px);
  background: #1e2430; border: 1px solid var(--red); color: #fff;
  padding: 14px 28px; border-radius: 8px; font-family: 'Rajdhani', sans-serif;
  font-size: 1rem; font-weight: 600; z-index: 9999; opacity: 0;
  transition: all 0.4s ease; box-shadow: 0 8px 30px rgba(0,0,0,0.4); max-width: 90vw; text-align: center;
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
`;
document.head.appendChild(toastStyle);

// --- AI CHATBOT ---
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const closeChat = document.getElementById('closeChat');

chatToggle.addEventListener('click', () => {
  chatWindow.classList.toggle('open');
  if (chatWindow.classList.contains('open')) chatInput.focus();
});
closeChat.addEventListener('click', () => chatWindow.classList.remove('open'));

const botResponses = {
  membership: "We have 3 plans:\n• Basic – ₹1,299/mo\n• Pro – ₹2,499/mo\n• Elite – ₹4,999/mo\n\nAll plans include gym floor access. Pro & Elite include personal training sessions!",
  timing: "Titan FC is open:\n• Mon–Fri: 5AM–11PM\n• Sat–Sun: 6AM–10PM\n\nElite members enjoy 24/7 key-card access!",
  trial: "Yes! We offer a FREE trial session for new members. Click 'Book Free Trial' or contact us at +91 98765 43210.",
  trainer: "We have 25+ certified trainers specializing in Strength, CrossFit, Yoga, Women's Fitness, and Nutrition. All NSCA/ACE certified!",
  location: "We're at No. 42, Anna Salai, Teynampet, Chennai – 600018. Free parking available!",
  programs: "Our programs include:\n• Fat Loss (8 weeks)\n• Muscle Gain (12 weeks)\n• Strength Training (16 weeks)\n• Beginner Program (12 weeks)\n• Women's Fitness (10 weeks)",
  contact: "You can reach us at:\n📞 +91 98765 43210\n📧 hello@titanfitnessclub.in\n💬 WhatsApp: +91 98765 43210",
  default: "I can help with memberships, timings, trainers, programs, location, or free trials! What would you like to know? 💪"
};

function getBotReply(input) {
  const msg = input.toLowerCase();
  if (msg.match(/plan|membership|price|cost|fee|join/)) return botResponses.membership;
  if (msg.match(/time|hour|open|close|timing|schedule/)) return botResponses.timing;
  if (msg.match(/trial|free|try/)) return botResponses.trial;
  if (msg.match(/trainer|coach|staff|instructor/)) return botResponses.trainer;
  if (msg.match(/location|address|where|map|parking/)) return botResponses.location;
  if (msg.match(/program|workout|class|training|fat|muscle|strength|yoga/)) return botResponses.programs;
  if (msg.match(/contact|phone|email|call|whatsapp/)) return botResponses.contact;
  return botResponses.default;
}

function addMessage(text, isBot) {
  const div = document.createElement('div');
  div.className = `chat-msg ${isBot ? 'bot' : 'user'}`;
  div.style.whiteSpace = 'pre-line';
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendChat() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  addMessage(msg, false);
  chatInput.value = '';
  setTimeout(() => {
    addMessage(getBotReply(msg), true);
  }, 600);
}

document.getElementById('chatSend').addEventListener('click', sendChat);
chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendChat(); });

// --- PARALLAX HERO ---
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroImg = document.querySelector('.hero-img');
  if (heroImg && scrolled < window.innerHeight) {
    heroImg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
  }
});

// --- ACTIVE NAV HIGHLIGHT ---
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAs.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observerNav.observe(s));

// nav active style
const navActiveStyle = document.createElement('style');
navActiveStyle.textContent = `.nav-links a.active { color: var(--white); } .nav-links a.active::after { width: 100%; }`;
document.head.appendChild(navActiveStyle);

console.log('%c💪 TITAN FITNESS CLUB', 'color: #e01c2c; font-size: 24px; font-weight: bold;');
console.log('%cBuilt for Champions.', 'color: #c8cdd6; font-size: 14px;');
