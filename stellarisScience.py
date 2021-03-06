#!/usr/bin/env python3

# This is the original (and very incomplete) version of this project that I did in python. Not part of the web project.

# pre: does NOT include stored science in monthly progress
import sys

def monthsCost():
    print("This calculates the combined cost in months of all given research.")

    phyTotalCost = float(input("\nPhysics total cost: "))
    socTotalCost = float(input("Society total cost: "))
    engTotalCost = float(input("Engineering total cost: "))

    phyMonthProg = float(input("\nPhysics monthly progress: "))
    socMonthProg = float(input("Society monthly progress: "))
    engMonthProg = float(input("Engineering monthly progress: "))

    totalMonths = (phyTotalCost/phyMonthProg) + (socTotalCost/socMonthProg) + (engTotalCost/engMonthProg)

    print(f"\nTotal Months = {totalMonths}")


def addSystem():
    systemCost = .02
    planetCost = .05
    pacifistDegree = int(input("What degree of pacifist are you? (0-Not pacifist; 1-pacifist; 2-Fanatic pacifist): "))

    pacifistMod = 1 + (pacifistDegree * .05)

    sigSystems = int(input("\nTotal number of systems (before addition): "))
    sigPlanets = int(input("Total number of planets: "))

    sigSystems -= 1
    sigPlanets -= 1

    phyBaseCost = float(input("\nPhysics base cost: "))
    socBaseCost = float(input("Society base cost: "))
    engBaseCost = float(input("Engineering base cost: "))

    # Amount of Science in the system (NOT including modifiers)
    phySciVal = float(input("\nSystem science value (Physics): "))
    socSciVal = float(input("System science value (Society): "))
    engSciVal = float(input("System science value (Engineering): "))

    # Science percent modifiers from research tab
    phySciMod = float(input("\nPhysics science modifier (Integer): "))
    socSciMod = float(input("Society science modifier (Integer): "))
    engSciMod = float(input("Engineering science modifier (Integer): "))

    # Base Science gain
    phyBaseGain = float(input("\nPhysics science base gain: "))
    socBaseGain = float(input("Society science base gain: "))
    engBaseGain = float(input("Engineering Science base gain: "))

    phySciMod *= .01
    socSciMod *= .01
    engSciMod *= .01

    phySciMod += 1
    socSciMod += 1
    engSciMod += 1

    # oldCost and newCost are in months (time to complete total research)

    penalty = 1 + ((planetCost * sigPlanets) +\
              (systemCost * sigSystems))

    oldCost = ((phyBaseCost * penalty)/(phyBaseGain * phySciMod)) +\
              ((socBaseCost * penalty)/(socBaseGain * socSciMod)) +\
              ((engBaseCost * penalty)/(engBaseGain * engSciMod))

    phyTotal = (phyBaseGain + (phySciVal * pacifistMod)) * phySciMod
    socTotal = (socBaseGain + (socSciVal * pacifistMod)) * socSciMod
    engTotal = (engBaseGain + (engSciVal * pacifistMod)) * engSciMod

    # Adds new system to penalty
    penalty += systemCost

    newCost = ((phyBaseCost * penalty)/phyTotal) +\
              ((socBaseCost * penalty)/socTotal) +\
              ((engBaseCost * penalty)/engTotal)

    difference = newCost - oldCost

    if difference < 0:
        print(f'\nAdding this system will DECREASE total research time by {-difference}')
    else:
        print(f'\nAdding this system will INCREASE total research time by {difference}')


def removeSystem():
    systemCost = .02
    planetCost = .05
    pacifistDegree = int(input("What degree of pacifist are you? (0-Not pacifist; 1-pacifist; 2-Fanatic pacifist): "))

    pacifistMod = 1 + (pacifistDegree * .05)

    sigSystems = int(input("\nTotal number of systems (before removal): "))
    sigPlanets = int(input("Total number of planets: "))

    sigSystems -= 1
    sigPlanets -= 1

    phyBaseCost = float(input("\nPhysics base cost: "))
    socBaseCost = float(input("Society base cost: "))
    engBaseCost = float(input("Engineering base cost: "))

    # Amount of Science in the system (NOT including modifiers)
    phySciVal = float(input("\nSystem science value (Physics): "))
    socSciVal = float(input("System science value (Society): "))
    engSciVal = float(input("System science value (Engineering): "))

    # Science percent modifiers from research tab
    phySciMod = float(input("\nPhysics science modifier (Integer): "))
    socSciMod = float(input("Society science modifier (Integer): "))
    engSciMod = float(input("Engineering science modifier (Integer): "))

    # Base Science gain
    phyBaseGain = float(input("\nPhysics science base gain: "))
    socBaseGain = float(input("Society science base gain: "))
    engBaseGain = float(input("Engineering Science base gain: "))

    phySciMod *= .01
    socSciMod *= .01
    engSciMod *= .01

    phySciMod += 1
    socSciMod += 1
    engSciMod += 1

    # oldCost and newCost are in months (time to complete total research)

    penalty = 1 + ((planetCost * sigPlanets) +\
              (systemCost * sigSystems))

    oldCost = ((phyBaseCost * penalty)/(phyBaseGain * phySciMod)) +\
              ((socBaseCost * penalty)/(socBaseGain * socSciMod)) +\
              ((engBaseCost * penalty)/(engBaseGain * engSciMod))

    phyTotal = (phyBaseGain - (phySciVal * pacifistMod)) * phySciMod
    socTotal = (socBaseGain - (socSciVal * pacifistMod)) * socSciMod
    engTotal = (engBaseGain - (engSciVal * pacifistMod)) * engSciMod

    # Removes system from penalty
    penalty -= systemCost

    newCost = ((phyBaseCost * penalty)/phyTotal) +\
              ((socBaseCost * penalty)/socTotal) +\
              ((engBaseCost * penalty)/engTotal)

    difference = newCost - oldCost

    if difference < 0:
        print(f'\nRemoving this system will DECREASE total research time by {-difference}')
    else:
        print(f'\nRemoving this system will INCREASE total research time by {difference}')


