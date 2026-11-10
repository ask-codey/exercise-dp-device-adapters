public class LumoConnection implements Connection {
    public String send(String message) { return message.startsWith("{") ? message : "error"; }
}
