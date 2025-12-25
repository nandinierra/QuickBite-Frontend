

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const useSignup = () => {
    const navigate = useNavigate();
    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer");
    const [adminSecretKey, setAdminSecretKey] = useState("");
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [errors, setErrors] = useState({ name: "", email: "", password: "", adminSecretKey: "" });

    // Validation
    const validateName = (val) => !val.trim() ? "Name is required" : (val.trim().length < 3 ? "Name must be at least 3 characters" : (val.trim().length > 50 ? "Name must not exceed 50 characters" : (!/^[a-zA-Z\s]+$/.test(val) ? "Name can only contain letters and spaces" : "")));
    const validateEmail = (val) => !val.trim() ? "Email is required" : (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "Please enter a valid email address" : "");
    const validatePassword = (val) => !val ? "Password is required" : (val.length < 6 ? "Password must be at least 6 characters" : (val.length > 50 ? "Password must not exceed 50 characters" : (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val) ? "Must have uppercase, lowercase, number" : "")));
    const validateAdminSecretKey = (val) => (role === "admin" && !val.trim()) ? "Admin secret key is required" : "";

    const handleNameChange = (e) => {
        const val = e.target.value;
        setUsername(val);
        setErrors(prev => ({ ...prev, name: validateName(val) }));
        setErrorMsg("");
    };

    const handleEmailChange = (e) => {
        const val = e.target.value.toLowerCase();
        setEmail(val);
        setErrors(prev => ({ ...prev, email: validateEmail(val) }));
        setErrorMsg("");
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        setErrors(prev => ({ ...prev, password: validatePassword(val) }));
        setErrorMsg("");
    };

    const handleRoleChange = (e) => {
        const val = e.target.value;
        setRole(val);
        setErrorMsg("");
        setErrors(prev => ({ ...prev, adminSecretKey: val === "admin" ? validateAdminSecretKey(adminSecretKey) : "" }));
    };

    const handleAdminSecretKeyChange = (e) => {
        const val = e.target.value;
        setAdminSecretKey(val);
        setErrors(prev => ({ ...prev, adminSecretKey: validateAdminSecretKey(val) }));
        setErrorMsg("");
    };

    const signupForm = async (e) => {
        e.preventDefault();
        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const keyError = validateAdminSecretKey(adminSecretKey);

        setErrors({ name: nameError, email: emailError, password: passwordError, adminSecretKey: keyError });

        if (nameError || emailError || passwordError || keyError) {
            setShowErrorMsg(true);
            setErrorMsg("Please adjust the fields above");
            return;
        }

        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3060";
        const userDetails = { name: name.trim(), email: email.trim(), password, role, ...(role === "admin" && { adminSecretKey: adminSecretKey.trim() }) };

        try {
            const response = await fetch(`${BACKEND_URL}/auth/register`, {
                method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(userDetails),
            });
            const data = await response.json();

            if (response.ok) {
                navigate("/login", { replace: true });
            } else {
                if (data.errors && Array.isArray(data.errors)) {
                    const fieldErrors = {};
                    data.errors.forEach(err => fieldErrors[err.field] = err.message);
                    setErrors(prev => ({ ...prev, ...fieldErrors }));
                    setErrorMsg(data.message || "Validation failed");
                } else {
                    setErrorMsg(data.message || "Registration failed");
                }
                setShowErrorMsg(true);
            }
        } catch (error) {
            setErrorMsg("Network error. Please try again.");
            setShowErrorMsg(true);
        }
    };

    return {
        name, handleNameChange,
        email, handleEmailChange,
        password, handlePasswordChange,
        role, handleRoleChange,
        adminSecretKey, handleAdminSecretKeyChange,
        errors, errorMsg, showErrorMsg,
        signupForm,
        navigate,
        // token: Cookies.get("jwt_token")
    };
};


