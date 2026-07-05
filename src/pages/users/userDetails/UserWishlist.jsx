export default function UserWishlist({ user }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      
      <h3 className="font-semibold mb-4">
        Wishlist Items ({user?.wishlist.length})
      </h3>

      <div className="flex flex-wrap gap-2">
        {user?.wishlist.map((item) => (
          <span
            key={item._id || item}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
          >
            ID: {item._id || item}
          </span>
        ))}
      </div>

    </div>
  );
}