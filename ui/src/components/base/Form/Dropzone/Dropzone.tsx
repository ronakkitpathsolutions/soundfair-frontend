import { File, Trash, UploadCloud } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CustomButton } from '../../CustomButton'
import { cn } from 'ui/src/utils/cn'

export const CustomDropZone = ({
  mergeFileArrays,
  fileData,
  error,
  getFiles,
  accept,
  className,
  labelClass,
  name,
  label,
  isEdit,
}) => {
  const [acceptedFiles, setAcceptedFiles] = useState([])

  const handleDropFiles = useCallback(
    (acceptedFiles = []) => {
      getFiles(
        isEdit ? mergeFileArrays(acceptedFiles, acceptedFiles) : acceptedFiles,
        name,
      )
      setAcceptedFiles((prevFiles) =>
        isEdit ? acceptedFiles : mergeFileArrays(prevFiles, acceptedFiles),
      )
    },
    [getFiles, isEdit, mergeFileArrays, name],
  )

  const { getRootProps, getInputProps, isDragAccept, isFocused, isDragReject } =
    useDropzone({
      onDrop: handleDropFiles,
      accept,
      multiple: false,
    })

  const baseStyle = useMemo(
    () => ({
      padding: '20px',
      borderWidth: 1,
      borderColor: error?.message ? '#ce2c31' : 'gray',
      borderStyle: 'dashed',
      borderRadius: '8px',
      backgroundColor: '#2196F30F',
      transition: 'border 300ms ease-in-out',
      cursor: 'pointer',
    }),
    [error],
  )

  const focusedStyle = useMemo(
    () => ({
      borderColor: 'purple',
    }),
    [],
  )

  const acceptStyle = useMemo(
    () => ({
      borderColor: '##2bcc80',
    }),
    [],
  )

  const rejectStyle = useMemo(
    () => ({
      borderColor: '#ce2c31',
    }),
    [],
  )

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [
      baseStyle,
      isFocused,
      focusedStyle,
      isDragAccept,
      acceptStyle,
      isDragReject,
      rejectStyle,
    ],
  )

  const handleRemoveFiles = useCallback(
    (file: any, name = '') => {
      const clone = [...acceptedFiles]
      const index = clone.findIndex((val) => val.name === file.name)
      clone.splice(index, 1)
      getFiles(clone, name)
      setAcceptedFiles(clone)
    },
    [acceptedFiles, getFiles],
  )

  const getFileName = (filePath = '') => {
    if (!filePath) return false
    const values = String(filePath)?.split('/')
    if (values[values?.length - 1] !== 'null') {
      return {
        name: values[values?.length - 1],
      }
    }
    return false
  }

  useEffect(() => {
    if (getFileName(fileData?.[name])) {
      setAcceptedFiles([getFileName(fileData[name])])
    }
  }, [fileData, name])

  return (
    <div className={cn('flex flex-col', className)}>
      <label
        htmlFor={name}
        className={cn(
          'absolute left-[15px] top-[-12px] z-10 bg-white px-1 text-sm font-medium leading-6',
          labelClass,
        )}
      >
        {label}
      </label>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className="flex w-full flex-col items-center justify-center">
          <UploadCloud className="mb-4 h-16 w-16" />
          <p className="text-sm text-gray-500">Drag and Drop files here</p>
          <p className="text-sm text-gray-500">Or</p>
          <CustomButton
            type="button"
            className="flex !w-auto cursor-pointer items-center justify-center rounded-md bg-gray-800 px-4  py-2 text-gray-200"
          >
            Upload File
          </CustomButton>
        </div>
      </div>
      {error?.message ? (
        <p className="text-error ml-1 mt-1 text-sm font-normal text-red-500">
          {error.message || ''}
        </p>
      ) : null}
      <div className="mt-4 flex w-full flex-col">
        {acceptedFiles.map((item) => (
          <div
            className="my-1 flex w-full items-center justify-between rounded-md border px-1 py-1 !pl-2"
            key={item?.name}
          >
            <div className="flex flex-row items-center">
              <File className="mr-1.5 h-6 w-6 text-gray-600" />
              <p className="text-sm font-medium">{item?.name}</p>
            </div>
            <CustomButton
              onClick={() => handleRemoveFiles(item, name)}
              className="!min-h-[44px] !w-auto !bg-[#f5c6cb] !px-3 !py-2"
              type="button"
            >
              <Trash className="h-5 w-5 text-[#ce2c31]" />
            </CustomButton>
          </div>
        ))}
      </div>
    </div>
  )
}
