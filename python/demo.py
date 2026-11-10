"""A demo: tries your code on Maya's house. You don't need to change it."""
from brands import BoltLock, LumoLight, TuneoSpeaker
from hub import Hub
from remote import BoltKit, send, send_with

kitchen_light = LumoLight("kitchen")
front_door = BoltLock("front door")
kitchen_speaker = TuneoSpeaker("kitchen")

hub = Hub()
hub.add_lumo("kitchen", kitchen_light)
hub.add_bolt("front door", front_door)
hub.add_tuneo("kitchen", kitchen_speaker)
hub.good_morning()
hub.leave_home()

print("Good morning, then leaving home:")
print("kitchen light (Lumo): " + ", ".join(kitchen_light.log))
print("front door (Bolt): " + ", ".join(front_door.log))
print("kitchen speaker (Tuneo): " + ", ".join(kitchen_speaker.log))
print("By brand name: " + send("bolt", "front door", "lock"))
print("With Bolt's kit: " + send_with(BoltKit(), "front door", "lock"))
