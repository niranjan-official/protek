"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { FaCaretRight } from "react-icons/fa";

const IdeaForm = ({ userId }: { userId: string }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [abstract, setAbstract] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = {
      userId,
      title,
      summary,
      abstract,
    };

    try {
      const response = await fetch("/api/send-idea-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Idea submitted successfully!");
        setTitle("");
        setSummary("");
        setAbstract("");
        setOpen(true);
      } else {
        switch (result.errorType) {
          case "ALREADY_IN_TEAM":
            setMessage(
              "Ideas cannot be submitted if you are already in a team",
            );
            break;
          default:
            setMessage(`Error: ${result.message}`);
            break;
        }
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage("An error occurred while submitting your idea.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded-xl bg-white p-3 text-center shadow-md">
      <h4 className="text-2xl font-bold">Create Own Idea</h4>
      <p className="text-sm text-neutral-700">
        The approval for your idea will be based on the below details
      </p>

      <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Idea title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="h-32"
          placeholder="Summary (Below 100 words)"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <textarea
          className="h-52"
          placeholder="Abstract (Below 500 words)"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          required
        />
        <button
          type="submit"
          className="rounded-[0.5rem] bg-blue-600 p-2 text-white"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Send Request"}
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-0 bg-slate-100">
          <DialogHeader>
            <DialogTitle>✅ Request Send Successfully !</DialogTitle>
            <p className="mb-6 text-neutral-700">
              You will recieve an email about the confirmation of this request
            </p>
            <Link
              className="flex items-center justify-center rounded-xl bg-green-600 p-2 text-white"
              href={`/`}
            >
              Go to Home
              <FaCaretRight size={20} />
            </Link>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IdeaForm;
