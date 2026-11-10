// Turns the hub's command ("on", "lock", "play") into a brand's message.
public interface CommandFormat {
    String encode(String command);
}
