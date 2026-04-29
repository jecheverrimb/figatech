/* ===== NAVEGACIÓN ===== */
const secciones = ['inicio','cargues','cargues2','cargar','confirmacion-pago','reclamos','reclamos2','reclamar','confirmacion-reclamo','reintegros','consultas','reestructuraciones','venta-cartera','novedades','compromiso-docs'];

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
    inp.classList.add('sin-valor');
    const ph = document.getElementById('fecha-placeholder');
    if (ph) ph.style.display = '';
    const display = document.getElementById('fecha-display');
    if (display) { display.textContent = 'Seleccione el mes'; display.style.color = '#9ca3af'; }
  }
}

function descargarPlantilla() {
  showToast('Descargando plantilla de cargue...', 'info');
}

/* ===== CARGUE WIZARD ===== */
function fechaTextoFromInput() {
  var inp = document.getElementById('sel-fecha');
  if (!inp || !inp.value) return '';
  var parts = inp.value.split('-');
  if (parts.length < 2) return '';
  var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return meses[parseInt(parts[1], 10) - 1] + ' / ' + parts[0];
}

function camposFaltantes() {
  var f = [];
  var comision = document.getElementById('sel-comision');
  var fecha    = document.getElementById('sel-fecha');
  if (!comision || !comision.value) f.push('Tipo de comisión');
  if (!fecha    || !fecha.value)    f.push('Fecha de reporte');
  if (!archivoSimulado)             f.push('Archivo Excel (.xlsx)');
  return f;
}

function verificarBtnSiguiente() {
  if (pasoActual !== 1) return;
  var faltantes = camposFaltantes();
  var btn = document.getElementById('btn-siguiente');
  if (!btn) return;
  btn.disabled = faltantes.length > 0;
  var tip = document.getElementById('btn-sig-tip');
  if (tip) {
    tip.innerHTML = faltantes.length
      ? '<strong>Falta diligenciar:</strong><br>• ' + faltantes.join('<br>• ')
      : '';
  }
}

function actualizarFechaPlaceholder() {
  var inp = document.getElementById('sel-fecha');
  var ph  = document.getElementById('fecha-placeholder');
  var tiene = !!(inp && inp.value);
  if (inp) inp.classList.toggle('sin-valor', !tiene);
  if (ph)  ph.style.display = tiene ? 'none' : '';
}

function mostrarArchivoSeleccionado(nombre) {
  document.getElementById('udz-empty').style.display = 'none';
  document.getElementById('udz-selected').style.display = 'flex';
  document.getElementById('udz-file-name').textContent = nombre;
  document.getElementById('upload-zone').classList.add('has-file');
  verificarBtnSiguiente();
}

function quitarArchivo() {
  archivoSimulado = false;
  var empty = document.getElementById('udz-empty');
  var sel   = document.getElementById('udz-selected');
  var zone  = document.getElementById('upload-zone');
  if (empty) empty.style.display = '';
  if (sel)   sel.style.display   = 'none';
  if (zone)  zone.classList.remove('has-file');
  verificarBtnSiguiente();
}

function simularArchivoCargar() {
  if (archivoSimulado) return;
  archivoSimulado = true;
  mostrarArchivoSeleccionado('créditos_afianzados_abril2026.xlsx');
}

function descargarDocumento() {
  showToast('Descargando documento informativo...', 'info');
}

function wizardSetPaso(n) {
  pasoActual = n;
  var ids = ['paso1', 'paso2', 'paso3', 'paso-loading'];
  ids.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  var target = document.getElementById('paso' + n);
  if (target) target.style.display = 'block';

  for (var i = 1; i <= 3; i++) {
    var ws = document.getElementById('ws-' + i);
    if (!ws) continue;
    ws.classList.remove('active', 'done');
    if (i < n) ws.classList.add('done');
    else if (i === n) ws.classList.add('active');
  }
  for (var j = 1; j <= 2; j++) {
    var wl = document.getElementById('wl-' + j);
    if (wl) wl.classList.toggle('done', j < n);
  }

  if (n === 1) verificarBtnSiguiente();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarCargando(titulo, sub, callback) {
  ['paso1','paso2','paso3'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  var pl    = document.getElementById('paso-loading');
  var tEl   = document.getElementById('loading-title');
  var sEl   = document.getElementById('loading-sub');
  var bar   = document.getElementById('loading-bar');

  if (!pl || !bar) { callback(); return; }

  if (tEl) tEl.textContent = titulo;
  if (sEl) sEl.textContent = sub;

  bar.style.transition = 'none';
  bar.style.width = '0%';
  pl.style.display = 'block';

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      bar.style.transition = 'width 2.3s cubic-bezier(0.4, 0, 0.2, 1)';
      bar.style.width = '100%';
    });
  });

  setTimeout(callback, 2500);
}

