public class BoltFormat implements CommandFormat {
    public String encode(String command) { return command.equals("lock") ? "B:1" : "B:0"; }
}
