// Constant values
var systemCost = .02;
var planetCost = .05;

function main() {
  sysSciReq();
  displayResearchRate();
}

/* Done in terms of GENERIC Science. Assumes equal distribution of each type in system.
 * Doesn't mean improvement in science score, just in time to research (so one low aera will skew results)
 * i.e. 1000 phy 1000 soc and 30 eng would only require 2 systems to break even. This makes your average research
 * slower but since the algorithm assumes that each tech costs the same amount and a third of the science gained
 * is of each type, gaining .66 society would drastically improve average research time. However if none of the
 * science that you would gain is society, it isn't worth taking.
 */
function sysSciReq() {

  // Retrieve form values
  var pacifistMod = document.getElementById("i_pacifist").value;
  var avgBaseCost = 1000;
  var genSciMod = document.getElementById("i_genSciMod").value;

  var sigSystems = document.getElementById("i_systemNum").value;
  var sigPlanets = document.getElementById("i_planetNum").value;

  var basePHY = document.getElementById("i_basePHY").value;
  var baseSOC = document.getElementById("i_baseSOC").value;
  var baseENG = document.getElementById("i_baseENG").value;

  // To integer (find a less stupid way to do this)
  basePHY = + basePHY;
  baseSOC = + baseSOC;
  baseENG = + baseENG;

  // Change user input to internal format
  pacifistMod = 1 + (pacifistMod * .05);
  genSciMod = 1 + (genSciMod * .01);

  sigSystems = sigSystems - 1;
  sigPlanets = sigPlanets - 1;

  var difference = 1;

  var reqSciPerSys = 1;

  // Calcuations
  while (difference > 0) {

    // ---Original cost---

    // Calculate total research penalty
    var penalty = 1 + ((planetCost * sigPlanets) +
                       (systemCost * sigSystems));
    // Calculate actual research cost
    var avgTechCost = penalty * avgBaseCost;

    // Approximate combined average research
    var avgResearch = (1/(basePHY * genSciMod)) +
                      (1/(baseSOC * genSciMod)) +
                      (1/(baseENG * genSciMod));

    // OriginalCost is in months (average to complete level of research)
    var originalCost = avgTechCost * avgResearch; // where avgResearch < 1;
    // ---New cost---

    // Additional system incurs system science penalty
    penalty = penalty + systemCost;

    avgTechCost = penalty * avgBaseCost;

    avgResearch =  (1/((basePHY + ((reqSciPerSys/3) * pacifistMod))*genSciMod)) +
                   (1/((baseSOC + ((reqSciPerSys/3) * pacifistMod))*genSciMod)) +
                   (1/((baseENG + ((reqSciPerSys/3) * pacifistMod))*genSciMod));

    var newCost = avgTechCost * avgResearch;

    // Test code
    document.getElementById("output1").innerHTML = "reqSciPerSys/3: " + ((reqSciPerSys/3));
    document.getElementById("output2").innerHTML = "basePHY: " + basePHY;
    document.getElementById("output3").innerHTML = "pacifistMod: " + pacifistMod;
    document.getElementById("output4").innerHTML = "genSciMod: " + genSciMod;
    document.getElementById("output5").innerHTML = "full: " + ((basePHY + ((reqSciPerSys/3) * pacifistMod))*genSciMod);

    difference = newCost - originalCost;

    document.getElementById("output6").innerHTML = "diff " + difference;

    if (difference > 0) {
      reqSciPerSys = reqSciPerSys + 1;
    }
  }
  document.getElementById("reqSciPerSys").innerHTML = "Average System Science (to break even): " + reqSciPerSys;
}

function displayResearchRate() {
  var physics = document.getElementById("i_basePHY").value;
  var society = document.getElementById("i_baseSOC").value;
  var engineering = document.getElementById("i_baseENG").value;

  rates = researchRate(physics, society, engineering, 0);

  document.getElementById("avgResearchRate").innerHTML = "Average Research Rate: " + (Math.round(rates[0] * 10)/10);
  document.getElementById("phyResearchRate").innerHTML = "Physics Rate: " + (Math.round(rates[1] * 10)/10);
  document.getElementById("socResearchRate").innerHTML = "Society Rate: " + (Math.round(rates[2] * 10)/10);
  document.getElementById("engResearchRate").innerHTML = "Engineering Rate: " + (Math.round(rates[3] * 10)/10);
}

