import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/func/auth";
import { setToken } from "@/store/tokenSlice";
import { setUser } from "@/store/userSlice";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  // update data to redux
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    // if (form?.email.trim() == "") {
    //   alert("email is required.");
    //   return;
    // }
    // if (form?.password.trim() == "") {
    //   alert("Password is required.");
    //   return;
    // }

    const newError = {
      email: "",
      password: "",
    };

    if (!form.email.trim()) {
      newError.email = "email is required.";
    }
    if (!form.password.trim()) {
      newError.password = "Password is required.";
    }

    setError(newError);

    if (newError.email != "" || newError.password != "") return;

    console.log("Form data: ", form);
    setForm({ email: "", password: "" });
    setError({ email: "", password: "" });

    const res = await login(form); // Go to HomePage
    if (res) {
      navigate("/");
      dispatch(setUser(res?.data?.user));
      dispatch(setToken(res?.data?.token));
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={"w-87.5 flex flex-col gap-6"}>
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="John"
                    required
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <Button type="submit">Login</Button>
                  <Button variant="outline" type="button">
                    Login with Google
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account? <a href="#">Sign up</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
