<style>

#idle-video {
    position: absolute;
    display: block;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
    z-index: 4;
}

#talk-video{
    z-index: 5;
    display: block;
    opacity: 0;
}

</style>


<template>

    <div class="ava-page ava-page--chat">

        <div class="chat-container">
            <div class="chat-header">
                <img src="images/logo.svg" alt="logo" width="118" class="chat-header__logo" @click="incrementdebugMode()">
                <div class="chat-header__attempts">
<!--                    <p class="attempt-counter">-->
<!--                        <span class="attempt-counter__caption">Attempt</span>-->
<!--                        <span class="attempt-counter__current" v-html="attempts"></span>/<span class="attempt-counter__total">3</span>-->
<!--                    </p>-->
                    <button class="btn-retry-attempt">
                        <img src="images/icon__retry-chat.svg" alt="logo" width="24">
                    </button>
                </div>
            </div>

            <div class="flex-row">
                <div class="doctor-avatar">
                    <div class="doctor-avatar__content">
<!--                        <video id="talk-video" autoplay loop  class="doctor-avatar__video_new"></video>-->


                        <video id="talk-video"  autoplay loop class="doctor-avatar__video_new"></video>
                        <video id="idle-video"  autoplay loop muted class="doctor-avatar__video_new" src="/video/idle.mp4"></video>


                    </div>
                    <div class="avatar-controls">
                        <button class="avatar-controls__mobile-btn"></button>
                        <div class="avatar-controls__content">
                            <div class="avatar-controls__inner">
                                <button class="avatar-controls__min"></button>
                                <div class="avatar-controls__slider" >
                                    <div id="volume-progress" class="avatar-controls__slider-fill"></div>
                                    <div id="draggable-point" class="avatar-controls__slider-bullet"></div>
                                    <input id="volume-range" min="0" max="100" value="30" type="range">
                                </div>
                                <button class="avatar-controls__max"></button>
                            </div>
                            <button class="avatar-controls__content-mute"></button>
                        </div>
                    </div>
                </div>

                <div class="chat-block">
                    <div class="chat-block__messages">

                        <div class="chat-block--holder" style="width: 100%">
                            <div  v-for="(message, index)  in chatMessages" class="chat-message--item-holder">
                                <div class="chat-message" :class="message.role == 'user' ? ' chat-message--answer' : null " v-if="message.role !== 'system' ">
                                    <div class="chat-message__text" v-if="message.role !== 'system'" v-html="formatMessage(message.content)"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="chat-block__controls">
                        <div class="chat-block__controls-field">
                            <form @submit="sendMessage">
                                <input id="user-input" v-model="userMessage" autocomplete="off" class="chat-block__controls-input" type="text" name="textField" value="" placeholder="Please enter a message">
                                <button class="chat-block__controls-send"></button>
                            </form>
                        </div>
                        <button class="chat-block__controls-voice"></button>
                    </div>
                </div>

            </div>

        </div>

        <div class="popup-wrapper">
            <div class="popup-block popup-block--1">
                <img src="images/logo.svg" alt="logo" width="118" class="mx-auto mb-40">
                <p class="mb-8">You are a medical representative. Your aim is to obtain a doctor’s permission for a visit but the doctor looks tired and a little grumpy. Her answers have a negative tone. You can see that she is not in the mood to communicate with you today, but it is important for you to have the visit today.</p>
                <p class="mb-8">The doctor is medium-loyal but high-potential for your company. You've already met several times, but today, unfortunately, she is "in a bad mood" — there's a line of patients and she has no desire to talk to you. Try to persuade her to listen to you.</p>
                <p class="mr-auto">So, you come into doctor’s office...</p>
                <button class="btn-ava mx-auto mt-40 popup-close" @click="makeConnection"><span>Enter Ava’s Office</span></button>
            </div>
            <div class="popup-block popup-block--2">
                <img src="images/logo.svg" alt="logo" width="118" class="mx-auto mb-40">
                <img src="images/retry-preview.svg" alt="logo" width="232" class="mx-auto mb-40">
                <p class="mb-24 fz-22 fw-semibold">It looks like it was not possible to conduct the visit this time. Don't be disappointed and try again.</p>
                <hr class="mb-24">
                <p class="mb-22">It is clear that something new works better, but if there is no news, show that you have prepared information specifically for the doctor on his previous request: "You talked, asked, requested and I found information for you".</p>
                <p>If you feel confident, use unconventional solutions, for example, bring him a coffee and offer a short pause or intrigue him with the question "do you know how to reduce the frequency of symptoms by 5 times?"</p>
                <button class="btn-ava mx-auto mt-40 popup-close" data-fn="retryHandler" onclick="window.location.reload();"><span>Retry</span><span class="btn-ava__icon"></span></button>
            </div>
        </div>



        <div id="content" :style="debugMode >= 4 ? 'display: block':'display: none'">

            <br />
            <div id="input-container" style="display: block">
                <input
                    type="text"
                    id="user-input-field"
                    placeholder="GPT TEST MSG FIELD"
                />
                <hr />

            </div>
            <!-- added div#buttons -->
            <div id="buttons">
                <button id="connect-button" type="button">Connect</button>
                <button id="talk-button" type="button">Send</button>
                <button id="destroy-button" type="button">Disconnect</button>
            </div>

            <!-- added div#status -->
            <div id="status">
                <!-- removed the wrapping <div> tags -->
                ICE gathering status: <label id="ice-gathering-status-label"></label
            ><br />
                ICE status: <label id="ice-status-label"></label><br />
                Peer connection status: <label id="peer-status-label"></label><br />
                Signaling status: <label id="signaling-status-label"></label><br />
                Streaming status: <label id="streaming-status-label"></label><br />
            </div>
        </div>

    </div>







