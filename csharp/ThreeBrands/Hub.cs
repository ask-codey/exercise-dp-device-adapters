namespace ThreeBrands;

// The hub's own promises. The phone app, the wall panel and the other teams' code are written against these.
public interface ILight { void On(); void Off(); }
public interface ILock { void Lock(); void Unlock(); }
public interface ISpeaker { void Play(string station); void Stop(); }

// The hub's front door: the setup screen adds devices, and the routines run them.
public class Hub
{
    public const string News = "https://tuneo.example/news";

    private readonly List<LumoLight> lumoLights = new List<LumoLight>();

    public void AddLumo(string room, LumoLight lumo) => lumoLights.Add(lumo);

    // The setup screen already calls these three. They don't do anything yet.
    public void AddBolt(string door, BoltLock bolt) { }
    public void AddTuneo(string room, TuneoSpeaker tuneo) { }
    public void AddLight(string room, ILight light) { }

    public void GoodMorning()
    {
        foreach (LumoLight lumo in lumoLights)
        {
            lumo.SetPower(true);
        }
    }

    public void LeaveHome()
    {
        foreach (LumoLight lumo in lumoLights)
        {
            lumo.SetPower(false);
        }
    }
}
