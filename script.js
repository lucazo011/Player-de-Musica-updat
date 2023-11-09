// Mudar Informações da Música
const songName = document.getElementById("song-name"); // Mudar nome da Musica
const BandName = document.getElementById("band-name"); // Mudar Nome da Banda
const cover = document.getElementById("cover"); // Mudar Capa do Disco
const song =document.getElementById('audio'); // Mudar Audio

    const SO_TIRED = {
    songName:'SO TIRED',
    artist: 'NUEKI',
    files: 'So_Tired',
    liked: false,
        }

    const SEA_OF_PROBLENS = {
    songName:'SEA OF PROBLENS',
    artist: 'GLICHERY',
    files: 'SEA OF PROBLENS',
    liked: true,
        }

    const COME_AS_YOU_PHONK = {
    songName:'COME AS YOU PHONK',
    artist: 'SONEL',
    files: 'Come-as-you-phonk',
    liked: false,
        }

// Playlist
const Playlist = [SO_TIRED, SEA_OF_PROBLENS, COME_AS_YOU_PHONK];
let index = 0;
let Sortedplaylist = [...Playlist];


    // Botão Play 
    let isPlaying = false;
    const play = document.getElementById("play");

    function PlaySong() {
    const iconElement = play.querySelector('.material-symbols-outlined');
    iconElement.classList.remove('material-symbols-outlined');
    iconElement.textContent = ''; // Remove o texto do ícone

    // Botão Pause
    iconElement.classList.add('material-symbols-outlined');
    iconElement.textContent = 'pause_circle';
    song.play();
    isPlaying = true;
    }

    function PauseSong() {
    const iconElement = play.querySelector('.material-symbols-outlined');
    iconElement.classList.remove('material-symbols-outlined');
    iconElement.textContent = ''; // Remove o texto do ícone

    // Botão Play
    iconElement.classList.add('material-symbols-outlined');
    iconElement.textContent = 'play_circle';
    song.pause();
    isPlaying = false;
    }

    function PlayPauseDecider(){
    if(isPlaying === true){
        PauseSong();
    }
    else {
        PlaySong();
    }
        
    }

    // Botao Next e Previous
    const next = document.getElementById("next");
    const previous = document.getElementById("previous");

    function previousSong(){
        if(index === 0){
            index = Sortedplaylist.length - 1;
        }
        else{
            index -= 1;
        }
        initializeSong();
        PlaySong();
    }

    function nextSong(){
        if(index === Sortedplaylist.length - 1){
           index = 0;
        }
        else{
            index += 1;
        }
        initializeSong();
        PlaySong();
    }

    // Botão Shuffle 
    const ShuffleButton = document.getElementById('shuffle'); // Sistema de Array embaralhado 
    let IsShuffled = false;
    function ShuffleArray(PreShuffleArray){
            const size = Sortedplaylist.length;
            let currentIndex = size - 1;
            while(currentIndex > 0){
                let randomIndex = Math.floor(Math.random()*size);
                let aux = PreShuffleArray[currentIndex];
                PreShuffleArray[currentIndex] = PreShuffleArray[randomIndex];
                PreShuffleArray[randomIndex] = aux;
                currentIndex -=1;
            }
    }
    function ShuffleButtonClicked(){
        if(IsShuffled === false){
            IsShuffled = true;
            ShuffleArray(Sortedplaylist);
            ShuffleButton.classList.add('button-active');
        }
        else {
            IsShuffled = false;
            Sortedplaylist = [...Playlist];
            ShuffleButton.classList.remove('button-active');
        }
    }

    // Botao Repeat 
    const repeatButton = document.getElementById('repeat');
    let repeatON = false; 
    function repeatButtonClicked(){
        if(repeatON === false){
            repeatON = true;
            repeatButton.classList.add('button-active');
        }
        else{
            repeatON = false;
            repeatButton.classList.remove('button-active');
        }
    }

    function nextOrRepeat(){
        if(repeatON === false){
            nextSong();
        }
        else{
            PlaySong();
        }
    }

// botao de like ativar e desativar
const likeButton = document.getElementById('like');
let likeClicked = false;

function likeButtonRender() {
    if (likeClicked === false) {
        likeButton.classList.remove('button-active');
    } else {
        likeClicked = true;
        likeButton.classList.add('button-active');
    }
}
      
 

// Iniciar Musica e informações (capa,audio,nome da musica,artista)
function initializeSong(){
    cover.src = `images/${Sortedplaylist[index].files}.jpeg`;
    song.src = `Audios/${Sortedplaylist[index].files}.mp3`;
    songName.innerText = Sortedplaylist[index].songName;
    BandName.innerText = Sortedplaylist[index].artist;
}

// Barra de Progresso
const songTime = document.getElementById('song-time');
const currentProgress = document.getElementById('current-progress');
const ProgressContainer = document.getElementById('progress-container');
function UpdateProgress() {
    const BarWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${BarWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime); // Atualiza o tempo da musica 
}

function jumpTo(event){
  const width = ProgressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition/width)* song.duration;
  song.currentTime = jumpToTime;
}


// Formato de tempo da Musica (00:00)
function toHHMMSS( originalNumber ){
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}


//Total Time 
const totalTime = document.getElementById('total-time');
function UpdateTotalTime(){
    totalTime.innerText = toHHMMSS(song.duration);  
}   


initializeSong();

play.addEventListener('click', PlayPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', UpdateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', UpdateTotalTime);
ProgressContainer.addEventListener('click', jumpTo);
ShuffleButton.addEventListener('click', ShuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonRender);