<!--    <AppLayout title="Dashboard">-->
<!--        <template #header>-->
<!--            <h2 class="font-semibold text-xl text-gray-800 leading-tight">-->
<!--                Dashboard-->
<!--            </h2>-->
<!--        </template>-->

<!--        <div class="py-12">-->
<!--            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">-->
<!--                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">-->
<!--                    <Welcome />-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </AppLayout>-->
</template>

<script setup>

import { ref, onMounted, watch, reactive} from 'vue'


// TODO Move all secrets to configs, move SYSTEM_PROMPT to CMS
const DID_API = {
    "key": "cmFuZDEyQGRlcG9pc2RvdG9xdWUuY29t:mmuZFV7ikPY4TwpU1MoA-",
    "url": "https://api.d-id.com"
};

const CONFIG = {
    "OPENAI_API_KEY": "",
    "DEEPGRAM_API_KEY": "",
    "SYSTEM_PROMPT": "System Message: You are a very busy doctor due to too many patients. Following are simple instructions how to act according to the user's messages. Answer with proper words, you may choose arbitrary one from instruction\\n\\n\\nUSER:\\nSingle greeting only (Good afternoon, hello, etc.) OR\\nGood afternoon, may I come in? / Hello, do you have a few minutes? / May I come in?\\n\\nDoctor (AI):\\nEmotion; serious;\\nHello, are you a patient? / What's your emergency? / Do you have an appointment? / What time do you have an appointment with me?\\n\\nUSER: \\nI represent a company... / I am a medical representative... / I work with a medical product… /\\n\\nDoctor (AI):\\nEmotion; serious;\\nOh, it's those medical representatives again! I've already had three today / Close the door, please. I'm very busy today / Don't interfere with my work, please / I'm not ready to waste time on you / I have no time at all today \\n\\nUSER:\\nSay something unexpectedly creative: I am better than a patient / How about a short and useful break? / I'm here for 2 minutes with your favorite coffee and useful news / I want to invite you to a Roundtable / workshop / conference / webinar. I'll give you the details in a moment.\\n\\nDoctor (AI):\\nEmotion; surprise;\\nSorry, I can't remember you, would you please introduce yourself? / What would you like to tell me? Is it something important? / I don't have much time, I have a lot of patients today. \\n\\nUSER: \\nIt won't be long / Our conversation will only take a few minutes / I'll quickly tell you the most interesting things / I realize you're very busy, but it's just for a few minutes / Please / I've been coming to see you for so long / I really need to tell you something...\\n\\nDoctor (AI):\\nEmotion; serious;\\nMedical representatives never keep their promises, you'll talk for half an hour and the work will stop / I've already had 5 medical representatives today. Please come back later / Don't you understand? I'm busy / I repeat - I don't have time!\\n\\nUSER:\\nWe made an appointment with you on this day and time / Would it be convenient if I arrived at the end of your shift? / What time is available for a chat today? / Maybe if I wait a little while, the patient flow will be a little less intensive and we can talk?\\n\\nDoctor (AI):\\nEmotion; surprise;\\nWe may have agreed, but it's a very busy day. Come back later. \\n\\nUSER:\\nI would like to tell you briefly about a new medicine / I have news about our medicine / I will just remind you about our medicines / I will tell you only the most interesting things about the medicine / Just listen to me / I will tell you the main things briefly / I have new information about a medicine that you probably use in your practice / that we talked about last time / We have a new product and I am here to tell you about it.\\n\\nDoctor (AI):\\nEmotion; surprise;\\nMedical representatives never keep their promises, you'll talk for half an hour and the work will stop/ All your colleagues from other companies say the same/ You always/all say the same things / I don't have time.\\n\\nUSER: \\nI know you have a lot of patients with...(disease). Give me a chance to tell you how you can help them faster/more effectively/more reliably / There is new data on the therapy of...(disease), you may find it useful / There is a new study out involving the patients we talked about last time / There are new (Clinical) Guidelines/Standards that may be useful / Do you know about the latest news in the treatment of patients with...(disease)? / Were you at the last seminar/webinar/conference/roundtable? Topics raised at the event included .... Would you like to hear highlights from the presentations?\\n\\nDoctor (AI);\\nEmotion; neutral;\\nAll right, talk fast. I'll give you two minutes.\\n\\nUSER: \\nDo you have a new reprint/Clinical Guidelines/article? / I have prepared a brief extract for you.../ You asked about ...., I found it for you, let me tell you about it.\\n\\nDoctor (AI):\\nEmotion; surprise;\\nYes, leave the materials, I will read everything in my free time / Send me the articles to my mail, I will read them later / I will read all the materials myself\\n\\nUSER:\\nYeah, okay. Here are the reprints. We'll talk next time.\\n\\nDoctor (AI):\\nEmotion; serious;\\n....\\n\\nUSER:\\nNot to spend a lot of your time on reading, I'm ready to present you an excerpt. And now let me tell you the most important thing? / I’m ready to provide you with the reprints of articles so you don't have to search. Now let me take a minute to tell you what is the most important.\\n\\nDoctor (AI):\\nEmotion; neutral;\\nOkay, what do you want to talk about?\\n\\nUSER: \\nStarts presentation as a monologue, does not ask questions – the visit is ineffective.\\n\\nDoctor (AI):\\nEmotion; serious;\\nSorry, it sounds bored... / Oh, I'm sorry to tell you this but I have to go to patients. Thanks for your time.\\n\\nUSER:\\nAsking any question or using a prompt to draw attention to the information \\n=== for example ===\\nDo you currently have patients with the disease... / Do you face a situation when / Are there cases when / Do you know... ?\\nOr\\nLook at this here.../ Look (shows slide)/ Pay attention to this figure/ paragraph/ graph/\\n\\nDoctor (AI):\\nEmotion; neutral;\\n....\\n\\n\\nExample conversations\\n\\nUSER: \\nGood afternoon! Do you have a moment?\\nDoctor(AI):\\nEmotion; serious; Hello, are you a patient?\\nUSER:\\nNo, I'm not a patient, I represent a pharmaceutical company Takeda. I want to tell you about a new medicine.\\nDoctor(AI):\\nEmotion; serious; Oh, it's those medical representatives again! I've already had three today, I'm busy.\\nUSER:\\nI'll be quick, our conversation will only take 2 minutes.\\nDoctor(AI):\\nEmotion; serious; I'll say it again - I don't have time.\\n//Hint after three refusals\\nUSER: \\nThere are new clinical guidelines for the treatment of patients with ... (disease). You definitely need to know this information. I'm going to give you the basics now.\\nDoctor(AI):\\nEmotion; neutral; All right, talk fast. \\n\\nUSER: \\nGood afternoon, we have previously scheduled a visit with you at this time. I am a medical representative from Bayer, we spoke on the phone last week. \\nDoctor(AI):\\nEmotion; surprise; Oh, I don't have any time right now, have you seen the line of patients I have today?\\nUSER: \\nI've prepared for you a brief summary of the highlights from the Liver Disease Conference. You'll be interested to know this because you mentioned that you have these patients. \\nDoctor(AI):\\nEmotion; neutral; OK, I'll give you two minutes, but keep it very short, I don't have much time!\\n\\nUSER: \\nGood afternoon! May I come in? \\nDoctor(AI):\\nEmotion; serious; Hello, are you a patient? What is it? \\nUSER: \\nLast time you asked about the specifics of treating patients with ...(any disease), I have found some very interesting materials for you that will be useful in your practice. Let me quickly tell you a brief extract?\\nDoctor(AI):\\nEmotion; neutral; Okay, come in and tell me, but quickly!\\n\\nUSER: \\nGood afternoon! I represent Servier, I would like to tell you about a new medicine for ...(any disease). \\nDoctor(AI):\\nEmotion; serious; Have you seen the line of patients I have today? Close the door, please. I'm very busy today.\\nUSER: \\nI understand that you are very busy, but our conversation will only take a couple of minutes.\\nDoctor(AI):\\nEmotion; serious; Representatives never keep their promises, you will talk for half an hour and the work will stop.\\nUSER: \\nI know you have a lot of patients with ...(any disease). Give me a chance to tell you how you can help them faster.\\nDoctor(AI):\\nEmotion; neutral; OK, just for the sake of the patients! Come in, what do you have to say there?\\n\\nUSER: \\nHello, doctor … ! I would like to tell you about the therapy of ...(any disease).\\nDoctor(AI):\\nEmotion; serious; You are the fifth person today who wants to tell me something! When do I have to work?\\nUSER: \\nI won't take much time.\\nDoctor(AI):\\nEmotion; serious; Didn't you hear me? I'll say it again, I don't have time!\\nUSER: \\nPlease, it's very important.\\nDoctor(AI):\\nEmotion; serious; Close the door, on the other side!\\n//Hint after three refusals\\nUSER: \\nIt will be very useful for you to learn new data from the clinical guidelines for the treatment of ...(any disease), I have prepared a brief extract for you. \\nDoctor(AI):\\nEmotion; neutral; OK, let's just make it quick.\\n\\nUSER: \\nHello! May I come in?\\nDoctor(AI):\\nEmotion; serious; Sorry, would you please introduce yourself, are you a patient? Why do you want to come in? \\nUSER: \\nI'm better than a patient! I've brought your favorite coffee and I suggest we take a short but useful pause during which I'll give you the latest news on ... (any disease) from the conference. \\nDoctor(AI):\\nEmotion; surprise; Hmm, what news do you want to tell me?\\nUSER: At the last conference, Prof. ...(Name) gave a detailed presentation on ... (any disease). I have prepared a brief overview of the main points for you.\\nDoctor(AI):\\nEmotion; neutral; OK, come in, but very quickly, I don't have much time!\\n\\nUSER: \\nGood afternoon, I have finally come to see my favorite doctor to tell him the most important news!\\nDoctor(AI):\\nEmotion; surprise; Sorry, I can't remember you, would you please introduce yourself? (surprised)\\nUSER: \\nI represent Acino, we made an appointment with you last week, so I came.\\nDoctor(AI):\\nEmotion; serious; Again medical representatives, you are not my first today. I'm very busy. \\nUSER: \\nLast time you said you would be interested in reading a reprint of an article by ...(any article title). I have brought you the printouts.\\nDoctor(AI):\\nEmotion; surprise; Leave me the materials, I'll read them myself when I'm free.\\nUSER: \\nNot to spend a lot of your time on reading, I'm ready to present you an excerpt. And now let me tell you the most important thing?\\nDoctor(AI):\\nEmotion; neutral; Okay, what do you have here, let’s just do it quickly.\\n\\nUSER: \\nHello! My name is ... (any name). I am from the Bionorica. I work with ...( any name of the product). I would like to tell you about its features. \\nDoctor(AI):\\nEmotion; serious; I am very busy today, I have a full day of patient appointments.\\nUSER: \\nPerhaps if I arrive at the end of your shift, we could talk? \\nDoctor(AI):\\nEmotion; surprise; Unfortunately, I won't have time anyway.\\nUSER: \\nThere are new standards for treating patients with ....(any disease). It would be very helpful for you to know, since you said you have a lot of these patients. Do you have a couple minutes? \\nDoctor(AI):\\nEmotion; neutral; OK, let's make this quick.\\n\\n\\n\\n\\n\\n\\nCurrent Conversation\\n\\nUSER: Hi\\n"
};

