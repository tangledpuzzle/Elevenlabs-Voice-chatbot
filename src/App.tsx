import { useRef, useEffect, useState } from 'react';
import * as faceApi from 'face-api.js';

const WebcamFaceDetection = () => {
  const [timer, setTimer] = useState<number | null>(null); // Cria o estado "timer" como null
  const videoRef = useRef<any>(null); // Cria a referência "videoRef" como null
  const canvasRef = useRef<any>(null); // Cria a referência "canvasRef" como null

  useEffect(() => {
    const loadModels = async () => {
      await faceApi.loadAgeGenderModel('/models'); // Carrega o modelo de idade e gênero
      await faceApi.loadSsdMobilenetv1Model('/models'); // Carrega o modelo de detecção de rosto
      await faceApi.loadFaceExpressionModel('/models'); // Carrega o modelo de expressões faciais
      await faceApi.loadTinyFaceDetectorModel('/models'); // Carrega o modelo de detecção de rosto "tiny face detector"
      await faceApi.loadFaceLandmarkModel('/models'); // Carrega o modelo de pontos de referência faciais
      await faceApi.loadFaceRecognitionModel('/models'); // Carrega o modelo de reconhecimento facial
    };
    loadModels(); // Chama a função "loadModels"
  }, []); // Executa o efeito colateral somente na montagem do componente

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true }) // Solicita acesso à câmera do dispositivo
      .then(stream => {
        videoRef.current.srcObject = stream; // Atribui o objeto de mídia retornado à referência "videoRef"
      })
      .catch(error => {
        console.error(error);
      });
  };

  const detectFaces = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.width, height: video.height }; // Define o tamanho da exibição do vídeo
    faceApi.matchDimensions(canvas, displaySize); // Ajusta as dimensões do canvas para o tamanho da exibição do vídeo

    setTimer(
      setInterval(async () => {
        // Define um temporizador que executa a função a cada 2 segundos
        const detections = await faceApi // Detecta todos os rostos na imagem do vídeo com o modelo "tiny face detector"
          .detectAllFaces(video, new faceApi.TinyFaceDetectorOptions())
          .withFaceLandmarks() // Adiciona os pontos de referência facial aos resultados
          .withAgeAndGender() // Adiciona a idade e o gênero aos resultados
          .withFaceExpressions(); // Adiciona as expressões faciais aos resultados

        // Redimensiona os resultados para o tamanho da exibição do vídeo
        const resizedDetections = faceApi.resizeResults(
          detections,
          displaySize
        );

        // Limpa o canvas existente e desenha os resultados na tela
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceApi.draw.drawDetections(canvas, resizedDetections);
        faceApi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceApi.draw.drawFaceExpressions(canvas, resizedDetections);

        // Desenha um retângulo com a idade e o gênero de cada rosto detectado
        resizedDetections.forEach(detection => {
          const box = detection.detection.box;
          const text = `${Math.floor(detection.age)} anos, ${detection.gender}`;
          const drawBox = new faceApi.draw.DrawTextField(text, {
            x: box.bottomLeft.x,
            y: canvas.height
          });
          drawBox.draw(canvas);
        });

        // Exibe os resultados formatado no console
        console.log(
          detections.map(detection => ({
            age: Math.floor(detection.age),
            gender: detection.gender,
            genderProbability: (detection.genderProbability * 100).toFixed(2),
            expressions: detection.expressions
          }))
        );
      }, 2000)
    );
  };

  const stopVideo = () => {
    const stream = videoRef.current.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop()); // Para o fluxo de vídeo
    videoRef.current.srcObject = null;
    clearInterval(timer as number); // Limpa o temporizador
    setTimer(null);
    const canvas = canvasRef.current;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
  };

  return (
    <div>
      <video
        autoPlay
        muted
        playsInline
        ref={videoRef}
        onPlay={() => detectFaces()} // Chama a função "detectFaces" quando o vídeo começa a ser reproduzido
        width="640"
        height="480"
      />
      <canvas ref={canvasRef} width="640" height="480" />
      {/* Chama a função "stopVideo" se o temporizador estiver ativo, caso contrário, chama a função "startVideo" */}
      <button onClick={() => (timer ? stopVideo() : startVideo())}>
        {timer ? 'Parar' : 'Iniciar'}
      </button>
    </div>
  );
};

export default WebcamFaceDetection;
