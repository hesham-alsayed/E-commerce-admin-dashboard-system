import React from "react";

export default function FormInput({
  label,
  name,
  register,
  errors,
  type = "text",
  placeholder,
  rules = {},
}) {
  const validationRules = {
    required: rules.required ?? `${label} is required`,
    ...rules,
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[16px] capitalize">{label}</span>

      <input
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        {...register(name, validationRules)}
        className="w-full border p-2 rounded-sm border-gray-200 focus:outline-none focus:border-gray-400"
      />

      {errors?.[name]?.message && (
        <span className="text-red-500 text-xs">{errors[name].message}</span>
      )}
    </div>
  );
}
