"use strict";

// Constant values
let systemCost = .01;
let planetCost = .05;

let tierFiveBaseCost = 20000;

// Globals
let pacifistMod = 0;

let genSciMod = 0;

let basePHY = 5;
let baseSOC = 5;
let baseENG = 5;

let sigSystems = 1;
let sigPlanets = 1;

function main() {
  update();
  sysSciReq();
  displayResearchRate();
  displayResearchTimes();
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

  let difference = 1;

  let originalRates = researchRate(basePHY, baseSOC, baseENG, 0);

  let reqSciPerSys = 1;

  // Calcuations
  while (difference > 0) {

    originalRates = researchRate(0, 0, 0, 0);
    //document.getElementById("output1").innerHTML = "originalRates " + originalRates;

    let physics = (1/3) * reqSciPerSys;
    let society = (1/3) * reqSciPerSys;
    let engineering = (1/3) * reqSciPerSys;


    let newRates = researchRate(physics, society, engineering, 1);

    difference = originalRates[0] - newRates[0];

    if (difference > 0) {
      reqSciPerSys = reqSciPerSys + 1;
    }
  }
  document.getElementById("reqSciPerSys").innerHTML = "<b>Minimum System Science:</b> " + reqSciPerSys;
}

function displayResearchRate() {

  let rates = researchRate(0, 0, 0, 0);

  document.getElementById("avgResearchRate").innerHTML = "<b>Research Rate:</b> " + (Math.round(rates[0] * 10)/10);
  document.getElementById("phyResearchRate").innerHTML = "&ensp; &ensp; Physics: " + (Math.round(rates[1] * 10)/10);
  document.getElementById("socResearchRate").innerHTML = "&ensp; &ensp; Society: " + (Math.round(rates[2] * 10)/10);
  document.getElementById("engResearchRate").innerHTML = "&ensp; &ensp; Engineering: " + (Math.round(rates[3] * 10)/10);
}

function displayResearchTimes() {
  let times = researchTimes(0, 0, 0, 0);

  document.getElementById("phyResearchTime").innerHTML = "&ensp; &ensp; Physics (months): " + (Math.round(times[0] * 10)/10);
  document.getElementById("socResearchTime").innerHTML = "&ensp; &ensp; Society (months): " + (Math.round(times[1] * 10)/10);
  document.getElementById("engResearchTime").innerHTML = "&ensp; &ensp; Engineering (months): " + (Math.round(times[2] * 10)/10);
}

// change = x where x is number of added systems, 0 for no change calculation and -x for removing a system
// physics, society and engineering are add/remove values (if any)
function researchRate(physics, society, engineering, change) {

  let rateSystems = sigSystems + change;

  let penalty = 1 + ((planetCost * sigPlanets) +
                     (systemCost * rateSystems));

  let avgResearch = (basePHY + baseSOC + baseENG) +
                    (physics + society + engineering);

  let researchRate = 1/(penalty/(avgResearch * genSciMod));

  let phyResearchRate = 1/(penalty/((basePHY+physics)*genSciMod));
  let socResearchRate = 1/(penalty/((baseSOC+society)*genSciMod));
  let engResearchRate = 1/(penalty/((baseENG+engineering)*genSciMod));

  return [researchRate, phyResearchRate, socResearchRate, engResearchRate];

}

// Returns research times for 5th tier technologies for each category
function researchTimes(physics, society, engineering, change) {

  let rateSystems = sigSystems + change;

  let penalty = 1 + (rateSystems * systemCost) + (sigPlanets * planetCost);

  let totalCost = tierFiveBaseCost * penalty;

  document.getElementById("output1").innerHTML = totalCost;
  document.getElementById("output2").innerHTML = tierFiveBaseCost;
  document.getElementById("output3").innerHTML = penalty;
  document.getElementById("output4").innerHTML = sigSystems;
  document.getElementById("output5").innerHTML = change;

  let totalPhysics = (basePHY + physics) * genSciMod;
  let totalSociety = (baseSOC + society) * genSciMod;
  let totalEngineering = (baseENG + engineering) * genSciMod;

  let physicsMonths = totalCost/totalPhysics;
  let societyMonths = totalCost/totalSociety;
  let engineeringMonths = totalCost/totalEngineering;

  return [physicsMonths, societyMonths, engineeringMonths];

}

function addSystem() {

  // Zeros out values from removal to avoid unclear results
  document.getElementById("i_removePHY").value = 0;
  document.getElementById("i_removeSOC").value = 0;
  document.getElementById("i_removeENG").value = 0;

  let originalRates = researchRate(0, 0, 0, 0);

  let physics = parseFloat(document.getElementById("i_addPHY").value) * pacifistMod;
  let society = parseFloat(document.getElementById("i_addSOC").value) * pacifistMod;
  let engineering = parseFloat(document.getElementById("i_addENG").value) * pacifistMod;

  let newRates = researchRate(physics, society, engineering, 1);

  // Colored Display

  let difference = newRates[0] - originalRates[0];
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

  let originalRates = researchRate(0, 0, 0, 0);

  let physics = -1 * (parseFloat(document.getElementById("i_removePHY").value) * pacifistMod);
  let society = -1 * (parseFloat(document.getElementById("i_removeSOC").value) * pacifistMod);
  let engineering = -1 * (parseFloat(document.getElementById("i_removeENG").value) * pacifistMod);

  let newRates = researchRate(physics, society, engineering, -1);

  // Colored Display

  let difference = newRates[0] - originalRates[0];
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

  document.getElementById("reqSciPerSys").innerHTML = "Minimum System Science: ";
  document.getElementById("avgResearchRate").innerHTML = "Combined Research Rates: ";
  document.getElementById("phyResearchRate").innerHTML = "&ensp; &ensp; Physics Rate: ";
  document.getElementById("socResearchRate").innerHTML = "&ensp; &ensp; Society Rate: ";
  document.getElementById("engResearchRate").innerHTML = "&ensp; &ensp; Engineering Rate: ";

  document.getElementById("phyResearchTime").innerHTML = "&ensp; &ensp; Physics (months): ";
  document.getElementById("socResearchTime").innerHTML = "&ensp; &ensp; Society (months): ";
  document.getElementById("engResearchTime").innerHTML = "&ensp; &ensp; Engineering (months): ";
}

// Dropdown actions

function dropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.addEventListener('click', function(e) {
  if (!e.target.matches('.dropbtn')) {
    let myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
  }
});
