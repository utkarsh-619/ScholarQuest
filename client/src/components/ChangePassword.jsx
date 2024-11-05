import React from "react";

function ChangePassword() {
  return (
    <>
      <div className="flex mb-6">
        <div className="w-2/5 lg:pl-20">
          <h2 className="text-lg font-semibold text-gray-200">
            Change password
          </h2>
          <p className="text-sm text-gray-400">
            Update your password associated with your account.
          </p>
        </div>

        <div className="w-2/5">
          <form className="space-y-4">
            <div>
              <label
                className="block text-gray-200 text-sm mb-1"
                htmlFor="currentPassword"
              >
                Current password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                className="block text-gray-200 text-sm mb-1"
                htmlFor="newPassword"
              >
                New password
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                className="block text-gray-200 text-sm mb-1"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Save
            </button>
          </form>
        </div>
      </div>

      <hr className="h-[1px] bg-gray-600 border-0 my-6" />

      <div className="flex mb-6">
        <div className="w-2/5 lg:pl-20 pr-16">
          <h2 className="text-lg font-semibold text-gray-200">
            Delete account
          </h2>
          <p className="text-sm text-gray-400">
            No longer want to use our service? You can delete your account here.
            This action is not reversible. All information related to this
            account will be deleted permanently.
          </p>
        </div>

        <div className="w-2/5 ">
          <form className="space-y-4">
            <button
              type="submit"
              className="w-1/5 rounded-lg py-2 mt-4 font-semibold text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
