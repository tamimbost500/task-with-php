import axios from 'axios'
import { FormDataType, SectorResponseType } from './globalType'

const baseURL = import.meta.env.VITE_BASE_URL

export const saveMember = async (formData: FormDataType) => {
  const res = await axios.post(`${baseURL}/member/save`, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  const data = await res.data
  return data
}
export const updateMember = async (formData: FormDataType) => {
  const res = await axios.post(`${baseURL}/member/update`, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  const data = await res.data
  return data
}

export const getSectors = async () => {
  const res = await axios.get(`${baseURL}/sectors`)
  const sectorOptions = await res.data
  return sectorOptions
}

export const getMembers = async () => {
  const res = await axios.get(`${baseURL}/member`)
  const members = await res.data
  return members
}

export const deleteMember = async (id: number) => {
  const res = await axios.post(
    `${baseURL}/member/delete`,
    { id },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )
  const result = await res.data
  return result
}

export function groupByParentIdAndAddDepth(data: SectorResponseType[]) {
  const groupedData: { [key: number]: SectorResponseType[] } = {}

  // Group by parentId
  data.forEach((item) => {
    let parentId = item.parentId
    if (parentId === null) {
      parentId = 0
    }
    if (!groupedData[parentId]) {
      groupedData[parentId] = []
    }
    groupedData[parentId].push(item)
  })

  // Add depth to each item
  const addDepth = (items: SectorResponseType[], depth: number) => {
    items.forEach((item) => {
      item.depth = depth
      const children = groupedData[item.id]
      if (children) {
        addDepth(children, depth + 1)
      }
    })
  }

  // Start with items having no parentId (top-level items)
  const topLevelItems = groupedData[0] || []
  addDepth(topLevelItems, 0)

  // Flatten the result
  const flatten = (items: SectorResponseType[]): SectorResponseType[] => {
    return items.flatMap((item) => {
      const children = groupedData[item.id] || []
      return [item, ...flatten(children)]
    })
  }
  const result = flatten(topLevelItems)
  return result
}
