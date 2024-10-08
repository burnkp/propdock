// pages/tenant/[id]/edit.tsx

import React from "react"
import { getTenantDetails } from "@/actions/get-tenant-details"

import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { generateContractContent } from "@/components/editor/contractTemplate"
import TenantEditor from "@/components/editor/TenantEditor"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"

export default async function TenantEditPage({
  params,
}: {
  params: { id: string }
}) {
  const tenantId = params.id

  try {
    const tenantDetails = await getTenantDetails(tenantId)
    console.log("tenantDetails", tenantDetails)
    const contractContent = generateContractContent(tenantDetails)

    return (
      <DashboardShell>
        <DashboardHeader
          heading="Kontrakter"
          text="Skriv kontrakt for din leietaker."
        />
        <TenantEditor contractContent={contractContent} />
      </DashboardShell>
    )
  } catch (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Error" text={error.message} />
      </DashboardShell>
    )
  }
}
