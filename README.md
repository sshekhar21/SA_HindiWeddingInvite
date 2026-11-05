# Anjali & Shashank — Wedding Invitation Website

A self-contained, responsive wedding invitation website designed to be hosted free on **GitHub Pages**. It recreates the sequence and visual language of the supplied mobile screen recording: animated envelope opening, sunset palace welcome, ornamental invitation, event cards, gallery, RSVP, countdown and closing scene.

> This is a hand-built visual recreation from the screen recording, not the original site's source code. Some original artwork and exact animation assets cannot be recovered from a screen recording. The project uses original CSS/SVG-style artwork and editable content rather than copying the recording frame-by-frame.

## Preview locally

Open `index.html` in a browser, or run a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish on GitHub Pages (free)

1. Create a new **public** repository on GitHub, e.g. `anjali-shashank-wedding`.
2. Extract this project ZIP and upload all files and folders in this directory to the repository root (make sure `index.html` is at the root).
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. Wait for GitHub Pages to publish. Your link will look like `https://YOUR-USERNAME.github.io/anjali-shashank-wedding/`.
7. Share that link in WhatsApp.

## Personalise before publishing

- **Names and wedding date:** edit the visible text in `index.html`.
- **Countdown time:** in `script.js`, edit `2026-11-26T17:00:00+05:30` to the actual ceremony start time. The timezone is India Standard Time.
- **Event details:** edit the three `.event-card` blocks in `index.html`.
- **RSVP email:** in `script.js`, replace `YOUR_EMAIL@example.com` with the email address that should receive RSVP messages. The form opens the guest's email app; it does not store submissions on a server.
- **Gallery:** the current gallery uses elegant illustrated placeholders. To use your own photos, add your images to `assets/photos/` and update the gallery markup/styles. (No personal photos were included in the screen recording project.)
- **Sky lantern animation:** the traditional glowing paper lanterns rise only within the opening palace hero screen. Their artwork is in `assets/images/traditional-sky-lantern.png`; the animation fades in near the bottom, glows through the middle and fades out as it leaves the top. Falling petals continue across the full page.
- **Music:** add a royalty-free MP3 named `ambient.mp3` inside `assets/` to enable the music button. Browsers require a user tap before audio can play.

## Project structure

```text
anjali-shashank-invitation/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
```

No build tools, frameworks, paid hosting, API keys or backend are required.


### Version 18 update
- Added the supplied baby Ganesha artwork at the top of the invitation text, displayed at a modest size.
- Reworked the invitation opening lines to match the supplied reference: “With the blessings of the divine” and “at the celebration of our wedding”.
- Added a centered pink lotus ornament below the opening lines.
- Increased the invitation typography while keeping all text centered inside the existing frame.
