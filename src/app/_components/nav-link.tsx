import { cva, VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

import { cn } from "~/presentation/utils";

const navLinkVariants = cva(
  "text-sm font-medium transition-colors hover:text-primary",
  {
    variants: {
      variant: {
        enabled: "",
        disabled: "text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "disabled",
    },
  },
);

export interface NavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps,
    VariantProps<typeof navLinkVariants> {}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => {
  const { className, variant, ...restProps } = props;
  return (
    <Link
      className={cn(navLinkVariants({ variant }), className)}
      ref={ref}
      {...restProps}
    />
  );
});
NavLink.displayName = "NavLink";

export default NavLink;
