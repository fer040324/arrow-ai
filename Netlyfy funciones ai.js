exports.handler = async (event) => {
try {

const { message } = JSON.parse(event.body || "{}")
const text = message.toLowerCase()

// IMAGEN ULTRA
if(
text.includes("imagen") ||
text.includes("crea") ||
text.includes("genera") ||
text.includes("dibuja")
){
return {
statusCode:200,
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
image:`https://image.pollinations.ai/prompt/${encodeURIComponent(
"Ultra detailed, 8k, cinematic, " + message
)}`
})
}
}

// IA SUPER INTELIGENTE
const response = await fetch(
"https://text.pollinations.ai/" +
encodeURIComponent(`
Eres Arrow AI Ultra.
Una inteligencia artificial más avanzada que un asistente común.
Responde con inteligencia, claridad y detalle.
Sé útil y conversacional.

Usuario: ${message}
IA:
`)
)

const reply = await response.text()

return {
statusCode:200,
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ reply })
}

}catch(e){
return {
statusCode:200,
body:JSON.stringify({
reply:"Estoy listo. Pregúntame algo."
})
}
}
}
