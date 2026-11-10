public class BoltReader implements StatusReader {
    public String read(String reply) { return reply.equals("ENGAGED") ? "locked" : reply.equals("RELEASED") ? "unlocked" : "error"; }
}
