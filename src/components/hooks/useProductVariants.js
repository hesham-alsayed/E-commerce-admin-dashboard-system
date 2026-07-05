export default function useProductVariants(variants, setVariants) {
  const handleVariantChange = (vIndex, field, value) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === vIndex ? { ...v, [field]: value } : v)),
    );
  };

  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        color: "",
        colorCode: "#000000",
        images: [],
        sizes: [],
      },
    ]);
  };

  const handleRemoveVariant = (vIndex) => {
    setVariants((prev) => prev.filter((_, i) => i !== vIndex));
  };

  const handleImageUpload = (vIndex, files) => {
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setVariants((prev) =>
      prev.map((v, i) =>
        i === vIndex ? { ...v, images: [...v.images, ...newImages] } : v,
      ),
    );
  };

  const handleRemoveImage = (vIndex, imgIndex) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === vIndex
          ? {
              ...v,
              images: v.images.filter((_, idx) => idx !== imgIndex),
            }
          : v,
      ),
    );
  };

  const handleSizeChange = (vIndex, sIndex, field, value) => {
    setVariants((prev) =>
      prev.map((v, i) => {
        if (i !== vIndex) return v;

        const sizes = v.sizes.map((s, idx) =>
          idx === sIndex ? { ...s, [field]: value } : s,
        );

        return { ...v, sizes };
      }),
    );
  };

  const handleRemoveSize = (vIndex, sIndex) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === vIndex
          ? {
              ...v,
              sizes: v.sizes.filter((_, idx) => idx !== sIndex),
            }
          : v,
      ),
    );
  };

  const handleAddSize = (vIndex, sizeObj = { size: "", stock: 0 }) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === vIndex
          ? {
              ...v,
              sizes: [...v.sizes, sizeObj],
            }
          : v,
      ),
    );
  };

  return {
    handleVariantChange,
    handleAddVariant,
    handleRemoveVariant,
    handleImageUpload,
    handleRemoveImage,
    handleSizeChange,
    handleRemoveSize,
    handleAddSize,
  };
}
