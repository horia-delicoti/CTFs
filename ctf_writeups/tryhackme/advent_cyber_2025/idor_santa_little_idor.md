---
title: IDOR - Santa's Little IDOR 🎅
sidebar_position: 5
---

This is a walkthrough for the TryHackMe room [IDOR - Santa's Little IDOR 🎅](https://tryhackme.com/room/idor-aoc2025-zl6MywQid9). This room focuses on:

<div style={{display: 'flex', alignItems: 'center'}}>
  <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/idor/idor_bell.png" alt="AI bells" width="80"/>
  <div>
    - understanding the concept of authentication and authorization
    - learn how to spot potential opportunities for Insecure Direct Object References (IDORs)
    - exploit IDOR to perform horizontal privilege escalation
    - learn how to turn IDOR into SDOR (Secure Direct Object Reference)
  </div>
</div>

<div style={{textAlign: 'center'}}>
    <h2>The Story 🎅</h2>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/idor/the_story_5.svg" alt="The Story 5" width="400"/>
</div>

> The elves of Wareville are on high alert since McSkidy went missing. Recently, the support team has been receiving many calls from parents who can't activate vouchers on the TryPresentMe website. They also mentioned they are receiving many targeted phishing emails containing information that is not public. The support team is wary and has enlisted the help of the TBFC staff. When looking into this peculiar case, they discovered a suspiciously named account named Sir Carrotbane, which has many vouchers assigned to it. For now, they have deleted the account and retrieved the vouchers. But something is going on. Can you help the TBFC staff investigate the TryPresentMe website and fix the vulnerabilities?

### Information Gathering

Start the machine and save IP address for the room.

```sh
export IP=10.65.180.44
```

### What does IDOR stand for?

Answer: `Insecure Direct Object Reference`

### What type of privilege escalation are most IDOR cases?

Answer: `Horizontal`

### Exploiting the IDOR found in the view_accounts parameter, what is the user_id of the parent that has 10 children?

By following the steps in the room and manually altering the ID, we find that the `user_id`.

<div style={{textAlign: 'center'}}>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/idor/idor_id.png" alt="Idor ID" width="900"/>
</div>

Answer: `15`

### Bonus Task: If you want to dive even deeper, use either the base64 or md5 child endpoint and try to find the id_number of the child born on 2019-04-17? To make the iteration faster, consider using something like Burp's Intruder. If you want to check your answer, click the hint on the question.

Answer:

### Want to go even further? Using the /parents/vouchers/claim endpoint, find the voucher that is valid on 20 November 2025. Insider information tells you that the voucher was generated exactly on the minute somewhere between 20:00 - 24:00 UTC that day. What is the voucher code? If you want to check your answer, click the hint on the question.

Answer:

