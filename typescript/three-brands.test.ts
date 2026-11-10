// The tests for your code. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.
import assert from "node:assert/strict";
import { test } from "node:test";
import { BoltLock, LumoLight, TuneoSpeaker } from "./brands.ts";
import { BoltKit, LumoKit, TuneoKit, send, sendWith, type BrandKit, type CommandFormat, type Connection, type StatusReader } from "./remote.ts";
import { Hub, type Light } from "./hub.ts";

// What the hub does today. These pass before you change anything: keep them passing.

test("the routines switch the Lumo lights", () => {
  const hub = new Hub();
  const kitchen = new LumoLight("kitchen");
  hub.addLumo("kitchen", kitchen);
  hub.goodMorning();
  hub.leaveHome();
  assert.deepEqual(kitchen.log, ["power on", "power off"], "Keep this working: good morning turns the Lumo kitchen light on, and leaving home turns it off.");
});

test("the remote sends by brand name", () => {
  assert.equal(send("lumo", "kitchen light", "on"), "kitchen light: on", 'Keep this working: "on" to the Lumo kitchen light reads back "kitchen light: on".');
  assert.equal(send("bolt", "front door", "lock"), "front door: locked", 'Keep this working: "lock" to the Bolt front door reads back "front door: locked".');
  assert.equal(send("bolt", "front door", "unlock"), "front door: unlocked", 'Keep this working: "unlock" to the Bolt front door reads back "front door: unlocked".');
  assert.equal(send("tuneo", "kitchen speaker", "play"), "kitchen speaker: playing", 'Keep this working: "play" to the Tuneo kitchen speaker reads back "kitchen speaker: playing".');
});

// The ticket's new requirements. These fail until the work is done.

test("the Bolt front door joins the routines", () => {
  const hub = new Hub();
  const frontDoor = new BoltLock("front door");
  hub.addBolt("front door", frontDoor);
  hub.goodMorning();
  hub.leaveHome();
  assert.deepEqual(frontDoor.log, ["RELEASED", "ENGAGED"], "Not yet: good morning unlocks the Bolt front door (RELEASED), and leaving home locks it (ENGAGED).");
});

test("the Tuneo speaker joins the routines", () => {
  const hub = new Hub();
  const kitchen = new TuneoSpeaker("kitchen");
  hub.addTuneo("kitchen", kitchen);
  hub.goodMorning();
  hub.leaveHome();
  assert.deepEqual(kitchen.log, ["streaming https://tuneo.example/news", "halted"], "Not yet: good morning plays the news on the Tuneo speaker, and leaving home halts it.");
});

test("a light from a fourth brand joins without changing the hub", () => {
  const hub = new Hub();
  const bedroom = new GlintLight();
  hub.addLight("bedroom", new GlintLightAdapter(bedroom));
  hub.goodMorning();
  hub.leaveHome();
  assert.deepEqual(bedroom.log, ["illuminate", "darken"], "Not yet: a Glint light, added as a Light, turns on in the morning and off when you leave.");
});

test("each brand's kit hands out parts that work together", () => {
  assert.equal(sendWith(new LumoKit(), "kitchen light", "on"), "kitchen light: on", `Not yet: with Lumo's kit, "on" reads back "kitchen light: on".`);
  assert.equal(sendWith(new BoltKit(), "front door", "lock"), "front door: locked", `Not yet: with Bolt's kit, "lock" reads back "front door: locked".`);
  assert.equal(sendWith(new TuneoKit(), "kitchen speaker", "stop"), "kitchen speaker: stopped", `Not yet: with Tuneo's kit, "stop" reads back "kitchen speaker: stopped".`);
});

test("a fourth brand's kit works without changing the remote", () => {
  assert.equal(sendWith(new GlintKit(), "bedroom light", "on"), "bedroom light: on", `Not yet: with Glint's kit, "on" reads back "bedroom light: on".`);
  assert.equal(sendWith(new GlintKit(), "bedroom light", "off"), "bedroom light: off", `Not yet: with Glint's kit, "off" reads back "bedroom light: off".`);
});

// A fourth brand, Glint, the way its team will hand it to us: their light, a small class they wrote to the hub's
// Light promise, and a kit of their bridge's parts.
class GlintLight {
  readonly log: string[] = [];
  illuminate(): void { this.log.push("illuminate"); }
  darken(): void { this.log.push("darken"); }
}

class GlintLightAdapter implements Light {
  private readonly glint: GlintLight;
  constructor(glint: GlintLight) { this.glint = glint; }
  on(): void { this.glint.illuminate(); }
  off(): void { this.glint.darken(); }
}

class GlintConnection implements Connection { send(message: string): string { return message === "illuminate" ? "LIT" : message === "darken" ? "DARK" : "error"; } }
class GlintFormat implements CommandFormat { encode(command: string): string { return command === "on" ? "illuminate" : "darken"; } }
class GlintReader implements StatusReader { read(reply: string): string { return reply === "LIT" ? "on" : reply === "DARK" ? "off" : "error"; } }

class GlintKit implements BrandKit {
  connection(): Connection { return new GlintConnection(); }
  format(): CommandFormat { return new GlintFormat(); }
  reader(): StatusReader { return new GlintReader(); }
}
