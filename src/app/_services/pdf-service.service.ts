import { Injectable } from '@angular/core';

import { jsPDF } from "jspdf";

import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor() { }

  downloadAsPDF() {     
    var doc = new jsPDF({orientation: "portrait" }); 
    var finalY =  10
    doc.text('Capacity Planning History', 14, finalY + 15)
    autoTable(doc, { 
      startY: finalY + 20,
      html: '#ActivityTable',headStyles:{fillColor:[215, 208, 230],textColor:[102, 102, 102]}})   
    // doc.autoTable({
    //   head: [['Acitity Name', 'Task Type', 'Justification','Requirements','Calendar Year','Status']],
    //   body: [
    //     ['David', 'david@example.com', 'Sweden'],
    //     ['Castille', 'castille@example.com', 'Spain'],
    //   ],
    // });
    doc.save('capacityplanninghistory.pdf');
    
  }
}
