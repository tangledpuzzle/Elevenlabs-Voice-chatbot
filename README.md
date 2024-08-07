# AVA - AI assistant

## Description
The project aims to develop a Chatbot with talking avatar animation. The goal of the project is developing a Chatbot that can make real-time conversation with customer based on voice.

The chatbot will have specific persona of busy doctor.

The system consists of STT engine, Chat engine, TTS engine and avatar synthesis engine.

The system will use Elevenlabs as TTS engine, Deepgram as STT, GPT-4 as Chat engine and D-ID for avatar synthesis.

The system will use function calling feature from OpenAI to track the state of the conversation and generate responses based on the conversation state.

The platform uses React for frontend development and Python FastAPI for backend, GitHub for version control. Docker will be employed for creating development environment.

## Solution
  To ensure the successful development of the project, the following solutions will be key:

### TTS Engine

  For the MVP product, we will use Elevenlabs as TTS engine to generate high-quality audios based on text. For MVP, we will implement streaming process to minimize delay of TTS engine. 
  
### STT Engine

  For the MVP product, we will use Deepgram API for STT engine. We will streaming the STT process to improve system performance. 
  
### Chat Engine
  We will use GPT-4-turbo model as chat engine to generate responses based on the user’s query.
  We will use function calling feature to track the state of the conversation. 
  
### Avatar Synthesis
  The platform will use D-ID to synthesize avatars based on audio. We will implement streaming process to minimize delay of avatar synthesis. 


## Development

### Branches of the repository, convention

* Develop - Main branch for development
* Fix - {#Task_ID}/fix/{fix_description}
* Feature - {#Task_ID}/feature/{feature_description}
* Master - Production version of the project
* Release - release/{dd.mm.yyyy}
* 

### Issue tracker

Gitlab's built-in [issue tracker](https://git.vivanti.eu/web/ava/-/issues) will be used in this project.


## Design

Can be found in figma [here](https://www.figma.com/file/fJd1GptHW7SV8zrOqRGX2g/Ava-Landing?type=design&node-id=0-1&mode=design&t=5cbz1KFYz07kJSe5-0).


## Markup

For HTML visit [markup branch](https://git.vivanti.eu/web/ava/-/tree/markup)

## Servers

Staging is located at Ubuntu server, IP 188.166.121.50.

## How to Run

1. Change <api_key_here> to valid api keys in `api.json` and `config.json`
2. Run `npm install` or `yarn install` and `npm run dev` or `yarn dev`
3. Open `localhost:3000` in the browser
