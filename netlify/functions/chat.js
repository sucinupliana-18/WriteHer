exports.handler = async function(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ reply: "Endpoint ini hanya menerima request POST." })
      };
    }

    const { message } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ reply: "Pesan belum dikirim." })
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "GEMINI_API_KEY belum terbaca di Netlify." })
      };
    }

    const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Kamu adalah WriteHer AI. Jawab dalam Bahasa Indonesia dengan ramah, singkat, dan praktis.

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

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          reply: `Error Gemini: ${data.error?.message || "Tidak diketahui"}`
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "Tidak ada jawaban dari Gemini."
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: `Error Function: ${error.message}`
      })
    };
  }
};