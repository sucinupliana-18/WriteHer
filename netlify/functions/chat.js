exports.handler = async function(event) {
  try {
    if (event.httpMethod !== "POST") {
  return {
    statusCode: 405,
    body: JSON.stringify({
      reply: "Endpoint ini hanya menerima request POST."
    })
  };
}

const { message } = JSON.parse(event.body || "{}");

if (!message) {
  return {
    statusCode: 400,
    body: JSON.stringify({
      reply: "Pesan belum dikirim."
    })
  };
}

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Kamu adalah WriteHer AI, asisten ramah berbahasa Indonesia yang membantu perempuan mengeksplorasi peluang karier di bidang kepenulisan digital. Jawab dengan singkat, hangat, praktis, dan mudah dipahami.

Pertanyaan pengguna:
${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply:
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Maaf, WriteHer AI belum bisa menjawab saat ini."
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "Maaf, terjadi kesalahan pada WriteHer AI."
      })
    };
  }
};