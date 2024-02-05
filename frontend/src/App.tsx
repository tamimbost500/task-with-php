import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import Table from './components/Table'
import { FormDataType } from './globalType'
import { defaultFormValue } from './globalValue'
import { deleteMember, getMembers, getSectors } from './helper'

function App() {
  const [formData, setFormData] = useState<FormDataType>(defaultFormValue)
  const [members, setMembers] = useState<FormDataType[]>([])
  const [sectors, setSectors] = useState([])

  const handleEdit = (memberId: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const editMember = members.find((member) => member.id === memberId)
    editMember && setFormData(editMember)
  }

  const handleDelete = async (memberId: number) => {
    const isOk = window.confirm('Are you sure?')
    if (isOk) {
      const deletedId = await deleteMember(memberId)
      if (deletedId) {
        const updateMember = members.filter((member) => Number(member.id) !== deletedId)
        setMembers(updateMember)
      }
    }
  }

  useEffect(() => {
    const data = async function () {
      const sectors = await getSectors()
      try {
        setSectors(sectors)
      } catch (err) {
        console.log(err)
      }
    }
    data()
  }, [])

  useEffect(() => {
    const data = async function () {
      const sectors = await getMembers()
      try {
        setMembers(sectors)
      } catch (err) {
        console.log(err)
      }
    }
    data()
  }, [])

  return (
    <>
      <Form formData={formData} sectors={sectors} setFormData={setFormData} setMembers={setMembers} />
      <Table members={members} sectors={sectors} handleEdit={handleEdit} handleDelete={handleDelete} />
    </>
  )
}

export default App
