exports.handler = async (event) => {
    try {
        const { message } = JSON.parse(event.body || "{}");
        const response = await fetch("https://text.pollinations.ai/" + encodeURIComponent(`Eres una IA avanzada. Usuario: ${message} IA:`));
        const reply = await response.text();
        return {
            statusCode: 200,
            body: JSON.stringify({ reply })
        };
    } catch (e) {
        return { statusCode: 200, body: JSON.stringify({ reply: "Error en la IA" }) };
    }
};
