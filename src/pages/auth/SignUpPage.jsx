import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerUser, clearError } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import Input from "../../components/input/input.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import googleIcon from "../../assets/Google.png";
import rightImage from "../../assets/Image.png";

function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.user);

  // Redirect if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    fullName: null,
    email: null,
    password: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: null,
      });
    }
    
    if (error) {
      dispatch(clearError());
    }
  };

  const validateForm = () => {
    const errors = {
      fullName: null,
      email: null,
      password: null,
    };
    let isValid = true;

    // Full Name validation
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
      isValid = false;
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = "Full name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email address";
        isValid = false;
      }
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    } else {
      // Backend requires: at least one lowercase, one uppercase, and one number
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
      if (!passwordPattern.test(formData.password)) {
        errors.password = "Password must contain at least one lowercase letter, one uppercase letter, and one number";
        isValid = false;
      }
    }

    setFieldErrors(errors);
    return { isValid, errors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    const validation = validateForm();
    if (!validation.isValid) {
      // Focus on first error field
      const firstErrorField = Object.keys(validation.errors).find(key => validation.errors[key]);
      if (firstErrorField) {
        setTimeout(() => {
          const element = document.getElementById(firstErrorField);
          if (element) {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
      return;
    }

    try {
      const result = await dispatch(registerUser(formData));
      
      if (registerUser.fulfilled.match(result)) {
        toast.success("Account created successfully! Please sign in.");
        // Navigate to sign in page
        setTimeout(() => {
          navigate("/signin", { replace: true });
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
    <div className="min-h-screen max-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Section - Form */}
      <div className="lg:flex-1 w-full flex flex-col min-h-screen lg:min-h-0">
        {/* Header */}
        <div className="px-4 sm:px-6 md:px-8 lg:pl-[135px] pt-6 sm:pt-8 lg:pt-[40px] pb-4 lg:pb-0">
          <img src={logo} alt="logo" className="w-[90px] sm:w-[107.31px] h-auto" />
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-6 pb-8 sm:pb-6 lg:pb-0">
          <div className="w-full max-w-[404px] mx-auto">
            <div className="mb-6 sm:mb-[25px]">
              <p className="text-[24px] sm:text-[28px] md:text-[30px] font-semibold leading-[100%] tracking-[0%] text-[#1B212D] mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                Create new account
              </p>
              <p className="text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[100%] tracking-[0%] text-[#78778B]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                Welcome back! Please enter your details
              </p>
            </div>

            {error && (
              <div className="mb-4 p-2.5 sm:p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-xs sm:text-sm" role="alert">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-5 sm:gap-6 md:gap-[25px]" onSubmit={handleSubmit} noValidate>
              <Input 
                type="text" 
                name="fullName"
                label="Full Name" 
                placeholder="Mahfuzul Nabil" 
                value={formData.fullName}
                onChange={handleChange}
                error={fieldErrors.fullName}
                disabled={loading}
                required
              />
              <Input 
                type="email" 
                name="email"
                label="Email" 
                placeholder="example@gmail.com" 
                value={formData.email}
                onChange={handleChange}
                error={fieldErrors.email}
                disabled={loading}
                required
              />
              <Input 
                type="password" 
                name="password"
                label="Password" 
                placeholder="......." 
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
                disabled={loading}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[48px] sm:h-[50px] bg-[#C8EE44] rounded-lg text-[#1B212D] font-semibold text-sm sm:text-base hover:bg-[#B8DE34] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                style={{ fontFamily: 'Kumbh Sans, sans-serif' }}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="text-[#1B212D]" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <button
                type="button"
                disabled={loading}
                className="w-full h-[48px] sm:h-[50px] bg-white border border-[#E5E5E5] rounded-lg text-[#1B212D] font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-[#FAFAFA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Kumbh Sans, sans-serif' }}
              >
                <img src={googleIcon} alt="Google" className="w-5 h-5" />
                <span className="font-semibold text-[#78778B] text-xs sm:text-sm md:text-base">Sign up with google</span>
              </button>

              <div className="text-center text-xs sm:text-sm text-[#78778B] mt-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                Already have an account?{" "}
                <Link to="/signin" className="text-[#4ADE80] font-semibold relative inline-block underline">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden lg:flex lg:flex-1 bg-[#F5F5F5] items-center justify-center relative overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={rightImage} 
            alt="Illustration" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;