// isChange 1 for adding a system, 0 for not a change calculation and -1 for removing a system
function researchRate(physics, society, engineering, isChange) {
  var genSciMod = document.getElementById("i_genSciMod").value;

  var sigSystems = document.getElementById("i_systemNum").value;
  var sigPlanets = document.getElementById("i_planetNum").value;

  var basePHY = physics;
  var baseSOC = society;
  var baseENG = engineering;

  // To integer
  basePHY = + basePHY;
  baseSOC = + baseSOC;
  baseENG = + baseENG;

  genSciMod = 1 + (genSciMod * .01);

  sigSystems = sigSystems - 1 + isChange;
  sigPlanets = sigPlanets - 1;

  var penalty = 1 + ((planetCost * sigPlanets) +
                     (systemCost * sigSystems));

  document.getElementById("output7").innerHTML = "pen " + penalty;

  var avgResearch = baseENG + basePHY + baseSOC;

  var researchRate = 1/(penalty/(avgResearch * genSciMod));

  var phyResearchRate = 1/(penalty/(basePHY*genSciMod));
  var socResearchRate = 1/(penalty/(baseSOC*genSciMod));
  var engResearchRate = 1/(penalty/(baseENG*genSciMod));

  return [researchRate, phyResearchRate, socResearchRate, engResearchRate];

}

function addSystem() {

  var pacifistMod = parseFloat(document.getElementById("i_pacifist").value);

  pacifistMod = 1 + (pacifistMod * .05);

  var physics = document.getElementById("i_basePHY").value;
  var society = document.getElementById("i_baseSOC").value;
  var engineering = document.getElementById("i_baseENG").value;

  var originalRates = researchRate(physics, society, engineering, 0);
  document.getElementById("output5").innerHTML = "originalRates " + originalRates;


  physics = (parseFloat(document.getElementById("i_addPHY").value) * pacifistMod) + parseFloat(document.getElementById("i_basePHY").value);
  society = (parseFloat(document.getElementById("i_addSOC").value) * pacifistMod) + parseFloat(document.getElementById("i_baseSOC").value);
  engineering = (parseFloat(document.getElementById("i_addENG").value) * pacifistMod) + parseFloat(document.getElementById("i_baseENG").value);

  var newRates = researchRate(physics, society, engineering, 1);
  document.getElementById("output7").innerHTML = "newRates " + newRates;

  var difference = newRates[0] - originalRates[0];
  if (difference > 0) {
    document.getElementById("averageGain").style.color = "green";
    document.getElementById("averageGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }
  if (difference < 0) {
    document.getElementById("averageGain").style.color = "red";
    document.getElementById("averageGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }

  difference = newRates[1] - originalRates[1];
  if (difference > 0) {
    document.getElementById("physicsGain").style.color = "green";
    document.getElementById("physicsGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }
  if (difference < 0) {
    document.getElementById("physicsGain").style.color = "red";
    document.getElementById("physicsGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }

  difference = newRates[2] - originalRates[2];
  if (difference > 0) {
    document.getElementById("societyGain").style.color = "green";
    document.getElementById("societyGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }
  if (difference < 0) {
    document.getElementById("societyGain").style.color = "red";
    document.getElementById("societyGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }

  difference = newRates[3] - originalRates[3];
  if (difference > 0) {
    document.getElementById("engineeringGain").style.color = "green";
    document.getElementById("engineeringGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }
  if (difference < 0) {
    document.getElementById("engineeringGain").style.color = "red";
    document.getElementById("engineeringGain").innerHTML = " (" + Math.round(difference * 10)/10 + ")";
  }



}

function removeSystem() {

}
