import java.util.ArrayList;
import java.util.List;

// Bolt's own code, from its library. Don't change it. Bolt marks its class final, so nothing can extend it.
public final class BoltLock {
    private final String door;
    private String status = "ENGAGED";
    public final List<String> log = new ArrayList<>();

    public BoltLock(String door) { this.door = door; }

    public String door() { return door; }
    public void engage() { status = "ENGAGED"; log.add("ENGAGED"); }
    public void release() { status = "RELEASED"; log.add("RELEASED"); }
    public String status() { return status; }
}
