async function fetchData() {
    const apiKey = "vFfRYVJJTPDKd5vi5xEru2vvndoZ90zej17bI6jx";  // Replace this with your actual key
    const query = document.getElementById('searchQuery').value;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('result').innerHTML = `
            <h2>${data.title}</h2>
            <img src="${data.url}" alt="NASA Image">
            <p>${data.explanation}</p>
        `;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
 
