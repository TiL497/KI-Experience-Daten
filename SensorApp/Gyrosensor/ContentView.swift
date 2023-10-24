//
//  ContentView.swift
//  TestApplication
//
//  Created by Timo on 29.06.23.
//

import SwiftUI
import Combine
import CoreMotion
import Charts
import MQTTNIO
import AVFoundation

struct ContentView: View {
    
    //gyroscope as default selection
    @State private var selectedTab: Tab = .gyroscope
    
    //create spectrogram
    let audioSpectrogram = AudioSpectrogram()
    
    //initialize tab bar
    init() {
        UITabBar.appearance().isHidden = true
    }
    
    var body: some View {
        
        ZStack {
            VStack {
                //view by selected tab
                TabView(selection: $selectedTab) {
                    switch selectedTab {
                        case .gyroscope:
                            GyroView(motion: GyroMotionManager())
                        case .mic:
                            AudioView()
                            .environmentObject(audioSpectrogram)
                        case .accel:
                            AccelView(motion: AccelMotionManager())
                        case .magnet:
                            MagnetView(motion: MagneticFieldManager())
                        case .gear:
                            MQTTSettingsView()
                    }
                }
            }
            
            VStack {
                Spacer()
                //this is the selection bar at the bottom
                CustomTabBar(selectedTab: $selectedTab)
            }
        }
    }
}

class MQTTSettings: ObservableObject{

    static let shared = MQTTSettings(mqtthost: "192.168.137.1")
    
    @Published var mqtthost: String
    @Published var client: MQTTClient
    //initialize on startup
    init(mqtthost: String) {
        self.mqtthost = mqtthost
        self.client = MQTTClient(
            configuration: .init(
                target: .host(mqtthost, port: 1883)
            ),
            eventLoopGroupProvider: .createNew
        )
    }
    //change host ip address of mqtt server
    func changeHost(){
        self.client = MQTTClient(
            configuration: .init(
                target: .host(self.mqtthost, port: 1883)
            ),
            eventLoopGroupProvider: .createNew
        )
    }
    
}

struct MQTTSettingsView: View {
    
    @StateObject var mqtt = MQTTSettings.shared
    
    //design of MQTTSettings view
    var body: some View {
        VStack {
            Text("MQTT Settings")
            HStack (alignment: .center) {
                LabeledContent {
                  TextField("Adresse eingeben", text: $mqtt.mqtthost)
                        .disableAutocorrection(true)
                } label: {
                  Text("IP: ")
                }
                .padding(.leading, 115)
            }
            .padding()
            Button("IP Übernehmen") {
                mqtt.changeHost()
            }
            .bold()
            .frame(width: 200, height:40)
            .background(Color.blue)
            .foregroundColor(Color.white)
            .cornerRadius(10)
        }
    }
}

struct AudioView: View {
    
    //create environment object for top class
    @EnvironmentObject var audioSpectrogram: AudioSpectrogram
    
    //design of spectrogram page
    var body: some View {
        
        VStack {
            
            HStack {
                Button("Start") {
                    audioSpectrogram.startRunning()
                }
                .bold()
                .frame(width: 100, height:40)
                .background(Color.blue)
                .foregroundColor(Color.white)
                .cornerRadius(10)
                Button("Stop") {
                    audioSpectrogram.stopRunning()
                }
                .bold()
                .frame(width: 100, height:40)
                .background(Color.blue)
                .foregroundColor(Color.white)
                .cornerRadius(10)
                .padding(.leading, 40.0)
            }
            .padding()
            
            HStack {
                Text("f [kHz]")
                    .rotationEffect(Angle(degrees: -90))
                    .frame(width:55)
                    .padding(.bottom, 100)
                GeometryReader { geometry in
                    Path { path in
                        let x: CGFloat = 50
                        let yScale: CGFloat = geometry.size.height / 512
                        path.move(to: .init(x: x, y: 0))
                        path.addLine(to: .init(x: x, y: geometry.size.height))
                        let tickSpacing: CGFloat = 46.5
                        for i in 0..<12 {
                            let tickY = CGFloat(i) * tickSpacing * yScale
                            path.move(to: .init(x: x - 5, y: geometry.size.height - tickY))
                            path.addLine(to: .init(x: x + 5, y: geometry.size.height - tickY))
                        }
                    }
                    .stroke(Color.white, lineWidth: 2)
                    // add y-axis tick labels
                    ForEach(0..<12, id: \.self) { i in
                        let tickSpacing: CGFloat = 46.5
                        let tickLabel = Text("\(i*2)")
                            .frame(width: 30, height: 16, alignment: .center)
                        let tickY = CGFloat(i) * tickSpacing * geometry.size.height / 512
                        tickLabel
                            .position(x: 50 - 25, y: geometry.size.height - tickY)
                    }
                }
                .padding(.bottom, 100)
                .padding(.leading, 0)
                .frame(width: 50.0)
                Image(decorative: audioSpectrogram.outputImage,
                      scale: 1,
                      orientation: .left)
                .resizable()
                .padding(.bottom, 100)
                .padding(.leading, 0)
            }
            
        }
    }
    
}


