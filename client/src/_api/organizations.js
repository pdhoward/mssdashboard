import { AxiosResponse } from 'axios'
// import Organization, {
//   OrganizationSubmissionData,
//   OrganizationId,
// } from './_types/Organization'
// import apiClient from './client'

// export interface OrganizationsService {
//   getOne(organizationId: OrganizationId): Promise<Organization>
//   getList(params: any): Promise<OrganizationsListResponse>
//   create(organization: OrganizationSubmissionData): Promise<Organization>
//   update(
//     organizationId: OrganizationId,
//     organization: OrganizationSubmissionData,
//   ): Promise<Organization>
//   remove(organizationId: OrganizationId): Promise<any>
// }

// export interface OrganizationsListResponse {
//   organizations: Organization[]
//   count: number
// }

const OrganizationsService = {
  getOne(organizationId) {
    return apiClient
      .get(`/organizations/${organizationId}`)
      .then(res.data)
  },
  getList(params) {
    return apiClient
      .get(`/organizations`, {
        params,
      })
      .then(res.data)
  },
  create(organization) {
    return apiClient
      .post(`/organizations`, organization)
      .then(res.data)
  },
  update(organizationId, organization) {
    return apiClient
      .put(`/organizations/${organizationId}`, organization)
      .then(res.data)
  },
  remove(organizationId) {
    return apiClient
      .delete(`/organizations/${organizationId}`)
      .then(res.data)
  },
}

export default OrganizationsService
