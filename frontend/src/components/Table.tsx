import { FormDataType, SectorResponseType } from '../globalType'

type TableType = {
  members: FormDataType[]
  sectors: SectorResponseType[]
  handleEdit: (memberId: number) => void
  handleDelete: (memberId: number) => void
}

export default function Table({ members, sectors, handleEdit, handleDelete }: TableType) {
  const membersData = members.map((member: FormDataType) => {
    const { id, name, sectorIds, isAgree } = member

    const sectorsName = sectors
      .filter((sector: SectorResponseType) => sectorIds.split(',').includes(String(sector.id)))
      .map((sector: SectorResponseType) => sector.name)
    return { id, name, sectorsName, isAgree }
  })

  if (!membersData.length) {
    return <h2 className="text-lg font-medium text-gray-800 dark:text-white">No Members</h2>
  }
  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Members</h2>
      </div>

      <div className="p-5 h-screen bg-gray-100">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Sectors</th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {membersData.length &&
                membersData.map((member) => (
                  <tr key={member.id} className="bg-white">
                    <td className="p-3 text-sm text-gray-600 whitespace-nowrap">{member.id}</td>
                    <td className="p-3 text-sm text-gray-700 font-semibold whitespace-nowrap">{member.name}</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap flex flex-wrap items-center gap-x-2">
                      {member.sectorsName.map((sectorName: string) => (
                        <p
                          key={sectorName}
                          className="px-3 py-1 m-1.5 text-xs text-indigo-500 rounded-full dark:bg-gray-800 bg-indigo-100/60"
                        >
                          {sectorName}
                        </p>
                      ))}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-x-6">
                        <button
                          title="delete"
                          onClick={() => handleDelete(member.id)}
                          className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>

                        <button
                          title="edit"
                          onClick={() => handleEdit(member.id)}
                          className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {membersData.length &&
            membersData.map((member) => (
              <div key={member.id} className="bg-white space-y-3 p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="text-gray-400">{member.id}</div>
                  <div className="text-gray-600 font-semibold">{member.name}</div>
                </div>
                <div className="text-sm flex flex-wrap text-gray-700">
                  {member.sectorsName.map((sectorName: string) => (
                    <p
                      key={sectorName}
                      className="px-3 py-1 m-1.5 text-xs text-indigo-500 rounded-full dark:bg-gray-800 bg-indigo-100/60"
                    >
                      {sectorName}
                    </p>
                  ))}
                </div>
                <div className="text-sm font-medium text-black">
                  <div className="flex items-center gap-x-6">
                    <button
                      title="delete"
                      onClick={() => handleDelete(member.id)}
                      className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>

                    <button
                      title="edit"
                      onClick={() => handleEdit(member.id)}
                      className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
