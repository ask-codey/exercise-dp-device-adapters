import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

// The tests for your code. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.
class ThreeBrandsTest {

    // What the hub does today. These pass before you change anything: keep them passing.

    @Test
    void theRoutinesSwitchTheLumoLights() {
        Hub hub = new Hub();
        LumoLight kitchen = new LumoLight("kitchen");
        hub.addLumo("kitchen", kitchen);
        hub.goodMorning();
        hub.leaveHome();
        assertEquals(List.of("power on", "power off"), kitchen.log, "Keep this working: good morning turns the Lumo kitchen light on, and leaving home turns it off.");
    }

    @Test
    void theRemoteSendsByBrandName() {
        assertEquals("kitchen light: on", Remote.send("lumo", "kitchen light", "on"), "Keep this working: \"on\" to the Lumo kitchen light reads back \"kitchen light: on\".");
        assertEquals("front door: locked", Remote.send("bolt", "front door", "lock"), "Keep this working: \"lock\" to the Bolt front door reads back \"front door: locked\".");
        assertEquals("front door: unlocked", Remote.send("bolt", "front door", "unlock"), "Keep this working: \"unlock\" to the Bolt front door reads back \"front door: unlocked\".");
        assertEquals("kitchen speaker: playing", Remote.send("tuneo", "kitchen speaker", "play"), "Keep this working: \"play\" to the Tuneo kitchen speaker reads back \"kitchen speaker: playing\".");
    }

    // The ticket's new requirements. These fail until the work is done.

    @Test
    void theBoltFrontDoorJoinsTheRoutines() {
        Hub hub = new Hub();
        BoltLock frontDoor = new BoltLock("front door");
        hub.addBolt("front door", frontDoor);
        hub.goodMorning();
        hub.leaveHome();
        assertEquals(List.of("RELEASED", "ENGAGED"), frontDoor.log, "Not yet: good morning unlocks the Bolt front door (RELEASED), and leaving home locks it (ENGAGED).");
    }

    @Test
    void theTuneoSpeakerJoinsTheRoutines() {
        Hub hub = new Hub();
        TuneoSpeaker kitchen = new TuneoSpeaker("kitchen");
        hub.addTuneo("kitchen", kitchen);
        hub.goodMorning();
        hub.leaveHome();
        assertEquals(List.of("streaming https://tuneo.example/news", "halted"), kitchen.log, "Not yet: good morning plays the news on the Tuneo speaker, and leaving home halts it.");
    }

    @Test
    void aLightFromAFourthBrandJoinsWithoutChangingTheHub() {
        Hub hub = new Hub();
        GlintLight bedroom = new GlintLight();
        hub.addLight("bedroom", new GlintLightAdapter(bedroom));
        hub.goodMorning();
        hub.leaveHome();
        assertEquals(List.of("illuminate", "darken"), bedroom.log, "Not yet: a Glint light, added as a Light, turns on in the morning and off when you leave.");
    }

    @Test
    void eachBrandsKitHandsOutPartsThatWorkTogether() {
        assertEquals("kitchen light: on", Remote.sendWith(new LumoKit(), "kitchen light", "on"), "Not yet: with Lumo's kit, \"on\" reads back \"kitchen light: on\".");
        assertEquals("front door: locked", Remote.sendWith(new BoltKit(), "front door", "lock"), "Not yet: with Bolt's kit, \"lock\" reads back \"front door: locked\".");
        assertEquals("kitchen speaker: stopped", Remote.sendWith(new TuneoKit(), "kitchen speaker", "stop"), "Not yet: with Tuneo's kit, \"stop\" reads back \"kitchen speaker: stopped\".");
    }

    @Test
    void aFourthBrandsKitWorksWithoutChangingTheRemote() {
        assertEquals("bedroom light: on", Remote.sendWith(new GlintKit(), "bedroom light", "on"), "Not yet: with Glint's kit, \"on\" reads back \"bedroom light: on\".");
        assertEquals("bedroom light: off", Remote.sendWith(new GlintKit(), "bedroom light", "off"), "Not yet: with Glint's kit, \"off\" reads back \"bedroom light: off\".");
    }

    // A fourth brand, Glint, the way its team will hand it to us: their light, a small class they wrote to the hub's
    // Light promise, and a kit of their bridge's parts.
    static class GlintLight {
        final List<String> log = new ArrayList<>();
        void illuminate() { log.add("illuminate"); }
        void darken() { log.add("darken"); }
    }

    static class GlintLightAdapter implements Light {
        private final GlintLight glint;
        GlintLightAdapter(GlintLight glint) { this.glint = glint; }
        public void on() { glint.illuminate(); }
        public void off() { glint.darken(); }
    }

    static class GlintConnection implements Connection { public String send(String message) { return message.equals("illuminate") ? "LIT" : message.equals("darken") ? "DARK" : "error"; } }
    static class GlintFormat implements CommandFormat { public String encode(String command) { return command.equals("on") ? "illuminate" : "darken"; } }
    static class GlintReader implements StatusReader { public String read(String reply) { return reply.equals("LIT") ? "on" : reply.equals("DARK") ? "off" : "error"; } }

    static class GlintKit implements BrandKit {
        public Connection connection() { return new GlintConnection(); }
        public CommandFormat format() { return new GlintFormat(); }
        public StatusReader reader() { return new GlintReader(); }
    }
}
