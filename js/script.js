/* ===== NAVEGACIÓN ===== */
const secciones = ['inicio','cargues','cargues2','cargar','confirmacion-pago','reclamos','reclamos2','reclamar','confirmacion-reclamo','reintegros','consultas','reestructuraciones','venta-cartera','novedades'];

window.addEventListener('popstate', function(e) {
  const page = (e.state && e.state.page) || location.hash.replace('#', '') || 'login';
  if (page === 'login') {
    document.getElementById('view-app').classList.remove('active');
    document.getElementById('view-login').classList.add('active');
  } else if (secciones.includes(page)) {
    navTo(page);
  }
});

function navTo(id) {
  closeMenus();
  secciones.forEach(s => {
    const el = document.getElementById('sec-'+s);
    if (el) el.classList.remove('active');
  });
  const target = document.getElementById('sec-'+id);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (id === 'inicio') document.getElementById('nl-inicio').classList.add('active');
  else if (['cargues','cargar','reclamos','reclamar','reintegros','reestructuraciones','venta-cartera','novedades'].includes(id))
    document.getElementById('nl-garantias').classList.add('active');
  else if (id === 'consultas') document.getElementById('nl-consultas').classList.add('active');

  if (id === 'cargues') renderTabla();
  if (id === 'cargues2') typeof renderTablaCargues2 === 'function' && renderTablaCargues2();
  if (id === 'reclamos') renderReclamos();
  if (id === 'reclamos2') typeof renderTablaReclamos2 === 'function' && renderTablaReclamos2();
  window.scrollTo(0,0);
}

/* ===== MENÚS ===== */
function toggleMenu(id, e) {
  e.stopPropagation();
  const el = document.getElementById(id);
  const isOpen = el.classList.contains('open');
  closeMenus();
  if (!isOpen) el.classList.add('open');
}

function toggleDotsMenu(id, e) {
  e.stopPropagation();
  const el = document.getElementById(id);
  const isOpen = el.classList.contains('open');
  closeMenus();
  if (!isOpen) el.classList.add('open');
}

function closeMenus() {
  document.querySelectorAll('.nav-dropdown.open, .user-dropdown.open, .dots-menu.open').forEach(el => el.classList.remove('open'));
}

document.addEventListener('click', closeMenus);

/* ===== MODALES ===== */
function abrirModal(id) {
  document.getElementById(id).classList.add('open');
}

function cerrarModal(id) {
  document.getElementById(id).classList.remove('open');
}

document.querySelectorAll('.overlay').forEach(ov => {
  ov.addEventListener('click', e => {
    if (e.target === ov) ov.classList.remove('open');
  });
});

/* ===== AUTH ===== */
function doLogin() {
  document.getElementById('view-login').classList.remove('active');
  document.getElementById('view-app').classList.add('active');
  initMonthInput();
  navTo('inicio');
}

function doLogout() {
  document.getElementById('view-app').classList.remove('active');
  document.getElementById('view-login').classList.add('active');
  history.pushState({ page: 'login' }, '', '#login');
  const cuenta = document.getElementById('inp-cuenta');
  const pass = document.getElementById('inp-pass');
  cuenta.value = ''; delete cuenta.dataset.filled; cuenta.setAttribute('readonly', '');
  pass.value = '';   delete pass.dataset.filled;   pass.setAttribute('readonly', '');
  resetearCargar();
}

/* ===== TOAST ===== */
function showToast(msg, type) {
  type = type || 'success';
  const icons = { success: 'check_circle', info: 'info', warning: 'warning', error: 'error' };
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.innerHTML = `<span class="material-icons">${icons[type] || 'info'}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toast-out 0.25s ease forwards';
    setTimeout(() => toast.remove(), 260);
  }, 4000);
}

/* ===== UTILIDADES ===== */
function initMonthInput() {
  const now = new Date();
  const max = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
  const inp = document.getElementById('sel-fecha');
  if (inp) {
    inp.max = max;
    inp.value = '';
    const display = document.getElementById('fecha-display');
    if (display) { display.textContent = 'Seleccione el mes'; display.style.color = '#9ca3af'; }
  }
}

function descargarPlantilla() {
  showToast('Descargando plantilla de cargue...', 'info');
}

function simularSoporte(n) {
  const nombres = {1: 'soporte_pago_1.pdf', 2: 'soporte_pago_2.pdf'};
  soportesCargados[n] = true;
  const slot = document.getElementById('upload-slot-' + n);
  if (!slot) return;
  slot.classList.add('has-file');
  slot.querySelector('.material-icons').textContent = 'check_circle';
  document.getElementById('nombre-soporte-' + n).textContent = nombres[n];
}
