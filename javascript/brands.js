// The brands' own code, from their libraries. Don't change this file: each brand's next update would put it back.
// Each device keeps a log of what it was told, in its own words, so the tests can check it.

export class LumoLight {
  room;
  log = [];
  constructor(room) { this.room = room; }
  setPower(on) { this.log.push(on ? "power on" : "power off"); }
}

export class BoltLock {
  door;
  log = [];
  #status = "ENGAGED";
  constructor(door) { this.door = door; }
  engage() { this.#status = "ENGAGED"; this.log.push("ENGAGED"); }
  release() { this.#status = "RELEASED"; this.log.push("RELEASED"); }
  status() { return this.#status; }
}

export class TuneoSpeaker {
  room;
  log = [];
  constructor(room) { this.room = room; }
  startStream(url) { this.log.push(`streaming ${url}`); }
  halt() { this.log.push("halted"); }
}
