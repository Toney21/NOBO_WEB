import QRCode from "react-qr-code";

export default function QRCodeClient({ playStoreLink, appStoreLink, size = 200 }) {
  const appOrigin =
    process.env.NEXT_CLIENT_HOST_URL ||
    process.env.NEXT_PUBLIC_WEB_ORIGIN ||
    "http://localhost:3000";

  // Create redirect URL with query parameters for server-side detection
  const redirectPath = `/app-redirect?playStore=${encodeURIComponent(
    playStoreLink || ''
  )}&appStore=${encodeURIComponent(appStoreLink || '')}`;

  // Keep URL deterministic across SSR + hydration to avoid mismatch.
  const redirectUrl = `${appOrigin.replace(/\/$/, "")}${redirectPath}`;

  return (
    <div style={{ padding: 10, background: "white", display: "inline-block" }}>
      <QRCode value={redirectUrl} size={size} />
    </div>
  );
}
