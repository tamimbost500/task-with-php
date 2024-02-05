import { ChangeEvent, SyntheticEvent, useMemo, useState } from 'react'
import { ErrorMessageType, FormDataType, SectorResponseType } from '../globalType'
import { defaultFormValue } from '../globalValue'
import { groupByParentIdAndAddDepth, saveMember, updateMember } from '../helper'

type FormType = {
  formData: FormDataType
  sectors: SectorResponseType[]
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
  setMembers: React.Dispatch<React.SetStateAction<FormDataType[]>>
}

export default function Form({ formData, sectors, setFormData, setMembers }: FormType) {
  const [errorMsg, setErrorMsg] = useState<Partial<ErrorMessageType>>({})

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    let response: FormDataType

    const error = formValidation(formData)
    if (Object.keys(error).length) {
      setErrorMsg(error)
      return
    }

    setErrorMsg({})

    if (formData.id && formData.id !== 0) {
      response = await updateMember(formData)
      if (response.id) {
        setFormData(defaultFormValue)
        setMembers((prev) =>
          prev.map((member) => {
            if (member.id === formData.id) {
              return response
            }
            return member
          }),
        )
      }
    } else {
      response = await saveMember(formData)
      if (response.id) {
        setFormData(defaultFormValue)
        setMembers((prev) => [...prev, response])
      }
    }
  }

  const formValidation = (stateData: FormDataType) => {
    const errors: Partial<ErrorMessageType> = {}
    if (stateData.name === '') {
      errors.name = 'Name filed empty'
    }
    if (stateData.name.length > 50) {
      errors.name = 'Name length not more than 50'
    }

    if (!stateData.sectorIds.length) {
      errors.sectorIds = 'Select sectors'
    }
    if (!stateData.isAgree) {
      errors.isAgree = 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy'
    }
    return errors
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleIsAgree = () => {
    setFormData((prev) => ({ ...prev, isAgree: !prev.isAgree }))
  }

  const handleSectors = (e: ChangeEvent<HTMLSelectElement>) => {
    const options = [...e.target.selectedOptions]
    const values: string[] = options.map((option) => option.value)

    setFormData((prev) => ({ ...prev, sectorIds: values.toString() }))
  }

  const sectorOptions = useMemo(() => groupByParentIdAndAddDepth(sectors), [sectors])

  return (
    <section className="max-w-4xl p-6 m-10 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
        Please enter your name and pick the Sectors you are currently involved in.
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
            {errorMsg.name && <p className="text-red-500 py-2">{errorMsg.name}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="sectors">
              Sectors
            </label>
            <select
              multiple
              size={5}
              value={formData.sectorIds.split(',')}
              onChange={handleSectors}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              name="sectors"
              id="sectors"
            >
              {sectorOptions.length &&
                sectorOptions.map((sector: FormDataType) => (
                  <option key={sector.id} value={sector.id} style={{ marginLeft: sector.depth && sector.depth * 20 }}>
                    {sector.name}
                  </option>
                ))}
            </select>
            {errorMsg.sectorIds && <p className="text-red-500 py-2">{errorMsg.sectorIds}</p>}
          </div>
        </div>
        <div className="inline-flex py-2 mt-2 items-center gap-x-3">
          <input
            title="agree"
            checked={formData.isAgree}
            onChange={handleIsAgree}
            type="checkbox"
            className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
          />
          <p>Agree to terms</p>
        </div>
        <br />
        {errorMsg.isAgree && <p className="text-red-500 py-2">{errorMsg.isAgree}</p>}

        <div className="mt-6">
          <button
            type="submit"
            className={`px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform ${
              !formData.id
                ? 'bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
                : 'bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600'
            }`}
          >
            {formData.id ? 'Update' : 'save'}
          </button>
        </div>
      </form>
    </section>
  )
}
