---
title: Splunk Basics - Did you SIEM?
sidebar_position: 3
---

This is a walkthrough for the TryHackMe room [Splunk Basics - Did you SIEM?](https://tryhackme.com/room/splunkforloganalysis-aoc2025-x8fj2k4rqp). This room focuses on:

<div style={{display: 'flex', alignItems: 'center'}}>
  <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/splunk_basics/splunk_bells.png" alt="splunk logo" width="80"/>
  <div>
    - ingest and interpret custom log data in Splunk
    - create and apply custom field extractions
    - use Search Processing Language (SPL) to filter and refine search results
    - conduct an investigation within Splunk to uncover key insights
  </div>
</div>

<div style={{textAlign: 'center'}}>
    <h2>The Story 🎅</h2>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/splunk_basics/the_story_3.png" alt="The Story 3" width="400"/>
</div>

> It’s almost Christmas in Wareville, and the team of The Best Festival Company (TBFC) is busy preparing for the big celebration. Everything is running smoothly until the SOC dashboard flashes red. A ransom message suddenly appears: 

<div style={{textAlign: 'center'}}>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/splunk_basics/attack_message.png" alt="Attack Message" width="400"/>
</div>

> The message comes from King Malhare, the jealous ruler of HopSec Island, who’s tired of Easter being forgotten. He’s sent his Bandit Bunnies to attack TBFC’s systems and turn Christmas into his new holiday, EAST-mas.

> With McSkidy missing and the network under attack, the TBFC SOC team will utilize Splunk to determine how the ransomware infiltrated the system and prevent King Malhare’s plan from being compromised before Christmas.

### Information Gathering

Start the machine and use the IP address `10.82.188.15` for the room to access to the Splunk instance:

```sh
https://10-82-188-15.reverse-proxy.cell-prod-eu-west-1c.vm.tryhackme.com 
```

<div style={{textAlign: 'center'}}>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/splunk_basics/splunk.png" alt="Splunk" width="700"/>
</div>

### What is the attacker IP found attacking and compromising the web server?

We get the attacker IP by using search query and use field `client_ip` to find the IP with most events:

```spl
index=main sourcetype=web_traffic
```

<div style={{textAlign: 'center'}}>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/splunk_basics/splunk_ip.png" alt="Splunk IP" width="700"/>
</div>

Answer: `198.51.100.55`

### Which day was the peak traffic in the logs? (Format: YYYY-MM-DD)

We get the peak traffic day by using search query:

```spl
index=main sourcetype=web_traffic | timechart span=1d count | sort by count | reverse
```

<div style={{textAlign: 'center'}}>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/splunk_basics/splunk_peak_date.png" alt="Splunk Date" width="900"/>
</div>

Answer: `2025-10-12`

### What is the count of Havij `user_agent` events found in the logs?

We get the count of Havij `user_agent` events by acessing field `user_agent`.

<div style={{textAlign: 'center'}}>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/splunk_basics/splunk_user_agent.png" alt="Splunk User Agent" width="600"/>
</div>

Answer: `993`

### How many path traversal attempts to access sensitive files on the server were observed?

We get the count of path traversal attempts by searching for common path traversal patterns in the `path` field:

<div style={{textAlign: 'center'}}>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/splunk_basics/splunk_path.png" alt="Splunk Path" width="600"/>
</div>

Answer: `658`

### Examine the firewall logs. How many bytes were transferred to the C2 server IP from the compromised web server?

To get the bytes transferred to the C2 server IP, we filter the firewall logs for the C2 server IP: 

```spl
sourcetype=firewall_logs src_ip="10.10.1.5" AND dest_ip="<REDACTED>" AND action="ALLOWED" | stats sum(bytes_transferred) by src_ip
```

<div style={{textAlign: 'center'}}>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/splunk_basics/splunk_firewall.png" alt="Splunk Firewall" width="900"/>
</div>

Answer: `126167`

### Completion

This was a fun introduction to Splunk basics and log analysis. I learned how to ingest and interpret custom log data, create and apply custom field extractions, use Search Processing Language (SPL) to filter and refine search results, and conduct an investigation within Splunk to uncover key insights.
