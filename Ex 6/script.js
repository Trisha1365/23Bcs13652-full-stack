const svg = document.getElementById('draw-area');
const shapeSelect = document.getElementById('shape-select');
const strokeWidthInput = document.getElementById('stroke-width');
const strokeColorInput = document.getElementById('stroke-color');
const status = document.getElementById('status');
const undoBtn = document.getElementById('undo');
const clearBtn = document.getElementById('clear');
const downloadBtn = document.getElementById('download');

let isDrawing = false;
let startX = 0, startY = 0;
let currentElem = null;
const drawnElements = [];

function getPoint(evt) {
  const rect = svg.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function onPointerDown(evt) {
  if (evt.button !== 0) return;
  const p = getPoint(evt);
  isDrawing = true;
  startX = p.x;
  startY = p.y;

  const stroke = strokeColorInput.value;
  const sw = Math.max(1, Number(strokeWidthInput.value) || 1);

  if (shapeSelect.value === 'rect') {
    const rectElem = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectElem.setAttribute('x', startX);
    rectElem.setAttribute('y', startY);
    rectElem.setAttribute('width', 0);
    rectElem.setAttribute('height', 0);
    rectElem.setAttribute('fill', 'transparent');
    rectElem.setAttribute('stroke', stroke);
    rectElem.setAttribute('stroke-width', sw);
    rectElem.dataset.type = 'rect';
    svg.appendChild(rectElem);
    currentElem = rectElem;
  } else {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', startX);
    line.setAttribute('y2', startY);
    line.setAttribute('stroke', stroke);
    line.setAttribute('stroke-width', sw);
    line.dataset.type = 'line';
    svg.appendChild(line);
    currentElem = line;
  }

  status.textContent = 'Drawing...';
}

function onPointerMove(evt) {
  if (!isDrawing || !currentElem) return;
  const p = getPoint(evt);

  if (currentElem.dataset.type === 'rect') {
    const x = Math.min(p.x, startX);
    const y = Math.min(p.y, startY);
    const w = Math.abs(p.x - startX);
    const h = Math.abs(p.y - startY);
    currentElem.setAttribute('x', x);
    currentElem.setAttribute('y', y);
    currentElem.setAttribute('width', w);
    currentElem.setAttribute('height', h);
  } else {
    currentElem.setAttribute('x2', p.x);
    currentElem.setAttribute('y2', p.y);
  }
}

function onPointerUp() {
  if (!isDrawing) return;
  isDrawing = false;

  if (currentElem) {
    drawnElements.push(currentElem);
    currentElem = null;
  }
  status.textContent = 'Ready. Draw another shape.';
}

// Undo
undoBtn.addEventListener('click', () => {
  const el = drawnElements.pop();
  if (el) el.remove();
  status.textContent = 'Undid last shape.';
});

// Clear
clearBtn.addEventListener('click', () => {
  svg.innerHTML = '';
  drawnElements.length = 0;
  status.textContent = 'Canvas cleared.';
});

// Download
downloadBtn.addEventListener('click', () => {
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svg);
  const blob = new Blob([source], {type: 'image/svg+xml'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'drawing.svg';
  a.click();
  status.textContent = 'Downloaded SVG.';
});

// Attach events
svg.addEventListener('pointerdown', onPointerDown);
window.addEventListener('pointermove', onPointerMove);
window.addEventListener('pointerup', onPointerUp);
