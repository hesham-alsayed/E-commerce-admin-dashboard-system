export const validateVariants = (variants) => {
  if (!variants || variants.length === 0) {
    return "You must add at least one variant";
  }

  for (let v of variants) {
    // ✅ color
    if (!v.color || !v.colorCode) {
      return "Each variant must have color";
    }

    // ✅ images
    if (!v.images || v.images.length === 0) {
      return "Each variant must have at least one image";
    }

    // ✅ sizes
    if (!v.sizes || v.sizes.length === 0) {
      return "Each variant must have sizes";
    }

    for (let s of v.sizes) {
      if (!s.size) return "Size is required";

      // 🔥 FIX مهم
      if (s.stock === undefined || Number(s.stock) <= 0) {
        return "Stock must be greater than 0";
      }
    }
  }

  return null;
};
