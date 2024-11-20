import { ContentContainer } from '@/components/ui/containers';

export const VideoSection = () => {
  return (
    <ContentContainer className="py-8 sm:py-8">
      <script src="https://fast.wistia.net/player.js" async></script>
      <div
        className="wistia_responsive_padding"
        style={{
          padding: '40.0% 0 0 0',
          position: 'relative',
        }}
      >
        <div
          className="wistia_responsive_wrapper"
          style={{
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
          }}
        >
          <iframe
            src="https://fast.wistia.net/embed/iframe/h30wu6vfb6?web_component=true&seo=false"
            title="Minecraft_ 1.20.1 - Singleplayer 2024-07-03 19-09-15 Video"
            allow="autoplay; fullscreen"
            allowTransparency
            frameBorder="0"
            scrolling="no"
            className="wistia_embed"
            name="wistia_embed"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    </ContentContainer>
  );
};
