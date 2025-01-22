import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormInputs, loginSchema } from "../schemas/login";
import { LoginRequestDTO, LoginResponseDTO } from "../types/dto";
import { useAppDispatch } from "../../../hooks/use-store";
import { setUser } from "../../../store/auth-slice";
import { apiV1 } from "../../../libs/api";

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function onSubmit(data: LoginFormInputs) {
    try {
      const response = await apiV1.post<
        null,
        { data: LoginResponseDTO },
        LoginRequestDTO
      >("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { user, token } = response.data;

      console.log("Response from server:", response.data); // Log respons lengkap

      dispatch(setUser(user));

      Cookies.set("token", token, { expires: 1 });
      Cookies.set("user", JSON.stringify(user));
      navigate("/");
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;

        // Cek apakah pesan kesalahan ada dan tampilkan kesalahan umum
        if (data.message) {
          // Tampilkan kesalahan "Email atau password salah"
          setError("email", { message: "Email atau password salah" });
          setError("password", { message: "Email atau password salah" });
        }
        return false;
      }
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
}
