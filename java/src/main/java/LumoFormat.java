public class LumoFormat implements CommandFormat {
    public String encode(String command) { return command.equals("on") ? "{\"power\": true}" : "{\"power\": false}"; }
}
