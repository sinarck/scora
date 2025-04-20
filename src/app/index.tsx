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
import { ControllerRenderProps, useForm } from "react-hook-form";
import { View } from "react-native";

type FormData = {
  firstName: string;
  lastName: string;
};

type FieldProps<T extends keyof FormData> = {
  field: ControllerRenderProps<FormData, T>;
};

export default function App() {
  const form = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => console.log(data));

  return (
    <View style={tw`flex-1 items-center justify-center p-4`}>
      <Form {...form}>
        <View style={tw`w-full max-w-sm`}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }: FieldProps<"firstName">) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }: FieldProps<"lastName">) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button onPress={onSubmit}>Submit</Button>
        </View>
      </Form>
    </View>
  );
}

