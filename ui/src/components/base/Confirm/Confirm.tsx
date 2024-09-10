import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { cn } from 'ui/src/utils/cn'

interface ConfirmProps {
  title?: string
  actionClass?: string
  isLoading?: boolean
  id: string | number | boolean
  description?: string
  label?: string
  handleDelete?: (id: string | number | boolean) => void
  onOpenChange?: (value: any) => void
}

export const Confirm = ({
  title,
  id,
  actionClass,
  description,
  handleDelete,
  onOpenChange,
  label = 'Delete',
  isLoading,
  ...props
}: ConfirmProps) => {
  return (
    <AlertDialog.Root {...{ open: Boolean(id), onOpenChange }}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            {title || 'Are you absolutely sure?'}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mb-5 mt-4 text-[15px] leading-normal">
            {description ||
              'This action cannot be undone. This will permanently delete your account and remove your data from our servers.'}
          </AlertDialog.Description>
          <div className="flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button
                type="button"
                className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-gray-100 px-[15px] font-medium leading-none text-gray-700 outline-none hover:bg-gray-800 hover:text-gray-200 focus:ring-0"
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                disabled={isLoading}
                onClick={() => handleDelete(id)}
                className={cn(
                  'inline-flex h-[35px] items-center justify-center rounded-[4px] bg-[#ffdbdc] px-[15px] font-medium leading-none text-[#ce2c31] outline-none hover:bg-[#ffcdce] focus:ring-0',
                  actionClass,
                )}
              >
                {isLoading ? 'Loading' : label || 'Yes, delete account'}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
