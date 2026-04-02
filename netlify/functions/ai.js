export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body || "{}");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: `API ERROR: ${data?.error?.message || "unknown"}`
        })
      };
    }

    const reply =
      data.output?.find(item => item.type === "message" && item.role === "assistant")
        ?.content?.find(part => part.type === "output_text")
        ?.text ||
      data.output_text ||
      "La IA no respondió";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };

  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: "SERVER ERROR" })
    };
  }
}
