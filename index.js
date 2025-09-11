// Created by Kaneki
// GitHub: github.com/Kanekilib
// BÊTA VERSION
// After // is nigga

const rpc = require("discord-rpc");
const bot = new rpc.Client({ transport: "ipc" });
const chalk = require('chalk');
const config = require('./config.json');
const fetch = require('node-fetch');

const key = { clientId: "719260341682438194" };

function capitalizeWords(str) {
	str = str.split(" ");
	for (let i = 0, x = str.length; i < x; i++) {
		str[i] = str[i][0].toUpperCase() + str[i].substr(1);
	}
	return str.join(" ");
}

async function setActivity() {
	fetch(`https://api.brawlstars.com/v1/players/%23${config.tag_bs.replace("#", "")}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${config.key_bsdev}`,
			'Content-Type': 'application/json'
		}
	}).then(async res => {
		if (!res.ok) {
			const e = await res.text();

			if (e.includes(`{"message": "API at maximum capacity, request throttled."}`)) {
				console.log(chalk.hex("#FFFF00")("Brawl Stars API is currently at maximum capacity... Retrying\nIf this issue happens more than once, please press CTRL + C"));
				setTimeout(function () {
					setActivity();
				}, 4000);
				return;
			} else if (e.includes(`{"reason":"accessDenied","message":"Invalid authorization"}`)) {
				console.error(chalk.hex("#FF6347")(`Invalid API Key provided. Please check your config file.`));
				process.exit();
			} else if (e.includes(`{"reason":"accessDenied.invalidIp","message":"Invalid authorization: API key does not allow access from IP`)) {
				console.error(chalk.hex("#FF6347")(`API Key does not allow access from your IP.\nCheck your IP at https://www.whatismyip.com`));
				process.exit();
			} else if (e.includes(`{"reason":"notFound"}`)) {
				console.error(chalk.hex("#FF6347")(`${config.tag_bs} is not a valid Tag! Please check if it is correct!`));
				process.exit();
			} else {
				console.error(chalk.hex("#FF6347")(`An error occurred. Please report this at https://github.com/ThatMajesticGuy/Brawl-Stars-Discord-RPC/issues\n\n${e}`));
				process.exit();
			}
		}

		const body = await res.json();
		let topBrawler = body.brawlers.sort((a, b) => b.trophies - a.trophies)[0].name.toLowerCase();
		if (topBrawler === "mr. p") topBrawler = "mr_p";
		if (topBrawler === "el primo") topBrawler = "el_primo";
		let namedBrawler = capitalizeWords(topBrawler);

		if (namedBrawler === "El_primo") namedBrawler = "El Primo";
		if (namedBrawler === "8-bit") namedBrawler = "8-Bit";
		if (namedBrawler === "Mr_p") namedBrawler = "Mr. P";

		let xpMax = 40 + 10 * (body.expLevel - 1);
		let num = 0;
		for (let i = 0; i < (body.expLevel - 1); i++) {
			num = num + i;
		}
		let neededXP = Math.abs((40 * (body.expLevel - 1)) + (10 * num) - body.expPoints);

		// Additional options for more details
		let clubName = body.club ? body.club.name : "No Club";
		let highestTrophies = body.highestTrophies ? body.highestTrophies.toLocaleString() : "N/A";
		let bestRoboRumbleTime = body.bestRoboRumbleTime ? body.bestRoboRumbleTime : "N/A";
		let bestTimeAsBigBrawler = body.bestTimeAsBigBrawler ? body.bestTimeAsBigBrawler : "N/A";
		let totalVictories = (body['3vs3Victories'] + body.soloVictories + body.duoVictories).toLocaleString();

		bot.setActivity({
			details: `🏆 ${body.trophies.toLocaleString()} Trophées | 🥇 Max: ${highestTrophies}\n🎖️ Niveau ${body.expLevel.toLocaleString()} (${neededXP}/${xpMax})`,
			state: `⚔️ 3v3: ${body['3vs3Victories'].toLocaleString()} | 🧑 Solo: ${body.soloVictories.toLocaleString()} | 👥 Duo: ${body.duoVictories.toLocaleString()} | 🏅 Total: ${totalVictories}`,
			largeImageKey: `${body.icon.id}`,
			largeImageText: `🏰 Club: ${clubName}`,
			smallImageKey: `${topBrawler}`,
			smallImageText: `🔝 Brawler: ${namedBrawler}`,
			partySize: [body.brawlers.length, 64],
			buttons: [
				{ label: "View Profil", url: `https://brawlify.com/stats/profile/${config.tag_bs.replace("#", "")}` },
				{ label: "GitHub", url: "https://github.com/Kanekilib" }
			]
		}).catch((err) => {
			if (err.message === "RPC_CONNECTION_TIMEOUT") {
				console.error(chalk.hex("#FF6347")(`Discord RPC connection timeout`));
				process.exit();
			}
		});

	}).catch(err => {
		console.log(err.message);
		process.exit();
	});
}

bot.on("ready", function () {
	if (config.tag_bs === "your bs tag here") {
		console.log(chalk.hex("#FF6347")("Error: Please set your Brawl Stars tag in config.json"));
		process.exit();
	}
	if (config.key_bsdev === "key dev here") {
		console.log(chalk.hex("#FF6347")("Error: Please set your Brawl Stars API key in config.json"));
		process.exit();
	}
	setActivity();
	console.log(chalk.hex("#7CFC00")("Discord RPC is ready!"));
	setInterval(() => {
		setActivity();
	}, 60000);
});

bot.login(key).catch((err) => {
	if (err.message === "RPC_CONNECTION_TIMEOUT") {
		console.error(chalk.hex("#FF6347")(`Discord RPC connection timeout`));
		process.exit();
	}
});

