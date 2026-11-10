"""The hub's front door: the setup screen adds devices, and the routines run them.

The hub's own promises, which the phone app, the wall panel and the other teams' code are written against:
a light has on() and off(), a lock has lock() and unlock(), and a speaker has play(station) and stop()."""

NEWS = "https://tuneo.example/news"


class Hub:
    def __init__(self):
        self.lumo_lights = []

    def add_lumo(self, room, lumo):
        self.lumo_lights.append(lumo)

    # The setup screen already calls these three. They don't do anything yet.
    def add_bolt(self, door, bolt):
        pass

    def add_tuneo(self, room, tuneo):
        pass

    def add_light(self, room, light):
        pass

    def good_morning(self):
        for lumo in self.lumo_lights:
            lumo.set_power(True)

    def leave_home(self):
        for lumo in self.lumo_lights:
            lumo.set_power(False)
