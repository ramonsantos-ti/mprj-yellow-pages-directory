
/**
 * Substitui textos conhecidos para versões acentuadas, 
 * capitaliza a primeira letra de cada palavra, 
 * e mantém outros do jeito original se não reconhecido.
 */
const replacementMap: Record<string, string> = {
  acao: 'Ação',
  atualizacao: 'Atualização',
  funcao: 'Função',
  unidade: 'Unidade',
  // Adicione outros termos relevantes aqui se necessário...
  // Exemplo: 'biografia':'Biografia'
};

export function formatText(text: string): string {
  if (!text) return '';
  // Remove espaços extras e quebra linhas
  let t = String(text).trim().replace(/\s+/g, ' ');

  // Capitaliza primeira letra de cada palavra e faz substituição se conhecida
  t = t
    .split(' ')
    .map(word => {
      const lw = word.toLowerCase();
      if (replacementMap[lw]) return replacementMap[lw];
      // Capitaliza primeira letra
      return lw.length > 1
        ? word[0].toLocaleUpperCase() + word.slice(1)
        : word.toLocaleUpperCase();
    })
    .join(' ');

  return t;
}
