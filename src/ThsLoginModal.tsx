"use client";

import { FormEvent, useState } from "react";

type Language = "en" | "zh" | "ja";
type UserType = "user" | "employee";

const copy = {
  en: {
    title: "THS Login",
    subtitle: "Select your login type",
    typeLabel: "Login type",
    user: "Customer",
    employee: "Employee",
    id: "ID",
    password: "Password",
    submit: "Log in",
    submitting: "Signing in...",
    required: "Please enter your ID and password.",
    failed: "Login failed. Please check your ID and password.",
  },
  zh: {
    title: "THS 登录",
    subtitle: "请选择登录类型",
    typeLabel: "登录类型",
    user: "用户",
    employee: "员工",
    id: "ID",
    password: "密码",
    submit: "登录",
    submitting: "登录中...",
    required: "请输入 ID 和密码。",
    failed: "登录失败，请检查账号和密码。",
  },
  ja: {
    title: "THS ログイン",
    subtitle: "ログインタイプを選択してください",
    typeLabel: "ログインタイプ",
    user: "ユーザー",
    employee: "従業員",
    id: "ID",
    password: "パスワード",
    submit: "ログイン",
    submitting: "ログイン中...",
    required: "IDとパスワードを入力してください。",
    failed: "ログインに失敗しました。IDとパスワードを確認してください。",
  },
} as const;

const wmsUrl = (import.meta.env.VITE_WMS_URL || "https://thsadmin.ans-scm.com").replace(/\/$/, "");
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://jstqorjesyjasxurkjvg.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzdHFvcmplc3lqYXN4dXJranZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3Mzg4MTksImV4cCI6MjA3NTMxNDgxOX0.mxbC_D6W_SoJKCZUlWiuOzzuG835spbVW_VWW_fK-gE";

type Props = {
  lang: Language;
  onClose: () => void;
};

export default function ThsLoginModal({ lang, onClose }: Props) {
  const t = copy[lang];
  const [userType, setUserType] = useState<UserType>("user");
  const [loginData, setLoginData] = useState({ id: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const account = loginData.id.trim();
    const password = loginData.password;
    if (!account || !password) {
      alert(t.required);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseAnonKey,
        },
        body: JSON.stringify({ email: account, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error_description || "Login failed");
      }

      const data = await response.json();
      const params = new URLSearchParams({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: String(data.expires_in),
        token_type: data.token_type,
        type: "recovery",
      });

      const targetPath = userType === "user" ? "client-portal.html" : "app.html";
      window.location.href = `${wmsUrl}/${targetPath}#${params.toString()}`;
    } catch (error) {
      console.error("THS login error:", error);
      alert(t.failed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ths-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="ths-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ths-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="ths-modal-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        <div className="ths-modal-body">
          <h2 id="ths-modal-title">{t.title}</h2>
          <p>{t.subtitle}</p>

          <form onSubmit={handleSubmit}>
            <div className="ths-field">
              <span className="ths-label">{t.typeLabel}</span>
              <div className="ths-type-switch">
                <button
                  type="button"
                  className={userType === "user" ? "active" : ""}
                  onClick={() => setUserType("user")}
                >
                  {t.user}
                </button>
                <button
                  type="button"
                  className={userType === "employee" ? "active" : ""}
                  onClick={() => setUserType("employee")}
                >
                  {t.employee}
                </button>
              </div>
            </div>

            <div className="ths-field">
              <label className="ths-label" htmlFor="ths-id">
                {t.id} <span>*</span>
              </label>
              <input
                id="ths-id"
                type="text"
                required
                value={loginData.id}
                onChange={(event) => setLoginData({ ...loginData, id: event.target.value })}
              />
            </div>

            <div className="ths-field">
              <label className="ths-label" htmlFor="ths-password">
                {t.password} <span>*</span>
              </label>
              <input
                id="ths-password"
                type="password"
                required
                value={loginData.password}
                onChange={(event) => setLoginData({ ...loginData, password: event.target.value })}
              />
            </div>

            <button type="submit" className="ths-submit" disabled={isSubmitting}>
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
