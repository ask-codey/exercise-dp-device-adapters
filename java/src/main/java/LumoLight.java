import java.util.ArrayList;
import java.util.List;

// Lumo's own code, from its library. Don't change it: Lumo's next update would put it back.
// It keeps a log of what it was told, in its own words, so the tests can check it.
public class LumoLight {
    private final String room;
    public final List<String> log = new ArrayList<>();

    public LumoLight(String room) { this.room = room; }

    public String room() { return room; }
    public void setPower(boolean on) { log.add(on ? "power on" : "power off"); }
}
