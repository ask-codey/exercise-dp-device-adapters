// The phone app's remote control: sends a command to one device and says how it is now.
public class Remote {
    public static String send(String brand, String device, String command) {
        String reply = connectionFor(brand).send(formatFor(brand).encode(command));
        return device + ": " + readerFor(brand).read(reply);
    }

    // The phone team's screen already calls this with a brand's kit. It doesn't do anything yet.
    public static String sendWith(BrandKit kit, String device, String command) {
        return "not yet";
    }

    private static Connection connectionFor(String brand) {
        if (brand.equals("lumo")) return new LumoConnection();
        if (brand.equals("bolt")) return new BoltConnection();
        return new TuneoConnection();
    }

    private static CommandFormat formatFor(String brand) {
        if (brand.equals("lumo")) return new LumoFormat();
        if (brand.equals("bolt")) return new BoltFormat();
        return new TuneoFormat();
    }

    private static StatusReader readerFor(String brand) {
        if (brand.equals("lumo")) return new LumoReader();
        if (brand.equals("bolt")) return new BoltReader();
        return new TuneoReader();
    }
}
