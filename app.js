/* Costo Claro — calculadora de costos para emprendedores
   App estática sin dependencias, pensada para GitHub Pages. */

const STORAGE_KEY = 'costoClaro.v1';
const uid = () => Math.random().toString(36).slice(2, 9);

const ICONS = {
  logo: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19V11M12 19V5M19 19v-7"/></svg>`,
  home: (c) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1h4v-6h3v6h4a1 1 0 0 0 1-1v-9"/></svg>`,
  building: (c) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1.2"/><path d="M9 7h1.4M13.6 7H15M9 10.6h1.4M13.6 10.6H15M9 14.2h1.4M13.6 14.2H15"/><path d="M10 21v-3.6h4V21"/></svg>`,
  box: (c) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 7v10L12 21l7.5-4V7z"/><path d="M4.5 7 12 11l7.5-4M12 11v10"/></svg>`,
  scale: (c) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M7 7h10"/><path d="M4 7l3-3.3L10 7l-3 5.2L4 7zM14 7l3-3.3L20 7l-3 5.2L14 7z"/><path d="M9 21h6"/></svg>`,
  tag: (c) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5V5a1 1 0 0 1 1-1h6.5L21 13.5l-7.5 7.5L3 11.5z"/><circle cx="7.6" cy="7.6" r="1.3"/></svg>`,
  grid: (c) => `<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="1.2"/><rect x="13" y="3" width="8" height="8" rx="1.2"/><rect x="3" y="13" width="8" height="8" rx="1.2"/><rect x="13" y="13" width="8" height="8" rx="1.2"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#C7CFC9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,
  back: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#16241C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>`,
  pencil: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#8B978F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#B5650A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#1B6B45" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,
  trend: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#BFE0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>`,
};

function defaultState() {
  return {
    businessName: 'Velas Aromáticas Luna',
    soldUnits: 62,
    price: 22000,
    pricingPct: 30,
    fixedCosts: [
      { id: uid(), label: 'Arriendo del taller', amount: 400000 },
      { id: uid(), label: 'Salario ayudante', amount: 600000 },
      { id: uid(), label: 'Servicios (luz, agua, internet)', amount: 150000 },
      { id: uid(), label: 'Marketing (redes / pauta)', amount: 100000 },
      { id: uid(), label: 'Software y contabilidad', amount: 50000 },
    ],
    variableCosts: [
      { id: uid(), label: 'Cera, fragancia y mecha', amount: 4500 },
      { id: uid(), label: 'Frasco de vidrio', amount: 3000 },
      { id: uid(), label: 'Etiqueta y empaque', amount: 1200 },
      { id: uid(), label: 'Comisión de venta', amount: 800 },
    ],
    products: [
      { id: uid(), name: 'Producto A', price: 22000, variableCost: 9500, mix: 60 },
      { id: uid(), name: 'Producto B', price: 15000, variableCost: 7000, mix: 40 },
    ],
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  } catch (e) {
    return defaultState();
  }
}

let state = loadState();
let ui = { editingList: null, editingId: null, addingList: null };

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    /* localStorage no disponible: seguimos solo en memoria */
  }
}

