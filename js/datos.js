/* ===== DATOS COMPARTIDOS ===== */

// Cargues
const cargues = [
  { id: '08', fecha: 'Abril / 2026',    cobertura: '$138.500', admin: '$25.900', iva: '$16.620', total: '$155.120', estado: 'Cargue completado' },
  { id: '07', fecha: 'Marzo / 2026',    cobertura: '$25.000',  admin: '$4.000',  iva: '$2.000',  total: '$31.000',  estado: 'Cargue completado' },
  { id: '06', fecha: 'Febrero / 2026',  cobertura: '$200.000', admin: '$8.000',  iva: '$4.000',  total: '$211.000', estado: 'Cargue completado' },
];

// Reclamos
const reclamos = [
  { id: '14', fecha: 'Mayo / 2026',      registros: 3, valor: '$2.100.000', estado: 'En revisión',  documentacion: 'Pendiente'       },
  { id: '13', fecha: 'Abril / 2026',     registros: 5, valor: '$3.200.000', estado: 'En proceso',   documentacion: 'Faltan soportes' },
  { id: '12', fecha: 'Marzo / 2026',     registros: 2, valor: '$1.500.000', estado: 'En proceso',   documentacion: 'Recibida'        },
  { id: '11', fecha: 'Febrero / 2026',   registros: 4, valor: '$800.000',   estado: 'Pagado',       documentacion: 'Recibida'        },
  { id: '10', fecha: 'Enero / 2026',     registros: 6, valor: '$4.500.000', estado: 'Pagado',       documentacion: 'No requiere'     },
  { id: '09', fecha: 'Diciembre / 2025', registros: 1, valor: '$500.000',   estado: 'Pagado',       documentacion: 'Recibida'        },
];

const DOCS_LISTA = [
  'Fotocopia de cédula del deudor',
  'Copia de carta de instrucciones',
  'Estado de cuenta',
  'Cert. de reporte a centrales de riesgo',
  'Copia de pagaré',
  'Formato de aceptación de fianza',
  'Formato de endoso'
];

const reclamosDetalle = {
  '14': [
    { nombre: 'Carlos Ruiz Mendoza',      cedula: '1098765432', pagare: 'PG-2210', docEstado: 'Pendiente',           docs: ['pendiente','pendiente','pendiente','pendiente','pendiente','pendiente','pendiente'] },
    { nombre: 'Luisa Fernanda Ospina',    cedula: '1087654321', pagare: 'PG-2211', docEstado: 'Con observaciones',   docs: ['recibido','observacion','recibido','pendiente','recibido','observacion','pendiente'] },
    { nombre: 'Mario Alberto Vásquez',    cedula: '1076543210', pagare: 'PG-2212', docEstado: 'Pendiente',           docs: ['pendiente','pendiente','pendiente','pendiente','pendiente','pendiente','pendiente'] },
  ],
  '13': [
    { nombre: 'Ana María López Torres',   cedula: '1065432109', pagare: 'PG-2205', docEstado: 'Con observaciones',   docs: ['recibido','observacion','recibido','observacion','recibido','pendiente','recibido'] },
    { nombre: 'Héctor Javier Reyes',      cedula: '1054321098', pagare: 'PG-2206', docEstado: 'Pendiente',           docs: ['pendiente','pendiente','pendiente','pendiente','pendiente','pendiente','pendiente'] },
    { nombre: 'Sandra Milena Cárdenas',   cedula: '1043210987', pagare: 'PG-2207', docEstado: 'Pendiente',           docs: ['pendiente','pendiente','pendiente','pendiente','pendiente','pendiente','pendiente'] },
    { nombre: 'Rodrigo Andrés Morales',   cedula: '1032109876', pagare: 'PG-2208', docEstado: 'Con observaciones',   docs: ['recibido','recibido','observacion','recibido','pendiente','observacion','recibido'] },
    { nombre: 'Patricia Isabel Gómez',    cedula: '1021098765', pagare: 'PG-2209', docEstado: 'Pendiente',           docs: ['pendiente','pendiente','pendiente','pendiente','pendiente','pendiente','pendiente'] },
  ],
  '12': [
    { nombre: 'Juan Pablo Herrera Quintero', cedula: '1034567892', pagare: 'PG-2190', docEstado: 'Recibido y verificado', docs: ['recibido','recibido','recibido','recibido','recibido','recibido','recibido'] },
    { nombre: 'Valentina Castro Moreno',     cedula: '1056789012', pagare: 'PG-2191', docEstado: 'Recibido y verificado', docs: ['recibido','recibido','recibido','recibido','recibido','recibido','recibido'] },
  ],
  '11': [
    { nombre: 'Roberto Carlos Peña',    cedula: '1023456789', pagare: 'PG-2180', docEstado: 'Recibido y verificado', docs: ['recibido','recibido','recibido','recibido','recibido','recibido','recibido'] },
    { nombre: 'Gloria Inés Ramírez',    cedula: '1034567890', pagare: 'PG-2181', docEstado: 'Recibido y verificado', docs: ['recibido','recibido','recibido','recibido','recibido','recibido','recibido'] },
    { nombre: 'Felipe Andrés Torres',   cedula: '1045678901', pagare: 'PG-2182', docEstado: 'Recibido y verificado', docs: ['recibido','recibido','recibido','recibido','recibido','recibido','recibido'] },
    { nombre: 'María del Carmen Silva', cedula: '1056789012', pagare: 'PG-2183', docEstado: 'Recibido y verificado', docs: ['recibido','recibido','recibido','recibido','recibido','recibido','recibido'] },
  ],
  '10': [
    { nombre: 'Andrés Felipe Martínez', cedula: '1078901234', pagare: 'PG-2170', docEstado: 'Recibido y verificado', docs: ['recibido','recibido','recibido','recibido','recibido','recibido','recibido'] },
    { nombre: 'Claudia Patricia Niño',  cedula: '1089012345', pagare: 'PG-2171', docEstado: 'Recibido y verificado', docs: ['recibido','recibido','recibido','recibido','recibido','recibido','recibido'] },
    { nombre: 'Jairo Augusto Díaz',     cedula: '1090123456', pagare: 'PG-2172', docEstado: 'Recibido y verificado', docs: ['recibido','recibido','recibido','recibido','recibido','recibido','recibido'] },
    { nombre: 'Marta Cecilia Vargas',   cedula: '1123456789', pagare: 'PG-2175', docEstado: 'Recibido y verificado', docs: ['recibido','recibido','recibido','recibido','recibido','recibido','recibido'] },
  ],
  '09': [
    { nombre: 'Diego Alejandro Ruiz',   cedula: '1145678901', pagare: 'PG-2160', docEstado: 'Recibido y verificado', docs: ['recibido','recibido','recibido','recibido','recibido','recibido','recibido'] },
  ],
};

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
