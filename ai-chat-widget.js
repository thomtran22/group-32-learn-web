const O_API = 'http://127.0.0.1:11434/api/generate';
const fab = document.getElementById('ai-fab');
const pop = document.getElementById('ai-popup');
const closeBtn = document.getElementById('ai-close');
const sendBtn = document.getElementById('ai-send');
const input = document.getElementById('ai-input');
const msgs = document.getElementById('ai-msgs');
const modelEl = document.getElementById('ai-model');

document.addEventListener('DOMContentLoaded', () => {
  pop.hidden = true;
  fab.setAttribute('aria-expanded', 'false');
  modelEl.value = 'mistral';
});

function show() {
  pop.hidden = false;
  fab.setAttribute('aria-expanded', 'true');
  input && input.focus();
}
function hide() {
  pop.hidden = true;
  fab.setAttribute('aria-expanded', 'false');
}

fab.onclick = () => (pop.hidden ? show() : hide());
closeBtn.onclick = hide;

/* Toggle bằng Enter hoặc Space */
fab.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    pop.hidden ? show() : hide();
  }
});

/* --- Gửi câu hỏi tới Ollama (mặc định mistral) --- */
sendBtn.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;
  add('Bạn', text);
  input.value = '';

  const model = modelEl.value || 'mistral';
  const res = await fetch(O_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt: text,
      stream: true,
    }),
  });

  if (!res.ok) {
    add('Lỗi', 'Không gọi được Ollama');
    return;
  }

  let ai = '';
  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    for (const line of chunk.split('\n')) {
      if (!line.trim()) continue;
      try {
        const j = JSON.parse(line);
        if (j.response) {
          ai += j.response;
          renderAI(ai);
        }
      } catch {}
    }
  }
};

/* --- UI helpers --- */
function add(who, text) {
  const d = document.createElement('div');
  d.innerHTML = `<b>${who}:</b> ${text}`;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}
let lastAI;
function renderAI(text) {
  if (!lastAI) {
    lastAI = document.createElement('div');
    msgs.appendChild(lastAI);
  }
  lastAI.innerHTML = `<b>AI:</b> ${text}`;
  msgs.scrollTop = msgs.scrollHeight;
}

/* ESC hoặc click ngoài để đóng */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !pop.hidden) hide();
});
document.addEventListener('click', e => {
  if (pop.hidden) return;
  if (pop.contains(e.target)) return;
  if (fab.contains(e.target)) return;
  hide();
});
