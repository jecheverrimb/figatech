/* ===== DATOS COMPARTIDOS ===== */

// Cargues
const cargues = [
  { id: '08', fecha: 'Abril / 2026',    cobertura: '$138.500', admin: '$25.900', iva: '$16.620', total: '$155.120', estado: 'Cargue completado' },
  { id: '07', fecha: 'Marzo / 2026',    cobertura: '$25.000',  admin: '$4.000',  iva: '$2.000',  total: '$31.000',  estado: 'Cargue completado' },
  { id: '06', fecha: 'Febrero / 2026',  cobertura: '$200.000', admin: '$8.000',  iva: '$4.000',  total: '$211.000', estado: 'Cargue completado' },
];

// Reclamos
const reclamos = [
  { id: '11', fecha: 'Abril / 2026',  parcial: 1, total: 1, valor: '$1.500.000', estado: 'Reclamo pagado' },
  { id: '10', fecha: 'Marzo / 2026',  parcial: 4, total: 2, valor: '$800.000',   estado: 'Reclamo pagado' },
  { id: '09', fecha: 'Enero / 2026',  parcial: 1, total: 1, valor: '$500.000',   estado: 'Reclamo pagado' },
];

// Titulares
const titulares = [
  // --- CASOS DE PRUEBA (buscar con 1, 2, 3 ó 4) ---
  {
    nombre: 'María Fernanda Gómez Rodríguez',
    tipoDoc: 'Cédula de Ciudadanía',
    numDoc: '1',
    telefono: '+57 310 048 690',
    correo: 'maria.rodriguez@correo.com',
    direccion: 'Avenida 6N # 28-90',
    ciudad: 'Bogotá D.C.',
    valorDesembolsado: 2500000,
    fechaDesembolso: '2025-07-10',
    comisionPagada: 62500,
    cargueId: 'GR-490',
    cargueFecha: '2025-07-10',
    numPagare: 'PAG-2025-0041',
    reclamos: [],
    documentos: null
  },
  {
    nombre: 'Carlos Eduardo Ramírez Vargas',
    tipoDoc: 'Cédula de Ciudadanía',
    numDoc: '2',
    telefono: '+57 315 234 5678',
    correo: 'cramirez@correo.com',
    direccion: 'Calle 72 # 15-30, Apto 402',
    ciudad: 'Medellín',
    valorDesembolsado: 3200000,
    fechaDesembolso: '2025-07-10',
    comisionPagada: 80000,
    cargueId: 'GR-490',
    cargueFecha: '2025-07-10',
    numPagare: 'PAG-2025-0042',
    reclamos: [
      { reclamoId: 'R-105', valor: 1600000, tipo: 'Parcial', estado: 'Reclamo radicado' }
    ],
    documentos: null
  },
  {
    nombre: 'Ana Lucía Pérez Montoya',
    tipoDoc: 'Cédula de Ciudadanía',
    numDoc: '3',
    telefono: '+57 301 567 8901',
    correo: 'aperez@correo.com',
    direccion: 'Carrera 43A # 10-55',
    ciudad: 'Cali',
    valorDesembolsado: 4800000,
    fechaDesembolso: '2025-07-10',
    comisionPagada: 120000,
    cargueId: 'GR-490',
    cargueFecha: '2025-07-10',
    numPagare: 'PAG-2025-0043',
    reclamos: [
      { reclamoId: 'R-106', valor: 4800000, tipo: 'Total', estado: 'Reclamo radicado', fecha: 'Agosto / 2025' }
    ],
    documentos: 'pendiente'
  },
  {
    nombre: 'Roberto Esteban Díaz Herrera',
    tipoDoc: 'Cédula de Ciudadanía',
    numDoc: '4',
    telefono: '+57 312 890 1234',
    correo: 'rdiaz@correo.com',
    direccion: 'Transversal 22 # 5-80',
    ciudad: 'Barranquilla',
    valorDesembolsado: 1900000,
    fechaDesembolso: '2025-07-10',
    comisionPagada: 47500,
    cargueId: 'GR-490',
    cargueFecha: '2025-07-10',
    numPagare: 'PAG-2025-0044',
    reclamos: [
      { reclamoId: 'R-107', valor: 1900000, tipo: 'Total', estado: 'Reclamo radicado', fecha: 'Septiembre / 2025' }
    ],
    documentos: 'enviados'
  },
  // --- TITULARES GENERALES ---
  {
    nombre: 'Juan Pablo Herrera Quintero',
    tipoDoc: 'Cédula de ciudadanía',
    numDoc: '1034567892',
    telefono: '300 123 4567',
    correo: 'jpherrera@correo.com',
    direccion: 'Cra. 5 #23-45',
    ciudad: 'Cali',
    valorDesembolsado: 5000000,
    fechaDesembolso: 'Enero / 2026',
    comisionPagada: 138500,
    cargueId: '08',
    cargueFecha: 'Abril / 2026',
    numPagare: 'PAG-2026-0088',
    reclamos: [
      { reclamoId: '11', valor: 800000, tipo: 'Total', estado: 'Reclamo radicado', fecha: 'Abril / 2026' }
    ],
    documentos: null
  },
  {
    nombre: 'Valentina Castro Moreno',
    tipoDoc: 'Cédula de ciudadanía',
    numDoc: '1056789012',
    telefono: '315 678 9012',
    correo: 'vcastro@correo.com',
    direccion: 'Cll. 12 #78-90',
    ciudad: 'Medellín',
    valorDesembolsado: 3500000,
    fechaDesembolso: 'Febrero / 2026',
    comisionPagada: 25000,
    cargueId: '07',
    cargueFecha: 'Marzo / 2026',
    numPagare: 'PAG-2026-0071',
    reclamos: [
      { reclamoId: '11', valor: 500000, tipo: 'Parcial', estado: 'Reclamo radicado' }
    ],
    documentos: null
  },
  {
    nombre: 'Carlos Andrés Mejía Restrepo',
    tipoDoc: 'Cédula de ciudadanía',
    numDoc: '98765432',
    telefono: '312 789 0123',
    correo: 'camejia@correo.com',
    direccion: 'Av. El Dorado #68-52, Apto 301',
    ciudad: 'Bogotá',
    valorDesembolsado: 7200000,
    fechaDesembolso: 'Octubre / 2025',
    comisionPagada: 200000,
    cargueId: '06',
    cargueFecha: 'Febrero / 2026',
    numPagare: 'PAG-2026-0063',
    reclamos: [],
    documentos: null
  }
];

// Estado global para filtros
let filtroActivo = 'Todo';
let filtroReclamos = 'Todo';
let rowSubirId = null;
let rowSubirContexto = 'cargue';
let eliminarId = null;
let modoSoporte = 'nuevo';
let archivoSimulado = false;
let pasoActual = 1;
let archivoReclamo = false;
let soportesCargados = {1: false, 2: false};
