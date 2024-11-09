import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [passwordData, setPasswordData] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if newPassword and confirmPassword match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/changepassword",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        },
        {
          withCredentials: true,
        }
      );
      alert("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/v1/users/delete", // Correct endpoint for account deletion
        {
          withCredentials: true, // Send cookies with the request
        }
      );
      alert("Account deleted successfully!");
      // Redirect to the signup page after successful deletion
      navigate("/signup");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account.");
    }
  };

  return (
    <>
      <div className="flex mb-6">
        <div className="w-2/5 lg:pl-20">
          <h2 className="text-lg font-semibold text-gray-200">Change password</h2>
          <p className="text-sm text-gray-400">
            Update your password associated with your account.
          </p>
        </div>

        <div className="w-2/5">
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                value={passwordData.currentPassword}
                onChange={handleChange}
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
                value={passwordData.newPassword}
                onChange={handleChange}
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
                value={passwordData.confirmPassword}
                onChange={handleChange}
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
          <h2 className="text-lg font-semibold text-gray-200">Delete account</h2>
          <p className="text-sm text-gray-400">
            No longer want to use our service? You can delete your account here.
            This action is not reversible. All information related to this account
            will be deleted permanently.
          </p>
        </div>

        <div className="w-2/5">
          <form className="space-y-4">
            <button
              type="button"
              onClick={handleDelete}
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
