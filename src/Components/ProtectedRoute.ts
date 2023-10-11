import { selectIsAuthenticated } from "@/redux/userSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// Create a ProtectedRoute component that wraps protected pages
const ProtectedRoute = ({ children }:any) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const router = useRouter();
  
    useEffect(() => {
      console.log(router)
      if (!isAuthenticated) {
        router.push('/authenticateUser'); // Redirect to the home page if not authenticated
      }
    }, [isAuthenticated, router.pathname]);
  
    return children;
  };
  
  export default ProtectedRoute;
  
