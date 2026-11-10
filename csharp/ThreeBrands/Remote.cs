namespace ThreeBrands;

// Sending a command to a device's bridge needs three parts from the same brand.
public interface IConnection { string Send(string message); }
public interface ICommandFormat { string Encode(string command); }
public interface IStatusReader { string Read(string reply); }

// Each brand's parts. A bridge answers "error" when a message isn't in its own format.
public class LumoConnection : IConnection { public string Send(string message) => message.StartsWith("{") ? message : "error"; }
public class LumoFormat : ICommandFormat { public string Encode(string command) => command == "on" ? "{\"power\": true}" : "{\"power\": false}"; }
public class LumoReader : IStatusReader { public string Read(string reply) => reply == "{\"power\": true}" ? "on" : reply == "{\"power\": false}" ? "off" : "error"; }

public class BoltConnection : IConnection { public string Send(string message) => message == "B:1" ? "ENGAGED" : message == "B:0" ? "RELEASED" : "error"; }
public class BoltFormat : ICommandFormat { public string Encode(string command) => command == "lock" ? "B:1" : "B:0"; }
public class BoltReader : IStatusReader { public string Read(string reply) => reply == "ENGAGED" ? "locked" : reply == "RELEASED" ? "unlocked" : "error"; }

public class TuneoConnection : IConnection { public string Send(string message) => message == "cmd=play" ? "state=playing" : message == "cmd=stop" ? "state=stopped" : "error"; }
public class TuneoFormat : ICommandFormat { public string Encode(string command) => "cmd=" + command; }
public class TuneoReader : IStatusReader { public string Read(string reply) => reply.StartsWith("state=") ? reply.Substring(6) : "error"; }

// A brand's kit of parts. The phone team's new screen is written against this.
public interface IBrandKit
{
    IConnection Connection();
    ICommandFormat Format();
    IStatusReader Reader();
}

// The phone team's screen already makes these kits. They aren't written yet.
public class LumoKit : IBrandKit
{
    public IConnection Connection() => throw new NotImplementedException("Not yet");
    public ICommandFormat Format() => throw new NotImplementedException("Not yet");
    public IStatusReader Reader() => throw new NotImplementedException("Not yet");
}

public class BoltKit : IBrandKit
{
    public IConnection Connection() => throw new NotImplementedException("Not yet");
    public ICommandFormat Format() => throw new NotImplementedException("Not yet");
    public IStatusReader Reader() => throw new NotImplementedException("Not yet");
}

public class TuneoKit : IBrandKit
{
    public IConnection Connection() => throw new NotImplementedException("Not yet");
    public ICommandFormat Format() => throw new NotImplementedException("Not yet");
    public IStatusReader Reader() => throw new NotImplementedException("Not yet");
}

// The phone app's remote control: sends a command to one device and says how it is now.
public static class Remote
{
    public static string Send(string brand, string device, string command)
    {
        string reply = ConnectionFor(brand).Send(FormatFor(brand).Encode(command));
        return $"{device}: {ReaderFor(brand).Read(reply)}";
    }

    // The phone team's screen already calls this with a brand's kit. It doesn't do anything yet.
    public static string SendWith(IBrandKit kit, string device, string command) => "not yet";

    private static IConnection ConnectionFor(string brand)
    {
        if (brand == "lumo") return new LumoConnection();
        if (brand == "bolt") return new BoltConnection();
        return new TuneoConnection();
    }

    private static ICommandFormat FormatFor(string brand)
    {
        if (brand == "lumo") return new LumoFormat();
        if (brand == "bolt") return new BoltFormat();
        return new TuneoFormat();
    }

    private static IStatusReader ReaderFor(string brand)
    {
        if (brand == "lumo") return new LumoReader();
        if (brand == "bolt") return new BoltReader();
        return new TuneoReader();
    }
}
