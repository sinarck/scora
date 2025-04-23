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
import tw from "@/lib/tw";
import { FieldProps, LoginFormData } from "@/types/login";
import loginSchema from "@/types/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

export default function App() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
    // Handle login logic here
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
              >
                <Text style={tw`text-base font-medium text-white`}>
                  Sign In
                </Text>
              </Button>
            </View>
          </Form>
        </View>
      </View>
    </View>
  );
}

