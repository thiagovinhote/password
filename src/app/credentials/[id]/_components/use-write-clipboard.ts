export default function useWriteClipboard() {
  return async function writeClipboard(value: string) {
    await window.navigator.clipboard.writeText(value);
  };
}
