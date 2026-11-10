// A demo: tries your code on Maya's house. You don't need to change it.
import { BoltLock, LumoLight, TuneoSpeaker } from "./brands.ts";
import { Hub } from "./hub.ts";
import { BoltKit, send, sendWith } from "./remote.ts";

const kitchenLight = new LumoLight("kitchen");
const frontDoor = new BoltLock("front door");
const kitchenSpeaker = new TuneoSpeaker("kitchen");

const hub = new Hub();
hub.addLumo("kitchen", kitchenLight);
hub.addBolt("front door", frontDoor);
hub.addTuneo("kitchen", kitchenSpeaker);
hub.goodMorning();
hub.leaveHome();

console.log("Good morning, then leaving home:");
console.log("kitchen light (Lumo): " + kitchenLight.log.join(", "));
console.log("front door (Bolt): " + frontDoor.log.join(", "));
console.log("kitchen speaker (Tuneo): " + kitchenSpeaker.log.join(", "));
console.log("By brand name: " + send("bolt", "front door", "lock"));
console.log("With Bolt's kit: " + sendWith(new BoltKit(), "front door", "lock"));
