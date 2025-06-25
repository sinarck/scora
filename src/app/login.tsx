import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useHaptics } from "@/hooks/useHaptics";
import { useSession } from "@/lib/auth/auth-context";
import { loginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { z } from "zod";

export default function Login() {
  const { signIn, error } = useSession();
  const success = useHaptics("success");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async ({
    username,
    password,
  }: z.infer<typeof loginSchema>) => {
    const successful = await signIn({
      username,
      password,
    });

    if (successful) {
      success();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
    >
      <View className="flex-1 items-center justify-center dark:bg-background p-page">
        <View className="w-full max-w-md flex flex-col gap-4">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Username"
                keyboardType="number-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoFocus
              />
            )}
            name="username"
          />
          {errors.username && (
            <Text className="text-red-500">This is required.</Text>
          )}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Password"
                secureTextEntry
                returnKeyType="done"
                autoComplete="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text className="text-red-500">This is required.</Text>
          )}

          {error && <Text className="text-red-500">{error.message}</Text>}

          <Button onPress={handleSubmit(onSubmit)}>Login</Button>
        </View>
      </View>
    </ScrollView>
  );
}

