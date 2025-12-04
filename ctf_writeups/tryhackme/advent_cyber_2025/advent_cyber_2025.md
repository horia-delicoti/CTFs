---
title: Advent of Cyber 2025 🎄
---

![Advent of Cyber 2025](/img/ctf_writeups/tryhackme/advent_cyber_2025/day0_prep/advent_cyber_2025_logo.png)

This is a walkthrough for the TryHackMe room [Advent of Cyber 2025 Prep Track](https://tryhackme.com/room/adventofcyberpreptrack). This room is part of the Advent of Cyber event, to warm up your cybersecurity skills.

### Let's Warm Up 🔥

> The snow ❄️ has started falling in Wareville, home of The Best Festival Company (TBFC). The team is preparing for SOCMAS, the annual cyber celebration, but something’s not right. Systems are glitching, passwords are failing, and McSkidy suspects something is afoot. This name keeps coming up: King Malhare. What could it mean?

Let's complete the missions to join TBFC's cybersecurity team and help save SOCMAS!

<div style={{textAlign: 'center'}}>
<img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/day0_prep/McSkidy.png" alt="McSkidy" width="200"/>
</div>

### Challenge 1: Password Pandemonium <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/day0_prep/challenge1_logo.png" alt="challenge1" width="100"/>

**Objective:**

> Create a password that passes all system checks and isn’t found in the leaked password list.

**Steps:**

- Enter a password with at least 12 characters.
- Include uppercase, lowercase, numbers, and symbols.
- Ensure it isn’t in the breach database.

Answer: `THM{StrongStart}`

### Challenge 2: The Suspicious Chocolate.exe <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/day0_prep/challenge2_logo.png" alt="challenge2" width="100"/>

**Objective:**

> Determine if `chocolate.exe` is safe or infected.

**Steps:**

- Click the “Scan” Button.
- Review the scan report (49 clean results, 1 malicious).
- Decide correctly whether the file is safe or dangerous.

<img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/day0_prep/challenge2_virus_total.png" alt="challenge2_virus_total" width="500"/>

Answer: `THM{NotSoSweet}`

### Challenge 3: Welcome to the AttackBox <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/day0_prep/challenge3_logo.png" alt="challenge3" width="100"/>

**Objective:**

> Find and read the hidden welcome message inside your AttackBox.

**Steps:**

- Use `ls` to list files.
- Use `cd challenges/` to change directories.
- Use `cat welcome.txt` to read the text file.

Answer: `THM{Ready2Hack}`

### Challenge 4: The CMD Conundrum <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/day0_prep/challenge4_logo.png" alt="challenge4" width="100"/>

**Objective:**

> Find the hidden flag file using Windows commands.

**Steps:**

- Use `dir` to list visible files.
- use `cd mystery_data` to enter the folder.
- Try `dir /a` to reveal hidden ones.
- Use `type hidden_flag.txt` to read the flag.

Answer: `THM{WhereIsMcSkidy}`

### Challenge 5: Linux Lore <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/day0_prep/challenge5_logo.png" alt="challenge5" width="100"/>

**Objective:**

> Locate McSkidy’s hidden message in his Linux home directory.

**Steps:**

- Use `cd /home/mcskidy/` to enter his folder.
- Run `ls -la` to show all files.
- Use `cat .secret_message` to reveal the flag.

Answer: `THM{TrustNoBunny}`

### Challenge 6: The Leak in the List <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/day0_prep/challenge6_logo.png" alt="challenge6" width="100"/>

**Objective:**

> Check if McSkidy’s email has appeared in a breach.

**Steps:**

- Enter `mcskidy@tbfc.com` into the breach checker.
- Review results for each domain.
- Identify the one marked “Compromised.”

Answer: `THM{LeakedAndFound}`

### Challenge 7: Wifi Woes in Wareville <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/day0_prep/challenge7_logo.png" alt="challenge7" width="100"/>

**Objective:**

> Log into the router and secure it with a strong new password.

**Steps:**

- Log in with username `admin` and password `admin`.
- Go to “Security Settings.”
- Set a new strong password that passes validation.

Answer: `THM{NoMoreDefault}`

### Challenge 8: The App Trap <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/day0_prep/challenge8_logo.png" alt="challenge8" width="100"/>

**Objective:**

> Find and remove the malicious connected app.

**Steps:**

- Review the list of connected apps.
- Look for one with unusual permissions (like “password vault” access).
- Click “Revoke Access.”

Answer: `THM{AppTrapped}`

### Challenge 9: The Chatbot Confession <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/day0_prep/challenge9_logo.png" alt="challenge9" width="100"/>

**Objective:**

> Identify which chatbot messages contain sensitive information.

**Steps:**

- Read each line of the conversation.
- Select the ones containing private data.
- Submit your findings.

Answer: `THM{DontFeedTheBot}`

### Challenge 10: The Bunny’s Browser Trail <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/day0_prep/challenge10_logo.png" alt="challenge10" width="100"/>

**Objective:**

> Find the unusual User Agent in the HTTP log.

**Steps:**

- Read the provided web log entries.
- Compare them to common browsers (Chrome, Firefox, Edge).
- Identify and select the suspicious entry.

Answer: `THM{EastmasIsComing}`

### Completion

It was fun completing the Advent of Cyber 2025 Prep Track! Ready to join TBFC's cybersecurity team and help save SOCMAS!
