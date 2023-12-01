  //Create MQTT Client ID
  const client_id = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
  //connection url for MQTT connect
  var host = 'ws://192.168.0.246:9001';
  //ws://broker.hivemq.com:8000/mqtt

  document.getElementById("MQTTIP").innerHTML = host; 

  var phone_id = "alsdlkjf";

  //MQTT Options
  const options = {
    keepalive: 60,
    clientId: client_id,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
    },
  }

  var x_gyro_counter = 0;
  var y_gyro_counter = 0;
  var z_gyro_counter = 0;

  var x_accel_counter = 0;
  var y_accel_counter = 0;
  var z_accel_counter = 0;

  var x_magnet_counter = 0;
  var y_magnet_counter = 0;
  var z_magnet_counter = 0;

  //Create Connection and Subscribe to all subtopics from factory
  console.log('Connecting mqtt client');
  let client = mqtt.connect(host, options);
  initMQTT(0); 

  function initMQTT(newIP){
    if (newIP){
      new_host = document.getElementById("newMQTTIP").value; 
      host = new_host; 
      document.getElementById("MQTTIP").innerHTML = new_host; 
      //disconnect 
      client.end();
      //connect 
      client = mqtt.connect(new_host, options);
    } else {
      //disconnect 
      client.end();
      //connect 
      client = mqtt.connect(host, options);  
    }

    //Error Handling
    client.on('error', (err) => {
      console.log('Connection error: ', err);
      client.end();
    })

    client.on('connect', function() {
      console.log('connected');
    })

    client.on('disconnect', function (packet) {
      console.log(packet);
    })

    client.on('close', function () {
      console.log('Disconnected');
    })

    //subscripe to topic 
    client.subscribe(phone_id+'/login/#'); 
    client.subscribe(phone_id+'/gyro/#'); 
    client.subscribe(phone_id+'/audio/#');
    client.subscribe(phone_id+'/accel/#');
    client.subscribe(phone_id+'/magnet/#');

    //fetch data 
    client.on('message', (topic, message) => {
      topic_target = topic.toString();
      //split topic and send data to viz 
      if (topic_target == phone_id+"/gyro/x") {
        addData(chart_gyro_x, x_gyro_counter, parseFloat(message));
        addData(chart_gyro_preview_x, x_gyro_counter, parseFloat(message));
        x_gyro_counter += 1;  
      } else if (topic_target == phone_id+"/gyro/y"){
        addData(chart_gyro_y, y_gyro_counter, parseFloat(message)); 
        y_gyro_counter += 1; 
      } else if (topic_target == phone_id+"/gyro/z"){
        addData(chart_gyro_z, z_gyro_counter, parseFloat(message)); 
        z_gyro_counter += 1; 
      } else if (topic_target == phone_id+"/accel/x"){
        addData(chart_accel_x, x_accel_counter, parseFloat(message)); 
        addData(chart_accel_preview_x, x_accel_counter, parseFloat(message)); 
        x_accel_counter += 1; 
      } else if (topic_target == phone_id+"/accel/y"){
        addData(chart_accel_y, y_accel_counter, parseFloat(message)); 
        y_accel_counter += 1; 
      } else if (topic_target == phone_id+"/accel/z"){
        addData(chart_accel_z, z_accel_counter, parseFloat(message)); 
        z_accel_counter += 1; 
      } else if (topic_target == phone_id+"/magnet/x"){
        addData(chart_magnet_x, x_magnet_counter, parseFloat(message)); 
        addData(chart_magnet_preview_x, x_magnet_counter, parseFloat(message)); 
        x_magnet_counter += 1; 
      } else if (topic_target == phone_id+"/magnet/y"){
        addData(chart_magnet_y, y_magnet_counter, parseFloat(message)); 
        y_magnet_counter += 1; 
      } else if (topic_target == phone_id+"/magnet/z"){
        addData(chart_magnet_z, z_magnet_counter, parseFloat(message)); 
        z_magnet_counter += 1; 
      } else if (topic_target == phone_id+"/audio"){
        spectrogram.newData(message.toString());
        spectrogram_preview.newData(message.toString());
      } else if (topic_target == phone_id+"/login/"){
        let event = {target: {id: "overlay"}};
        clearCharts(); 
        clearSpectrograms(); 
        closeWindow(event);
        switchSite(2);
      }
    })

  }