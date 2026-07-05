export default function OrderItem({ item }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 last:border-none">
      {/* LEFT */}
      <div className="flex items-center gap-3 sm:gap-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-12 h-12 object-cover rounded-lg"
        />

        <div>
          <p className="font-medium text-sm sm:text-base">{item.title}</p>

          <p className="text-xs sm:text-sm text-gray-500">
            Color: {item.color} | Size: {item.size}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex justify-between sm:justify-end gap-6 text-sm w-full sm:w-auto">
        <span>
          ${item.price.toFixed(2)} × {item.quantity}
        </span>

        <span className="font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
