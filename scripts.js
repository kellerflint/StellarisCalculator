// Constant values
var systemCost = .02;
var planetCost = .05;

// Globals
var pacifistMod = 0;

var genSciMod = 0;

var basePHY = 0;
var basePHY = 0;
var basePHY = 0;

var sigSystems = 0;
var sigPlanets = 0;

function main() {
  update();
  sysSciReq();
  displayResearchRate();
  clearGains();
}

function update() {
  pacifistMod = document.getElementById("i_pacifist").value;
  genSciMod = document.getElementById("i_genSciMod").value;

  basePHY = document.getElementById("i_basePHY").value;
  baseSOC = document.getElementById("i_baseSOC").value;
  baseENG = document.getElementById("i_baseENG").value;

  sigSystems = document.getElementById("i_systemNum").value;
  sigPlanets = document.getElementById("i_planetNum").value;

  // To integer (find a less stupid way to do this)
  basePHY = + basePHY;
  baseSOC = + baseSOC;
  baseENG = + baseENG;

  // Change user input to internal format
  pacifistMod = 1 + (pacifistMod * .05);
  genSciMod = 1 + (genSciMod * .01);

  // Remove free planet and system
  sigSystems = sigSystems - 1;
  sigPlanets = sigPlanets - 1;

}

function sysSciReq() {

  var difference = 1;

  var originalRates = researchRate(basePHY, baseSOC, baseENG, 0);

  var reqSciPerSys = 1;

  // Calcuations
  while (difference > 0) {

    var originalRates = researchRate(physics, society, engineering, 0);
    document.getElementById("output5").innerHTML = "originalRates " + originalRates;

    var physics = (parseFloat(document.getElementById("i_addPHY").value) * pacifistMod) + parseFloat(document.getElementById("i_basePHY").value);
    var society = (parseFloat(document.getElementById("i_addSOC").value) * pacifistMod) + parseFloat(document.getElementById("i_baseSOC").value);
    var engineering = (parseFloat(document.getElementById("i_addENG").value) * pacifistMod) + parseFloat(document.getElementById("i_baseENG").value);


    var newRates = researchRate(physics, society, engineering, 1);

    difference = originalRates[0] - newRates[0];

    if (difference > 0) {
      reqSciPerSys = reqSciPerSys + 1;
    }
  }
  document.getElementById("reqSciPerSys").innerHTML = "Average System Science: " + reqSciPerSys;
}

function displayResearchRate() {
  var physics = document.getElementById("i_basePHY").value;
  var society = document.getElementById("i_baseSOC").value;
  var engineering = document.getElementById("i_baseENG").value;

  var physics = + physics;
  var society = + society;
  var engineering = + engineering;

  rates = researchRate(physics, society, engineering, 0);

  document.getElementById("avgResearchRate").innerHTML = "Average Research Rate: " + (Math.round(rates[0] * 10)/10);
  document.getElementById("phyResearchRate").innerHTML = "&ensp; &ensp; Physics Rate: " + (Math.round(rates[1] * 10)/10);
  document.getElementById("socResearchRate").innerHTML = "&ensp; &ensp; Society Rate: " + (Math.round(rates[2] * 10)/10);
  document.getElementById("engResearchRate").innerHTML = "&ensp; &ensp; Engineering Rate: " + (Math.round(rates[3] * 10)/10);
}

// change = x where x is number of added systems, 0 for no change calculation and -x for removing a system
// physics, society and engineering are add/remove values (if any)
function researchRate(physics, society, engineering, change) {

  var rateSystems = sigSystems + change;

  var penalty = 1 + ((planetCost * sigPlanets) +
                     (systemCost * rateSystems));

  document.getElementById("output7").innerHTML = "pen " + penalty;

  var avgResearch = (basePHY + baseSOC + baseENG) +
                    (physics + society + engineering);

  var researchRate = 1/(penalty/(avgResearch * genSciMod));

  var phyResearchRate = 1/(penalty/((basePHY+physics)*genSciMod));
  var socResearchRate = 1/(penalty/((baseSOC+society)*genSciMod));
  var engResearchRate = 1/(penalty/((baseENG+engineering)*genSciMod));

  return [researchRate, phyResearchRate, socResearchRate, engResearchRate];

}

