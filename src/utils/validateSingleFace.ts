
import { pipeline, env } from '@huggingface/transformers';

env.allowLocalModels = false;
env.useBrowserCache = false;

let segmenter: any = null;

// Carrega o pipeline de detecção de faces (lazy)
async function getFaceDetector() {
  if (!segmenter) {
    segmenter = await pipeline(
      'image-classification',
      'microsoft/face-detection',
      { device: 'webgpu' }
    );
  }
  return segmenter;
}

// Função principal para validar que só há um rosto na imagem
export async function validateSingleFace(file: File): Promise<boolean> {
  // Cria um objeto de imagem
  const imageUrl = URL.createObjectURL(file);
  try {
    const model = await getFaceDetector();
    // O pipeline pode aceitar url, mas para browsers funciona melhor base64
    const imageBase64 = await fileToBase64(file);
    // Executa a classificação
    const results = await model(imageBase64);
    // Busca as classificações do tipo "face"
    // Se o modelo específico retornar múltiplas detecções, contar somente as com label face/person/human
    const faceKeywords = ['face', 'person', 'human', 'people'];
    const detected = Array.isArray(results)
      ? results.filter((result: any) =>
          faceKeywords.some(keyword =>
            (result.label || '')
              .toLowerCase()
              .includes(keyword)
          ) && result.score > 0.1 // limiar básico
        )
      : [];
    // Valida exatamente UMA face
    return detected.length === 1;
  } catch (e) {
    console.error('Erro ao validar imagem de rosto:', e);
    return false;
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