function fmt(n) {
  return '$' + Math.round(n || 0).toLocaleString('es-CO');
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function sum(list) {
  return list.reduce((acc, it) => acc + Number(it.amount || 0), 0);
}

function totalFixed() { return sum(state.fixedCosts); }
function totalVariable() { return sum(state.variableCosts); }
function margin() { return state.price - totalVariable(); }

function breakevenUnits() {
  const m = margin();
  if (m <= 0) return null;
  return Math.ceil(totalFixed() / m);
}
function breakevenSales() {
  const u = breakevenUnits();
  return u === null ? null : u * state.price;
}

function mixTotal() { return state.products.reduce((a, p) => a + Number(p.mix || 0), 0); }
function weightedMargin() {
  return state.products.reduce((acc, p) => acc + (Number(p.price || 0) - Number(p.variableCost || 0)) * (Number(p.mix || 0) / 100), 0);
}
function combinedBreakeven() {
  const wm = weightedMargin();
  if (wm <= 0) return null;
  return Math.ceil(totalFixed() / wm);
}

function setText(id, txt) {
  const el = document.getElementById(id);
  if (el) el.textContent = txt;
}

/* ---------- shared pieces ---------- */

function navbar(active) {
  const tabs = [
    ['home', 'Inicio', 'home'],
    ['fijos', 'Fijos', 'building'],
    ['variables', 'Variables', 'box'],
    ['equilibrio', 'Equilibrio', 'scale'],
    ['precio', 'Precio', 'tag'],
  ];
  return `<nav class="navbar">${tabs.map(([key, label, icon]) => {
    const isActive = key === active;
    const color = isActive ? '#1B6B45' : '#8B978F';
    return `<a href="#${key}" class="${isActive ? 'active' : ''}"><span class="icon-wrap">${ICONS[icon](color)}</span><span>${label}</span></a>`;
  }).join('')}</nav>`;
}

function headerBack(target, title, subtitle) {
  return `<div class="header-row">
    <a href="#${target}" class="icon-btn-round" aria-label="Volver">${ICONS.back}</a>
    <div><div class="heading view-title">${escapeHtml(title)}</div><div class="subtitle">${escapeHtml(subtitle)}</div></div>
  </div>`;
}

function quickLink(key, icon, title, sub, tone) {
  const bg = tone === 'accent' ? 'var(--accent-tint)' : 'var(--primary-tint)';
  const color = tone === 'accent' ? 'var(--accent-dark)' : 'var(--primary)';
  return `<a href="#${key}" class="quick-item">
    <span class="icon-wrap" style="background:${bg}">${ICONS[icon](color)}</span>
    <span class="quick-text"><span class="quick-title">${escapeHtml(title)}</span><span class="quick-sub">${escapeHtml(sub)}</span></span>
    ${ICONS.chevron}
  </a>`;
}

/* ---------- views ---------- */

function renderHome() {
  const beUnits = breakevenUnits();
  const beSales = breakevenSales();
  const m = margin();
  const marginPct = state.price > 0 ? Math.round((m / state.price) * 100) : 0;
  return `
    <div class="view">
      <div class="topbar">
        <div class="brand"><span class="brand-badge">${ICONS.logo}</span><span class="brand-name heading">Costo Claro</span></div>
      </div>
      <div class="field-inline">
        <label class="label-muted" for="businessNameInput">Tu negocio</label>
        <input id="businessNameInput" type="text" value="${escapeHtml(state.businessName)}" placeholder="Nombre de tu negocio" />
      </div>
      <a href="#equilibrio" class="hero">
        <div class="row" style="margin-bottom:12px"><span class="hero-label">Punto de equilibrio</span>${ICONS.trend}</div>
        <div class="hero-value heading">${beUnits === null ? '—' : beUnits.toLocaleString('es-CO') + ' u.'}<span class="hero-suffix"> /mes</span></div>
        <div class="hero-sub">${beUnits === null ? 'El precio no cubre tu costo variable.' : '= ' + fmt(beSales) + ' en ventas'}</div>
      </a>
      <div class="grid-2">
        <div class="card"><div class="label-muted">Costo unitario</div><div class="stat heading">${fmt(totalVariable())}</div></div>
        <div class="card"><div class="label-muted">Margen de contribución</div><div class="stat heading accent-green">${marginPct}%</div></div>
      </div>
      <div class="section-label">Accesos rápidos</div>
      <div class="quick-list">
        ${quickLink('fijos', 'building', 'Costos Fijos', fmt(totalFixed()) + ' / mes', 'primary')}
        ${quickLink('variables', 'box', 'Costos Variables', fmt(totalVariable()) + ' / unidad', 'accent')}
        ${quickLink('precio', 'tag', 'Precio y Margen', 'Calcula tu precio ideal', 'primary')}
        ${quickLink('productos', 'grid', 'Varios Productos', 'Mezcla de ventas', 'primary')}
      </div>
    </div>
    ${navbar('home')}
  `;
}

function costRow(listKey, item) {
  return `<div class="list-item" data-id="${item.id}" data-list="${listKey}">
    <div class="item-label">${escapeHtml(item.label)}</div>
    <div class="item-actions">
      <span class="item-amount">${fmt(item.amount)}</span>
      <button type="button" class="icon-btn" data-action="edit-item" data-list="${listKey}" data-id="${item.id}" aria-label="Editar ${escapeHtml(item.label)}">${ICONS.pencil}</button>
      <button type="button" class="icon-btn" data-action="delete-item" data-list="${listKey}" data-id="${item.id}" aria-label="Eliminar ${escapeHtml(item.label)}">${ICONS.trash}</button>
    </div>
  </div>`;
}

function editRow(listKey, item) {
  return `<div class="list-item edit-row" data-id="${item.id}" data-list="${listKey}">
    <input type="text" class="edit-label" value="${escapeHtml(item.label)}" placeholder="Nombre del costo" />
    <input type="number" class="edit-amount" value="${item.amount}" min="0" step="100" placeholder="Valor" />
    <div class="edit-actions">
      <button type="button" class="btn-save" data-action="save-item" data-list="${listKey}" data-id="${item.id}">Guardar</button>
      <button type="button" class="btn-cancel" data-action="cancel-edit">Cancelar</button>
    </div>
  </div>`;
}

function addRow(listKey) {
  return `<div class="list-item edit-row" data-list="${listKey}">
    <input type="text" class="edit-label" placeholder="Nombre del costo" />
    <input type="number" class="edit-amount" placeholder="Valor" min="0" step="100" />
    <div class="edit-actions">
      <button type="button" class="btn-save" data-action="confirm-add" data-list="${listKey}">Agregar</button>
      <button type="button" class="btn-cancel" data-action="cancel-add">Cancelar</button>
    </div>
  </div>`;
}

function renderCostList(key, title, subtitle, totalLabel, addLabel, navKey) {
  const items = state[key];
  const total = sum(items);
  const rowsHtml = items.map((it) => {
    if (ui.editingList === key && ui.editingId === it.id) return editRow(key, it);
    return costRow(key, it);
  }).join('');
  const addFormHtml = ui.addingList === key
    ? addRow(key)
    : `<button type="button" class="btn btn-ghost btn-add" data-action="start-add" data-list="${key}">${ICONS.plus} ${addLabel}</button>`;
  return `
    <div class="view">
      ${headerBack('home', title, subtitle)}
      <div class="hero" style="margin:18px 0">
        <div class="hero-label">${totalLabel}</div>
        <div class="hero-value heading" style="font-size:28px;margin-top:6px">${fmt(total)}</div>
      </div>
      <div class="section-label">Conceptos</div>
      <div id="list-${key}">
        ${rowsHtml || '<div class="empty-note">Aún no has agregado ningún costo.</div>'}
      </div>
      ${addFormHtml}
    </div>
    ${navbar(navKey)}
  `;
}

function renderFijos() { return renderCostList('fixedCosts', 'Costos Fijos', 'Lo que pagas exista o no venta', 'Total mensual', 'Agregar costo fijo', 'fijos'); }
function renderVariables() { return renderCostList('variableCosts', 'Costos Variables', 'Lo que cuesta cada unidad producida', 'Total por unidad', 'Agregar costo variable', 'variables'); }

function renderEquilibrio() {
  const price = state.price;
  const m = margin();
  const beUnits = breakevenUnits();
  const beSales = breakevenSales();
  const sold = state.soldUnits;
  const pct = beUnits ? Math.min(100, Math.round((sold / beUnits) * 100)) : 0;
  const remaining = beUnits === null ? null : Math.max(0, beUnits - sold);
  return `
    <div class="view">
      ${headerBack('home', 'Punto de Equilibrio', state.businessName)}
      <div class="card" style="margin:18px 0 14px">
        <div class="row" style="margin-bottom:10px;align-items:baseline">
          <span class="label-strong">Precio de venta por unidad</span>
          <span class="heading" id="priceLabel" style="font-size:21px">${fmt(price)}</span>
        </div>
        <input type="range" id="priceRange" min="1000" max="100000" step="500" value="${price}" aria-label="Precio de venta por unidad" />
        <div class="row" style="margin-top:6px"><span class="tiny-muted">$1.000</span><span class="tiny-muted">$100.000</span></div>
      </div>
      <div class="stacked-cards" style="margin-bottom:18px">
        <div class="list-item"><span class="label-strong">Margen de contribución</span><span class="heading accent-green" id="marginLabel">${fmt(m)}</span></div>
        <div class="list-item"><span class="label-strong">Costos fijos / mes</span><span class="heading">${fmt(totalFixed())}</span></div>
      </div>
      <div class="hero" style="margin-bottom:16px">
        <div class="hero-label">Punto de equilibrio</div>
        <div class="hero-value heading"><span id="breakevenUnitsLabel">${beUnits === null ? '—' : beUnits.toLocaleString('es-CO')}</span>${beUnits === null ? '' : ' u.'}<span class="hero-suffix"> /mes</span></div>
        <div class="hero-sub">${beUnits === null ? 'El precio no cubre tu costo variable.' : '= <span id="breakevenSalesLabel">' + fmt(beSales) + '</span> en ventas'}</div>
      </div>
      <div class="card" style="margin-bottom:20px">
        <div class="row" style="margin-bottom:10px">
          <span class="label-strong">Progreso este mes</span>
          <span class="label-strong" id="progressLabel">${beUnits === null ? '—' : sold.toLocaleString('es-CO') + ' de ' + beUnits.toLocaleString('es-CO') + ' u.'}</span>
        </div>
        <div class="progress-track"><div class="progress-fill" id="progressBar" style="width:${pct}%"></div></div>
        <div class="row" style="margin-top:10px;gap:8px">
          <label class="mini-field" style="flex:1"><span>Unidades vendidas este mes</span><input type="number" id="soldUnitsInput" min="0" step="1" value="${sold}" /></label>
        </div>
        <div class="tiny-muted" id="progressNote" style="margin-top:8px">${remaining === null ? '' : (remaining > 0 ? `Te faltan ${remaining.toLocaleString('es-CO')} unidades para cubrir tus costos de este mes.` : 'Ya cubriste tus costos fijos de este mes.')}</div>
      </div>
      <a href="#productos" class="link-row">Ver con varios productos ${ICONS.chevron}</a>
    </div>
    ${navbar('equilibrio')}
  `;
}

function patchEquilibrio() {
  const price = state.price;
  const m = margin();
  const beUnits = breakevenUnits();
  const beSales = breakevenSales();
  const sold = state.soldUnits;
  const pct = beUnits ? Math.min(100, Math.round((sold / beUnits) * 100)) : 0;
  const remaining = beUnits === null ? null : Math.max(0, beUnits - sold);
  setText('priceLabel', fmt(price));
  setText('marginLabel', fmt(m));
  setText('breakevenUnitsLabel', beUnits === null ? '—' : beUnits.toLocaleString('es-CO'));
  const salesEl = document.getElementById('breakevenSalesLabel');
  if (salesEl) salesEl.textContent = beUnits === null ? '' : fmt(beSales);
  setText('progressLabel', beUnits === null ? '—' : sold.toLocaleString('es-CO') + ' de ' + beUnits.toLocaleString('es-CO') + ' u.');
  setText('progressNote', remaining === null ? '' : (remaining > 0 ? `Te faltan ${remaining.toLocaleString('es-CO')} unidades para cubrir tus costos de este mes.` : 'Ya cubriste tus costos fijos de este mes.'));
  const bar = document.getElementById('progressBar');
  if (bar) bar.style.width = pct + '%';
}

function renderPrecio() {
  const pct = state.pricingPct;
  const baseCost = totalVariable();
  const fraction = pct / 100;
  const marginPrice = fraction < 1 ? baseCost / (1 - fraction) : baseCost;
  const markupPrice = baseCost * (1 + fraction);
  const fracLabel = fraction.toFixed(2).replace('.', ',');
  return `
    <div class="view">
      ${headerBack('home', 'Precio y Margen', 'Costo base: ' + fmt(baseCost) + ' por unidad')}
      <div class="card" style="margin:18px 0">
        <div class="row" style="margin-bottom:10px;align-items:baseline">
          <span class="label-strong">Porcentaje deseado</span>
          <span class="heading" id="pctLabelTop" style="font-size:21px">${pct}%</span>
        </div>
        <input type="range" id="pctRange" min="0" max="100" step="5" value="${pct}" aria-label="Porcentaje deseado" />
        <div class="row" style="margin-top:6px"><span class="tiny-muted">0%</span><span class="tiny-muted">100%</span></div>
      </div>
      <div class="tint-card green">
        <div class="tint-label">Margen (<span class="pctEcho">${pct}%</span>)</div>
        <div class="tint-sub">Se calcula sobre el precio de venta</div>
        <div class="tint-value heading" id="marginPriceLabel">${fmt(marginPrice)}</div>
        <div class="tint-formula">Precio = Costo ÷ (1 − <span class="fracEcho">${fracLabel}</span>)</div>
      </div>
      <div class="tint-card amber">
        <div class="tint-label">Markup (<span class="pctEcho">${pct}%</span>)</div>
        <div class="tint-sub">Se calcula sobre el costo</div>
        <div class="tint-value heading" id="markupPriceLabel">${fmt(markupPrice)}</div>
        <div class="tint-formula">Precio = Costo × (1 + <span class="fracEcho">${fracLabel}</span>)</div>
      </div>
      <div class="card">
        <div class="label-strong" style="margin-bottom:4px">Ojo: no son lo mismo</div>
        <div class="tiny-muted">Con el mismo porcentaje, margen y markup dan precios distintos. Compara los dos antes de decidir.</div>
      </div>
    </div>
    ${navbar('precio')}
  `;
}

function patchPrecio() {
  const pct = state.pricingPct;
  const baseCost = totalVariable();
  const fraction = pct / 100;
  const marginPrice = fraction < 1 ? baseCost / (1 - fraction) : baseCost;
  const markupPrice = baseCost * (1 + fraction);
  const fracLabel = fraction.toFixed(2).replace('.', ',');
  setText('pctLabelTop', pct + '%');
  setText('marginPriceLabel', fmt(marginPrice));
  setText('markupPriceLabel', fmt(markupPrice));
  document.querySelectorAll('.pctEcho').forEach((el) => { el.textContent = pct + '%'; });
  document.querySelectorAll('.fracEcho').forEach((el) => { el.textContent = fracLabel; });
}

function productRow(p) {
  return `<div class="card product-row" style="margin-bottom:10px">
    <div class="row" style="margin-bottom:8px">
      <input type="text" class="product-name" value="${escapeHtml(p.name)}" data-action="update-product" data-field="name" data-id="${p.id}" />
      <button type="button" class="icon-btn" data-action="delete-product" data-id="${p.id}" aria-label="Eliminar ${escapeHtml(p.name)}">${ICONS.trash}</button>
    </div>
    <div class="grid-3">
      <label class="mini-field"><span>Precio</span><input type="number" min="0" step="100" value="${p.price}" data-action="update-product" data-field="price" data-id="${p.id}" /></label>
      <label class="mini-field"><span>Costo var.</span><input type="number" min="0" step="100" value="${p.variableCost}" data-action="update-product" data-field="variableCost" data-id="${p.id}" /></label>
      <label class="mini-field"><span>Mezcla %</span><input type="number" min="0" max="100" step="1" value="${p.mix}" data-action="update-product" data-field="mix" data-id="${p.id}" /></label>
    </div>
  </div>`;
}

function renderProductos() {
  const mixSum = mixTotal();
  const wm = weightedMargin();
  const cbe = combinedBreakeven();
  const mixOk = Math.abs(mixSum - 100) < 0.5;
  return `
    <div class="view">
      ${headerBack('equilibrio', 'Varios Productos', 'Equilibrio con mezcla de ventas')}
      <div class="section-label" style="margin-top:18px">Tus productos</div>
      <div id="productList">
        ${state.products.map((p) => productRow(p)).join('') || '<div class="empty-note">Agrega al menos un producto.</div>'}
      </div>
      <button type="button" class="btn btn-ghost btn-add" data-action="add-product">${ICONS.plus} Agregar producto</button>
      <div id="mixCheck" class="mix-check ${mixOk ? 'ok' : 'warn'}" style="margin:14px 0">${mixOk ? 'La mezcla suma 100% ✓' : `Revisa: la mezcla suma ${mixSum}%, no 100%`}</div>
      <div class="hero" style="margin-bottom:14px">
        <div class="hero-label">Punto de equilibrio combinado</div>
        <div class="hero-value heading" id="combinedBreakevenLabel" style="font-size:28px;margin-top:6px">${cbe === null ? '—' : cbe.toLocaleString('es-CO') + ' u. /mes'}</div>
        <div class="hero-sub">Margen ponderado: <span id="weightedMarginLabel">${fmt(wm)}</span> por unidad</div>
      </div>
      <div class="grid-auto" id="breakdownGrid">
        ${state.products.map((p) => `<div class="card"><div class="label-muted" id="label-${p.id}">${escapeHtml(p.name)}</div><div class="stat heading" id="prod-units-${p.id}">${cbe === null ? '—' : Math.round(cbe * (Number(p.mix || 0) / 100)).toLocaleString('es-CO') + ' u.'}</div></div>`).join('')}
      </div>
    </div>
  `;
}

function patchProductos() {
  const mixSum = mixTotal();
  const wm = weightedMargin();
  const cbe = combinedBreakeven();
  const mixOk = Math.abs(mixSum - 100) < 0.5;
  const mixEl = document.getElementById('mixCheck');
  if (mixEl) {
    mixEl.className = 'mix-check ' + (mixOk ? 'ok' : 'warn');
    mixEl.textContent = mixOk ? 'La mezcla suma 100% ✓' : `Revisa: la mezcla suma ${mixSum}%, no 100%`;
  }
  setText('combinedBreakevenLabel', cbe === null ? '—' : cbe.toLocaleString('es-CO') + ' u. /mes');
  setText('weightedMarginLabel', fmt(wm));
  state.products.forEach((p) => {
    setText('prod-units-' + p.id, cbe === null ? '—' : Math.round(cbe * (Number(p.mix || 0) / 100)).toLocaleString('es-CO') + ' u.');
  });
}

/* ---------- router ---------- */

const VIEWS = ['home', 'fijos', 'variables', 'equilibrio', 'precio', 'productos'];
const RENDERERS = {
  home: renderHome, fijos: renderFijos, variables: renderVariables,
  equilibrio: renderEquilibrio, precio: renderPrecio, productos: renderProductos,
};

function currentView() {
  const h = (location.hash || '#home').replace('#', '');
  return VIEWS.includes(h) ? h : 'home';
}

function render() {
  const view = currentView();
  const root = document.getElementById('app');
  root.innerHTML = RENDERERS[view]();
  window.scrollTo(0, 0);
}

/* ---------- event delegation ---------- */

function onAppClick(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  const list = btn.dataset.list;
  const id = btn.dataset.id;

  if (action === 'start-add') { ui = { editingList: null, editingId: null, addingList: list }; render(); return; }
  if (action === 'cancel-add') { ui = { editingList: null, editingId: null, addingList: null }; render(); return; }
  if (action === 'confirm-add') {
    const row = btn.closest('.list-item');
    const label = row.querySelector('.edit-label').value.trim() || 'Costo sin nombre';
    const amount = Number(row.querySelector('.edit-amount').value) || 0;
    state[list].push({ id: uid(), label, amount });
    ui = { editingList: null, editingId: null, addingList: null };
    saveState(); render();
    return;
  }
  if (action === 'edit-item') { ui = { editingList: list, editingId: id, addingList: null }; render(); return; }
  if (action === 'cancel-edit') { ui = { editingList: null, editingId: null, addingList: null }; render(); return; }
  if (action === 'save-item') {
    const row = btn.closest('.list-item');
    const label = row.querySelector('.edit-label').value.trim() || 'Costo sin nombre';
    const amount = Number(row.querySelector('.edit-amount').value) || 0;
    const item = state[list].find((it) => it.id === id);
    if (item) { item.label = label; item.amount = amount; }
    ui = { editingList: null, editingId: null, addingList: null };
    saveState(); render();
    return;
  }
  if (action === 'delete-item') {
    if (confirm('¿Eliminar este costo?')) {
      state[list] = state[list].filter((it) => it.id !== id);
      saveState(); render();
    }
    return;
  }
  if (action === 'add-product') {
    state.products.push({ id: uid(), name: 'Producto ' + (state.products.length + 1), price: 0, variableCost: 0, mix: 0 });
    saveState(); render();
    return;
  }
  if (action === 'delete-product') {
    if (confirm('¿Eliminar este producto?')) {
      state.products = state.products.filter((p) => p.id !== id);
      saveState(); render();
    }
  }
}

function onAppInput(e) {
  const el = e.target;
  if (el.id === 'businessNameInput') { state.businessName = el.value; saveState(); return; }
  if (el.id === 'priceRange') { state.price = Number(el.value); saveState(); patchEquilibrio(); return; }
  if (el.id === 'soldUnitsInput') { state.soldUnits = Number(el.value) || 0; saveState(); patchEquilibrio(); return; }
  if (el.id === 'pctRange') { state.pricingPct = Number(el.value); saveState(); patchPrecio(); return; }
  if (el.dataset && el.dataset.action === 'update-product') {
    const { id, field } = el.dataset;
    const p = state.products.find((pp) => pp.id === id);
    if (p) {
      if (field === 'name') { p.name = el.value; setText('label-' + id, el.value || 'Producto'); }
      else { p[field] = Number(el.value) || 0; }
    }
    saveState();
    patchProductos();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render();
  const app = document.getElementById('app');
  app.addEventListener('click', onAppClick);
  app.addEventListener('input', onAppInput);
});

window.addEventListener('hashchange', () => {
  ui = { editingList: null, editingId: null, addingList: null };
  render();
});
