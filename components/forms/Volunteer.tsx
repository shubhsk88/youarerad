import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { FormEvent, Fragment, useState } from 'react'

const volunteer = [
  { id: 1, name: 'Coding' },
  { id: 2, name: 'Clinical' },
  { id: 3, name: 'Community' },
  { id: 4, name: 'Event' },
]
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false)
  const [selected, setSelected] = useState(volunteer[3])

  const sendVolunteer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const res = await fetch('/api/volunteer', {
      body: JSON.stringify({
        name: (event.currentTarget.name as unknown as HTMLFormElement).value,
        email: event.currentTarget.email.value,
        volunteertype: selected.name,
        experience: event.currentTarget.experience.value,
        why: event.currentTarget.why.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    await res.json()
    ;(document.getElementById('name') as HTMLInputElement).value = ''
    ;(document.getElementById('email') as HTMLInputElement).value = ''
    ;(document.getElementById('experience') as HTMLInputElement).value = ''
    ;(document.getElementById('why') as HTMLInputElement).value = ''

    setSubmitted(true)
  }
  return (
    <div className="text-black bg-gray-50">
      <section className="items-center min-h-screen">
        <h5 className="text-center">Volunteer Form</h5>
        <h3 className="text-center">
          Let your legacy be{' '}
          <span className="text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text">
            RAD
          </span>
        </h3>
        <div className="flex flex-col justify-center flex-1 mt-16 lg:flex-none">
          <form onSubmit={sendVolunteer} className="w-full max-w-lg mx-auto">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-base font-medium text-left text-gray-700"
                >
                  Your Name:
                </label>
                <input autoFocus type="text" id="name" name="name" autoComplete="name" required />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-left text-gray-700"
                >
                  Your Email:
                </label>
                <input type="email" id="email" name="email" autoComplete="email" required />
              </div>
              <div>
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-base font-medium text-left text-gray-700">
                        I&apos;m interested in:
                      </Listbox.Label>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full py-3 pl-3 pr-10 text-left bg-white border-2 border-gray-300 shadow-sm cursor-default rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                          <span className="block truncate">{selected.name}</span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none rounded-xl">
                            {volunteer.map((volunteers) => (
                              <Listbox.Option
                                id={volunteers.id.toString()}
                                refName={volunteers.name}
                                key={volunteers.id}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                    'cursor-default select-none relative py-2 pl-3 pr-9 text-base'
                                  )
                                }
                                value={volunteers}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected ? 'font-semibold' : 'font-normal',
                                        'block truncate text-base'
                                      )}
                                    >
                                      {volunteers.name}
                                    </span>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active ? 'text-white' : 'text-indigo-600',
                                          'absolute inset-y-0 right-0 flex text-base items-center pr-4'
                                        )}
                                      >
                                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
              <div className="sm:col-span-2 ">
                <div className="">
                  <div className="flex justify-between">
                    <label
                      htmlFor="experience"
                      className="block text-base font-medium text-left text-gray-700"
                    >
                      Work or volunteer experience:
                    </label>
                    <span
                      id="experience-max"
                      className="block text-base font-medium text-left text-gray-700"
                    ></span>
                  </div>
                </div>
                <textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  className="block w-full px-4 py-3 mt-1 border-2 border-gray-300 shadow-sm rounded-xl text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500"
                  aria-describedby="experience"
                />
                <div className="mt-4">
                  <div className="flex justify-between">
                    <label
                      htmlFor="why"
                      className="block text-base font-medium text-left text-gray-700"
                    >
                      Why do you want to volunteer with RAD?
                    </label>
                  </div>
                </div>
                <textarea
                  id="why"
                  name="why"
                  rows={4}
                  className="block w-full px-4 py-3 mt-1 border-2 border-gray-300 shadow-sm rounded-xl text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500"
                />
                <button
                  disabled={submitted}
                  type="submit"
                  className={
                    submitted === true
                      ? 'bg-black text-white mt-2 form-button cursor-default'
                      : 'form-button bg-white mt-4'
                  }
                >
                  {submitted ? (
                    <div className="mt-2 font-bold text-white bg-black' ">Success!</div>
                  ) : (
                    'Contact RAD'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