struct GyroView: View {
    //initialize motionmanager
    @ObservedObject var motion: GyroMotionManager
    
    //design of gyroscope view
    var body: some View {
        VStack {
            HStack {
                Button("Start") {
                    motion.start()
                }
                .bold()
                .frame(width: 100, height:40)
                .background(Color.blue)
                .foregroundColor(Color.white)
                .cornerRadius(10)
                Button("Stop") {
                    motion.stop()
                }
                .bold()
                .frame(width: 100, height:40)
                .background(Color.blue)
                .foregroundColor(Color.white)
                .cornerRadius(10)
                .padding(.leading, 40.0)
            }
            .padding(.top, -80.0)
            Text("Gyrosensor x")
                .padding(.top, -20.0)
            Chart {
                ForEach(motion.x_series, id: \.date) { item in
                    LineMark(
                        x: .value("ID", item.date),
                        y: .value("value", item.value),
                        series: .value("dim","x")
                    )
                    .foregroundStyle(.red)
                }
            }
            .chartXAxisLabel(position: .bottom, alignment: .center) {
                Text("time")
            }
            .frame(width: 350.0, height: 150.0)
            Text("Gyrosensor y")
            Chart {
                ForEach(motion.y_series, id: \.date) { item in
                    LineMark(
                        x: .value("ID", item.date),
                        y: .value("value", item.value),
                        series: .value("dim","x")
                    )
                    .foregroundStyle(.orange)
                }
            }
            .chartXAxisLabel(position: .bottom, alignment: .center) {
                Text("time")
            }
            .frame(width: 350.0, height: 150.0)
            Text("Gyrosensor z")
            Chart {
                ForEach(motion.z_series, id: \.date) { item in
                    LineMark(
                        x: .value("ID", item.date),
                        y: .value("value", item.value),
                        series: .value("dim","x")
                    )
                    .foregroundStyle(.yellow)
                }
            }
            .chartXAxisLabel(position: .bottom, alignment: .center) {
                Text("time")
            }
            .frame(width: 350.0, height: 150.0)
        }
    }
}

struct AccelView: View {
    //initialize motionmanager
    @ObservedObject var motion: AccelMotionManager
    
    //design of gyroscope view
    var body: some View {
        VStack {
            HStack {
                Button("Start") {
                    motion.start()
                }
                .bold()
                .frame(width: 100, height:40)
                .background(Color.blue)
                .foregroundColor(Color.white)
                .cornerRadius(10)
                Button("Stop") {
                    motion.stop()
                }
                .bold()
                .frame(width: 100, height:40)
                .background(Color.blue)
                .foregroundColor(Color.white)
                .cornerRadius(10)
                .padding(.leading, 40.0)
            }
            .padding(.top, -80.0)
            Text("Beschleunigung x")
                .padding(.top, -20.0)
            Chart {
                ForEach(motion.x_series, id: \.date) { item in
                    LineMark(
                        x: .value("ID", item.date),
                        y: .value("value", item.value),
                        series: .value("dim","x")
                    )
                    .foregroundStyle(.red)
                }
            }
            .chartXAxisLabel(position: .bottom, alignment: .center) {
                Text("time")
            }
            .frame(width: 350.0, height: 150.0)
            Text("Beschleunigung y")
            Chart {
                ForEach(motion.y_series, id: \.date) { item in
                    LineMark(
                        x: .value("ID", item.date),
                        y: .value("value", item.value),
                        series: .value("dim","x")
                    )
                    .foregroundStyle(.orange)
                }
            }
            .chartXAxisLabel(position: .bottom, alignment: .center) {
                Text("time")
            }
            .frame(width: 350.0, height: 150.0)
            Text("Beschleunigung z")
            Chart {
                ForEach(motion.z_series, id: \.date) { item in
                    LineMark(
                        x: .value("ID", item.date),
                        y: .value("value", item.value),
                        series: .value("dim","x")
                    )
                    .foregroundStyle(.yellow)
                }
            }
            .chartXAxisLabel(position: .bottom, alignment: .center) {
                Text("time")
            }
            .frame(width: 350.0, height: 150.0)
        }
    }
}

