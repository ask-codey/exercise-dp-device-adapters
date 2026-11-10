"""The tests for your code. You don't need to change this file.
Each message says what was expected, so a failing test tells you what to look at."""
from brands import BoltLock, LumoLight, TuneoSpeaker
from hub import Hub
from remote import BoltKit, LumoKit, TuneoKit, send, send_with


# What the hub does today. These pass before you change anything: keep them passing.

def test_the_routines_switch_the_lumo_lights():
    hub = Hub()
    kitchen = LumoLight("kitchen")
    hub.add_lumo("kitchen", kitchen)
    hub.good_morning()
    hub.leave_home()
    assert kitchen.log == ["power on", "power off"], \
        "Keep this working: good morning turns the Lumo kitchen light on, and leaving home turns it off."


def test_the_remote_sends_by_brand_name():
    assert send("lumo", "kitchen light", "on") == "kitchen light: on", \
        'Keep this working: "on" to the Lumo kitchen light reads back "kitchen light: on".'
    assert send("bolt", "front door", "lock") == "front door: locked", \
        'Keep this working: "lock" to the Bolt front door reads back "front door: locked".'
    assert send("bolt", "front door", "unlock") == "front door: unlocked", \
        'Keep this working: "unlock" to the Bolt front door reads back "front door: unlocked".'
    assert send("tuneo", "kitchen speaker", "play") == "kitchen speaker: playing", \
        'Keep this working: "play" to the Tuneo kitchen speaker reads back "kitchen speaker: playing".'


# The ticket's new requirements. These fail until the work is done.

def test_the_bolt_front_door_joins_the_routines():
    hub = Hub()
    front_door = BoltLock("front door")
    hub.add_bolt("front door", front_door)
    hub.good_morning()
    hub.leave_home()
    assert front_door.log == ["RELEASED", "ENGAGED"], \
        "Not yet: good morning unlocks the Bolt front door (RELEASED), and leaving home locks it (ENGAGED)."


def test_the_tuneo_speaker_joins_the_routines():
    hub = Hub()
    kitchen = TuneoSpeaker("kitchen")
    hub.add_tuneo("kitchen", kitchen)
    hub.good_morning()
    hub.leave_home()
    assert kitchen.log == ["streaming https://tuneo.example/news", "halted"], \
        "Not yet: good morning plays the news on the Tuneo speaker, and leaving home halts it."


def test_a_light_from_a_fourth_brand_joins_without_changing_the_hub():
    hub = Hub()
    bedroom = GlintLight()
    hub.add_light("bedroom", GlintLightAdapter(bedroom))
    hub.good_morning()
    hub.leave_home()
    assert bedroom.log == ["illuminate", "darken"], \
        "Not yet: a Glint light, added as a light, turns on in the morning and off when you leave."


def test_each_brands_kit_hands_out_parts_that_work_together():
    assert send_with(LumoKit(), "kitchen light", "on") == "kitchen light: on", \
        'Not yet: with Lumo\'s kit, "on" reads back "kitchen light: on".'
    assert send_with(BoltKit(), "front door", "lock") == "front door: locked", \
        'Not yet: with Bolt\'s kit, "lock" reads back "front door: locked".'
    assert send_with(TuneoKit(), "kitchen speaker", "stop") == "kitchen speaker: stopped", \
        'Not yet: with Tuneo\'s kit, "stop" reads back "kitchen speaker: stopped".'


def test_a_fourth_brands_kit_works_without_changing_the_remote():
    assert send_with(GlintKit(), "bedroom light", "on") == "bedroom light: on", \
        'Not yet: with Glint\'s kit, "on" reads back "bedroom light: on".'
    assert send_with(GlintKit(), "bedroom light", "off") == "bedroom light: off", \
        'Not yet: with Glint\'s kit, "off" reads back "bedroom light: off".'


# A fourth brand, Glint, the way its team will hand it to us: their light, a small class they wrote to the hub's
# light promise, and a kit of their bridge's parts.
class GlintLight:
    def __init__(self):
        self.log = []

    def illuminate(self):
        self.log.append("illuminate")

    def darken(self):
        self.log.append("darken")


class GlintLightAdapter:
    def __init__(self, glint):
        self.glint = glint

    def on(self):
        self.glint.illuminate()

    def off(self):
        self.glint.darken()


class GlintConnection:
    def send(self, message):
        return {"illuminate": "LIT", "darken": "DARK"}.get(message, "error")


class GlintFormat:
    def encode(self, command):
        return "illuminate" if command == "on" else "darken"


class GlintReader:
    def read(self, reply):
        return {"LIT": "on", "DARK": "off"}.get(reply, "error")


class GlintKit:
    def connection(self):
        return GlintConnection()

    def format(self):
        return GlintFormat()

    def reader(self):
        return GlintReader()
