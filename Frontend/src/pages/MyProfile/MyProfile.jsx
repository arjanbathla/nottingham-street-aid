import React, { useEffect, useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import { useSelector } from "react-redux";
import styles from "./MyProfile.module.css";  // Import the CSS module

const MyProfile = () => {
    const user = useSelector((state) => state.user.user);

    const { logout } = useLogout();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});


    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_HOST || "http://localhost:8999"}/api/profile/${user.username}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();
            if (response.ok) {
                setProfile(data);
                setEditMode(false);
            } else {
                console.error("Failed to update:", data.error);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_HOST || "http://localhost:8999"}/api/profile/${user.username}`
                );
                const data = await response.json();
                if (response.ok) {
                    setProfile(data);
                    setFormData(data);
                } else {
                    console.error("Error:", data.error);
                }
            } catch (err) {
                console.error("Failed to fetch profile:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.username) {
            fetchProfile();
        }
    }, [user]);

    if (loading) return <p>Loading profile...</p>;

    return (
        <div className={styles.container}>
            <h1>My Profile</h1>
            {profile ? (
                <div>
                    <p><span className={styles.boldText}>Email:</span> {profile.username}</p>

                    {editMode ? (
                        <>
                            <label>Organisation Phone:</label>
                            <input
                                type="text"
                                name="orgPhone"
                                value={formData.orgPhone}
                                onChange={handleChange}
                            />

                            <label>Organisation Address:</label>
                            <input
                                type="text"
                                name="orgAdr1"
                                value={formData.orgAdr1}
                                onChange={handleChange}
                            />

                            <label>Organisation Email:</label>
                            <input
                                type="email"
                                name="orgEmail"
                                value={formData.orgEmail}
                                onChange={handleChange}
                            />

                            <label>Contact First Name:</label>
                            <input
                                type="text"
                                name="contact1Fname"
                                value={formData.contact1Fname}
                                onChange={handleChange}
                            />

                            <label>Contact Last Name:</label>
                            <input
                                type="text"
                                name="contact1Lname"
                                value={formData.contact1Lname}
                                onChange={handleChange}
                            />

                            <label>Contact Email:</label>
                            <input
                                type="email"
                                name="contact1Email"
                                value={formData.contact1Email}
                                onChange={handleChange}
                            />

                            <br />
                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setEditMode(false)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p><span className={styles.boldText}>Organisation Phone:</span> {profile.orgPhone}</p>
                            <p><span className={styles.boldText}>Organisation Address:</span> {profile.orgAdr1}</p>
                            <p><span className={styles.boldText}>Organisation Email:</span> {profile.orgEmail}</p>
                            <p><span className={styles.boldText}>Contact:</span> {profile.contact1Fname} {profile.contact1Lname}</p>
                            <p><span className={styles.boldText}>Contact Email:</span> {profile.contact1Email}</p>

                            <button onClick={() => setEditMode(true)}>Edit</button>
                        </>
                    )}

                    <br />
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <p>No profile data found.</p>
            )}
        </div>
    );
};

export default MyProfile;
