public class TuneoReader implements StatusReader {
    public String read(String reply) { return reply.startsWith("state=") ? reply.substring(6) : "error"; }
}
