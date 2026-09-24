import React, { useRef, useState } from "react";
import { Image, Upload, X } from "lucide-react";
import StepBar from "./StepBar";

export default function ReferencesPanel({ view, setView, references, setReferences }) {
  const [editingIds, setEditingIds] = useState([]);
  const inputRef = useRef(null);
  const files = Array.isArray(references) ? references : [];

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "application/pdf",
    "video/mp4",
  ];

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFile = async (file) => {
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a JPEG, PNG, JPG, WEBP, PDF, or MP4 file.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert("File size must be less than 50MB.");
      return;
    }

    const dataUrl = await fileToDataUrl(file);

    const newFile = {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      dataUrl,
      note: "",
    };

    setReferences((prev) => [...(prev ?? []), newFile]);

    // Open textarea for the newly uploaded file
    setEditingIds((prev) => [...prev, newFile.id]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    Array.from(e.dataTransfer.files).forEach(handleFile);
  };

  const handleChange = (e) => {
    Array.from(e.target.files).forEach(handleFile);
    e.target.value = "";
  };

  const updateNote = (id, note) => {
    setReferences((prev) =>
      (prev ?? []).map((item) =>
        item.id === id ? { ...item, note } : item
      )
    );
  };

  const removeFile = (id) => {
    setReferences((prev) =>
      (prev ?? []).filter((item) => item.id !== id)
    );

    setEditingIds((prev) =>
      prev.filter((editingId) => editingId !== id)
    );
  };

  const saveNote = (id) => {
    setEditingIds((prev) =>
      prev.filter((editingId) => editingId !== id)
    );
  };

  const editNote = (id) => {
    setEditingIds((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const isEditing = (id) => editingIds.includes(id);

  return (
    <section className="relative bg-white py-14 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1024px]">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold leading-tight text-[#006b4f] sm:text-5xl">
            Share your inspiration
          </h1>

          <p className="mt-3 max-w-[900px] font-serif text-lg leading-[1.35] text-[#171717] sm:text-xl">
            Upload reference photos : Pinterest saves, screenshots, a sketch
            on a napkin. Add a note to each so your planner understands
            exactly what caught your eye.
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

          {/* Upload box */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="flex h-[270px] w-full max-w-[596px] shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#0B5F46] bg-white"
          >
            <Upload
              size={34}
              strokeWidth={2}
              className="mb-3 text-[#006b4f]"
            />

            <p className="Montserrat font-sans text-[17px] font-medium text-[#006b4f]">
              Choose files or drag & drop them here
            </p>

            <p className="Montserrat mt-1 font-sans text-[13px] text-[#c7c7c7]">
              JPEG, PNG, WEBP, PDF, and MP4 formats, up to 50MB
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="Montserrat mt-4 rounded-md border border-[#6cae9d] bg-white px-3 py-1.5 font-sans text-[13px] text-[#555] transition hover:bg-[#f5faf8]"
            >
              Browse Files
            </button>

            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.webp,.pdf,.mp4"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* Uploaded files */}
          {files.length > 0 && (
            <div className="flex w-full max-w-[310px] flex-col gap-4">
              {files.map((item) => (
                <div
                  key={item.id}
                  className="rounded-md bg-white p-3 shadow-[0_3px_20px_rgba(0,0,0,0.10)]"
                >

                  {/* File information */}
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#eef6f3]">
                      {item.type?.startsWith("image/") ? (
                        <img
                          src={item.dataUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image
                          size={45}
                          strokeWidth={2}
                          className="text-[#006b4f]"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-sans text-[12px] text-[#006b4f]">
                        {item.name}
                      </p>

                      <div className="mt-1 h-[4px] w-full overflow-hidden rounded-full bg-[#d7d7d7]">
                        <div className="h-full w-[99%] bg-[#006b4f]" />
                      </div>

                      <p className="Montserrat mt-1 font-sans text-[9px] text-[#c5c5c5]">
                        {(item.size / 1024).toFixed(2)} KB uploaded
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFile(item.id)}
                      className="Montserrat text-[#999] transition hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Note */}
                  {isEditing(item.id) ? (
                    <textarea
                      value={item.note}
                      onChange={(e) => updateNote(item.id, e.target.value)}
                      placeholder="What do you like about this?"
                      className="Montserrat mt-3 h-[76px] w-full resize-none border border-[#8bb9ab] px-2 py-2 font-sans text-[13px] text-[#333] outline-none placeholder:text-[#c7c7c7] focus:border-[#006b4f]"
                    />
                  ) : (
                    <p className="Montserrat mt-3 min-h-[76px] whitespace-pre-wrap rounded-md bg-[#f8fbfa] px-2 py-2 font-sans text-[13px] text-[#555]">
                      {item.note || "No note added."}
                    </p>
                  )}

                  {/* Buttons */}
                  <div className="mt-3 flex gap-1">
                    {isEditing(item.id) ? (
                      <>
                        <button
                          type="button"
                          onClick={() => saveNote(item.id)}
                          className="Montserrat flex-1 bg-[#006b4f] py-1.5 font-sans text-[11px] text-white transition hover:bg-[#00563f]"
                        >
                          Save
                        </button>

                        <button
                          type="button"
                          onClick={() => removeFile(item.id)}
                          className="Montserrat flex-1 border border-[#6cae9d] bg-white py-1.5 font-sans text-[11px] text-[#006b4f] transition hover:bg-[#f3f9f7]"
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => editNote(item.id)}
                        className="Montserrat flex-1 bg-[#006b4f] py-1.5 font-sans text-[11px] text-white transition hover:bg-[#00563f]"
                      >
                        Update
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <StepBar view={view} setView={setView} />
    </section>
  );
}