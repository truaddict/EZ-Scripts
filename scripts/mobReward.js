import {
	getBalance,
	updateBalance
} from "ez:economy";

import {
	getPlayerByNAME
} from "ez:player";


const system = server.registerSystem(0, 0);

function randomReward(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

system.listenForEvent("minecraft:entity_death", ({data: eventData}) => {
	const { 
		entity: deadEntity, 
		killer 
	} = eventData;
	const killerName = system.getComponent(killer, "minecraft:nameable").data.name;
	const deadEntityIdentifier = deadEntity.__identifier__.replace("minecraft:", "");
	const player = getPlayerByNAME(killerName);
	//console.log(JSON.stringify(deadEntity));
	
	const mobs = {
		//"zombie" : randomReward(1,1),
		//"zombie_villager_v2" : randomReward(1,1),
		//"husk" : randomReward(1,1),
		//"skeleton" : randomReward(1,1),
		"stray" : randomReward(2,2),
		"creeper" : randomReward(3,3),
		//"spider" : randomReward(1,1),
		//"cave_spider" : randomReward(1,1),
		"witch" : randomReward(5,5),
		//"phantom" : randomReward(1,2),
		//"blaze" : randomReward(2,2),
		"ghast" : randomReward(2,2),
		"ender_dragon" : randomReward(800,800),
		"piglin" : randomReward(3,3),
		"zoglin" : randomReward(4,4),
		"elder_guardian" : randomReward(100,100),
		"endermite" : randomReward(13,13),
		"evoker" : randomReward(5,5),
		"pillager" : randomReward(3,3),
		"ravager" : randomReward(5,5),
		"shulker" : randomReward(10,10),
		"vex" : randomReward(5,5),
		"vindicator" : randomReward(5,5),
		"wither" : randomReward(500,500),
		"wither_skeleton" : randomReward(4,4)
	};
	
	if (deadEntityIdentifier in mobs) {
		let moneyOld = getBalance(player)
		updateBalance(player, mobs[deadEntityIdentifier], "add");
		system.executeCommand(`title "${player.name}" actionbar §Вы заработали §e$${mobs[deadEntityIdentifier]} §fза убийство §6${deadEntity.__identifier__}\n§7Было: §b${moneyOld} §7=> Стало: §b${getBalance(player)}`, () => {});
		//console.log("Player " + player.name + " got $" + mobs[deadEntityIdentifier] + " for killing " + deadEntity.__identifier__);
		//console.log(moneyOld, getBalance(player))
	}
	//else{
	//	//system.executeCommand(`title "${player.name}" actionbar §fYou killed §6${deadEntity.__identifier__}`, () => {});
	//	//console.log("Other mobs detected");
	//}
})
console.log("mobReward.js loaded");