function wizardSiguiente() {
  if (pasoActual === 1) {
    var comision = document.getElementById('sel-comision').value;
    var fecha    = document.getElementById('sel-fecha').value;
    if (!comision)        { showToast('Selecciona el tipo de comisión', 'warning'); return; }
    if (!fecha)           { showToast('Selecciona la fecha de reporte', 'warning'); return; }
    if (!archivoSimulado) { showToast('Selecciona un archivo .xlsx para cargar', 'warning'); return; }

    var periodoTexto = fechaTextoFromInput();

    mostrarCargando('Analizando archivo...', 'Verificando registros y formato del archivo', function() {
      document.getElementById('val-periodo').textContent = periodoTexto;
      document.getElementById('val-registros').textContent = '248';
      document.getElementById('val-cobertura').textContent = '$ 620.000';
      document.getElementById('val-admin').textContent = '$ 240.000';
      document.getElementById('val-iva').textContent = '$ 45.600';
      document.getElementById('val-total').textContent = '$ 905.600';
      showToast('Archivo analizado y validado correctamente', 'success');
      wizardSetPaso(2);
    });

  } else if (pasoActual === 2) {
    var hoy  = new Date();
    var dd   = String(hoy.getDate()).padStart(2, '0');
    var mm   = String(hoy.getMonth() + 1).padStart(2, '0');
    var yyyy = hoy.getFullYear();
    var fechaGen = yyyy + '-' + mm + '-' + dd;

    mostrarCargando('Generando documento informativo...', 'Calculando valores y generando el PDF', function() {
      document.getElementById('doc-fecha-gen').textContent = fechaGen;
      document.getElementById('doc-nombre').textContent = 'Cuenta de cobro CC-' + yyyy + '-' + mm + dd + '.pdf';
      showToast('Documento informativo generado exitosamente', 'success');
      wizardSetPaso(3);
    });
  }
}

function wizardAnterior() {
  if (pasoActual > 1) wizardSetPaso(pasoActual - 1);
}

function abrirConfirmar()  { abrirModal('modal-confirmar'); }
function procesarCargue()  { cerrarModal('modal-confirmar'); abrirModal('modal-exito'); }

function guardarYPagar() {
  var nuevoId = String(Number(cargues[0].id) + 1).padStart(2, '0');
  var fechaEl = document.getElementById('sel-fecha');
  var partes  = fechaEl && fechaEl.value ? fechaEl.value.split('-') : ['2026', '05'];
  var meses   = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  var fechaTexto = (meses[parseInt(partes[1], 10) - 1] || 'Mayo') + ' / ' + partes[0];
  cargues.unshift({ id: nuevoId, fecha: fechaTexto, cobertura: '$ 620.000', admin: '$ 240.000', iva: '$ 45.600', total: '$ 905.600', estado: 'Pendiente de pago' });
  resetearCargar();
  navTo('cargues2');
  showToast('Garantías guardadas. Recuerda adjuntar el soporte de pago.', 'success');
}

function finalizarCargue() {
  cerrarModal('modal-exito');
  var nuevoId  = String(Number(cargues[0].id) + 1).padStart(2, '0');
  var fechaEl  = document.getElementById('sel-fecha');
  var partes   = fechaEl && fechaEl.value ? fechaEl.value.split('-') : ['2026', '04'];
  var año = partes[0], mes = partes[1];
  var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  var fechaTexto = (meses[parseInt(mes, 10) - 1] || 'Abril') + ' / ' + año;
  cargues.unshift({ id: nuevoId, fecha: fechaTexto, cobertura: '$25.000', admin: '$4.000', iva: '$2.000', total: '$31.000', estado: 'Pendiente de pago' });
  resetearCargar();
  navTo('cargues2');
  showToast('Garantías cargadas exitosamente. Recuerda subir el soporte de pago.', 'success');
}

function resetearCargar() {
  archivoSimulado = false;
  quitarArchivo();
  var sel = document.getElementById('sel-comision');
  if (sel) sel.value = '';
  initMonthInput();
  pasoActual = 1;
  wizardSetPaso(1);
}

