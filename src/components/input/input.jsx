function Input({ 
  type = "text", 
  label, 
  placeholder, 
  defaultValue, 
  value, 
  onChange, 
  name, 
  error = null,
  disabled = false,
  required = false
}) {
  return (
    <div className="space-y-1 sm:space-y-2">
      <label 
        htmlFor={name}
        className="text-xs sm:text-sm font-medium text-[#1B212D]"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-lg border bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[#1B212D] placeholder:text-[#78778B] outline-none transition ${
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
            : 'border-[#E5E5E5] focus:border-[#C8EE44] focus:ring-1 focus:ring-[#C8EE44]'
        } ${
          disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : ''
        }`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p 
          id={`${name}-error`}
          className="text-xs text-red-500 mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;

