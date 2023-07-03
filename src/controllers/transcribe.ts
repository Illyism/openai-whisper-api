import { rm, mkdir } from 'fs/promises'
import { Req } from '../server/handler/handle'

mkdir(`${import.meta.dir}/tmp`, { recursive: true })
async function getFilePath(audio: string) {
  const randomId = Math.random().toString(36).substring(7)
  const mp3Path = `${import.meta.dir}/tmp/${randomId}.mp3`
  await Bun.write(mp3Path, Buffer.from(audio, 'base64'))
  return mp3Path
}

async function speechToText(base64Audio: string, apiKey: string) {
  const formData = new FormData()
  formData.append('model', 'whisper-1')
  const fp = await getFilePath(base64Audio)
  formData.append('file', Bun.file(fp), 'audio.mp3')

  const resp = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  })

  if (!resp.ok) {
    const error = (await resp.json()) as { error: { message: string } }
    throw new Error(error.error.message)
  }

  await rm(fp)
  const body = (await resp.json()) as { text: string }
  return body.text
}

function getApiKey(req: Req) {
  if (process.env.OPENAI_KEY) {
    return process.env.OPENAI_KEY
  }

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) throw new Error('Missing API key')
  const apiKey = authHeader.split(' ')[1]
  if (!apiKey) throw new Error('Wrong API key')
  return apiKey
}

export default async function (req: Req) {
  // get API Key from Authorization header
  const apiKey = getApiKey(req)

  // parse body
  if (!req.request.body) throw new Error('Missing body')
  const { audio } = await Bun.readableStreamToJSON(req.request.body)
  if (!audio) throw new Error('Missing audio file')

  return await speechToText(audio, apiKey)
}
