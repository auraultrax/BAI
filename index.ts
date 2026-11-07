import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const { prompt } = await req.json()
    const OLLAMA_URL = Deno.env.get('OLLAMA_URL') // Supabase Secret'tan güvenle çekilir

    // Ollama'ya istek at
    const ollamaRes = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: prompt,
        stream: false
      })
    })

    const ollamaData = await ollamaRes.json()
    const aiResponse = ollamaData.response

    // Supabase veritabanına logla
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    await supabase.from('ai_logs').insert([{ prompt, response: aiResponse }])

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
})
