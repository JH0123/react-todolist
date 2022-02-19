import React, { useRef, useState } from "react";
import Link from "next/link";

interface Image {
  id: number;
  img: string;
  url: string;
}

export default function Home() {
  // 이미지를 내 컴퓨터 파일에서 선택을 하여 업로드 버튼을 누르면 이미지가 보여짐
  // 사진을 배열에 저장할 때 미리보기할 url을 함께 생성하여 저장한다

  // 사진 업로드 버튼 이벤트 핸들러
  const imageInput = useRef();
  const handleClick = () => {
    imageInput.current.click();
  };

  // 사진 등록하기 및 미리보기 기능 구현
  const [imgList, setImgList] = useState<Image[]>([]); // 사진이 저장될 배열
  // const [preview, setPreview] = useState<Image[]>([]); // 미리보기

  // const uploadImg = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", this.state.selectedFile);

  //   return axios.post("/");
  //   // setImgFile([{ img: imgFile, id: Date.now() }]);
  //   // setImgFile([]);
  // };

  const imagePreview = () => {
    return imgList.map((img) => {
      <div>
        <img className="photoPreview" src={img.url} />
      </div>;
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setImgList(e.target.file[0]);
  };

  const handleSubmit = (id) => (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1 className="bg-red-900 text-center text-white text-2xl py-4">
        Image Upload
      </h1>
      <nav className="bg-gray-500 flex sm:justify-center space-x-4">
        <Link href="/">
          <button className="rounded-lg px-3 py-2 text-white font-medium hover:bg-slate-100 hover:text-slate-900">
            Todo List
          </button>
        </Link>
      </nav>
      <br />
      <label className="block">
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          multiple // 여러 개의 사진 업로드 가능
          className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
          onChange={handleChange}
        />
      </label>
      <button
        className="bg-green-400 rounded text-white p-2"
        onClick={(e) => {
          e.preventDefault();
          // uploadImg();
        }}
      >
        이미지 업로드
      </button>
      <br />
    </div>
  );
}
