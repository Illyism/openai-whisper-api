<div style="text-align:center;">
<img src="https://magicbuddy.chat/img/whisper.jpg">
</div>

# OpenAI Whisper API

**An Open Source Solution for Speech-to-Text and More**

Welcome to the OpenAI Whisper API, an open-source AI model microservice that leverages the power of OpenAI's whisper api, a state-of-the-art automatic speech recognition (ASR) system as a large language model. This service, built with Node.js, Bun.sh, and Typescript, is designed to run on Docker with zero dependencies, making it a versatile tool for developers across various speech and language-related applications.

The Whisper API is a speech-to-text model trained on a vast amount of multilingual and multitask training data, including a wide range of audio files and audio recordings. It's a single model that can handle tasks such as language identification, speech translation, and of course, transforming spoken word into written text.

The model is capable of handling a sequence of tokens and can work with natural language, making it a powerful tool for machine learning applications. It's designed to handle multilingual speech recognition, and it can even manage background noise, making it useful for transcribing a video call, zoom calls, a YouTube video or non-chat use cases in English language and more with full control.

The API is simple and is designed to be easy to use for developers of all skill levels with simple developer access. It's an open-source project, and it's licensed under the MIT license, meaning you can use it in your own projects with few restrictions. Whether you're looking to transcribe voice messages, improve system performance through a series of system-wide optimizations, or explore the capabilities of the OpenAI Whisper API, this is the place to start. Dive into the following code to learn more about how to use this powerful tool as a first step and get your OpenAI Account with a new api key.

## Usage

This is is a OpenAI Whisper API microservice using Node.js / Bun.sh / Typescript that can run on Docker. With zero dependencies.
It listens to the `/transcribe` route for MP3 files and returns the text transcription.

## Running locally

Install [bun.sh](https://bun.sh/) first, clone this directory and run these commands:

```bash
bun install
bun run dev
```

You can now navigate to http://localhost:3000 or the PORT provided, see the Usage section below.

## Docker

- See: https://hub.docker.com/r/illyism/openai-whisper-api

## Google Cloud Run Deployment

Clone this directory and run these commands:

(Replace `PROJECT_ID` with your own Google Cloud project ID)

```bash
docker build --platform linux/amd64 -t gcr.io/PROJECT_ID/whisper-docker .
docker push gcr.io/PROJECT_ID/whisper-docker

gcloud run deploy whisper-docker \
  --image gcr.io/PROJECT_ID/whisper-docker  \
  --region us-central1 \
  --allow-unauthenticated \
  --project PROJECT_ID
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

### API Key

You need to pass the OpenAI API Key as a HEADER:

```
Authorization: Bearer OPENAI_KEY
```

Or you can launch the docker image or server with `OPENAI_KEY` in the env:
  
```bash
OPENAI_KEY=YOUR_KEY_HERE bun run dev

# or

docker run -p 3000:3000 -e OPENAI_KEY=YOUR_KEY_HERE gcr.io/magicbuddy-chat/whisper-docker

# or set it as env in Cloud Run with the below command or in the Cloud Console UI

gcloud run deploy whisper-docker \
  --image gcr.io/PROJECT_ID/whisper-docker  \
  --set-env-vars OPENAI_KEY=YOUR_KEY_HERE \
  --region us-central1 \
  --allow-unauthenticated \
  --project PROJECT_ID
```

# Live example

We are using this Whisper API with [MagicBuddy, a Telegram ChatGPT bot](https://magicbuddy.chat/).

You can use the [OpenAI Whisper Docker](https://magicbuddy.chat/openai-whisper) as a live example here:

- https://magicbuddy.chat/openai-whisper
