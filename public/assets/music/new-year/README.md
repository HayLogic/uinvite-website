# New Year invitation music

Four original MP3 files supplied by the owner, randomly assigned once across 067–076, one fixed track per invitation. Assignment is stable on reload; all four tracks are used, each on two or three invitations. Original audio files are preserved and stored once, shared by their absolute website URLs. Existing interaction-based playback, loop and pause/resume controls are unchanged. Other invitation content is untouched.

| Invitation | Track |
| --- | --- |
| 067 | Mariah Carey — All I Want for Christmas Is You |
| 068 | Mariah Carey — All I Want for Christmas Is You |
| 069 | Bobby Helms — Jingle Bell Rock |
| 070 | Bobby Helms — Jingle Bell Rock |
| 071 | Mariah Carey — All I Want for Christmas Is You |
| 072 | Wham! — Last Christmas |
| 073 | Wham! — Last Christmas |
| 074 | Bobby Helms — Jingle Bell Rock |
| 075 | Dean Martin — Let It Snow |
| 076 | Dean Martin — Let It Snow |

Mapping: `assignments.json`. The updated script query string refreshes cached configurations. No live deployment.

Verified on the local production build: all ten invitations select the assigned track, contain one audio element, start after a visitor interaction, pause/resume correctly and loop. The four source files decode successfully. Production build and SEO checks passed; other invitation content and styling are unchanged.

Follow-up: 065 now also uses the supplied Dean Martin “Let It Snow” recording. Its existing music button and pause/resume logic are preserved; the malformed audio source markup was repaired so it plays the real MP3 instead of the generated fallback melody.
