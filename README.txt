Platform One - website version

The site comes in three zip files. Put them together like this:
1. Unzip part 1. You get a folder with index.html, sw.js, the icons and a folder called audio.
2. Unzip part 2 and part 3. Each holds one more folder: audio2 and audio3.
3. Move audio2 and audio3 into the part 1 folder, next to the audio folder.
   Nothing gets replaced: each part has its own folder.
4. Upload that whole folder to any static web host that serves https:
   Netlify (app.netlify.com/drop), Cloudflare Pages or GitHub Pages.
If audio2 or audio3 is missing, the app still works but uses the phone's voice for some A1 and A2 audio.

What works here that doesn't inside claude.ai:
- Speak for a score: the phone's German speech recognition checks which words it understood.
- Record and compare: records straight from the microphone.
- Install: Android Chrome menu > Install app; iPhone Safari Share > Add to Home Screen.
- Works offline after the first visit; audio is kept once played.
- Daily reminders: Android Chrome (installed app). For iPhone and exact times, a OneSignal app ID is needed.

Not available here: writing new stories with Claude and Claude feedback reviews (claude.ai only).
Progress lives in each browser. Move it with Save backup file / Restore from file.

Voice credits: see CREDITS.txt.
