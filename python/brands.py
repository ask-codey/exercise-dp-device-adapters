"""The brands' own code, from their libraries. Don't change this file: each brand's next update would put it back.
Each device keeps a log of what it was told, in its own words, so the tests can check it."""


class LumoLight:
    def __init__(self, room):
        self.room = room
        self.log = []

    def set_power(self, on):
        self.log.append("power on" if on else "power off")


class BoltLock:
    def __init__(self, door):
        self.door = door
        self.log = []
        self._status = "ENGAGED"

    def engage(self):
        self._status = "ENGAGED"
        self.log.append("ENGAGED")

    def release(self):
        self._status = "RELEASED"
        self.log.append("RELEASED")

    def status(self):
        return self._status


class TuneoSpeaker:
    def __init__(self, room):
        self.room = room
        self.log = []

    def start_stream(self, url):
        self.log.append(f"streaming {url}")

    def halt(self):
        self.log.append("halted")
