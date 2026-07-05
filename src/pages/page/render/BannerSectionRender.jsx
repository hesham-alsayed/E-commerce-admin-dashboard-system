export default function BannerSectionRender({ data }) {

  return (
    <div className="relative w-full h-[70vh] min-h-125 overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900/20 to-black/30">
      {/* Background Image */}
      {data?.image?.url && (
        <img
          src={data.image.url}
          className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:scale-[1.02] transition-all duration-1000 ease-out"
          alt="Hero Banner"
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 py-12 sm:px-12 lg:px-20 xl:px-32 text-white">
        {/* Badge */}
        {data.badge && (
          <span className="mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full text-xs font-bold tracking-wide animate-pulse">
            {data.badge}
          </span>
        )}

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 bg-linear-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
          {data.title || "Discover Amazing Products"}
        </h1>

        {/* Subtitle */}
        {data.subtitle && (
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 opacity-95">
            {data.subtitle}
          </h2>
        )}

        {/* Description */}
        {data.description && (
          <p className="text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed opacity-90">
            {data.description}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {data.buttonText && (
            <button className="px-10 py-4 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 min-w-[200px] flex items-center justify-center gap-3">
              {data.buttonText}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          )}
          {data.secondaryButtonText && (
            <button className="px-10 py-4 border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold text-lg rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {data.secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
