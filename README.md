# Stellaris Science Calculator

The Stellaris Science Calculator is hosted at https://kellerflint.github.io/StellarisCalculator/

Last updated for Stellaris version 2.1.0

**The Problem**

In Stellaris, it is difficult to determine several vital pieces of information regarding the rate of scientific discovery. This is because whenever a player claims either a planet or a new system the game increases the cost of future technological acquisition by adding a static percentage to the base cost of incomplete technologies thereby increasing the amount of time it takes to finish future research.

This relative change in the cost of a technology has several major implications for maximizing research rate. Most importantly, a system with science is not always worth the tech penalty it incurs depending on a number of factors (including the player's current monthly science gain, their ethics and the number of systems and planets they already own). This process is further complicated by the fact that the amount of science a system requires to make up for its penalty changes over the course of a single game. Therefore, a system that was at one point worth taking may later become obsolete as its relative value against its tech penalty decreases.

Another result of this penalty system is that the science values shown at the top of the screen are not an accurate reflection of a player's research rate once they start expanding. An accurate method would require that those base gains be multiplied by each research speed and then weighed against the combined penalties of the player's planets and systems. Unfortunately, this number is not displayed anywhere in game and is rather difficult to determine without algorithmic help.

In an attempt to address both of these issues, I have created the Stellaris Science Calculator to provide set of tools that will help determine the actual value of your science.
