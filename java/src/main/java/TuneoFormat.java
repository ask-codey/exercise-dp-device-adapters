public class TuneoFormat implements CommandFormat {
    public String encode(String command) { return "cmd=" + command; }
}
