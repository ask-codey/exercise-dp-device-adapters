import type { BoltLock, LumoLight, TuneoSpeaker } from "./brands.ts";

// The hub's own promises. The phone app, the wall panel and the other teams' code are written against these.
export interface Light { on(): void; off(): void; }
export interface Lock { lock(): void; unlock(): void; }
export interface Speaker { play(station: string): void; stop(): void; }

export const NEWS = "https://tuneo.example/news";

// The hub's front door: the setup screen adds devices, and the routines run them.
export class Hub {
  private readonly lumoLights: LumoLight[] = [];

  addLumo(room: string, lumo: LumoLight): void { this.lumoLights.push(lumo); }

  // The setup screen already calls these three. They don't do anything yet.
  addBolt(door: string, bolt: BoltLock): void { }
  addTuneo(room: string, tuneo: TuneoSpeaker): void { }
  addLight(room: string, light: Light): void { }

  goodMorning(): void {
    for (const lumo of this.lumoLights) {
      lumo.setPower(true);
    }
  }

  leaveHome(): void {
    for (const lumo of this.lumoLights) {
      lumo.setPower(false);
    }
  }
}
