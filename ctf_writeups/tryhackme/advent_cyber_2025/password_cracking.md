---
title: Passwords - A Cracking Christmas 🎄
sidebar_position: 8
---

This is a walkthrough for the TryHackMe room [Passwords - A Cracking Christmas](https://tryhackme.com/room/attacks-on-ecrypted-files-aoc2025-asdfghj123). This room focuses on:
<div style={{display: 'flex', alignItems: 'center'}}>
  <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/passwords_cracking/passwords_bell.png" alt="Passwords bells" width="80"/>
  <div>
    - how password-based encryption protects files such as PDFs and ZIP archives.
    - why weak passwords make encrypted files vulnerable.
    - how attackers use dictionary and brute-force attacks to recover passwords.
    - a hands-on exercise: cracking the password of an encrypted file to reveal its contents.
    - the importance of using strong, complex passwords to defend against these attacks.
  </div>
</div>

<div style={{textAlign: 'center'}}>
    <h2>The Story 🎅</h2>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/passwords_cracking/the_story_9.svg" alt="The Story 9" width="400"/>
</div>

> With time between Easter and Christmas being destabilised, the once-quiet systems of The Best Festival Company began showing traces of encrypted data buried deep within their servers. Sir Carrotbane, stumbled upon a series of locked PDF and ZIP files labelled “North Pole Asset List.” Rumours spread that these could contain fragments of Santa’s master gift registry, critical information that could help Malhare control the festive balance between both worlds.

> Sir Carrotbane sets out to crack the encryption, learning how weak passwords can expose even the most guarded secrets. Can the Elves adapt fast and prevent their secrets from being discovered?

### What is the flag inside the encrypted PDF?

Let's start by using `pdfcrack` to crack the password of the provided PDF file `flag.pdf`.

```sh
pdfcrack -f flag.pdf -w /usr/share/wordlists/rockyou.txt 
PDF version 1.7
Security Handler: Standard
V: 2
R: 3
P: -1060
Length: 128
Encrypted Metadata: True
FileID: 3792b9a3671ef54bbfef57c6fe61ce5d
U: c46529c06b0ee2bab7338e9448d37c3200000000000000000000000000000000
O: 95d0ad7c11b1e7b3804b18a082dda96b4670584d0044ded849950243a8a367ff
found user-password: 'naughtylist'
```

We found a user-password: `naughtylist`. Now open the PDF file using the password to find the flag.

<div style={{textAlign: 'center'}}>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/passwords_cracking/pdf_flag.png" alt="PDF Flag" width="700"/>
</div>

Answer: `THM{Cr4ck1ng_PDFs_1s_34$y}`

### What is the flag inside the encrypted zip file?

Let's create a hash that John can understand.

```sh
zip2john flag.zip > ziphash.txt
```

Now, let's use `john` to crack the password of the provided ZIP file `flag.zip`.

```sh
john --wordlist=/usr/share/wordlists/rockyou.txt ziphash.txt
Using default input encoding: UTF-8
Loaded 1 password hash (ZIP, WinZip [PBKDF2-SHA1 256/256 AVX2 8x])
Cost 1 (HMAC size [KiB]) is 1 for all loaded hashes
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, 'h' for help, almost any other key for status
winter4ever      (flag.zip/flag.txt)     
1g 0:00:00:00 DONE (2025-12-12 13:58) 1.562g/s 6400p/s 6400c/s 6400C/s friend..sahara
Use the "--show" option to display all of the cracked passwords reliably
Session completed
```

We found the password: `winter4ever`. Now open the ZIP file using the password to find the flag and extract our flag.

<div style={{textAlign: 'center'}}>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/passwords_cracking/zip_unlock.png" alt="ZIP Unlock" width="700"/>
</div>

Answer: `THM{Cr4ck1n6_z1p$_1s_34$yyyy}`

### Bonus: Have a look around the VM to get access to the key for Side Quest 2!

Answer: ``
