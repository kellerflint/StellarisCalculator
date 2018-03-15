# Stellaris Science Calculator

The Stellaris Science Calculator is hosted at https://kellerflint.github.io/StellarisCalculator/

The Problem

In Stellaris, it is difficult to determine several vital pieces of information regarding the rate of scientific discovery. This is because whenever a player claims either a planet or a new system the game increases the cost of future technological acquisitions by adding a static percentage to the base cost of incomplete technologies thereby increasing the amount of time it takes to complete their research.

This relative change in the cost of a technology has several major implications for maximizing research rate. Most importantly, a system with science is not always worth the tech penalty it incurs depending on a number of rather obscure factors including the player's current base monthly science gain, their ethics and the number of systems and planets they already own. This process is further complicated by the fact that amount of science a system requires to make up for its penalty changes over the course of a single game. Therefore, even a system that was at one point worth taking may later become a obsolete as it's relative value against its tech penalty decreases.

Another result of this dynamic structure is that the science values shown at the top of the screen are not an accurate reflection of a player's rate of research once they have started expanding. An accurate method would require that those base gains be multiplied by each science modifier and then weighted against the sum of the combined penalties of the player's planets and systems. Unfortunately, this number is not displayed anywhere in game and is rather difficult to determine without algorithmic help.

In an attempt to address both of these issues, I have created the Stellaris Science Calculator to provide set of tools that will help determine the actual value of your science.
