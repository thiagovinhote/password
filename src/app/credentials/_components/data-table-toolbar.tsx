"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/presentation/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/presentation/ui/form";
import { Input } from "~/presentation/ui/input";

const formSchema = z.object({
  search: z.string().optional(),
});

export default function DataTableToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchParams?.get("search") ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: values,
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center space-x-2"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <div className="flex gap-x-2 items-center">
              <FormItem>
                <FormControl>
                  <Input placeholder="Busque pelo nome" {...field} />
                </FormControl>
              </FormItem>
              <Button type="submit" size="icon">
                <SearchIcon className="size-4" />
              </Button>
            </div>
          )}
        />
      </form>
    </Form>
  );
}
