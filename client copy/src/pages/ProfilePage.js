import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Save, Loader2 } from "lucide-react";
import { fetchUserProfile, updateUserProfile } from "../api/users";
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    coverImage:
      "bgbanner.png",
    profileImage:
      "profilepicsquare.webp",
    firstName: "First Name",
    lastName: "Last Name",
    dob: "2025-01-01",
    gender: "Male",
    location: "Delhi , India",
    phone: "+91 12345 67890",
    email: "User@example.com",
    website: "https://example.com",
    description:
      "example description about the user. This can be a brief bio or introduction.",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const data = await fetchUserProfile();
        setUser((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);
  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateUserProfile(user);
      setUser((prev) => ({ ...prev, ...updated }));
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.section
      className="w-full overflow-hidden dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => navigate("/home")}
        className="absolute top-4 right-4 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-semibold z-50"
        aria-label="Back to Home"
      >
        Home
      </button>
      <div className="flex flex-col">
        <img
          src={user.coverImage}
          alt="User Cover"
          className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] h-[11rem] object-cover"
        />
        <div className="sm:w-[80%] w-[90%] mx-auto flex items-center">
          <img
            src={user.profileImage}
            alt="User Profile"
            className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] w-[7rem] h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] bottom-[3rem] object-cover"
          />
          <div className="flex-1 flex items-center">
            {editMode ? (
              <input
                type="text"
                value={`${user.firstName} ${user.lastName}`}
                onChange={(e) => {
                  const [first, ...last] = e.target.value.split(" ");
                  handleChange("firstName", first || "");
                  handleChange("lastName", last.join(" ") || "");
                }}
                className="ml-4 pl-4 text-gray-900 dark:text-gray-100 font-serif text-xl sm:text-3xl md:text-4xl bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none p-1"
              />
            ) : (
              <h1 className="w-full text-left my-4 sm:mx-4 pl-4 font-serif lg:text-4xl md:text-3xl sm:text-3xl text-xl">
                {user.firstName} {user.lastName}
              </h1>
            )}
          </div>
          <button
            onClick={() => {
              if (editMode) handleSave();
              else setEditMode(true);
            }}
            disabled={saving || loading}
            className="ml-4 text-blue-600 dark:text-yellow-400 p-2 rounded hover:bg-blue-100 dark:hover:bg-yellow-900 transition"
            aria-label={editMode ? "Save profile" : "Edit profile"}
          >
            {saving ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : editMode ? (
              <Save className="w-6 h-6" />
            ) : (
              <Pencil className="w-6 h-6" />
            )}
          </button>
        </div>
        <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 -top-4">
          {loading ? (
            <div className="text-center py-20 text-green-400 font-semibold">
              Loading profile...
            </div>
          ) : editMode ? (
            <textarea
              rows={5}
              value={user.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full rounded-md p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:outline-none"
            />
          ) : (
            <p className="w-fit text-gray-700 dark:text-gray-400 text-md">{user.description}</p>
          )}
          <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
            <div className="w-full flex sm:flex-row flex-col gap-2 justify-center">
              <div className="w-full">
                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  {[
                    { label: "First Name", value: user.firstName, field: "firstName" },
                    { label: "Last Name", value: user.lastName, field: "lastName" },
                    { label: "Date Of Birth", value: user.dob, field: "dob" },
                    { label: "Gender", value: user.gender, field: "gender" },
                  ].map(({ label, value, field }) => (
                    <div key={field} className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{label}</dt>
                      {editMode ? (
                        <dd>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(field, e.target.value)}
                            className="text-lg font-semibold w-full rounded-md p-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
                          />
                        </dd>
                      ) : (
                        <dd className="text-lg font-semibold">{value}</dd>
                      )}
                    </div>
                  ))}
                </dl>
              </div>
              <div className="w-full">
                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  {[
                    { label: "Location", value: user.location, field: "location" },
                    { label: "Phone Number", value: user.phone, field: "phone" },
                    { label: "Email", value: user.email, field: "email" },
                    { label: "Website", value: user.website, field: "website" },
                  ].map(({ label, value, field }) => (
                    <div key={field} className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{label}</dt>
                      {editMode && field !== "website" ? (
                        <dd>
                          <input
                            type={field === "email" ? "email" : "text"}
                            value={value}
                            onChange={(e) => handleChange(field, e.target.value)}
                            className="text-lg font-semibold w-full rounded-md p-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
                          />
                        </dd>
                      ) : field === "website" && !editMode ? (
                        <dd className="text-lg font-semibold hover:text-blue-500 break-all">
                          <a href={value} target="_blank" rel="noreferrer">
                            {value}
                          </a>
                        </dd>
                      ) : (
                        <dd className="text-lg font-semibold">{value}</dd>
                      )}
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          <div className="fixed right-2 bottom-20 flex flex-col rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-200/80 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400">
          </div>
        </div>
      </div>
    </motion.section>
  );
}
