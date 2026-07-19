"use client";

import { FormEvent, useEffect, useState } from "react";

type Language = "en" | "zh" | "ja";
export type InquiryType = "consultation" | "recruit";

const copy = {
  en: {
    consultationTitle: "Contact us",
    recruitTitle: "Job application",
    consultationHint: "Fill in the form below. Our team will get back to you within 24 hours.",
    recruitHint: "Fill in the form below. Our recruiting team will get back to you within 24 hours.",
    name: "Name",
    nameRecruit: "Full name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    message: "Inquiry details",
    position: "Position applied for",
    submit: "Submit",
    submitting: "Sending...",
    successConsultation: "Thank you for your inquiry. We will contact you shortly.",
    successRecruit: "Thank you for your application. Our recruiting team will contact you shortly.",
    failed: "Submission failed. Please try again later.",
  },
  zh: {
    consultationTitle: "联系我们",
    recruitTitle: "招聘申请",
    consultationHint: "请填写以下表单，我们将在24小时内与您联系。",
    recruitHint: "请填写以下表单，我们将在24小时内与您联系。",
    name: "姓名",
    nameRecruit: "姓名",
    email: "邮箱",
    phone: "电话",
    company: "公司名称",
    message: "咨询内容",
    position: "应聘职位",
    submit: "提交",
    submitting: "提交中...",
    successConsultation: "感谢您的咨询，我们会尽快与您联系。",
    successRecruit: "感谢您的申请，我们会尽快与您联系。",
    failed: "提交失败，请稍后重试。",
  },
  ja: {
    consultationTitle: "お問い合わせ",
    recruitTitle: "採用応募",
    consultationHint: "以下のフォームにご記入いただき、お送りください。担当者より24時間以内にご連絡いたします。",
    recruitHint: "以下のフォームにご記入いただき、お送りください。採用担当者より24時間以内にご連絡いたします。",
    name: "お名前",
    nameRecruit: "氏名",
    email: "メールアドレス",
    phone: "電話番号",
    company: "会社名",
    message: "お問い合わせ内容",
    position: "応募ポジション",
    submit: "送信する",
    submitting: "送信中...",
    successConsultation: "お問い合わせありがとうございます。担当者よりご連絡いたします。",
    successRecruit: "応募ありがとうございます。採用担当者よりご連絡いたします。",
    failed: "送信に失敗しました。もう一度お試しください。",
  },
} as const;

type Props = {
  lang: Language;
  type: InquiryType;
  initialMessage?: string;
  onClose: () => void;
};

export default function InquiryModal({ lang, type, initialMessage = "", onClose }: Props) {
  const t = copy[lang];
  const isRecruit = type === "recruit";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: initialMessage,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, message: initialMessage }));
  }, [initialMessage, type]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type }),
      });

      let data: { error?: string; message?: string; details?: string } = {};
      try {
        data = await response.json();
      } catch {
        throw new Error(`HTTP ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || data.details || `HTTP ${response.status}`);
      }

      alert(isRecruit ? t.successRecruit : t.successConsultation);
      onClose();
    } catch (error) {
      console.error("Inquiry submit error:", error);
      const detail = error instanceof Error ? error.message : "";
      setSubmitError(detail ? `${t.failed} (${detail})` : t.failed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ths-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="ths-modal inquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="ths-modal-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        <div className="ths-modal-body">
          <h2 id="inquiry-modal-title">{isRecruit ? t.recruitTitle : t.consultationTitle}</h2>
          <p>{isRecruit ? t.recruitHint : t.consultationHint}</p>

          <form onSubmit={handleSubmit}>
            <div className="ths-field">
              <label className="ths-label" htmlFor="inquiry-name">
                {isRecruit ? t.nameRecruit : t.name} <span>*</span>
              </label>
              <input
                id="inquiry-name"
                type="text"
                required
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              />
            </div>

            <div className="ths-field">
              <label className="ths-label" htmlFor="inquiry-email">
                {t.email} <span>*</span>
              </label>
              <input
                id="inquiry-email"
                type="email"
                required
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              />
            </div>

            <div className="ths-field">
              <label className="ths-label" htmlFor="inquiry-phone">
                {t.phone}
              </label>
              <input
                id="inquiry-phone"
                type="tel"
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
              />
            </div>

            {!isRecruit && (
              <div className="ths-field">
                <label className="ths-label" htmlFor="inquiry-company">
                  {t.company}
                </label>
                <input
                  id="inquiry-company"
                  type="text"
                  value={formData.company}
                  onChange={(event) => setFormData({ ...formData, company: event.target.value })}
                />
              </div>
            )}

            <div className="ths-field">
              <label className="ths-label" htmlFor="inquiry-message">
                {isRecruit ? t.position : t.message} <span>*</span>
              </label>
              <textarea
                id="inquiry-message"
                required
                rows={5}
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
              />
            </div>

            {submitError && <p className="inquiry-error">{submitError}</p>}

            <button type="submit" className="ths-submit" disabled={isSubmitting}>
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
