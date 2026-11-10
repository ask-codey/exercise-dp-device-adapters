// The hub's own promises, which the phone app, the wall panel and the other teams' code are written against:
// a light has on() and off(), a lock has lock() and unlock(), and a speaker has play(station) and stop().

export const NEWS = "https://tuneo.example/news";

// The hub's front door: the setup screen adds devices, and the routines run them.
export class Hub {
  #lumoLights = [];

  addLumo(room, lumo) { this.#lumoLights.push(lumo); }

  // The setup screen already calls these three. They don't do anything yet.
  addBolt(door, bolt) { }
  addTuneo(room, tuneo) { }
  addLight(room, light) { }

  goodMorning() {
    for (const lumo of this.#lumoLights) {
      lumo.setPower(true);
    }
  }

  leaveHome() {
    for (const lumo of this.#lumoLights) {
      lumo.setPower(false);
    }
  }
}
