window.function = function (name, image, address, email, client, clientaddress, clientemail, invoiceno, date, paydate, items, total) {
    // FIDELITY MAPPING
    const fidelityMap = {
        low: 1,
        standard: 1.5,
        high: 2,
    };

    // DYNAMIC VALUES
    name = name.value ?? "";
    image = image.value ?? "";
    address = address.value ?? "";
    email = email.value ?? "";
    client = client.value ?? "";
    clientaddress = clientaddress.value ?? "";
    clientemail = clientemail.value ?? "";
    invoiceno = invoiceno.value ?? "";
    date = date.value ?? "";
    paydate = paydate.value ?? "";
    items = items.value ?? "";
    total = total.value ?? "";


    // HTML TABLE TEMPLATE
const tableHTML = `
    <!DOCTYPE html>
<html>
<head>
<style>
    table {
        border: none; /* Remove default border */
        border-collapse: collapse;
        width: auto; /* Set width to auto to fit content */
        position: center;
    }

    table th, table td {
        border: 1px solid #b3adad; /* Add border to cells */
        padding: 5px;
        text-align: center;
        background: #ffffff;
        color: #000000;
    }

    table th {
        background: #f0f0f0;
    }

    .image-container {
        position: auto;
        top: 30px;
        left: 30px;
    }

    .table-container {
        position: fixed;
        top: 30px;
        right: 30px;
    }

</style>
</head>
<body>

<div class="image-container">
    <img src="${image}" width="332" height="202">
</div>

<div class="table-container">
    <table>
        <tr class="information">
            <td colspan="3" style="border: 1px solid black;">
                <b>Invoice Details:</b><br/>
                Client: ${client}<br/>
                Address: ${clientaddress}<br/>
                Email: ${clientemail}<br/>
                Invoice #: ${invoiceno}<br/>
                Created: ${date}<br/>
                Due: ${paydate}
            </td>
        </tr>
    </table>
</div>
<table>
<td style="border: none; text-align: left;padding-left: 10px;">
${name}<br/>
${address}<br/>
${email}<br/>
</table>
<center>
<p>
<table>
    <thead>
        <tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Unit Cost</th>
            <th>Quantity</th>
            <th>Line Total</th>
        </tr>
    </thead>
    <tbody>
       ${items}
    </tbody>
</table>
 </center>
   <center>
<table>
    <tr>
        <td style="border: none; text-align: center;padding: 10px;">
            <td>Total: ${total}</td>
        </td>
    </tr>
</table>`;


    // CUSTOM CSS
    const customCSS = `
        body {
            margin: 0!important;
        }
        /* CSS Styles for the download button and scrollbar */
    `;

    // FINAL HTML
    const originalHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice</title>
            <style>${customCSS}</style>
        </head>
        <body>
            <div class="main">
                <div class="header">
                    <div id="content">${tableHTML}</div>
                </div>
                <button id="download">Download</button>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
            <script>
                document.getElementById('download').addEventListener('click', function() {
                    var element = document.getElementById('content');
                    var button = this;
                    button.innerText = 'Downloading...';
                    button.className = 'downloading';
                    var opt = {
                        html2canvas: {
                            useCORS: true,
                        },
                        jsPDF: {
                            unit: 'px',
                            hotfixes: ['px_scaling']
                        }
                    };
                    html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
                        button.innerText = 'Done 🎉';
                        button.className = 'done';
                        setTimeout(function() { 
                            button.innerText = 'Download';
                            button.className = ''; 
                        }, 2000);
                    }).save();
                });
            </script>
        </body>
        </html>`;

    var encodedHtml = encodeURIComponent(originalHTML);
    return "data:text/html;charset=utf-8," + encodedHtml;
};
