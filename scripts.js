function sysSciReq() {
  // Constant values
  var systemCost = .02;
  var planetCost = .05;

  // Retrieve form values
  var pacifistMod = document.getElementById("i_pacifist").value;
  var avgBaseCost = document.getElementById("i_avgBaseCost").value;
  var genSciMod = document.getElementById("i_genSciMod").value;

  var sigSystems = document.getElementById("i_systemNum").value;
  var sigPlanets = document.getElementById("i_planetNum").value;

  var basePHY = document.getElementById("i_basePHY").value;
  var baseSOC = document.getElementById("i_baseSOC").value;
  var baseENG = document.getElementById("i_baseENG").value;

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

    document.getElementById("output1").innerHTML = "reqSciPerSys/3: " + ((reqSciPerSys/3));

    document.getElementById("output2").innerHTML = "basePHY: " + basePHY;

    document.getElementById("output3").innerHTML = "pacifistMod: " + pacifistMod;

    document.getElementById("output4").innerHTML = "genSciMod: " + genSciMod;

    document.getElementById("output5").innerHTML = "full: " + ((basePHY + ((reqSciPerSys/3) * pacifistMod))*genSciMod);

    document.getElementById("output6").innerHTML = "type of base: " + (typeof basePHY);

    document.getElementById("output7").innerHTML = "type of base: " + (typeof newCost);

    difference = newCost - originalCost;

    document.getElementById("output8").innerHTML = "diff " + difference;

    if (difference > 0) {
        reqSciPerSys = reqSciPerSys + 1;
    }
}

document.getElementById("result").innerHTML = "New systems require a minimum of " + reqSciPerSys + " science to break even after tech penalty."




}
