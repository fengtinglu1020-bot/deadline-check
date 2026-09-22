# Deadline Check
Deadline Check is a small tool for students. A user enters an assignment deadline, and the page shows a live countdown and a color-coded urgency level.

> When someone selects an assignment deadline, the experience should show how much time remains and how urgent it is.

How to run
Download this repository and open `index.html` in a browser. Enter an assignment name and deadline, then select **Check time remaining**.

# AI use

I used Codex to help me code, and test the project. Selected prompts included:
- “When someone tell you the deadline, the experience should tell them how much time they left.”
- “Make it more practical.”

## Reflection

The main interaction matched my intention. The countdown updates every second, and its color makes the urgency easy to understand. I tested future deadlines, a past deadline, and an empty input. At first, an empty input left the previous result on screen, so I changed the code to clear that result and show an error message.

AI helped me create the HTML, CSS, and JavaScript and suggested useful test cases. I still decided which idea to use, what information mattered, and whether the result felt clear. One unresolved limitation is that the date picker may follow the browser's regional settings, and the tool only tracks one assignment at a time.
