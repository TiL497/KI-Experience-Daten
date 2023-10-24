Chart.defaults.font.size = 14;

//Gyrosensor x direction Chart
const ctx_x = document.getElementById('gyro_x');
var data_x = [];
var label_x = [];

var chart_gyro_x =new Chart(ctx_x, {
  type: 'line',
  data: {
    labels: label_x,
    datasets: [{
      label: 'Gyro Raw - x direction',
      data: data_x,
      borderWidth: 1,
      borderColor: 'rgb(234, 0, 0)',
    }]
  },
  options: {
    scales: {
      y: {
        title: {
          display: true, 
          text: "ω [rad/s]"
        },
        ticks: {
            stepSize: 1
        }
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Winkelgeschwindigkeit in x-Richtung'
      },
      legend: {
          display: false
      }
    }
  }
});

chart_gyro_x.options.animation = false;

//Gyrosensor x direction preview Chart
const ctx_preview_x = document.getElementById('gyro_preview_x');

var chart_gyro_preview_x =new Chart(ctx_preview_x, {
  type: 'line',
  data: {
    labels: label_x,
    datasets: [{
      label: 'Gyro Raw - x direction',
      data: data_x,
      borderWidth: 1,
      borderColor: 'rgb(234, 0, 0)',
    }]
  },
  options: {
    scales: {
      y: {
        title: {
          display: true, 
          text: "ω [rad/s]"
        },
        ticks: {
            stepSize: 1
        }
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Winkelgeschwindigkeit in x-Richtung'
      },
      legend: {
          display: false
      }
    }
  }
});

chart_gyro_preview_x.options.animation = false;

//Gyrosensor y direction Chart 
const ctx_y = document.getElementById('gyro_y');
var data_y = [];
var label_y = [];

var chart_gyro_y = new Chart(ctx_y, {
  type: 'line',
  data: {
    labels: label_y,
    datasets: [{
      label: 'Gyro Raw - y direction',
      data: data_y,
      borderWidth: 1,
      borderColor: 'rgb(243, 104, 0)'
    }]
  },
  options: {
    scales: {
      y: {
        title: {
          display: true, 
          text: "ω [rad/s]"
        },
        ticks: {
            stepSize: 1
        }
      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Winkelgeschwindigkeit in y-Richtung'
      },
      legend: {
          display: false
      }
    }
  }
});

chart_gyro_y.options.animation = false;

//Gyrosensor z direction Chart
const ctx_z = document.getElementById('gyro_z');
var data_z = [];
var label_z = [];

var chart_gyro_z =new Chart(ctx_z, {
  type: 'line',
  data: {
    labels: label_z,
    datasets: [{
      label: 'Gyro Raw - z direction',
      data: data_z,
      borderWidth: 1,
      borderColor: 'rgb(243,214,0)'
    }]
  },
  options: {
    scales: {
      y: {
        title: {
          display: true, 
          text: "ω [rad/s]"
        },
        ticks: {
            stepSize: 1
        }
      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Winkelgeschwindigkeit in z-Richtung'
      },
      legend: {
          display: false
      }
    }
  }
});

chart_gyro_z.options.animation = false;

//Acceleration x direction Chart
const ctx_accel_x = document.getElementById('accel_x');
var data_accel_x = [];
var label_accel_x = [];

var chart_accel_x =new Chart(ctx_accel_x, {
  type: 'line',
  data: {
    labels: label_accel_x,
    datasets: [{
      label: 'Beschleunigung - Richtung x-Achse',
      data: data_accel_x,
      borderWidth: 1,
      borderColor: 'rgb(243,214,0)'
    }]
  },
  options: {
    scales: {
      y: {
        title: {
          display: true, 
          text: "a [m/s²]"
        },
        ticks: {
            stepSize: 1
        }
      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Beschleunigung in x-Richtung'
      },
      legend: {
          display: false
      }
    }
  }
});

chart_accel_x.options.animation = false;

//Acceleration x direction preview Chart
const ctx_accel_preview_x = document.getElementById('accel_preview_x');

var chart_accel_preview_x =new Chart(ctx_accel_preview_x, {
  type: 'line',
  data: {
    labels: label_accel_x,
    datasets: [{
      label: 'Beschleunigung - Richtung x-Achse',
      data: data_accel_x,
      borderWidth: 1,
      borderColor: 'rgb(243,214,0)'
    }]
  },
  options: {
    scales: {
      y: {
        title: {
          display: true, 
          text: "a [m/s²]"
        },
        ticks: {
            stepSize: 1
        }
      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Beschleunigung in x-Richtung'
      },
      legend: {
          display: false
      }
    }
  }
});

chart_accel_preview_x.options.animation = false;

//Acceleration y direction Chart
const ctx_accel_y = document.getElementById('accel_y');
var data_accel_y = [];
var label_accel_y = [];

