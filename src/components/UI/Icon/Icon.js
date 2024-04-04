import React from "react";
import * as icons from "../../../assets/icons";

function Icon({ type, className }) {
  //      type과 className이라는 두개의 props로 받아서 하는 코드

  const iconStyle = {
    display: "block",
    color: "transparent", //      iconstyle 객체  color: "transparent"는 아이콘의 글꼴 색상을 투명
    background: `url(${icons[type]}) no-repeat center / contain`, //      no-repeat과 center / contain은 배경 이미지가 반복되지 않고, 중앙에 놓고
    //      컨테이너에 맞게 조정되게 코드 수정
  };

  return (
    <span>
      <i
        style={iconStyle}
        className={className} //      className prop을 통해 추가적인 클래스 이름이 할당 가능 스타일이 적용된 <i> 태그
      ></i>
    </span>
  );
}

export default Icon;
