"use client";

import InstallPWA from "@/components/InstallPWA";
import Sheet from "@/components/Sheet";
import { isPWAInstalled } from "@/lib/utils/PWA";
import { useEffect, useState } from "react";

export default function PWASheet() {
  const [hasSeenInstallModal, setHasSeenInstallModal] = useState(false);
  const [isAlreadyInstalled, setIsAlreadyInstalled] = useState(false);

  useEffect(() => {

    setIsAlreadyInstalled(isPWAInstalled());

    if (localStorage.getItem("hasSeenInstallModal")) {
      setHasSeenInstallModal(JSON.parse(localStorage.getItem("hasSeenInstallModal") as string));
    }

  }, []);

  if (!hasSeenInstallModal && !isAlreadyInstalled) return (
    <Sheet open={true}>
      <InstallPWA />
    </Sheet>
  )

  return null;
}
