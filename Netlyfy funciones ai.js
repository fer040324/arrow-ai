exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const message = body.message || "";

    // detectar imagen
    const lower = message.toLowerCase();
    if (
      lower.includes("imagen") ||
      lower.includes("crea") ||
      lower.includes("genera") ||
      lower.includes("dibuja")
    ) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image:
            "https://image.pollinations.ai/prompt/" +
            encodeURIComponent("ultra detailed 8k " + message),
        }),
      };
    }

    // IA texto
    const res = await fetch(
      "https://text.pollinations.ai/" +
        encodeURIComponent(
          "Eres Arrow AI Ultra. Responde de forma inteligente y clara. Usuario: " +
            message
        )
    );

    const reply = await res.text();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: "Estoy funcionando. Hazme una pregunta.",
      }),
    };
  }
};
