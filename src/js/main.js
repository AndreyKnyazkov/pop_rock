var current_status = {
  position: 0,
  index: null,
  audio_status: "pause"
}

var wavesurferMain = WaveSurfer.create({
  container: '#waveform',
  backend: 'MediaElement',
  waveColor: 'blue',
  progressColor: 'purple',
  hideScrollbar: true
});

wavesurferMain.current_index = null

wavesurferMain.setVolume(0);

var wavesurfers = [];
var versions = [];
var $i = 0;

document.querySelectorAll("button").forEach(button => {
  button.addEventListener('click', function(){
    playTrack(parseInt(button.getAttribute('data-player')))
  });
});

document.querySelectorAll(".wave-form").forEach(wavesurfer => {
  var id = '_' + Math.random().toString(36).substr(2, 9);
  var path = wavesurfer.getAttribute('data-path')

  wavesurfer.querySelector(".wave-container").setAttribute("id", id)
  wavesurfer.querySelector(".wave-container").setAttribute("data-player", $i)
  wavesurfer.querySelector("button").setAttribute("data-player", $i)
  wavesurfer.querySelector("button").setAttribute("data-plyaer-id", id)

  versions.push({
    id: id,
    path: path
  })
  $i++;
})

versions.forEach((version, index) => {
  renderWaveForm(version.path, version.id, index);
});

function renderWaveForm(url, id, index) {
  wavesurfer = WaveSurfer.create({
    container: '#' + id,
    waveColor: 'red',
    backend: 'MediaElement',
    progressColor: 'purple',
    hideScrollbar: true
  });
  wavesurfer.custom_id = "#" + id
  wavesurfer.index = index
  wavesurfer.url = url
  wavesurfer.load(url);
  wavesurfers.push(wavesurfer);
  return wavesurfer;
}

function playTrack(playerIndex) {
  if(current_status.index === playerIndex) {
    if (wavesurfers[playerIndex].isPlaying()) {
      pause(playerIndex)
    } else {
      play(playerIndex);
    }
  } else if (current_status.index !== playerIndex) {
    if (current_status.index === null) {
      current_status.index = playerIndex
      play(playerIndex)
    } else if (wavesurfers[current_status.index].isPlaying()) {
      stop(current_status.index)
      pause(current_status.index)
      current_status.index = playerIndex
      play(playerIndex)
    } else {
      wavesurfers[current_status.index].stop()
      wavesurfers[current_status.index].pause()
      current_status.index = playerIndex
      play(playerIndex)
    }
  }
}

function stopAll(){
  wavesurfers.forEach((wavesurfer) => {
    wavesurfer.stop()
    wavesurfer.pause()
  })
  wavesurferMain.stop()
  current_status.audio_status = "pause"
}

function stopUnSeekAudion(index){
  wavesurfers.forEach((wavesurfer, key) => {
    if (key === current_status.index) {
      wavesurfer.play()
    }
    if(index !== key && wavesurfer.isPlaying()) {
      wavesurfer.stop()
      wavesurfer.pause()
    }
  })
  wavesurferMain.pause()
  current_status.index = index
  current_status.audio_status = "pause"
}

function play(index){
  wavesurfers.forEach((wavesurfer, key) => {
    if(key === index) wavesurfer.play()
  })
  if(index !== wavesurferMain.current_index || wavesurferMain.current_index === null){
    wavesurferMain.current_index = index
    wavesurferMain.load(versions[index].path);
  }
  wavesurferMain.play(wavesurfers[index].getCurrentTime())
  current_status.audio_status = "play"
}

function pause(index){
  wavesurfers.forEach((wavesurfer, key) => {
    if(key === index) wavesurfer.pause()
  })
  wavesurferMain.pause()
  current_status.audio_status = "pause"
}

function stop(index){
  wavesurfers.forEach((wavesurfer, key) => {
    if(key === index) wavesurfer.stop()
  })
  wavesurferMain.stop()
  current_status.audio_status = "pause"
}

wavesurfers.forEach((wavesurfer,index) => {
  wavesurfer.on('seek', function(position) {
    stopUnSeekAudion(index)
    play(index)
  })
});

wavesurferMain.on('seek', function(position) {
  wavesurfers[wavesurferMain.current_index].setDisabledEventEmissions(['seek'])
  wavesurfers[wavesurferMain.current_index].seekTo(position);
  wavesurfers[wavesurferMain.current_index].setDisabledEventEmissions([])
});