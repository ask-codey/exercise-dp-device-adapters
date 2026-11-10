public class BoltConnection implements Connection {
    public String send(String message) { return message.equals("B:1") ? "ENGAGED" : message.equals("B:0") ? "RELEASED" : "error"; }
}
