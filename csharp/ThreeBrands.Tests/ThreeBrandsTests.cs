using ThreeBrands;

namespace ThreeBrands.Tests;

// The tests for your code. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.

[TestClass]
public class ThreeBrandsTests
{
    // What the hub does today. These pass before you change anything: keep them passing.

    [TestMethod]
    public void TheRoutinesSwitchTheLumoLights()
    {
        Hub hub = new Hub();
        LumoLight kitchen = new LumoLight("kitchen");
        hub.AddLumo("kitchen", kitchen);
        hub.GoodMorning();
        hub.LeaveHome();
        CollectionAssert.AreEqual(new List<string> { "power on", "power off" }, kitchen.Log, "Keep this working: good morning turns the Lumo kitchen light on, and leaving home turns it off.");
    }

    [TestMethod]
    public void TheRemoteSendsByBrandName()
    {
        Assert.AreEqual("kitchen light: on", Remote.Send("lumo", "kitchen light", "on"), "Keep this working: \"on\" to the Lumo kitchen light reads back \"kitchen light: on\".");
        Assert.AreEqual("front door: locked", Remote.Send("bolt", "front door", "lock"), "Keep this working: \"lock\" to the Bolt front door reads back \"front door: locked\".");
        Assert.AreEqual("front door: unlocked", Remote.Send("bolt", "front door", "unlock"), "Keep this working: \"unlock\" to the Bolt front door reads back \"front door: unlocked\".");
        Assert.AreEqual("kitchen speaker: playing", Remote.Send("tuneo", "kitchen speaker", "play"), "Keep this working: \"play\" to the Tuneo kitchen speaker reads back \"kitchen speaker: playing\".");
    }

    // The ticket's new requirements. These fail until the work is done.

    [TestMethod]
    public void TheBoltFrontDoorJoinsTheRoutines()
    {
        Hub hub = new Hub();
        BoltLock frontDoor = new BoltLock("front door");
        hub.AddBolt("front door", frontDoor);
        hub.GoodMorning();
        hub.LeaveHome();
        CollectionAssert.AreEqual(new List<string> { "RELEASED", "ENGAGED" }, frontDoor.Log, "Not yet: good morning unlocks the Bolt front door (RELEASED), and leaving home locks it (ENGAGED).");
    }

    [TestMethod]
    public void TheTuneoSpeakerJoinsTheRoutines()
    {
        Hub hub = new Hub();
        TuneoSpeaker kitchen = new TuneoSpeaker("kitchen");
        hub.AddTuneo("kitchen", kitchen);
        hub.GoodMorning();
        hub.LeaveHome();
        CollectionAssert.AreEqual(new List<string> { "streaming https://tuneo.example/news", "halted" }, kitchen.Log, "Not yet: good morning plays the news on the Tuneo speaker, and leaving home halts it.");
    }

    [TestMethod]
    public void ALightFromAFourthBrandJoinsWithoutChangingTheHub()
    {
        Hub hub = new Hub();
        GlintLight bedroom = new GlintLight();
        hub.AddLight("bedroom", new GlintLightAdapter(bedroom));
        hub.GoodMorning();
        hub.LeaveHome();
        CollectionAssert.AreEqual(new List<string> { "illuminate", "darken" }, bedroom.Log, "Not yet: a Glint light, added as a Light, turns on in the morning and off when you leave.");
    }

    [TestMethod]
    public void EachBrandsKitHandsOutPartsThatWorkTogether()
    {
        Assert.AreEqual("kitchen light: on", Remote.SendWith(new LumoKit(), "kitchen light", "on"), "Not yet: with Lumo's kit, \"on\" reads back \"kitchen light: on\".");
        Assert.AreEqual("front door: locked", Remote.SendWith(new BoltKit(), "front door", "lock"), "Not yet: with Bolt's kit, \"lock\" reads back \"front door: locked\".");
        Assert.AreEqual("kitchen speaker: stopped", Remote.SendWith(new TuneoKit(), "kitchen speaker", "stop"), "Not yet: with Tuneo's kit, \"stop\" reads back \"kitchen speaker: stopped\".");
    }

    [TestMethod]
    public void AFourthBrandsKitWorksWithoutChangingTheRemote()
    {
        Assert.AreEqual("bedroom light: on", Remote.SendWith(new GlintKit(), "bedroom light", "on"), "Not yet: with Glint's kit, \"on\" reads back \"bedroom light: on\".");
        Assert.AreEqual("bedroom light: off", Remote.SendWith(new GlintKit(), "bedroom light", "off"), "Not yet: with Glint's kit, \"off\" reads back \"bedroom light: off\".");
    }

    // A fourth brand, Glint, the way its team will hand it to us: their light, a small class they wrote to the hub's
    // Light promise, and a kit of their bridge's parts.
    private class GlintLight
    {
        public List<string> Log { get; } = new List<string>();
        public void Illuminate() => Log.Add("illuminate");
        public void Darken() => Log.Add("darken");
    }

    private class GlintLightAdapter : ILight
    {
        private readonly GlintLight glint;
        public GlintLightAdapter(GlintLight glint) { this.glint = glint; }
        public void On() => glint.Illuminate();
        public void Off() => glint.Darken();
    }

    private class GlintConnection : IConnection { public string Send(string message) => message == "illuminate" ? "LIT" : message == "darken" ? "DARK" : "error"; }
    private class GlintFormat : ICommandFormat { public string Encode(string command) => command == "on" ? "illuminate" : "darken"; }
    private class GlintReader : IStatusReader { public string Read(string reply) => reply == "LIT" ? "on" : reply == "DARK" ? "off" : "error"; }

    private class GlintKit : IBrandKit
    {
        public IConnection Connection() => new GlintConnection();
        public ICommandFormat Format() => new GlintFormat();
        public IStatusReader Reader() => new GlintReader();
    }
}
