import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface LoginFormData {
  email: string
  password: string
}
interface AddModuleFormData {
  name: string
  category: string
}
interface AddSessionFormData {
  name: string
  reading_time: string
  description: string
  type: string
}

interface AddTipsFormData {
  session_type: string
  description: string
  title: string
  type: string
  options: string[]
  isTroubleShootChecked: boolean
  troubleshoot_title: string
  troubleshoot_description: string
  troubleshoot_info_title: string
  activity_title: string
  activity_description: string
  activity_file: string
}

interface SignUpFormData extends LoginFormData {
  firstName: string
  lastName: string
}

export const LoginSchema: ZodType<LoginFormData> = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, {
      message: 'Password must contain at least one special character',
    }),
})

export const SignUpSchema: ZodType<SignUpFormData> = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, {
      message: 'Password must contain at least one special character',
    }),
})

export const AddModuleSchema: ZodType<AddModuleFormData> = z.object({
  name: z.string().min(1, { message: 'Module name is required' }),
  category: z.string().min(1, { message: 'Category name is required' }),
  description: z.string().min(1, { message: 'Description name is required' }),
})

export const AddSessionSchema: ZodType<AddSessionFormData> = z
  .object({
    name: z.string().min(1, { message: 'Session name is required' }),
    description: z.string().min(1, { message: 'Description name is required' }),
    reading_time: z.string().min(1, { message: 'Reading time is required' }),
    type: z.enum(['Reading', 'Activity', 'reading', 'activity']),
    activity_title: z.string().optional(),
    activity_description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === 'Activity') {
        return !!data.activity_title
      }
      return true
    },
    {
      message: 'Activity title is required',
      path: ['activity_title'],
    },
  )
  .refine(
    (data) => {
      if (data.type === 'Activity') {
        return !!data.activity_description
      }
      return true
    },
    {
      message: 'Activity description is required',
      path: ['activity_description'],
    },
  )

export const AddTipsSchema: ZodType<AddTipsFormData> = z
  .object({
    description: z.string().optional(),
    question_title: z.string().optional(),
    type: z.enum(['Text', 'Question', 'text', 'question']),
    session_type: z.string(),
    isTroubleShootChecked: z.boolean(),
    troubleshoot_title: z.string().optional(),
    troubleshoot_description: z.string().optional(),
    troubleshoot_info_title: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === 'question') {
        return !!data.question_title
      }
      return true
    },
    {
      message: 'Question is required',
      path: ['question_title'],
    },
  )
  .refine(
    (data) => {
      if (data.type === 'text') {
        return !!data.description
      }
      return true
    },
    {
      message: 'Title description is required',
      path: ['description'],
    },
  )
  .refine(
    (data) => {
      if (data.isTroubleShootChecked) {
        return !!data.troubleshoot_info_title
      }
      return true
    },
    {
      message: 'Troubleshoot Info is required',
      path: ['troubleshoot_info_title'],
    },
  )
  .refine(
    (data) => {
      if (data.isTroubleShootChecked) {
        return !!data.troubleshoot_title
      }
      return true
    },
    {
      message: 'Troubleshoot title is required',
      path: ['troubleshoot_title'],
    },
  )
  .refine(
    (data) => {
      if (data.isTroubleShootChecked) {
        return !!data.troubleshoot_description
      }
      return true
    },
    {
      message: 'Troubleshoot description is required',
      path: ['troubleshoot_description'],
    },
  )

export default zodResolver
