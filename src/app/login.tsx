import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useSession } from "@/lib/auth/auth-context";
import { loginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "burnt";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { z } from "zod";


export default function Login() {
  const { signIn, error, isSigningIn } = useSession();
  const passwordRef = useRef<any>(null);
  
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
      toast({
        title: "Successfully logged in",
        preset: "done",
        haptic: "success"
      })
    }
  };

  const handleUsernameChange = (text: string, onChange: (value: string) => void) => {
    onChange(text);
    
    // Auto-focus password field after 6 characters
    if (text.length === 6) {
      passwordRef.current?.focus();
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
                onChangeText={(text) => handleUsernameChange(text, onChange)}
                value={value}
                autoFocus
                editable={!isSigningIn}
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
                ref={passwordRef}
                placeholder="Password"
                secureTextEntry
                returnKeyType="done"
                autoComplete="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(onSubmit)}
                editable={!isSigningIn}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text className="text-red-500">This is required.</Text>
          )}

          {error && <Text className="text-red-500">{error.message}</Text>}

          <Button onPress={handleSubmit(onSubmit)} loading={isSigningIn}>
            Login
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

