<div style="text-align:center;">
<img src="https://magicbuddy.chat/img/whisper.jpg">
</div>

# OpenAI Whisper Docker

This is is a Node.js OpenAI microservice using Node.js / Bun.sh with Docker.
With zero dependencies.

It listens to /transcribe and returns the transcription.

It includes a Docker image for the OpenAI Whisper AI.

## Running locally

Install bun.sh first, clone this directory and run these commands:

```bash
bun install
bun run dev
```

You can now navigate to http://localhost:3000 or the PORT provided, see the Usage section below.


## Google Cloud Run Deployment

Install bun.sh first, clone this directory and run these commands:
Change the project ID to your own.

```bash
docker build --platform linux/amd64 -t gcr.io/magicbuddy-chat/whisper-docker .
docker push gcr.io/magicbuddy-chat/whisper-docker

gcloud run deploy whisper-docker \
  --image gcr.io/magicbuddy-chat/whisper-docker  \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --project magicbuddy-chat
```

You should receive a Service URL, see the Usage section below.

## Usage

You can test normal HTTP by opening the /ping endpoint on the URL.

Connect to the /transcribe and send a POST request with the following body:

```json
{
  "audio": "BASE64_ENCODED_AUDIO"
}
```

You need to pass the OpenAI API Key as a HEADER:

```
Authorization: Bearer OPENAI_API_KEY
```

But you can change the file in src/controllers/transcribe.js to use process.env instead.

## Live example

We are using this Whisper API with [MagicBuddy, a Telegram ChatGPT bot](https://magicbuddy.chat/).

You can use the [OpenAI Whisper Docker](https://magicbuddy.chat/openai-whisper-docker) as a live example here:

- https://magicbuddy.chat/openai-whisper-docker
