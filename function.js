window.function = function (name, image, address, email, client, clientaddress, clientemail, invoiceno, date, paydate, items, total) {
    // FIDELITY MAPPING
    const fidelityMap = {
        low: 1,
        standard: 1.5,
        high: 2,
    };

    // DYNAMIC VALUES
    image = image.value ?? "";
    name = name.value ?? "";
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
    <table>
        <tr>
            <td style="vertical-align: top;">
                <table>
                    <tr>
                        <td class="title" style="border: 1px solid black;">
                            <img src="${image}" style="width: 100%; max-width: 300px"/>
                        </td>
                        <td style="border: 1px solid black;">
             
                            <b>Company Name:</b><br/>
                            ${name}<br/>
                            ${address}<br/>
                            ${email}
                        </td>
                    </tr>
                </table>
            </td>
            <td style="vertical-align: top;">
                <table>
                    <tr class="information">
                        <td colspan="2" style="border: 1px solid black;">
                            <b>Invoice Details:</b><br/>
                            Client:${client}<br/>
                            Address: ${clientaddress}<br/>
                            Email: ${clientemail}<br/>
                            Invoice #: ${invoiceno}<br/>
                            Created: ${date}<br/>
                            Due: ${paydate}
                        </td>
                    </tr>
                    </table>
                    <tr> 
                      <td colspan="2" style="border: 1px solid black;">
                      <div style="margin: 0 auto; text-align: right;">
                            <center><table>
                                ${items}
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
        <table>
            <td colspan="2" style="margin: 100 auto; border: 1px solid black; text-align: right;">
               <b> Total: ${total}
           </b> </td>
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
