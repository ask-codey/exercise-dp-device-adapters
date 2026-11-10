"""The phone app's remote control: sends a command to one device's bridge and says how it is now.

Each brand needs three parts, from the same brand: a connection (send a message, get the reply), a command format
(the hub's command into the brand's message) and a status reader (the brand's reply into the hub's word).
A bridge answers "error" to a message that isn't in its own format. A brand's kit has connection(), format()
and reader() methods; the phone team's new screen is written that way."""


class LumoConnection:
    def send(self, message):
        return message if message.startswith("{") else "error"


class LumoFormat:
    def encode(self, command):
        return '{"power": true}' if command == "on" else '{"power": false}'


class LumoReader:
    def read(self, reply):
        return {'{"power": true}': "on", '{"power": false}': "off"}.get(reply, "error")


class BoltConnection:
    def send(self, message):
        return {"B:1": "ENGAGED", "B:0": "RELEASED"}.get(message, "error")


class BoltFormat:
    def encode(self, command):
        return "B:1" if command == "lock" else "B:0"


class BoltReader:
    def read(self, reply):
        return {"ENGAGED": "locked", "RELEASED": "unlocked"}.get(reply, "error")


class TuneoConnection:
    def send(self, message):
        return {"cmd=play": "state=playing", "cmd=stop": "state=stopped"}.get(message, "error")


class TuneoFormat:
    def encode(self, command):
        return "cmd=" + command


class TuneoReader:
    def read(self, reply):
        return reply[6:] if reply.startswith("state=") else "error"


# The phone team's screen already makes these kits. They aren't written yet.
class LumoKit:
    pass


class BoltKit:
    pass


class TuneoKit:
    pass


def send(brand, device, command):
    reply = _connection_for(brand).send(_format_for(brand).encode(command))
    return f"{device}: {_reader_for(brand).read(reply)}"


def send_with(kit, device, command):
    """The phone team's screen already calls this with a brand's kit. It doesn't do anything yet."""
    return "not yet"


def _connection_for(brand):
    if brand == "lumo":
        return LumoConnection()
    if brand == "bolt":
        return BoltConnection()
    return TuneoConnection()


def _format_for(brand):
    if brand == "lumo":
        return LumoFormat()
    if brand == "bolt":
        return BoltFormat()
    return TuneoFormat()


def _reader_for(brand):
    if brand == "lumo":
        return LumoReader()
    if brand == "bolt":
        return BoltReader()
    return TuneoReader()