struct MagnetView: View {
    //initialize motionmanager
    @ObservedObject var motion: MagneticFieldManager
    
    //design of gyroscope view
    var body: some View {
        VStack {
            HStack {
                Button("Start") {
                    motion.start()
                }
                .bold()
                .frame(width: 100, height:40)
                .background(Color.blue)
                .foregroundColor(Color.white)
                .cornerRadius(10)
                Button("Stop") {
                    motion.stop()
                }
                .bold()
                .frame(width: 100, height:40)
                .background(Color.blue)
                .foregroundColor(Color.white)
                .cornerRadius(10)
                .padding(.leading, 40.0)
            }
            .padding(.top, -80.0)
            Text("Magnetometer x")
                .padding(.top, -20.0)
            Chart {
                ForEach(motion.x_series, id: \.date) { item in
                    LineMark(
                        x: .value("ID", item.date),
                        y: .value("value", item.value),
                        series: .value("dim","x")
                    )
                    .foregroundStyle(.red)
                }
            }
            .chartXAxisLabel(position: .bottom, alignment: .center) {
                Text("time")
            }
            .frame(width: 350.0, height: 150.0)
            Text("Magnetometer y")
            Chart {
                ForEach(motion.y_series, id: \.date) { item in
                    LineMark(
                        x: .value("ID", item.date),
                        y: .value("value", item.value),
                        series: .value("dim","x")
                    )
                    .foregroundStyle(.orange)
                }
            }
            .chartXAxisLabel(position: .bottom, alignment: .center) {
                Text("time")
            }
            .frame(width: 350.0, height: 150.0)
            Text("Magnetometer z")
            Chart {
                ForEach(motion.z_series, id: \.date) { item in
                    LineMark(
                        x: .value("ID", item.date),
                        y: .value("value", item.value),
                        series: .value("dim","x")
                    )
                    .foregroundStyle(.yellow)
                }
            }
            .chartXAxisLabel(position: .bottom, alignment: .center) {
                Text("time")
            }
            .frame(width: 350.0, height: 150.0)
        }
    }
}

struct data_over_time {
    var date:Date
    var value:Double
}

class GyroMotionManager: ObservableObject {
    // MotionManager use the ObservableObject Combine property.
    private var motionManager: CMMotionManager
    let mqtt = MQTTSettings.shared
    
    @Published
    var x: Double = 0.0
    @Published
    var y: Double = 0.0
    @Published
    var z: Double = 0.0
    // x, y and z use are Published so ContentView can read the values when they update.
    
    @Published
    var x_series : [data_over_time] = []
    @Published
    var y_series : [data_over_time] = []
    @Published
    var z_series : [data_over_time] = []
    
    /*let client = MQTTClient(
        configuration: .init(
            target: .host("192.168.137.1", port: 1883)
        ),
        eventLoopGroupProvider: .createNew
    )*/

    func customAppend(date:Date, value_x:Double, value_y:Double, value_z:Double){
        x_series.append(data_over_time(date:date,value:value_x))
        y_series.append(data_over_time(date:date,value:value_y))
        z_series.append(data_over_time(date:date,value:value_z))
        if x_series.count > 400 {
            x_series.removeFirst()
            y_series.removeFirst()
            z_series.removeFirst()
        }
    }
    
    func start() {
        self.mqtt.client.connect()
        motionManager.startGyroUpdates(to: .main) { (gyroData, error) in
            guard error == nil else {
                print(error!)
                return
            }
            
            if let gyro = gyroData {
                self.x = gyro.rotationRate.x
                self.y = gyro.rotationRate.y
                self.z = gyro.rotationRate.z
                self.mqtt.client.publish(String(format: "%.3f", self.x), to:"gyro/x")
                self.mqtt.client.publish(String(format: "%.3f", self.y), to:"gyro/y")
                self.mqtt.client.publish(String(format: "%.3f", self.z), to:"gyro/z")
                self.customAppend(date:Date(),value_x:self.x,value_y:self.y,value_z:self.z)
            }
            
        }
    }
    
    func stop() {
        self.mqtt.client.disconnect()
        motionManager.stopGyroUpdates()
    }
    
