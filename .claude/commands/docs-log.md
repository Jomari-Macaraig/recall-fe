---
description: Maintain a thorough, teaching-style write-up of what's been built in docs/progress.md — explains concepts, not just a changelog — updating incrementally instead of duplicating past entries.
---

You are maintaining a single learning doc at `docs/progress.md` for this project — gitignored, personal, never referenced in commits/PRs. Its purpose is to teach the concepts back, as if the reader is relearning them from this doc alone, not just log that something happened.

Do this every time this command runs:

1. **Check for the file first.** If `docs/progress.md` doesn't exist, create `docs/` and the file from scratch, covering everything built so far using the structure and depth described below.

2. **If it already exists, read it fully before writing anything.** Update/extend it — never blindly regenerate the whole file or repeat what's already explained well.

3. **Organize by concept/file, not strictly by date.** Each meaningful piece of the app (a package, a config change, a route, a pattern like "Router + Query loader integration") gets its own section covering, thoroughly:
   - **What it is** — plain description.
   - **What it does mechanically** — how it actually behaves at runtime, step by step if useful.
   - **Why it's needed / what problem it solves** — the reasoning, especially any tradeoffs or alternatives that were considered and rejected (and why).
   - **How it connects to other pieces** — what it depends on, what depends on it.
   - **Code examples, generously.** Prefer showing over describing: include the actual current contents of the real file(s) involved (small files in full, larger ones as the relevant excerpt), plus illustrative snippets for concepts that aren't tied to one file (e.g. a generic loader+Query pattern, a file-based vs code-based comparison, a mapping to a framework the user already knows). When a concept has a "before" and "after," show both. Err on the side of one more example rather than one fewer.
   - Status: done / in progress / known issue, if relevant.

   Write it like you're teaching a beginner who wants to actually understand the "why," not just get a status update — this is closer to a tutorial/reference than a changelog.

4. **Diff mentally against what's already there.**
   - A genuinely new concept/milestone → add a new section.
   - An existing section whose explanation is now incomplete or outdated (e.g. something marked "in progress" is now done, or a decision changed) → revise that section in place rather than appending a duplicate.
   - Nothing new or changed → say so and don't touch the file.

5. **Keep a short "Timeline" section at the top** (a compact dated list of milestones, one line each) that links down to the fuller sections below it — so there's still a quick skim path, but the bulk of the file is the thorough explanations.

6. **Never delete past explanations** unless the user explicitly asks you to correct or prune one — if something becomes outdated, revise or clearly mark it superseded rather than silently removing it.

After updating, tell the user which section(s) you added or substantially revised, or that nothing was new.
