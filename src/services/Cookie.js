import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

// 구글 정책 바뀜 로그아웃 api로 요청하기
export const removeCookie = (name, option) => {
  return cookies.remove(name, { ...option });
};
