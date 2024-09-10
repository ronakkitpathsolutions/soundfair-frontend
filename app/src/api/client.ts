import { METHODS } from '@/utils/constant'
import client from './index'

export const api = {
  auth: {
    login: (params: any) =>
      client({
        url: '/login',
        data: params,
        method: METHODS.POST,
      }),
    register: (params: any) =>
      client({
        url: '/register',
        data: params,
        method: METHODS.POST,
      }),
  },
  user: {
    userActivityById: (params: any) =>
      client({
        url: `/get_user_activity_by_id?user_id=${params?.id}`,
        method: METHODS.GET,
      }),
  },
  report: {
    addReport: (params: any) =>
      client({
        url: '/add_report_details',
        data: params,
        method: METHODS.POST,
      }),
    getReportByUser: (params: any) =>
      client({
        url: `/get_report_by_id`,
        method: METHODS.GET,
        ...params,
      }),
    updateReport: (params: any) =>
      client({
        url: `/update_report`,
        method: METHODS.PUT,
        data: params,
      }),
  },
  modules: {
    getAll: (params: any) =>
      client({
        url: '/get_all_modules',
        method: METHODS.GET,
        ...params,
      }),
    getById: (params: any) =>
      client({
        url: `/get_module_by_id`,
        method: METHODS.GET,
        ...params,
      }),
    add: (params: any) =>
      client({
        url: '/add_module',
        data: params,
        method: METHODS.POST,
      }),
    addUserModule: (params: any) =>
      client({
        url: '/add_user_module',
        data: params,
        method: METHODS.POST,
      }),
    removeUserModule: (params: any) =>
      client({
        url: `/remove_user_module/${params?.id}/${params?.user_id}`,
        data: params,
        method: METHODS.DELETE,
      }),
    getModuleByUser: (params: any) =>
      client({
        url: `/get_my_modules`,
        method: METHODS.GET,
        ...params,
      }),
    update: (params: any) =>
      client({
        url: '/update_module',
        data: params,
        method: METHODS.PUT,
      }),
    delete: (params: any) =>
      client({
        url: `/remove_module/${params?.id}`,
        data: params,
        method: METHODS.DELETE,
      }),
    getMyProgress: (params: any) =>
      client({
        url: `/get_user_progress_by_id`,
        method: METHODS.GET,
        ...params,
      }),
    addMyProgress: (params: any) =>
      client({
        url: `/add_user_progress_details`,
        method: METHODS.POST,
        data: params,
      }),
  },
  sessions: {
    getAll: (params: any) =>
      client({
        url: '/get_all_sessions',
        method: METHODS.GET,
        ...params,
      }),
    getById: (params: any) =>
      client({
        url: `/get_session_by_id`,
        method: METHODS.GET,
        ...params,
      }),
    getByModuleId: (params: any) =>
      client({
        url: '/get_all_sessions',
        method: METHODS.GET,
        ...params,
      }),
    add: (params: any) =>
      client({
        url: '/add_session',
        data: params,
        method: METHODS.POST,
      }),
    update: (params: any) =>
      client({
        url: '/update_session',
        data: params,
        method: METHODS.PUT,
      }),
    delete: (params: any) =>
      client({
        url: `/remove_session/${params?.id}`,
        data: params,
        method: METHODS.DELETE,
      }),
  },
  tips: {
    getAll: (params: any) =>
      client({
        url: '/get_all_session_tips',
        method: METHODS.GET,
        ...params,
      }),
    getById: (params: any) =>
      client({
        url: `/get_session_tip_by_id`,
        method: METHODS.GET,
        ...params,
      }),
    add: (params: any) =>
      client({
        url: '/add_session_tips',
        data: params,
        method: METHODS.POST,
      }),
    update: (params: any) =>
      client({
        url: '/update_session_tip',
        data: params,
        method: METHODS.PUT,
      }),
    delete: (params: any) =>
      client({
        url: `/remove_session_tip/${params?.id}`,
        data: params,
        method: METHODS.DELETE,
      }),
  },
}
