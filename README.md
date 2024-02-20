<img src="https://www.cnet.com/a/img/resize/d3ea8edc361a21e5cb3988df699f6c2ab118d014/hub/2019/03/15/d0e98f89-88ab-436f-8f6d-503a95eb57f0/facial-recognition-face-id-password-6.jpg?auto=webp&fit=crop&height=675&width=1200" />

<div class="markdown prose w-full break-words dark:prose-invert dark">
  <h1>Webcam Face Detection</h1>
  <p>
    Projeto desenvolvido em React utilizando a biblioteca
    <a href="https://github.com/justadudewhohacks/face-api.js/" target="_new"
      >face-api.js</a
    >
    para detectar rostos em tempo real através da webcam do dispositivo.
  </p>
  <h2>Funcionalidades</h2>
  <ul>
    <li>Detecta rostos na imagem da webcam</li>
    <li>Adiciona pontos de referência facial aos resultados</li>
    <li>Adiciona a idade e o gênero aos resultados</li>
    <li>Adiciona as expressões faciais aos resultados</li>
    <li>Desenha os resultados na tela em tempo real</li>
    <li>Exibe os resultados no console</li>
    <li>Inicia e para a captura de vídeo através do botão "Iniciar"/"Parar"</li>
  </ul>
  <h2>Como usar</h2>
  <ol>
    <li>Clone o repositório:</li>
  </ol>
  
  ```bash
  git clone https://github.com/tangledpuzzle/face-detection.git
  ```
  
  <ol start="2">
    <li>Instale as dependências:</li>
  </ol>
  
   ```bash
  npm install
  ```
 
  <ol start="3">
    <li>Inicie o servidor de desenvolvimento:</li>
  </ol>
  
  ```bash
  npm run dev
  ```
  
  <ol start="5">
    <li>
      <p>Abra o navegador em <code>http://localhost:3000</code></p>
    </li>
    <li>
      <p>
        Clique no botão "Iniciar" para iniciar a captura de vídeo e a detecção
        de rostos. Clique no botão "Parar" para encerrar a captura de vídeo.
      </p>
    </li>
  </ol>
</div>
