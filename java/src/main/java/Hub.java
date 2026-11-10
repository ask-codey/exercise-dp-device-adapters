import java.util.ArrayList;
import java.util.List;

// The hub's front door: the setup screen adds devices, and the routines run them.
public class Hub {
    public static final String NEWS = "https://tuneo.example/news";

    private final List<LumoLight> lumoLights = new ArrayList<>();

    public void addLumo(String room, LumoLight lumo) { lumoLights.add(lumo); }

    // The setup screen already calls these three. They don't do anything yet.
    public void addBolt(String door, BoltLock bolt) { }
    public void addTuneo(String room, TuneoSpeaker tuneo) { }
    public void addLight(String room, Light light) { }

    public void goodMorning() {
        for (LumoLight lumo : lumoLights) {
            lumo.setPower(true);
        }
    }

    public void leaveHome() {
        for (LumoLight lumo : lumoLights) {
            lumo.setPower(false);
        }
    }
}
