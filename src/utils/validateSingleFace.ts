
/**
 * Validação simplificada para desenvolvimento:
 * Sempre retorna true, permitindo qualquer imagem.
 */
export async function validateSingleFace(_file: File): Promise<boolean> {
  return true;
}
