/**
 * compressVideo — сжатие видео на клиенте перед отправкой на backend.
 *
 * Идея: перерисовать видео на canvas меньшего разрешения и записать его
 * через MediaRecorder. Результат — файл в 5-10 раз меньше оригинала,
 * при этом формат и структура видео сохраняются.
 *
 * По умолчанию: 640px по ширине, ~800 kbps, что даёт ~6 МБ на 60 секунд.
 */

export interface CompressOptions {
  targetWidth?: number;      // ширина после сжатия (по умолчанию 640)
  videoBitrate?: number;     // битрейт видео (по умолчанию 800_000)
  fps?: number;              // частота кадров (по умолчанию 30)
  onProgress?: (pct: number) => void;
}

export async function compressVideo(
  file: File,
  options: CompressOptions = {},
): Promise<File> {
  const {
    targetWidth = 640,
    videoBitrate = 800_000,
    fps = 30,
    onProgress,
  } = options;

  return new Promise<File>((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.src = URL.createObjectURL(file);

    video.onloadedmetadata = async () => {
      try {
        const duration = video.duration;
        const aspect = video.videoWidth / video.videoHeight;
        // Чётные размеры для кодеков
        const width = targetWidth;
        const height = Math.round(targetWidth / aspect / 2) * 2;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas 2D context unavailable"));

        // Выбираем поддерживаемый MIME
        const mimes = [
          "video/mp4;codecs=avc1",
          "video/mp4",
          "video/webm;codecs=vp9",
          "video/webm;codecs=vp8",
          "video/webm",
        ];
        const mime = mimes.find((m) => MediaRecorder.isTypeSupported(m));
        if (!mime) return reject(new Error("No supported video codec"));

        const stream = canvas.captureStream(fps);
        const recorder = new MediaRecorder(stream, {
          mimeType: mime,
          videoBitsPerSecond: videoBitrate,
        });

        const chunks: BlobPart[] = [];
        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) chunks.push(e.data);
        };
        recorder.onerror = (e) => reject(e);

        recorder.onstop = () => {
          URL.revokeObjectURL(video.src);
          const ext = mime.includes("mp4") ? "mp4" : "webm";
          const baseName = file.name.replace(/\.[^.]+$/, "");
          const blob = new Blob(chunks, { type: mime.split(";")[0] });
          const outName = `${baseName}_compressed.${ext}`;
          resolve(new File([blob], outName, { type: blob.type }));
        };

        recorder.start(100);

        // Рисуем кадры
        const drawFrame = () => {
          if (video.paused || video.ended) return;
          ctx.drawImage(video, 0, 0, width, height);
          if (onProgress && duration > 0) {
            const pct = Math.min(99, Math.round((video.currentTime / duration) * 100));
            onProgress(pct);
          }
          requestAnimationFrame(drawFrame);
        };

        video.onended = () => {
          onProgress?.(100);
          // Небольшая задержка, чтобы последний кадр успел записаться
          setTimeout(() => recorder.stop(), 150);
        };

        video.currentTime = 0;
        await video.play();
        drawFrame();
      } catch (err) {
        URL.revokeObjectURL(video.src);
        reject(err);
      }
    };

    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error("Failed to load video for compression"));
    };
  });
}
