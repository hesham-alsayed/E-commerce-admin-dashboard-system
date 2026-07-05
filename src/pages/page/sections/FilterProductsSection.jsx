import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Filters({
  section,
  updateSection,
  collections,
  categories,
  subCategories,
}) {
  const props = section.props;

  const set = (key, value) => {
    updateSection(section.id, { [key]: value });
  };

  return (
    <div className="space-y-4">

      {/* ================= COLLECTION ================= */}
      <div>
        <label className="text-sm">Collection</label>

        <Select
          value={props.collection || ""}
          onValueChange={(val) => {
            set("collection", val);
            set("category", null);
            set("subCategory", null);
          }}
        >
          <SelectTrigger className="w-55">
            <SelectValue placeholder="Select collection" />
          </SelectTrigger>

          <SelectContent>
            {collections.map((c) => (
              <SelectItem key={c._id} value={c._id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ================= CATEGORY ================= */}
      <div>
        <label className="text-sm">Category</label>

        <Select
          value={props.category || ""}
          onValueChange={(val) => {
            set("category", val);
            set("subCategory", null);
          }}
          disabled={!props.collection}   // 👈 مهم
        >
          <SelectTrigger className="w-55">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            {categories
              .filter((c) => c.collectionId === props.collection)
              .map((c) => (
                <SelectItem key={c._id} value={c._id}>
                  {c.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* ================= SUB CATEGORY ================= */}
      {props.category && (
        <div>
          <label className="text-sm">Sub Category</label>

          <Select
            value={props.subCategory || ""}
            onValueChange={(val) => set("subCategory", val)}
          >
            <SelectTrigger className="w-55">
              <SelectValue placeholder="Select sub category" />
            </SelectTrigger>

            <SelectContent>
              {subCategories
                .filter((s) => s.categoryId === props.category)
                .map((s) => (
                  <SelectItem key={s._id} value={s._id}>
                    {s.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}