export default function TextSectionRender({ data }) {
  return (
    <section className="py-24 px-6 sm:px-12 lg:px-20 bg-gradient-to-b from-white via-blue-50/30 to-indigo-50/30">
      <div className="max-w-4xl mx-auto text-center">
        {/* Icon */}
        {data.icon && (
          <div className="w-24 h-24 mx-auto mb-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl text-4xl font-black text-white">
            {data.icon}
          </div>
        )}

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-8 leading-tight">
          {data.title || "About Our Products"}
        </h2>

        {/* Description */}
        <div className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed space-y-8">
          {typeof data.description === "string" ? (
            <p>{data.description}</p>
          ) : (
            data.description?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
