import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../../App";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";


const EditLecture = () => {
    const { courseId, lectureId } = useParams();
    const navigate = useNavigate();

    const [lectureTitle, setLectureTitle] = useState("");
    const [isPreviewFree, setIsPreviewFree] = useState(false);

    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState("");

    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // ✅ Fetch lecture from course
    useEffect(() => {
        const fetchLecture = async () => {
            try {
                const res = await axios.get(
                    `${serverUrl}/api/course/courselecture/${courseId}`,
                    { withCredentials: true }
                );

                const lecture = res.data.course.lectures.find(
                    (lec) => lec._id === lectureId
                );

                setLectureTitle(lecture.lectureTitle);
                setIsPreviewFree(lecture.isPreviewFree);
                setVideoPreview(lecture.videoUrl);
            } catch (err) {
                console.log(err);
                toast.error("Failed to load lecture");
            }
        };

        fetchLecture();
    }, [courseId, lectureId]);

    // ✅ Video select
    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));
    };

    // ✅ Remove video
    const handleRemoveVideo = () => {
        setVideoFile(null);
        setVideoPreview("");
    };

    // ✅ Save lecture
    const handleSave = async () => {
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append("lectureTitle", lectureTitle);
            formData.append("isPreviewFree", isPreviewFree);

            if (videoFile) {
                formData.append("videoUrl", videoFile);
            }

            await axios.post(
                `${serverUrl}/api/course/editlecture/${lectureId}`,
                formData,
                { withCredentials: true }
            );

            toast.success("Lecture updated");
            navigate(-1);
        } catch (err) {
            toast.error("Update failed");
        } finally {
            setSaving(false);
        }
    };

    // ✅ Delete lecture
    const handleDelete = async () => {
        setDeleting(true);
        try {
            await axios.get(
                `${serverUrl}/api/course/removelecture/${lectureId}`,
                { withCredentials: true }
            );

            toast.success("Lecture deleted");
            navigate(-1);
        } catch (err) {
            toast.error("Delete failed");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white px-6 md:px-20 py-10">
            {/* 🔙 Back */}
            <div
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-400 hover:text-orange-500 cursor-pointer mb-8"
            >
                <FaArrowLeft />
                Back
            </div>

            <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                <h1 className="text-2xl font-bold">Edit Lecture</h1>

                {/* Title */}
                <div>
                    <label className="text-sm text-gray-400">Lecture Title</label>
                    <input
                        type="text"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        className="w-full mt-2 px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-orange-500 outline-none"
                    />
                </div>

                {/* Free Preview */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={isPreviewFree}
                        onChange={(e) => setIsPreviewFree(e.target.checked)}
                    />
                    <span className="text-gray-300">Free Preview Lecture</span>
                </div>

                {/* 🎥 Video Upload Area */}
                <div className="mt-6">
                    {!videoPreview ? (
                        <label className="flex flex-col items-center justify-center h-52 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-orange-500 transition">
                            <span className="text-gray-400">Click to upload video</span>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoChange}
                                className="hidden"
                            />
                        </label>
                    ) : (
                        <div className="relative">
                            <video
                                src={videoPreview}
                                controls
                                className="w-full h-64 rounded-xl object-cover border border-white/10"
                            />

                            <button
                                onClick={handleRemoveVideo}
                                className="absolute top-3 right-3 bg-red-600 hover:bg-red-500 text-white p-2 rounded-full transition"
                            >
                                <FaTimes size={14} />
                            </button>

                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-40 h-12 bg-orange-500 text-black rounded-full font-semibold flex items-center justify-center"
                    >
                        {saving ? <ClipLoader size={20} color="black" /> : "Save"}
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="w-40 h-12 bg-red-600 rounded-full font-semibold flex items-center justify-center"
                    >
                        {deleting ? (
                            <ClipLoader size={20} color="white" />
                        ) : (
                            <>
                                <FaTrash className="mr-2" /> Delete
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditLecture;
