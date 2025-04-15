import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiInfo, FiSave, FiTag, FiX } from "react-icons/fi";
import { QuilEditor } from "../components/QuilEditor";
import {useAuth} from '../Context/AuthContext';
import { useNavigate } from "react-router";
import { updloadImage } from "../lib/storage";

// Available tags - In a real app, fetch from Supabase
const AVAILABLE_TAGS = [
  "React",
  "JavaScript",
  "CSS",
  "Tailwind",
  "Web Development",
  "Backend",
  "Frontend",
  "UI Design",
  "Performance",
  "Supabase",
  "Real-time",
  "API",
  "Testing",
  "TypeScript",
  "Future Tech",
];

export const EditorPage = () => {
  let isEditMode = false;

  // states for article data
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isTagMenuOpen, setIstagMenuOpen] = useState(false);
  const [featuredImageUrl, setfeaturedImageUrl] = useState("");
  const [isPublished, setIspublished] = useState(false);
  const [error, setError] = useState(null);

  // states for image uploading
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePath, setImagePath] = useState("");

  const fileInputRef = useRef(null);
  const editorRef = useRef(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if(file) {


      if(!file.type.startsWith('image/')) {
        toast.error('Please select an image file')

        e.target.value = '';
        setSelectedImage(null)
        return
      }


      const maxSize = 2 * 1024 * 1024;

      if (file.size > maxSize){
         toast.error(`Image size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds the 2MB limit`)

         e.target.value = '';
         setSelectedImage(null);
         return
      }

      setSelectedImage(file);

      // toast.success(`Selected file : ${file.name}`);
    }
  }

  const handleUploadImage = async () => {
    if(!selectedImage){
      toast.error('Please select an image')
      return
    }

    // check if the user logged in
    if(!user) {
     toast.error("You must be signed in to upload images");
     navigate("/signIn");
      return;
    }

    // start uploading

    setIsUploading(true);

    console.log('Starting image upload for', selectedImage);

    try {
      // upload image to supabase
      const { path, url} = await updloadImage(selectedImage, user.id);
      console.log('Image uploaded successfully', url, path )

      setfeaturedImageUrl(url.publicUrl);
      console.log('Featured image URL', featuredImageUrl)
      setImagePath(path);

      setSelectedImage(null);
      // clear selected image and file input
      if(fileInputRef.current){
        fileInputRef.current.value = '';
        
      }
      
      toast.success('Image uploaded successfully')
      console.log('Image state after upload:', {
        featuredImageUrl: url,
        imagePath: path
      })
      setIsUploading(false);
      // return the uploaded image data
      return {url, path}

    } catch (error) {
      console.log('Error uploading image', error);
      toast.error(`Failed to upload image: ${error.message || 'Unkhown error'}`)
      throw error
    }

  }



  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          {isEditMode ? "Edit Article" : "Create New Article"}
        </h1>

        {/* buttons save, publish, drift, cancel */}
        <div className="flex space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer">
            <FiX className="inline mr-2" />
            Cancel
          </button>

          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            <FiSave className="inline mr-2" />
            {isEditMode ? "Update Draft" : " Save as Draft"}
          </button>

          <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            <FiSave className="inline mr-2" />
            {isEditMode ? "Update and publish" : "Save and Publish"}
          </button>
        </div>
      </div>

      {/* Title input */}
      <div className="my-6">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          placeholder="Enter article title"
        />
      </div>

      {/* featured image */}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Featured Image
          <button
            type="button"
            onClick={() => toast("Maximum image size allowed is 5MB")}
            className="ml-2 text-xs text-gray-500 hover:text-gray-700"
          >
            <FiInfo className="inline-block" />
          </button>
        </label>

        {/* simplified image upload */}
        <div className="mb-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                id="featured-image"
                accept="image/*"
                onChange={handleImageSelect}
                ref={fileInputRef}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />

              {/* when we choose image */}
              {selectedImage && (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await handleUploadImage();
                    } catch (error) {
                      console.error("Failed to upload image:", error);
                      toast.error("Failed to upload image. Please try again.");
                    }
                  }}
                  disabled={isUploading}
                  className="px-3 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 disabled:opacity-50 cursor-pointer"
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* display currently stored image */}
        {featuredImageUrl && (
          <div className="mt-2 mb-4">
            <img
              src={featuredImageUrl}
              className="w-full max-h-64 object-cover rounded-md"
              alt="featured-image"
            />

            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500 truncate max-w-[80%]">
                {featuredImageUrl}
              </span>

              <button
                type="button"
                className="text-red-500 text-xs hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {/* tags selection */}
      <div className="mb-6 relative">
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tags
        </label>

        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              onClick={() => toggleTag(tag)}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 cursor-pointer"
            >
              {tag}
              <button
                type="button"
                className="ml-1.5 inline-flex text-orange-400 hover:text-orange-600 focus:outline-none"
              >
                <span className="sr-only">Remove tag {tag}</span>
                <svg
                  className="h-2 w-2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 8 8"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M1 1l6 6m0-6L1 7"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>

        {/* add tag button */}

        <button
          type="button"
          onClick={() => setIstagMenuOpen(!isTagMenuOpen)}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer"
        >
          <FiTag className="mr-1.5 h-4 w-4" />
          Add Tags
        </button>

        {isTagMenuOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-gray-400 ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <div
              className="grid grid-cols-2 gap-2 p-2"
              onMouseLeave={() => setIstagMenuOpen(false)}
            >
              {AVAILABLE_TAGS.map((tag) => (
                <div
                  key={tag}
                  className={`cursor-pointer px-3 py-2 rounded hover:bg-gray-100 ${
                    selectedTags.includes(tag)
                      ? "bg-orange-50 text-orange-700"
                      : ""
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content editor */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <QuilEditor
            ref={editorRef}
            value={content}
            onChange={handleContentChange}
            placeholder={"Write your article content here..."}
            height="500"
          />
        </div>
      </div>

      <div className="py-4  flex justify-end space-x-4">
        <button
          // onClick={() => handleSave(false)}
          className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isEditMode ? "Update as Draft" : "Save as Draft"}
        </button>

        <button
          // onClick={() => handleSave(true)}
          className="px-6 py-3 border border-transparent rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isEditMode ? "Update and Publish" : "Save and Publish"}
        </button>
      </div>
    </div>
  );
};
