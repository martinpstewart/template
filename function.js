window.function = function (html) {
	// FIDELITY MAPPING
	const fidelityMap = {
		low: 1,
		standard: 1.5,
		high: 2,
	};

	// DYNAMIC VALUES
	html = html.value ?? "No HTML set.";
	

	const customCSS = `
	body {
	  margin: 0!important
	}
  
	button#download {
	  position: fixed;
	  border-radius: 0.5rem;
	  font-size: 14px;
	  font-weight: 600;
	  line-height: 1.5rem;
	  color: #0d0d0d;
	  border: none;
	  font-family: 'Inter';
	  padding: 0px 12px;
	  height: 32px;
	  background: #ffffff;
	  top: 8px;
	  right: 8px;
	  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 1px 2.5px rgba(0, 0, 0, 0.1);
	  cursor: pointer;
	}
  
	button#download:hover {
	  background: #f5f5f5;
	  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06), 0 6px 12px -3px rgba(0, 0, 0, 0.1);
	}
  
	button#download.downloading {
	  color: #ea580c;
	}
  
	button#download.done {
	  color: #16a34a;
	}
  
	::-webkit-scrollbar {
	  width: 5px;
	  background-color: rgb(0 0 0 / 8%);
	}
  
	::-webkit-scrollbar-thumb {
	  background-color: rgb(0 0 0 / 32%);
	  border-radius: 4px;
	}
	`;

	// HTML THAT IS RETURNED AS A RENDERABLE URL
	const originalHTML = `
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
	  <style>${customCSS}</style>
	  <div class="main">
	  <div class="header">
		<button class="button" id="download">Download</button>
	  </div>
	  <div id="content">${html}</div>
	  </div>
	  <script>
	  document.getElementById('download').addEventListener('click', function() {
		var element = document.getElementById('content');
		var button = this;
		button.innerText = 'Downloading...';
		button.className = 'downloading';
  
		var opt = {
		pagebreak: { mode: ['css'], before: ${JSON.stringify(breakBefore)}, after: ${JSON.stringify(breakAfter)}, avoid: ${JSON.stringify(breakAvoid)} },
		margin: ${margin},
		filename: '${fileName}',
		html2canvas: {
		  useCORS: true,
		  scale: ${quality}
		},
		jsPDF: {
		  unit: 'px',
		  orientation: '${orientation}',
		  format: [${finalDimensions}],
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
	  `;
	var encodedHtml = encodeURIComponent(originalHTML);
	return "data:text/html;charset=utf-8," + encodedHtml;
};
