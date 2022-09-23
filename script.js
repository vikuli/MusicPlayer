let allMusic = [
  {
    bgimage: "cover1",
    singer: "Our Last Night",
    song: "Skyfall (Adele cover)",
    cover: "cover1",
    audio: "song1",
  },
  {
    bgimage: "cover2",
    singer: "Би-2",
    song: "Лётчик",
    cover: "cover2",
    audio: "song2",
  },
  {
    bgimage: "cover3",
    singer: "Måneskin, Iggy Pop",
    song: "I WANNA BE YOUR SLAVE",
    cover: "cover3",
    audio: "song3",
  },
  {
    bgimage: "cover4",
    singer: "Тима Белорусских",
    song: "Любовь по-белорусски",
    cover: "cover4",
    audio: "song4",
  },
  {
    bgimage: "cover5",
    singer: "Post Malone",
    song: "Hollywood's Bleeding",
    cover: "cover5",
    audio: "song5",
  },
];

const backgroundImage = document.querySelector(".bgimage");
const player = document.querySelector(".player");
const coverImg = document.querySelector(".cover");
const singerName = document.querySelector(".singer");
const songTitle = document.querySelector(".song");
const audioSrc = document.querySelector(".audio");
const progressBarContainer = document.querySelector(".progress-bar-container");
const progressBar = document.querySelector(".progress-bar");

const backwardContainer = document.querySelector(".bw-container");
const playContainer = document.querySelector(".pl-container");
const forwardContainer = document.querySelector(".fw-container");
const backward = document.querySelector(".backward");
const play = document.querySelector(".play");
const forward = document.querySelector(".forward");
const backwardButton = document.querySelector(".bw-btn");
const playButton = document.querySelector(".pl-btn");
const forwardButton = document.querySelector(".fw-btn");

let musicIndex = 1;

// Loading music properties

window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
  backgroundImage.src = `assets/img/${allMusic[indexNumb - 1].bgimage}.jpg`;
  singerName.innerText = allMusic[indexNumb - 1].singer;
  songTitle.innerText = allMusic[indexNumb - 1].song;
  coverImg.src = `assets/img/${allMusic[indexNumb - 1].cover}.jpg`;
  audioSrc.src = `assets/audio/${allMusic[indexNumb - 1].audio}.mp3`;
}

// Play/pause music

function playMusic() {
  player.classList.add("pl-btn");
  play.src = "assets/svg/pause.png";
  audioSrc.play();
}

function pauseMusic() {
  player.classList.remove("pl-btn");
  play.src = "assets/svg/play.png";
  audioSrc.pause();
}

playContainer.addEventListener("click", () => {
  const isMusicPlay = player.classList.contains("pl-btn");
  isMusicPlay ? pauseMusic() : playMusic();
});

// Switch music

function nextMusic() {
  musicIndex >= allMusic.length ? (musicIndex = 1) : musicIndex++;
  loadMusic(musicIndex);
  playMusic();
}

forwardContainer.addEventListener("click", () => {
  nextMusic();
});

function previousMusic() {
  musicIndex <= 1 ? (musicIndex = allMusic.length) : musicIndex--;
  loadMusic(musicIndex);
  playMusic();
}

backwardContainer.addEventListener("click", () => {
  previousMusic();
});

// Progress bar

audioSrc.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  audioSrc.addEventListener("loadeddata", () => {
    let musicDuration = document.querySelector(".duration");

    let audioDuration = audioSrc.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  let musicCurrentTime = document.querySelector(".current");
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressBarContainer.addEventListener("click", (e) => {
  let progressBarVal = progressBarContainer.clientWidth;
  let clickX = e.offsetX;
  let songDuration = audioSrc.duration;

  audioSrc.currentTime = (clickX / progressBarVal) * songDuration;
});

// Autoplay

audioSrc.addEventListener("ended", () => {
  nextMusic();
});
