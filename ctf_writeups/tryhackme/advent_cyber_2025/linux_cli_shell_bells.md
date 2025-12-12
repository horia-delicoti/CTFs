---
title: Linux CLI - Shell Bells 🔔
sidebar_position: 1
---

This is a walkthrough for the TryHackMe room [Linux CLI - Shell Bells](https://tryhackme.com/room/linuxcli-aoc2025-o1fpqkvxti). This room focuses on:

<div style={{display: 'flex', alignItems: 'center'}}>
  <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/linux_cli_shell_bells/shell_bells.png" alt="shell bells" width="80"/>
  <div>
    - learn the basics of the Linux command-line interface (CLI)
    - explore its use for personal objectives and IT administration
    - apply your knowledge to unveil the Christmas mysteries
  </div>
</div>

<div style={{textAlign: 'center'}}>
    <h2>The Story 🎅</h2>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/linux_cli_shell_bells/the_story.png" alt="The Story" width="400"/>
</div>

> The unthinkable has happened - McSkidy has been kidnapped. Without her, Wareville’s defenses are faltering, and Christmas itself hangs by a thread. But panic won’t save the season. A long road lies ahead to uncover what truly happened. The TBFC (The Best Festival Company) team already brainstorms what to do next, and their first lead points to the tbfc-web01, a Linux server processing Christmas wishlists. Somewhere within its data may lie the truth: traces of McSkidy’s final actions, or perhaps the clues to King Malhare’s twisted vision for EASTMAS.

<div style={{textAlign: 'center'}}>
  <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/linux_cli_shell_bells/hero.png" alt="The Story" width="200"/>
</div>

The first tasks are all about Linux Basics (directory, listing hidden files, viewing file contents, searching text in files, switching users, etc). Let's get started!

## Which CLI command would you use to list a directory?

- Answer: `ls`
- Flag: `THM{learning-linux-cli}`

## Which command helped you filter the logs for failed logins?

- Answer: `grep`
- Flag: `THM{sir-carrotbane-attacks}`

## Which command would you run to switch to the root user?

- Answer: `su -`
- Flag: `THM{until-we-meet-again}`

## Check McSkidy's hidden note in `/home/mcskidy/Documents/` to get access to the key for Side Quest 1

- Open the hidden note in `/home/mcskidy/Documents/` using the `cat` command:

```sh
cat /home/mcskidy/Documents/read-me-please.txt
From: mcskidy
To: whoever finds this

I had a short second when no one was watching. I used it.

I've managed to plant a few clues around the account.
If you can get into the user below and look carefully,
those three little "easter eggs" will combine into a passcode
that unlocks a further message that I encrypted in the
/home/eddi_knapp/Documents/ directory.
I didn't want the wrong eyes to see it.

Access the user account:
username: eddi_knapp
password: S0mething1Sc0ming

There are three hidden easter eggs.
They combine to form the passcode to open my encrypted vault.

Clues (one for each egg):

1)
I ride with your session, not with your chest of files.
Open the little bag your shell carries when you arrive.

2)
The tree shows today; the rings remember yesterday.
Read the ledger’s older pages.

3)
When pixels sleep, their tails sometimes whisper plain words.
Listen to the tail.

Find the fragments, join them in order, and use the resulting passcode
to decrypt the message I left. Be careful — I had to be quick,
and I left only enough to get help.

~ McSkidy
```

### 1. First clue

> I ride with your session, not with your chest of files. Open the little bag your shell carries when you arrive.

- **"I ride with your session"** -> data, shell session (*.bashrc*, *.profile*, *.bash_profile*, *.bash_login*, *.zshrc*, etc.)
- **"not with your chest of files"** -> not regular files on disk
- **"Open the little bag your shell carries when you arrive."** -> environment variables, shell session

```sh title="Switch to eddi_knapp user"
mcskidy@tbfc-web01:~$ su eddi_knapp 
Password:S0mething1Sc0ming
```

```sh title="Check for session files in eddi_knapp home directory"
eddi_knapp@tbfc-web01:~$ grep -i 'pass' .bashrc
export PASSFRAG1="3ast3r"
```

First fragment found: `3ast3r`

### 2. Second clue

> The tree shows today; the rings remember yesterday. Read the ledger’s older pages.

- **"The tree shows today"** -> directory tree / filesystem
- **"the rings remember yesterday"** -> time, yesterday, old, history
- **"ledger"** -> a record of changes(log), commit history

Let's check for git repositories in the home directory of `eddi_knapp`.

```sh
cd .secret_git
ls -la
```

- Let's check the git commit history to find any deleted files that might contain clues.

```sh
eddi_knapp@tbfc-web01:~/.secret_git$ git log --pretty=oneline
e924698378132991ee08f050251242a092c548fd (HEAD -> master) remove sensitive note
d12875c8b62e089320880b9b7e41d6765818af3d add private note
```

- Let's check the latest commit to see what file was deleted.

```sh
git show HEAD
eddi_knapp@tbfc-web01:~/.secret_git$ git show HEAD
commit e924698378132991ee08f050251242a092c548fd (HEAD -> master)
Author: mcskiddy <mcskiddy@robco.local>
Date:   Thu Oct 9 17:20:11 2025 +0000

    remove sensitive note

diff --git a/secret_note.txt b/secret_note.txt
deleted file mode 100755
index 060736e..0000000
--- a/secret_note.txt
+++ /dev/null
@@ -1,5 +0,0 @@
-========================================
-Private note from McSkidy
-========================================
-We hid things to buy time.
-PASSFRAG2: -1s-
```

Bingo! Second fragment found: `-1s-`

### 3. Third clue

> When pixels sleep, their tails sometimes whisper plain words. Listen to the tail.

- **"pixels"** -> images
- **"sleep"** -> file at rest, stored on disk
- **"tails"** -> hidden files, filenames starting with a dot (.)
- **"whisper plain words"** -> text, flag, secret message, ASCII text

- Let's check for image files in the home directory of `eddi_knapp`.

```sh
eddi_knapp@tbfc-web01:~$ ls -la Pictures/
...
.easter_egg
...
```

- Check the contents of the `.easter_egg` file.

```js
eddi_knapp@tbfc-web01:~/Pictures$ cat .easter_egg 
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@#+==+*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@%+=+*++@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@*++**+#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@%%#*====+#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@#*===-===#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@%*++:-+====*%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@%*===++++===-+*#######%%@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@%*+===+++==::-=========+*#%@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@%%#**+======-:-==--==-==+*%@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@%*+======---=+===------=#%@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@%**+=-=====-==+==-====--=*%@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@%***+++==--=====+=----=-=#@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@%#**++=--=====++====----*@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@%*+=-:=++**++**+=-::--*@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@#+=:.+#***=*#=--::-=-=%@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@%%*+-:+%#+++=++=:::==--*%@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@%*+=--*@#++===::::::::=#%@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@%%%##*#%%%####***#*#####%%@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@%%###%%%%%%%%%%##%%##%%@@@@@@@@@@@@

~~ HAPPY EASTER ~~~
PASSFRAG3: c0M1nG
```

Complete flag passcode: `3ast3r-1s-c0M1nG`

### 4. Final: Get Side Quest 1 key

- Let's use the passcode to decrypt McSkidy's hidden message in `/home/eddi_knapp/Documents/`

```js
eddi_knapp@tbfc-web01:~/Documents$ gpg --pinentry-mode loopback --passphrase '3ast3r-1s-c0M1nG' --decrypt mcskidy_note.txt.gpg
gpg: AES256.CFB encrypted data
gpg: encrypted with 1 passphrase
Congrats — you found all fragments and reached this file.

Below is the list that should be live on the site. If you replace the contents of
/home/socmas/2025/wishlist.txt with this exact list (one item per line, no numbering),
the site will recognise it and the takeover glitching will stop. Do it — it will save the site.

Hardware security keys (YubiKey or similar)
Commercial password manager subscriptions (team seats)
Endpoint detection & response (EDR) licenses
Secure remote access appliances (jump boxes)
Cloud workload scanning credits (container/image scanning)
Threat intelligence feed subscription

Secure code review / SAST tool access
Dedicated secure test lab VM pool
Incident response runbook templates and playbooks
Electronic safe drive with encrypted backups

A final note — I don't know exactly where they have me, but there are *lots* of eggs
and I can smell chocolate in the air. Something big is coming.  — McSkidy

---

When the wishlist is corrected, the site will show a block of ciphertext. This ciphertext can be decrypted with the following unlock key:

UNLOCK_KEY: 91J6X7R4FQ9TQPM9JX2Q9X2Z

To decode the ciphertext, use OpenSSL. For instance, if you copied the ciphertext into a file /tmp/website_output.txt you could decode using the following command:

cat > /tmp/website_output.txt
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -salt -base64 -in /tmp/website_output.txt -out /tmp/decoded_message.txt -pass pass:'91J6X7R4FQ9TQPM9JX2Q9X2Z'
cat /tmp/decoded_message.txt

Sorry to be so convoluted, I couldn't risk making this easy while King Malhare watches. — McSkidy
```

- Now let's update the `/home/socmas/2025/wishlist.txt` file with the correct wishlist items to stop the glitching.

```sh
mcskidy@tbfc-web01:/home$ cat > /home/socmas/2025/wishlist.txt
Hardware security keys (YubiKey or similar)
Commercial password manager subscriptions (team seats)
Endpoint detection & response (EDR) licenses
Secure remote access appliances (jump boxes)
Cloud workload scanning credits (container/image scanning)
Threat intelligence feed subscription
Secure code review / SAST tool access
Dedicated secure test lab VM pool
Incident response runbook templates and playbooks
Electronic safe drive with encrypted backups
^C
```

- Ensure correct permissions to edit the file.

```sh
sudo chmod 644 /home/socmas/2025/wishlist.txt
```

<div style={{textAlign: 'center'}}>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/linux_cli_shell_bells/website_wishlist.png" alt="website_whishlist" width="400"/>
</div>

- We got the `ciphertext` output from the website. Let's save it to a `/tmp/website_output.txt` file.

```sh
cat > /tmp/website_output.txt
U2FsdGVkX1/7xkS74RBSFMhpR9Pv0PZrzOVsIzd38sUGzGsDJOB9FbybAWod5HMsa+WIr5HDprvK6aFNYuOGoZ60qI7axX5Qnn1E6D+BPknRgktrZTbMqfJ7wnwCExyU8ek1RxohYBehaDyUWxSNAkARJtjVJEAOA1kEOUOah11iaPGKxrKRV0kVQKpEVnuZMbf0gv1ih421QvmGucErFhnuX+xv63drOTkYy15s9BVCUfKmjMLniusI0tqs236zv4LGbgrcOfgir+P+gWHc2TVW4CYszVXlAZUg07JlLLx1jkF85TIMjQ3B91MQS+btaH2WGWFyakmqYltz6jB5DOSCA6AMQYsqLlx53ORLxy3FfJhZTl9iwlrgEZjJZjDoXBBMdlMCOjKUZfTbt3pnlHWEaGJD7NoTgywFsIw5cz7hkmAMxAIkNn/5hGd/S7mwVp9h6GmBUYDsgHWpRxvnjh0s5kVD8TYjLzVnvaNFS4FXrQCiVIcp1ETqicXRjE4T0MYdnFD8h7og3ZlAFixM3nYpUYgKnqi2o2zJg7fEZ8c=
^C
```

- Let's use the command in the note to decrypt the message using OpenSSL.

```sh
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -salt -base64 -in /tmp/website_output.txt -out /tmp/decoded_message.txt -pass pass:'91J6X7R4FQ9TQPM9JX2Q9X2Z'
```

- Let's check the decoded message.

```js
eddi_knapp@tbfc-web01:~/Documents$ cat /tmp/decoded_message.txt 
Well done — the glitch is fixed. Amazing job going the extra mile and saving the site. Take this flag THM{w3lcome_2_A0c_2025}

NEXT STEP:
If you fancy something a little...spicier....use the FLAG you just obtained as the passphrase to unlock:
/home/eddi_knapp/.secret/dir

That hidden directory has been archived and encrypted with the FLAG.
Inside it you'll find the sidequest key.
```

- Let's use the flag `THM{w3lcome_2_A0c_2025}` to unlock the `/home/eddi_knapp/.secret/dir` archive.

```sh
eddi_knapp@tbfc-web01:~/.secret$ gpg --batch --yes \
--pinentry-mode loopback \
--passphrase 'THM{w3lcome_2_A0c_2025}' \
-d dir.tar.gz.gpg > dir.tar.gz

gpg: AES256.CFB encrypted data
gpg: encrypted with 1 passphrase
```

- Let's extract the archive to get the sidequest key.

```sh
tar -xzf dir.tar.gz
cd dir
```

- Now open the picture to get the sidequest key.

<div style={{textAlign: 'center'}}>
    <img src="/img/ctf_writeups/tryhackme/advent_cyber_2025/linux_cli_shell_bells/egg_picture.png" alt="egg picture" width="400"/>
</div>

- We found the sidequest key: `now_you_see_me`

## Completion

This was a fun introduction to Linux CLI and basic commands. I worked with files, directories, users, and encryption/decryption. Looking forward to the next challenges in the Advent of Cyber 2025 series!
