<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Function Details</title>
</head>
<body>
    <div id="function-details"></div>

    <script>
        // Your JSON data
        var jsonData = [
            {
                "kind": "column",
                "name": "Invoice Builder",
                "description": "Allows you to Build a template invoice",
                "author": "Mart",
                "params": [
                    {
                        "name": "name",
                        "displayName": "Name",
                        "type": "string"
                    }
                ],
                "result": {
                    "type": "string"
                }
            }
        ];

        // Function to render function details
        function renderFunctionDetails(data) {
            var functionDetailsDiv = document.getElementById('function-details');
            var html = '<h2>' + data[0].name + '</h2>';
            html += '<p><strong>Description:</strong> ' + data[0].description + '</p>';
            html += '<p><strong>Author:</strong> ' + data[0].author + '</p>';
            html += '<h3>Parameters:</h3>';
            html += '<ul>';
            data[0].params.forEach(function(param) {
                html += '<li><strong>' + param.displayName + ':</strong> ' + param.type + '</li>';
            });
            html += '</ul>';
            html += '<p><strong>Result Type:</strong> ' + data[0].result.type + '</p>';
            functionDetailsDiv.innerHTML = html;
        }

        // Render function details
        renderFunctionDetails(jsonData);
    </script>
</body>
</html>
