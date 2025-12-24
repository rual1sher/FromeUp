import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Fade, Slide } from "react-awesome-reveal";

interface IParam {
  form: any;
  label: string;
  placeholder: string;
  name: string;
  labelColor?: string;
  delay?: number;
}

export function FormItemInput({
  form,
  label,
  name,
  labelColor,
  placeholder,
  delay = 100,
}: IParam) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <Fade triggerOnce delay={delay}>
          <Slide triggerOnce direction="up" delay={delay}>
            <FormItem className="flex flex-col">
              <FormLabel
                className={cn(
                  "dark:text-gray-200 font-medium",
                  labelColor ? `text-[${labelColor}]` : "text-gray-700"
                )}
              >
                {label}:
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={placeholder}
                  {...field}
                  className={cn(
                    "border-gray-300  focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-md",
                    labelColor ? `text-[${labelColor}]` : "text-gray-700"
                  )}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500 mt-1" />
            </FormItem>
          </Slide>
        </Fade>
      )}
    />
  );
}
