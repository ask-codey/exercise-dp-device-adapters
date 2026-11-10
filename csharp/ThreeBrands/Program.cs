using ThreeBrands;

// A demo: tries your code on Maya's house. You don't need to change it.
LumoLight kitchenLight = new LumoLight("kitchen");
BoltLock frontDoor = new BoltLock("front door");
TuneoSpeaker kitchenSpeaker = new TuneoSpeaker("kitchen");

Hub hub = new Hub();
hub.AddLumo("kitchen", kitchenLight);
hub.AddBolt("front door", frontDoor);
hub.AddTuneo("kitchen", kitchenSpeaker);
hub.GoodMorning();
hub.LeaveHome();

Console.WriteLine("Good morning, then leaving home:");
Console.WriteLine("kitchen light (Lumo): " + string.Join(", ", kitchenLight.Log));
Console.WriteLine("front door (Bolt): " + string.Join(", ", frontDoor.Log));
Console.WriteLine("kitchen speaker (Tuneo): " + string.Join(", ", kitchenSpeaker.Log));
Console.WriteLine("By brand name: " + Remote.Send("bolt", "front door", "lock"));
Console.WriteLine("With Bolt's kit: " + Remote.SendWith(new BoltKit(), "front door", "lock"));
