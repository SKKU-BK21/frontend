"use client";
import { useState } from "react";
import { baseUrl } from "@/constants/baseUrl";
import classes from "./page.module.css";

export default function Home() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [buttonEnable, setButtonEnable] = useState(true);
  const [verified, setVerified] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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

  //파일을 /admin/authors/csv 에 보내기
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, endpoint: string) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

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
    }
  };

  const handleUpdateStatistics = async () => {
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

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        textAlign: "center",
        height: 200,
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
        <div>
          <h2>저자정보 CSV 업로드</h2>
          <div>
            <h3>CSV Upload</h3>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleFileUpload(e, "/admin/authors/csv")}
            />
          </div>
          <h2>통계 갱신</h2>
          <div>
            <h3>Conference Data Update</h3>{" "}
            <button disabled={!buttonEnable} onClick={handleUpdateStatistics}>
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
