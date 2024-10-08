"use client"

import type { Table } from "@tanstack/react-table"
import { Button } from "@propdock/ui/components/button"
import { Input } from "@propdock/ui/components/input"
import { Cross2Icon } from "@radix-ui/react-icons"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options"
// import { priorities, statuses } from "../data/data"

import { propertyLabels, propertyStatuses } from "./propertystatus"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="ml-1 flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Søk..." // Updated placeholder
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={propertyStatuses}
          />
        )}
        {table.getColumn("label") && ( // Filter for property labels
          <DataTableFacetedFilter
            column={table.getColumn("label")}
            title="Type"
            options={propertyLabels}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
