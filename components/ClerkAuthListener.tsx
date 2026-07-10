"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

export default function ClerkAuthListener() {
    const { isSignedIn } = useUser();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (isSignedIn) {
            // If user just signed in, navigate to dashboard (avoids stuck rendering state)
            if (pathname !== "/dashboard") {
                router.replace("/dashboard");
            } else {
                // If already on dashboard, refresh to get server-rendered content
                router.refresh();
            }
        }
    }, [isSignedIn, pathname, router]);

    return null;
}
