"use client";
import React from "react";
import DataTable from "@/Components/DataTable";
import DataGrid from "@/Components/DataGrid";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">Employee Data Table</h1>
      <DataTable />
      <Box sx={{mt:5}}/>
      <DataGrid  />
    </main>
  );
}
