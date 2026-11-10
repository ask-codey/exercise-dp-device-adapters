// A brand's kit of parts. The phone team's new screen is written against this.
public interface BrandKit {
    Connection connection();
    CommandFormat format();
    StatusReader reader();
}
