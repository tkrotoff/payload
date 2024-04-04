'use client'
import type { FieldTypes } from 'payload/config'
import type { FieldPermissions } from 'payload/types'

import React from 'react'

export type FieldPropsContextType = {
  indexPath?: string
  path: string
  permissions?: FieldPermissions
  readOnly: boolean
  schemaPath: string
  siblingPermissions: {
    [fieldName: string]: FieldPermissions
  }
  type: keyof FieldTypes
}

const FieldPropsContext = React.createContext<FieldPropsContextType>({
  type: '' as keyof FieldTypes,
  indexPath: '',
  path: '',
  permissions: {} as FieldPermissions,
  readOnly: false,
  schemaPath: '',
  siblingPermissions: {},
})

export type Props = {
  children: React.ReactNode
  indexPath?: string
  path: string
  permissions?: FieldPermissions
  readOnly: boolean
  schemaPath: string
  siblingPermissions: {
    [fieldName: string]: FieldPermissions
  }
  type: keyof FieldTypes
}

export const FieldPropsProvider: React.FC<Props> = ({
  type,
  children,
  indexPath,
  path,
  permissions,
  readOnly,
  schemaPath,
  siblingPermissions,
}) => {
  return (
    <FieldPropsContext.Provider
      value={{
        type,
        indexPath,
        path,
        permissions,
        readOnly,
        schemaPath,
        siblingPermissions,
      }}
    >
      {children}
    </FieldPropsContext.Provider>
  )
}

export const useFieldProps = () => {
  const path = React.useContext(FieldPropsContext)
  return path
}