import React, { useMemo } from 'react'
import { cn } from 'ui/src/utils/cn'
import { CustomButton } from '../CustomButton'
import { Plus, Search } from 'lucide-react'
import { filter } from 'lodash'

interface TableProps {
  className?: string
  rows?: any
  columns?: any
  pagination?: any
  searchFields?: string[]
  handleAdd?: () => void
  handlePagination?: (value: any) => void
}

export const Table = ({
  className,
  columns = [],
  handlePagination,
  searchFields,
  pagination,
  rows = [],
  handleAdd,
  ...props
}: TableProps): JSX.Element => {
  const modifiedRows = useMemo(() => {
    if (pagination?.search) {
      return filter(rows, (_row) =>
        searchFields.find((item) => {
          return !_row[item]
            ? false
            : _row[item]
              ?.toString?.()
              .toLowerCase()
              ?.indexOf(pagination?.search?.toLowerCase()) !== -1
        }),
      )
    } else return rows
  }, [pagination?.search, rows, searchFields])

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-2 flex w-full items-center justify-between">
        <div className="hover:bg-gray-30 flex cursor-pointer items-center rounded-md bg-gray-100 px-4 py-2.5 text-gray-700">
          <Search className="mr-1 h-5 w-5" />
          <input
            onChange={(e) =>
              handlePagination && handlePagination({ search: e.target.value })
            }
            type="text"
            placeholder="Search"
            className="bg-gray-100 text-sm outline-none"
          />
        </div>
        {handleAdd ? (
          <div className="flex items-center">
            <CustomButton
              onClick={handleAdd}
              type="button"
              className="flex cursor-pointer items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-800 hover:text-gray-200"
            >
              <Plus className="mr-1 h-5 w-5" />
              <span className="text-base">Add</span>
            </CustomButton>
          </div>
        ) : null}
      </div>
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs text-gray-700">
          <tr>
            {columns.map((column: any) => (
              <th
                key={column.id}
                className={cn(
                  'border-b border-gray-200 bg-gray-100  px-6  py-3 text-left text-sm font-semibold text-gray-600',
                  column?.headerClass ? column?.headerClass : '',
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modifiedRows?.length ? (
            modifiedRows?.map((row: any, index: number) => {
              return (
                <tr
                  key={`row_${index}`}
                  className="border-b bg-white hover:bg-gray-50"
                >
                  {columns?.map((col: any) => {
                    return (
                      <td
                        key={`cell_${col.id}`}
                        className="border-b border-gray-200 px-6 py-2 text-sm text-gray-600"
                      >
                        {col?.render
                          ? col.render({
                            rowData: row,
                            rowIndex: index,
                          })
                          : row[col?.fieldName]}
                      </td>
                    )
                  })}
                </tr>
              )
            })
          ) : (
            <tr className="border-b bg-white hover:bg-gray-50">
              <td
                className="border-b border-gray-200 px-6 py-2 text-sm text-gray-600"
                align="center"
                colSpan={columns?.length}
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
