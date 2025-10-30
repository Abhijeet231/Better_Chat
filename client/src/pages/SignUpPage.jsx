import { Eye, EyeOff, Mail, MessageSquare, User, Lock, Loader } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"


const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const {signup, isSigningUp} = useAuthStore();

  const validateForm = () => {}

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">

        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
               
               <MessageSquare className="size-6 text-primary" />
              </div>
                <h1 className="text-2xl font-bold mt-2" >Create Account</h1>
                <p className="text-base-content/60">Get Started with your free account</p>
            </div>

          </div>

         <form onSubmit={handleSubmit} className="space-y-6" >
              <div className="form-control">
                <label className="label">
                   <span className="label-text font-medium" >Full Name</span>
                </label>
                <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40 z-10" />
                     </div>

                     <input
                     type="text"
                     className={`input border w-full pl-10`}
                     placeholder="John Doe"
                     value={formData.fullName}
                     onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                     />

                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>

                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40 z-10" />


                   </div>

                   <input
                   type="email"
                   className={`input border w-full pl-10`}
                   placeholder="you@example.com"
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   />
                </div>
              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40 z-10" />


                    </div>
                    <input type={showPassword? "text": "password"}
                    className={`input border w-full pl-10`}
                    placeholder="......"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    
                    />

                 <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center"
                 onClick={() => setShowPassword(!showPassword)}
                 >

                  {showPassword ? (
                   <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40 z-10" />
                  ) : (
                   <Eye className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40 z-10" />
                  )}

                 </button>
                  
                </div>
              </div>

              <button type="button" className="btn btn-primary w-full" disabled={isSigningUp}>
                       {isSigningUp ? (
                        <>
                        <Loader className="size-5 animate-spin"/>
                        Loading....
                        </>
                       ) : (
                        "Create Account"
                       )
                      }
              </button>

                  

         </form>

        </div>

      </div>

    </div>
  )
}

export default SignUpPage








                        




