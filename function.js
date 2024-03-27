window.function = function (name, image) {
    // FIDELITY MAPPING
    const fidelityMap = {
        low: 1,
        standard: 1.5,
        high: 2,
    };

    // DYNAMIC VALUES
    name = name.value ?? "No HTML set.";
    image = image.value ?? "No Image";

    // HTML TABLE TEMPLATE
    const tableHTML = `
        <table>
            <tr>
                <td class="title">
                    <img src="${image}" style="width: 100%; max-width: 300px"/>
                </td>
                <td>
                    Invoice #: 123<br/>
                    Created: January 1, 2023<br/>
                    Due: February 1, 2023
                </td>
            </tr>
        </table>

        <tr class="information">
            <td colspan="2">
                <table>
                    <tr>
                        <td>
                            ${name}<br/>
                            12345 Sunny Road<br/>
                            Sunnyville, CA 12345
                        </td>
                        <td>
                            Acme Corp.<br/>
                            John Doe<br/>
                            john@example.com
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Other table rows -->

        <tr class="total">
            <td></td>
            <td>Total: $385.00</td>
        </tr>
    </table>`;

    // CUSTOM CSS
    const customCSS = `
        body {
            margin: 0!important
        }
        /* CSS Styles for the download button and scrollbar */

    `;

    // FINAL HTML
    const originalHTML = `
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
        <style>${customCSS}</style>
        <div class="main">
            <div class="header">
                <div id="content">${tableHTML}</div>
            </div>
            <button id="download">Download</button>
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
        </div>`;

    var encodedHtml = encodeURIComponent(originalHTML);
    return "data:text/html;charset=utf-8," + encodedHtml;
};
