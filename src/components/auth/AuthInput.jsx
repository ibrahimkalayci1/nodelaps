
  
  export default function AuthInput() {
    return (
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
  
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-xl border px-4 py-3 outline-none transition
          ${error ? "border-red-500" : "border-gray-200 focus:border-lime-400"}`}
        />
  
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
  