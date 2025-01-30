import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Flex,
  Stack,
  Divider,
} from "@mantine/core";
import { AtSign, Lock } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import { Link, useNavigate } from "@tanstack/react-router";
import AuthCard from "./components/AuthCard";
import { LoginRequest } from "./shared/auth.types";
import { loginSchema } from "./shared/auth.schemas";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { ErrorResponse } from "../../api/errors/errror.types";
import { useLogin } from "./shared/auth.mutations";
import useAuthStore from "../../stores/useAuthStore";
const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;

function LoginForm() {
  const { isAuthenticated } = useAuthStore();
  const login = useLogin();
  const navigate = useNavigate();

  const { handleAuthFormErrors } = useFormErrorHandler<LoginRequest>();

  const form = useForm<LoginRequest>({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(credentials: LoginRequest) {
    try {
      await login.mutateAsync(credentials);

      form.reset();
      navigate({ to: "/categories" });
    } catch (err) {
      const error = err as ErrorResponse;
      handleAuthFormErrors(error, form);
    }
  }

  async function handleDemoUserLogin() {
    const demoCredentials = {
      email: demoEmail,
      password: demoPassword,
    };

    try {
      await login.mutateAsync(demoCredentials);

      form.reset();

      console.log(isAuthenticated);
      navigate({ to: "/categories" });
    } catch (err) {
      const error = err as ErrorResponse;
      handleAuthFormErrors(error, form);
    }
  }

  return (
    <AuthCard
      title="Welcome Back!"
      anchorLabel="Don't have an account?"
      anchorText="Create an account"
      to="/register"
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack my={8}>
          <Divider label="Login with Demo Accounts" />
          <Flex gap={4} w="100%">
            <Button
              type="button"
              w="100%"
              radius="xl"
              variant="light"
              color="lime"
              onClick={handleDemoUserLogin}
            >
              User Account
            </Button>
            <Button
              type="button"
              w="100%"
              radius="xl"
              variant="light"
              color="lime"
            >
              Admin Account
            </Button>
          </Flex>
        </Stack>

        <TextInput
          label="Email"
          placeholder="you@example.com"
          classNames={{
            input: "input",
          }}
          leftSection={<AtSign size={20} />}
          {...form.getInputProps("email")}
          onChange={(event) => {
            form.setFieldValue("email", event.currentTarget.value);
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          withAsterisk
          required
          mt="md"
          classNames={{
            input: "input",
          }}
          leftSection={<Lock size={20} />}
          {...form.getInputProps("password")}
          onChange={(event) => {
            form.setFieldValue("password", event.currentTarget.value);
          }}
        />
        <Group justify="end" mt="lg">
          <Anchor component={Link} size="sm" c="lime" to={"/forgot-password"}>
            Forgot password?
          </Anchor>
        </Group>
        <Flex mt="xl" gap="sm">
          <Button w="100%" color="lime" variant="light" type="submit">
            Login
          </Button>
        </Flex>
      </form>
    </AuthCard>
  );
}

export default LoginForm;
