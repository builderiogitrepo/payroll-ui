import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Check,
  DollarSign,
  CreditCard,
  TrendingUp,
  Building2,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import jnetLogo from "@/assets/images/jnet-logo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });

    // For demo purposes, navigate to dashboard immediately
    // In a real app, you would validate credentials first
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800"
      data-page="login"
    >
      <div className="w-full h-screen bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
          {/* Left Section - Visual Panel (55%) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              repeat: 0,
              ease: "easeOut",
            }}
            className="lg:col-span-7 relative overflow-hidden"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800"></div>

            {/* Animated Particles Background */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Large Particles */}
              <motion.div
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-20 left-10 w-4 h-4 bg-white/10 rounded-full"
              />
              <motion.div
                animate={{
                  x: [0, -80, 0],
                  y: [0, 60, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-40 right-20 w-6 h-6 bg-blue-300/20 rounded-full"
              />
              <motion.div
                animate={{
                  x: [0, 120, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 5,
                }}
                className="absolute top-60 left-1/3 w-3 h-3 bg-blue-300/15 rounded-full"
              />
              <motion.div
                animate={{
                  x: [0, -60, 0],
                  y: [0, 40, 0],
                }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 8,
                }}
                className="absolute top-80 right-1/4 w-5 h-5 bg-white/8 rounded-full"
              />

              {/* Medium Particles */}
              <motion.div
                animate={{
                  x: [0, 70, 0],
                  y: [0, -80, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3,
                }}
                className="absolute top-32 left-1/2 w-2 h-2 bg-blue-400/25 rounded-full"
              />
              <motion.div
                animate={{
                  x: [0, -90, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 6,
                }}
                className="absolute top-70 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full"
              />
              <motion.div
                animate={{
                  x: [0, 110, 0],
                  y: [0, -40, 0],
                }}
                transition={{
                  duration: 19,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 10,
                }}
                className="absolute top-50 right-1/3 w-3 h-3 bg-white/12 rounded-full"
              />

              {/* Small Particles */}
              <motion.div
                animate={{
                  x: [0, 40, 0],
                  y: [0, -60, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4,
                }}
                className="absolute top-25 right-10 w-1 h-1 bg-blue-300/30 rounded-full"
              />
              <motion.div
                animate={{
                  x: [0, -50, 0],
                  y: [0, 70, 0],
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 7,
                }}
                className="absolute top-90 left-20 w-1 h-1 bg-blue-300/25 rounded-full"
              />
              <motion.div
                animate={{
                  x: [0, 80, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 9,
                }}
                className="absolute top-45 left-1/5 w-1 h-1 bg-white/15 rounded-full"
              />
            </div>

            {/* Cloud Layer - Reduced Blur */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-32 h-16 bg-white/15 rounded-full blur-sm"></div>
              <div className="absolute top-20 right-20 w-24 h-12 bg-white/10 rounded-full blur-xs"></div>
              <div className="absolute top-40 left-1/4 w-20 h-10 bg-white/8 rounded-full blur-xs"></div>
              <div className="absolute top-60 right-1/3 w-28 h-14 bg-white/20 rounded-full blur-sm"></div>
            </div>

            {/* Simplified Payroll Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="space-y-16 max-w-2xl"
              >
                {/* Randomly Placed Money Icons */}
                <div className="relative h-32">
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-0 left-1/4 transform -translate-x-1/2 flex items-center justify-center w-16 h-16 bg-white/8 backdrop-blur-xs rounded-2xl border border-white/15"
                  >
                    <DollarSign className="text-white text-2xl" />
                  </motion.div>
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, -6, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute top-8 right-1/4 transform -translate-x-1/2 flex items-center justify-center w-14 h-14 bg-white/8 backdrop-blur-xs rounded-2xl border border-white/15"
                  >
                    <CreditCard className="text-white text-xl" />
                  </motion.div>
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-18 h-18 bg-white/8 backdrop-blur-xs rounded-2xl border border-white/15"
                  >
                    <BarChart3 className="text-white text-2xl" />
                  </motion.div>
                </div>

                {/* Apple-style Main Content */}
                <div className="space-y-8">
                  {/* Hero Section */}
                  <div className="space-y-6">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex justify-center"
                    >
                      <div className="w-20 h-20 bg-white/15 backdrop-blur-xs rounded-full flex items-center justify-center border border-white/25">
                        <Building2 className="text-white text-3xl" />
                      </div>
                    </motion.div>

                    <div className="space-y-4">
                      <h1 className="text-5xl font-bold text-white leading-tight tracking-tight">
                        Smart Payroll
                      </h1>
                      <p className="text-xl text-white/80 font-light leading-relaxed max-w-lg mx-auto">
                        The most advanced payroll management system for modern
                        businesses
                      </p>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 gap-6 pt-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="flex items-center justify-center space-x-4"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-xl">
                        <Zap className="text-blue-300 text-xl" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-semibold text-lg">
                          Lightning Fast
                        </h3>
                        <p className="text-white/70 text-sm">
                          Automated processing saves hours
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0, duration: 0.6 }}
                      className="flex items-center justify-center space-x-4"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-xl">
                        <Shield className="text-blue-300 text-xl" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-semibold text-lg">
                          Secure & Compliant
                        </h3>
                        <p className="text-white/70 text-sm">
                          Built-in tax compliance & security
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className="flex items-center justify-center space-x-4"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-xl">
                        <TrendingUp className="text-blue-300 text-xl" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-semibold text-lg">
                          Real-time Insights
                        </h3>
                        <p className="text-white/70 text-sm">
                          Live reports and analytics
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Apple-style Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  className="space-y-4 pt-8"
                >
                  <p className="text-white/90 text-lg font-medium">
                    Join thousands of companies worldwide
                  </p>
                  <div className="flex items-center justify-center space-x-6 text-white/60 text-sm">
                    <span>• Secure</span>
                    <span>• Reliable</span>
                    <span>• User-friendly</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Additional Glow Effects - Reduced Blur */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/15 rounded-full blur-md"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-400/10 rounded-full blur-md"></div>
            </div>
          </motion.div>
          {/* Right Section - Login Form (45%) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 p-12 flex flex-col justify-center relative"
          >
            <div className="max-w-sm mx-auto w-full space-y-8">
              {/* Header with Jnet Logo */}
              <div className="text-center space-y-4">
                {/* Jnet Logo */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex justify-center"
                >
                  <img src={jnetLogo} alt="Jnet Logo" className="h-16 w-auto" />
                </motion.div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-foreground">
                    Welcome Back
                  </h1>
                  <p className="text-muted-foreground">
                    Enter your credentials to get in
                  </p>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="aimerpaix@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-lg border-border focus:border-primary focus:ring-primary bg-background"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-lg border-border focus:border-primary focus:ring-primary bg-background pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                    className="rounded border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="remember" className="text-sm text-foreground">
                    Remember me
                  </Label>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-foreground font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Login
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="text-muted-foreground text-sm">
                  Not a member?{" "}
                </span>
                <button className="text-sm font-semibold text-primary hover:text-primary-600 transition-colors">
                  Create an account
                </button>
              </div>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-8 left-8 right-8"
            >
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Powered by{" "}
                  <span className="font-semibold text-primary">Jnet</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
