spectrogram_preview = new Spectrogram("cvs_spectro_preview"); 
spectrogram = new Spectrogram("cvs_spectro");
spectrogram_preview.initialize();
spectrogram.initialize();

var spectrograms = new Array();
spectrograms.push(spectrogram);
spectrograms.push(spectrogram_preview);

drawAxes("cvs_axis_preview"); 
drawAxes("cvs_axis"); 

function clearSpectrograms(){
  try {
    for (i = 0; i < spectrograms.length; i++){
      spectrograms[i].initialize(); 
    }
  } catch (error) {
    console.log(error);
  }
}

function drawAxes(cvs){
  //draw y-axis 
  const canvas_axis = document.getElementById(cvs);
  const ctx_axis = canvas_axis.getContext("2d");

  ctx_axis.beginPath(); 
  ctx_axis.moveTo(canvas_axis.width-10, 10);
  ctx_axis.lineTo(canvas_axis.width-10, canvas_axis.height-10);
  ctx_axis.lineWidth = 2;
  ctx_axis.strokeStyle = '#000000';
  ctx_axis.font = "20px Arial";
  ctx_axis.stroke(); 

  //draw y-axis markings 
  ticks = 12;
  height = (canvas_axis.height-20)
  distance = height/(ticks-1);
  ctx_axis.beginPath(); 
  ctx_axis.moveTo(canvas_axis.width-10, height+9);
  ctx_axis.lineTo(canvas_axis.width-15, height+9);
  ctx_axis.fillText("22", canvas_axis.width-45, 18);
  ctx_axis.stroke();
  for (i = 1; i < ticks; i++){
    ctx_axis.beginPath(); 
    ctx_axis.moveTo(canvas_axis.width-10, height-distance*i+11);
    ctx_axis.lineTo(canvas_axis.width-15, height-distance*i+11);
    if ((2*(ticks-i-1)) < 10){
      ctx_axis.fillText(2*(ticks-i-1), canvas_axis.width-38, distance*i+18);
    } else {
      ctx_axis.fillText(2*(ticks-i-1), canvas_axis.width-45, distance*i+18);
    }
    ctx_axis.stroke();
  }
  ctx_axis.save();
  ctx_axis.rotate(3 * Math.PI / 2);
  ctx_axis.textAlign = "left";
  ctx_axis.fillText("f [kHz]", -height/2-40, 30);
  ctx_axis.restore();
}

function Spectrogram(cvs){
  const c = document.getElementById(cvs);
  const ctx = c.getContext("2d");
  const width = c.width; 
  const data_buffer = new Uint8Array(width*width*4);
  const COLOR_MAP = [[0, 0, 0], 
  [1523, 0, 11770], 
  [4301, 0, 16645], 
  [7899, 0, 20386], 
  [12158, 0, 23540],
  [16989, 0, 26319], 
  [22330, 0, 28831], 
  [28137, 0, 31141], 
  [33291, 0, 32208], 
  [35311, 0, 29605], 
  [37221, 0, 26405], 
  [39038, 0, 22657], 
  [40773, 0, 18404], 
  [42438, 0, 13680], 
  [44040, 0, 8514], 
  [45586, 0, 2931], 
  [47081, 3046, 0], 
  [48530, 9401, 0], 
  [49937, 16117, 0], 
  [51306, 23178, 0], 
  [52638, 30572, 0], 
  [53938, 38286, 0], 
  [55208, 46310, 0], 
  [56449, 54633, 0], 
  [52077, 57663, 0], 
  [45558, 58852, 0], 
  [38717, 60017, 0], 
  [31563, 61160, 0], 
  [24107, 62283, 0], 
  [16355, 63385, 0], 
  [8317, 64469, 0], 
  [0, 65535, 0]]

  this.initialize = () => {
      //initialize
      for(var y = 0; y < width; y++) {
          for(var x = 0; x < width; x++) {
              var pos = (y * width + x) * 4; 
              data_buffer[pos] = 0;           
              data_buffer[pos+1] =  0;        
              data_buffer[pos+2] =  0;          
              data_buffer[pos+3] = 255;  
          }
      }
      var image_data = ctx.createImageData(width, width);
      image_data.data.set(data_buffer);
      ctx.putImageData(image_data, 0, 10);
  }

  this.newData = (message) => {
      const data = message.split(",");
      //shift elements by one left
      var tmp_image = ctx.getImageData(1, 10, width-1, width);
      ctx.putImageData(tmp_image, 0, 10);

      var new_data_buffer = new Uint8Array(1024*4);
      //populate array with new data 
      var pos_counter = 0;
      //map data 
      for (i = 1024; i > 0; i--){
          var pos = pos_counter * 4;
          var temp_data = data[i]; 
          if (temp_data < 0) temp_data = 0.00000000000001;
          if (temp_data > 1) temp_data = 0.99999999999999;
          const index = Math.floor(temp_data * (COLOR_MAP.length - 1));
          try {
            new_data_buffer[pos] = COLOR_MAP[index][0]; 
            new_data_buffer[pos+1] = COLOR_MAP[index][1];
            new_data_buffer[pos+2] = COLOR_MAP[index][2];
            new_data_buffer[pos+3] = 255;
          } catch (error){
            new_data_buffer[pos] = 0; 
            new_data_buffer[pos+1] = 0;
            new_data_buffer[pos+2] = 0;
            new_data_buffer[pos+3] = 255;
            console.error(error);
          }
          pos_counter += 1;
      }

      const originalWidth = 1; // Ursprüngliche Breite 
      const originalHeight = 1024; // Ursprüngliche Höhe 

      // Erstelle ein HTMLCanvasElement mit der ursprünglichen Breite und Höhe.
      const canvas = document.createElement('canvas');
      canvas.width = originalWidth;
      canvas.height = originalHeight;

      // Hole den 2D-Kontext des Canvas.
      const context = canvas.getContext('2d');

      // Erstelle eine ImageData-Instanz aus dem UInt8Array und den Abmessungen.
      const imageData = new ImageData(new Uint8ClampedArray(new_data_buffer.buffer), originalWidth, originalHeight);

      // Zeichne die ImageData auf das Canvas.
      context.putImageData(imageData, 0, 0);

      // Jetzt haben wir das Bild auf dem Canvas. Du kannst die Größe des Bildes ändern (resizen).
      const newWidth = 1; // Neue Breite
      const newHeight = width; // Neue Höhe

      // Erstelle ein neues HTMLCanvasElement mit der neuen Breite und Höhe.
      const resizedCanvas = document.createElement('canvas');
      resizedCanvas.width = newWidth;
      resizedCanvas.height = newHeight;

      // Hole den 2D-Kontext des neuen Canvas.
      const resizedContext = resizedCanvas.getContext('2d');

      // Zeichne das ursprüngliche Bild auf das neue Canvas mit der neuen Größe (resizen).
      resizedContext.drawImage(canvas, 0, 0, newWidth, newHeight);

      var resized_img = resizedContext.getImageData(0, 0, 1, width);
      ctx.putImageData(resized_img, width-1, 10);
  }
}