/* ===== DATOS COMPARTIDOS ===== */

// Cargues
const cargues = [
  { id: '08', fecha: 'Abril / 2026',    cobertura: '$138.500', admin: '$25.900', iva: '$16.620', total: '$155.120', estado: 'Cargado'  },
  { id: '07', fecha: 'Marzo / 2026',    cobertura: '$25.000',  admin: '$4.000', iva: '$2.000', total: '$31.000',  estado: 'Pagado'   },
  { id: '06', fecha: 'Febrero / 2026',  cobertura: '$200.000', admin: '$8.000', iva: '$4.000', total: '$211.000', estado: 'Aprobado' },
];

// Reclamos
const reclamos = [
  { id: '11', fecha: 'Abril / 2026',  parcial: 1, total: 1, valor: '$1.500.000', estado: 'Solicitado' },
  { id: '10', fecha: 'Marzo / 2026',  parcial: 4, total: 2, valor: '$800.000',   estado: 'En proceso' },
  { id: '09', fecha: 'Enero / 2026',  parcial: 1, total: 1, valor: '$500.000',   estado: 'Reclamado'  },
];

// Estado global para filtros
let filtroActivo = 'Todo';
let filtroReclamos = 'Todo';
let rowSubirId = null;
let eliminarId = null;
let modoSoporte = 'nuevo';
let archivoSimulado = false;
let archivoReclamo = false;
