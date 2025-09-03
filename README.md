# RPC-status-discord-Brawl-Stars

A Node.js script that updates your Discord Rich Presence with live Brawl Stars player stats using the official Brawl Stars API.

Created by **Kaneki**
GitHub Repository: [RPC-status-discord-Brawl-Stars](https://github.com/Kanekilib/RPC-status-discord-Brawl-Stars)

---

## Features

* Live trophies, experience level, and XP-to-next-level
* Best brawler badge and player icon
* Club name and highest trophies
* Win counters for 3v3, Solo, Duo, plus a total wins summary
* Presence buttons:

  * View Profile (Brawlify)
  * GitHub profile link
* Auto-refresh every 60 seconds
* Clear error messages for throttling, invalid keys, invalid IP, and more

---

## Prerequisites

* Discord desktop app running on the same machine
* Node.js 16 or newer
* A Brawl Stars Developer API key with your public IP allow-listed

  * Create/manage keys at: [https://developer.brawlstars.com](https://developer.brawlstars.com)

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Kanekilib/RPC-status-discord-Brawl-Stars.git
cd RPC-status-discord-Brawl-Stars
npm install
```

---

## Configuration

The repository already includes a `config.json` file.
Edit it with your information:

```json
{
  "tag_bs": "#YOURTAG",
  "key_bsdev": "YOUR_BRAWL_STARS_DEV_API_KEY"
}
```

* `tag_bs` is your in-game player tag, including the leading `#`.
* `key_bsdev` is your Brawl Stars Developer API key. Make sure your current public IP is allow-listed.

---

## Usage

Start the script with:

```bash
npm start
```

If everything is configured correctly, you will see:

```
Discord RPC is ready!
```

Your Discord Rich Presence will then display your Brawl Stars stats and refresh automatically every 60 seconds.

---

## What the Presence Shows

* **Details**: trophies, highest trophies, experience level with XP progress
* **State**: wins in 3v3, Solo, Duo, and total
* **Large image**: your player icon ID
* **Small image**: your top brawler
* **Buttons**:

  * View Profile → Links to your Brawlify profile
  * GitHub → Links to the repository

---

## Common Errors

* **API at maximum capacity, request throttled**
  The official API is rate-limited or temporarily saturated. The script retries automatically.

* **Invalid authorization**
  Your API key is incorrect or expired. Update `key_bsdev` in `config.json`.

* **Invalid authorization: API key does not allow access from IP**
  Your current public IP is not allow-listed. Update the key’s IP list in your Supercell developer settings.

* **notFound**
  The player tag is invalid. Double-check `tag_bs`.

* **RPC\_CONNECTION\_TIMEOUT**
  Discord’s IPC could not be reached. Ensure the Discord desktop app is running.

---

## License

MIT License.
