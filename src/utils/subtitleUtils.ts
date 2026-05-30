export interface Subtitle {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  isActive: boolean;
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${milliseconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${milliseconds.toString().padStart(2, '0')}`;
}

export function formatTimeDisplay(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

export function generateSRT(subtitles: Subtitle[]): string {
  let srt = '';
  subtitles.forEach((subtitle, index) => {
    srt += `${index + 1}\n`;
    srt += `${formatTime(subtitle.startTime)} --> ${formatTime(subtitle.endTime)}\n`;
    srt += `${subtitle.text}\n\n`;
  });
  return srt.trim();
}

export function generateVTT(subtitles: Subtitle[]): string {
  let vtt = 'WEBVTT\n\n';
  subtitles.forEach((subtitle) => {
    vtt += `${formatTime(subtitle.startTime)} --> ${formatTime(subtitle.endTime)}\n`;
    vtt += `${subtitle.text}\n\n`;
  });
  return vtt.trim();
}

export function generateTXT(subtitles: Subtitle[]): string {
  return subtitles.map(subtitle => subtitle.text).join('\n');
}

export function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseSRT(srtContent: string): Subtitle[] {
  const lines = srtContent.split('\n');
  const subtitles: Subtitle[] = [];
  let i = 0;

  while (i < lines.length) {
    if (lines[i].trim() === '') {
      i++;
      continue;
    }

    const id = lines[i++].trim();
    const timeLine = lines[i++].trim();
    const [startStr, endStr] = timeLine.split('-->');
    
    const parseTimeStr = (timeStr: string): number => {
      const parts = timeStr.trim().split(',');
      const timeParts = parts[0].split(':');
      const hours = parseInt(timeParts[0]) || 0;
      const minutes = parseInt(timeParts[1]) || 0;
      const seconds = parseFloat(timeParts[2]) || 0;
      const milliseconds = parseInt(parts[1]) || 0;
      return (hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;
    };

    let text = '';
    while (i < lines.length && lines[i].trim() !== '') {
      text += lines[i++] + '\n';
    }

    subtitles.push({
      id: `subtitle-${id}`,
      startTime: parseTimeStr(startStr),
      endTime: parseTimeStr(endStr),
      text: text.trim(),
      isActive: false
    });
  }

  return subtitles;
}
