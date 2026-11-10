// A demo: tries your code on Maya's house. You don't need to change it.
// Run it with: java src/main/java/Demo.java
public class Demo {
    public static void main(String[] args) {
        LumoLight kitchenLight = new LumoLight("kitchen");
        BoltLock frontDoor = new BoltLock("front door");
        TuneoSpeaker kitchenSpeaker = new TuneoSpeaker("kitchen");

        Hub hub = new Hub();
        hub.addLumo("kitchen", kitchenLight);
        hub.addBolt("front door", frontDoor);
        hub.addTuneo("kitchen", kitchenSpeaker);
        hub.goodMorning();
        hub.leaveHome();

        System.out.println("Good morning, then leaving home:");
        System.out.println("kitchen light (Lumo): " + String.join(", ", kitchenLight.log));
        System.out.println("front door (Bolt): " + String.join(", ", frontDoor.log));
        System.out.println("kitchen speaker (Tuneo): " + String.join(", ", kitchenSpeaker.log));
        System.out.println("By brand name: " + Remote.send("bolt", "front door", "lock"));
        System.out.println("With Bolt's kit: " + Remote.sendWith(new BoltKit(), "front door", "lock"));
    }
}
