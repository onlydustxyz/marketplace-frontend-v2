import { useAuth } from "src/hooks/useAuth";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useFormatMessage } from "src/hooks/useIntl";

const ProfileButton = () => {
  const { logout, user } = useAuth();
  const { avatarUrl, displayName } = user ?? { avatarUrl: null, displayName: "My Account" };
  const formatMessage = useFormatMessage();
  return (
    <div className="relative w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="
							inline-flex w-full justify-center px-4 py-2 items-center
							rounded-md bg-black bg-opacity-20 text-sm font-medium text-white
							hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            {avatarUrl && <img className="w-4 rounded-full mr-2" src={avatarUrl} />}
            {displayName}
            <ChevronDownIcon
              className="
								ml-2 -mr-1 h-5 w-5
							text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
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
          <Menu.Items
            className="
							absolute right-0 mt-2 w-56 origin-top-right
							divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
							focus:outline-none"
          >
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={RoutePaths.Profile}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                  >
                    {formatMessage("editProfile")}
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {formatMessage("logout")}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileButton;
