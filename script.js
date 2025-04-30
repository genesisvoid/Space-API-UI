// NASA API Key
const NASA_API_KEY = 'vFfRYVJJTPDKd5vi5xEru2vvndoZ90zej17bI6jx';
const NASA_APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${vFfRYVJJTPDKd5vi5xEru2vvndoZ90zej17bI6jx}`;
const backgroundContainer = document.getElementById('background-container');

// Function to fetch and apply background image
async function applyBackground() {
    try {
        const response = await fetch(NASA_APOD_URL);
        const data = await response.json();

        // Ensure the media type is an image
        if (data.media_type === 'image') {
            backgroundContainer.style.backgroundImage = `url(${data.url})`;
        } else {
            console.error('NASA APOD returned non-image media type');
        }
    } catch (error) {
        console.error('Error fetching NASA APOD data:', error);
    }
}

// Fetch the initial background image
applyBackground();
