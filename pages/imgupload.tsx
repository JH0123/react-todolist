import React, { useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";

// interface Image {
//   id: number;
//   img: string;
//   url: string;
// }

export default function Home() {
  // 이미지를 내 컴퓨터 파일에서 선택을 하여 업로드 버튼을 누르면 이미지가 보여짐
  // 사진을 배열에 저장할 때 미리보기할 url을 함께 생성하여 저장한다

  // 사진 업로드 버튼 이벤트 핸들러
  // const imageInput = useRef();
  // const handleClick = () => {
  //   imageInput.current.click();
  // };

  // 미리보기 url을 저장
  const [previewImg, setPreviewImg] = useState(""); // 미리보기
  const [imgFiles, setImgFiles] = useState(""); // 서버에 전송할 이미지 저장

  // 미리보기 이미지 파일 저장
  const saveFileImage = (e) => {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
    console.log(previewImg);
  };

  // 업로드 이미지 파일 저장
  const onChange = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("img", img);
  };
  // 파일 삭제
  // 파일은 삭제 되지만 글씨는 삭제 안됨
  const deleteFileImage = () => {
    URL.revokeObjectURL(previewImg);
    setPreviewImg("");
  };

  // const insertImg = (e) => {
  //   // console.log(e.target.files[0]); // 이미지 들어온거 확인
  //   let reader = new FileReader();
  //   if (e.target.files[0]) {
  //     reader.readAsDataURL(e.target.files[0]);
  //     setImg([...img, e.target.files[0]]);
  //   }
  //   reader.onloadend = () => {
  //     const previewImgUrl = reader.result;
  //     // console.log(previewImgUrl); // bash64로 인코딩된 데이터 확인
  //     if (previewImgUrl) {
  //       setPreviewImg([...previewImg, previewImgUrl]);
  //     }
  //   };
  // };

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
      <>
        <h1 className="font-bold mb-4">이미지 미리보기</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <div>
                  {previewImg && (
                    <img alt="sample" src={previewImg} className="m-auto" />
                  )}
                  <div className="items-center justify-center">
                    <input
                      name="imgUpload"
                      type="file"
                      accept="image/*"
                      onChange={saveFileImage}
                    />
                    <button
                      className="btn btn-outline btn-error"
                      onClick={() => deleteFileImage()}
                    >
                      삭제
                    </button>
                    <button className="btn btn-outline btn-success">
                      업로드
                    </button>
                  </div>
                  <br />
                  <ul>
                    <strong>업로드 이미지</strong>
                    {/* 버튼을 클릭했을 시 보여야함 */}
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </>
      <br />
    </div>
  );

  // return (
  //   <div>
  //     <input
  //       type="file"
  //       accept="image/*"
  //       onChange={saveImage}
  //       ref={(refParam) => (inputRef = refParam)}
  //       style={{ display: "none" }}
  //     />

  //     <div className="upload-button">
  //       <button onClick={() => inputRef.click()}>Preview</button>
  //       <button onClick={deleteImage}>Delete</button>
  //       <button onClick={sendImage}>Upload</button>
  //     </div>
  //   </div>
  // );
}
