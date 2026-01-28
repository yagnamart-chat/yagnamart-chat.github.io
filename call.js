const APP_ID = "ee32be9773944725acb0dbe9ac696cf8";
const CHANNEL = "session99";
const UID = Math.floor(Math.random() * 100000);

async function startCall() {
  // 1️⃣ Token fetch
  const res = await fetch("https://little-sunset-e4ee.sauravjha.workers.dev/rtc-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      channel: CHANNEL,
      uid: UID
    })
  });

  const data = await res.json();
  const token = data.token;

  // 2️⃣ Agora client
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  await client.join(APP_ID, CHANNEL, token, UID);

  // 3️⃣ Mic + Camera
  const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
  await client.publish(tracks);

  document.body.innerHTML = "<h1>✅ Call Connected</h1>";
}

startCall().catch(err => {
  document.body.innerHTML = "<h2>❌ Error</h2><pre>" + err + "</pre>";
  console.error(err);
});
