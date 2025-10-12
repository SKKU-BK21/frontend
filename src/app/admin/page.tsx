"use client";
import { useState, useRef } from "react";
import { baseUrl } from "@/constants/baseUrl";
import classes from "./page.module.css";

export default function Home() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [buttonEnable, setButtonEnable] = useState(true);
  const [verified, setVerified] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(baseUrl + "/admin/verify", {
        method: "POST",
        headers: { "x-adminpwd": password },
      });

      const data = await res.json();

      if (data.success) {
        setVerified(true);
      } else {
        setError(data.message || "인증 실패");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // 파일을 /admin/authors/csv 에 보내기
  const handleFileUpload = async (endpoint: string) => {
    setSuccess("");
    setError("");
    if (!selectedFile) {
      setError("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch(baseUrl + endpoint, {
        method: "POST",
        headers: { "x-adminpwd": password },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("파일 업로드 성공!");
      } else {
        setError(data.message || "파일 업로드 실패.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUpdateStatistics = async () => {
    setSuccess("");
    setError("");
    setButtonEnable(false);
    try {
      const res = await fetch(baseUrl + "/admin/statistics", {
        method: "POST",
        headers: { "x-adminpwd": password },
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("통계 갱신 성공!");
      } else {
        setError(data.message || "통계 갱신 실패.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
    }
    setButtonEnable(true);
  };

  const handleDownloadExample = async () => {
    setSuccess("");
    setError("");
    try {
      const res = await fetch(baseUrl + "/admin/authors/csv/example", {
        method: "GET",
        headers: { "x-adminpwd": password },
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "example.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setSuccess("샘플 파일 다운로드 성공!");
      } else {
        const data = await res.json();
        setError(data.message || "파일 다운로드 실패.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        textAlign: "center",
        height: "auto",
      }}
      className={classes.filterContainer}
    >
      {!verified ? (
        <form onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: "10px" }}>비밀번호 입력</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
          />
          <button type="submit" style={{ padding: "8px 16px" }}>
            확인
          </button>
        </form>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "10px" }}
        >
          <div>
            <h2>저자정보 CSV 업로드</h2>
            <ul
              style={{
                textAlign: "left",
                margin: "14px 0",
                paddingLeft: "20px",
                color: "red",
                fontSize: "13px",
              }}
            >
              <li>첫 번째 행은 헤더로 인식됩니다.</li>
              <li>이름(name)과 국가(country)은 필수 입력 항목입니다.</li>
              <li>예시 CSV 파일을 다운로드하여 참고하세요.</li>
              <li>업로드 완료 후 하단의 통계 갱신을 눌러주십시오.</li>
            </ul>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <input type="file" accept=".csv" onChange={handleFileChange} ref={fileInputRef} />
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleFileUpload("/admin/authors/csv")}
                  style={{ padding: "8px 16px" }}
                  disabled={!selectedFile}
                >
                  업로드
                </button>
                <button onClick={handleDownloadExample} style={{ padding: "8px 16px" }}>
                  예시 CSV 다운로드
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2>통계 갱신</h2>
            <ul
              style={{
                textAlign: "left",
                margin: "14px 0",
                paddingLeft: "20px",
                color: "red",
                fontSize: "13px",
              }}
            >
              <li>통계 갱신 중에는 업로드를 하지 말아주십시오.</li>
              <li>통계 갱신에는 30초 ~ 1분 정도 소요됩니다.</li>
            </ul>
            <button
              disabled={!buttonEnable}
              onClick={handleUpdateStatistics}
              style={{ padding: "8px 16px", marginTop: "10px" }}
            >
              통계 갱신
            </button>
          </div>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
