public class LumoReader implements StatusReader {
    public String read(String reply) { return reply.equals("{\"power\": true}") ? "on" : reply.equals("{\"power\": false}") ? "off" : "error"; }
}
