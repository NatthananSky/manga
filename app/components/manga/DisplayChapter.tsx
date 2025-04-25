/* eslint-disable @next/next/no-img-element */
"use client";

export default function DisplayChapter({ data }: { data: string }) {
  const decode = (base64: string) => {
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    return decoded;
  };
  const imgUrls = JSON.parse(decode(data));

  return (
    <div className="w-full">
      {imgUrls.map((imgUrl: string, index: number) => (
        <div
          key={index}
          className={`overflow-hidden mx-auto max-w-2xl 
        ${index === 0 ? "rounded-t-lg" : ""}
        ${index === imgUrls.length - 1 ? "rounded-b-lg" : ""}
      `}
        >
          <img
            src={imgUrl}
            alt={`หน้า ${index + 1}`}
            className="w-full h-auto object-contain bg-black"
            loading={index === 0 ? "eager" : "lazy"} // โหลดภาพแรกทันที
            fetchPriority={index === 0 ? "high" : "auto"} // เพิ่ม priority ภาพแรก
            decoding="async"
            style={{ display: "block" }} // ถ้าไม่รู้ขนาด exact ให้ใส่ ratio เฉลี่ยไว้ช่วย layout
          />
        </div>
      ))}
    </div>
  );
}
