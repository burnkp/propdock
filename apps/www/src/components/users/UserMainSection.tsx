import Image from "next/image"
import Link from "next/link"
import { Badge } from "@propdock/ui/components/badge"
import { Button } from "@propdock/ui/components/button"
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react"

import UserChangeStatusCard from "./UserChangeStatusCard"
import { UserChartActivity } from "./UserChartActivity"
import UserContactPerson from "./UserContactPerson"
import UserEmailCard from "./UserEmailCard"
import { UserGridActivity } from "./UserGridActivity"
import { UserFinancialCard } from "./UserPowerCard"
import UsersDashboardTable from "./UsersDashboardTable"

export function UserMainSection({ tenantDetails }) {
  return (
    <div className="">
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <UserChartActivity />
          <UsersDashboardTable tenantDetails={tenantDetails} />
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <UserContactPerson tenantDetails={tenantDetails} />
          <UserChangeStatusCard tenantDetails={tenantDetails} />

          <UserFinancialCard tenantDetails={tenantDetails} />
          {/* <UserGridActivity dings={tenantDetails.events} /> */}
          <UserEmailCard tenantDetails={tenantDetails} />
        </div>
      </div>
    </div>
  )
}
