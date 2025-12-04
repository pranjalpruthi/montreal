import BreathingText from '@/components/fancy/text/breathing-text';

/**
 * @description Renders the initial full-page loader with the application logo and Mahamantra.
 * @returns {JSX.Element} The rendered initial page loader.
 */
export const InitialPageLoader = () => (
  <div className="fixed inset-0 flex flex-col justify-center items-center h-screen w-screen bg-zinc-950 z-50 text-center p-4">
    <img 
      src="https://eboutz7r2t.ufs.sh/f/CIaDvBjhtHOFeZLejZABcIFWLYH3tXMxo86V2KUjQpsfOwTi" 
      onError={(e) => { e.currentTarget.src = "/iskm-montreal.webp" }}
      alt="ISKM Logo" 
      className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-6 animate-pulse rounded-full object-cover" 
    />
    <div className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
      <BreathingText
        fromFontVariationSettings="'wght' 100, 'slnt' 0"
        toFontVariationSettings="'wght' 800, 'slnt' -10"
        staggerDuration={0.05}
        className="block mb-1 sm:mb-2"
      >
        Hare Kṛṣṇa Hare Kṛṣṇa
      </BreathingText>
      <BreathingText
        fromFontVariationSettings="'wght' 100, 'slnt' 0"
        toFontVariationSettings="'wght' 800, 'slnt' -10"
        staggerDuration={0.05}
        staggerFrom="last"
        className="block mb-1 sm:mb-2"
      >
        Kṛṣṇa Kṛṣṇa Hare Hare
      </BreathingText>
      <BreathingText
        fromFontVariationSettings="'wght' 100, 'slnt' 0"
        toFontVariationSettings="'wght' 800, 'slnt' -10"
        staggerDuration={0.05}
        className="block mb-1 sm:mb-2"
      >
        Hare Rāma Hare Rāma
      </BreathingText>
      <BreathingText
        fromFontVariationSettings="'wght' 100, 'slnt' 0"
        toFontVariationSettings="'wght' 800, 'slnt' -10"
        staggerDuration={0.05}
        staggerFrom="last"
        className="block"
      >
        Rāma Rāma Hare Hare
      </BreathingText>
    </div>
  </div>
);

export default InitialPageLoader;
