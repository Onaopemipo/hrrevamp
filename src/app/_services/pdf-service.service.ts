import { Injectable } from '@angular/core';

import { jsPDF } from "jspdf";

import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor() { }
  printAsPDF(theader, tbody, fileNane) {
    console.log(theader,tbody)
    var doc = new jsPDF({ orientation: "portrait" });
    doc.addImage("assets/icons/smartaceLogo.png", "PNG", 140, 5, 40, 5);
    var finalY =  10
    doc.text(fileNane, 14, finalY + 15)
    autoTable(doc, {
      startY: finalY + 20,
      tableWidth: "auto",
      theme: "striped",
      headStyles: {fillColor:"#4847E0",textColor:"#fff"},
      head: [theader[0]],
      body: tbody
    });
  
    doc.autoPrint();
    // const blob = doc.output("bloburl");
    // window.open(blob.toString(),'self');

    const hiddFrame = document.createElement('iframe');
hiddFrame.style.position = 'fixed';
// "visibility: hidden" would trigger safety rules in some browsers like safari，
// in which the iframe display in a pretty small size instead of hidden.
// here is some little hack ~
hiddFrame.style.width = '1px';
hiddFrame.style.height = '1px';
hiddFrame.style.opacity = '0.01';
const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
if (isSafari) {
  // fallback in safari
  hiddFrame.onload = () => {
    try {
      hiddFrame.contentWindow.document.execCommand('print', false, null);
    } catch (e) {
      hiddFrame.contentWindow.print();
    }
  };
}
hiddFrame.src = doc.output('bloburl').toString();
document.body.appendChild(hiddFrame);
    
  }
  downloadAsPDF(theader, tbody, fileNane) {
  console.log(theader,tbody)
    var doc = new jsPDF({ orientation: "portrait" });
    doc.addImage("assets/icons/smartaceLogo.png", "PNG", 140, 5, 40, 5);
    var finalY =  10
    doc.text(fileNane, 14, finalY + 15)
    autoTable(doc, {
      startY: finalY + 20,
      tableWidth: "auto",
      theme: "striped",
      headStyles: {fillColor:"#4847E0",textColor:"#fff"},
      head: [theader[0]],
      body: tbody
    });
   doc.save(fileNane+'.pdf');
  
  }
}
