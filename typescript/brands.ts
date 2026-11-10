// The brands' own code, from their libraries. Don't change this file: each brand's next update would put it back.
// Each device keeps a log of what it was told, in its own words, so the tests can check it.

export class LumoLight {
  readonly room: string;
  readonly log: string[] = [];
  constructor(room: string) { this.room = room; }
  setPower(on: boolean): void { this.log.push(on ? "power on" : "power off"); }
}

export class BoltLock {
  readonly door: string;
  readonly log: string[] = [];
  #status = "ENGAGED";
  constructor(door: string) { this.door = door; }
  engage(): void { this.#status = "ENGAGED"; this.log.push("ENGAGED"); }
  release(): void { this.#status = "RELEASED"; this.log.push("RELEASED"); }
  status(): string { return this.#status; }
}

export class TuneoSpeaker {
  readonly room: string;
  readonly log: string[] = [];
  constructor(room: string) { this.room = room; }
  startStream(url: string): void { this.log.push(`streaming ${url}`); }
  halt(): void { this.log.push("halted"); }
}
