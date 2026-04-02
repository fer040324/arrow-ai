export async function handler(event) {
try {

const { message } = JSON.parse(event.body)

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
})

const data = await response.json()

// mostrar error real
if(data.error){
return {
statusCode:200,
body: JSON.stringify({
reply: "API ERROR: " + data.error.message
})
}
}

return {
statusCode:200,
body: JSON.stringify({
reply: data.output[0].content[0].text
})
}

} catch (e) {
return {
statusCode:200,
body: JSON.stringify({
reply: "SERVER ERROR"
})
}
}
}
