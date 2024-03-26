// driver.js

// Function to fetch data from glide.json and populate the HTML template
async function fetchDataAndPopulateTemplate() {
    try {
        // Fetch data from glide.json
        const response = await fetch('glide.json');
        const data = await response.json();

        // Extract the name from the data
        const functionName = data[0].name;

        // Post message to function.js window with the name data
        window.parent.postMessage({ name: functionName }, '*');
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

// Call the function to fetch data and populate the template
fetchDataAndPopulateTemplate();
