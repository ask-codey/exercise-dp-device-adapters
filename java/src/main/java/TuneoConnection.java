public class TuneoConnection implements Connection {
    public String send(String message) { return message.equals("cmd=play") ? "state=playing" : message.equals("cmd=stop") ? "state=stopped" : "error"; }
}
