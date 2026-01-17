import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerUser, clearError } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import Input from "../../components/input/input.jsx";
import googleIcon from "../../assets/Google.png";
import rightImage from "../../assets/Image.png";
import vectorUnderline from "../../assets/Vector 11.png";

function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) {
      dispatch(clearError());
    }
    if (validationError) {
      setValidationError("");
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setValidationError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setValidationError("Email is required");
      return false;
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setValidationError("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      setValidationError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return false;
    }
    // Backend requires: at least one lowercase, one uppercase, and one number
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordPattern.test(formData.password)) {
      setValidationError("Password must contain at least one lowercase letter, one uppercase letter, and one number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    dispatch(clearError());

    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(registerUser(formData));
      
      if (registerUser.fulfilled.match(result)) {
        toast.success("Account created successfully! Please sign in.");
        // Navigate to sign in page
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      } else if (registerUser.rejected.match(result)) {
        const errorMessage = result.payload || "Registration failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen max-h-screen flex  flex-col sm:flex-row ">
      {/* Left Section - Form */}
      <div className="  sm:flex-1 max-sm:w-full flex flex-col mb-8 sm:mb-0 ">
        {/* Header */}
        <div className="pl-[135px] pt-[40px] pb-4 sm:pb-0">
          <img src={logo} alt="logo" className="w-[107.31px] h-[30px]" />
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-6 pb-6 sm:pb-0">
          <div className="w-full max-w-[404px] mx-auto">
            <div className="mb-[25px]">
              <p className="text-[24px] md:text-[30px] font-semibold leading-[100%] tracking-[0%] text-[#1B212D] mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                Create new account
              </p>
              <p className="text-[14px] md:text-[16px] font-normal leading-[100%] tracking-[0%] text-[#78778B]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                Welcome back! Please enter your details
              </p>
            </div>

            {validationError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {validationError}
              </div>
            )}

            <form className="flex flex-col gap-[25px]" onSubmit={handleSubmit}>
              <Input 
                type="text" 
                name="fullName"
                label="Full Name" 
                placeholder="Mahfuzul Nabil" 
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input 
                type="email" 
                name="email"
                label="Email" 
                placeholder="example@gmail.com" 
                value={formData.email}
                onChange={handleChange}
              />
              <Input 
                type="password" 
                name="password"
                label="Password" 
                placeholder="......." 
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[48px] bg-[#C8EE44] rounded-lg text-[#1B212D] font-semibold text-base hover:bg-[#45D075] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Kumbh Sans, sans-serif' }}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <button
                type="button"
                className="w-full h-[48px] bg-white border border-[#E5E5E5] rounded-lg text-[#1B212D] font-semibold text-base flex items-center justify-center gap-2 hover:bg-[#FAFAFA] transition-colors"
                style={{ fontFamily: 'Kumbh Sans, sans-serif' }}
              >
                <img src={googleIcon} alt="Google" className="w-5 h-5" />
                <span className=" font-semibold text-[#78778B]  " >Sign in with google</span> 
                
              </button>

              <div className="text-center text-sm text-[#78778B]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                Already have an account?{" "}
                <Link to="/signin" className="text-[#4ADE80] font-semibold relative inline-block">
                  <span className="relative z-10">Sign in</span>
                  <img 
                    src={vectorUnderline} 
                    alt="underline" 
                    className="absolute -bottom-4 left-0 w-full"
                    style={{ height: 'auto', zIndex: 0 }}
                  />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className=" sm:flex-1  items-center justify-center ">
        <div className=" w-full h-full flex items-center justify-center ">
          <img 
            src={rightImage} 
            alt="Illustration" 
            className="w-full h-full  max-w-full max-h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;