#Required System Science - Amount of science need in a system to break even on aggregate research rate (measured in months)
#NOTE This is probably gonna provide a low estimate (because ignoring non-generic bonuses and integer base costs).
#I think this is fine since the math is providing the break even point. But ideally you're gaining not
#just breaking even anyways. (at least for my science min/maxing)

def reqSysSci():
    print("Will return the minimum amount of science a system requires to break even with its research penalties.")
    #Pacifist modifier
    pacifistDegree = int(input("Enter your degree of PACIFISM (0-Not pacifist 1-pacifist 2-Fanatic pacifist): "))

    pacifistMod = 1 + (pacifistDegree * .05)

    #Average base cost
    avgBaseCost = float(input("\nEnter the AVERAGE BASE COST of your current (or typical) research: "))

    #Science modifiers (combined [generic bonus only] (what about the constant bonuses? - none significant?)
    genSciMod = float(input("\nEnter your total GENERIC SCIENCE MODIFIER (Integer): "))

    genSciMod *= .01
    genSciMod += 1

    #Penalty data
    systemCost = .02
    planetCost = .05

    sigSystems = int(input("\nEnter your total number of SYSTEMS: "))
    sigPlanets = int(input("Enter your total number of PLANETS: "))

    sigSystems -= 1
    sigPlanets -= 1

    # Base science gain
    basePerMonth = [1,1,1]
    basePerMonth[0] = float(input("\nEnter your BASE PHYSICS/month: "))
    basePerMonth[1] = float(input("Enter your BASE SOCIETY/month: "))
    basePerMonth[2] = float(input("Entery your BASE ENGINEERING/month: "))

    difference = 1;

    reqSciPerSys = 1;

    while difference > 0:

        #############
        ###orgCost###
        #############

        #calculate total research penalty
        penalty = 1 + ((planetCost * sigPlanets) +\
                  (systemCost * sigSystems))

        #calculate actual research cost
        avgTechCost = penalty * avgBaseCost

        #Approximate combined average research
        avgResearch = (1/(basePerMonth[0] * genSciMod)) +\
                      (1/(basePerMonth[1] * genSciMod)) +\
                      (1/(basePerMonth[2] * genSciMod))
        #originalCost is in months (average to complete level of research)
        originalCost = avgTechCost * avgResearch #avgResearch is < 1

        print("avg", avgResearch)
        print("orig", originalCost)

        #############
        ###newCost###
        #############

        #Additional system incurs system science penalty
        penalty += systemCost;

        avgTechCost = penalty * avgBaseCost


        avgResearch =  (1/(basePerMonth[0] + ((reqSciPerSys/3) * pacifistMod))*genSciMod) +\
                       (1/(basePerMonth[1] + ((reqSciPerSys/3) * pacifistMod))*genSciMod) +\
                       (1/(basePerMonth[2] + ((reqSciPerSys/3) * pacifistMod))*genSciMod)

        newCost = avgTechCost * avgResearch

        difference = newCost - originalCost

        print("diff", difference)

        if difference > 0:
            reqSciPerSys += 1

    print(f'\nNew systems must have at a minimum of {reqSciPerSys} science to break even after tech penalty.')
    print(f'\nAquiring a system with {reqSciPerSys} science will improve your average research time by {difference} months.')


def main():

    print("This program provides some tools for Stellaris science calculations.")

    option = 1

    while option != 0:

        try:
            option = int(input("0) Exit \n1) Total cost in months \n2) Add a system " +
                               "\n3) Remove a system\n4) Find Required System Science\n"))

            if option == 0:
                print("Exiting...")
            elif option == 1:
                monthsCost()
            elif option == 2:
                addSystem()
            elif option == 3:
                removeSystem()
            elif option == 4:
                reqSysSci()
            else:
                print("No valid option selected.")

        except EOFError:
            print("Exiting...")
            break


if __name__ == '__main__':
    main()
