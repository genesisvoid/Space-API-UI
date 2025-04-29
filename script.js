// 🚀 Space API Explorer - JavaScript

// Scroll to Explore Section
function scrollToExplore() {
    document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
}

// Fetch Space Data from NASA API
async function fetchData(query = null) {
    document.getElementById('result').innerHTML = "<p style='color:cyan;'>🚀 Searching for space data...</p>";

    const apiKey = "vFfRYVJJTPDKd5vi5xEru2vvndoZ90zej17bI6jx";
    const userQuery = query || document.getElementById('searchQuery').value.toLowerCase().trim();
    let url;

    if (userQuery.includes("mars")) {
        url = `https://images-api.nasa.gov/search?q=mars`;
    } else if (userQuery.includes("jupiter")) {
        url = `https://images-api.nasa.gov/search?q=jupiter`;
    } else if (userQuery.includes("andromeda")) {
        url = `https://images-api.nasa.gov/search?q=andromeda`;
    } else {
        url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        document.getElementById('result').innerHTML = `
            <h2>${data.collection.items[0].data[0].title}</h2>
            <img src="${data.collection.items[0].links[0].href}" alt="NASA Image">
            <p>${data.collection.items[0].data[0].description}</p>
        `;
    } catch (error) {
        document.getElementById('result').innerHTML = "<p>Error fetching space data. Please try again!</p>";
    }
}
