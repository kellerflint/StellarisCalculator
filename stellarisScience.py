#!/usr/bin/env python3

#pre: does NOT include stored science in monthly progress
import sys


def monthsCost():
    print("This calculates the combined cost in months of all given research.")

    phyTotalCost = float(input("\nPhysics total cost: "))
    socTotalCost = float(input("Society total cost: "))
    engTotalCost = float(input("Enginee total cost: "))

    phyMonthProg = float(input("\nPhysics monthly progress: "))
    socMonthProg = float(input("Society monthly progress: "))
    engMonthProg = float(input("Enginee monthly progress: "))

    totalMonths = (phyTotalCost/phyMonthProg) + (socTotalCost/socMonthProg) + (engTotalCost/engMonthProg)

    print(f"\nTotal Months = {totalMonths}")


def addSystem():
    systemCost = .02
    planetCost = .05
    pacifistDegree = int(input("What degree of pacifist are you? (0-Not pacifist 1-pacifist 2-Fanatic pacifist): "))

    pacifistMod = 1 + (pacifistDegree * .05)

    sigSystems = int(input("\nTotal number of systems (before addition): "))
    sigPlanets = int(input("\nTotal number of planets: "))

    sigSystems -= 1
    sigPlanets -= 1

    phyBaseCost = float(input("\nPhysics base cost: "))
    socBaseCost = float(input("Society base cost: "))
    engBaseCost = float(input("Enginee base cost: "))

    #Amount of Science in the system (NOT including modifiers)
    phySciVal = float(input("\nSystem science value(physics): "))
    socSciVal = float(input("System science value(society): "))
    engSciVal = float(input("System science value(enginee): "))

    #Science percent modifers from research tab
    phySciMod = float(input("\nPhysics science modifer(integer): "))
    socSciMod = float(input("Society science modifer(integer): "))
    engSciMod = float(input("Enginee science modifer(integer): "))

    #Base Science gain
    phyBaseGain = float(input("\nPhysics science base gain: "))
    socBaseGain = float(input("Society science base gain: "))
    engBaseGain = float(input("Enginee Science base gain: "))

    phySciMod *= .01
    socSciMod *= .01
    engSciMod *= .01

    phySciMod += 1
    socSciMod += 1
    engSciMod += 1

    #oldCost and newCost are in months (time to complete total research)

    penalty = 1 + ((planetCost * sigPlanets) +\
              (systemCost * sigSystems))

    oldCost = ((phyBaseCost * penalty)/(phyBaseGain * phySciMod)) +\
              ((socBaseCost * penalty)/(socBaseGain * socSciMod)) +\
              ((engBaseCost * penalty)/(engBaseGain * engSciMod))

    phyTotal = (phyBaseGain + (phySciVal * pacifistMod)) * phySciMod
    socTotal = (socBaseGain + (socSciVal * pacifistMod)) * socSciMod
    engTotal = (engBaseGain + (engSciVal * pacifistMod)) * engSciMod

    #Adds new system to penalty
    penalty += systemCost

    newCost = ((phyBaseCost * penalty)/phyTotal) +\
              ((socBaseCost * penalty)/socTotal) +\
              ((engBaseCost * penalty)/engTotal)

    difference = newCost - oldCost

    print(f'Base phy test: {(phyBaseGain * phySciMod)}')
    print(f'phy penalty (before): {penalty}')
    print(f'New phy cost(after): {phyBaseCost * penalty}')

    if difference < 0:
        print(f'\nAdding this system will DECREASE total research time by {-difference}')
    else:
        print(f'\nAdding this system will INCREASE total research time by {difference}')


def removeSystem():
    systemCost = .02
    planetCost = .05
    pacifistDegree = int(input("What degree of pacifist are you? (0-Not pacifist 1-pacifist 2-Fanatic pacifist): "))

    pacifistMod = 1 + (pacifistDegree * .05)

    sigSystems = int(input("\nTotal number of systems (before removal): "))
    sigPlanets = int(input("\nTotal number of planets: "))

    sigSystems -= 1
    sigPlanets -= 1

    phyBaseCost = float(input("\nPhysics base cost: "))
    socBaseCost = float(input("Society base cost: "))
    engBaseCost = float(input("Enginee base cost: "))

    #Amount of Science in the system (NOT including modifiers)
    phySciVal = float(input("\nSystem science value(physics): "))
    socSciVal = float(input("System science value(society): "))
    engSciVal = float(input("System science value(enginee): "))

    #Science percent modifers from research tab
    phySciMod = float(input("\nPhysics science modifer(integer): "))
    socSciMod = float(input("Society science modifer(integer): "))
    engSciMod = float(input("Enginee science modifer(integer): "))

    #Base Science gain
    phyBaseGain = float(input("\nPhysics science base gain: "))
    socBaseGain = float(input("Society science base gain: "))
    engBaseGain = float(input("Enginee Science base gain: "))

    phySciMod *= .01
    socSciMod *= .01
    engSciMod *= .01

    phySciMod += 1
    socSciMod += 1
    engSciMod += 1

    #oldCost and newCost are in months (time to complete total research)

    penalty = 1 + ((planetCost * sigPlanets) +\
              (systemCost * sigSystems))

    oldCost = ((phyBaseCost * penalty)/(phyBaseGain * phySciMod)) +\
              ((socBaseCost * penalty)/(socBaseGain * socSciMod)) +\
              ((engBaseCost * penalty)/(engBaseGain * engSciMod))

    phyTotal = (phyBaseGain - (phySciVal * pacifistMod)) * phySciMod
    socTotal = (socBaseGain - (socSciVal * pacifistMod)) * socSciMod
    engTotal = (engBaseGain - (engSciVal * pacifistMod)) * engSciMod

    #Adds new system to penalty
    penalty -= systemCost

    newCost = ((phyBaseCost * penalty)/phyTotal) +\
              ((socBaseCost * penalty)/socTotal) +\
              ((engBaseCost * penalty)/engTotal)

    difference = newCost - oldCost

    print(f'Base phy test: {(phyBaseGain * phySciMod)}')
    print(f'phy penalty (before): {penalty}')
    print(f'New phy cost(after): {phyBaseCost * penalty}')

    if difference < 0:
        print(f'\nRemoving this system will DECREASE total research time by {difference}')
    else:
        print(f'\nRemoving this system will INCREASE total research time by {difference}')


def main():

    print("This program provides some tools for Stellaris science calculations.")

    option = 1

    while option != 0:

        try:
            option = int(input("\n0) exit 1) total cost in months 2) Add a system 3) remove a system: "))

            if option == 1:
                monthsCost()
            elif option == 2:
                addSystem()
            elif option == 3:
                removeSystem()
            elif option == 0:
                print("Exiting...")
            else:
                print("No valid option selected.")

        except EOFError:
            print("Exiting...")
            break


if __name__ == '__main__':
    main()
