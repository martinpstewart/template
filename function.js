window.onload = function() {
    fetch('glide.json')
        .then(response => response.json())
        .then(data => {
            // Assuming the data is an array of objects
            const template = data.map(item => `<p>Name: ${item.name}, Age: ${item.age}</p>`).join('');
            document.getElementById('dataContainer').innerHTML = template;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};
