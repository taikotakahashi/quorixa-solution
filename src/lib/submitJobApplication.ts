export type JobApplicationPayload = {
  jobId: string;
  jobTitle: string;
  jobDepartment: string;
  jobLocation: string;
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  coverLetter: string;
  resume: {
    filename: string;
    mimeType: string;
    data: string;
  };
};

export type JobApplicationResult =
  | { ok: true }
  | { ok: false; message: string };

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function validateResumeFile(file: File | null): string | null {
  if (!file) return "Please upload your resume.";
  if (file.size > MAX_RESUME_BYTES) {
    return "Resume must be 5 MB or smaller.";
  }
  if (!ALLOWED_RESUME_TYPES.has(file.type)) {
    return "Resume must be a PDF or Word document (.pdf, .doc, .docx).";
  }
  return null;
}

export async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

export async function submitJobApplication(
  payload: JobApplicationPayload,
): Promise<JobApplicationResult> {
  try {
    const res = await fetch("/api/job-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json()) as { message?: string; error?: string };

    if (!res.ok) {
      return {
        ok: false,
        message:
          data.message ??
          "We couldn't send your application. Please try again in a moment.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message:
        "We couldn't reach the application service. Check your connection and try again.",
    };
  }
}
