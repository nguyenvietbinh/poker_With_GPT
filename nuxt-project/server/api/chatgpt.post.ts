import axios from 'axios';


export default defineEventHandler(async (event) => {
  const res = await readBody(event);

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const apiKey = typeof process !== "undefined" ? process.env.OPENAI_API_KEY : "";
    const result = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: res.message }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return result.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
});
