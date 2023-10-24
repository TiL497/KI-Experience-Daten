  sites = ["divMain", "divSettings", "divNavigation"];
  active = 0; 
  headings = ["Daten - Exponat Prototyp", "Einstellungen"];
  basic_sites = ["gyro", "accel", "magnet", "audio"]; 

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  function openWindow(idx) {
    document.getElementById("overlay").style.display = "block";
    for(i = 0; i < basic_sites.length; i++){
      document.getElementById(basic_sites[i]).style.display = "none";
    }
    document.getElementById(basic_sites[idx]).style.display = "block";
  }

  function closeWindow(event) {
    if (event.target.id === "overlay" || event.target.tagName === "BUTTON") {
      document.getElementById("overlay").style.display = "none";
    }
  }

  function preventClosing(event) {
    event.stopPropagation();
  }

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