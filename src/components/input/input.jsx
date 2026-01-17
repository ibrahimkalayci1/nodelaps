function Input({ type = "text", label, placeholder, defaultValue, value, onChange, name }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-lime-400"
      />
    </div>
  );
}

export default Input;

