import Button from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Input from "@/components/ui/input";
import { useLogin } from "@/lib/queries/auth";
import tw from "@/lib/tw";
import { FieldProps, LoginFormData } from "@/types/login";
import loginSchema from "@/types/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosInstance } from "axios";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

export default function App() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    login(data, {
      onSuccess: (session: AxiosInstance | undefined) => {
        if (session) {
          router.push("/dashboard");
        }
      },
    });
  });

  return (
    <View style={tw`flex-1 bg-black`}>
      <View style={tw`flex-1 items-center justify-center px-6`}>
        <View style={tw`w-full max-w-sm`}>
          {/* Header */}
          <View style={tw`mb-10`}>
            <Text style={tw`text-4xl text-white mb-3`}>Welcome Back</Text>
            <Text style={tw`text-lg text-gray-400`}>
              Sign in to your account to continue
            </Text>
          </View>

          <Form {...form}>
            <View>
              <FormField
                control={form.control}
                name="username"
                render={({ field }: FieldProps<"username">) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        value={field.value}
                        keyboardType="number-pad"
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        autoCapitalize="none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }: FieldProps<"password">) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        secureTextEntry
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                onPress={onSubmit}
                style={tw`bg-indigo-500 h-12 rounded-lg`}
                disabled={isPending}
              >
                <Text style={tw`text-base font-medium text-white`}>
                  {isPending ? "Signing in..." : "Sign In"}
                </Text>
              </Button>
            </View>
          </Form>
        </View>
      </View>
    </View>
  );
}

