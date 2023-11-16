  //lists for pages and sites
  sites = ["divMain", "divSettings", "divNavigation"];
  active = 0; 
  headings = ["Daten - Exponat Prototyp", "Einstellungen"];
  basic_sites = ["gyro", "accel", "magnet", "audio", "login"]; 

  //function to open the navigation bar
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  //function to close the navigation bar
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  //function to open a window by an index 
  function openWindow(idx) {
    document.getElementById("overlay").style.display = "block";
    for(i = 0; i < basic_sites.length; i++){
      document.getElementById(basic_sites[i]).style.display = "none";
    }
    document.getElementById(basic_sites[idx]).style.display = "block";
    if (basic_sites[idx] == "login"){
      phone_id = (Math.random() + 1).toString(36).substring(3);
      initMQTT(0);
      generateQR(host, phone_id);
    }
  }

  //function to close the window 
  function closeWindow(event) {
    if (event.target.id === "overlay" || event.target.tagName === "BUTTON") {
      document.getElementById("overlay").style.display = "none";
    }
  }

  //function to prevent closing of the window while clicking on it
  function preventClosing(event) {
    event.stopPropagation();
  }

  //function to switch the site by an index 
  function switchSite(id) {
    if (id == active){
      return; 
    }
    for (i = 0; i < sites.length; i++){
      document.getElementById(sites[i]).style.display = "none";
    }
    document.getElementById(sites[id]).style.display = "block"; 
    if (sites[id] == "divSettings" || sites[id] == "divMain"){
      document.getElementById("heading").innerHTML = headings[id]; 
    } 
    active = id;  
    closeNav(); 
  }