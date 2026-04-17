import React from "react";

export default function Loading() {
  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <img src="/loading.gif" alt="Loading..." style={styles.image} />
        <p style={styles.text}>Loading...</p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(6px)",
    zIndex: 9999,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 30px",
    borderRadius: "12px",
    backgroundColor: "#111",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  image: {
    width: "80px",
    height: "80px",
  },
  text: {
    marginTop: "10px",
    color: "#fff",
    fontSize: "14px",
    opacity: 0.8,
  },
};
