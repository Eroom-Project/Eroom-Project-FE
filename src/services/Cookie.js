import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
    return cookies.set(name, value, { ...option });
};

export const getCookie = async (name) => {
    try {
        return await cookies.get(name);
    } catch (error) {
        console.error("Error retrieving cookie:", error);
        return null; // 쿠키를 찾지 못했을 때 null 반환
    }
};

// 구글 정책 바뀜 로그아웃 api로 요청하기
// export const removeCookie = (name, option) => {
//     return cookies.remove(name, { ...option });
// };