    // init
    init() {
        self.motionManager = CMMotionManager()
        self.motionManager.gyroUpdateInterval = 1.0 / 30.0
    }
}

class AccelMotionManager: ObservableObject {
    // MotionManager use the ObservableObject Combine property.
    private var motionManager: CMMotionManager
    let mqtt = MQTTSettings.shared
    
    @Published
    var x: Double = 0.0
    @Published
    var y: Double = 0.0
    @Published
    var z: Double = 0.0
    // x, y and z use are Published so ContentView can read the values when they update.
    
    @Published
    var x_series : [data_over_time] = []
    @Published
    var y_series : [data_over_time] = []
    @Published
    var z_series : [data_over_time] = []
    
    /*let client = MQTTClient(
        configuration: .init(
            target: .host("192.168.137.1", port: 1883)
        ),
        eventLoopGroupProvider: .createNew
    )*/

    func customAppend(date:Date, value_x:Double, value_y:Double, value_z:Double){
        x_series.append(data_over_time(date:date,value:value_x))
        y_series.append(data_over_time(date:date,value:value_y))
        z_series.append(data_over_time(date:date,value:value_z))
        if x_series.count > 400 {
            x_series.removeFirst()
            y_series.removeFirst()
            z_series.removeFirst()
        }
    }
    
    func start() {
        self.mqtt.client.connect()
        motionManager.startAccelerometerUpdates(to: .main) { (accelData, error) in
            guard error == nil else {
                print(error!)
                return
            }
            
            if let accel = accelData {
                self.x = accel.acceleration.x * 9.81
                self.y = accel.acceleration.y * 9.81
                self.z = accel.acceleration.z * 9.81
                self.mqtt.client.publish(String(format: "%.3f", self.x), to:"accel/x")
                self.mqtt.client.publish(String(format: "%.3f", self.y), to:"accel/y")
                self.mqtt.client.publish(String(format: "%.3f", self.z), to:"accel/z")
                self.customAppend(date:Date(),value_x:self.x,value_y:self.y,value_z:self.z)
            }
            
        }
    }
    
    func stop() {
        self.mqtt.client.disconnect()
        motionManager.stopAccelerometerUpdates()
    }
    
    // init
    init() {
        self.motionManager = CMMotionManager()
        self.motionManager.accelerometerUpdateInterval = 1.0 / 30.0
    }
}

class MagneticFieldManager: ObservableObject {
    // MotionManager use the ObservableObject Combine property.
    private var motionManager: CMMotionManager
    let mqtt = MQTTSettings.shared
    
    @Published
    var x: Double = 0.0
    @Published
    var y: Double = 0.0
    @Published
    var z: Double = 0.0
    // x, y and z use are Published so ContentView can read the values when they update.
    
    @Published
    var x_series : [data_over_time] = []
    @Published
    var y_series : [data_over_time] = []
    @Published
    var z_series : [data_over_time] = []
    
    /*let client = MQTTClient(
        configuration: .init(
            target: .host("192.168.137.1", port: 1883)
        ),
        eventLoopGroupProvider: .createNew
    )*/

    func customAppend(date:Date, value_x:Double, value_y:Double, value_z:Double){
        x_series.append(data_over_time(date:date,value:value_x))
        y_series.append(data_over_time(date:date,value:value_y))
        z_series.append(data_over_time(date:date,value:value_z))
        if x_series.count > 400 {
            x_series.removeFirst()
            y_series.removeFirst()
            z_series.removeFirst()
        }
    }
    
    func start() {
        self.mqtt.client.connect()
        motionManager.startMagnetometerUpdates(to: .main) { (magnetData, error) in
            guard error == nil else {
                print(error!)
                return
            }
            
            if let magnet = magnetData {
                self.x = magnet.magneticField.x
                self.y = magnet.magneticField.y
                self.z = magnet.magneticField.z
                self.mqtt.client.publish(String(format: "%.3f", self.x), to:"magnet/x")
                self.mqtt.client.publish(String(format: "%.3f", self.y), to:"magnet/y")
                self.mqtt.client.publish(String(format: "%.3f", self.z), to:"magnet/z")
                self.customAppend(date:Date(),value_x:self.x,value_y:self.y,value_z:self.z)
            }
            
        }
    }
    
    func stop() {
        self.mqtt.client.disconnect()
        motionManager.stopMagnetometerUpdates()
    }
    
    // init
    init() {
        self.motionManager = CMMotionManager()
        self.motionManager.magnetometerUpdateInterval = 1.0 / 30.0
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
