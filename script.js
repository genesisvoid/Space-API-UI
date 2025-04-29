async function fetchData() {
    document.getElementById('result').innerHTML = "<p style='color:cyan;'>🚀 Searching for space data...</p>";
    
    const apiKey = "YvFfRYVJJTPDKd5vi5xEru2vvndoZ90zej17bI6jx";  
    const query = document.getElementById('searchQuery').value.toLowerCase().trim();  

    let url;
    
    // Custom search logic for planets
    if (query.includes("mars")) {
        url = `https://images-api.nasa.gov/search?q=mars`;
    } else if (query.includes("earth")) {
        url = `https://images-api.nasa.gov/search?q=earth`;
    } else {
        url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Correcting response handling for custom searches
        if (query.includes("mars") || query.includes("earth")) {
            document.getElementById('result').innerHTML = `
                <h2>${data.collection.items[0].data[0].title}</h2>
                <img src="${data.collection.items[0].links[0].href}" alt="NASA Image">
                <p>${data.collection.items[0].data[0].description}</p>
            `;
        } else {
            document.getElementById('result').innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="NASA Image">
                <p>${data.explanation}</p>
            `;
        }

    } catch (error) {
        document.getElementById('result').innerHTML = "<p>Error fetching space data. Please try again!</p>";
        console.error("Error:", error);
    }
}
