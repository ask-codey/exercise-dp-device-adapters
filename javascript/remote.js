// The phone app's remote control: sends a command to one device's bridge and says how it is now.
// Each brand needs three parts, from the same brand: a connection (send a message, get the reply), a command format
// (the hub's command into the brand's message) and a status reader (the brand's reply into the hub's word).
// A bridge answers "error" to a message that isn't in its own format.

export class LumoConnection { send(message) { return message.startsWith("{") ? message : "error"; } }
export class LumoFormat { encode(command) { return command === "on" ? '{"power": true}' : '{"power": false}'; } }
export class LumoReader { read(reply) { return reply === '{"power": true}' ? "on" : reply === '{"power": false}' ? "off" : "error"; } }

export class BoltConnection { send(message) { return message === "B:1" ? "ENGAGED" : message === "B:0" ? "RELEASED" : "error"; } }
export class BoltFormat { encode(command) { return command === "lock" ? "B:1" : "B:0"; } }
export class BoltReader { read(reply) { return reply === "ENGAGED" ? "locked" : reply === "RELEASED" ? "unlocked" : "error"; } }

export class TuneoConnection { send(message) { return message === "cmd=play" ? "state=playing" : message === "cmd=stop" ? "state=stopped" : "error"; } }
export class TuneoFormat { encode(command) { return "cmd=" + command; } }
export class TuneoReader { read(reply) { return reply.startsWith("state=") ? reply.slice(6) : "error"; } }

// A brand's kit has connection(), format() and reader() methods; the phone team's new screen is written that way.

// The phone team's screen already makes these kits. They aren't written yet.
export class LumoKit { }
export class BoltKit { }
export class TuneoKit { }

export function send(brand, device, command) {
  const reply = connectionFor(brand).send(formatFor(brand).encode(command));
  return `${device}: ${readerFor(brand).read(reply)}`;
}

// The phone team's screen already calls this with a brand's kit. It doesn't do anything yet.
export function sendWith(kit, device, command) {
  return "not yet";
}

function connectionFor(brand) {
  if (brand === "lumo") return new LumoConnection();
  if (brand === "bolt") return new BoltConnection();
  return new TuneoConnection();
}

function formatFor(brand) {
  if (brand === "lumo") return new LumoFormat();
  if (brand === "bolt") return new BoltFormat();
  return new TuneoFormat();
}

function readerFor(brand) {
  if (brand === "lumo") return new LumoReader();
  if (brand === "bolt") return new BoltReader();
  return new TuneoReader();
}
