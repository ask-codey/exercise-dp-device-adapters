// The phone app's remote control: sends a command to one device's bridge and says how it is now.
// Each brand needs three parts, from the same brand: a connection (send a message, get the reply), a command format
// (the hub's command into the brand's message) and a status reader (the brand's reply into the hub's word).
// A bridge answers "error" to a message that isn't in its own format.

export interface Connection { send(message: string): string; }
export interface CommandFormat { encode(command: string): string; }
export interface StatusReader { read(reply: string): string; }
export class LumoConnection implements Connection { send(message: string): string { return message.startsWith("{") ? message : "error"; } }
export class LumoFormat implements CommandFormat { encode(command: string): string { return command === "on" ? '{"power": true}' : '{"power": false}'; } }
export class LumoReader implements StatusReader { read(reply: string): string { return reply === '{"power": true}' ? "on" : reply === '{"power": false}' ? "off" : "error"; } }

export class BoltConnection implements Connection { send(message: string): string { return message === "B:1" ? "ENGAGED" : message === "B:0" ? "RELEASED" : "error"; } }
export class BoltFormat implements CommandFormat { encode(command: string): string { return command === "lock" ? "B:1" : "B:0"; } }
export class BoltReader implements StatusReader { read(reply: string): string { return reply === "ENGAGED" ? "locked" : reply === "RELEASED" ? "unlocked" : "error"; } }

export class TuneoConnection implements Connection { send(message: string): string { return message === "cmd=play" ? "state=playing" : message === "cmd=stop" ? "state=stopped" : "error"; } }
export class TuneoFormat implements CommandFormat { encode(command: string): string { return "cmd=" + command; } }
export class TuneoReader implements StatusReader { read(reply: string): string { return reply.startsWith("state=") ? reply.slice(6) : "error"; } }

// A brand's kit of parts. The phone team's new screen is written against this.
export interface BrandKit {
  connection(): Connection;
  format(): CommandFormat;
  reader(): StatusReader;
}

// The phone team's screen already makes these kits. They aren't written yet.
export class LumoKit implements BrandKit {
  connection(): Connection { throw new Error("Not yet"); }
  format(): CommandFormat { throw new Error("Not yet"); }
  reader(): StatusReader { throw new Error("Not yet"); }
}

export class BoltKit implements BrandKit {
  connection(): Connection { throw new Error("Not yet"); }
  format(): CommandFormat { throw new Error("Not yet"); }
  reader(): StatusReader { throw new Error("Not yet"); }
}

export class TuneoKit implements BrandKit {
  connection(): Connection { throw new Error("Not yet"); }
  format(): CommandFormat { throw new Error("Not yet"); }
  reader(): StatusReader { throw new Error("Not yet"); }
}

export function send(brand: string, device: string, command: string): string {
  const reply = connectionFor(brand).send(formatFor(brand).encode(command));
  return `${device}: ${readerFor(brand).read(reply)}`;
}

// The phone team's screen already calls this with a brand's kit. It doesn't do anything yet.
export function sendWith(kit: BrandKit, device: string, command: string): string {
  return "not yet";
}

function connectionFor(brand: string): Connection {
  if (brand === "lumo") return new LumoConnection();
  if (brand === "bolt") return new BoltConnection();
  return new TuneoConnection();
}

function formatFor(brand: string): CommandFormat {
  if (brand === "lumo") return new LumoFormat();
  if (brand === "bolt") return new BoltFormat();
  return new TuneoFormat();
}

function readerFor(brand: string): StatusReader {
  if (brand === "lumo") return new LumoReader();
  if (brand === "bolt") return new BoltReader();
  return new TuneoReader();
}