function addSystem() {

  // Zeros out values from removal to avoid unclear results
  document.getElementById("i_removePHY").value = 0;
  document.getElementById("i_removeSOC").value = 0;
  document.getElementById("i_removeENG").value = 0;

  var originalRates = researchRate(0, 0, 0, 0);

  var physics = parseFloat(document.getElementById("i_addPHY").value) * pacifistMod;
  var society = parseFloat(document.getElementById("i_addSOC").value) * pacifistMod;
  var engineering = parseFloat(document.getElementById("i_addENG").value) * pacifistMod;

  var newRates = researchRate(physics, society, engineering, 1);

  // Colored Display

  var difference = newRates[0] - originalRates[0];
  if (difference > 0) {
    document.getElementById("averageGain").style.color = "#004505";
    document.getElementById("averageGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }
  if (difference < 0) {
    document.getElementById("averageGain").style.color = "red";
    document.getElementById("averageGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }

  difference = newRates[1] - originalRates[1];
  if (difference > 0) {
    document.getElementById("physicsGain").style.color = "#004505";
    document.getElementById("physicsGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }
  if (difference < 0) {
    document.getElementById("physicsGain").style.color = "red";
    document.getElementById("physicsGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }

  difference = newRates[2] - originalRates[2];
  if (difference > 0) {
    document.getElementById("societyGain").style.color = "#004505";
    document.getElementById("societyGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }
  if (difference < 0) {
    document.getElementById("societyGain").style.color = "red";
    document.getElementById("societyGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }

  difference = newRates[3] - originalRates[3];
  if (difference > 0) {
    document.getElementById("engineeringGain").style.color = "#004505";
    document.getElementById("engineeringGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }
  if (difference < 0) {
    document.getElementById("engineeringGain").style.color = "red";
    document.getElementById("engineeringGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }

}

function removeSystem() {

  // Zeros out values from addition to avoid unclear results
  document.getElementById("i_addPHY").value = 0;
  document.getElementById("i_addSOC").value = 0;
  document.getElementById("i_addENG").value = 0;

  var originalRates = researchRate(0, 0, 0, 0);

  var physics = parseFloat(document.getElementById("i_basePHY").value);
  var society = parseFloat(document.getElementById("i_baseSOC").value);
  var engineering = parseFloat(document.getElementById("i_baseENG").value);

  var newRates = researchRate(physics, society, engineering, -1);

  // Colored Display

  var difference = newRates[0] - originalRates[0];
  if (difference > 0) {
    document.getElementById("averageGain").style.color = "#004505";
    document.getElementById("averageGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }
  if (difference < 0) {
    document.getElementById("averageGain").style.color = "red";
    document.getElementById("averageGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }

  difference = newRates[1] - originalRates[1];
  if (difference > 0) {
    document.getElementById("physicsGain").style.color = "#004505";
    document.getElementById("physicsGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }
  if (difference < 0) {
    document.getElementById("physicsGain").style.color = "red";
    document.getElementById("physicsGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }

  difference = newRates[2] - originalRates[2];
  if (difference > 0) {
    document.getElementById("societyGain").style.color = "#004505";
    document.getElementById("societyGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }
  if (difference < 0) {
    document.getElementById("societyGain").style.color = "red";
    document.getElementById("societyGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }

  difference = newRates[3] - originalRates[3];
  if (difference > 0) {
    document.getElementById("engineeringGain").style.color = "#004505";
    document.getElementById("engineeringGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }
  if (difference < 0) {
    document.getElementById("engineeringGain").style.color = "red";
    document.getElementById("engineeringGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }

}

// Clear functions

function clearGains() {
  document.getElementById("averageGain").innerHTML = "";
  document.getElementById("physicsGain").innerHTML = "";
  document.getElementById("societyGain").innerHTML = "";
  document.getElementById("engineeringGain").innerHTML = "";
}

function clearAll() {
  document.getElementById("averageGain").innerHTML = "";
  document.getElementById("physicsGain").innerHTML = "";
  document.getElementById("societyGain").innerHTML = "";
  document.getElementById("engineeringGain").innerHTML = "";

  document.getElementById("reqSciPerSys").innerHTML = "Average System Science: ";
  document.getElementById("avgResearchRate").innerHTML = "Average Research Rate: ";
  document.getElementById("phyResearchRate").innerHTML = "&ensp; &ensp; Physics Rate: ";
  document.getElementById("socResearchRate").innerHTML = "&ensp; &ensp; Society Rate: ";
  document.getElementById("engResearchRate").innerHTML = "&ensp; &ensp; Engineering Rate: ";
}

// Dropdown actions

function dropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
  }
}
