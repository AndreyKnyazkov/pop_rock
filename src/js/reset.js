/*


*/


var currentStatus = {
  position: 0,
  index: null,
  audioStatus: "pause"
}

//Нижний бар
var wavesurferMain = WaveSurfer.create({
  container: '#waveform',
  backend: 'MediaElement',
  setWaveColor: 'blue',
  progressColor: 'black',
  hideScrollbar: true,
  load: 'preload'
});

//Variable to check if song is loaded
wavesurferMain.loaded = false;

wavesurferMain.currentIndex = null

wavesurferMain.setVolume(0);

var wavesurfers = [];
var versions = [];
var $i = 0;

document.querySelectorAll("button").forEach(button => {
  button.addEventListener('click', function () {
    playTrack(parseInt(button.getAttribute('data-player')));
  });
});

document.querySelectorAll(".wave-form").forEach(wavesurfer => {
  var id = '_' + Math.random().toString(36).substr(2, 9);
  var path = wavesurfer.getAttribute('data-path')
  //id каждый раз генерируется автоматически
  wavesurfer.querySelector(".wave-container").setAttribute("id", id)
  //от нуля и выше
  wavesurfer.querySelector(".wave-container").setAttribute("data-player", $i)
  //тот же самый id что и в других местах
  wavesurfer.querySelector("button").setAttribute("data-player", $i)
  wavesurfer.querySelector("button").setAttribute("data-plyaer-id", id)

  versions.push({
    id: id,
    path: path
  });
  $i++;

});

versions.forEach((version, index) => {
  renderWaveForm(version.path, version.id, index);
});

function renderWaveForm(url, id, index) {
  wavesurfer = WaveSurfer.create({
    container: '#' + id,
    waveColor: 'red',
    backend: 'MediaElement',
    //выставляем цвет пройденной линии
    progressColor: 'dark',
    hideScrollbar: true,
    load: 'preload'
  });
  wavesurfer.customId = "#" + id,
    wavesurfer.index = index,
    wavesurfer.url = url,
    wavesurfer.load(url);
  wavesurfers.push(wavesurfer);
  return wavesurfer;
}

function playTrack(playerIndex) {
  if (currentStatus.index === playerIndex) {
    if (wavesurfers[playerIndex].isPlaying()) {
      pause(playerIndex)
    } else {
      play(playerIndex);
    }
  } else if (currentStatus.index !== playerIndex) {
    if (currentStatus.index === null) {
      currentStatus.index = playerIndex;
      play(playerIndex);
    } else if (wavesurfers[currentStatus.index].isPlaying()) {
      stop(currentStatus.index);
      pause(currentStatus.index);
      currentStatus.index = playerIndex;
      play(playerIndex);
    } else {
      wavesurfers[currentStatus.index].stop();
      wavesurfers[currentStatus.index].pause();
      currentStatus.index = playerIndex;
      play(playerIndex);
    }
  }
}

function stopAll() {
  wavesurfers.forEach((wavesurfer) => {
    wavesurfer.stop();
    wavesurfer.pause();
  });
  wavesurferMain.stop();
  currentStatus.audioStatus = "pause"
}

function stopUnSeekAudion(index) {
  wavesurfers.forEach((wavesurfer, key) => {
    if (key === currentStatus.index) {
      wavesurfer.play();
    }
    if (index !== key && wavesurfer.isPlaying()) {
      wavesurfer.stop();
      wavesurfer.pause();
    }
  })
  wavesurferMain.pause()
  currentStatus.index = index;
  currentStatus.audioStatus = "pause";
}

function play(index) {
  wavesurfers.forEach((wavesurfer, key) => {
    if (key === index) wavesurfer.play();
  })
  if (index !== wavesurferMain.currentIndex || wavesurferMain.currentIndex === null) {
    wavesurferMain.currentIndex = index;
    wavesurferMain.load(versions[index].path);
  }
  wavesurferMain.play(wavesurfers[index].getCurrentTime())
  currentStatus.audioStatus = "play";
}

function pause(index) {
  wavesurfers.forEach((wavesurfer, key) => {
    if (key === index) wavesurfer.pause();
  })
  wavesurferMain.pause()
  currentStatus.audioStatus = "pause";
}

function stop(index) {
  wavesurfers.forEach((wavesurfer, key) => {
    if (key === index) wavesurfer.stop();
  })
  wavesurferMain.stop()
  currentStatus.audioStatus = "pause";
}

wavesurfers.forEach((wavesurfer, index) => {
  wavesurfer.on('seek', function (position) {
    stopUnSeekAudion(index);
    play(index);
  });
});

wavesurferMain.on('seek', function (position) {
  wavesurfers[wavesurferMain.currentIndex].setDisabledEventEmissions(['seek']);
  wavesurfers[wavesurferMain.currentIndex].seekTo(position);
  wavesurfers[wavesurferMain.currentIndex].setDisabledEventEmissions([]);
});
