var ctx = document.createElement('canvas').getContext('2d');
var linGrad = ctx.createLinearGradient(0, 64, 0, 200);
linGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1.000)');
linGrad.addColorStop(0.5, 'rgba(183, 183, 183, 1.000)');

var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: linGrad,
  backend: 'MediaElement',
  mediaType: 'audio',
  progressColor: 'hsla(293, 100%, 50%, 0.5)',
  cursorColor: '#fff',
  normalize: true,
  barWidth: 3
});

wavesurfer.on('loading', function (percents) {
  document.getElementById('progress').value = percents;
});

wavesurfer.on('ready', function (percents) {
  document.getElementById('progress').style.display = 'none';
});

wavesurfer.load(document.querySelector('#song'), [
  0.0218, 0.0183, 0.0165, 0.0198, 0.2137, 0.2888, 0.2313, 0.15, 0.2542, 0.2538, 0.2358, 0.1195, 0.1591, 0.2599, 0.2742,
  0.1447, 0.2328, 0.1878, 0.1988, 0.1645, 0.1218, 0.2005, 0.2828, 0.2051, 0.1664, 0.1181, 0.1621, 0.2966, 0.189, 0.246,
  0.2445, 0.1621, 0.1618, 0.189, 0.2354, 0.1561, 0.1638, 0.2799, 0.0923, 0.1659, 0.1675, 0.1268, 0.0984, 0.0997, 0.1248,
  0.1495, 0.1431, 0.1236, 0.1755, 0.1183, 0.1349, 0.1018, 0.1109, 0.1833, 0.1813, 0.1422, 0.0961, 0.1191, 0.0791,
  0.0631, 0.0315, 0.0157, 0.0166, 0.0108
]);