"use client";

import React from "react";
import Navbar from "@/components/Landing/Navbar";
import { MdOutlineInventory, MdOutlineDocumentScanner } from "react-icons/md";

export default function Dashboard() {
  return (
    <main className="" id="dashboard">
      <Navbar
        items={[
          { label: "Inventory", link: "/inventory", icon: MdOutlineInventory },
          { label: "Logs", link: "/logs", icon: MdOutlineDocumentScanner },
        ]}
        ctaLabel="Settings"
        ctaLink="/settings"
        logoLink="/"
      />
    </main>
  );
}
