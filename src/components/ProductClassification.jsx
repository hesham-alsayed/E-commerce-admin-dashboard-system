export default function ProductClassification({
  product,
}) {
  return (
    <div className="bg-white border rounded-xl p-4 space-y-3">

      <h3 className="font-semibold">
        Classification
      </h3>

      <div className="text-sm space-y-2">
        <p>
          Collection:{" "}
          <b>{product.collection?.name}</b>
        </p>

        <p>
          Category:{" "}
          <b>{product.category?.name}</b>
        </p>

        <p>
          Subcategory:{" "}
          <b>{product.subcategory?.name}</b>
        </p>

        <p>
          Gender: <b>{product.gender}</b>
        </p>

        <p>
          Type: <b>{product.type}</b>
        </p>
      </div>
    </div>
  );
}