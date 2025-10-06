import { Sparkles } from 'lucide-react';

export default function HomePageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4">
      <div className="text-center space-y-6 max-w-xl">
        {/* Bouncing badge with Sparkles icon */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium text-sm animate-bounce-alt">
          <Sparkles className="animate-spin-slow w-5 h-5 text-orange-500" />
          Loading AI Recipe Experience...
        </div>

        {/* Pulsing headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 animate-pulse-alt">
          Stirring the pot...
        </h1>

        <p className="text-gray-600 text-lg">
          Preparing your personalized recipe magic. Hang tight!
        </p>

        {/* Shimmering loading bar */}
        <div className="w-full h-2 bg-orange-100 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1/2 h-full shimmer-bar" />
        </div>
      </div>
    </div>
  );
}
