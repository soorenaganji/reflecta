"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useRequireStep1 = () => {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("reflecta-user") || "{}");
    console.log(user);
    if (!user.age || !user.gender || !user.id) {
      router.replace("/form/step1");
    }
  }, []);
};
