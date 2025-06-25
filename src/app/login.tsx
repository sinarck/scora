import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";

export default function Login() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 items-center justify-center dark:bg-background p-page">
        <View className="w-full max-w-md flex flex-col gap-4">
          <Input placeholder="Username" keyboardType="number-pad" />
          <Input
            placeholder="Password"
            secureTextEntry
            returnKeyType="done"
            autoComplete="password"
          />
          <Text style={{ color: "#979797" }} className="font-display">
            Forgot password? $1234567890
          </Text>
          <Button>Login</Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

