namespace ThreeBrands;

// The brands' own code, from their libraries. Don't change this file: each brand's next update would put it back.
// Each device keeps a log of what it was told, in its own words, so the tests can check it.

public class LumoLight
{
    public string Room { get; }
    public List<string> Log { get; } = new List<string>();
    public LumoLight(string room) { Room = room; }
    public void SetPower(bool on) => Log.Add(on ? "power on" : "power off");
}

// Bolt marks its class sealed, so nothing can extend it.
public sealed class BoltLock
{
    private string status = "ENGAGED";
    public string Door { get; }
    public List<string> Log { get; } = new List<string>();
    public BoltLock(string door) { Door = door; }
    public void Engage() { status = "ENGAGED"; Log.Add("ENGAGED"); }
    public void Release() { status = "RELEASED"; Log.Add("RELEASED"); }
    public string Status() => status;
}

public class TuneoSpeaker
{
    public string Room { get; }
    public List<string> Log { get; } = new List<string>();
    public TuneoSpeaker(string room) { Room = room; }
    public void StartStream(string url) => Log.Add($"streaming {url}");
    public void Halt() => Log.Add("halted");
}
