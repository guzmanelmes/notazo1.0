// ============================================
// Exportación de historial a PDF (jsPDF)
// ============================================

import { jsPDF } from 'jspdf'
import type { HistoryEntry } from '@/types'
import { formatDate } from './utils'

export function exportarHistorialPDF(entries: HistoryEntry[]): void {
  if (entries.length === 0) {
    alert('No hay registros para exportar.')
    return
  }

  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 15
  let y = 20

  // Cabecera
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(37, 99, 235)
  doc.text('Notazo - Historial', margin, y)
  y += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text('Calcula tus notas, proyecta tu futuro.', margin, y)
  y += 5

  doc.setDrawColor(220)
  doc.line(margin, y, pageWidth - margin, y)
  y += 8

  // Entradas
  entries.forEach((entry, index) => {
    // Salto de página
    if (y > 260) {
      doc.addPage()
      y = 20
    }

    // Título de la entrada
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(30)
    doc.text(`${index + 1}. ${entry.titulo}`, margin, y)
    y += 6

    // Fecha
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(120)
    doc.text(`Fecha: ${formatDate(entry.fecha)}`, margin, y)
    y += 5

    // Resumen
    doc.setFontSize(10)
    doc.setTextColor(50)
    const resumenLines = doc.splitTextToSize(entry.resumen, pageWidth - margin * 2)
    doc.text(resumenLines, margin, y)
    y += resumenLines.length * 5 + 2

    // Promedio si existe
    if (entry.promedio !== undefined) {
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(37, 99, 235)
      doc.text(`Promedio: ${entry.promedio.toFixed(2)}`, margin, y)
      y += 6
    }

    // Detalle (JSON formateado)
    const detalleKeys = Object.keys(entry.datos)
    if (detalleKeys.length > 0) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(80)
      detalleKeys.forEach((k) => {
        if (y > 270) {
          doc.addPage()
          y = 20
        }
        const val = String(entry.datos[k])
        const line = `• ${k}: ${val}`
        const lines = doc.splitTextToSize(line, pageWidth - margin * 2)
        doc.text(lines, margin, y)
        y += lines.length * 4 + 1
      })
    }

    y += 4
    doc.setDrawColor(230)
    doc.line(margin, y, pageWidth - margin, y)
    y += 8
  })

  // Footer en última página
  doc.setFontSize(8)
  doc.setTextColor(150)
  doc.text(
    `Generado por Notazo • ${new Date().toLocaleString('es-CL')} • notazo.cl`,
    margin,
    285
  )

  // Descargar
  const filename = `notazo-historial-${new Date().toISOString().slice(0, 10)}.pdf`
  doc.save(filename)
}
