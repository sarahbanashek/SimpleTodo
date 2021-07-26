export function noXSS(todo: string): string {
  const toReplace: ReplacerStrings =  {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  }
  return todo.replace(/[&<>]/g, (sym) => toReplace[sym]);
}
interface ReplacerStrings {
  [key: string]: string
}