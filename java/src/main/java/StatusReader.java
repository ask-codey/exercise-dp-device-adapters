// Turns a brand's reply into the hub's word ("on", "locked", "playing").
public interface StatusReader {
    String read(String reply);
}
