import java.util.ArrayList;
import java.util.List;

// Tuneo's own code, from its library. Don't change it.
public class TuneoSpeaker {
    private final String room;
    public final List<String> log = new ArrayList<>();

    public TuneoSpeaker(String room) { this.room = room; }

    public String room() { return room; }
    public void startStream(String url) { log.add("streaming " + url); }
    public void halt() { log.add("halted"); }
}
