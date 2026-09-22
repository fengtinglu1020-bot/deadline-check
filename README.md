# Deadline Check

Deadline Check is a small browser-based tool for students. A user enters an assignment name and deadline, and the page displays a live countdown with a color-coded urgency level.

> When someone selects an assignment deadline, the experience should show how much time remains and clearly indicate how urgent it is.

## How to run it

No installation is required.

1. Download or clone this repository.
2. Open `index.html` in a web browser.
3. Enter an optional assignment name and choose a deadline.
4. Select **Check time remaining**.

For a local development server, run `python3 -m http.server 4173` in the project folder and visit `http://localhost:4173`.

## AI tool and selected prompts

I used OpenAI Codex to help plan, build, test, and revise the project. Some prompts and decisions that shaped the result were:

- “你帮我想一个” (“Help me think of an idea.”)
- “实用一点的” (“Make it more practical.”)
- “改成英文版” (“Change it to an English version.”)

The first suggestions were a breathing exercise and a short interactive story. I rejected those ideas because I wanted the result to be useful in everyday student life. That decision led to the assignment deadline countdown.

## Reflection

The main interaction matched my intention: after a user enters a deadline, the page immediately shows the remaining days, hours, minutes, and seconds. The urgency colors also make the result easier to understand at a glance. I tested a deadline more than a week away, one less than 24 hours away, a date in the past, and an empty input. During testing, I found that submitting an empty field left the previous countdown visible. That could make a user think the old result was still connected to the empty form, so I revised the code to clear the old countdown and show an error message instead. I also changed the interface from Chinese to English and checked it at both mobile and desktop widths.

AI helped turn the idea into HTML, CSS, and JavaScript, suggested useful edge cases, and helped diagnose the stale-result problem. I still had to decide what kind of experience I wanted, reject ideas that did not fit, choose a practical direction, and judge whether the results communicated urgency clearly. One unresolved limitation is that the browser controls the appearance and language of the built-in date picker, so it may follow the computer's regional settings even though the page is in English. The project also tracks only one assignment at a time; supporting a saved list of assignments would require a larger version of the project.

## Files

- `index.html` — page structure and content
- `styles.css` — layout, responsive design, and urgency colors
- `script.js` — countdown, validation, and status logic
