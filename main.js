const MEME_API_URL = "https://meme-api.com/gimme/catmemes";

const generateMemeBtn = document.querySelector(".generate-meme-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme-title");
const memeAuthor = document.querySelector(".meme-generator .meme-author");

const musicTracks = [
  {
    src: "./music/music1.mp3",
    name: "Music 1"
  },
  {
    src: "./music/music2.mp3",
    name: "Music 2"
  },
  {
    src: "./music/music3.mp3",
    name: "Music 3"
  },
  // Add more music tracks as needed
];

const audioElement = document.createElement("audio");
audioElement.autoplay = false; // Set autoplay to false initially

let isMusicPlaying = false; // Track if the music is currently playing
let currentTrackIndex = 0; // Track the current music track index

const updateDetails = (url, title, author) => {
  memeImage.setAttribute("src", url);
  memeTitle.textContent = title;
  memeAuthor.textContent = `Meme by: ${author}`;
};

const fetchMeme = async () => {
  try {
    const response = await fetch(MEME_API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const toggleMusic = () => {
    if (isMusicPlaying) {
      audioElement.pause(); // Pause the music
      playMusicBtn.textContent = "Play Music"; // Update button text to "Play Music"
    } else {
      audioElement.src = musicTracks[currentTrackIndex].src; // Set the source of the audio element to the current track
      audioElement.load(); // Load the new track
      audioElement.play(); // Play the music
      playMusicBtn.textContent = "Stop Music"; // Update button text to "Stop Music"
    }
  
    isMusicPlaying = !isMusicPlaying; // Toggle the state of isMusicPlaying
  };  

const changeTrack = () => {
  currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length; // Increment currentTrackIndex and loop back to the first track if necessary
  if (isMusicPlaying) {
    audioElement.src = musicTracks[currentTrackIndex].src; // Set the source of the audio element to the new track
    audioElement.play(); // Play the new track
  }
};

// Add event listener to the play music button
const playMusicBtn = document.querySelector(".play-music-btn");
playMusicBtn.addEventListener("click", toggleMusic);
playMusicBtn.addEventListener("dblclick", changeTrack);

const generateMeme = async () => {
  const data = await fetchMeme();
  if (data) {
    updateDetails(data.url, data.title, data.author);
  }
};

generateMemeBtn.addEventListener("click", generateMeme);

generateMeme();

// Append the audio element to the body
document.body.appendChild(audioElement);
