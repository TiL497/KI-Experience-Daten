//
//  CustomTabBar.swift
//  Gyrosensor
//
//  Created by Timo on 22.08.23.
//

import SwiftUI

enum Tab: String, CaseIterable {
    case gyroscope
    case accel
    case magnet
    case mic
    case gear
}

struct CustomTabBar: View {
    
    @Binding var selectedTab: Tab
    @State private var idx = 0
    @State private var tabIcon = "gyroscope"
    
    var body: some View {
        VStack {
            HStack {
                Spacer()
                Image(systemName: "arrowshape.backward.fill")
                    .foregroundColor(.blue)
                    .font(.system(size: 22))
                    .onTapGesture {
                        withAnimation(.easeIn(duration: 0.1)) {
                            if idx > 0 {
                                idx = idx - 1
                                tabIcon = "gyroscope"
                                switch idx {
                                    case 0:
                                        selectedTab = Tab.gyroscope
                                    case 1:
                                        selectedTab = Tab.accel
                                    case 2:
                                        selectedTab = Tab.magnet
                                    case 3:
                                        selectedTab = Tab.mic
                                        tabIcon = "mic"
                                    case 4:
                                        selectedTab = Tab.gear
                                        tabIcon = "gear"
                                    default:
                                        selectedTab = Tab.gyroscope
                                }
                            }
                        }
                    }
                Spacer()
                Spacer()
                Image(systemName: tabIcon)
                    .foregroundColor(.blue)
                    .font(.system(size: 22))
                Spacer()
                Spacer()
                Image(systemName: "arrowshape.forward.fill")
                    .foregroundColor(.blue)
                    .font(.system(size: 22))
                    .onTapGesture {
                        withAnimation(.easeIn(duration: 0.1)) {
                            if idx < 4 {
                                idx = idx + 1
                                tabIcon = "gyroscope"
                                switch idx {
                                    case 0:
                                        selectedTab = Tab.gyroscope
                                    case 1:
                                        selectedTab = Tab.accel
                                    case 2:
                                        selectedTab = Tab.magnet
                                    case 3:
                                        selectedTab = Tab.mic
                                        tabIcon = "mic"
                                    case 4:
                                        selectedTab = Tab.gear
                                        tabIcon = "gear"
                                    default:
                                        selectedTab = Tab.gyroscope
                                }
                            }
                        }
                    }
                Spacer()
                /*ForEach(Tab.allCases, id: \.rawValue) { tab in
                    Spacer()
                    Image(systemName: tab.rawValue)
                        .scaleEffect(selectedTab == tab ? 1.25 : 1.0)
                        .foregroundColor(selectedTab == tab ? .blue : .black)
                        .font(.system(size: 22))
                        .onTapGesture {
                            withAnimation(.easeIn(duration: 0.1)) {
                                selectedTab = tab
                            }
                        }
                    Spacer()
                }*/
            }
            .frame(width: nil, height:60)
            .background(.thinMaterial)
            .cornerRadius(10)
            .padding()
        }
    }
}

struct CustomTabBar_Previews: PreviewProvider {
    static var previews: some View {
        CustomTabBar(selectedTab: .constant(.gyroscope))
    }
}
