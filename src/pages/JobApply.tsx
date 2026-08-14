import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { jobs } from "../data/team";
import {
  fileToBase64,
  submitJobApplication,
  validateResumeFile,
} from "../lib/submitJobApplication";
import styles from "./JobApply.module.css";

export function JobApply() {
  const { id } = useParams();
  const job = jobs.find((item) => item.id === id);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!job) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h1>Position not found</h1>
          <p style={{ margin: "16px 0 28px" }}>
            This role may have closed or the link is outdated.
          </p>
          <Button href="/careers#positions" arrow>
            View open positions
          </Button>
        </div>
      </section>
    );
  }

  const role = job;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const resumeError = validateResumeFile(resume);
    if (resumeError) {
      setError(resumeError);
      return;
    }

    if (!resume) return;

    setSubmitting(true);

    try {
      const resumeData = await fileToBase64(resume);
      const result = await submitJobApplication({
        jobId: role.id,
        jobTitle: role.title,
        jobDepartment: role.department,
        jobLocation: role.location,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        linkedin: linkedin.trim(),
        portfolio: portfolio.trim(),
        coverLetter: coverLetter.trim(),
        resume: {
          filename: resume.name,
          mimeType: resume.type,
          data: resumeData,
        },
      });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className={`${styles.hero} grid-bg`}>
        <div className="container">
          <Link to={`/careers/${role.id}`} className={styles.back}>
            <ArrowLeft size={16} /> Back to job details
          </Link>
          <Reveal>
            <span className={styles.eyebrow}>Job application</span>
            <h1 className={styles.title}>Apply for {role.title}</h1>
            <p className={styles.subtitle}>
              Share your details and resume. Our talent team will review your
              application and get back to you within a few business days.
            </p>
            <div className={styles.meta}>
              <span>{role.department}</span>
              <span>{role.location}</span>
              <span>{role.type}</span>
              <span>{role.level}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <Reveal>
            <aside className={styles.copy}>
              <h2>What to include</h2>
              <p>
                Tell us about your experience and why this role is a good fit.
                Upload your latest resume so we can review your background.
              </p>
              <ol className={styles.steps}>
                <li>
                  <span className={styles.stepNum}>1</span>
                  <span>Complete your contact details and links.</span>
                </li>
                <li>
                  <span className={styles.stepNum}>2</span>
                  <span>Upload your resume (PDF or Word, up to 5 MB).</span>
                </li>
                <li>
                  <span className={styles.stepNum}>3</span>
                  <span>
                    Add a short cover note — highlight relevant projects and
                    availability.
                  </span>
                </li>
              </ol>
            </aside>
          </Reveal>

          <Reveal>
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.thanks}>
                  <h2>Application sent</h2>
                  <p>
                    Thank you for applying to {role.title}. We've received your
                    resume and details — our team will be in touch soon.
                  </p>
                  <Button href="/careers#positions" arrow>
                    Browse other roles
                  </Button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <h2 className={styles.formTitle}>Your application</h2>
                  <p className={styles.formHint}>
                    Fields marked with * are required.
                  </p>

                  <label className={styles.field}>
                    <span>Position</span>
                    <input
                      type="text"
                      value={role.title}
                      readOnly
                      className={styles.readonly}
                      aria-readonly
                    />
                  </label>

                  <div className={styles.fieldRow}>
                    <label className={styles.field}>
                      <span>Full name *</span>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Jane Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        autoComplete="name"
                      />
                    </label>
                    <label className={styles.field}>
                      <span>Email *</span>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </label>
                  </div>

                  <div className={styles.fieldRow}>
                    <label className={styles.field}>
                      <span>Phone</span>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                      />
                    </label>
                    <label className={styles.field}>
                      <span>LinkedIn</span>
                      <input
                        type="url"
                        name="linkedin"
                        placeholder="https://linkedin.com/in/you"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                    </label>
                  </div>

                  <label className={styles.field}>
                    <span>Portfolio or GitHub</span>
                    <input
                      type="url"
                      name="portfolio"
                      placeholder="https://github.com/you"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Cover letter / message *</span>
                    <textarea
                      name="coverLetter"
                      rows={6}
                      placeholder="Tell us about your experience, why you're interested in this role, and when you could start."
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Resume *</span>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => {
                        setResume(e.target.files?.[0] ?? null);
                        setError(null);
                      }}
                      required
                    />
                    <span className={styles.fileHint}>
                      PDF or Word document, max 5 MB
                      {resume ? ` · Selected: ${resume.name}` : ""}
                    </span>
                  </label>

                  {error && (
                    <p className={styles.error} role="alert">
                      {error}
                    </p>
                  )}

                  <Button type="submit" arrow disabled={submitting}>
                    {submitting ? "Sending application…" : "Submit application"}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