function initCargar() {
  pasoActual     = 1;
  archivoSimulado = false;
  wizardSetPaso(1);
  initMonthInput();
  actualizarFechaPlaceholder();
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

/* ===== CARGUES — FUNCIONES COMPARTIDAS ===== */
var BADGE_ESTADO = {
  'Pendiente de pago': 'badge-pendiente',
  'Pago en revisión':  'badge-revision',
  'Cargue completado': 'badge-completado'
};

function buildCargueRow(c, dotsPrefix) {
  var badgeClass  = BADGE_ESTADO[c.estado] || '';
  var estadoBadge = '<span class="badge ' + badgeClass + '">' + c.estado + '</span>';

  var btnPrincipal = '';
  if (c.estado === 'Pendiente de pago') {
    btnPrincipal = '<button class="btn-accion btn-accion-pago" onclick="abrirSubirSoporte(\'' + c.id + '\',\'nuevo\')">'
      + '<span class="material-icons">upload</span> Subir pago</button>';
  } else if (c.estado === 'Pago en revisión') {
    btnPrincipal = '<button class="btn-accion btn-accion-descargar" onclick="descargarGarantias(\'' + c.id + '\')">'
      + '<span class="material-icons">download</span> Descargar soporte</button>';
  } else if (c.estado === 'Cargue completado') {
    btnPrincipal = '<button class="btn-accion btn-accion-descargar" onclick="descargarGarantias(\'' + c.id + '\')">'
      + '<span class="material-icons">download</span> Descargar garantías</button>';
  }

  var dotsItems = '<button onclick="closeMenus()"><span class="material-icons">visibility</span> Ver detalle</button>';
  if (c.estado === 'Pendiente de pago') {
    dotsItems += '<button onclick="closeMenus()"><span class="material-icons">download</span> Descargar</button>'
      + '<div class="dots-divider"></div>'
      + '<button class="danger" onclick="solicitarEliminar(\'' + c.id + '\')"><span class="material-icons">delete</span> Eliminar</button>';
  } else if (c.estado === 'Pago en revisión') {
    dotsItems += '<button onclick="abrirSubirSoporte(\'' + c.id + '\',\'cambiar\')"><span class="material-icons">swap_horiz</span> Cambiar soporte</button>'
      + '<div class="dots-divider"></div>'
      + '<button class="danger" onclick="solicitarEliminar(\'' + c.id + '\')"><span class="material-icons">delete</span> Eliminar</button>';
  } else if (c.estado === 'Cargue completado') {
    dotsItems += '<button onclick="descargarGarantias(\'' + c.id + '\')"><span class="material-icons">download</span> Descargar garantías</button>'
      + '<div class="dots-divider"></div>'
      + '<button class="danger" onclick="solicitarEliminar(\'' + c.id + '\')"><span class="material-icons">delete</span> Eliminar</button>';
  }

  var tr = document.createElement('tr');
  tr.innerHTML =
    '<td><span class="td-id">' + c.id + '</span></td>'
    + '<td>' + c.fecha + '</td>'
    + '<td>' + c.cobertura + '</td>'
    + '<td>' + c.admin + '</td>'
    + '<td>' + c.iva + '</td>'
    + '<td><strong>' + c.total + '</strong></td>'
    + '<td>' + estadoBadge + '</td>'
    + '<td><div class="td-actions">'
      + btnPrincipal
      + '<div style="position:relative">'
        + '<button class="btn-dots" onclick="toggleDotsMenu(\'' + dotsPrefix + c.id + '\',event)">···</button>'
        + '<div class="dots-menu" id="' + dotsPrefix + c.id + '">' + dotsItems + '</div>'
      + '</div>'
    + '</div></td>';
  return tr;
}

function abrirSubirSoporte(id, modo) {
  rowSubirId  = id;
  rowSubirContexto = 'cargue';
  modoSoporte = modo || 'nuevo';
  var titulo = modoSoporte === 'cambiar' ? 'Cambiar soporte de pago' : 'Soportes de pago';
  document.getElementById('modal-subir-titulo').textContent = titulo;
  soportesCargados[1] = false;
  soportesCargados[2] = false;
  ['1','2'].forEach(function(n) {
    document.getElementById('nombre-soporte-' + n).textContent = 'Haz clic para subir';
    var slot = document.getElementById('upload-slot-' + n);
    slot.classList.remove('has-file');
    slot.querySelector('.material-icons').textContent = n === '1' ? 'cloud_upload' : 'add_circle_outline';
  });
  abrirModal('modal-subir');
}

function handleSoporteFile(n, input) {
  if (input.files && input.files[0]) {
    soportesCargados[n] = true;
    var slot = document.getElementById('upload-slot-' + n);
    slot.classList.add('has-file');
    slot.querySelector('.material-icons').textContent = 'check_circle';
    document.getElementById('nombre-soporte-' + n).textContent = input.files[0].name;
  }
}

function abrirSubirSoporteReclamo(id) {
  rowSubirId = id;
  rowSubirContexto = 'reclamo';
  document.getElementById('modal-subir-titulo').textContent = 'Soporte de pago del reclamo';
  soportesCargados[1] = false;
  soportesCargados[2] = false;
  ['1','2'].forEach(function(n) {
    document.getElementById('nombre-soporte-' + n).textContent = 'Haz clic para subir';
    var slot = document.getElementById('upload-slot-' + n);
    slot.classList.remove('has-file');
    slot.querySelector('.material-icons').textContent = n === '1' ? 'cloud_upload' : 'add_circle_outline';
  });
  abrirModal('modal-subir');
}

function cargarPago() {
  if (!soportesCargados[1]) { showToast('Debes subir al menos el Soporte 1', 'error'); return; }

  if (rowSubirContexto === 'reclamo') {
    var r = reclamos.find(function(x) { return x.id === rowSubirId; });
    if (r) r.estado = 'Pago en proceso';
    cerrarModal('modal-subir');
    showToast('Soporte de pago cargado correctamente', 'success');
    navTo('confirmacion-reclamo');
    return;
  }

  var c = cargues.find(function(x) { return x.id === rowSubirId; });
  if (c) c.estado = 'Pago en revisión';
  cerrarModal('modal-subir');
  var msg = modoSoporte === 'cambiar' ? 'Soporte de pago actualizado' : 'Soporte de pago cargado correctamente';
  if (typeof renderTabla === 'function') renderTabla();
  if (typeof renderTablaCargues2 === 'function') renderTablaCargues2();
  showToast(msg, 'success');
}

function descargarGarantias(id) {
  closeMenus();
  showToast('Descargando garantías del cargue #' + id + '...', 'info');
}

function solicitarEliminar(id) {
  eliminarId = id;
  document.getElementById('eliminar-id-txt').textContent = '#' + id;
  closeMenus();
  abrirModal('modal-eliminar');
}

function confirmarEliminar() {
  var idx = cargues.findIndex(function(x) { return x.id === eliminarId; });
  if (idx !== -1) cargues.splice(idx, 1);
  cerrarModal('modal-eliminar');
  if (typeof renderTabla === 'function') renderTabla();
  if (typeof renderTablaCargues2 === 'function') renderTablaCargues2();
  showToast('Cargue #' + eliminarId + ' eliminado correctamente', 'info');
}

/* ===== RECLAMO WIZARD ===== */
var pasoReclamoActual = 1;

function initReclamar() {
  pasoReclamoActual = 1;
  archivoReclamo = false;
  wizardReclamoSetPaso(1);
  var chk = document.getElementById('chk-r-compromiso');
  if (chk) chk.checked = false;
  var label = document.getElementById('label-r-compromiso');
  if (label) label.style.borderColor = 'var(--gray-200)';
  var btn = document.getElementById('btn-r-radicar');
  if (btn) { btn.disabled = true; btn.style.opacity = '0.4'; btn.style.cursor = 'not-allowed'; }
  var empty = document.getElementById('udz-r-empty');
  var sel   = document.getElementById('udz-r-selected');
  var zone  = document.getElementById('upload-zone-r');
  if (empty) empty.style.display = '';
  if (sel)   sel.style.display   = 'none';
  if (zone)  zone.classList.remove('has-file');
  var btnSig = document.getElementById('btn-r-siguiente');
  if (btnSig) btnSig.disabled = true;
  var tip = document.getElementById('btn-r-sig-tip');
  if (tip) tip.innerHTML = 'Selecciona un archivo .xlsx para continuar';
}

function wizardReclamoSetPaso(n) {
  pasoReclamoActual = n;
  ['paso-r-1', 'paso-r-2', 'paso-r-3', 'paso-r-loading'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  var target = document.getElementById('paso-r-' + n);
  if (target) target.style.display = 'block';

  for (var i = 1; i <= 3; i++) {
    var ws = document.getElementById('ws-r-' + i);
    if (!ws) continue;
    ws.classList.remove('active', 'done');
    if (i < n) ws.classList.add('done');
    else if (i === n) ws.classList.add('active');
  }
  for (var j = 1; j <= 2; j++) {
    var wl = document.getElementById('wl-r-' + j);
    if (wl) wl.classList.toggle('done', j < n);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarCargandoReclamo(titulo, sub, callback) {
  ['paso-r-1', 'paso-r-2', 'paso-r-3'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  var pl  = document.getElementById('paso-r-loading');
  var tEl = document.getElementById('r-loading-title');
  var sEl = document.getElementById('r-loading-sub');
  var bar = document.getElementById('r-loading-bar');
  if (!pl || !bar) { callback(); return; }
  if (tEl) tEl.textContent = titulo;
  if (sEl) sEl.textContent = sub;
  bar.style.transition = 'none';
  bar.style.width = '0%';
  pl.style.display = 'block';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      bar.style.transition = 'width 2.3s cubic-bezier(0.4, 0, 0.2, 1)';
      bar.style.width = '100%';
    });
  });
  setTimeout(callback, 2500);
}

function wizardReclamoSiguiente() {
  if (pasoReclamoActual === 1) {
    if (!archivoReclamo) { showToast('Selecciona un archivo .xlsx para continuar', 'warning'); return; }
    mostrarCargandoReclamo('Analizando archivo...', 'Verificando registros y formato del archivo', function() {
      showToast('Archivo analizado y validado correctamente', 'success');
      wizardReclamoSetPaso(2);
    });
  } else if (pasoReclamoActual === 2) {
    wizardReclamoSetPaso(3);
  }
}

function wizardReclamoAnterior() {
  if (pasoReclamoActual > 1) wizardReclamoSetPaso(pasoReclamoActual - 1);
}

function simularArchivoReclamo() {
  if (archivoReclamo) return;
  archivoReclamo = true;
  var empty = document.getElementById('udz-r-empty');
  var sel   = document.getElementById('udz-r-selected');
  var zone  = document.getElementById('upload-zone-r');
  var name  = document.getElementById('udz-r-file-name');
  if (empty) empty.style.display = 'none';
  if (sel)   sel.style.display   = 'flex';
  if (name)  name.textContent    = 'créditos_reclamo_abril2026.xlsx';
  if (zone)  zone.classList.add('has-file');
  var btn = document.getElementById('btn-r-siguiente');
  if (btn) btn.disabled = false;
  var tip = document.getElementById('btn-r-sig-tip');
  if (tip) tip.innerHTML = '';
}

function quitarArchivoReclamo() {
  archivoReclamo = false;
  var empty = document.getElementById('udz-r-empty');
  var sel   = document.getElementById('udz-r-selected');
  var zone  = document.getElementById('upload-zone-r');
  if (empty) empty.style.display = '';
  if (sel)   sel.style.display   = 'none';
  if (zone)  zone.classList.remove('has-file');
  var btn = document.getElementById('btn-r-siguiente');
  if (btn) btn.disabled = true;
  var tip = document.getElementById('btn-r-sig-tip');
  if (tip) tip.innerHTML = 'Selecciona un archivo .xlsx para continuar';
}

function toggleBtnRadicar() {
  var checked = document.getElementById('chk-r-compromiso').checked;
  var btn     = document.getElementById('btn-r-radicar');
  var label   = document.getElementById('label-r-compromiso');
  btn.disabled      = !checked;
  btn.style.opacity = checked ? '1' : '0.4';
  btn.style.cursor  = checked ? 'pointer' : 'not-allowed';
  if (label) label.style.borderColor = checked ? 'var(--black)' : 'var(--gray-200)';
}

function procesarReclamo() {
  var nuevoId = String(Number(reclamos[0].id) + 1).padStart(2, '0');
  reclamos.unshift({ id: nuevoId, fecha: 'Abril / 2026', parcial: 1, total: 1, valor: '$ 1.300.000', estado: 'Reclamo radicado' });
  initReclamar();
  navTo('confirmacion-reclamo');
}

function confirmarEliminarReclamo() {
  var idx = reclamos.findIndex(function(x) { return x.id === eliminarId; });
  if (idx !== -1) reclamos.splice(idx, 1);
  cerrarModal('modal-eliminar-reclamo');
  if (typeof renderReclamos === 'function') renderReclamos();
  if (typeof renderTablaReclamos2 === 'function') renderTablaReclamos2();
  showToast('Reclamo #' + eliminarId + ' eliminado', 'info');
}

function solicitarEliminarReclamo(id) {
  eliminarId = id;
  var el = document.getElementById('eliminar-reclamo-id-txt');
  if (el) el.textContent = '#' + id;
  closeMenus();
  abrirModal('modal-eliminar-reclamo');
}

function descargarReclamo(id) {
  closeMenus();
  showToast('Descargando reclamo #' + id + '...', 'info');
}

function finalizarReclamo() {
  cerrarModal('modal-exito-reclamo');
  navTo('reclamos');
}
