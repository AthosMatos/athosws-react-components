import { useEffect, useMemo, useState } from "react";
import { ATHOSVirtualDiv } from "../component";

const CachedImg = ({ src, index }: { src: string; index?: number }) => {
  const [loaded, setLoaded] = useState(false);
  const cachedImg = useMemo(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
    };
    return img;
  }, [src]);

  return (
    <ATHOSVirtualDiv viewportId="viewport" offset={210} className="w-[300px] h-[300px]">
      {loaded ? (
        <img className="w-full h-full object-cover" src={cachedImg.src} />
      ) : (
        <div className="w-full h-full bg-gray-300 animate-pulse" />
      )}
    </ATHOSVirtualDiv>
  );
};

const AthosVirtualDivPage = () => {
  const [imagestest, setImages] = useState<string[]>([]);

  useEffect(() => {
    const getImages = async () => {
      const imgs = (
        await fetch("https://picsum.photos/v2/list")
          .then((res) => res.json())
          .then((data) => data.map((d: { download_url: string }) => d.download_url))
      ).slice(0, 10);

      setImages(imgs);
    };

    getImages();
  }, []);

  return (
    <>
      <div
        id="viewport"
        className="border border-white grid h-[500px] overflow-auto"
        style={{
          gridTemplateColumns: "300px 300px 300px",
        }}
      >
        {imagestest.map((image, index) => (
          <CachedImg key={index} src={image} index={index} />
        ))}
      </div>
    </>
  );
};

export default AthosVirtualDivPage;