var chart_accel_y =new Chart(ctx_accel_y, {
  type: 'line',
  data: {
    labels: label_accel_y,
    datasets: [{
      label: 'Beschleunigung - Richtung y-Achse',
      data: data_accel_y,
      borderWidth: 1,
      borderColor: 'rgb(243,214,0)'
    }]
  },
  options: {
    scales: {
      y: {
        title: {
          display: true, 
          text: "a [m/s²]"
        },
        ticks: {
            stepSize: 1
        }
      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Beschleunigung in y-Richtung'
      },
      legend: {
          display: false
      }
    }
  }
});

chart_accel_y.options.animation = false;

//Acceleration z direction Chart
const ctx_accel_z = document.getElementById('accel_z');
var data_accel_z = [];
var label_accel_z = [];

var chart_accel_z =new Chart(ctx_accel_z, {
  type: 'line',
  data: {
    labels: label_accel_z,
    datasets: [{
      label: 'Beschleunigung - Richtung z-Achse',
      data: data_accel_z,
      borderWidth: 1,
      borderColor: 'rgb(243,214,0)'
    }]
  },
  options: {
    scales: {
      y: {
        title: {
          display: true, 
          text: "a [m/s²]"
        },
        ticks: {
            stepSize: 1
        }
      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Beschleunigung in z-Richtung'
      },
      legend: {
          display: false
      }
    }
  }
});

chart_accel_z.options.animation = false;

//Magnetometer x direction Chart
const ctx_magnet_x = document.getElementById('magnet_x');
var data_magnet_x = [];
var label_magnet_x = [];

var chart_magnet_x =new Chart(ctx_magnet_x, {
  type: 'line',
  data: {
    labels: label_magnet_x,
    datasets: [{
      label: 'Magnetische Flussdichte - Richtung x-Achse',
      data: data_magnet_x,
      borderWidth: 1,
      borderColor: 'rgb(243,214,0)'
    }]
  },
  options: {
    scales: {
      y: {
        title: {
          display: true, 
          text: "B [µT]"
        },
        ticks: {
            stepSize: 1
        }
      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Magnetische Flussdichte in x-Richtung'
      },
      legend: {
          display: false
      }
    }
  }
});

chart_magnet_x.options.animation = false;

//Magnetometer x direction Chart
const ctx_magnet_preview_x = document.getElementById('magnet_preview_x');
var data_magnet_x = [];
var label_magnet_x = [];

var chart_magnet_preview_x =new Chart(ctx_magnet_preview_x, {
  type: 'line',
  data: {
    labels: label_magnet_x,
    datasets: [{
      label: 'Magnetische Flussdichte - Richtung x-Achse',
      data: data_magnet_x,
      borderWidth: 1,
      borderColor: 'rgb(243,214,0)'
    }]
  },
  options: {
    scales: {
      y: {
        title: {
          display: true, 
          text: "B [µT]"
        },
        ticks: {
            stepSize: 1
        }
      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Magnetische Flussdichte in x-Richtung'
      },
      legend: {
          display: false
      }
    }
  }
});

chart_magnet_preview_x.options.animation = false;

//Magnetometer y direction Chart
const ctx_magnet_y = document.getElementById('magnet_y');
var data_magnet_y = [];
var label_magnet_y = [];

var chart_magnet_y =new Chart(ctx_magnet_y, {
  type: 'line',
  data: {
    labels: label_magnet_y,
    datasets: [{
      label: 'Magnetische Flussdichte - Richtung y-Achse',
      data: data_magnet_y,
      borderWidth: 1,
      borderColor: 'rgb(243,214,0)'
    }]
  },
  options: {
    scales: {
      y: {
        title: {
          display: true, 
          text: "B [µT]"
        },
        ticks: {
            stepSize: 1
        }
      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Magnetische Flussdichte in y-Richtung'
      },
      legend: {
          display: false
      }
    }
  }
});

chart_magnet_y.options.animation = false;

//Magnetometer y direction Chart
const ctx_magnet_z = document.getElementById('magnet_z');
var data_magnet_z = [];
var label_magnet_z = [];

var chart_magnet_z =new Chart(ctx_magnet_z, {
  type: 'line',
  data: {
    labels: label_magnet_z,
    datasets: [{
      label: 'Magnetische Flussdichte - Richtung z-Achse',
      data: data_magnet_z,
      borderWidth: 1,
      borderColor: 'rgb(243,214,0)'
    }]
  },
  options: {
    scales: {
      y: {
        title: {
          display: true, 
          text: "B [µT]"
        },
        ticks: {
            stepSize: 1
        }
      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Magnetische Flussdichte in z-Richtung'
      },
      legend: {
          display: false
      }
    }
  }
});

chart_magnet_z.options.animation = false;

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    if (chart.data.labels.length > 100){
      chart.data.labels.shift(); 
      chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
      });
    }
    chart.update();
}