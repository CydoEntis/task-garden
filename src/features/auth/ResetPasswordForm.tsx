import { Button, TextInput } from "@mantine/core";
import { AtSign } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import AuthCard from "./components/AuthCard";
import { LoginRequest } from "./shared/auth.types";
import { loginSchema } from "./shared/auth.schemas";

function RegisterForm() {
  const form = useForm<LoginRequest>({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <AuthCard
      title="Let's Get You Registered!"
      anchorLabel="Already have an account?"
      anchorText="Login"
      to="/login"
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          classNames={{
            input: "input",
          }}
          leftSection={<AtSign size={20} />}
          {...form.getInputProps("email")}
        />
        <Button
          fullWidth
          mt="xl"
          color="lime"
          variant="light"
          type="submit"
          //   loading={forgotPassword.isPending}
        >
          Forgot Password
        </Button>
      </form>
    </AuthCard>
  );
}

export default RegisterForm;
