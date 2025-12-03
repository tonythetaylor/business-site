import {
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { submitApplication } from "../../api/careers";

export const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export type StatusType = "success" | "error" | null;

export function useCareersForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [positionOther, setPositionOther] = useState("");
  const [message, setMessage] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<StatusType>(null);
  const [submitting, setSubmitting] = useState(false);
  // Honeypot anti-bot field
  const [websiteField, setWebsiteField] = useState("");

  const toggleRole = (roleTitle: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleTitle)
        ? prev.filter((r) => r !== roleTitle)
        : [...prev, roleTitle]
    );
  };

  const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setResumeFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setStatusType("error");
      setStatus(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`);
      setResumeFile(null);
      return;
    }

    setStatus(null);
    setStatusType(null);
    setResumeFile(file);
  };

  const buildPositionValue = () => {
    const trimmedOther = positionOther.trim();
    const rolesPart =
      selectedRoles.length > 0 ? `Roles: ${selectedRoles.join(", ")}` : "";
    const otherPart = trimmedOther ? `Areas: ${trimmedOther}` : "";

    if (rolesPart && otherPart) return `${rolesPart} | ${otherPart}`;
    if (rolesPart) return rolesPart;
    if (otherPart) return otherPart;
    return "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot – bots will often fill this
    if (websiteField.trim().length > 0) {
      setStatusType("success");
      setStatus("Application submitted. Thank you for your interest.");
      return;
    }

    if (!resumeFile) {
      setStatusType("error");
      setStatus("Please attach a resume (PDF, DOC, or DOCX).");
      return;
    }

    if (!fullName.trim() || !email.trim()) {
      setStatusType("error");
      setStatus("Please fill in your name and email.");
      return;
    }

    const positionValue = buildPositionValue();
    if (!positionValue) {
      setStatusType("error");
      setStatus(
        "Please select at least one role or describe your area of interest."
      );
      return;
    }

    try {
      setSubmitting(true);
      setStatus(null);
      setStatusType(null);

      await submitApplication({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        position: positionValue,
        message: message.trim(),
        resumeFile,
      });

      setStatusType("success");
      setStatus("Application submitted. Thank you for your interest.");

      setFullName("");
      setEmail("");
      setPhone("");
      setPositionOther("");
      setMessage("");
      setResumeFile(null);
      setSelectedRoles([]);
      setWebsiteField("");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit application.";
      setStatusType("error");
      setStatus(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    // values
    fullName,
    email,
    phone,
    positionOther,
    message,
    selectedRoles,
    status,
    statusType,
    submitting,
    websiteField,
    // setters
    setFullName,
    setEmail,
    setPhone,
    setPositionOther,
    setMessage,
    setWebsiteField,
    setStatus,
    setStatusType,
    // handlers
    toggleRole,
    handleResumeChange,
    handleSubmit,
    // constants
    MAX_FILE_SIZE_MB,
  };
}

export type CareersFormState = ReturnType<typeof useCareersForm>;