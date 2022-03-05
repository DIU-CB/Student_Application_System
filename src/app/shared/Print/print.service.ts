export class PrintService{
    constructor(){}
    printDiv(divID) {
        //Get the HTML of div
        var divElements = document.getElementById(divID).innerHTML;
        //Get the HTML of whole page
        var oldPage = document.body.innerHTML;

        //Reset the page's HTML with div's HTML only
        document.body.innerHTML = 
          "<html><head><title></title></head><body>" + 
          divElements + "</body></html>";

        //Print Page
        window.print();

        //Restore orignal HTML
        document.body.innerHTML = oldPage;

      
    }

    printElem(divId) {
        var content = document.getElementById(divId).innerHTML;
        var mywindow = window.open('', 'Print', 'height=600,width=800');
        mywindow.document.write(`<html>
            <head>
            <title>Print</title>
            <style>
                .table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .table, .table th, .table td {
                    border: 1px solid lightslategray;
                }
                
                .table th, .table td {
                    padding: 5px;
                    text-align: center;
                }
                .bottom-border-none{
                    border-bottom: none !important;
                }
                
                .top-border-none{
                    border-top: none !important;
                }
            </style>
            </head>
            <body>
            ${content}
            </body>
        `);
        
        // mywindow.document.write('</head><body >');
        // mywindow.document.write(content);
        // mywindow.document.write('</body></html>');
    
        mywindow.document.close();
        mywindow.focus();
        mywindow.print();
        mywindow.close();
        return true;
    }
}