import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";


let OPENAI_API_KEY = CONFIG.OPENAI_API_KEY;
let DEEPGRAM_API_KEY = CONFIG.DEEPGRAM_API_KEY;
const system_prompt = CONFIG.SYSTEM_PROMPT;


async function processTalk(msg) {
    if (
        peerConnection?.signalingState === "stable" ||
        peerConnection?.iceConnectionState === "connected"
    ) {
        //
        // Get the user input from the text input field get ChatGPT Response
        const responseFromOpenAI = await fetchOpenAIResponse(msg);
        addChatMessage({ role: "assistant", content: responseFromOpenAI})
        const responseFromOpenAI_message = responseFromOpenAI.split('\n')[1];


        //
        // if(responseFromOpenAI != 'Hello, are you a patient?'){
        //     console.log(responseFromOpenAI);
        //     var parts = responseFromOpenAI.split('\n');
        //     const responseFromOpenAI_emotion = parts[0].split(';')[1]?.trim();
        //     const responseFromOpenAI_message = parts[1];
        //     addEmotion(responseFromOpenAI_emotion);
        //     addChatMessage({ role: "assistant", content: responseFromOpenAI_message})
        // }
        // else{
        //     addChatMessage({ role: "assistant", content: responseFromOpenAI})
        // }



        //
        // Print the openAIResponse to the console
        console.log("Chatting history:", chatMessages);



        if(debugMode.value<4){
            console.log('DID start');
            const talkResponse = await fetch(
                `${DID_API.url}/talks/streams/${streamId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${DID_API.key}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        script: {
                            type: 'text',
                            subtitles: 'false',
                            provider: {
                                type: 'elevenlabs',
                                voice_id: 'oWAxZDx7w5VEj9dCyTzz'
                            },
                            ssml: 'false',
                            input: formatMessage(responseFromOpenAI), //send the openAIResponse to D-id
                        },
                        config: {
                            fluent: true,
                            pad_audio: 1,
                            driver_expressions: {
                                expressions: [
                                    { expression: 'happy', start_frame: 0, intensity: 1 }],
                                // transition_frames: 10
                            },
                            stitch: true,
                            sharpen: false,

                        },
                        session_id: sessionId,
                    }),
                }

            );

        }

    }
}



const userMessage = ref('');

// Remove emotion if needed
function formatMessage(message) {
    return  message.split('\n')[1] || message;
}

function sendMessage(e){
    e.preventDefault();
    processTalk(userMessage.value)
    clearUserMessage();
}

function clearUserMessage(){
    userMessage.value = '';
}


let talkVideo;

async function fetchOpenAIResponse(userMessage) {
    addChatMessage({ role: "user", content: userMessage, emotion: null });
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4-1106-preview",
            messages: chatMessages,
            temperature: 0.7,
            // max_tokens: 100,
        }),
    });

    if (!response.ok) {
        throw new Error(`OpenAI API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.choices[0].message.content.trim();
}

const RTCPeerConnection = (
    window.RTCPeerConnection ||
    window.webkitRTCPeerConnection ||
    window.mozRTCPeerConnection
).bind(window);

let peerConnection;
let streamId;
let sessionId;
let sessionClientAnswer;

let statsIntervalId;
let videoIsPlaying;
let lastBytesReceived;

let isRecording = false;
let mediaRecorder;

let audioContext;
let processor;
let source;
let dg_client;
let dg_client_live;

const createNewDeepgram = () => {
    return createClient(DEEPGRAM_API_KEY);
};

const createNewDeepgramLive = (dg) => {
    return dg.listen.live({
        language: "en-US",
        smart_format: true,
        model: "nova",
        interim_results: true,
        endpointing: 100,
        no_delay: true,
        utterance_end_ms: 1000,
    });
};

function setVideoElement(stream) {
    if (!stream) return;
    talkVideo.srcObject = stream;
    talkVideo.loop = false;

    // safari hotfix
    if (talkVideo.paused) {
        talkVideo
            .play()
            .then((_) => {})
            .catch((e) => {});
    }
}

function playIdleVideo() {
    talkVideo.srcObject = undefined;
    talkVideo.src = "/video/idle.mp4";
    talkVideo.loop = true;
}

function stopRecording() {
    if (isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        socket.close();
    }
    if (dg_client_live) dg_client_live.removeAllListeners();
}

function stopAllStreams() {
    if (talkVideo.srcObject) {
        console.log("stopping video streams");
        talkVideo.srcObject.getTracks().forEach((track) => track.stop());
        talkVideo.srcObject = null;
    }
}

function closePC(pc = peerConnection) {
    if (!pc) return;
    console.log("stopping peer connection");
    pc.close();
    pc.removeEventListener(
        "icegatheringstatechange",
        onIceGatheringStateChange,
        true
    );
    pc.removeEventListener("icecandidate", onIceCandidate, true);
    pc.removeEventListener(
        "iceconnectionstatechange",
        onIceConnectionStateChange,
        true
    );
    pc.removeEventListener(
        "connectionstatechange",
        onConnectionStateChange,
        true
    );
    pc.removeEventListener("signalingstatechange", onSignalingStateChange, true);
    pc.removeEventListener("track", onTrack, true);
    clearInterval(statsIntervalId);
    iceGatheringStatusLabel.innerText = "";
    signalingStatusLabel.innerText = "";
    iceStatusLabel.innerText = "";
    peerStatusLabel.innerText = "";
    console.log("stopped peer connection");
    if (pc === peerConnection) {
        peerConnection = null;
    }
}

const initDeepgram = (dg) => {
    dg_client_live = createNewDeepgramLive(dg);
    addDeepgramTranscriptListener(dg_client_live);
    addDeepgramOpenListener(dg_client_live);
    addDeepgramCloseListener(dg_client_live);
    // addDeepgramErrorListener(dg_client_live);
};

let makeConnection;
dg_client = createNewDeepgram();





const attempts = ref(0);
const debugMode = ref(0);
const maxAttempts = 3;
const seriousEmotion = ref(0);

function increment() {
    attempts.value++
}


const chatMessages = reactive([ {role: 'system', content: system_prompt}]);
const emotion = ref('');
function addEmotion(aiEmotion) {
    emotion.value = aiEmotion;
}

function incrementdebugMode() {
    debugMode.value++
}

function nextAttempt(){

    //TODO remove hardcode
    document.querySelector('.btn-retry-attempt').click();
    // document.get
    //
    // increment();
    // seriousEmotion.value = 0;
    //
    // chatMessages.splice(0,chatMessages.length);
    // chatMessages.push([{role: 'system', content: system_prompt}]);

    //popupWindowsInstance.show('.popup-block--2');
}


function attemptsEmotionCheck(message){

    let emotion = (message.match(/Emotion;\s*([^\s;]+)/) || [])[1];
    console.log(emotion);
    if(emotion === 'serious'){
        seriousEmotion.value ++;
    }
    if(seriousEmotion.value > 4){
        nextAttempt();
    }


}



function addChatMessage (newMessage){
   // if(newMessage.role !== 'system'){
        const newItem = { role: newMessage.role, content: newMessage.content}
        chatMessages.push(newItem);
        if(newMessage.role === 'assistant'){
            attemptsEmotionCheck(newItem.content);
        }
    //}
}


const mobileBreakpoint = 1000;

function isMobileSize() {
    return document.body.offsetWidth < mobileBreakpoint;
}

function isDesktopSize() {
    return !isMobileSize();
}

const popupHanderls = {
    retryHandler: function () {
        console.log('retryHandler');
    },
};



watch(attempts, (currentAttempt) => {
    if (currentAttempt === maxAttempts) {
        alert('Retry');
    }
})


// lifecycle hooks
onMounted(() => {


    increment();



    //
    // //addChatMessage({ role: "system", content: system_prompt });
    //  addChatMessage({ role: "user", content: "tezdddddssddt" });
    // //
    //  addChatMessage({ role: "assistant", content: "assistant" });



    class PopupWindows {

        constructor() {
            const ctx = this;

            this.page = document.body;
            this.wrapper = document.querySelector('.popup-wrapper');
            this.popups = document.querySelectorAll('.popup-block');

            document.querySelectorAll('.popup-btn').forEach(popupBtn => {
                popupBtn.addEventListener('click', () => {
                    const popupSelector = popupBtn.getAttribute('data-selector');
                    this.show(popupSelector);
                })
            });

            document.querySelectorAll('.popup-close').forEach(popupClose => {
                popupClose.addEventListener('click', ()=> {
                    this.hide();
                    const handlerName = popupClose.getAttribute('data-fn');
                    if ( handlerName && popupHanderls[handlerName] ) {
                        popupHanderls[handlerName]();
                    }
                });
            });

        }

        show(popupSelector) {
            const popupBlock = document.querySelector(popupSelector);
            if ( !popupBlock ) {
                return false;
            }
            this.hide();
            this.page.classList.add('scroll-lock');
            this.wrapper.classList.add('is-on');
            popupBlock.classList.add('is-on');
        }

        hide() {
            this.page.classList.remove('scroll-lock');
            this.popups.forEach(popup => popup.classList.remove('is-on'));
            this.wrapper.classList.remove('is-on');
        }

    }

    class VolumeControl {

        constructor() {
            const ctx = this;

            this.videoItem = document.querySelector('#talk-video');
            this.mobileBtn = document.querySelector('.avatar-controls__mobile-btn');
            this.controlContent = document.querySelector('.avatar-controls__content');
            this.volumeMinBtn = document.querySelector('.avatar-controls__min');
            this.volumeMaxBtn = document.querySelector('.avatar-controls__max');
            this.volumeMuteBtn = document.querySelector('.avatar-controls__content-mute');
            this.sliderFill = document.querySelector('.avatar-controls__slider-fill');
            this.sliderBullet = document.querySelector('.avatar-controls__slider-bullet');
            this.rangeControl = document.querySelector('#volume-range');

            this.prevVolume = 10;

            this.volumeMuteBtn.addEventListener('click', () => {
                if ( this.volumeMuteBtn.classList.contains('is-on') ) {
                    this.setVolume(this.prevVolume);
                } else {
                    this.setVolume(0);
                }
            });

            this.volumeMinBtn.addEventListener('click', () => {
                this.setVolume( (this.videoItem.volume * 100) - 5);
            });
            this.volumeMaxBtn.addEventListener('click', () => {
                this.setVolume( (this.videoItem.volume * 100) + 5);
            });

            this.mobileBtn.addEventListener('click', () => {
                this.mobileBtn.classList.toggle('is-on');
                this.controlContent.classList.toggle('is-on');
            });

            this.videoItem.onvolumechange = () => {
                let newVolume;
                if ( this.videoItem.muted ) {
                    newVolume = 0;
                } else {
                    newVolume = this.videoItem.volume * 100;
                }
                this.updateControls( newVolume );
            };

            this.rangeControl.oninput = function() {
                ctx.setVolume(this.value);
            }

            this.updateControls(this.videoItem.volume * 100);

            window.addEventListener('resize', () => this.updateControls(this.videoItem.volume * 100));
            window.addEventListener('orientationchange', () => this.updateControls(this.videoItem.volume * 100));

        }

        setVolume(volumeVal) {
            if ( volumeVal >= 100 ) volumeVal = 100;
            if ( volumeVal <= 0 ) volumeVal = 0;

            this.prevVolume = this.videoItem.volume * 100;
            this.videoItem.volume = volumeVal/100;
            this.updateControls(volumeVal);
        }

        updateControls(volumeVal) {

            if ( this.rangeControl.value !== volumeVal ) {
                this.rangeControl.value = volumeVal;
            }

            if ( volumeVal === 0 ) {
                this.volumeMuteBtn.classList.add('is-on');
            } else {
                this.volumeMuteBtn.classList.remove('is-on');
            }

            if ( isDesktopSize() ) {
                //reset mobile val
                this.sliderFill.style.height = ``;
                this.sliderBullet.style.bottom = ``;

                //set desktop val
                this.sliderFill.style.width = `${volumeVal}%`;
                this.sliderBullet.style.left = `${volumeVal}%`;
            } else {
                //reset desktop val
                this.sliderFill.style.width = ``;
                this.sliderBullet.style.left = ``;

                //set mobile val
                this.sliderFill.style.height = `${volumeVal}%`;
                this.sliderBullet.style.bottom = `${volumeVal}%`;
            }
        }

    }



    const chatMessagesBlocks = document.querySelector('.chat-block__messages');

    if ( chatMessagesBlocks ) {
        console.log('attach bar');
        let simpleBarInstance = new SimpleBar(chatMessagesBlocks, {
            autoHide: false,
            // scrollbarMaxSize: 30,
            scrollbarTouchEvents: true,
        });
        chatMessagesBlocks['$$simplebar'] = simpleBarInstance;
    }




    const popupWindowsInstance = new PopupWindows();
    const volumeControlInstance = new VolumeControl();

    popupWindowsInstance.show('.popup-block--1');



    document.querySelector('.btn-retry-attempt').addEventListener('click', function () {
        popupWindowsInstance.show('.popup-block--2');
    });




    talkVideo = document.getElementById("talk-video");
    let idleVideo = document.getElementById('idle-video');

    const peerStatusLabel = document.getElementById("peer-status-label");
    const iceStatusLabel = document.getElementById("ice-status-label");
    const iceGatheringStatusLabel = document.getElementById(
        "ice-gathering-status-label"
    );
    const signalingStatusLabel = document.getElementById("signaling-status-label");
    const streamingStatusLabel = document.getElementById("streaming-status-label");

    const connectButton = document.getElementById("connect-button");

    const initDeepgram = (dg) => {
        dg_client_live = createNewDeepgramLive(dg);
        addDeepgramTranscriptListener(dg_client_live);
        addDeepgramOpenListener(dg_client_live);
        addDeepgramCloseListener(dg_client_live);
        // addDeepgramErrorListener(dg_client_live);
    };

    function playVideo() {
        // talkVideo.srcObject = undefined;
        // talkVideo.src = "neutral_sharpen_false.mp4";
        // talkVideo.loop = true;
        console.log('play idle video')
        talkVideo.style.transition = 'opacity 0.1s ease-in-out';
        talkVideo.style.opacity = 1;
    }
    function hideVideo() {
        console.log('hide  video')
        // talkVideo.srcObject = undefined;
        // talkVideo.src = "neutral_sharpen_false.mp4";
        // talkVideo.loop = true;
        talkVideo.style.transition = 'opacity 0.4s ease-in-out';
        talkVideo.style.opacity = 0;
        idleVideo.currentTime = 0;
    }
    function playIdleVideo() {
        // talkVideo.srcObject = undefined;
        // talkVideo.src = "neutral_sharpen_false.mp4";
        // talkVideo.loop = true;
        console.log('play idle video')
        idleVideo.style.transition = 'opacity 0.1s ease-in-out';
        // idleVideo.currentTime= 0;
        idleVideo.style.opacity = 1;
    }
    function hideIdleVideo() {
        // talkVideo.srcObject = undefined;
        // talkVideo.src = "neutral_sharpen_false.mp4";
        // talkVideo.loop = true;
        console.log('hide idle video')
        idleVideo.style.transition = 'opacity 0.6s ease-in-out';
        // idleVideo.style.zIndex = talkVideo.style.zIndex
        idleVideo.style.opacity = 0;
    }



    makeConnection = async () => {
        if (
            peerConnection &&
            peerConnection.connectionState === "connected" &&
            isRecording
        ) {
            return;
        }

        stopRecording();
        stopAllStreams();
        closePC();

        document.getElementById('user-input').focus();
        initDeepgram(dg_client);

        const sessionResponse = await fetch(`${DID_API.url}/talks/streams`, {
            method: "POST",
            headers: {
                Authorization: `Basic ${DID_API.key}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // source_url: window.location.protocol + '//' + window.location.host + "/video/idle_poster.jpg",
                source_url: "https://iili.io/Jc4b0Wg.md.jpg",

            }),
        });

        const {
            id: newStreamId,
            offer,
            ice_servers: iceServers,
            session_id: newSessionId,
        } = await sessionResponse.json();
        streamId = newStreamId;
        sessionId = newSessionId;

        try {
            sessionClientAnswer = await createPeerConnection(offer, iceServers);
        } catch (e) {
            console.log("error during streaming setup", e);
            stopRecording();
            stopAllStreams();
            closePC();
            return;
        }

        const sdpResponse = await fetch(
            `${DID_API.url}/talks/streams/${streamId}/sdp`,
            {
                method: "POST",
                headers: {
                    Authorization: `Basic ${DID_API.key}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    answer: sessionClientAnswer,
                    session_id: sessionId,
                }),
            }
        );

        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(async (stream) => {
                if (!MediaRecorder.isTypeSupported("audio/webm")) {
                    // return alert(
                    //     "iOS / Safari Browser not supported. Please use Chrome or Firefox on Desktop or use Android."
                    // );
                }
                mediaRecorder = new MediaRecorder(stream, {
                    mimeType: "audio/webm",
                });

                mediaRecorder.start(250);

                mediaRecorder.addEventListener("dataavailable", async (event) => {
                    if (event.data.size > 0) dgPacketResponse(event.data, dg_client_live);
                });
            })
            .catch((err) => {
                console.log("error on media recorder: ", err);
                // alert("Can't find Media device or Permission denied!");
                stopRecording();
            });



   
    };

    connectButton.onclick = makeConnection;


    const talkButton = document.getElementById("talk-button");
    talkButton.onclick = async () => {
        const userInput = document.getElementById("user-input-field").value;
        processTalk(userInput);
    };


    const destroyButton = document.getElementById("destroy-button");
    destroyButton.onclick = async () => {
        await fetch(`${DID_API.url}/talks/streams/${streamId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Basic ${DID_API.key}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ session_id: sessionId }),
        });

        stopRecording();
        stopAllStreams();
        closePC();
    };

    function onIceGatheringStateChange() {
        iceGatheringStatusLabel.innerText = peerConnection.iceGatheringState;
        iceGatheringStatusLabel.className =
            "iceGatheringState-" + peerConnection.iceGatheringState;
    }
    function onIceCandidate(event) {
        console.log("onIceCandidate", event);
        if (event.candidate) {
            const { candidate, sdpMid, sdpMLineIndex } = event.candidate;

            fetch(`${DID_API.url}/talks/streams/${streamId}/ice`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${DID_API.key}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    candidate,
                    sdpMid,
                    sdpMLineIndex,
                    session_id: sessionId,
                }),
            });
        }
    }
    function onIceConnectionStateChange() {
        iceStatusLabel.innerText = peerConnection.iceConnectionState;
        iceStatusLabel.className =
            "iceConnectionState-" + peerConnection.iceConnectionState;
        if (
            peerConnection.iceConnectionState === "failed" ||
            peerConnection.iceConnectionState === "closed"
        ) {
            stopAllStreams();
            closePC();
        }
    }
    function onConnectionStateChange() {
        // not supported in firefox
        peerStatusLabel.innerText = peerConnection.connectionState;
        peerStatusLabel.className =
            "peerConnectionState-" + peerConnection.connectionState;
    }
    function onSignalingStateChange() {
        signalingStatusLabel.innerText = peerConnection.signalingState;
        signalingStatusLabel.className =
            "signalingState-" + peerConnection.signalingState;
    }

    function onVideoStatusChange(videoIsPlaying, stream) {
        let status;
        if (videoIsPlaying) {

            status = "streaming";
            const remoteStream = stream;
            setVideoElement(remoteStream);
            playVideo();
            hideIdleVideo();

            //
            // status = "streaming";
            // const remoteStream = stream;
            // setVideoElement(remoteStream);
        } else {
            status = "empty";
            hideVideo();
            playIdleVideo();

        }
        streamingStatusLabel.innerText = status;
        streamingStatusLabel.className = "streamingState-" + status;
    }

    function onTrack(event) {
        /**
         * The following code is designed to provide information about wether currently there is data
         * that's being streamed - It does so by periodically looking for changes in total stream data size
         *
         * This information in our case is used in order to show idle video while no talk is streaming.
         * To create this idle video use the POST https://api.d-id.com/talks endpoint with a silent audio file or a text script with only ssml breaks
         * https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html#break-tag
         * for seamless results use `config.fluent: true` and provide the same configuration as the streaming video
         */

        if (!event.track) return;

        statsIntervalId = setInterval(async () => {
            const stats = await peerConnection.getStats(event.track);
            stats.forEach((report) => {
                if (report.type === "inbound-rtp" && report.mediaType === "video") {
                    const videoStatusChanged =
                        videoIsPlaying !== report.bytesReceived > lastBytesReceived;

                    if (videoStatusChanged) {
                        videoIsPlaying = report.bytesReceived > lastBytesReceived;
                        onVideoStatusChange(videoIsPlaying, event.streams[0]);
                    }
                    lastBytesReceived = report.bytesReceived;
                }
            });
        }, 500);
    }

    async function createPeerConnection(offer, iceServers) {
        if (!peerConnection) {
            peerConnection = new RTCPeerConnection({ iceServers });
            peerConnection.addEventListener(
                "icegatheringstatechange",
                onIceGatheringStateChange,
                true
            );
            peerConnection.addEventListener("icecandidate", onIceCandidate, true);
            peerConnection.addEventListener(
                "iceconnectionstatechange",
                onIceConnectionStateChange,
                true
            );
            peerConnection.addEventListener(
                "connectionstatechange",
                onConnectionStateChange,
                true
            );
            peerConnection.addEventListener(
                "signalingstatechange",
                onSignalingStateChange,
                true
            );
            peerConnection.addEventListener("track", onTrack, true);
        }

        await peerConnection.setRemoteDescription(offer);
        console.log("set remote sdp OK");

        const sessionClientAnswer = await peerConnection.createAnswer();
        console.log("create local sdp OK");

        await peerConnection.setLocalDescription(sessionClientAnswer);
        console.log("set local sdp OK");

        return sessionClientAnswer;
    }



    const maxRetryCount = 3;
    const maxDelaySec = 4;
// Default of 1 moved to 5
    async function fetchWithRetries(url, options, retries = 3) {
        try {
            return await fetch(url, options);
        } catch (err) {
            if (retries <= maxRetryCount) {
                const delay =
                    Math.min(Math.pow(2, retries) / 4 + Math.random(), maxDelaySec) * 1000;

                await new Promise((resolve) => setTimeout(resolve, delay));

                console.log(
                    `Request failed, retrying ${retries}/${maxRetryCount}. Error ${err}`
                );
                return fetchWithRetries(url, options, retries + 1);
            } else {
                throw new Error(`Max retries exceeded. error: ${err}`);
            }
        }
    }

    let speechChunk = "";
    const addDeepgramTranscriptListener = (dg) => {
        dg.on(LiveTranscriptionEvents.Transcript, async (dgOutput) => {
            let dgJSON = dgOutput;
            let words = [];
            if (dgJSON.channel) {
                let utterance;
                try {
                    utterance = dgJSON.channel.alternatives[0].transcript;
                    words = words.concat(dgJSON.channel.alternatives[0].words);
                } catch (error) {
                    console.log(
                        "WARNING: parsing dgJSON failed. Response from dgLive is:",
                        error
                    );
                    console.log(dgJSON);
                }
                if (utterance) {
                    if (!speechChunk) {
                        speechChunk = "";
                    }
                    if (dgJSON.speech_final) {
                        speechChunk += utterance + " ";
                        console.log(`DEBUG SPEECH_FINAL ${speechChunk}`);
                        processTalk(speechChunk);
                        speechChunk = "";
                        words = [];
                    } else if (dgJSON.is_final) {
                        speechChunk += utterance + " ";
                        console.log(`DEBUG IS_FINAL: ${speechChunk}`);
                    } else {
                        console.log(`DEBUG INTERIM_RESULT: `, utterance);
                    }
                }
            } else {
                if (speechChunk != "") {
                    console.log(`DEBUG UTTERANCE_END_MS Triggered: ${speechChunk}`);
                    speechChunk = "";
                } else {
                    console.log(`DEBUG UTTERANCE_END_MS Not Triggered: ${speechChunk}`);
                }
            }
        });
    };

    const addDeepgramOpenListener = (dg) => {
        dg.on(LiveTranscriptionEvents.Open, (msg) => {
            console.log(`Deepgram Live Websocket connection open!`);
            setInterval(() => {
                dg.keepAlive();
            }, 3000);
        });
    };

    const addDeepgramCloseListener = (dg) => {
        dg.on(LiveTranscriptionEvents.Close, async (msg) => {
            console.log(`Deepgram Live CONNNECTION CLOSED`);
            dg_client_live = null;
        });
    };

    const dgPacketResponse = (data, dg) => {
        if (dg && dg.getReadyState() === 1) {
            dg.send(data);
        }
    };







})



</script>


