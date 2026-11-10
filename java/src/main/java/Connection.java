// Sends a message to a brand's bridge and hands back its reply. A bridge answers "error" to a message that isn't in its format.
public interface Connection {
    String send(String message);
}
