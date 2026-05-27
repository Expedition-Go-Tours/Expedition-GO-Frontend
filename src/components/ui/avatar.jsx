/**
 * @file avatar.jsx
 * @description Radix Avatar primitive — image with fallback for profile pictures.
 *   Part of the shared UI kit (components/ui/). Style via className + cn().
 */
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef(function Avatar({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn("relative inline-flex size-10 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  );
});

const AvatarImage = React.forwardRef(function AvatarImage({ className, ...props }, ref) {
  return <AvatarPrimitive.Image ref={ref} className={cn("aspect-square size-full object-cover", className)} {...props} />;
});

const AvatarFallback = React.forwardRef(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex size-full items-center justify-center bg-[color:var(--admin-brand-soft)] text-sm font-semibold text-[color:var(--admin-brand-dark)]",
        className,
      )}
      {...props}
    />
  );
});

export { Avatar, AvatarImage, AvatarFallback };
