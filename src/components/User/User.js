import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Avatar from 'react-avatar';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function User({ roomuser }) {
  console.log('room user is', JSON.stringify(roomuser, null, 2));

  return (
    <div className='absolute top-12 left-[64%]'>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-[90px] h-[40px] items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Users
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {roomuser.map((user) => (
                <Menu.Item key={user.id}>
                  {({ active }) => (
                    <div className='flex justify-start items-center pl-4'>
                      <div>
                      <Avatar textSizeRatio={0.75} round size='25' name={user.username} />
                      </div>
                    <div
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-md'
                        )}
                        >
                      {user.username}
                    </div>
                      </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
