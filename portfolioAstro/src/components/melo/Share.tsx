import { useEffect, useRef, useState } from "react";
import imgMeloAgain from "../../images/melo/MelodyLaneAgain.png";
import imgMeloCopied from "../../images/melo/MelodyLaneCopied.png";
import imgMeloCopy from "../../images/melo/MelodyLaneCopy.png";
import imgMeloFlying from "../../images/melo/MelodyLaneFlying.png";
import imgMeloLine from "../../images/melo/MelodyLaneLINE.png";
import imgMeloTwitter from "../../images/melo/MelodyLaneTwitter.png";
import type { VariousResultType } from "./MeloApp";

type ShareProps = {
  isStandard: boolean;
  standardResult: number;
  variousResult: VariousResultType | undefined;
  weight: number;
  weightName: string;
  setIsResultOpen: (isResultOpen: boolean) => void;
  setWeight: (weight: number) => void;
  setWeightName: (weightName: string) => void;
};

export default function Share({
  isStandard,
  standardResult,
  variousResult,
  weight,
  weightName,
  setIsResultOpen,
  setWeight,
  setWeightName,
}: ShareProps) {
  const URL: string = "https://kumanocrow.netlify.app/playground/melo";
  const weightData: string = `${weight}kgの${weightName}は…`;
  let result: string = "";
  if (isStandard) {
    result = `${standardResult}メロディーレーンです！`;
  } else {
    if (!variousResult) return;
    result = `${variousResult.variousResult}メロディーレーン\n${variousResult.variousResultBB}うまれたてのメロディーレーン\nそしてにんじん${variousResult.variousResultCarrot}本です！`;
  }
  const text = `【それって何メロディーレーン？】\n${weightData}\n${result}`;

  return (
    <div className="result-share">
      <div className="result-share-sns">
        <TwitterShareButton text={text} url={URL} />
        <LineShareButton text={text} url={URL} />
      </div>
      <CopyButton text={text} url={URL} />
      <AgainButton
        setIsResultOpen={setIsResultOpen}
        setWeight={setWeight}
        setWeightName={setWeightName}
      />
    </div>
  );
}

const TwitterShareButton = ({ text, url }: { text: string; url: string }) => {
  const hashtags = ["#それって何メロディーレーン"];
  const handleShareToX = () => {
    const xUrl = new URL("https://x.com/intent/tweet");
    xUrl.searchParams.append("text", `${text}\n\n${hashtags.join(" ")}\n`);
    xUrl.searchParams.append("url", url);
    window.open(xUrl.toString(), "_blank", "noopener,noreferrer");
  };
  return (
    <div className="result-share-twitter">
      <button type="button" onClick={handleShareToX}>
        <img src={imgMeloTwitter.src} alt="メロディーレーンと青い鳥" />
        <p>Xでシェア？</p>
      </button>
    </div>
  );
};

const LineShareButton = ({ text, url }: { text: string; url: string }) => {
  const handleShareToLine = () => {
    const lineUrl = new URL("https://social-plugins.line.me/lineit/share");
    lineUrl.searchParams.append("text", text);
    lineUrl.searchParams.append("url", url);
    window.open(lineUrl.toString(), "_blank", "noopener,noreferrer");
  };
  return (
    <div className="result-share-line">
      <button type="button" onClick={handleShareToLine}>
        <img src={imgMeloLine.src} alt="メロディーレーンとLINE" />
        <p>LINEでシェア？</p>
      </button>
    </div>
  );
};

const CopyButton = ({ text, url }: { text: string; url: string }) => {
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setHasCopied(true);
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div className="result-share-copy">
      <button type="button" onClick={handleCopy}>
        {hasCopied ? (
          <>
            <img src={imgMeloCopied.src} alt="コピー完了したメロディーレーン" />
            <p>コピー完了！</p>
          </>
        ) : (
          <>
            <img src={imgMeloCopy.src} alt="コピーするメロディーレーン" />
            <p>結果をコピー？</p>
          </>
        )}
      </button>
    </div>
  );
};

const AgainButton = ({
  setIsResultOpen,
  setWeight,
  setWeightName,
}: {
  setIsResultOpen: (isResultOpen: boolean) => void;
  setWeight: (weight: number) => void;
  setWeightName: (weightName: string) => void;
}) => {
  const [currentImage, setCurrentImage] = useState(imgMeloAgain.src);
  const [altText, setAltText] = useState("ほうきを持つメロディーレーン");
  const imageRef = useRef<HTMLImageElement>(null);
  const isAnimating = useRef(false);
  const timeoutIds = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach(clearTimeout);
    };
  }, []);

  const againScrollToTop = () => {
    if (isAnimating.current || !imageRef.current) return;
    isAnimating.current = true;

    // Phase 1: Fade out
    imageRef.current.style.transition = "opacity 0.2s";
    imageRef.current.style.opacity = "0";

    const t1 = window.setTimeout(() => {
      // Phase 2: Switch to flying image and reset positions
      setCurrentImage(imgMeloFlying.src);
      setAltText("ほうきで飛ぶメロディーレーン");

      if (imageRef.current) {
        imageRef.current.style.transition = "opacity 0.2s";
        imageRef.current.style.opacity = "1";
        imageRef.current.style.height = "130px";
        imageRef.current.style.bottom = "0px";
        imageRef.current.style.left = "-10px";
        imageRef.current.style.transform = "translateY(0)";
      }
    }, 200);
    timeoutIds.current.push(t1);

    const t2 = window.setTimeout(() => {
      // Phase 3: Slight dip before flying up
      if (imageRef.current) {
        imageRef.current.style.transition = "bottom 0.3s ease-in";
        imageRef.current.style.bottom = "-40px";
      }
    }, 800);
    timeoutIds.current.push(t2);

    const t3 = window.setTimeout(() => {
      // Phase 4: Fly up!
      if (imageRef.current) {
        imageRef.current.style.transition = "transform 1.5s ease-in-out";
        imageRef.current.style.transform = "translateY(-300vh)";
      }
    }, 1200);
    timeoutIds.current.push(t3);

    const t4 = window.setTimeout(() => {
      // Phase 5: Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
    timeoutIds.current.push(t4);

    const t5 = window.setTimeout(() => {
      // Phase 6: Reset to original state
      setCurrentImage(imgMeloAgain.src);
      setAltText("ほうきを持つメロディーレーン");

      if (imageRef.current) {
        imageRef.current.style.transition = "opacity 0.5s";
        imageRef.current.style.opacity = "";
        imageRef.current.style.height = "130px";
        imageRef.current.style.bottom = "0px";
        imageRef.current.style.left = "0";
        imageRef.current.style.transform = "";
      }
    }, 2500);
    timeoutIds.current.push(t5);

    // アニメーションが終わってから、多少の余裕を持ってリセット
    const t6 = window.setTimeout(() => {
      setWeight(0);
      setWeightName("");
      setIsResultOpen(false);
      isAnimating.current = false;
      timeoutIds.current = [];
    }, 3000);
    timeoutIds.current.push(t6);
  };

  return (
    <section className="again">
      <button type="button" className="again-button" onClick={againScrollToTop}>
        <img ref={imageRef} src={currentImage} alt={altText} />
        <p>もう一回？</p>
      </button>
    </section>
  );
};
